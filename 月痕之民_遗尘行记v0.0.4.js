/* 遗尘行记 v0.0.4 —— 月痕之民 · 卡外脚本（轮 2：读数据的另外五个 ＋ 装备人体图 ＋ 卸/换）
 *
 * 托管的这一份是全部真代码；卡里只有一句 import（tavern_helper.scripts 第 5 条）。
 *
 *  v0.0.1（轮 1）：外壳（球 / 抽屉 / app 墙 / 抬头）· 存档分层（localStorage）
 *    · 主角 app · IndexedDB 只留接口占位（轮 4 才实现）
 *  v0.0.2（轮 2）：资产 · 角色图鉴（按人名 / 按归属两视图）· 成长 · 任务 · 特殊事件
 *    —— **五个全是只读**；主角的装备人体图（点开看在装的）＋ 背包
 *    🔴 顺带修掉轮 1 一处真错：`装备` / `背包` 读在顶层了，实际在 **`主角` 底下**
 *       （`_MVU变量字段总表.md` §2.8 / §2.9）⇒ 原来那格永远报「装备 0 件」。
 *  v0.0.3（轮 2）：装备的**卸 / 换** —— 全卡第一个「玩家直接写变量」的写入方（§5.5）
 *    ✅ 两问已裁（`D153` ② / `D154` ①）：注入读每轮最新值 ⇒ 直改 `stat_data` 安全；
 *       失败**写提示、不回滚**（驾驶员原话「装备失败写提示」）。
 *    ✅ 只动 `状态` 一格（在装 ⇄ 在包），其余 16 格一个字不碰。
 *  v0.0.4（轮 2）：🔴 **修 §5.5 ⑤ 那个读写分家的坑** —— `message_id` 从 `'latest'`
 *    改成**显式 `-1`**。`'latest'` 在「读」路上是**最后一条非 system 楼**、在「写」路上是
 *    **绝对最后一楼**（酒馆助手 `variables.ts` 两条分支），最后一条是 system 消息时
 *    **读一楼、写另一楼** ⇒ `读作用域` 那套保证当场失效。数字 `-1` 两边同走 `chat.at(-1)`。
 *    ⚠ 剩余未验边界：宏取的是「最后一个带 variables 对象的楼」，与 `-1` 仍可能不同（源码读出来的，没真机验）。
 *    ⏸ 未做：其余 8 个 app · 美化
 *
 *  🔴 零依赖 —— 不 import 任何东西。`_` 与 `z` 是酒馆助手注入的全局量，另引会出现三实例地雷。
 *  🔴 单例 —— 挂在宿主 body 上，不是每楼一份（与美化 / 状态栏相反）。
 *
 *  成法来源（都是现读源码，不是凭印象）：
 *    · 宿主发现 / 取文档 / 视口 / 拖拽 / 位置记忆 / 单例 / destroy
 *        ← `月痕之民_音乐v0.0.4.js`（已在真机上趟过两轮坑）
 *    · 变量读法 ← 同一份 §8 ＋ `月痕之民_派生值v0.0.2.js` §5
 *    · 变量写法 ← `skill …/st-guides/B1_变量更新规则.md` §5.3（类型声明）
 *        ＋ 酒馆助手 `N0VI028/JS-Slash-Runner` 源码 `src/function/variables.ts` / `macro_like.ts`
 */

(function () {
  'use strict';

  // ══ 0. 常量 ═══════════════════════════════════════════════════════════════
  const 版本 = 'v0.0.4';
  const RUNTIME_KEY = '__yuehenYichenRuntime__';  // 单例键（挂在宿主窗口上）
  const LS_KEY = 'yh.yc.v1';                      // yc = 遗尘。🔴 与美化的 `yh.mh.v1` 是两个键，不共用
  const LS_版本 = 1;                              // 存储结构版本 —— 对不上就当没存过，不猜
  const 球尺寸 = 44;
  const 拖动阈值 = 4;                             // 小于它算「点击」，不算拖动
  const 同步去抖 = 120;
  const 挂样式键 = 'yc-style';

  // 14 个 app（照《方案》§2）。🔴 「成就」不在里面 —— 它是挂起项，不算在 14 里。
  const APP表 = [
    { 名: '主角', 类: '读卡里的数', 做: true },
    { 名: '资产', 类: '读卡里的数', 做: true },
    { 名: '角色图鉴', 类: '读卡里的数', 做: true },
    { 名: '成长', 类: '读卡里的数', 做: true },
    { 名: '任务', 类: '读卡里的数', 做: true },
    { 名: '特殊事件', 类: '读卡里的数', 做: true },
    { 名: '论坛', 类: 'AI 现场编' },
    { 名: '信息', 类: 'AI 现场编' },
    { 名: '局势', 类: 'AI 现场编' },
    { 名: '风物志', 类: 'AI 现场编' },
    { 名: 'CG 收集', 类: '图' },
    { 名: '壁纸', 类: '图' },
    { 名: '世界书', 类: '壳与配置' },
    { 名: '设置', 类: '壳与配置' },
  ];

  // ══ 1. 宿主环境（成法照音乐 v0.0.4 §3） ══════════════════════════════════
  function 候选窗口() {
    const list = [];
    try { if (window.parent && window.parent !== window) list.push(window.parent); } catch (_) {}
    try {
      if (window.top && window.top !== window && window.top !== window.parent) list.push(window.top);
    } catch (_) {}
    list.push(window);
    return list;
  }

  let 宿主 = window;
  function 找宿主() {
    for (const w of 候选窗口()) {
      try { if (w && w.Mvu && typeof w.Mvu.getMvuData === 'function') { 宿主 = w; return w; } } catch (_) {}
    }
    return 宿主;
  }

  function 取文档() {
    for (const w of 候选窗口()) {
      try { if (w.document && w.document.body) return w.document; } catch (_) {}
    }
    return document;
  }

  function 视口() {
    const w = (() => { try { return (取文档().defaultView) || 宿主; } catch (_) { return 宿主; } })();
    try {
      const vv = w.visualViewport;
      if (vv && vv.width) return { x: vv.offsetLeft || 0, y: vv.offsetTop || 0, w: vv.width, h: vv.height };
    } catch (_) {}
    return { x: 0, y: 0, w: w.innerWidth || 360, h: w.innerHeight || 640 };
  }

  // ══ 2. 存档（localStorage 层） ═══════════════════════════════════════════
  // 轮 1 只存「UI 状态」：球位 / 开合 / 上次停在哪个 app。
  // 🔴 配置类（API key / 皮肤 / 开关）与文字类留到轮 2、轮 3 —— 那时才有东西可存。
  // 🔴 图不进这里（localStorage 一般只有 5–10MB）—— 归 IndexedDB，轮 4。
  const 空存储 = () => ({
    版本: LS_版本,
    球位: { x: null, y: null },
    开合: false,
    上次: '',          // 上次停在哪个 app（'' = app 墙）
    图鉴视图: '按人名', // 角色图鉴的两个视图
    装备展开: false,    // 人体图点开了没
  });

  const 夹 = (v, lo, hi, 兜底) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : 兜底;
  };

  function 读存储() {
    const 空 = 空存储();
    let raw = null;
    try { raw = localStorage.getItem(LS_KEY); } catch (_) { return 空; }
    if (!raw) return 空;
    let o = null;
    try { o = JSON.parse(raw); } catch (_) { return 空; }
    if (!o || typeof o !== 'object') return 空;
    if (o.版本 !== LS_版本) return 空;   // 结构变过 —— 旧的不猜，直接吃默认值

    const out = 空存储();
    if (o.球位 && typeof o.球位 === 'object') {
      out.球位.x = o.球位.x === null || o.球位.x === undefined ? null : 夹(o.球位.x, 0, 1, null);
      out.球位.y = o.球位.y === null || o.球位.y === undefined ? null : 夹(o.球位.y, 0, 1, null);
    }
    out.开合 = !!o.开合;
    // 🔴 只认表里那 14 个名字 —— 认不得的一律回 ''，绝不让一个野字符串流进渲染。
    if (typeof o.上次 === 'string' && APP表.some((a) => a.名 === o.上次 && a.做)) out.上次 = o.上次;
    if (o.图鉴视图 === '按人名' || o.图鉴视图 === '按归属') out.图鉴视图 = o.图鉴视图;
    out.装备展开 = !!o.装备展开;
    return out;
  }

  function 写存储() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(存)); return true; }
    catch (_) { return false; }
  }

  let 存 = 读存储();

  // 🔴 这两格**不进存档**（故意的）：`换哪件` 是「替换」选到一半的状态，
  //    重开一次还留着半开的选人框没有意义；`提示` 是一次性回执，更不该跨会话留着。
  let 换哪件 = null;      // 正在给哪一件找替换（null ＝ 没在换）
  let 提示 = null;        // { 坏: bool, 字: '…' } —— 卸/换 的回执，成功后也报一句

  // ══ 3. 图库（IndexedDB 层）—— ⏸ 轮 1 只留接口占位 ═══════════════════════
  // 轮 1 一张图都没有；真正要它的是轮 4（CG 收集 / 壁纸）。
  // 现在建库，索引怎么建只能靠猜，猜出来的到轮 4 多半要推倒 —— 所以只定签名。
  const 图库 = {
    存: function () { throw new Error('遗尘行记：图库要等轮 4（CG 收集）才实现'); },
    取: function () { throw new Error('遗尘行记：图库要等轮 4（CG 收集）才实现'); },
    删: function () { throw new Error('遗尘行记：图库要等轮 4（CG 收集）才实现'); },
    列: function () { throw new Error('遗尘行记：图库要等轮 4（CG 收集）才实现'); },
  };

  // ══ 4. 变量（照音乐 §8 ＋ 派生值 §5） ═════════════════════════════════════
  let 变量 = null;         // stat_data，读不到就是 null
  let 读到了没 = false;
  let 同步计时 = null;
  let 已订阅 = [];
  // 🔴 读时用的哪个作用域，写就写回哪个 —— 读写分家会写进另一本账。
  // 🔴 `message_id` 一律用**显式 -1**，不许写 `'latest'` —— 详见 §5.5 ⑤（同一个 `'latest'`
  //    在「读」和「写」两条路上落到**不同的楼**，这条约束只有写数字才成立）。
  let 读作用域 = { type: 'message', message_id: -1 };

  function 取变量() {
    const w = 找宿主();
    try {
      if (w.Mvu && typeof w.Mvu.getMvuData === 'function') {
        let 用 = { type: 'message', message_id: -1 };
        let d = w.Mvu.getMvuData(用);
        if (!d || !d.stat_data) { 用 = { type: 'chat' }; d = w.Mvu.getMvuData(用); }
        if (d && d.stat_data) { 变量 = d.stat_data; 读作用域 = 用; 读到了没 = true; return 变量; }
      }
    } catch (e) {
      try { console.warn('[遗尘行记] 读变量失败：', e); } catch (_) {}
    }
    // 🔴 读不到就把上一份丢掉 —— 留着旧的会让界面拿陈旧数据冒充现值（切聊天 / 变量被清时会踩到）
    变量 = null;
    读到了没 = false;
    return 变量;
  }

  function 同步() {
    if (已销毁) return;
    if (同步计时) clearTimeout(同步计时);
    同步计时 = setTimeout(() => { 同步计时 = null; 取变量(); 刷新(); }, 同步去抖);
  }

  function 订阅变量() {
    const w = 找宿主();
    const on = (() => {
      try { return typeof w.eventOn === 'function' ? w.eventOn : (typeof eventOn === 'function' ? eventOn : null); }
      catch (_) { return null; }
    })();
    if (!on) return false;
    // 三个都订 —— 哪个先到没验过，照音乐。
    for (const e of ['mag_variable_initialized', 'mag_variable_update_ended', 'mag_variable_updated']) {
      try { on(e, 同步); 已订阅.push(e); } catch (_) {}
    }
    return 已订阅.length > 0;
  }

  // ══ 5. 取数工具 ═══════════════════════════════════════════════════════════
  const 是对象 = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

  // 按路径取，取不到给兜底。🔴 一律走它 —— 变量树随时可能缺格，直接点会抛。
  function 取(根, 路, 兜底) {
    let o = 根;
    for (const k of 路) {
      if (!是对象(o) && !Array.isArray(o)) return 兜底;
      o = o[k];
      if (o === undefined || o === null) return 兜底;
    }
    return o;
  }

  const 串 = (v) => (v === undefined || v === null ? '' : String(v));
  const 是数 = (v) => typeof v === 'number' && Number.isFinite(v);
  const 列 = (v) => (Array.isArray(v) ? v : []);
  const 字典 = (v) => (是对象(v) ? v : {});

  // ══ 5.5 写变量 —— 全卡第一个「玩家直接写」的写入方 ════════════════════════
  // 成法照 `skill …/st-guides/B1_变量更新规则.md` §5.3（【类型声明】逐字核实，置信度高）：
  //     getMvuData(option) → 改 → await replaceMvuData(mvu_data, option)
  // 🔴 四条硬约束，写错**全是静默失效**，别猜：
  //   ① `replaceMvuData` 是**整表替换、不是 merge**。不许自己拼一个 `{stat_data: …}` 传进去 ——
  //      那会把 `initialized_lorebooks` 之类的键一并抹掉。必须走 get → 改 → replace。
  //   ② 路径用**数组**，不用字符串：`_.set` 那类收到字符串会按 `.` 切，
  //      而装备条目名是自由文本（`短剑·灰`），带点就切错层。
  //   ③ 改的是**复制件**。若 `getMvuData` 返回的是活引用，直接改它就等于「写失败也已经改了」——
  //      而 `D154` ① 要的是「变量保持原样」。复制一份再改，失败时原件一个字节没动。
  //   ④ 写回**读时那个作用域**（`读作用域`），读写分家会写进另一本账。
  //   ⑤ 🔴 **`message_id` 必须写显式 `-1`，不许写 `'latest'`** —— 这条是读源码挖出来的坑：
  //      酒馆助手 `src/function/variables.ts` 里，**读**走
  //        `chat.filter(m => !m.is_system).at(-1)`   ← 最后一条**非 system** 楼
  //      而**写**（`replaceVariables`）走
  //        `chat.at(-1)`                             ← **绝对**最后一楼
  //      ⇒ 同一个 `'latest'`，**读在一楼、写在另一楼**（最后一条是 system 消息时就分家）。
  //      传显式 `-1` 则两边都走 `chat.at(-1)`，**读写必定同一楼**，且与 MVU 自己的写入口径一致
  //      （`handleVariablesInMessage` 传的永远是具体楼层号，从不用 `'latest'`）。
  //      ⚠ **未被证伪的剩余边界**：宏那边取的是 `chat.findLastIndex(有 variables 对象的那一楼)`，
  //      与 `-1` 在「最后一楼是 system 消息」时仍可能不同 —— 这条**没验过**，别当已解决。
  //
  // 🔴 失败路径 ＝ **写提示，不回滚**（`D154` ①，驾驶员原话「装备失败写提示」）。
  //    成功返回 null，失败返回一句人话。

  function 置(根, 路, 值) {
    let n = 根;
    for (let i = 0; i < 路.length - 1; i++) {
      const k = 路[i];
      if (n[k] === null || typeof n[k] !== 'object') n[k] = {};
      n = n[k];
    }
    n[路[路.length - 1]] = 值;
  }

  async function 写变量(改) {
    const w = 找宿主();
    if (!w.Mvu || typeof w.Mvu.replaceMvuData !== 'function') return 'MVU 没在跑（找不到 replaceMvuData）';
    if (typeof w.Mvu.getMvuData !== 'function') return 'MVU 没在跑（找不到 getMvuData）';
    let 原 = null;
    try { 原 = w.Mvu.getMvuData(读作用域); } catch (e) { return '取变量表失败：' + 串(e && e.message ? e.message : e); }
    if (!原 || !原.stat_data) return '取不到变量表（stat_data 空着）';
    let 档 = null;
    try { 档 = JSON.parse(JSON.stringify(原)); } catch (e) { return '变量表复制失败：' + 串(e && e.message ? e.message : e); }
    try { 改(档); } catch (e) { return '改这一格失败：' + 串(e && e.message ? e.message : e); }
    try { await w.Mvu.replaceMvuData(档, 读作用域); }
    catch (e) { return '写回失败：' + 串(e && e.message ? e.message : e); }
    return null;
  }

  // 卸 / 换 的动作本身 —— 只动 `状态` 一格（§3.5 定案：卸＝在装→在包；换＝两件对调）
  async function 卸掉(名) {
    提示 = null;
    const 错 = await 写变量((档) => { 置(档.stat_data, ['主角', '装备', 名, '状态'], '在包'); });
    提示 = 错 ? { 坏: true, 字: `「${名}」没卸下来 —— ${错}（变量没动）` } : { 坏: false, 字: `已卸下「${名}」。` };
    取变量(); 刷新();
  }

  async function 换上(旧名, 新名) {
    提示 = null;
    换哪件 = null;
    const 错 = await 写变量((档) => {
      置(档.stat_data, ['主角', '装备', 旧名, '状态'], '在包');
      置(档.stat_data, ['主角', '装备', 新名, '状态'], '在装');
    });
    提示 = 错 ? { 坏: true, 字: `没换上「${新名}」—— ${错}（变量没动）` }
              : { 坏: false, 字: `已用「${新名}」替下「${旧名}」。` };
    取变量(); 刷新();
  }

  // 卸/换 是 async，但点击回调不 await —— 里面任何一处抛都会变成「静默的未处理拒绝」。
  // 全部从这里过一手：抛了就当写失败报出来，照样不炸界面。
  function 安全跑(动作) {
    const 报 = (e) => {
      提示 = { 坏: true, 字: '这一步没跑完：' + 串(e && e.message ? e.message : e) + '（变量没动）' };
      try { 刷新(); } catch (_) {}
    };
    try {
      const r = 动作();
      if (r && typeof r.catch === 'function') r.catch(报);
    } catch (e) { 报(e); }
  }

  // ══ 6. 渲染 —— 抬头 ═══════════════════════════════════════════════════════
  // §11.3 已裁：抬头在**小手机界面左上角、与时间同排**（⇒ 不与楼层状态栏重复）。
  function 抬头文字() {
    if (!读到了没) return { 时: '', 地: '地点不详' };
    const 历 = 取(变量, ['世界', '历法'], {});
    const 年 = 取(历, ['年'], null), 月 = 取(历, ['月'], null), 日 = 取(历, ['日'], null);
    const 星期 = 串(取(历, ['星期'], ''));
    const 时 = 取(变量, ['世界', '时刻'], null);
    const 段 = [];
    if (是数(年) || 是数(月) || 是数(日)) {
      段.push(`${是数(年) ? 年 : '?'}年${是数(月) ? 月 : '?'}月${是数(日) ? 日 : '?'}日`);
    }
    if (星期) 段.push(星期);
    if (是数(时)) 段.push(`${时}时`);
    // 位置 ＝ 一条链，从粗到细；空层跳过（照 D151 ⑦ 状态栏那条口径）
    const 链 = ['界域', '大区', '地域', '地点']
      .map((k) => 串(取(变量, ['世界', k], '')).trim())
      .filter(Boolean);
    return { 时: 段.join(' · '), 地: 链.length ? 链.join(' · ') : '地点不详' };
  }

  // ══ 7. 渲染 —— 主角 ═══════════════════════════════════════════════════════
  // 版式照《方案》§3.2（创世游戏面板三张截图），逐格对表照 §3.3 / §3.4。
  // 🔴 调整值一律**读变量**，不自己算 —— 它是派生值脚本回写的只读格（字段总表 §8.4）。
  //    遗尘行记再算一遍就是第二个真源。
  function 数值组(标题, 项) {
    // 项: [{ 名, 值, 注 }] —— 值已经是字符串
    const box = document.createElement('div');
    box.className = 'yc-sec';
    if (标题) {                      // 标题为空就只出格子，不出表头
      const h = document.createElement('div');
      h.className = 'yc-sech';
      h.textContent = 标题;
      box.appendChild(h);
    }
    const g = document.createElement('div');
    g.className = 'yc-grid';
    for (const it of 项) {
      const c = document.createElement('div');
      c.className = 'yc-cell';
      const n = document.createElement('span');
      n.className = 'yc-cn';
      n.textContent = it.名;
      const v = document.createElement('span');
      v.className = 'yc-cv';
      v.textContent = it.值 === '' || it.值 === undefined ? '—' : it.值;
      c.appendChild(n);
      c.appendChild(v);
      if (it.注) {
        const a = document.createElement('span');
        a.className = 'yc-ca';
        a.textContent = it.注;
        c.appendChild(a);
      }
      g.appendChild(c);
    }
    box.appendChild(g);
    return box;
  }

  function 条(题, 当, 上, 类) {
    const box = document.createElement('div');
    box.className = 'yc-bar' + (类 ? ' ' + 类 : '');
    const t = document.createElement('span');
    t.className = 'yc-bt';
    t.textContent = 题;
    const track = document.createElement('span');
    track.className = 'yc-btrack';
    const fill = document.createElement('span');
    fill.className = 'yc-bfill';
    const p = 是数(当) && 是数(上) && 上 > 0 ? Math.max(0, Math.min(100, (当 / 上) * 100)) : 0;
    fill.style.width = p + '%';
    track.appendChild(fill);
    const n = document.createElement('span');
    n.className = 'yc-bn';
    n.textContent = `${是数(当) ? 当 : '—'} / ${是数(上) ? 上 : '—'}`;
    box.appendChild(t);
    box.appendChild(track);
    box.appendChild(n);
    return box;
  }

  // ══ 7.5 渲染 —— 轮 2 那五个（读卡里的数） ═════════════════════════════════
  // 五个 app 全是**只读**：不写变量、不动卡。
  // 🔴 路径照 `_MVU变量字段总表.md` —— `装备` / `背包` 在 **`主角` 底下**，不是顶层容器。

  function 空话(字) {
    const e = document.createElement('div');
    e.className = 'yc-empty';
    e.textContent = 字;
    return e;
  }

  // 小动作钮（卸掉 / 替换 / 换上）。值一律走 `data-v`，走的是**属性**不是文本 ——
  // 条目名是自由文本，塞进选择器里会出事。
  function 小钮(字, 动作, 值) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'yc-mini';
    b.setAttribute('data-act', 动作);
    if (值 !== undefined && 值 !== null) b.setAttribute('data-v', 串(值));
    b.textContent = 字;
    return b;
  }

  function 小节(标题) {
    const b = document.createElement('div');
    b.className = 'yc-sec';
    const h = document.createElement('div');
    h.className = 'yc-sech';
    h.textContent = 标题;
    b.appendChild(h);
    return b;
  }

  // 一行「名 — 值」。值空的不占行；其余一律画 —— 账本不筛。
  function 一行(名, 值) {
    const t = 串(值).trim();
    if (!t) return null;
    const r = document.createElement('div');
    r.className = 'yc-il';
    const k = document.createElement('span');
    k.className = 'yc-ik';
    k.textContent = 名;
    const v = document.createElement('span');
    v.className = 'yc-iv';
    v.textContent = t;
    r.appendChild(k);
    r.appendChild(v);
    return r;
  }

  function 条目卡(标题, 副, 行们, 脚) {
    const c = document.createElement('div');
    c.className = 'yc-card';
    if (串(标题).trim()) {
      const t = document.createElement('div');
      t.className = 'yc-ct';
      t.textContent = 串(标题);
      c.appendChild(t);
    }
    if (串(副).trim()) {
      const s = document.createElement('div');
      s.className = 'yc-cs';
      s.textContent = 串(副);
      c.appendChild(s);
    }
    for (const r of 行们 || []) if (r) c.appendChild(r);
    if (串(脚).trim()) {
      const f = document.createElement('div');
      f.className = 'yc-line';
      f.textContent = 串(脚);
      c.appendChild(f);
    }
    return c;
  }

  const 有符号 = (v) => (是数(v) && v > 0 ? '+' + v : 串(v));
  const 三项话 = (o, 键s) => 键s.map((k) => `${k} ${串(取(字典(o), [k], 0))}`).join(' · ');
  const 读不到话 = () => 空话('读不到变量 —— 酒馆助手 / MVU 没在跑？');

  // ── 新月历天数换算（只为算「还剩几天」）────────────────────────────────
  // `1090`：12 月 × 30 天 = 360，年末另有 5 天「新月祭典期」（不算月份），每四年闰 1 天「回光余日」。
  // ⚠ 闰相位卡里只说「每四年润加1天」，本文件读作 `年 % 4 === 0` —— 这是**读法，不是卡的字面**。
  //   读错一格只在跨闰年时让「还剩几天」差 1。闭式：每年 365 ＋ 每 4 年 1 天。
  const 年内天序 = (年) => (年 - 1) * 365 + Math.floor((年 - 1) / 4);
  const 天序 = (年, 月, 日) => 年内天序(年) + (月 - 1) * 30 + (日 - 1);

  function 是日期(d) {
    if (!是对象(d)) return false;
    return 是数(d.年) && d.年 >= 1 && d.年 <= 9999
      && 是数(d.月) && d.月 >= 1 && d.月 <= 12
      && 是数(d.日) && d.日 >= 1 && d.日 <= 30;
  }
  const 日期串 = (d) => (是日期(d) ? `${d.年}年${d.月}月${d.日}日` : '');

  // 距今几天：正 = 还没到 · 0 = 今天 · 负 = 已过。今天读不到 / 日期不合法 ⇒ null
  function 距今(d) {
    if (!是日期(d)) return null;
    const 历 = 取(变量, ['世界', '历法'], {});
    const 今 = { 年: 取(历, ['年'], null), 月: 取(历, ['月'], null), 日: 取(历, ['日'], null) };
    if (!是日期(今)) return null;
    return 天序(d.年, d.月, d.日) - 天序(今.年, 今.月, 今.日);
  }
  function 剩余话(n) {
    if (n === null) return '';
    if (n === 0) return '今天到期';
    return n > 0 ? `还剩 ${n} 天` : `已逾期 ${-n} 天`;
  }
  // 「1917年3月14日（还剩 12 天）」
  function 期限话(d) {
    const s = 日期串(d);
    if (!s) return '';
    const n = 剩余话(距今(d));
    return n ? `${s}（${n}）` : s;
  }
  // 过去的那一头（上次结算日 / 首次到访）
  function 上次话(d) {
    const s = 日期串(d);
    if (!s) return '';
    const n = 距今(d);
    if (n === null) return s;
    if (n === 0) return `${s}（今天）`;
    return n < 0 ? `${s}（已过 ${-n} 天）` : `${s}（${n} 天后）`;
  }

  function 词条话(表) {
    const l = 列(表);
    if (!l.length) return '';
    return l.map((c) => {
      const o = 字典(c);
      return [串(取(o, ['入口'], '')), 串(取(o, ['极性'], '')),
        串(取(o, ['写法'], '')), 串(取(o, ['值'], ''))].filter(Boolean).join('·');
    }).join('；');
  }
  function 战技话(k) {
    const w = 字典(取(k, ['战技'], {}));
    const n = 串(取(w, ['名称'], '')).trim();
    if (!n || n === '无') return '';
    const c = 取(w, ['精炼修正'], 0);
    return 是数(c) && c !== 0 ? `${n}（精炼修正 ${有符号(c)}）` : n;
  }
  function 冷话(k) {
    const 冷 = 取(k, ['冷却'], null);
    if (!是数(冷) || 冷 <= 0) return '';
    const 计 = 取(k, ['冷却计数'], 0);
    return `${冷} 回合（计数 ${是数(计) ? 计 : 0}）`;
  }

  // ── 任务 ────────────────────────────────────────────────────────────────
  function 任务页() {
    const box = document.createElement('div');
    if (!读到了没) { box.appendChild(读不到话()); return box; }
    const 表 = 字典(取(变量, ['任务'], {}));
    const 名s = Object.keys(表);
    if (!名s.length) { box.appendChild(空话('还没有委托。')); return box; }

    const 级序 = { S: 0, A: 1, B: 2, C: 3, D: 4 };
    const 级数 = (v) => (是数(级序[v]) ? 级序[v] : 9);
    const 状态之 = (n) => 串(取(字典(取(表, [n], {})), ['状态'], ''));
    // 进行中在前 → 级别 S 到 D → 期限近的在前（没期限的垫底）
    const 排 = 名s.slice().sort((a, b) => {
      const 活 = (状态之(a) === '进行中' ? 0 : 1) - (状态之(b) === '进行中' ? 0 : 1);
      if (活) return 活;
      const 级 = 级数(取(字典(取(表, [a], {})), ['级别'], '')) - 级数(取(字典(取(表, [b], {})), ['级别'], ''));
      if (级) return 级;
      const x = 距今(取(字典(取(表, [a], {})), ['期限'], {}));
      const y = 距今(取(字典(取(表, [b], {})), ['期限'], {}));
      return (x === null ? 1e9 : x) - (y === null ? 1e9 : y);
    });

    const 在办 = 名s.filter((n) => 状态之(n) === '进行中').length;
    box.appendChild(条目卡('任务', '', [
      一行('总数', `${名s.length} 条`),
      一行('进行中', `${在办} 条`),
    ], ''));

    for (const 名 of 排) {
      const t = 字典(取(表, [名], {}));
      const 级 = 串(取(t, ['级别'], ''));
      const 副 = [级 ? `级别 ${级}` : '', 串(取(t, ['来源'], '')), 串(取(t, ['状态'], ''))]
        .filter(Boolean).join(' · ');
      box.appendChild(条目卡(名, 副, [
        一行('委托方', 取(t, ['委托方'], '')),
        一行('目标', 取(t, ['目标'], '')),
        一行('奖励', 取(t, ['奖励'], '')),
        一行('期限', 期限话(取(t, ['期限'], {}))),
      ], ''));
    }
    return box;
  }

  // ── 特殊事件 ＝ `世界.主线` 七格 ────────────────────────────────────────
  function 特殊事件页() {
    const box = document.createElement('div');
    if (!读到了没) { box.appendChild(读不到话()); return box; }
    const 表 = 字典(取(变量, ['世界', '主线'], {}));
    const 名s = Object.keys(表);
    if (!名s.length) { box.appendChild(空话('还没有事件链。')); return box; }

    const 序遍历 = { 主线: 0, 支线: 1, 地域: 2, 个人: 3 };
    const 排 = 名s.slice().sort((a, b) => {
      const x = 字典(取(表, [a], {})), y = 字典(取(表, [b], {}));
      const 活 = (串(取(x, ['状态'], '')) === '进行中' ? 0 : 1) - (串(取(y, ['状态'], '')) === '进行中' ? 0 : 1);
      if (活) return 活;
      const a1 = 序遍历[串(取(x, ['类型'], ''))], b1 = 序遍历[串(取(y, ['类型'], ''))];
      return (是数(a1) ? a1 : 9) - (是数(b1) ? b1 : 9);
    });

    for (const 名 of 排) {
      const t = 字典(取(表, [名], {}));
      const 完成 = 列(取(t, ['已完成节点'], []));
      const 副 = [串(取(t, ['类型'], '')), 串(取(t, ['状态'], ''))].filter(Boolean).join(' · ');
      box.appendChild(条目卡(名, 副, [
        一行('章节', 取(t, ['章节'], '')),
        一行('当前节点', 取(t, ['节点'], '')),
        一行('分支', 取(t, ['分支'], '')),
        一行('配乐', 取(t, ['配乐'], '')),
      ], 完成.length ? `已完成 ${完成.length} 个：${完成.join(' → ')}` : ''));
    }
    return box;
  }

  // ── 成长 ＝ 主角身上「会长的那几格」的深看（主角页只给摘要）────────────
  function 成长页() {
    const box = document.createElement('div');
    if (!读到了没) { box.appendChild(读不到话()); return box; }
    const P = 字典(取(变量, ['主角'], {}));

    const s1 = 小节('阶位与晋升');
    s1.appendChild(条('晋升', 取(P, ['晋升进度'], null), 取(P, ['进度满值'], null)));
    s1.appendChild(数值组('', [
      { 名: '阶位', 值: 串(取(P, ['阶位'], '')) },
      { 名: '属性点', 值: 串(取(P, ['属性点'], '')) },
      { 名: '阶级', 值: 串(取(P, ['阶级'], '')) },
      { 名: '个体浮动', 值: 串(取(P, ['个体浮动'], '')) },
    ]));
    box.appendChild(s1);

    const s2 = 小节('质点与节点');
    const 节 = 字典(取(P, ['节点'], {}));
    const 节名 = Object.keys(节);
    const 凝 = 列(取(P, ['已凝'], []));
    const 律 = 字典(取(P, ['律座'], {}));
    const 偏 = 列(取(律, ['偏向'], []));
    s2.appendChild(数值组('', [
      { 名: '共鸣度', 值: 串(取(P, ['共鸣度'], '')), 注: '0 – 4' },
      { 名: '解锁进度', 值: 串(取(P, ['解锁进度'], '')), 注: '0 – 100' },
      { 名: '律座', 值: 取(律, ['有无'], false) ? '已立' : '未立', 注: 偏.join('、') },
      { 名: '已凝', 值: String(凝.length), 注: 凝.join('、') },
    ]));
    for (const n of 节名) {
      s2.appendChild(条目卡(n, 串(取(字典(取(节, [n], {})), ['档'], '')), [], ''));
    }
    if (!节名.length) s2.appendChild(空话('还没有节点。'));
    box.appendChild(s2);

    const s3 = 小节('技能');
    const 技 = 字典(取(P, ['技能'], {}));
    const 技名 = Object.keys(技);
    if (!技名.length) s3.appendChild(空话('还没有技能。'));
    for (const n of 技名) {
      const k = 字典(取(技, [n], {}));
      const 顶 = 串(取(k, ['封顶'], ''));
      const 副 = [串(取(k, ['类型'], '')), 串(取(k, ['归属'], '')),
        `Lv ${串(取(k, ['Lv'], ''))}` + (顶 ? `/${顶}` : '')].filter(Boolean).join(' · ');
      const c = 条目卡(n, 副, [
        一行('关联属性', 取(k, ['关联属性'], '')),
        一行('核心功能', 取(k, ['核心功能'], '')),
        一行('目标类型', 取(k, ['目标类型'], '')),
        一行('触发', 取(k, ['触发'], '')),
        一行('象征质点', 列(取(k, ['象征质点'], [])).join('、')),
        一行('倍率', 取(k, ['倍率'], '')),
        一行('冷却', 冷话(k)),
        一行('消耗', 取(k, ['消耗'], '')),
      ], '');
      const 熟 = 取(k, ['熟练度'], null);
      if (是数(熟)) c.appendChild(条('熟练度', 熟, 100));
      s3.appendChild(c);
    }
    box.appendChild(s3);

    const s4 = 小节('特质');
    const 特 = 字典(取(P, ['特质'], {}));
    const 特名 = Object.keys(特);
    if (!特名.length) s4.appendChild(空话('还没有特质。'));
    for (const n of 特名) {
      const t = 字典(取(特, [n], {}));
      s4.appendChild(条目卡(n, 串(取(t, ['标签'], '')), [], 取(t, ['描述'], '')));
    }
    box.appendChild(s4);

    const s5 = 小节('状态');
    const 状 = 字典(取(P, ['状态'], {}));
    const 状名 = Object.keys(状);
    if (!状名.length) s5.appendChild(空话('没有挂着状态。'));
    for (const n of 状名) {
      const t = 字典(取(状, [n], {}));
      s5.appendChild(条目卡(n, [串(取(t, ['来源'], '')), 串(取(t, ['剩余'], ''))]
        .filter(Boolean).join(' · '), [
        一行('检定修正', 取(t, ['检定修正'], '')),
        一行('劣势', 取(t, ['劣势'], '')),
        一行('资源', 取(t, ['资源'], '')),
        一行('抗性', 三项话(取(t, ['抗性'], {}), ['物理', '魔法', '污染'])),
      ], ''));
    }
    box.appendChild(s5);
    return box;
  }

  // ── 角色图鉴 ＝ `角色` 字典（§11.2：可切「按归属」视图）────────────────
  function 角色图鉴页() {
    const box = document.createElement('div');
    if (!读到了没) { box.appendChild(读不到话()); return box; }
    const 表 = 字典(取(变量, ['角色'], {}));
    const 名s = Object.keys(表);
    if (!名s.length) { box.appendChild(空话('还没有同行的角色。')); return box; }

    const 切 = document.createElement('div');
    切.className = 'yc-seg';
    for (const v of ['按人名', '按归属']) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'yc-sb' + (存.图鉴视图 === v ? ' yc-sbon' : '');
      b.setAttribute('data-act', 'view');
      b.setAttribute('data-view', v);
      b.textContent = v;
      切.appendChild(b);
    }
    box.appendChild(切);

    const 一张 = (名) => {
      const c = 字典(取(表, [名], {}));
      const 副 = ['称号', '性别', '种族', '归属', '在场']
        .map((k) => 串(取(c, [k], ''))).filter(Boolean).join(' · ');
      const 五 = 字典(取(c, ['五维'], {}));
      const 三 = 字典(取(c, ['三值'], {}));
      const 值话 = (k) => {
        const o = 字典(取(三, [k], {}));
        return `${串(取(o, ['当前'], '—'))}/${串(取(o, ['上限'], '—'))}`;
      };
      const 五话 = ['力', '敏', '体', '智', '魅']
        .map((k) => `${k}${串(取(五, [k], '—'))}`).join(' ');
      return 条目卡(串(取(c, ['全名'], '')) || 名, 副, [
        一行('好感度', 有符号(取(c, ['好感度'], ''))),
        一行('关系', 取(c, ['关系'], '')),
        一行('身份', 列(取(c, ['身份'], [])).join('、')),
        一行('职业', 列(取(c, ['职业'], [])).join('、')),
        一行('阶位', 取(c, ['阶位'], '')),
        一行('五维', 五话),
        一行('HP/MP/SP', `${值话('HP')} · ${值话('MP')} · ${值话('SP')}`),
      ], '');
    };

    if (存.图鉴视图 === '按归属') {
      const 组 = {};
      for (const n of 名s) {
        const g = 串(取(字典(取(表, [n], {})), ['归属'], '')).trim() || '（未写归属）';
        if (!组[g]) 组[g] = [];
        组[g].push(n);
      }
      for (const g of Object.keys(组).sort()) {
        const s = 小节(`${g}（${组[g].length}）`);
        for (const n of 组[g].slice().sort()) s.appendChild(一张(n));
        box.appendChild(s);
      }
    } else {
      for (const n of 名s.slice().sort()) box.appendChild(一张(n));
    }
    return box;
  }

  // ── 资产 ＝ 一本经营结算账本（§2.1）─────────────────────────────────────
  function 资产页() {
    const box = document.createElement('div');
    if (!读到了没) { box.appendChild(读不到话()); return box; }
    const 表 = 字典(取(变量, ['资产'], {}));
    const 名s = Object.keys(表);
    if (!名s.length) { box.appendChild(空话('还没有产业。')); return box; }

    let 总 = 0, 有总 = false;
    for (const n of 名s) {
      const v = 取(字典(取(表, [n], {})), ['估价'], null);
      if (是数(v)) { 总 += v; 有总 = true; }
    }
    box.appendChild(条目卡('资产', `${名s.length} 处`, [
      一行('总估价', 有总 ? 总 : ''),
    ], ''));

    for (const n of 名s.slice().sort()) {
      const a = 字典(取(表, [n], {}));
      const 级 = 取(a, ['等级'], '');
      const 率 = 取(a, ['回报率'], null);
      const 副 = [
        串(取(a, ['类型'], '')),
        是数(级) ? `等级 ${级}` : '',
        取(a, ['经营者在场'], true) === false ? '经营者不在场 · 经营停摆' : '',
      ].filter(Boolean).join(' · ');
      box.appendChild(条目卡(n, 副, [
        一行('经营者', 取(a, ['经营者'], '')),
        一行('产出', 取(a, ['产出'], '')),
        一行('估价', 是数(取(a, ['估价'], null)) ? 取(a, ['估价'], 0) : ''),
        一行('回报率', 是数(率) ? (率 * 100).toFixed(1) + '%' : ''),
        一行('结算周期', 取(a, ['结算周期'], '')),
        一行('上次结算', 上次话(取(a, ['上次结算日'], {}))),
      ], ''));
    }
    return box;
  }

  function 主角页() {
    const box = document.createElement('div');
    if (!读到了没 || !是对象(取(变量, ['主角'], null))) {
      const e = document.createElement('div');
      e.className = 'yc-empty';
      e.textContent = 读到了没 ? '主角：还没有记录' : '读不到变量 —— 检查酒馆助手装没装、这一楼跑没跑 MVU';
      box.appendChild(e);
      return box;
    }
    const P = 取(变量, ['主角'], {});

    // ── 身份条 ──
    const id = document.createElement('div');
    id.className = 'yc-id';
    const nm = document.createElement('div');
    nm.className = 'yc-idn';
    const 名 = 串(P.全名).trim() || '（无名）';
    const 号 = 串(P.称号).trim();
    nm.textContent = 号 ? `${名} · ${号}` : 名;
    const sub = document.createElement('div');
    sub.className = 'yc-ids';
    sub.textContent = [串(P.性别), 串(P.种族), 串(P.归属)].map((s) => s.trim()).filter(Boolean).join(' · ') || '—';
    id.appendChild(nm);
    id.appendChild(sub);
    box.appendChild(id);

    // ── 阶位 ＋ 职业 ──
    const 阶 = 取(P, ['阶位'], null);
    const 职 = 列(P.职业).map(串).filter(Boolean);
    const 份 = 列(P.身份).map(串).filter(Boolean);
    const lv = document.createElement('div');
    lv.className = 'yc-lv';
    lv.textContent = `${是数(阶) ? 'LV.' + 阶 : 'LV.—'}${职.length ? ' · ' + 职.join('、') : ''}`;
    box.appendChild(lv);
    if (份.length) {
      const sf = document.createElement('div');
      sf.className = 'yc-lvs';
      sf.textContent = '身份：' + 份.join('、');
      box.appendChild(sf);
    }

    // ── 三值 ──
    for (const [k, 名] of [['HP', 'HP'], ['MP', 'MP'], ['SP', 'SP']]) {
      const v = 取(P, ['三值', k], {});
      box.appendChild(条(名, 取(v, ['当前'], null), 取(v, ['上限'], null)));
    }

    // ── 成长 ──
    const 进 = 取(P, ['晋升进度'], null), 满 = 取(P, ['进度满值'], null);
    box.appendChild(条('晋升', 进, 满));
    box.appendChild(数值组('成长', [
      { 名: '属性点', 值: 串(取(P, ['属性点'], '')) },
      { 名: '解锁进度', 值: 是数(取(P, ['解锁进度'], null)) ? 取(P, ['解锁进度'], 0) + '%' : '' },
      { 名: '共鸣度', 值: 串(取(P, ['共鸣度'], '')) },
      { 名: '律座', 值: 取(P, ['律座', '有无'], false) ? 列(取(P, ['律座', '偏向'], [])).join('、') || '有' : '无' },
    ]));

    // ── 数值 ──  §3.4 ②：月痕没有暴击那套，换攻值 / 先攻修正 / 阶级×个体浮动
    box.appendChild(数值组('数值', [
      { 名: '攻', 值: 串(取(P, ['攻', '值'], '')) },
      { 名: '先攻修正', 值: 串(取(P, ['先攻修正'], '')) },
      { 名: '阶级', 值: 串(取(P, ['阶级'], '')) },
      { 名: '个体浮动', 值: 串(取(P, ['个体浮动'], '')) },
    ]));

    // ── 三抗 ──  §3.4 ①
    const 抗 = 取(P, ['三抗'], {});
    box.appendChild(数值组('三抗', [
      { 名: '物理', 值: 是数(抗.物理) ? 抗.物理 + '%' : '' },
      { 名: '魔法', 值: 是数(抗.魔法) ? 抗.魔法 + '%' : '' },
      { 名: '污染', 值: 是数(抗.污染) ? 抗.污染 + '%' : '' },
    ]));

    // ── 五维 ── 🔴 调整值读变量，不自己算
    const 维 = 取(P, ['五维'], {});
    const 调 = 取(P, ['调整值'], {});
    box.appendChild(数值组('五维', ['力', '敏', '体', '智', '魅'].map((k) => ({
      名: k,
      值: 串(取(维, [k], '')),
      注: 是数(取(调, [k], null)) ? '调 ' + (取(调, [k], 0) >= 0 ? '+' : '') + 取(调, [k], 0) : '',
    }))));

    // ── 精神类 ── 🔴 另起一段，不摆成六格平等的卡（§3.4 ③）
    //   五维走 floor((值−10)÷2)，精神类走 floor(值÷10) —— 两轨公式不同。
    const 精 = 取(P, ['精神类'], {});
    box.appendChild(数值组('精神类', ['感知', '幸运值'].map((k) => ({
      名: k,
      值: 串(取(精, [k], '')),
      注: 是数(取(调, [k], null)) ? '调 ' + (取(调, [k], 0) >= 0 ? '+' : '') + 取(调, [k], 0) : '',
    }))));

    // ── 心智 ──
    const 心 = 取(P, ['心智'], {});
    box.appendChild(数值组('心智', [
      { 名: '理智', 值: 串(取(心, ['理智'], '')), 注: '上限 ' + 串(取(心, ['理智上限'], '')) },
      { 名: '稳定性', 值: 串(取(心, ['理智稳定性'], '')) },
      { 名: '人性', 值: 串(取(心, ['人性'], '')) },
      { 名: '月蚀度', 值: 是数(取(心, ['月蚀度'], null)) ? 取(心, ['月蚀度'], 0) + '%' : '', 注: 串(取(心, ['月蚀度阶段'], '')) },
    ]));

    // ── 质点与节点 ── 键名一律带侧前缀（源质·X / 蚀相·X）
    const 节 = 字典(P.节点);
    const 节名 = Object.keys(节);
    const 质点 = document.createElement('div');
    质点.className = 'yc-sec';
    const 质h = document.createElement('div');
    质h.className = 'yc-sech';
    质h.textContent = `节点（${节名.length}）`;
    质点.appendChild(质h);
    if (节名.length) {
      const g = document.createElement('div');
      g.className = 'yc-grid';
      for (const n of 节名) {
        const c = document.createElement('div');
        c.className = 'yc-cell';
        const a = document.createElement('span');
        a.className = 'yc-cn';
        a.textContent = n;
        const b = document.createElement('span');
        b.className = 'yc-cv';
        b.textContent = 串(取(节, [n, '档'], ''));
        c.appendChild(a);
        c.appendChild(b);
        g.appendChild(c);
      }
      质点.appendChild(g);
    } else {
      const e = document.createElement('div');
      e.className = 'yc-empty';
      e.textContent = '还没有节点';
      质点.appendChild(e);
    }
    box.appendChild(质点);

    const 已凝 = 列(P.已凝).map(串).filter(Boolean);
    if (已凝.length) {
      const e = document.createElement('div');
      e.className = 'yc-line';
      e.textContent = '已凝：' + 已凝.join('、');
      box.appendChild(e);
    }

    // ── 技能 ── 轮 1 先出名字 ＋ Lv ＋ 熟练度；细则归「成长」app
    const 技 = 字典(P.技能);
    const 技名 = Object.keys(技);
    const 技块 = document.createElement('div');
    技块.className = 'yc-sec';
    const 技h = document.createElement('div');
    技h.className = 'yc-sech';
    技h.textContent = `技能（${技名.length}）`;
    技块.appendChild(技h);
    if (技名.length) {
      for (const n of 技名) {
        const s = 技[n];
        const row = document.createElement('div');
        row.className = 'yc-row';
        const a = document.createElement('span');
        a.className = 'yc-rn';
        a.textContent = n;
        const b = document.createElement('span');
        b.className = 'yc-rv';
        const lv = 取(s, ['Lv'], null), 熟 = 取(s, ['熟练度'], null);
        b.textContent = `Lv${是数(lv) ? lv : '—'} · ${是数(熟) ? 熟 + '%' : '—'}`;
        row.appendChild(a);
        row.appendChild(b);
        技块.appendChild(row);
      }
    } else {
      const e = document.createElement('div');
      e.className = 'yc-empty';
      e.textContent = '还没有技能';
      技块.appendChild(e);
    }
    box.appendChild(技块);

    // ── 特质 ──
    const 特 = 字典(P.特质);
    const 特名 = Object.keys(特);
    if (特名.length) {
      box.appendChild(数值组(`特质（${特名.length}）`, 特名.map((n) => ({
        名: 串(取(特, [n, '标签'], '')) || '—',
        值: n,
        注: 串(取(特, [n, '描述'], '')),
      }))));
    }

    // ── 状态 ──
    const 状 = 字典(P.状态);
    const 状名 = Object.keys(状);
    if (状名.length) {
      box.appendChild(数值组(`状态（${状名.length}）`, 状名.map((n) => ({
        名: n,
        值: 串(取(状, [n, '剩余'], '')) || '—',
        注: 串(取(状, [n, '来源'], '')),
      }))));
    }

    // ── 金钱 ──
    box.appendChild(数值组('金钱', [
      { 名: '现金', 值: 串(取(P, ['金钱', '现金'], '')) },
      { 名: '资产总值', 值: 串(取(P, ['金钱', '资产总值'], '')) },
    ]));

    // ── 装备（人体图）/ 背包 —— §3.5。🔴 路径在 `主角` 底下，不是顶层。
    box.appendChild(装备块());
    box.appendChild(背包块());

    return box;
  }

  // ── 装备块 ＝ 一张人体图 ＋ 点开看「在装」的（《方案》§3.5）──────────────
  // 🔴 人体图 **不切槽位、不绑部位** —— `装备.部位` 是自由字符串，切 10 格就把它焊死了。
  // 卸 / 换 —— 卡里第一个「玩家直接写变量」的写入方。两问已裁（`D153` ② · `D154` ①）：
  //   注入读**每轮最新值**⇒ 直接改 `stat_data` 是安全的；失败**写提示、不回滚**。成法见 §5.5。
  function 装备块() {
    const box = document.createElement('div');
    if (!读到了没) { box.appendChild(读不到话()); return box; }
    const P = 字典(取(变量, ['主角'], {}));
    const 表 = 字典(取(P, ['装备'], {}));
    const 名s = Object.keys(表);
    const 状之 = (n) => 串(取(字典(取(表, [n], {})), ['状态'], ''));
    const 在装 = 名s.filter((n) => 状之(n) === '在装');
    const 在包 = 名s.filter((n) => 状之(n) !== '在装');

    const 钮 = document.createElement('button');
    钮.type = 'button';
    钮.className = 'yc-body';
    钮.setAttribute('data-act', 'gear');
    钮.setAttribute('aria-expanded', 存.装备展开 ? 'true' : 'false');
    钮.title = '点一下看现在装着什么';

    const NS = 'http://www.w3.org/2000/svg';
    const 形 = (名, 属) => {
      const e = document.createElementNS(NS, 名);
      for (const k in 属) e.setAttribute(k, 属[k]);
      return e;
    };
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 150');
    svg.setAttribute('class', 'yc-fig');
    svg.setAttribute('aria-hidden', 'true');
    // 手画几何 —— 零依赖，不引图标库（轮 2 只做「点得动」的骨架，美术留到最后）
    svg.appendChild(形('circle', { cx: 50, cy: 18, r: 13 }));
    svg.appendChild(形('rect', { x: 36, y: 34, width: 28, height: 50, rx: 8 }));
    svg.appendChild(形('rect', { x: 17, y: 37, width: 12, height: 46, rx: 6 }));
    svg.appendChild(形('rect', { x: 71, y: 37, width: 12, height: 46, rx: 6 }));
    svg.appendChild(形('rect', { x: 38, y: 87, width: 11, height: 60, rx: 5 }));
    svg.appendChild(形('rect', { x: 51, y: 87, width: 11, height: 60, rx: 5 }));
    钮.appendChild(svg);

    const 签 = document.createElement('span');
    签.className = 'yc-bodyn';
    签.textContent = `在装 ${在装.length} 件 · 点一下${存.装备展开 ? '收起' : '展开'}`;
    钮.appendChild(签);
    box.appendChild(钮);

    // 回执放在**收起判断之前** —— 写失败时哪怕图是收着的，玩家也得看得见
    if (提示) {
      const t = document.createElement('div');
      t.className = 'yc-toast' + (提示.坏 ? ' yc-toast-bad' : '');
      t.textContent = 提示.字;
      box.appendChild(t);
    }

    if (!存.装备展开) return box;
    if (!名s.length) { box.appendChild(空话('装备栏是空的。')); return box; }

    const 类之 = (n) => 串(取(字典(取(表, [n], {})), ['类型'], ''));

    for (const n of 在装) {
      const k = 字典(取(表, [n], {}));
      const 炼 = 取(k, ['精炼'], 0), 量 = 取(k, ['数量'], 1);
      const 副 = [
        串(取(k, ['类型'], '')), 串(取(k, ['部位'], '')), 串(取(k, ['型级'], '')),
        是数(炼) && 炼 > 0 ? `精炼 ${炼}` : '',
        是数(量) && 量 > 1 ? `×${量}` : '',
      ].filter(Boolean).join(' · ');
      const c = 条目卡(n, 副, [
        一行('战技', 战技话(k)),
        一行('象征质点', 列(取(k, ['象征质点'], [])).join('、')),
        一行('属性词条', 词条话(取(k, ['属性词条'], []))),
        一行('子词条', 取(k, ['子词条'], '')),
        一行('消耗', 取(k, ['消耗'], '')),
      ], '');

      const 动 = document.createElement('div');
      动.className = 'yc-acts';
      动.appendChild(小钮('卸掉', '脱', n));
      动.appendChild(小钮(换哪件 === n ? '不换了' : '替换', '换', n));
      c.appendChild(动);

      if (换哪件 === n) {
        const p = document.createElement('div');
        p.className = 'yc-pick';
        if (!在包.length) {
          p.appendChild(空话('包里没有别的装备，换不了。'));
        } else {
          const t = document.createElement('div');
          t.className = 'yc-pk-t';
          t.textContent = `拿哪一件换下「${n}」？`;
          p.appendChild(t);
          // 同类型排前面 —— 这是**排序不是限制**：清单里每一件都能换。
          // 卡里 `部位` 是自由字符串、人体图又不绑部位（§3.5），所以不按部位卡人。
          const 序 = 在包.slice().sort((a, b) =>
            (类之(a) === 类之(n) ? 0 : 1) - (类之(b) === 类之(n) ? 0 : 1) || a.localeCompare(b));
          for (const m of 序) {
            const kk = 字典(取(表, [m], {}));
            const 行 = document.createElement('div');
            行.className = 'yc-pk-r';
            const 名 = document.createElement('span');
            名.className = 'yc-pk-n';
            名.textContent = m;
            const 副2 = document.createElement('span');
            副2.className = 'yc-pk-s';
            副2.textContent = [
              串(取(kk, ['类型'], '')), 串(取(kk, ['部位'], '')), 串(取(kk, ['型级'], '')),
              类之(m) === 类之(n) && 类之(n) ? '同类' : '',
            ].filter(Boolean).join(' · ');
            行.appendChild(名);
            行.appendChild(副2);
            行.appendChild(小钮('换上', '换定', m));
            p.appendChild(行);
          }
        }
        c.appendChild(p);
      }
      box.appendChild(c);
    }
    if (!在装.length) box.appendChild(空话('身上没装东西。'));

    if (在包.length) {
      const s = 小节(`在包（${在包.length}）`);
      for (const n of 在包) {
        const k = 字典(取(表, [n], {}));
        const 量 = 取(k, ['数量'], 1);
        s.appendChild(条目卡(n, [
          串(取(k, ['类型'], '')), 串(取(k, ['部位'], '')), 串(取(k, ['型级'], '')),
          是数(量) && 量 > 1 ? `×${量}` : '',
        ].filter(Boolean).join(' · '), [], ''));
      }
      box.appendChild(s);
    }
    // 🔴 这里**只写 `状态` 一格**，别的一个字不动 —— 战技 / 词条 / 精炼全是 AI 那边的账。
    box.appendChild(空话('卸 / 换 只改「状态」一格（在装 ⇄ 在包），其余字段不动。写失败会在这里报一句，变量保持原样。'));
    return box;
  }

  function 背包块() {
    const box = document.createElement('div');
    if (!读到了没) { box.appendChild(读不到话()); return box; }
    const P = 字典(取(变量, ['主角'], {}));
    const 表 = 字典(取(P, ['背包'], {}));
    const 名s = Object.keys(表);
    const s = 小节(`背包（${名s.length}）`);
    if (!名s.length) { s.appendChild(空话('背包是空的。')); box.appendChild(s); return box; }
    for (const n of 名s.slice().sort()) {
      const k = 字典(取(表, [n], {}));
      const 量 = 取(k, ['数量'], 1);
      s.appendChild(条目卡(n, [
        串(取(k, ['类别'], '')), 串(取(k, ['型级'], '')),
        是数(量) && 量 > 1 ? `×${量}` : '',
      ].filter(Boolean).join(' · '), [], 取(k, ['备注'], '')));
    }
    box.appendChild(s);
    return box;
  }

  // ══ 8. UI ═════════════════════════════════════════════════════════════════
  let 球 = null, 窗 = null, 页 = null, 抬头时 = null, 抬头地 = null;
  let 当前页 = 存.上次 || '';
  let 视口监听 = [];
  let 键监听 = null;
  let 已销毁 = false;

  function 注入样式(文档) {
    if (文档.getElementById(挂样式键)) return;
    const s = 文档.createElement('style');
    s.id = 挂样式键;
    // 🔴 轮 1 的壳故意是素的（驾驶员 2026-10-01：美化放到最后）——
    //    只有「看得清 / 点得动」两条要求，没有配色方向、没有字体、没有动效。
    s.textContent = [
      '.yc-ball{position:fixed;z-index:2147483000;width:' + 球尺寸 + 'px;height:' + 球尺寸 + 'px;',
      'border-radius:50%;border:1px solid #8a8f7a;background:#2f3329;color:#e8e6dc;',
      'font:600 17px/1 inherit;cursor:pointer;padding:0;display:flex;align-items:center;',
      'justify-content:center;touch-action:none;user-select:none;-webkit-user-select:none;',
      'pointer-events:auto;box-shadow:0 2px 8px rgba(0,0,0,.35)}',
      '.yc-ball:focus-visible{outline:2px solid #b9c08e;outline-offset:2px}',
      '.yc-win{position:fixed;z-index:2147482999;box-sizing:border-box;width:min(340px,92vw);',
      'max-height:min(560px,80vh);overflow:auto;border:1px solid #8a8f7a;border-radius:10px;',
      'background:#22261d;color:#e8e6dc;font:13px/1.55 system-ui,sans-serif;',
      'box-shadow:0 6px 24px rgba(0,0,0,.45)}',
      '.yc-win[hidden]{display:none}',
      '.yc-head{position:sticky;top:0;display:flex;align-items:flex-start;gap:8px;',
      'padding:8px 10px;background:#2b3024;border-bottom:1px solid #4a5040}',
      '.yc-hl{flex:1;min-width:0}',
      '.yc-h1{font-weight:600;overflow-wrap:anywhere}',
      '.yc-h2{opacity:.8;font-size:12px;overflow-wrap:anywhere}',
      '.yc-x{border:1px solid #6e7460;background:transparent;color:inherit;border-radius:6px;',
      'padding:2px 7px;cursor:pointer;font:inherit}',
      '.yc-body{padding:10px}',
      '.yc-wall{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}',
      '.yc-app{border:1px solid #4a5040;border-radius:8px;background:#2b3024;color:inherit;',
      'font:inherit;padding:10px 4px;cursor:pointer;text-align:center;overflow-wrap:anywhere}',
      '.yc-app[data-off="1"]{opacity:.42;cursor:default}',
      '.yc-appk{display:block;font-size:11px;opacity:.7;margin-top:3px}',
      '.yc-back{border:1px solid #6e7460;background:transparent;color:inherit;border-radius:6px;',
      'padding:3px 9px;cursor:pointer;font:inherit;margin-bottom:9px}',
      '.yc-id{margin-bottom:9px}',
      '.yc-idn{font-size:16px;font-weight:600;overflow-wrap:anywhere}',
      '.yc-ids{opacity:.8;font-size:12px}',
      '.yc-lv{font-weight:600;margin:6px 0 2px}',
      '.yc-lvs{opacity:.8;font-size:12px;margin-bottom:6px}',
      '.yc-bar{display:flex;align-items:center;gap:7px;margin:4px 0}',
      '.yc-bt{width:34px;flex:none;opacity:.85}',
      '.yc-btrack{flex:1;height:8px;border:1px solid #4a5040;border-radius:4px;overflow:hidden}',
      '.yc-bfill{display:block;height:100%;background:#7d8a52}',
      '.yc-bn{flex:none;font-size:12px;opacity:.85}',
      '.yc-sec{margin-top:10px}',
      '.yc-sech{font-weight:600;border-bottom:1px solid #4a5040;padding-bottom:3px;margin-bottom:6px}',
      '.yc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}',
      '.yc-cell{border:1px solid #4a5040;border-radius:7px;padding:5px 7px;background:#2b3024}',
      '.yc-cn{display:block;font-size:11px;opacity:.75}',
      '.yc-cv{display:block;font-weight:600;overflow-wrap:anywhere}',
      '.yc-ca{display:block;font-size:11px;opacity:.7;overflow-wrap:anywhere}',
      '.yc-row{display:flex;gap:8px;padding:4px 0;border-bottom:1px dashed #3c4234}',
      '.yc-rn{flex:1;overflow-wrap:anywhere}',
      '.yc-rv{flex:none;opacity:.85;font-size:12px}',
      '.yc-line{margin-top:6px;font-size:12px;opacity:.85}',
      '.yc-empty{opacity:.65;padding:7px 0;overflow-wrap:anywhere}',
      // 轮 2 新增 —— 条目卡 / 名值行 / 视图切换 / 人体图
      '.yc-card{border:1px solid #4a5040;border-radius:8px;padding:7px 9px;margin:7px 0;background:#282d21}',
      '.yc-ct{font-weight:600;overflow-wrap:anywhere}',
      '.yc-cs{font-size:12px;opacity:.78;margin-bottom:3px;overflow-wrap:anywhere}',
      // 🔴 名值行：键定宽、值**整格折行**，宁可折行不许压字
      '.yc-il{display:flex;gap:8px;padding:2px 0;align-items:baseline}',
      '.yc-ik{flex:none;min-width:60px;font-size:12px;opacity:.7}',
      '.yc-iv{flex:1;min-width:0;overflow-wrap:anywhere}',
      '.yc-seg{display:flex;gap:6px;margin-bottom:8px}',
      '.yc-sb{border:1px solid #6e7460;background:transparent;color:inherit;border-radius:6px;',
      'padding:3px 10px;cursor:pointer;font:inherit;font-size:12px}',
      '.yc-sbon{background:#3d4530}',
      '.yc-body{display:block;width:100%;border:1px solid #4a5040;border-radius:8px;background:#2b3024;',
      'color:inherit;font:inherit;padding:8px;cursor:pointer;margin-bottom:7px}',
      '.yc-fig{display:block;margin:0 auto;width:76px;height:auto}',
      '.yc-fig *{fill:none;stroke:#8a8f7a;stroke-width:2.5;stroke-linejoin:round}',
      '.yc-bodyn{display:block;text-align:center;font-size:12px;opacity:.8;margin-top:5px}',
      // ── 卸 / 换（轮 2 的写入方） ──────────────────────────────────────────
      '.yc-acts{display:flex;gap:6px;margin-top:7px;flex-wrap:wrap}',
      '.yc-mini{border:1px solid #5c6350;background:#333a2a;color:inherit;font:inherit;',
      'font-size:12px;padding:3px 10px;border-radius:6px;cursor:pointer}',
      '.yc-mini:hover{background:#3f4733}',
      '.yc-pick{margin-top:7px;border-top:1px dashed #4a5040;padding-top:7px}',
      '.yc-pk-t{font-size:12px;opacity:.85;margin-bottom:5px}',
      '.yc-pk-r{display:flex;align-items:center;gap:7px;padding:3px 0;flex-wrap:wrap}',
      '.yc-pk-n{flex:0 0 auto;min-width:5em}',
      '.yc-pk-s{flex:1 1 6em;font-size:12px;opacity:.72;overflow-wrap:anywhere}',
      '.yc-toast{margin:0 0 7px;padding:6px 9px;border-radius:7px;font-size:12px;',
      'border:1px solid #55603f;background:#2f3626;overflow-wrap:anywhere}',
      '.yc-toast-bad{border-color:#7a4a3a;background:#33241f}',
    ].join('');
    文档.head.appendChild(s);
  }

  function 定位球() {
    if (!球) return;
    const v = 视口();
    const x = 存.球位.x, y = 存.球位.y;
    if (x === null || y === null) {
      // 默认落右下角
      球.style.left = Math.round(v.x + v.w - 球尺寸 - 14) + 'px';
      球.style.top = Math.round(v.y + v.h - 球尺寸 - 14) + 'px';
    } else {
      球.style.left = Math.round(Math.max(v.x, Math.min(v.x + v.w - 球尺寸, v.x + x * v.w - 球尺寸 / 2))) + 'px';
      球.style.top = Math.round(Math.max(v.y, Math.min(v.y + v.h - 球尺寸, v.y + y * v.h - 球尺寸 / 2))) + 'px';
    }
    球.style.right = '';
    球.style.bottom = '';
  }

  function 定位窗() {
    if (!窗 || 窗.hidden) return;
    const v = 视口();
    let left, top;
    try {
      const r = 球.getBoundingClientRect();
      // 球在左半边 ⇒ 窗贴左边；在右半边 ⇒ 贴右边（别把窗顶到屏幕外）
      left = r.left + r.width / 2 < v.x + v.w / 2 ? r.left : r.left + r.width - 窗.offsetWidth;
      top = r.top - 窗.offsetHeight - 8;
      if (top < v.y + 8) top = r.bottom + 8;
      left = Math.max(v.x + 8, Math.min(v.x + v.w - 窗.offsetWidth - 8, left));
      top = Math.max(v.y + 8, Math.min(v.y + v.h - 窗.offsetHeight - 8, top));
    } catch (_) {
      left = v.x + 14; top = v.y + 14;
    }
    窗.style.left = Math.round(left) + 'px';
    窗.style.top = Math.round(top) + 'px';
    窗.style.right = '';
    窗.style.bottom = '';
  }

  // ── 渲染 ────────────────────────────────────────────────────────────────
  // 页名 → 造页函数。没登记的名字走「还没做」空态。
  const 页工厂 = {
    主角: 主角页,
    资产: 资产页,
    角色图鉴: 角色图鉴页,
    成长: 成长页,
    任务: 任务页,
    特殊事件: 特殊事件页,
  };

  function 刷新() {
    if (!窗) return;
    // 抬头
    const { 时, 地 } = 抬头文字();
    if (抬头时) 抬头时.textContent = 时 || '时刻不详';
    if (抬头地) 抬头地.textContent = '此刻行至 · ' + 地;

    // 页面
    if (!页) return;
    页.textContent = '';
    if (!当前页) {
      const wall = document.createElement('div');
      wall.className = 'yc-wall';
      for (const a of APP表) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'yc-app';
        b.setAttribute('data-app', a.名);
        if (!a.做) b.setAttribute('data-off', '1');
        const n = document.createElement('span');
        n.textContent = a.名;
        const k = document.createElement('span');
        k.className = 'yc-appk';
        k.textContent = a.做 ? a.类 : '未做';
        b.appendChild(n);
        b.appendChild(k);
        wall.appendChild(b);
      }
      页.appendChild(wall);
      return;
    }

    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'yc-back';
    back.setAttribute('data-act', 'back');
    back.textContent = '← 返回';
    页.appendChild(back);

    const 造 = 页工厂[当前页];
    if (造) 页.appendChild(造());
    else {
      const e = document.createElement('div');
      e.className = 'yc-empty';
      e.textContent = `${当前页}：还没做`;
      页.appendChild(e);
    }
  }

  function 开窗() {
    if (!窗) return;
    窗.hidden = false;
    定位窗();
    存.开合 = true; 写存储();
    刷新();
    try { if (球) 球.setAttribute('aria-expanded', 'true'); } catch (_) {}
  }

  function 关窗() {
    if (!窗) return;
    窗.hidden = true;
    存.开合 = false; 写存储();
    try { if (球) 球.setAttribute('aria-expanded', 'false'); } catch (_) {}
  }

  function 进页(名) {
    当前页 = 名;
    存.上次 = 名; 写存储();
    // 回执跟着「这一次动作」走，不跟着会话走 —— 不然十分钟前那条写失败会一直挂在那儿
    // 冒充现状（换页即清；同一个 app 里则留到下一次动作）。
    提示 = null;
    刷新();
  }

  function 点球() {
    if (!窗 || 窗.hidden) 开窗(); else 关窗();
  }

  // ── 建 UI ───────────────────────────────────────────────────────────────
  function 建UI() {
    const 文档 = 取文档();
    if (!文档 || !文档.body) return false;
    注入样式(文档);

    球 = 文档.createElement('button');
    球.type = 'button';
    球.className = 'yc-ball';
    球.setAttribute('aria-label', '遗尘行记');
    球.setAttribute('aria-expanded', 'false');
    球.title = '遗尘行记 —— 点一下开关';
    // 🔴 球心那个字是**临时的**（轮 1 不做图标美术）。做图标时换 SVG path。
    球.textContent = '记';

    窗 = 文档.createElement('div');
    窗.className = 'yc-win';
    窗.hidden = true;
    窗.setAttribute('role', 'region');
    窗.setAttribute('aria-label', '遗尘行记');

    const head = 文档.createElement('div');
    head.className = 'yc-head';
    const hl = 文档.createElement('div');
    hl.className = 'yc-hl';
    抬头时 = 文档.createElement('div');
    抬头时.className = 'yc-h1';
    抬头时.textContent = '时刻不详';
    抬头地 = 文档.createElement('div');
    抬头地.className = 'yc-h2';
    抬头地.textContent = '此刻行至 · 地点不详';
    hl.appendChild(抬头时);
    hl.appendChild(抬头地);
    const x = 文档.createElement('button');
    x.type = 'button';
    x.className = 'yc-x';
    x.setAttribute('data-act', 'close');
    x.setAttribute('aria-label', '关闭');
    x.textContent = '✕';
    head.appendChild(hl);
    head.appendChild(x);

    页 = 文档.createElement('div');
    页.className = 'yc-body';

    窗.appendChild(head);
    窗.appendChild(页);
    文档.body.appendChild(球);
    文档.body.appendChild(窗);

    定位球();
    if (存.开合) 开窗(); else 刷新();
    return true;
  }

  function 绑事件(文档) {
    // ── 球：拖动 or 点击（成法照音乐 §9）────────────────────────────────
    let 按下 = null, 动过 = false;
    球.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      按下 = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId };
      动过 = false;
      try { 球.setPointerCapture(e.pointerId); } catch (_) {}
    });
    球.addEventListener('pointermove', (e) => {
      if (!按下) return;
      const dx = e.clientX - 按下.x, dy = e.clientY - 按下.y;
      if (!动过 && Math.hypot(dx, dy) < 拖动阈值) return;
      动过 = true;
      const v = 视口(), 半 = 球尺寸 / 2;
      球.style.left = Math.round(Math.max(v.x, Math.min(v.x + v.w - 球尺寸, e.clientX - 半))) + 'px';
      球.style.top = Math.round(Math.max(v.y, Math.min(v.y + v.h - 球尺寸, e.clientY - 半))) + 'px';
      球.style.right = ''; 球.style.bottom = '';
      // 🔴 窗得在这里跟着挪 —— 渲染只在数据变了才跑，拖着球走的全程一次都不会跑。
      if (窗 && !窗.hidden) 定位窗();
    });
    const 收尾 = (e, 落位) => {
      if (!按下) return;
      const 是点击 = !动过 && Date.now() - 按下.t < 600;
      按下 = null;
      try { 球.releasePointerCapture(e.pointerId); } catch (_) {}
      if (落位 && 动过) {
        const v = 视口();
        const r = 球.getBoundingClientRect();
        存.球位.x = Math.max(0, Math.min(1, (r.left + r.width / 2) / (v.w || 1)));
        存.球位.y = Math.max(0, Math.min(1, (r.top + r.height / 2) / (v.h || 1)));
        写存储();
      }
      if (是点击) 点球();
    };
    球.addEventListener('pointerup', (e) => 收尾(e, true));
    球.addEventListener('pointercancel', (e) => 收尾(e, false));

    // ── 窗内点击 ──────────────────────────────────────────────────────────
    窗.addEventListener('click', (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      const act = t.closest('[data-act]');
      if (act) {
        const k = act.getAttribute('data-act');
        if (k === 'close') 关窗();
        else if (k === 'back') 进页('');
        else if (k === 'view') {
          const v = act.getAttribute('data-view');
          // 🔴 只认这两个 —— 同「上次」那格，不让野字符串流进渲染
          if (v === '按人名' || v === '按归属') { 存.图鉴视图 = v; 写存储(); 刷新(); }
        } else if (k === 'gear') {
          存.装备展开 = !存.装备展开; 写存储(); 刷新();
        } else if (k === '脱') {
          安全跑(() => 卸掉(act.getAttribute('data-v')));
        } else if (k === '换') {
          const v = act.getAttribute('data-v');
          换哪件 = (换哪件 === v ? null : v);   // 再点一下＝不换了
          提示 = null;
          刷新();
        } else if (k === '换定') {
          const 新 = act.getAttribute('data-v');
          // 旧名从 `换哪件` 拿（不在按钮上）—— 选单本来就是为它开的
          if (换哪件 && 新) 安全跑(() => 换上(换哪件, 新));
        }
        return;
      }
      const app = t.closest('[data-app]');
      if (app) {
        if (app.getAttribute('data-off') === '1') return;   // 未做的不进
        进页(app.getAttribute('data-app'));
      }
    });

    // ── 点窗外关窗 ＋ Esc ────────────────────────────────────────────────
    文档.addEventListener('pointerdown', (e) => {
      if (!窗 || 窗.hidden) return;
      const t = e.target;
      if (t === 球 || (球 && 球.contains && 球.contains(t))) return;
      if (窗.contains(t)) return;
      关窗();
    }, true);

    键监听 = (e) => {
      if (e.key !== 'Escape' || !窗 || 窗.hidden) return;
      关窗();
    };
    文档.addEventListener('keydown', 键监听);
  }

  function 挂视口监听() {
    const w = (() => { try { return 取文档().defaultView || 宿主; } catch (_) { return 宿主; } })();
    视口监听 = [];
    const 跟上 = () => { 定位球(); 定位窗(); };
    try { w.addEventListener('resize', 跟上); 视口监听.push([w, 'resize', 跟上]); } catch (_) {}
    try { w.addEventListener('scroll', 跟上, true); 视口监听.push([w, 'scroll', 跟上]); } catch (_) {}
    try {
      if (w.visualViewport) {
        w.visualViewport.addEventListener('resize', 跟上);
        w.visualViewport.addEventListener('scroll', 跟上);
        视口监听.push([w.visualViewport, 'resize', 跟上]);
        视口监听.push([w.visualViewport, 'scroll', 跟上]);
      }
    } catch (_) {}
  }

  // ══ 9. 卸载 ═══════════════════════════════════════════════════════════════
  function 销毁() {
    已销毁 = true;
    if (同步计时) { clearTimeout(同步计时); 同步计时 = null; }
    for (const [t, e, f] of 视口监听) { try { t.removeEventListener(e, f, true); } catch (_) {} }
    try { for (const [t, e, f] of 视口监听) { try { t.removeEventListener(e, f); } catch (_) {} } } catch (_) {}
    视口监听 = [];
    try { if (键监听) 取文档().removeEventListener('keydown', 键监听); } catch (_) {}
    键监听 = null;
    try { if (球 && 球.parentNode) 球.parentNode.removeChild(球); } catch (_) {}
    try { if (窗 && 窗.parentNode) 窗.parentNode.removeChild(窗); } catch (_) {}
    try { const s = 取文档().getElementById(挂样式键); if (s && s.parentNode) s.parentNode.removeChild(s); } catch (_) {}
    球 = 窗 = 页 = 抬头时 = 抬头地 = null;
    try { delete 宿主[RUNTIME_KEY]; } catch (_) {}
  }

  // ══ 10. 启动 ══════════════════════════════════════════════════════════════
  function 启动() {
    找宿主();

    try {
      const 旧 = 宿主[RUNTIME_KEY];
      if (旧 && 旧.版本 === 版本 && typeof 旧.destroy === 'function') 旧.destroy();
    } catch (_) {}

    取变量();

    if (!建UI()) {
      const 文档 = 取文档();
      if (文档 && 文档.addEventListener) {
        文档.addEventListener('DOMContentLoaded', () => {
          if (!建UI()) { try { console.warn('[遗尘行记] 挂不上 UI'); } catch (_) {} }
          else { try { 绑事件(文档); } catch (_) {} }
        }, { once: true });
        return;
      }
      try { console.warn('[遗尘行记] 找不到可挂载的文档 —— 没起来'); } catch (_) {}
      return;
    }
    绑事件(取文档());
    挂视口监听();

    // 宿主可能比本脚本晚就绪 —— 最多等 20 秒（40 × 500ms），等不到就静默待着。
    let 次数 = 0;
    (function 试订阅() {
      if (订阅变量() || 已销毁) return;
      if (次数++ < 40) setTimeout(() => { 取变量(); 刷新(); 试订阅(); }, 500);
    })();

    try {
      宿主[RUNTIME_KEY] = {
        版本, destroy: 销毁,
        刷新: () => { 取变量(); 刷新(); },
        // 桩测 / 调试用的小口子（真机上用不到）
        探针: () => ({
          读到变量: 读到了没,
          当前页, 内页: APP表.filter((a) => a.做).map((a) => a.名),
          存: JSON.parse(JSON.stringify(存)),
          换哪件, 提示,
        }),
        // 写动作直出（桩测要 await，点击回调那条路不返回 promise）
        卸掉, 换上,
      };
    } catch (_) {}
  }

  启动();
})();

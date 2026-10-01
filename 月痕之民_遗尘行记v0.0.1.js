/* 遗尘行记 v0.0.1 —— 月痕之民 · 卡外脚本（轮 1：外壳 ＋ 存档分层 ＋ 主角）
 *
 * 托管的这一份是全部真代码；卡里只有一句 import（tavern_helper.scripts 第 5 条）。
 *
 *  轮 1 的边界（照《遗尘行记_方案.md》§13）：
 *    ✅ 外壳 —— 悬浮球 / 抽屉 / app 墙；抬头（时间 ＋ 位置链）
 *    ✅ 存档分层 —— localStorage 落地；IndexedDB 只留接口占位（轮 4 才实现）
 *    ✅ 主角 app —— 身份 / 成长 / 三值 / 五维 / 精神 / 心智 / 质点 / 技能 / 特质 / 状态 / 金钱
 *    ⏸ 不做：美化（驾驶员 2026-10-01：美化最后做）· 装备人体图（轮 2）· 其余 13 个 app（占位）
 *
 *  🔴 零依赖 —— 不 import 任何东西。`_` 与 `z` 是酒馆助手注入的全局量，另引会出现三实例地雷。
 *  🔴 单例 —— 挂在宿主 body 上，不是每楼一份（与美化 / 状态栏相反）。
 *
 *  成法来源（都是现读源码，不是凭印象）：
 *    · 宿主发现 / 取文档 / 视口 / 拖拽 / 位置记忆 / 单例 / destroy
 *        ← `月痕之民_音乐v0.0.4.js`（已在真机上趟过两轮坑）
 *    · 变量读法 ← 同一份 §8 ＋ `月痕之民_派生值v0.0.2.js` §5
 */

(function () {
  'use strict';

  // ══ 0. 常量 ═══════════════════════════════════════════════════════════════
  const 版本 = 'v0.0.1';
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
    { 名: '资产', 类: '读卡里的数' },
    { 名: '角色图鉴', 类: '读卡里的数' },
    { 名: '成长', 类: '读卡里的数' },
    { 名: '任务', 类: '读卡里的数' },
    { 名: '特殊事件', 类: '读卡里的数' },
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
    return out;
  }

  function 写存储() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(存)); return true; }
    catch (_) { return false; }
  }

  let 存 = 读存储();

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

  function 取变量() {
    const w = 找宿主();
    try {
      if (w.Mvu && typeof w.Mvu.getMvuData === 'function') {
        let d = w.Mvu.getMvuData({ type: 'message', message_id: 'latest' });
        if (!d || !d.stat_data) d = w.Mvu.getMvuData({ type: 'chat' });
        if (d && d.stat_data) { 变量 = d.stat_data; 读到了没 = true; return 变量; }
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
    const h = document.createElement('div');
    h.className = 'yc-sech';
    h.textContent = 标题;
    box.appendChild(h);
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

    // ── 装备 / 背包 ── ⏸ 轮 2（人体图 ＋ 卸/换）
    const 占 = document.createElement('div');
    占.className = 'yc-empty';
    const 装数 = Object.keys(字典(取(变量, ['装备'], {}))).length;
    const 背数 = Object.keys(字典(取(变量, ['背包'], {}))).length;
    占.textContent = `装备 ${装数} 件 · 背包 ${背数} 件 —— 人体图与卸/换排在轮 2`;
    box.appendChild(占);

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

    if (当前页 === '主角') 页.appendChild(主角页());
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
        }),
      };
    } catch (_) {}
  }

  启动();
})();

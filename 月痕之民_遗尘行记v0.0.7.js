/* 遗尘行记 v0.0.7 —— 月痕之民 · 卡外脚本（轮 4：图库 IndexedDB ＋ CG 收集 ＋ 壁纸 ＋ 风物志图位）
 *
 *  v0.0.7（轮 4）：**图那一层** —— 真 `IndexedDB` 图库（存 / 取 / 删 / 列 / 数，两索引）
 *    ＋ CG 收集 app（选本机的图存进库、按分类看、可删）＋ 壁纸 app（换的是**本 app 壳自己的
 *    背景**，`D157`；不碰正文）＋ 风物志两处图位接上「按地点名找图」。
 *    🔴 **只做「本机的图」那一半** —— 图床来的官方图这轮不做（域名还没定）。
 *    🔴 **卡里一个字不加** —— 这一轮全程卡外（改卡留到轮 5 总装）。
 *
 *  v0.0.6（2026-10-02）：世界书 app —— 把卡里世界书的**带**（`分类_X_开始/结束` 夹出的
 *    order 区间）列出来、一条带一颗开关，开关**真的改世界书**（ST 的注入本来就认 `enabled`）。
 *    ⚠ **发布时漏改本头注释与下面那个 `const 版本`**（两份都还写着 v0.0.5）—— 本版补上。
 *    那不是产物行为问题，是记账漏了。
 *
 *  v0.0.5（轮 3）：生成循环三件套（API 通道 / 破限预设 / 注入预算）＋ 论坛 · 信息 · 局势
 *    · 风物志（图位留空）＋ 设置 app。🔴 存档从 1 个键扩成 3 个（§14.11）：
 *    UI 状态照旧整份吃默认；凭据与手机自产内容**不随版本清**。
 *    🔴 **卡里一个字不加** —— 这一轮全程卡外（改卡留到轮 5 总装）。
 *
 *  v0.0.4 —— 轮 2：🔴 修 §5.5 ⑤ 那个读写分家的坑 —— `message_id` 从 `'latest'` 改成
 *    **显式 `-1`**。`'latest'` 在「读」路上是**最后一条非 system 楼**、在「写」路上是
 *    **绝对最后一楼**（酒馆助手 `variables.ts` 两条分支），最后一条是 system 消息时
 *    **读一楼、写另一楼** ⇒ `读作用域` 那套保证当场失效。数字 `-1` 两边同走 `chat.at(-1)`。
 *  v0.0.3 —— 装备的**卸 / 换** —— 全卡第一个「玩家直接写变量」的写入方（§5.5）。
 *  v0.0.2 —— 资产 · 角色图鉴（两视图）· 成长 · 任务 · 特殊事件（全是只读）＋ 装备人体图 ＋ 背包。
 *  v0.0.1 —— 外壳（球 / 抽屉 / app 墙 / 抬头）· 存档分层 · 主角 app。
 *
 *  ⏸ 未做：图床来的**官方图**（等域名）· 生图通道 · 美化。
 *    ✅ 14 个 app 全做得开了（`APP表` 里 `做: true`）。
 *
 *  🔴 零依赖 —— 不 import 任何东西。`_` 与 `z` 是酒馆助手注入的全局量，另引会出现三实例地雷。
 *  🔴 单例 —— 挂在宿主 body 上，不是每楼一份（与美化 / 状态栏相反）。
 *  🔴 凭据红线 —— API key 只进 `localStorage`，绝不进卡、绝不进世界书、绝不打印到聊天。
 *
 *  成法来源（都是现读源码，不是凭印象）：
 *    · 宿主发现 / 取文档 / 视口 / 拖拽 / 位置记忆 / 单例 / destroy
 *        ← `月痕之民_音乐v0.0.4.js`（已在真机上趟过两轮坑）
 *    · 变量读法 ← 同一份 §8 ＋ `月痕之民_派生值v0.0.2.js` §5
 *    · 变量写法 ← `skill …/st-guides/B1_变量更新规则.md` §5.3（类型声明）
 *        ＋ 酒馆助手 `N0VI028/JS-Slash-Runner` 源码 `src/function/variables.ts` / `macro_like.ts`
 *    · 注入（轮 3）← 酒馆 `public/script.js` 的 `setExtensionPrompt`（定位见 §5.8）
 *        ＋ 参考卡「银鳞」的用法（同一个口、同档位）
 */

(function () {
  'use strict';

  // ══ 0. 常量 ═══════════════════════════════════════════════════════════════
  const 版本 = 'v0.0.7';
  const RUNTIME_KEY = '__yuehenYichenRuntime__';  // 单例键（挂在宿主窗口上）
  const LS_KEY = 'yh.yc.v1';                      // UI 状态。🔴 与美化的 `yh.mh.v1` 是两个键，不共用
  const LS_API = 'yh.yc.api.v1';                  // 凭据 ＋ 四档参数 —— 🔴 不随版本清（§2）
  const LS_DATA = 'yh.yc.data.v1';                // 手机自产内容 —— 🔴 不随版本清（§2）
  const LS_版本 = 1;                              // 存储结构版本 —— 对不上就当没存过，不猜
  const 球尺寸 = 44;
  const 拖动阈值 = 4;                             // 小于它算「点击」，不算拖动
  const 同步去抖 = 120;
  const 挂样式键 = 'yc-style';
  // 注入 —— 位置 / 深度 / 角色三档照酒馆 `script.js` 的枚举（§5.8）
  const 注入键 = 'yh-yc-phone';
  const 注入位置 = 1;                             // extension_prompt_types.IN_CHAT
  const 注入深度 = 3;
  const 注入角色 = 0;                             // extension_prompt_roles.SYSTEM
  const 请求超时 = 60000;
  const 重试退避 = [1000, 2000, 4000];
  const 档名s = ['论坛', '信息', '局势', '风物志'];
  // 每类的条数上限 —— 超了砍最早的（照 `B7` 成法）。真无限存档等轮 4 的 IndexedDB。
  const 条数上限 = { 论坛: 200, 会话: 300, 群: 300, 动向: 40, 风物: 60 };
  // 信息 app 默认要带的那份世界书核心名单（每条都在卡里，名字对不上就跳过）
  const 默认书单 = ['世界设定总纲', '力量体系_总纲', '智慧种族总览', '货币体系总则', '历法系统', '品级总纲'];

  // 四档破限预设 —— 玩家能改、能恢复默认（§4.3）。恢复默认只重置参数类，不动地址/key。
  const 默认破限 = {
    论坛: [
      '你是「月痕之民」世界里一座城市的市井论坛后台。玩家在手机上看这个论坛。',
      '',
      '硬规则：',
      '一、只输出一个 JSON 数组，不要解释、不要代码块围栏。',
      '二、每条帖子四格：标题、作者、热度（整数）、正文（60–200 字）。可带 0–3 条回帖，',
      '    每条回帖两格：作者、内容（20–80 字）。',
      '三、作者是一群普通人 —— 车夫、学徒、巡夜人、摊贩、退伍兵、账房。写他们的口气，',
      '    不是叙事者的口气。',
      '四、不许出现玩家角色的视角、心理活动，以及只有玩家知道的事。',
      '    论坛上的人不知道玩家做了什么，他们只知道自己看见的。',
      '五、每一条帖子都要有它自己的由头 —— 先有事情，才有帖子。',
      '六、可以互相抬杠、可以说错话、可以有人不信。不要人人都在讲道理。',
    ].join('\n'),
    信息: [
      '你是「月痕之民」世界里手机上的私聊对象。玩家在手机上跟人发消息。',
      '',
      '硬规则：',
      '一、只输出一个 JSON 对象，不要解释、不要代码块围栏：{"回":[{"谁":"名字","字":"…"}]}',
      '二、线上交流 ≠ 面对面。消息要短、要像在打字 —— 一句到三句，可以拆成连着几条。',
      '三、对方只能知道他自己该知道的事。正文里还没发生的事、玩家没告诉他的事，他不知道。',
      '四、手机聊天是正文剧情的延伸，不是代替 —— 不推进主线情节、不替玩家做决定、',
      '    不产生新的既成事实。',
      '五、对方有他自己的事要忙。可以不回、可以晚回、可以答非所问、可以只回一个字。',
    ].join('\n'),
    局势: [
      '你是「月痕之民」世界里的说书人，负责讲这一带的盘子怎么动。',
      '',
      '硬规则：',
      '一、只输出一个 JSON 数组，不要解释、不要代码块围栏。',
      '二、每条四格：阶段、类型、地点、简述。',
      '三、阶段只能是「起」「承」「转」「合」之一。一件动向从「起」慢慢走到「合」；',
      '    走到「合」就是收场，之后不再讲它。',
      '四、类型是两个字的名分（如 兵事 / 商路 / 宗门 / 疫病 / 朝局 / 灾异）。',
      '五、简述不少于 50 字，写清：谁在动、动什么、现在卡在哪一步、往下会怎样。',
      '六、这些事要有它自己的来处 —— 起因在玩家看不见的地方，不是为玩家准备的。',
    ].join('\n'),
    风物志: [
      '你是「月痕之民」世界里的方志作者，负责写一个地方的见闻。',
      '',
      '硬规则：',
      '一、只输出一个 JSON 对象，不要解释、不要代码块围栏：{"见闻":"…"}',
      '二、只写这一处地方看得见摸得着的东西 —— 地形、气候、街巷、吃食、口音、行当、',
      '    庙宇、路上的规矩。',
      '三、200–400 字。',
      '四、不许写成任务简报、不许给玩家派活、不许提示玩家去做什么。',
      '五、这个地方有它自己的来处 —— 先有它为什么在这儿，才有它现在什么样。',
    ].join('\n'),
  };

  // 14 个 app（照《方案》§2）。🔴 「成就」不在里面 —— 它是挂起项，不算在 14 里。
  const APP表 = [
    { 名: '主角', 类: '读卡里的数', 做: true },
    { 名: '资产', 类: '读卡里的数', 做: true },
    { 名: '角色图鉴', 类: '读卡里的数', 做: true },
    { 名: '成长', 类: '读卡里的数', 做: true },
    { 名: '任务', 类: '读卡里的数', 做: true },
    { 名: '特殊事件', 类: '读卡里的数', 做: true },
    { 名: '论坛', 类: 'AI 现场编', 做: true },
    { 名: '信息', 类: 'AI 现场编', 做: true },
    { 名: '局势', 类: 'AI 现场编', 做: true },
    { 名: '风物志', 类: 'AI 现场编', 做: true },
    { 名: 'CG 收集', 类: '图', 做: true },
    { 名: '壁纸', 类: '图', 做: true },
    { 名: '世界书', 类: '壳与配置', 做: true },
    { 名: '设置', 类: '壳与配置', 做: true },
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
    壁纸: '',           // 壁纸用的是图库里哪一条（'' ＝ 没有）—— 🔴 只存**指针**，图本身在 IndexedDB
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
    // 壁纸只认**正整数** —— 图库里 `id` 是自增整数，别的一律当没有（不让野值流进取图那一步）。
    // ⚠ 这里**不能用 `是数()`** —— 它是 §5 的 `const`，而本函数在 §2 就要跑（`存 = 读存储()`），
    //    引用到它就是暂时性死区，一进游戏就炸。只有 `夹()` 是本节自带的。
    const w = o.壁纸;
    if (typeof w === 'number' && Number.isFinite(w) && w > 0 && w === Math.floor(w)) out.壁纸 = w;
    return out;
  }

  function 写存储() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(存)); return true; }
    catch (_) { return false; }
  }

  let 存 = 读存储();

  // ── 2.2 凭据 ＋ 手机自产内容（轮 3 新增的两层）────────────────────────────
  // 🔴 与 2.1 那条「版本对不上整份吃默认值」**分家** —— 一次结构升级把玩家的 key
  //    或攒了几十轮的私聊记录清掉，是**事故**。这两个键只做「逐字段夹值」：
  //    读得出来的格照读，读不出来的那一格才吃默认。
  // 🔴 API key 只进 localStorage —— 绝不进卡、绝不进世界书、绝不打印到聊天。
  // ⚠ localStorage **不是保险箱**：同源脚本都读得到，换设备 / 清缓存就没了。
  //    这是浏览器给的边界，不是这里能修的 —— 要写进发行说明。

  const 空配置 = () => ({
    版本: 1,
    地址: '', 钥: '', 模型: '',
    档: {
      论坛: { 模型: '', 温度: 0.9, 上限: 1200, 破限: 默认破限.论坛, 自定义: '', 自动: false, 间隔: 3, 带书: true, 带楼: 4, 书单: 默认书单.slice() },
      信息: { 模型: '', 温度: 0.9, 上限: 600, 破限: 默认破限.信息, 自定义: '', 自动: false, 间隔: 2, 带书: true, 带楼: 8, 书单: 默认书单.slice() },
      局势: { 模型: '', 温度: 0.85, 上限: 800, 破限: 默认破限.局势, 自定义: '', 自动: false, 间隔: 5, 带书: true, 带楼: 6, 书单: 默认书单.slice() },
      风物志: { 模型: '', 温度: 0.9, 上限: 900, 破限: 默认破限.风物志, 自定义: '', 自动: false, 间隔: 4, 带书: true, 带楼: 4, 书单: 默认书单.slice() },
    },
    自动总: false,
    注入: { 总: 6000, 单档: 1500, 段: { 私信摘要: true, 局势动向: true, 论坛动态: true, 风物见闻: true } },
    面板: { 球: true },
  });

  const 空数据 = () => ({
    版本: 1,
    论坛: [],     // 帖：{标题,作者,热度,正文,回帖[{作者,内容}]}，新的在前
    会话: {},     // 名 → { 条: [{谁:'我'|'他', 字}], 未读 }
    群: {},       // 群名 → { 成员: [], 条: [], 未读 }
    动向: [],     // {阶段,类型,地点,简述}，新的在前
    风物: {},     // 乙·现生成的地点 → { 字 }
    末次: {},     // 档名 → 上次生成时的楼层数（自动生成的回合账）
  });

  // 读不出来的一律吃掉，不让野值流进渲染
  function 读配置() {
    const 空 = 空配置();
    let o = null;
    try { o = JSON.parse(localStorage.getItem(LS_API) || 'null'); } catch (_) { o = null; }
    if (!o || typeof o !== 'object' || Array.isArray(o)) return 空;
    const 串v = (v) => (v === undefined || v === null ? '' : String(v));
    const 表v = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});

    空.地址 = 串v(o.地址).trim();
    空.钥 = 串v(o.钥);
    空.模型 = 串v(o.模型).trim();

    const 档s = 表v(o.档);
    for (const n of 档名s) {
      const d = 表v(档s[n]);
      const p = 空.档[n];
      p.模型 = 串v(d.模型).trim();
      p.温度 = 夹(d.温度, 0, 2, p.温度);
      p.上限 = Math.round(夹(d.上限, 100, 8000, p.上限));
      // 🔴 空破限 ＝ 回默认。留一个空串就是把这档的护栏全撤了，不能让它存进去。
      const 破 = 串v(d.破限);
      p.破限 = 破.trim() ? 破 : p.破限;
      p.自定义 = 串v(d.自定义);
      p.自动 = !!d.自动;
      p.间隔 = Math.round(夹(d.间隔, 1, 100, p.间隔));
      p.带书 = !!d.带书;
      p.带楼 = Math.round(夹(d.带楼, 0, 60, p.带楼));
      if (Array.isArray(d.书单)) p.书单 = d.书单.map(串v).map((s) => s.trim()).filter(Boolean);
    }

    空.自动总 = !!o.自动总;
    const inj = 表v(o.注入);
    空.注入.总 = Math.round(夹(inj.总, 1000, 50000, 空.注入.总));
    空.注入.单档 = Math.round(夹(inj.单档, 200, 20000, 空.注入.单档));
    const 段s = 表v(inj.段);
    for (const k of Object.keys(空.注入.段)) if (k in 段s) 空.注入.段[k] = !!段s[k];
    const 面 = 表v(o.面板);
    if ('球' in 面) 空.面板.球 = !!面.球;

    // 🔴 没配地址 ⇒ 自动生成强制关掉（花的是玩家自己的钱）
    if (!空.地址) 空.自动总 = false;
    return 空;
  }

  function 写配置() {
    try { localStorage.setItem(LS_API, JSON.stringify(配置)); return true; }
    catch (_) { return false; }
  }

  function 读数据() {
    const 空 = 空数据();
    let o = null;
    try { o = JSON.parse(localStorage.getItem(LS_DATA) || 'null'); } catch (_) { o = null; }
    if (!o || typeof o !== 'object' || Array.isArray(o)) return 空;
    const 串v = (v) => (v === undefined || v === null ? '' : String(v));
    const 表v = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
    const 列v = (v) => (Array.isArray(v) ? v : []);

    空.论坛 = 列v(o.论坛).filter((t) => t && typeof t === 'object').slice(0, 条数上限.论坛)
      .map((t) => ({
        标题: 串v(t.标题), 作者: 串v(t.作者), 热度: Number.isFinite(Number(t.热度)) ? Number(t.热度) : 0,
        正文: 串v(t.正文),
        回帖: 列v(t.回帖).filter((r) => r && typeof r === 'object').slice(0, 20)
          .map((r) => ({ 作者: 串v(r.作者), 内容: 串v(r.内容) })),
      }));

    const 会s = 表v(o.会话);
    for (const n of Object.keys(会s).slice(0, 80)) {
      const c = 表v(会s[n]);
      if (!n.trim()) continue;
      空.会话[n] = {
        条: 列v(c.条).filter((m) => m && typeof m === 'object').slice(-条数上限.会话)
          .map((m) => ({ 谁: 串v(m.谁) === '我' ? '我' : '他', 字: 串v(m.字) })),
        未读: Math.max(0, Math.round(夹(c.未读, 0, 999, 0))),
      };
    }

    const 群s = 表v(o.群);
    for (const n of Object.keys(群s).slice(0, 40)) {
      const g = 表v(群s[n]);
      if (!n.trim()) continue;
      空.群[n] = {
        成员: 列v(g.成员).map(串v).map((s) => s.trim()).filter(Boolean).slice(0, 20),
        条: 列v(g.条).filter((m) => m && typeof m === 'object').slice(-条数上限.群)
          .map((m) => ({ 谁: 串v(m.谁), 字: 串v(m.字) })),
        未读: Math.max(0, Math.round(夹(g.未读, 0, 999, 0))),
      };
    }

    空.动向 = 列v(o.动向).filter((x) => x && typeof x === 'object').slice(0, 条数上限.动向)
      .map((x) => ({
        阶段: ['起', '承', '转', '合'].includes(串v(x.阶段)) ? 串v(x.阶段) : '起',
        类型: 串v(x.类型), 地点: 串v(x.地点), 简述: 串v(x.简述),
      }));

    const 风s = 表v(o.风物);
    const 风名 = Object.keys(风s).slice(-条数上限.风物);
    for (const n of 风名) {
      const f = 表v(风s[n]);
      if (n.trim() && 串v(f.字)) 空.风物[n] = { 字: 串v(f.字) };
    }

    const 末 = 表v(o.末次);
    for (const n of 档名s) {
      const v = Number(末[n]);
      if (Number.isFinite(v) && v >= 0) 空.末次[n] = Math.floor(v);
    }
    return 空;
  }

  function 写数据() {
    try { localStorage.setItem(LS_DATA, JSON.stringify(数据)); return true; }
    catch (_) { return false; }
  }

  // 🔴 这两格**不进存档**（故意的）：`换哪件` 是「替换」选到一半的状态，
  //    重开一次还留着半开的选人框没有意义；`提示` 是一次性回执，更不该跨会话留着。
  let 换哪件 = null;      // 正在给哪一件找替换（null ＝ 没在换）
  let 提示 = null;        // { 坏: bool, 字: '…' } —— 卸/换 的回执，成功后也报一句

  // ══ 3. 图库（IndexedDB 层） ═══════════════════════════════════════════════
  // 轮 1 只留了占位；轮 4 重写成真的。
  // 🔴 **图不进 localStorage** —— 那边一般只有 5–10MB，而且存不了二进制。
  // 一条记录：`{ id, 分类, 来源, 名, 引用, 图, 时 }`
  //   `分类` ∈ 角色 / 地点 / 剧情（照 `扩展规划.md` §1.4 那三格）· `来源` ∈ 本机 / 图床
  //   `图`   ＝ Blob（**本机**的图，真字节）· `引用` ＝ 字符串（**图床**来的只存路径，不存图）
  // 🔴 **`引用` 一律当不透明字符串** —— 不切 `/`、不读扩展名、不认 `·`、不拼域名。
  //    图床那边的目录规范还会变，在这儿解析它 ＝ 把别人的临时约定焊进我的库。
  // 🔴 图库**不筛** —— 列出来就是全列，要哪一类由调用方自己挑（同「账本不筛」）。
  // ⚠ 拿不到 IndexedDB 时**明说不可用**（`可用()` 会给人话），界面照画、不静默假装存上了。
  const 库名 = 'yh-yc-img';
  const 库版本 = 1;
  const 图分类s = ['角色', '地点', '剧情'];
  const 图来源s = ['本机', '图床'];

  const 图库 = (() => {
    let 库 = null;         // 开着就是 IDBDatabase
    let 坏 = '';           // 非空 ＝ 用不了，里面是人话
    let 开着 = null;       // 开库那一次 Promise（并发调用共用，别开两回）

    function 开() {
      if (坏) return Promise.reject(new Error(坏));
      if (库) return Promise.resolve(库);
      if (开着) return 开着;
      let 全 = null;
      try { if (typeof indexedDB !== 'undefined' && indexedDB) 全 = indexedDB; } catch (_) {}
      if (!全) { 坏 = '这个浏览器不给用 IndexedDB'; return Promise.reject(new Error(坏)); }
      开着 = new Promise((好, 拒) => {
        let q;
        try { q = 全.open(库名, 库版本); } catch (e) { 拒(e); return; }
        q.onupgradeneeded = () => {
          const db = q.result;
          if (db.objectStoreNames.contains('图')) return;   // 已经建过就别再动 —— 升版会清库
          const s = db.createObjectStore('图', { keyPath: 'id', autoIncrement: true });
          s.createIndex('分类', '分类', { unique: false });
          s.createIndex('来源', '来源', { unique: false });
        };
        q.onsuccess = () => { 库 = q.result; 好(库); };
        q.onerror = () => 拒(q.error || new Error('开不了'));
        q.onblocked = () => 拒(new Error('被另一个窗口占着'));
      }).catch((e) => {
        坏 = '图库开不了：' + (e && e.message ? e.message : e);
        开着 = null;
        throw new Error(坏);
      });
      return 开着;
    }

    // 一次事务、一个请求。`事` 收下 objectStore，返回一个请求 —— 结果在事务 complete 时才给。
    function 跑(模式, 事) {
      return 开().then((db) => new Promise((好, 拒) => {
        let tx;
        try { tx = db.transaction('图', 模式); } catch (e) { 拒(e); return; }
        let 收;
        try {
          const r = 事(tx.objectStore('图'));
          if (r) r.onsuccess = () => { 收 = r.result; };
        } catch (e) { 拒(e); return; }
        tx.oncomplete = () => 好(收);
        tx.onerror = () => 拒(tx.error || new Error('读写失败'));
        tx.onabort = () => 拒(tx.error || new Error('读写被打断'));
      }));
    }

    // 收进来的东西先归一 —— 只留表里那几个字段，分类/来源认不得就落回第一格。
    function 归一(v) {
      const 条 = v || {};
      const out = {
        分类: 图分类s.indexOf(条.分类) >= 0 ? 条.分类 : 图分类s[0],
        来源: 图来源s.indexOf(条.来源) >= 0 ? 条.来源 : 图来源s[0],
        名: 串(条.名),
        引用: 串(条.引用),
        图: 条.图 || null,
        时: typeof 条.时 === 'number' && Number.isFinite(条.时) ? 条.时 : Date.now(),
      };
      // ⚠ `id` 只在**本来就有**的时候带上。带上 ＝ 覆盖那一条；不带 ＝ 自增一条新的。
      if (typeof 条.id === 'number' && Number.isFinite(条.id) && 条.id > 0) out.id = 条.id;
      return out;
    }

    // 🔴 世代号：每次「存 / 删」都 +1。它是给**缓存**用的 —— 风物志的图索引、壁纸那张图，
    //    都各自缓着上一次的读数；库在底下被改过之后，光看「我要的那个 id / 名字还在不在」是
    //    看不出来的（`取` 成功过就以为没事）。缓存记下自己是哪一代读的，跟当前代一比就知道该重读。
    let 世代 = 0;

    return {
      // '' ＝ 能用；非空 ＝ 一句人话，界面直接显示它
      可用: function () { return 开().then(() => '', (e) => 坏 || 串(e && e.message ? e.message : e)); },
      代: function () { return 世代; },
      分类s: 图分类s,
      来源s: 图来源s,
      // 「存」是**覆盖或新增**（`put`）—— 带 `id` 就是改那一条（改分类走这条路），
      // 不带 `id` 就是新加一条。返回落库那条的 id。
      存: function (r) {
        const 条 = 归一(r);
        // 🔴 两种来源各自的必填不一样。两样都没有 ＝ 一条既画不出也查不到的空记录，不许落库。
        if (!条.名) return Promise.reject(new Error('这条图没有名字，存不了'));
        if (条.来源 === '本机' && !条.图) return Promise.reject(new Error('本机的图没带图字节，存不了'));
        if (条.来源 === '图床' && !条.引用) return Promise.reject(new Error('图床的图没有引用，存不了'));
        return 跑('readwrite', (s) => s.put(条)).then((id) => { 世代++; return id; });
      },
      取: function (id) { return 跑('readonly', (s) => s.get(id)).then((v) => v || null); },
      删: function (id) { return 跑('readwrite', (s) => s.delete(id)).then((v) => { 世代++; return v; }); },
      // 筛：{分类, 来源} 都可省。**新的在前**。
      列: function (筛) {
        const f = 筛 || {};
        return 开().then((db) => new Promise((好, 拒) => {
          let tx;
          try { tx = db.transaction('图', 'readonly'); } catch (e) { 拒(e); return; }
          const 出 = [];
          let r;
          try {
            const s = tx.objectStore('图');
            let KR = null;
            try { if (typeof IDBKeyRange !== 'undefined') KR = IDBKeyRange; } catch (_) {}
            // 有「分类」且拿得到 `IDBKeyRange` ⇒ 走索引；否则整表扫一遍 —— 两条路出的是同一份结果
            r = (f.分类 && KR && 图分类s.indexOf(f.分类) >= 0)
              ? s.index('分类').openCursor(KR.only(f.分类))
              : s.openCursor();
          } catch (e) { 拒(e); return; }
          r.onsuccess = () => {
            const c = r.result;
            if (!c) return;
            const v = c.value || {};
            if ((!f.分类 || v.分类 === f.分类) && (!f.来源 || v.来源 === f.来源)) 出.push(v);
            c.continue();
          };
          tx.oncomplete = () => 好(出.sort((a, b) => (b.时 || 0) - (a.时 || 0)));
          tx.onerror = () => 拒(tx.error || new Error('读失败'));
          tx.onabort = () => 拒(tx.error || new Error('读被打断'));
        }));
      },
      数: function (筛) { return 图库.列(筛).then((a) => a.length); },
    };
  })();

  // ── 图在页面上要先变成对象地址 ─────────────────────────────────────────────
  // 🔴 每个地址都要还（`revokeObjectURL`）—— 不然来回翻几趟 CG 页，内存里攒一堆没人引用的图。
  //    页面用的地址每次重画都清一批（`清图址` 挂在 `刷新()` 头上）；
  //    **壁纸那个地址单独放**，不然一次刷新就把背景图撤没了。
  let 图址s = [];
  let 壁纸址 = '';        // 当前挂在壳上的那张的地址（'' ＝ 没挂）
  let 壁纸已画 = null;    // 已经画上去的那一条的 id（避免每次刷新重取一遍图）
  let 壁纸已画代 = -1;    // 画上去时是**哪一代**（同 `地图索引代`）—— 那一条在别处被删/被换，靠它认出来
  function 造址(b) { try { return URL.createObjectURL(b); } catch (_) { return ''; } }
  function 清图址() {
    for (const u of 图址s) { try { URL.revokeObjectURL(u); } catch (_) {} }
    图址s = [];
  }
  function 图址(b) { const u = 造址(b); if (u) 图址s.push(u); return u; }

  // 图位上放一张图 —— 有就画，没有就留空框（**不假装有**）。
  function 图上(el, 图) {
    if (!图) return false;
    const src = 图址(图);
    if (!src) return false;
    const im = document.createElement('img');
    im.className = 'yc-fi';
    im.src = src;
    im.alt = '';
    el.appendChild(im);
    el.classList.add('yc-has');
    return true;
  }

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
    同步计时 = setTimeout(() => {
      同步计时 = null;
      取变量();
      刷新();
      // 🔴 回合检查挂在这儿 —— 变量落定之后才算「这一回合过去了」
      try { 查自动(); } catch (_) {}
    }, 同步去抖);
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

  // ══ 5.6 轮 3 的两层存档 ＋ 运行态 ═════════════════════════════════════════
  // 🔴 初始化放在这里（不是 §2）—— 读配置 / 读数据要用 §5 那些取数工具，
  //    而 §2 在它们的暂时性死区里。
  let 配置 = null;
  let 数据 = null;
  配置 = 读配置();
  数据 = 读数据();

  let 正在生成 = null;     // 档名 —— 生成中（四态里的那一态）
  let 队 = [];             // [{档, 因:'自动'|'手动', 件}]
  let 队忙 = false;
  let 注入读数 = { 用字: 0, 丢: [], 总: 0, 成了: false, 话: '' };
  let 测中 = false;        // 测试连接 / 拉模型 的进行态
  let 测果 = null;         // { 坏, 字 } | { 坏:false, 列:[…] }
  let 设档 = 'API';        // 设置页的分段
  let 会话选中 = null;     // 信息 app 里点开了谁（null ＝ 会话列表）
  let 帖展开 = null;       // 论坛里点开了第几条（下标）
  let 地点选中 = null;     // 风物志里点开的地点名
  let 风筛选 = { 界域: '', 大区: '', 地域: '', 词: '' };
  let 录中 = null;         // { 类:'单聊'|'群', 名 } —— 正在录群成员
  let 确认默认 = 0;        // 「恢复默认」两段确认的时间戳（6 秒内点第二下才算）

  // 风物志的三层筛选 ＋ 搜索 —— **只切 `hidden`，不重画**。
  // 🔴 重画会让搜索框丢焦点（每敲一个字光标都跑掉），所以判据走卡上的 `data-*` 属性。
  function 卡合(c) {
    for (const 键 of ['界域', '大区', '地域']) {
      const w = 风筛选[键];
      if (w && w !== '全部' && 串(c.getAttribute('data-' + 键)).trim() !== w) return false;
    }
    const q = 风筛选.词.trim().toLowerCase();
    if (q && !串(c.getAttribute('data-s')).toLowerCase().includes(q)) return false;
    return true;
  }
  function 筛卡() {
    if (!页 || 当前页 !== '风物志' || 地点选中 !== null) return;
    const 卡s = 页.querySelectorAll('.yc-fcard');
    if (!卡s.length) return;
    let 显 = 0;
    for (const c of 卡s) {
      const ok = 卡合(c);
      if (ok) { c.removeAttribute('hidden'); 显++; } else c.setAttribute('hidden', '1');
    }
    const 旧 = 页.querySelector('.yc-fempty');
    if (旧) 旧.remove();
    if (!显) {
      const e = 空话('没有符合条件的地点。');
      e.classList.add('yc-fempty');
      页.appendChild(e);
    }
  }

  function 存配置() { 写配置(); }
  function 存数据() { 写数据(); }

  // ══ 5.7 酒馆接口（注入 / 楼层 / 世界书） ══════════════════════════════════
  // 🔴 `window.SillyTavern` 是**酒馆助手自己在 iframe 里定义的**（`src/iframe/predefine.js`：
  //    `Object.defineProperty(window,'SillyTavern',{get(){ return {...SillyTavern.getContext(), getContext} }})`）
  //    ⇒ 每次读都是新对象，`ctx.chat` 拿到的是同一份活引用。
  const 是期约 = (v) => !!v && typeof v.then === 'function';

  function 酒馆上下文() {
    let 次 = null;
    for (const w of 候选窗口()) {
      try {
        const S = w.SillyTavern;
        if (!S) continue;
        let c = null;
        if (typeof S.getContext === 'function') { try { c = S.getContext(); } catch (_) {} }
        if (!c || typeof c !== 'object') c = typeof S.setExtensionPrompt === 'function' ? S : null;
        if (!c) continue;
        if (typeof c.setExtensionPrompt === 'function') return c;  // 首选能注入的那个
        if (!次) 次 = c;
      } catch (_) {}
    }
    return 次;
  }

  function 找TH() {
    for (const w of 候选窗口()) {
      try { const T = w.TavernHelper; if (T && typeof T === 'object') return T; } catch (_) {}
    }
    return null;
  }

  // 「回合」＝ 聊天里的非 system 楼层数。🔴 数不出来就返回 null —— 自动生成整个不跑。
  //    猜一个（比如按自己的事件计数）＝ 一个会自己漂移的假真源，不如老实不动。
  function 楼层数() {
    const c = 酒馆上下文();
    if (!c || !Array.isArray(c.chat)) return null;
    let n = 0;
    for (const m of c.chat) if (m && !m.is_system) n++;
    return n;
  }

  function 近楼(n) {
    const c = 酒馆上下文();
    if (!c || !Array.isArray(c.chat) || !n) return [];
    const 净 = c.chat.filter((m) => m && !m.is_system);
    return 净.slice(-n).map((m) => ({ 名: 串(m.name), 文: 串(m.mes) }));
  }

  function 现状话() {
    if (!读到了没) return '';
    const { 时, 地 } = 抬头文字();
    const 角 = 字典(取(变量, ['角色'], {}));
    const 在场 = Object.keys(角).filter((n) => 串(取(角, [n, '在场'], '')) === '在场');
    const 段 = [];
    if (时) 段.push('时间：' + 时);
    if (地) 段.push('地点：' + 地);
    if (在场.length) 段.push('在场：' + 在场.join('、'));
    return 段.length ? '【现状】\n' + 段.join('　') : '';
  }

  // 世界书 —— 卡内嵌那一本（`TavernHelper.getCharWorldbookNames('current')`）。
  // 🔴 只读，绝不写。读不到就返回空，不抛。
  const 书缓存 = { 键: '', 表: null };
  async function 世界书表() {
    const T = 找TH();
    if (!T || typeof T.getCharWorldbookNames !== 'function' || typeof T.getWorldbook !== 'function') return null;
    let 名s = null;
    try { 名s = T.getCharWorldbookNames('current'); } catch (_) { return null; }
    if (是期约(名s)) { try { 名s = await 名s; } catch (_) { return null; } }
    if (!名s || typeof 名s !== 'object') return null;
    const 要 = [名s.primary].concat(Array.isArray(名s.additional) ? 名s.additional : []).filter(Boolean);
    if (!要.length) return null;
    const 键 = 要.join('|');
    if (书缓存.键 === 键 && 书缓存.表) return 书缓存.表;
    const 表 = {};
    for (const n of 要) {
      let w = null;
      try { w = T.getWorldbook(n); } catch (_) {}
      if (是期约(w)) { try { w = await w; } catch (_) { w = null; } }
      const 列s = Array.isArray(w) ? w : (w && Array.isArray(w.entries) ? w.entries : []);
      for (const e of 列s) {
        const nm = 串(e && e.name).trim();
        if (nm && !(nm in 表)) 表[nm] = 串(e && e.content);
      }
    }
    书缓存.键 = 键; 书缓存.表 = 表;
    return 表;
  }

  // 取书单里那几条的正文。取不到的记进 `缺`（设置页要看得见 —— 不静默吞）
  async function 取书(名s) {
    const 表 = await 世界书表();
    if (!表) return { 文: '', 缺: 名s.slice(), 字: 0 };
    const 段 = [], 缺 = [];
    let 字 = 0;
    for (const n of 名s) {
      const c = 串(表[n]).trim();
      if (c) { 段.push(`【${n}】\n${c}`); 字 += c.length; } else 缺.push(n);
    }
    return { 文: 段.join('\n\n'), 缺, 字 };
  }

  // ══ 世界书 app 的读数层 —— 认「分类带」＋ 开关一条带 ═════════════════════════
  // 🔴 口径见《方案》§16。四条硬约束：
  //    ① 标记条（`分类_X_开始` / `分类_X_结束`）**永不入列表、永不被写**
  //    ② **只改 `enabled`** —— 正文 / 触发 / 位置一个字节不动
  //    ③ **绝不新增、绝不删除**条目 —— 返回的数组长度必须与进来时相同
  //    ④ 认一个带**只认那一对标记夹出来的 order 区间**，认宽了会把 42 条规则条也卷进来
  // ⚠ 两个字段名的坑（STDB C2 §4.6）：写 **`enabled`**（**不是** ST 原生的 `disable`，正反相反）·
  //    `order` 在 **`position.order`**，不在顶层 —— 认带靠它。
  // ⚠ 这本和上面 `世界书表()` 读的是同一批书，但那张表把 `enabled` / `order` 丢了、
  //    还把几本书并成一张 —— 开关带要原始条目，所以这里单读一遍，别去改那张表。

  const 带标记 = /^分类_(.+)_(开始|结束)$/;

  // 条目开着没有 —— TH 归一化过的是 `enabled`，ST 原生的是 `disable`（反着说）。
  // 两个都认，谁在认谁；都没有就当开着（不误关）。
  function 条目开着(e) {
    if (!e) return true;
    if (Object.prototype.hasOwnProperty.call(e, 'enabled')) return e.enabled !== false;
    if (Object.prototype.hasOwnProperty.call(e, 'disable')) return e.disable !== true;
    return true;
  }
  // order：优先 `position.order`，退到顶层（防御，别假设归一化一定发生过）
  function 条目序(e) {
    const p = e && e.position;
    if (是数(p && p.order)) return p.order;
    if (是数(e && e.order)) return e.order;
    return 0;
  }

  // 这个 app 自己的一份缓存 —— 和 `书缓存` 各管各的（那份存的是正文，这份存的是带）。
  const 书页缓存 = { 果: null };
  let 书当前 = '';

  // 读一本书 → 拆成带。**只读，绝不写。**
  async function 读带() {
    const T = 找TH();
    if (!T || typeof T.getCharWorldbookNames !== 'function' || typeof T.getWorldbook !== 'function')
      return { 成: false, 因: '读不到世界书 —— 酒馆助手的 TavernHelper 没接上。' };
    let 名s = null;
    try { 名s = T.getCharWorldbookNames('current'); } catch (e) { return { 成: false, 因: '取世界书名失败：' + 串(e && e.message) }; }
    if (是期约(名s)) { try { 名s = await 名s; } catch (e) { return { 成: false, 因: '取世界书名失败：' + 串(e && e.message) }; } }
    if (!名s || typeof 名s !== 'object') return { 成: false, 因: '这张卡没绑世界书。' };
    const 全 = [名s.primary].concat(Array.isArray(名s.additional) ? 名s.additional : []).filter(Boolean);
    if (!全.length) return { 成: false, 因: '这张卡没绑世界书。' };
    // 选过就用选的；选的那本没了就落回第一本（别卡在死名字上）
    const 名 = 书当前 && 全.includes(书当前) ? 书当前 : 全[0];
    书当前 = 名;

    let w = null;
    try { w = T.getWorldbook(名); } catch (_) {}
    if (是期约(w)) { try { w = await w; } catch (_) { w = null; } }
    const 列 = Array.isArray(w) ? w : (w && Array.isArray(w.entries) ? w.entries : []);
    if (!列.length) return { 成: false, 因: '世界书「' + 名 + '」是空的，或者读不出来。', 名, 全 };

    // 按 order 排队 —— **不靠数组下标**：存储顺序不等于 order 顺序
    const 排 = 列.slice().sort((a, b) => 条目序(a) - 条目序(b));
    const 带s = [];
    let 起 = null;
    for (const e of 排) {
      const m = 带标记.exec(串(e && e.name).trim());
      if (m) {
        if (m[2] === '开始') 起 = { 名: m[1], 起: 条目序(e), 止: null, 条s: [] };
        else if (起) { 起.止 = 条目序(e); 带s.push(起); 起 = null; }
        continue;
      }
      if (起) 起.条s.push(e);
    }
    const 悬空 = 起 ? 起.名 : '';
    // 「空带」＝ 带里一条内容都没有 —— 那就是补丁位（§4.9.4）
    for (const b of 带s) {
      b.数 = b.条s.length;
      b.开着 = b.条s.filter(条目开着).length;
    }
    return { 成: true, 名, 全, 带s, 悬空, 总条: 列.length };
  }

  // 开关一条带 —— 走 `updateWorldbookWith`（事务式：给一个改法，TH 去落盘）
  // 返回 null ＝ 成功；返回字符串 ＝ 出错了，那句话直接给玩家看。
  async function 开关带(要开) {
    const T = 找TH();
    if (!T || typeof T.updateWorldbookWith !== 'function') return '酒馆助手没接上，写不了世界书。';
    const 名 = 书当前;
    const 记 = 书页缓存.果;
    if (!名 || !记 || !记.成) return '先让世界书读出来，再开关。';
    const 带 = 记.带s.find((b) => b.名 === 开关带.目标);
    if (!带) return '找不到「' + 开关带.目标 + '」这条带 —— 可能刚被改过，重开一次这个 app。';
    const { 起, 止 } = 带;
    try {
      await T.updateWorldbookWith(名, (书) => {
        const 列 = Array.isArray(书) ? 书 : [];
        // 🔴 就地映射：**长度不变、顺序不变、标记条原样返回**
        return 列.map((e) => {
          const m = 带标记.exec(串(e && e.name).trim());
          if (m) return e;                                    // ① 标记条不动
          const o = 条目序(e);
          if (!(o > 起 && o < 止)) return e;                   // ④ 只认这对标记夹出来的区间
          if (条目开着(e) === !!要开) return e;                 // 已经是这个状态 ⇒ 不制造无谓写入
          if (Object.prototype.hasOwnProperty.call(e, 'enabled')) return { ...e, enabled: !!要开 };
          if (Object.prototype.hasOwnProperty.call(e, 'disable')) return { ...e, disable: !要开 };
          return { ...e, enabled: !!要开 };
        });
      }, { render: 'debounced' });
    } catch (e) {
      return '写失败：' + 串(e && e.message);
    }
    书页缓存.果 = null;   // 落完盘重读一遍 —— 界面上「开着 M/N」得是真值，不是我算的
    return null;
  }

  // ══ 5.8 注入预算 —— 分段 ＋ 装箱 ＋ setExtensionPrompt ════════════════════
  // 🔴 手机编的东西**一个字节都不进 `stat_data`**，回主线**只走这一个口**。
  //    成法照参考卡「银鳞」：`setExtensionPrompt(key, 头＋正文, 1, 3)` —— 同档位。
  // 🔴 `extension_prompts` 是酒馆页面的**内存对象、不落盘**（`script.js` 模块级变量）
  //    ⇒ 启动时要设、内容变了要重设，别指望「设过一次就一直在」。

  const 注入头 = (user) => `[系统信息 —— ${user}手机上的见闻。优先级低于玩家最新输入与主线末尾场景；`
    + '线上交流≠面对面，冲突时以正文为准，手机内容只作伏笔]';

  function 算段s() {
    const 段s = [];
    const 开 = 配置.注入.段;

    if (开.私信摘要) {
      const 名s = Object.keys(数据.会话).filter((n) => 列(数据.会话[n].条).length);
      if (名s.length) {
        const 行 = [];
        for (const n of 名s.slice(-3)) {
          const 条 = 数据.会话[n].条.slice(-2);
          行.push(n + '：' + 条.map((m) => (m.谁 === '我' ? '我' : n) + '说「' + m.字 + '」').join('　'));
        }
        段s.push({ 键: '私信摘要', 优先: 4, 权重: 3, 字: 行.join('\n') });
      }
    }
    if (开.局势动向 && 数据.动向.length) {
      const 行 = 数据.动向.slice(0, 3).map((x) =>
        `〔${x.阶段}〕${[x.类型, x.地点].filter(Boolean).join('·')}：${x.简述}`);
      段s.push({ 键: '局势动向', 优先: 3, 权重: 3, 字: 行.join('\n') });
    }
    if (开.论坛动态 && 数据.论坛.length) {
      const 行 = 数据.论坛.slice(0, 3).map((t) =>
        `《${t.标题}》—— ${t.作者}（热度 ${t.热度}）：${t.正文.slice(0, 80)}`);
      段s.push({ 键: '论坛动态', 优先: 2, 权重: 2, 字: 行.join('\n') });
    }
    if (开.风物见闻) {
      const 名s = Object.keys(数据.风物);
      if (名s.length) {
        const n = 名s[名s.length - 1];
        段s.push({ 键: '风物见闻', 优先: 1, 权重: 1, 字: `${n}：${串(数据.风物[n].字).slice(0, 300)}` });
      }
    }
    return 段s;
  }

  // 排序 → 贪心装箱。🔴 塞不下的**要能看见**（设置页报出来），不静默吞。
  function 装箱(段s) {
    const 排 = 段s.slice().sort((a, b) =>
      (b.优先 - a.优先) || (b.权重 - a.权重) || a.键.localeCompare(b.键));
    let 余 = 配置.注入.总;
    const 用 = [], 丢 = [];
    for (const s of 排) {
      let 字 = s.字;
      if (字.length > 配置.注入.单档) 字 = 字.slice(0, 配置.注入.单档) + '…';
      if (字.length > 余) { 丢.push(s.键); continue; }
      余 -= 字.length;
      用.push(`<${s.键}>\n${字}\n</${s.键}>`);
    }
    return { 正文: 用.join('\n\n'), 丢, 用字: 配置.注入.总 - 余 };
  }

  function 头用户() {
    const c = 酒馆上下文();
    try {
      if (c && typeof c.substituteParams === 'function') {
        const s = c.substituteParams('{{user}}');
        if (s && s !== '{{user}}') return 串(s);
      }
    } catch (_) {}
    return '你';
  }

  function 注入() {
    const 段s = 算段s();
    const { 正文, 丢, 用字 } = 装箱(段s);
    const c = 酒馆上下文();
    const 能 = !!(c && typeof c.setExtensionPrompt === 'function');
    注入读数 = {
      用字, 丢, 总: 配置.注入.总, 成了: 能 && !!正文,
      话: 能 ? '' : '接不上酒馆的注入接口（setExtensionPrompt 找不到）—— 手机内容进不了提示词',
    };
    if (!能) return;
    const 文 = 正文 ? 注入头(头用户()) + '\n' + 正文 : '';
    try { c.setExtensionPrompt(注入键, 文, 注入位置, 注入深度, false, 注入角色); }
    catch (e) { 注入读数.话 = '注入失败：' + 串(e && e.message ? e.message : e); 注入读数.成了 = false; }
  }

  // ══ 5.9 API 通道 —— 只做 OpenAI 兼容（§14.2） ═════════════════════════════
  // 🔴 「一个凭据 ＋ 四个档」，不是四份 key（银鳞是 10 个通道各一份，月痕不照抄那格）。
  const 等 = (ms) => new Promise((r) => setTimeout(r, ms));

  function 规范基(基) {
    let s = 串(基).trim().replace(/\/+$/, '');
    if (!s) return '';
    if (/\/chat\/completions$/i.test(s)) return s.replace(/\/chat\/completions$/i, '');  // 玩家填全了 ⇒ 原样尊重
    if (/\/models$/i.test(s)) return s.replace(/\/models$/i, '');
    if (/\/v\d+$/i.test(s)) return s;
    return s + '/v1';
  }
  const 拼地址 = (基) => { const b = 规范基(基); return b ? b + '/chat/completions' : ''; };
  const 拼模型地址 = (基) => { const b = 规范基(基); return b ? b + '/models' : ''; };

  function 取正文(j) {
    const c = 列(取(j, ['choices'], []))[0];
    if (!c) return null;
    const m = 取(c, ['message', 'content'], null);
    if (typeof m === 'string') return m;
    if (Array.isArray(m)) {   // 少数站回多段
      const s = m.map((p) => (typeof p === 'string' ? p : 串(取(p, ['text'], '')))).join('');
      return s || null;
    }
    const t = 取(c, ['text'], null);
    return typeof t === 'string' ? t : null;
  }

  async function 调API(消息s, 档) {
    const 地址 = 拼地址(配置.地址);
    if (!地址) return { 错: '还没填 API 地址 —— 去「设置 → API」填' };
    if (!配置.钥) return { 错: '还没填 API key —— 去「设置 → API」填' };
    const 模型 = 档.模型 || 配置.模型;
    if (!模型) return { 错: '还没选模型 —— 去「设置 → API」填' };

    let 末错 = '调用失败';
    for (let 次 = 0; 次 <= 重试退避.length; 次++) {
      if (已销毁) return { 错: '已卸载' };
      if (次) await 等(重试退避[Math.min(次 - 1, 重试退避.length - 1)]);
      const 停 = new AbortController();
      const 时 = setTimeout(() => { try { 停.abort(); } catch (_) {} }, 请求超时);
      try {
        const r = await fetch(地址, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + 配置.钥 },
          body: JSON.stringify({
            model: 模型, messages: 消息s,
            temperature: 档.温度, max_tokens: 档.上限,
          }),
          signal: 停.signal,
        });
        clearTimeout(时);
        if (!r.ok) {
          const 短 = 串(await r.text().catch(() => '')).slice(0, 200);
          // 🔴 401 / 403 不重试 —— 重试也没用，白等三次
          if (r.status === 401 || r.status === 403) {
            return { 错: `API 拒了（HTTP ${r.status}）—— 地址或 key 不对。${短}` };
          }
          末错 = `API 报错（HTTP ${r.status}）${短}`;
          continue;
        }
        const j = await r.json().catch(() => null);
        const 正 = 取正文(j);
        if (正 === null) return { 错: 'API 回的格式看不懂（没有 choices[0].message.content）' };
        return { 文: 正 };
      } catch (e) {
        clearTimeout(时);
        const 话 = 串(e && e.name) === 'AbortError' ? `超时（${请求超时 / 1000} 秒没回）`
          : /Failed to fetch|NetworkError|Load failed|Network request failed/i.test(串(e && e.message))
            ? '连不上 —— 地址错 / 断网 / 对方不给跨域（CORS）'
            : 串(e && e.message ? e.message : e);
        末错 = '调用失败：' + 话;
      }
    }
    return { 错: 末错 + '（重试也用完了）' };
  }

  async function 拉模型() {
    const 地址 = 拼模型地址(配置.地址);
    if (!地址) return { 坏: true, 字: '还没填 API 地址' };
    const 停 = new AbortController();
    const 时 = setTimeout(() => { try { 停.abort(); } catch (_) {} }, 20000);
    try {
      const r = await fetch(地址, { headers: { Authorization: 'Bearer ' + 配置.钥 }, signal: 停.signal });
      clearTimeout(时);
      if (!r.ok) return { 坏: true, 字: `HTTP ${r.status}` };
      const j = await r.json().catch(() => null);
      const 列s = 列(取(j, ['data'], null)).map((m) => 串(取(m, ['id'], ''))).filter(Boolean);
      if (!列s.length) return { 坏: true, 字: '列表是空的' };
      return { 坏: false, 字: `拿到 ${列s.length} 个模型`, 列: 列s.slice(0, 300) };
    } catch (e) {
      clearTimeout(时);
      return { 坏: true, 字: 串(e && e.message ? e.message : e) };
    }
  }

  // 🔴 测试连接**必须带破限词**（§14.2.2）—— 有些站会拒「无前缀」的请求，
  //    不带就是「测通了、正式调用失败」。`max_tokens:5` 控成本。
  async function 测连接() {
    const 档 = 配置.档.信息;
    const r = await 调API([
      { role: 'system', content: 档.破限 },
      { role: 'user', content: '只回一个字：好' },
    ], Object.assign({}, 档, { 上限: 5 }));
    return r.错 ? { 坏: true, 字: r.错 } : { 坏: false, 字: '通了。它回的是：' + 串(r.文).slice(0, 40) };
  }

  // ══ 5.10 生成循环 ═════════════════════════════════════════════════════════
  // 🔴 一次只跑一个（不做并发池）—— 零依赖单文件里做并发池，复杂度换不来什么。
  function 抠JSON(文) {
    let s = 串(文).trim();
    s = s.replace(/^\s*```[a-zA-Z]*\s*/, '').replace(/```\s*$/, '').trim();
    const 起 = s.search(/[[{]/);
    if (起 < 0) return null;
    const 闭 = s[起] === '[' ? ']' : '}';
    let 末 = s.lastIndexOf(闭);
    while (末 > 起) {
      try { return JSON.parse(s.slice(起, 末 + 1)); } catch (_) {}
      末 = s.lastIndexOf(闭, 末 - 1);
    }
    return null;
  }

  function 造令(档名, 件) {
    件 = 件 || {};
    if (档名 === '论坛') {
      const 已 = 数据.论坛.slice(0, 8).map((t) => t.标题).filter(Boolean);
      return {
        附: 已.length ? '【已经刷出来的帖子 —— 别重复它们】\n' + 已.join('；') : '',
        问: '【任务】刷一版论坛。写 5 条新帖，按 JSON 数组回。',
      };
    }
    if (档名 === '信息') {
      if (件.类 === '群') {
        const g = 数据.群[件.名] || { 成员: [], 条: [] };
        const 记 = g.条.slice(-24).map((m) => `${m.谁}：${m.字}`).join('\n');
        return {
          附: [
            `【这是手机上的群聊，群里有：${g.成员.join('、') || '（还没定成员）'}】`,
            件.自动 ? '群里有人主动发了话（不是回复玩家）。' : '玩家刚在群里发了话，以群里某个或某几个成员的身份回。',
            '回帖的「谁」必须是群里的人名。',
            记 ? '【最近的群聊记录】\n' + 记 : '',
          ].filter(Boolean).join('\n\n'),
          问: '按 JSON 对象回：{"回":[{"谁":"名字","字":"…"}]}',
        };
      }
      const c = 数据.会话[件.名] || { 条: [] };
      const 记 = c.条.slice(-24).map((m) => `${m.谁 === '我' ? '我' : 件.名}：${m.字}`).join('\n');
      return {
        附: [
          `【这是手机上和「${件.名}」的私聊】`,
          件.自动 ? `「${件.名}」主动发来消息（不是回复玩家）。` : `玩家刚发了话，以「${件.名}」的身份回，可以拆成连着几条。`,
          记 ? '【最近的聊天记录】\n' + 记 : '',
        ].filter(Boolean).join('\n\n'),
        问: '按 JSON 对象回：{"回":[{"谁":"' + 件.名 + '","字":"…"}]}',
      };
    }
    if (档名 === '局势') {
      const 已 = 数据.动向.slice(0, 6).map((x) =>
        `〔${x.阶段}〕${[x.类型, x.地点].filter(Boolean).join('·')}：${x.简述}`);
      return {
        附: 已.length ? '【已经讲过的动向 —— 接着讲，或者新起一件；不要重复】\n' + 已.join('\n') : '',
        问: '【任务】讲 2 条这一带的大盘动向，按 JSON 数组回。',
      };
    }
    // 风物志
    const 地 = 串(件.名) || 串(取(变量, ['世界', '地点'], ''));
    const t = 字典(取(变量, ['世界', '风物', 地], {}));
    return {
      附: [
        `【要写的地方：${地 || '（读不到当前地点）'}】`,
        串(t.界域) ? `界域：${t.界域}` : '', 串(t.大区) ? `大区：${t.大区}` : '',
        串(t.地域) ? `地域：${t.地域}` : '', 串(t.层级) ? `层级：${t.层级}` : '',
        串(t.描述) ? `作者已经写下的（照它的口径写，别改它）：${t.描述}` : '',
      ].filter(Boolean).join('\n'),
      问: '【任务】写这个地方的见闻，按 JSON 对象回：{"见闻":"…"}',
    };
  }

  function 收下(档名, 件, o) {
    件 = 件 || {};
    if (档名 === '论坛') {
      const 列s = (Array.isArray(o) ? o : 列(o && o.帖)).filter((t) => t && typeof t === 'object');
      const 帖s = 列s.map((t) => ({
        标题: 串(t.标题).trim(), 作者: 串(t.作者).trim(),
        热度: Number.isFinite(Number(t.热度)) ? Number(t.热度) : 0,
        正文: 串(t.正文).trim(),
        回帖: 列(t.回帖).filter((r) => r && typeof r === 'object')
          .map((r) => ({ 作者: 串(r.作者).trim(), 内容: 串(r.内容).trim() })).filter((r) => r.内容),
      })).filter((t) => t.标题 || t.正文);
      if (!帖s.length) return { 坏: true, 字: '论坛：AI 回的数组里没有能用的帖子。' };
      数据.论坛 = 帖s.concat(数据.论坛).slice(0, 条数上限.论坛);
      return { 坏: false, 字: `论坛：刷出 ${帖s.length} 帖。` };
    }
    if (档名 === '信息') {
      const 回s = 列(o && o.回).length ? 列(o.回) : (Array.isArray(o) ? o : []);
      const 条s = 回s.filter((m) => m && typeof m === 'object')
        .map((m) => ({ 谁: 件.类 === '群' ? 串(m.谁).trim() || '某人' : 件.名, 字: 串(m.字 || m.内容).trim() }))
        .filter((m) => m.字);
      if (!条s.length) return { 坏: true, 字: '信息：AI 没回出内容。' };
      if (件.类 === '群') {
        const g = 数据.群[件.名] || (数据.群[件.名] = { 成员: [], 条: [], 未读: 0 });
        g.条 = g.条.concat(条s).slice(-条数上限.群);
        g.未读 += 条s.length;
      } else {
        const c = 数据.会话[件.名] || (数据.会话[件.名] = { 条: [], 未读: 0 });
        c.条 = c.条.concat(条s).slice(-条数上限.会话);
        c.未读 += 条s.length;
      }
      return { 坏: false, 字: `${件.类 === '群' ? '群' : ''}「${件.名}」回了 ${条s.length} 条。` };
    }
    if (档名 === '局势') {
      const 列s = (Array.isArray(o) ? o : 列(o && o.动向)).filter((x) => x && typeof x === 'object');
      const 新s = 列s.map((x) => ({
        阶段: ['起', '承', '转', '合'].includes(串(x.阶段)) ? 串(x.阶段) : '起',
        类型: 串(x.类型).trim(), 地点: 串(x.地点).trim(), 简述: 串(x.简述).trim(),
      })).filter((x) => x.简述);
      if (!新s.length) return { 坏: true, 字: '局势：AI 回的数组里没有能用的动向。' };
      // 走到「合」的退场 —— 在**下一批**来的时候落账（§14.9）
      数据.动向 = 新s.concat(列(数据.动向).filter((x) => x.阶段 !== '合')).slice(0, 条数上限.动向);
      return { 坏: false, 字: `局势：讲了 ${新s.length} 条动向。` };
    }
    const 字 = 串(o && (o.见闻 || o.描述) || (typeof o === 'string' ? o : '')).trim();
    if (!字) return { 坏: true, 字: '风物志：AI 没给出「见闻」。' };
    数据.风物[件.名] = { 字 };
    const 名s = Object.keys(数据.风物);
    if (名s.length > 条数上限.风物) for (const n of 名s.slice(0, 名s.length - 条数上限.风物)) delete 数据.风物[n];
    return { 坏: false, 字: `风物志：「${件.名}」写好了。` };
  }

  async function 生成(活) {
    const 档名 = 活.档;
    const 档 = 配置.档[档名];
    if (!配置.地址) {
      提示 = { 坏: true, 字: `${档名}：还没配 API —— 去「设置 → API」填地址和 key。` };
      刷新(); return;
    }
    // 🔴 「生成中」得在**第一个 await 之前**点亮 —— 取书那一步是异步的，
    //    放后头的话从点下去到世界书读完这一段界面上毫无反应（等它的人也会被骗过去）。
    正在生成 = 档名;
    刷新();
    const 令 = 造令(档名, 活.件);
    const 消息s = [{ role: 'system', content: 档.破限 + (档.自定义.trim() ? '\n\n' + 档.自定义 : '') }];
    const 上下文块 = [];
    if (档.带书 && 档.书单.length) {
      const 书 = await 取书(档.书单);
      if (书.文) 上下文块.push(书.文);
    }
    if (档.带楼) {
      const 楼s = 近楼(档.带楼);
      if (楼s.length) 上下文块.push('【最近正文】\n' + 楼s.map((m) => `${m.名}：${m.文}`).join('\n\n'));
    }
    const 现 = 现状话();
    if (现) 上下文块.push(现);
    if (上下文块.length) 消息s.push({ role: 'system', content: 上下文块.join('\n\n') });
    if (令.附) 消息s.push({ role: 'system', content: 令.附 });
    消息s.push({ role: 'user', content: 令.问 });

    const r = await 调API(消息s, 档);
    正在生成 = null;
    if (r.错) { 提示 = { 坏: true, 字: `${档名}：${r.错}` }; 刷新(); return; }
    const o = 抠JSON(r.文);
    if (o === null) {
      提示 = { 坏: true, 字: `${档名}：AI 没按格式回（要 JSON）。它开头写的是：${串(r.文).slice(0, 60)}…` };
      刷新(); return;
    }
    const 果 = 收下(档名, 活.件, o);
    提示 = { 坏: !!果.坏, 字: (活.因 === '自动' ? '（自动）' : '') + 果.字 };
    const n = 楼层数();
    if (n !== null) 数据.末次[档名] = n;
    存数据();
    注入();
    刷新();
  }

  function 入队(档名, 因, 件) {
    if (已销毁) return;
    const 键 = 档名 + '|' + 串(件 && 件.类) + '|' + 串(件 && 件.名);
    if (队.some((x) => x.键 === 键)) return;   // 同一档同一个对象在队里就不重复排
    队.push({ 档: 档名, 因: 因 || '手动', 件: 件 || {}, 键 });
    跑队();
  }

  async function 跑队() {
    if (队忙 || 已销毁) return;
    队忙 = true;
    while (队.length && !已销毁) {
      const 活 = 队.shift();
      try { await 生成(活); }
      catch (e) {
        正在生成 = null;
        提示 = { 坏: true, 字: '这一步没跑完：' + 串(e && e.message ? e.message : e) };
        try { 刷新(); } catch (_) {}
      }
    }
    队忙 = false;
  }

  // 挑一个「该给玩家发消息」的对象 —— 最近有来往的会话，没有就用第一个在场的角色
  function 挑会话() {
    const 有 = Object.keys(数据.会话).filter((n) => 列(数据.会话[n].条).length);
    if (有.length) return 有[有.length - 1];
    const 角 = Object.keys(字典(取(变量, ['角色'], {})))
      .filter((n) => 串(取(变量, ['角色', n, '在场'], '')) === '在场');
    return 角.length ? 角.slice().sort()[0] : null;
  }

  // 回合检查 —— 订在 MVU 那三个事件上 ＋ 开窗时各查一次
  function 查自动() {
    if (!配置.自动总 || 已销毁) return;
    const n = 楼层数();
    if (n === null) return;     // 🔴 数不出回合 ⇒ 整个不跑（不猜）
    for (const 档名 of 档名s) {
      const p = 配置.档[档名];
      if (!p.自动 || p.间隔 <= 0) continue;
      const 上 = 数据.末次[档名];
      if (上 === undefined) { 数据.末次[档名] = n; 存数据(); continue; }  // 从「开启的那一刻」起算
      if (n - 上 < p.间隔) continue;
      let 件 = {};
      if (档名 === '信息') {
        const 名 = 挑会话();
        if (!名) continue;
        件 = { 类: '单聊', 名, 自动: true };
      } else if (档名 === '风物志') {
        const 地 = 串(取(变量, ['世界', '地点'], ''));
        if (!地) continue;
        件 = { 名: 地 };
      }
      入队(档名, '自动', 件);
    }
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
    // 🔴 轮 4 改名：原先是 `yc-body` —— 跟**页面容器**那个 `.yc-body` 撞了类名。
    //    两条裸规则都叫 `.yc-body{}`，后一条（这条按钮的）赢 ⇒ 页面容器被套上边框 +
    //    `background:#2b3024` + `cursor:pointer`。平时只难看，**一挂壁纸就致命**：
    //    那层不透明的底会把背景盖掉，壁纸只在四边露出一圈。页面容器一字未动。
    钮.className = 'yc-figbtn';
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

    // 🔴 回执条**不在这里**了（轮 3 提到抽屉公共层，见 `刷新()`）——
    //    不然在论坛页生成完了，回执只在主角页看得见。
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

  // ══ 7.6 轮 3 的零件（四个现场编的 app ＋ 设置共用） ═══════════════════════
  function 钮(字, 动作, 属性s, 类) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 类 || 'yc-mini';
    if (动作) b.setAttribute('data-act', 动作);
    for (const k in (属性s || {})) b.setAttribute('data-' + k, 串(属性s[k]));
    b.textContent = 字;
    return b;
  }

  function 输入(值, 属性s, 类, 原生) {
    const i = document.createElement('input');
    i.type = (属性s && 属性s.类型) || 'text';
    i.className = 类 || 'yc-in';
    i.value = 值 === undefined || 值 === null ? '' : 串(值);
    for (const k in (属性s || {})) { if (k !== '类型') i.setAttribute('data-' + k, 串(属性s[k])); }
    for (const k in (原生 || {})) { try { i.setAttribute(k, 原生[k]); } catch (_) {} }
    return i;
  }

  function 多行(值, 属性s, 行数) {
    const t = document.createElement('textarea');
    t.className = 'yc-in yc-ta';
    t.rows = 行数 || 4;
    t.value = 值 === undefined || 值 === null ? '' : 串(值);
    for (const k in (属性s || {})) t.setAttribute('data-' + k, 串(属性s[k]));
    return t;
  }

  function 勾(名, 选中, 属性s) {
    const l = document.createElement('label');
    l.className = 'yc-ck';
    const i = document.createElement('input');
    i.type = 'checkbox';
    i.checked = !!选中;
    for (const k in (属性s || {})) i.setAttribute('data-' + k, 串(属性s[k]));
    const s = document.createElement('span');
    s.textContent = 名;
    l.appendChild(i);
    l.appendChild(s);
    return l;
  }

  function 字段(名, 控件, 注) {
    const r = document.createElement('div');
    r.className = 'yc-fd';
    const k = document.createElement('span');
    k.className = 'yc-fk';
    k.textContent = 名;
    const v = document.createElement('span');
    v.className = 'yc-fv';
    v.appendChild(控件);
    r.appendChild(k);
    r.appendChild(v);
    if (注) {
      const a = document.createElement('span');
      a.className = 'yc-fa';
      a.textContent = 注;
      r.appendChild(a);
    }
    return r;
  }

  function 段选(选项s, 当前, 动作, 属性名) {
    const d = document.createElement('div');
    d.className = 'yc-seg';
    for (const v of 选项s) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'yc-sb' + (v === 当前 ? ' yc-sbon' : '');
      b.setAttribute('data-act', 动作);
      b.setAttribute('data-' + (属性名 || 'v'), v);
      b.textContent = v;
      d.appendChild(b);
    }
    return d;
  }

  function 在生成(档名) { return 正在生成 === 档名; }

  function 生成钮(档名, 字) {
    return 小钮(在生成(档名) ? '生成中…' : (字 || '刷一版'), 'gen', 档名);
  }

  // ── 论坛 ────────────────────────────────────────────────────────────────
  function 论坛页() {
    const box = document.createElement('div');
    const 档 = 配置.档.论坛;
    const 头 = document.createElement('div');
    头.className = 'yc-acts';
    头.appendChild(生成钮('论坛'));
    头.appendChild(小钮(档.自动 ? '自动：开' : '自动：关', 'auto', '论坛'));
    box.appendChild(头);
    if (!配置.地址) box.appendChild(空话('还没配 API —— 去「设置 → API」填好地址和 key，这四个 app 才动得起来。'));

    if (帖展开 !== null && 数据.论坛[帖展开]) {
      const t = 数据.论坛[帖展开];
      const c = 条目卡(t.标题 || '(无题)', `${t.作者 || '匿名'} · 热度 ${t.热度}`, [], '');
      const 正 = document.createElement('div');
      正.className = 'yc-post';
      正.textContent = t.正文;
      c.appendChild(正);
      for (const r of t.回帖) {
        const d = document.createElement('div');
        d.className = 'yc-rep';
        d.textContent = `${r.作者 || '匿名'}：${r.内容}`;
        c.appendChild(d);
      }
      box.appendChild(c);
      box.appendChild(小钮('← 回帖子列表', 'postback'));
      return box;
    }

    if (!数据.论坛.length) {
      box.appendChild(空话('版面上还什么都没有。'));
      return box;
    }
    box.appendChild(一行('共', `${数据.论坛.length} 帖`));
    for (let i = 0; i < 数据.论坛.length; i++) {
      const t = 数据.论坛[i];
      const c = 条目卡(t.标题 || '(无题)',
        [t.作者 || '匿名', `热度 ${t.热度}`, t.回帖.length ? `${t.回帖.length} 回` : ''].filter(Boolean).join(' · '),
        [], t.正文.slice(0, 90) + (t.正文.length > 90 ? '…' : ''));
      c.setAttribute('data-act', 'post');
      c.setAttribute('data-i', String(i));
      c.classList.add('yc-tap');
      box.appendChild(c);
    }
    return box;
  }

  // ── 信息（私聊 / 群聊）─────────────────────────────────────────────────
  // 🔴 `§4.7` 已裁「乙」：手机里的对话**不写进聊天记录**，主线上下文一个字不受影响。
  //    ⇒ 上下文自己拼（§5.7 那几件）· 存档自己管（`yh.yc.data.v1`）。
  function 信息页() {
    const box = document.createElement('div');
    const 档 = 配置.档.信息;
    if (!配置.地址) box.appendChild(空话('还没配 API —— 去「设置 → API」填好地址和 key。'));

    if (录中) return 建群页(box);

    if (会话选中) {
      const { 类, 名 } = 会话选中;
      const 头 = document.createElement('div');
      头.className = 'yc-acts';
      头.appendChild(小钮('← 会话列表', 'talkback'));
      头.appendChild(生成钮('信息'));
      box.appendChild(头);

      const g = 类 === '群' ? 数据.群[名] : null;
      const c = 类 === '群' ? null : 数据.会话[名];
      const 条s = 类 === '群' ? (g ? g.条 : []) : (c ? c.条 : []);
      box.appendChild(条目卡(名 + (类 === '群' && g ? `（${g.成员.length} 人）` : ''),
        [类 === '群' && g ? g.成员.join('、') : '', `${条s.length} 条`].filter(Boolean).join(' · '), [], ''));

      if (!条s.length) box.appendChild(空话('还没聊过。'));
      for (const m of 条s) {
        const d = document.createElement('div');
        d.className = 'yc-bub' + (m.谁 === '我' ? ' yc-bub-me' : '');
        const w = document.createElement('div');
        w.className = 'yc-bubw';
        w.textContent = m.谁 === '我' ? '我' : m.谁;
        const x = document.createElement('div');
        x.className = 'yc-bubx';
        x.textContent = m.字;
        d.appendChild(w);
        d.appendChild(x);
        box.appendChild(d);
      }

      const 行 = document.createElement('div');
      行.className = 'yc-send';
      行.appendChild(多行('', { 写: '1' }, 2));
      行.appendChild(小钮('发送', 'send', 类 + '' + 名));
      box.appendChild(行);
      box.appendChild(空话('回车发送、Shift+回车换行。'));
      return box;
    }

    // 会话列表
    const 头 = document.createElement('div');
    头.className = 'yc-acts';
    头.appendChild(小钮('＋ 新对话', 'newtalk'));
    头.appendChild(小钮('＋ 建群', 'newgroup'));
    头.appendChild(小钮(档.自动 ? '自动：开' : '自动：关', 'auto', '信息'));
    box.appendChild(头);

    const 单名 = Object.keys(数据.会话);
    const 群名 = Object.keys(数据.群);
    if (!单名.length && !群名.length) {
      box.appendChild(空话('还没有对话。点「＋ 新对话」从「角色」里挑一个人。'));
      return box;
    }
    if (单名.length) {
      const s = 小节(`单聊（${单名.length}）`);
      for (const n of 单名) {
        const c = 数据.会话[n];
        const 末 = c.条.length ? c.条[c.条.length - 1] : null;
        const 卡 = 条目卡(n + (c.未读 ? `　●${c.未读}` : ''), `${c.条.length} 条`,
          [], 末 ? `${末.谁 === '我' ? '我' : n}：${末.字.slice(0, 40)}` : '');
        卡.setAttribute('data-act', 'talk');
        卡.setAttribute('data-类', '单聊');
        卡.setAttribute('data-名', n);
        卡.classList.add('yc-tap');
        s.appendChild(卡);
      }
      box.appendChild(s);
    }
    if (群名.length) {
      const s = 小节(`群聊（${群名.length}）`);
      for (const n of 群名) {
        const g = 数据.群[n];
        const 末 = g.条.length ? g.条[g.条.length - 1] : null;
        const 卡 = 条目卡(n + (g.未读 ? `　●${g.未读}` : ''), `${g.成员.length} 人 · ${g.条.length} 条`,
          [], 末 ? `${末.谁}：${末.字.slice(0, 40)}` : '');
        卡.setAttribute('data-act', 'talk');
        卡.setAttribute('data-类', '群');
        卡.setAttribute('data-名', n);
        卡.classList.add('yc-tap');
        s.appendChild(卡);
      }
      box.appendChild(s);
    }
    return box;
  }

  // 开新对话（从 `角色{}` 里挑）／建群（勾成员）
  function 角色名单() {
    const 角 = 字典(取(变量, ['角色'], {}));
    return Object.keys(角).sort().map((n) => ({ 名: n, 在场: 串(取(角, [n, '在场'], '')) === '在场' }));
  }

  function 建群页(box) {
    const 头 = document.createElement('div');
    头.className = 'yc-acts';
    头.appendChild(小钮('← 取消', 'talkback'));
    if (录中.类 === '群') 头.appendChild(小钮('建群', 'groupmake'));
    box.appendChild(头);

    const 人 = 角色名单();
    if (!人.length) { box.appendChild(空话(读到了没 ? '「角色」里还没有人。' : '读不到变量。')); return box; }

    if (录中.类 === '群') {
      box.appendChild(空话(`勾要拉进群的人（已勾 ${录中.选.length} 个）。群名就用这几个人的名字拼。`));
      for (const p of 人) {
        const l = document.createElement('label');
        l.className = 'yc-ck yc-ck2';
        const i = document.createElement('input');
        i.type = 'checkbox';
        i.checked = 录中.选.includes(p.名);
        i.setAttribute('data-act', 'pick');
        i.setAttribute('data-名', p.名);
        const s = document.createElement('span');
        s.textContent = p.名 + (p.在场 ? '（在场）' : '');
        l.appendChild(i);
        l.appendChild(s);
        box.appendChild(l);
      }
      return box;
    }

    box.appendChild(空话('跟谁聊？'));
    for (const p of 人) {
      const c = 条目卡(p.名, p.在场 ? '在场' : '不在场', [], '');
      c.setAttribute('data-act', 'open');
      c.setAttribute('data-类', '单聊');
      c.setAttribute('data-名', p.名);
      c.classList.add('yc-tap');
      box.appendChild(c);
    }
    return box;
  }

  // ── 局势（上：卡里的账本 ／ 下：手机自己那批）───────────────────────────
  function 局势页() {
    const box = document.createElement('div');
    const 头 = document.createElement('div');
    头.className = 'yc-acts';
    头.appendChild(生成钮('局势', '讲一段'));
    头.appendChild(小钮(配置.档.局势.自动 ? '自动：开' : '自动：关', 'auto', '局势'));
    box.appendChild(头);

    const 上 = 小节('大盘（卡里的账本）');
    const 卡局 = 字典(取(变量, ['世界', '局势'], {}));
    const 卡名 = Object.keys(卡局);
    if (!读到了没) 上.appendChild(空话('读不到变量。'));
    else if (!卡名.length) 上.appendChild(空话('还没有局势。'));
    for (const n of 卡名) {
      const t = 字典(取(卡局, [n], {}));
      上.appendChild(条目卡(n, 串(取(t, ['状态'], '')), [一行('', 取(t, ['简述'], ''))], ''));
    }
    上.appendChild(空话('这一栏是主 AI 写的账本 —— 手机一个字不写它。'));
    box.appendChild(上);

    const 下 = 小节(`动向（手机自己那批 · ${数据.动向.length}）`);
    下.appendChild(空话('从「起」慢慢走到「合」；走到「合」的，下一批出来时退场。'));
    if (!数据.动向.length) 下.appendChild(空话('还没有动向。'));
    for (const x of 数据.动向) {
      const 副 = [`〔${x.阶段}〕`, x.类型, x.地点].filter(Boolean).join(' · ');
      下.appendChild(条目卡('', 副, [一行('', x.简述)], ''));
    }
    box.appendChild(下);
    return box;
  }

  // ── 风物志（骨架读卡里的 `世界.风物`；图位留空）─────────────────────────
  // 🔴 分层筛选行「不隐藏任何一层」—— 列**该层在 `世界.风物` 里出现过的全部值**，
  //    含一个地点都没去过的（`D150` ②）。分母 ＝ `风物` 的键数。
  function 风物志页() {
    const box = document.createElement('div');
    const 甲 = 字典(取(变量, ['世界', '风物'], {}));
    const 名s = Object.keys(甲);

    if (地点选中 !== null) {
      box.appendChild(小钮('← 回目录', 'fback'));
      box.appendChild(风物详(地点选中, 字典(取(甲, [地点选中], {}))));
      return box;
    }

    if (!读到了没) { box.appendChild(空话('读不到变量。')); return box; }
    if (!名s.length) {
      box.appendChild(空话('「世界.风物」还是空的 —— 地点总表由作者预置，AI 只填「首次到访」。'));
      return box;
    }

    // 三层筛选行 —— 每层列该层出现过的全部值
    const 层 = (键) => {
      const v = [];
      for (const n of 名s) { const s = 串(取(甲, [n, 键], '')).trim(); if (s && !v.includes(s)) v.push(s); }
      return v.sort();
    };
    for (const [键, 动作] of [['界域', 'f界域'], ['大区', 'f大区'], ['地域', 'f地域']]) {
      const v = 层(键);
      if (!v.length) continue;   // 空的层跳过（不要求写满四层，但不许跳层）
      box.appendChild(段选(['全部', ...v], 风筛选[键] || '全部', 动作, 'v'));
    }

    const 已 = 名s.filter((n) => 是日期(取(甲, [n, '首次到访'], {})));
    const 率 = 名s.length ? Math.round((已.length / 名s.length) * 100) : 0;
    box.appendChild(条目卡('风物志', `共 ${名s.length} 处 · 已到访 ${已.length} 处 · 收集率 ${率}%`, [], ''));

    const 搜 = document.createElement('div');
    搜.className = 'yc-fd';
    const 搜k = document.createElement('span');
    搜k.className = 'yc-fk';
    搜k.textContent = '搜索';
    const 搜v = document.createElement('span');
    搜v.className = 'yc-fv';
    搜v.appendChild(输入(风筛选.词, { 筛: '1' }, 'yc-in'));
    搜.appendChild(搜k);
    搜.appendChild(搜v);
    box.appendChild(搜);

    const 格 = document.createElement('div');
    格.className = 'yc-fgrid';
    const 当前地 = 串(取(变量, ['世界', '地点'], '')).trim();
    for (const n of 名s) {
      const t = 字典(取(甲, [n], {}));
      const 卡 = document.createElement('div');
      卡.className = 'yc-fcard';
      卡.setAttribute('data-act', 'fopen');
      卡.setAttribute('data-名', n);
      // 筛选用**属性**，不重画 —— 重画会让搜索框丢焦点
      for (const k of ['界域', '大区', '地域']) 卡.setAttribute('data-' + k, 串(取(t, [k], '')).trim());
      卡.setAttribute('data-s', n + ' ' + 串(取(t, ['描述'], '')));
      const 图 = document.createElement('div');
      图.className = 'yc-fimg' + (是日期(取(t, ['首次到访'], {})) ? ' yc-fimg-on' : '');
      // 图库里有「地点」类、名字跟这个地点一样的图 ⇒ 自己填上；没有就留着空框
      const 图r = 地点图(n);
      if (!图上(图, 图r && 图r.图)) 图.textContent = '（图位）';
      卡.appendChild(图);
      const 副 = document.createElement('div');
      副.className = 'yc-fsub';
      // 🔴 卡面第二行取「最细的那一层」—— 有 `地域` 写 `地域`，没有退到 `大区`（`D150` ②）
      副.textContent = ['地域', '大区', '界域', '层级']
        .map((k) => 串(取(t, [k], '')).trim()).filter(Boolean).slice(0, 2).join(' · ');
      卡.appendChild(副);
      const 名 = document.createElement('div');
      名.className = 'yc-fname';
      名.textContent = n;
      卡.appendChild(名);
      if (n === 当前地) {
        const b = document.createElement('div');
        b.className = 'yc-fbadge';
        b.textContent = '✓ 当前起点';
        卡.appendChild(b);
      }
      if (!卡合(卡)) 卡.setAttribute('hidden', '1');
      格.appendChild(卡);
    }
    box.appendChild(格);
    box.appendChild(空话('卡片上头那格是图位 —— 去「CG 收集」存一张「地点」类、名字跟地点名一样的图，它就自己填上。'));
    return box;
  }
  function 风物详(名, t) {    const box = document.createElement('div');
    const 副 = ['界域', '大区', '地域', '层级'].map((k) => 串(取(t, [k], '')).trim()).filter(Boolean).join(' · ');
    const 卡 = 条目卡(名, 副, [], '');
    const 图 = document.createElement('div');
    图.className = 'yc-fimg yc-fimg-big' + (是日期(取(t, ['首次到访'], {})) ? ' yc-fimg-on' : '');
    const 图r = 地点图(名);
    if (!图上(图, 图r && 图r.图)) 图.textContent = '（图位）';
    卡.appendChild(图);
    const 到 = 取(t, ['首次到访'], {});
    if (是日期(到)) {
      const d = document.createElement('div');
      d.className = 'yc-line';
      d.textContent = '首次到访：' + 上次话(到);
      卡.appendChild(d);
    }
    // 甲：作者预置的 `描述` —— AI 照抄不重编
    const 描 = 串(取(t, ['描述'], '')).trim();
    if (描) {
      const h = document.createElement('div');
      h.className = 'yc-sech';
      h.textContent = '描述';
      const d = document.createElement('div');
      d.className = 'yc-post';
      d.textContent = 描;
      卡.appendChild(h);
      卡.appendChild(d);
    } else {
      卡.appendChild(空话('作者还没写这一处的「描述」。'));
    }
    box.appendChild(卡);

    // 乙：现场编（不落变量）—— 也用于给甲补一段见闻
    const 头 = document.createElement('div');
    头.className = 'yc-acts';
    头.appendChild(生成钮('风物志', 数据.风物[名] ? '重写见闻' : '编一段见闻'));
    box.appendChild(头);
    if (!配置.地址) box.appendChild(空话('还没配 API。'));
    const 乙 = 数据.风物[名];
    if (乙) box.appendChild(条目卡('见闻（手机现场编 · 不进变量）', '', [], 乙.字));

    box.appendChild(此地事(名));
    return box;
  }

  // 「此地发生过什么」—— 🔴 走世界书条目（`§7-18` 已裁「甲」），不动变量、不再落卡
  const 事缓存 = {};
  function 此地事(名) {
    const box = document.createElement('div');
    const s = 小节('此地发生过什么');
    box.appendChild(s);
    const 记 = 事缓存[名];
    if (!记) {
      s.appendChild(空话('读一下世界书…'));
      世界书表().then((表) => {
        let 段 = [];
        if (表) {
          for (const k of Object.keys(表)) {
            if (!k.includes(名)) continue;
            const c = 串(表[k]).trim();
            if (c) 段.push({ 名: k, 文: c });
          }
        }
        事缓存[名] = { 成: !!表, 段 };
        try { if (当前页 === '风物志' && 地点选中 === 名) 刷新(); } catch (_) {}
      }).catch(() => { 事缓存[名] = { 成: false, 段: [] }; });
      return box;
    }
    if (!记.成) { s.appendChild(空话('读不到世界书 —— 酒馆助手的 `TavernHelper` 没接上。')); return box; }
    if (!记.段.length) { s.appendChild(空话(`世界书里没有名字带「${名}」的条目。`)); return box; }
    for (const x of 记.段) s.appendChild(条目卡(x.名, '', [], x.文.slice(0, 600) + (x.文.length > 600 ? '…' : '')));
    return box;
  }

  // ── 设置 ────────────────────────────────────────────────────────────────
  let 设档位 = '论坛';
  // 🔴 §14.6 要求「破限词编辑框要能看见字数」。它**不许走重画**（一重画输入框就丢焦点），
  //    所以单独留一个节点，敲字时只改这一块的文本。
  let 破限数块 = null;

  function 破限字数话(框里, 存着) {
    const a = 串(框里).length, b = 串(存着).length;
    // 清空 ⇒ 落回默认那一段（不是空串）—— 这里必须说出来，
    // 否则框里空着、下面却写「当前 0 字」，看起来像真的会发一段空的出去。
    if (!a && b) return `框里 0 字 —— 保存的是默认那一段（${b} 字），不会真发空的`;
    return `当前 ${a} 字`;
  }

  // ── 世界书 app —— 补丁带的开关（口径见《方案》§16）─────────────────────
  // 🔴 这是**唯一会写世界书**的地方，所以「写的是哪一本」必须写死在界面上给人看。
  function 世界书页() {
    const box = document.createElement('div');
    const 记 = 书页缓存.果;
    if (!记) {
      box.appendChild(空话('读一下世界书…'));
      读带().then((r) => {
        书页缓存.果 = r;
        try { if (当前页 === '世界书') 刷新(); } catch (_) {}
      }).catch((e) => {
        书页缓存.果 = { 成: false, 因: '读世界书时出错：' + 串(e && e.message) };
        try { if (当前页 === '世界书') 刷新(); } catch (_) {}
      });
      return box;
    }
    if (!记.成) { box.appendChild(空话(记.因)); return box; }

    const 空带s = 记.带s.filter((b) => !b.数);
    const 有s = 记.带s.filter((b) => b.数);

    box.appendChild(条目卡('世界书', '写的是「' + 记.名 + '」', [
      一行('条目', 记.总条 + ' 条'),
      一行('补丁位', 空带s.length + ' 个空带'),
    ], '只开关整条带 · 不改正文 · 不动标记'));

    if (记.全.length > 1) {
      const s = 小节('写哪一本');
      for (const n of 记.全) s.appendChild(小钮(n === 记.名 ? '· ' + n : n, '书换', n));
      box.appendChild(s);
    }

    const s1 = 小节('补丁位（还是空的）');
    if (!空带s.length) s1.appendChild(空话('没有空带 —— 卡里 21 条带都有内容了。'));
    for (const b of 空带s) s1.appendChild(空话(b.名 + ' —— 还没有补丁'));
    box.appendChild(s1);

    const s2 = 小节('有内容的带（一个带一个开关）');
    if (!有s.length) s2.appendChild(空话('没有有内容的带。'));
    for (const b of 有s) {
      const 全开 = b.开着 === b.数;
      // ⚠ 钮**不当 `条目卡` 的第 4 个参数** —— 那一格走 `串()`，塞个元素进去
      //    会变成正文 「[object HTMLButtonElement]」，钮**静默消失**。照在装那页的成法：另起一行挂。
      const c = 条目卡(b.名, b.数 + ' 条 · 开着 ' + b.开着 + '/' + b.数, [], '');
      const 动 = document.createElement('div');
      动.className = 'yc-acts';
      动.appendChild(小钮(全开 ? '整条关掉' : (b.开着 ? '整条打开（现在 ' + b.开着 + '/' + b.数 + '）' : '整条打开'),
        '书带', b.名 + '\x01' + (全开 ? '0' : '1')));
      c.appendChild(动);
      s2.appendChild(c);
    }
    box.appendChild(s2);

    // 有开始没结束 —— 那个带里的条目没被算进任何一条带。不静默吞。
    if (记.悬空) box.appendChild(空话('⚠ 「' + 记.悬空 + '」这条带有开始没结束 —— 里面的条目没被算进任何一条带。'));
    return box;
  }

  function 设置页() {
    破限数块 = null;          // 上一版的节点已经摘下来了，别留着
    const box = document.createElement('div');
    box.appendChild(段选(['API', '生成', '面板', '音乐'], 设档, 'set'));
    if (设档 === 'API') 设置API(box);
    else if (设档 === '生成') 设置生成(box);
    else if (设档 === '面板') 设置面板(box);
    else 设置音乐(box);
    return box;
  }

  function 设置API(box) {
    const s1 = 小节('凭据（一份，四个档共用）');
    s1.appendChild(字段('地址', 输入(配置.地址, { cfg: '地址' }, 'yc-in yc-wide'), '填到 /v1 为止，尾巴自动补'));
    s1.appendChild(字段('Key', 输入(配置.钥, { 类型: 'password', cfg: '钥' }, 'yc-in yc-wide'), '只存在这台机器的浏览器里'));
    s1.appendChild(字段('默认模型', 输入(配置.模型, { cfg: '模型' }, 'yc-in yc-wide'), '各档可以各填一个覆盖它'));
    const 行 = document.createElement('div');
    行.className = 'yc-acts';
    行.appendChild(小钮(测中 ? '测试中…' : '测试连接', 'test'));
    行.appendChild(小钮('拉模型列表', 'models'));
    s1.appendChild(行);
    if (测果) {
      const t = document.createElement('div');
      t.className = 'yc-toast' + (测果.坏 ? ' yc-toast-bad' : '');
      t.textContent = 测果.字;
      s1.appendChild(t);
    }
    if (测果 && 测果.列) {
      const d = document.createElement('div');
      d.className = 'yc-seg yc-wrap';
      for (const m of 测果.列) d.appendChild(钮(m, 'pickmodel', { m }, 'yc-sb' + (m === 配置.模型 ? ' yc-sbon' : '')));
      s1.appendChild(d);
    }
    s1.appendChild(空话('🔴 测试连接是带着破限词发的 —— 有些站会拒「无前缀」的请求，只发 ping 会「测通了、正式调用失败」。'));
    box.appendChild(s1);

    const s2 = 小节('四个档');
    s2.appendChild(段选(档名s, 设档位, 'setd'));
    const p = 配置.档[设档位];
    s2.appendChild(字段('模型', 输入(p.模型, { cfgd: '模型' }, 'yc-in'), '留空 ＝ 用上面的默认模型'));
    s2.appendChild(字段('温度', 输入(p.温度, { cfgd: '温度' }, 'yc-in yc-num', { step: '0.05', min: '0', max: '2' }), '0 – 2'));
    s2.appendChild(字段('单次上限', 输入(p.上限, { cfgd: '上限' }, 'yc-in yc-num', { step: '50', min: '100', max: '8000' }), 'token 数 —— 防止一次话痨烧太多'));
    s2.appendChild(字段('自动间隔', 输入(p.间隔, { cfgd: '间隔' }, 'yc-in yc-num', { step: '1', min: '1', max: '100' }), '每几回合自动来一次'));
    s2.appendChild(勾('自动生成', p.自动, { cfgc: '自动' }));
    s2.appendChild(勾('带上世界书', p.带书, { cfgc: '带书' }));
    s2.appendChild(字段('带几楼正文', 输入(p.带楼, { cfgd: '带楼' }, 'yc-in yc-num', { step: '1', min: '0', max: '60' }), '0 ＝ 不带'));
    box.appendChild(s2);

    const s3 = 小节(`世界书名单（${p.书单.length} 条）`);
    s3.appendChild(多行(p.书单.join('\n'), { cfgb: '1' }, 7));
    s3.appendChild(空话('一行一条，写世界书里的条目名。名字对不上的会被跳过 —— 取不到哪几条，生成时会报出来。'));
    const 查 = document.createElement('div');
    查.className = 'yc-acts';
    查.appendChild(小钮('看看取到几条', 'checkbook'));
    s3.appendChild(查);
    box.appendChild(s3);

    const s4 = 小节('破限词');
    s4.appendChild(多行(p.破限, { cfgt: '破限' }, 9));
    破限数块 = 空话(破限字数话(p.破限, p.破限));
    s4.appendChild(破限数块);
    const 行2 = document.createElement('div');
    行2.className = 'yc-acts';
    行2.appendChild(小钮('恢复默认', 'resetbreach'));
    s4.appendChild(行2);
    s4.appendChild(空话('恢复默认只重置这一档的参数，不动地址和 key。'));
    s4.appendChild(字段('自定义追加', 多行(p.自定义, { cfgt: '自定义' }, 3), '接在破限词后面'));
    box.appendChild(s4);
  }

  function 设置生成(box) {
    const s1 = 小节('自动生成');
    s1.appendChild(勾('总开关', 配置.自动总, { cfgj: '自动总' }));
    s1.appendChild(空话(配置.地址
      ? '「回合」＝ 聊天里的非 system 楼层数。自动生成从「打开的那一刻」的楼层起算 —— 不会一打开就把攒了几十轮的账一次补上。'
      : '还没配 API 地址 —— 自动生成强制关着。'));
    const 表 = document.createElement('div');
    for (const 档名 of 档名s) {
      const p = 配置.档[档名];
      const r = document.createElement('div');
      r.className = 'yc-row';
      const a = document.createElement('span');
      a.className = 'yc-rn';
      a.textContent = 档名;
      const b = document.createElement('span');
      b.className = 'yc-rv';
      b.textContent = `${p.自动 ? '自动' : '手动'} · 每 ${p.间隔} 回合 · 上次第 ${数据.末次[档名] === undefined ? '—' : 数据.末次[档名]} 楼`;
      r.appendChild(a);
      r.appendChild(b);
      表.appendChild(r);
    }
    s1.appendChild(表);
    s1.appendChild(空话('每一档的开关与间隔在「API」页里改。'));
    box.appendChild(s1);

    const s2 = 小节('注入预算');
    s2.appendChild(字段('总额', 输入(配置.注入.总, { cfgj: '总' }, 'yc-in yc-num', { step: '100', min: '1000', max: '50000' }), '手机会往主线提示词里塞的字数上限'));
    s2.appendChild(字段('单档上限', 输入(配置.注入.单档, { cfgj: '单档' }, 'yc-in yc-num', { step: '100', min: '200', max: '20000' }), '一段最多塞多少'));
    for (const k of Object.keys(配置.注入.段)) s2.appendChild(勾(k, 配置.注入.段[k], { cfgjs: k }));
    s2.appendChild(字段('本次', 输入(注入读数.用字, {}, 'yc-in yc-num', { readonly: 'readonly' }), `/ ${注入读数.总} 字${注入读数.丢.length ? ' · 丢了：' + 注入读数.丢.join('、') : ''}`));
    if (注入读数.话) {
      const t = document.createElement('div');
      t.className = 'yc-toast yc-toast-bad';
      t.textContent = 注入读数.话;
      s2.appendChild(t);
    }
    const 行 = document.createElement('div');
    行.className = 'yc-acts';
    行.appendChild(小钮('立刻重设一次注入', 'reinject'));
    s2.appendChild(行);
    s2.appendChild(空话('手机编的东西一个字节都不进变量，回主线只走这一个口（位置＝在聊天里、深度 3、以 system 身份）。'
      + '这一段存在酒馆页面内存里、不落盘，所以每次开窗 / 每次生成都会重设一次。'));
    box.appendChild(s2);
  }

  function 设置面板(box) {
    const s = 小节('遗尘行记');
    s.appendChild(勾('显示悬浮球', 配置.面板.球, { cfgp: '球' }));
    s.appendChild(空话('关掉之后只能从「设置」里再打开 —— 这一轮还没有别的入口，慎关。'));
    box.appendChild(s);
    const s2 = 小节('别的面板');
    s2.appendChild(空话('楼层状态栏的开关归状态栏那条线；正文的美化面板归美化那条线（共用 `yh.mh.v1`）。'));
    box.appendChild(s2);
  }

  function 设置音乐(box) {
    const s = 小节('音乐播放器');
    let m = null;
    for (const w of 候选窗口()) { try { if (w.__yuehenMusicRuntime__) { m = w.__yuehenMusicRuntime__; break; } } catch (_) {} }
    if (m) {
      let 探 = null;
      try { 探 = m.探针 ? m.探针() : null; } catch (_) {}
      s.appendChild(条目卡('已载入', 串(m.版本), [一行('正在放', 探 ? 探.当前曲 : '')], ''));
      s.appendChild(空话('播放器本体归音乐那条线 —— 它有自己的球，点那个球就是入口。这里只管报告它在不在。'));
    } else {
      s.appendChild(空话('音乐脚本没在跑（找不到它的运行时）。它不是这张卡的一部分，要单独装。'));
    }
    box.appendChild(s);
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
      // 壁纸挂在这一层（`D157`）—— `cover` + 居中，图多长都不变形、不留白边
      'background:#22261d;background-size:cover;background-position:center;',
      'color:#e8e6dc;font:13px/1.55 system-ui,sans-serif;',
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
      // 人体图那颗钮（`.yc-figbtn`）。⚠ 原名 `.yc-body` —— 与页面容器撞名，轮 4 改掉。
      '.yc-figbtn{display:block;width:100%;border:1px solid #4a5040;border-radius:8px;background:#2b3024;',
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
      // ── 轮 3：输入控件 / 设置页 / 四个现场编的 app ──────────────────────────
      '.yc-in{box-sizing:border-box;width:100%;border:1px solid #5c6350;border-radius:6px;',
      'background:#1e2219;color:inherit;font:inherit;font-size:12px;padding:4px 7px}',
      '.yc-num{width:6em}',
      '.yc-ta{resize:vertical;line-height:1.5}',
      '.yc-fd{display:flex;gap:7px;align-items:baseline;flex-wrap:wrap;padding:3px 0}',
      '.yc-fk{flex:none;min-width:64px;font-size:12px;opacity:.72}',
      '.yc-fv{flex:1 1 8em;min-width:0}',
      '.yc-fa{flex:1 1 100%;font-size:11px;opacity:.6;overflow-wrap:anywhere}',
      '.yc-ck{display:flex;gap:7px;align-items:center;padding:3px 0;font-size:12px;cursor:pointer}',
      '.yc-ck2{border:1px solid #4a5040;border-radius:7px;padding:5px 8px;margin:4px 0}',
      '.yc-ck input{flex:none;margin:0}',
      '.yc-wrap{flex-wrap:wrap}',
      '.yc-tap{cursor:pointer}',
      '.yc-badge{position:absolute;top:3px;right:4px;min-width:15px;height:15px;line-height:15px;',
      'border-radius:8px;background:#7a4a3a;color:#f2ece1;font-size:10px;text-align:center;padding:0 3px}',
      '.yc-app{position:relative}',
      '.yc-post{margin-top:5px;font-size:12px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere}',
      '.yc-rep{margin-top:5px;padding:4px 7px;border-left:2px solid #4a5040;font-size:12px;',
      'opacity:.85;overflow-wrap:anywhere}',
      '.yc-bub{max-width:86%;margin:5px 0;padding:5px 8px;border:1px solid #4a5040;border-radius:9px;',
      'background:#2b3024;overflow-wrap:anywhere}',
      '.yc-bub-me{margin-left:auto;background:#333a2a;border-color:#55603f}',
      '.yc-bubw{font-size:11px;opacity:.65;margin-bottom:2px}',
      '.yc-bubx{font-size:13px;line-height:1.5;white-space:pre-wrap}',
      '.yc-send{margin-top:9px;border-top:1px dashed #4a5040;padding-top:8px}',
      '.yc-send .yc-mini{margin-top:6px}',
      '.yc-fgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin:8px 0}',
      '.yc-fcard{position:relative;border:1px solid #4a5040;border-radius:8px;background:#282d21;',
      'padding:6px;cursor:pointer;overflow-wrap:anywhere}',
      '.yc-fcard[hidden]{display:none}',
      '.yc-fimg{display:flex;align-items:center;justify-content:center;height:52px;border:1px dashed #4a5040;',
      'border-radius:6px;font-size:11px;opacity:.45;margin-bottom:5px}',
      '.yc-fimg-on{border-style:solid;opacity:.6}',
      '.yc-fimg-big{height:96px;margin-top:7px}',
      // ── 轮 4：图那一层（图库 / CG 收集 / 壁纸）──────────────────────────────
      // 图位里真填上图之后框收掉、图自己撑满（`.yc-has` 是 `图上()` 挂的）
      '.yc-fimg.yc-has{border-style:solid;opacity:1;display:block;padding:0}',
      // 一张图填满它所在的那个框 —— 图位 / 缩略图 / 壁纸格都走它
      '.yc-fi{display:block;width:100%;height:100%;object-fit:cover}',
      '.yc-thumb{width:56px;height:56px;flex:none;display:flex;align-items:center;justify-content:center;',
      'border:1px solid #4a5040;border-radius:6px;overflow:hidden;background:#1e2219;font-size:11px;opacity:.7}',
      '.yc-thumb.yc-has{display:block;padding:0;opacity:1}',
      '.yc-imgh{display:flex;gap:8px;align-items:flex-start}',
      '.yc-imgn{flex:1;min-width:0;overflow-wrap:anywhere}',
      // 大图：**看全**（`contain`），不是填满 —— 填满会把图切掉
      '.yc-bigbox{display:flex;align-items:center;justify-content:center;border:1px solid #4a5040;',
      'border-radius:8px;overflow:hidden;background:#1e2219;padding:4px}',
      '.yc-bigbox .yc-fi{width:auto;height:auto;max-width:100%;max-height:300px;object-fit:contain}',
      // 选图的控件：原生那个不好看但能用 —— 零依赖下不自己造一个假的
      '.yc-file{display:block;box-sizing:border-box;width:100%;font:inherit;font-size:12px;color:inherit;',
      'border:1px dashed #5c6350;border-radius:6px;padding:6px;background:#1e2219;margin-bottom:7px}',
      '.yc-wgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}',
      '.yc-wp{border:1px solid #4a5040;border-radius:8px;background:#2b3024;color:inherit;font:inherit;',
      'padding:6px;cursor:pointer;text-align:left;overflow-wrap:anywhere}',
      '.yc-wp:hover{background:#333a2a}',
      '.yc-wpon{border-color:#9aa86a;background:#3d4530}',
      '.yc-wp .yc-thumb{width:auto;height:64px;margin-bottom:4px}',
      '.yc-wn{font-size:12px;overflow-wrap:anywhere}',
      '.yc-wk{font-size:11px;opacity:.85;margin-top:2px}',
      '.yc-fsub{font-size:11px;opacity:.7}',
      '.yc-fname{font-weight:600;font-size:12px}',
      '.yc-fbadge{font-size:11px;opacity:.85;margin-top:3px}',
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
  // ══ 7.9 图那一层（轮 4）═══════════════════════════════════════════════════
  // 🔴 这一轮**只做「本机的图」那一半** —— 玩家自己选进来的图，存在这台机器上。
  //    图床来的官方图**不做**（域名还没定，`§15.8`）—— 但「图床的」那一格照实画出来、
  //    照实空着，**不摆假图充数**。
  const CG缓存 = { 果: null, 待存: null, 分类: '角色', 大图: null, 改: null };
  let 删确认 = { id: 0, 时: 0 };     // 「删掉」要问一次（6 秒内再点一下才算）—— 照「恢复默认」那条
  let 地图索引 = null;               // Map<地点名, 记录> | null（null ＝ 还没读）—— 风物志图位用它
  let 地图索引代 = -1;               // 它是**哪一代**的读数（见 §3 `图库.代`）；跟当前代对不上就重读
  let 地图在读 = false;

  function 图库不可用话(因) {
    return '图库用不了（' + 因 + '）—— 这个 app 现在存不进也读不出。别的 app 不受影响。';
  }

  // 风物志的图位按**地点名**去图库里找（`§15.14`）。
  // ⚠ 代价：地点改了名，图就找不着了 —— 这一轮认这个代价，不另开一张对照表。
  // 同步渲染要用它 ⇒ 读一次缓着。**过不过期不靠谁记得去作废它**，靠 `图库.代` 对账：
  // 谁存的、从哪存的都算数 —— 存 / 删 / 改分类一律让代 +1，下一次进页自己就重读了。
  // （原先是在每个写动作里手写一句 `地图索引 = null` —— 那要求**每个**写入方都记得写，
  //   漏一处就是「图存进去了、图位还是空的」这种查不出来的错。改成对账就没这个要求了。）
  function 要地图索引() {
    if (地图在读) return;
    if (地图索引 && 地图索引代 === 图库.代()) return;
    const 起读代 = 图库.代();       // 记**开始读**那一代：读的过程中有人写，这一次就算过期
    地图在读 = true;
    图库.列({ 分类: '地点' }).then((a) => {
      const m = new Map();
      for (const r of a) if (r.名) m.set(r.名, r);
      地图索引 = m;
    }).catch(() => { 地图索引 = new Map(); })   // 读不了就当「一张都没有」—— 图位照旧画空框，不炸
      .then(() => {
        地图索引代 = 起读代;
        地图在读 = false;
        try { if (当前页 === '风物志') 刷新(); } catch (_) {}
      });
  }
  // 从选进来的文件推名字时，**斩掉扩展名**（`断桥驿.png` → `断桥驿`）。
  // 🔴 为什么非斩不可：图位是拿**地点名**去对的（上面那张索引按 `r.名` 建），
  //    而磁盘上的图**必然带** `.png` / `.jpg` —— 照文件名原样存，那条对账**一辈子对不上**，
  //    读数是「图存进去了、图位还是空的」，而且不报错。
  //    （真浏览器那一趟就是这么读出来的：存了 `断桥驿.png`，风物志那格照旧空着。）
  //    只斩最后一截（`ver1.2.png` → `ver1.2`）；万一斩完是空的（文件就叫 `.png`）就照原样留着，
  //    让「没有名字」那道必填检查去拦。
  function 图名(原) {
    const s = 串(原);
    const t = s.replace(/\.[^.\\/]+$/, '');
    return t || s;
  }
  function 地点图(名) {
    if (!地图索引) { 要地图索引(); return null; }
    if (地图索引代 !== 图库.代()) { 要地图索引(); }   // 手上这份过期了：这一帧先照旧的画，下一帧就新了
    return 地图索引.get(名) || null;
  }
  function 时刻话(时) {
    if (!时) return '';
    try {
      const d = new Date(时);
      const p = (n) => (n < 10 ? '0' + n : String(n));
      return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate())
        + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    } catch (_) { return ''; }
  }

  // 读一次图库 → 进缓存 → 还站在这一页就重画（照世界书页的成法）
  // 🔴 缓存**自己对账 `图库.代`**（同 `要地图索引`）—— 存 / 删 / 改分类之后不用谁记得来作废它。
  function 读CG() {
    const 起读代 = 图库.代();
    图库.可用()
      .then((因) => (因 ? { 成: false, 因 } : 图库.列({}).then((列) => ({ 成: true, 列 }))))
      .then((r) => {
        r.代 = 起读代;
        CG缓存.果 = r;
        try { if (当前页 === 'CG 收集' || 当前页 === '壁纸') 刷新(); } catch (_) {}
      })
      .catch((e) => {
        CG缓存.果 = { 成: false, 代: 起读代, 因: '读图库时出错：' + 串(e && e.message) };
        try { if (当前页 === 'CG 收集' || 当前页 === '壁纸') 刷新(); } catch (_) {}
      });
  }
  // 手上这份读数过期没有 —— 过期就顺手重读一遍（这一帧先照旧的画，下一帧就是新的）。
  function CG要重读(记) { if (!记 || 记.代 !== 图库.代()) { 读CG(); return true; } return false; }

  function CG页() {
    const box = document.createElement('div');
    const 记 = CG缓存.果;
    if (!记) { box.appendChild(空话('翻一下图库…')); 读CG(); return box; }
    CG要重读(记);
    if (!记.成) { box.appendChild(空话(图库不可用话(记.因))); return box; }

    const 列 = 记.列;
    const 数之 = (来) => 列.filter((r) => r.来源 === 来).length;
    box.appendChild(条目卡('CG 收集', '存在这台机器上的图', [
      一行('总共', 列.length + ' 张'),
      一行('本机', 数之('本机') + ' 张'),
      一行('图床', 数之('图床') + ' 张'),
    ], '图只在这台机器的浏览器里 · 换设备 / 清缓存就没了 —— 原始文件请自己留好'));

    // 大图
    if (CG缓存.大图) {
      const r = 列.filter((x) => x.id === CG缓存.大图)[0];
      if (r) {
        const s = 小节('大图');
        const w = document.createElement('div');
        w.className = 'yc-bigbox';
        if (!图上(w, r.图)) w.appendChild(空话('这一张没有图字节（图床来的只存了引用）。'));
        s.appendChild(w);
        // ⚠ `一行()` 值**空了就返回 null**（列表里那行「不占地方」的写法）⇒ 这里必须给个兜底，
        //    不能直接 `appendChild` —— 真 DOM 里 `appendChild(null)` 当场抛，整页画不出来。
        //    `名` 虽然是必填，但**全空格也会过必填那道**（`!条.名` 对 `'   '` 是假），
        //    到这儿 `trim()` 一空就成 null 了。跟 `图条目()` 里那句 `r.名 || '（没名字）'` 同一个口径。
        s.appendChild(一行('名字', r.名 || '（没名字）'));
        s.appendChild(一行('分类', r.分类 + ' · ' + r.来源));
        const 动 = document.createElement('div');
        动.className = 'yc-acts';
        动.appendChild(小钮('收起大图', 'cgbigoff'));
        s.appendChild(动);
        box.appendChild(s);
      } else CG缓存.大图 = null;
    }

    // 存新图 —— 先选文件，再选放哪一类，最后才落库（选错了还能反悔）
    const s1 = 小节('存新图');
    const fi = document.createElement('input');
    fi.type = 'file';
    fi.accept = 'image/*';
    fi.multiple = true;
    fi.className = 'yc-file';
    fi.setAttribute('data-file', 'cg');
    s1.appendChild(fi);
    const 待 = CG缓存.待存 || [];
    if (!待.length) {
      s1.appendChild(空话('选图 → 选放哪一类 → 存进图库。存的只是这台机器上的一份拷贝。'));
    } else {
      const c = 条目卡('选了 ' + 待.length + ' 张', 待.map((x) => x.名).join('、').slice(0, 72), [], '');
      c.appendChild(段选(图分类s, CG缓存.分类, 'cgcat'));
      const 动 = document.createElement('div');
      动.className = 'yc-acts';
      动.appendChild(小钮('存进图库', 'cgsave'));
      动.appendChild(小钮('不存了', 'cgcancel'));
      c.appendChild(动);
      s1.appendChild(c);
    }
    box.appendChild(s1);

    // 三组
    for (const 分类 of 图分类s) {
      const 组 = 列.filter((r) => r.分类 === 分类);
      const s = 小节(分类 + '（' + 组.length + '）');
      if (!组.length) s.appendChild(空话('这一类还没有图。'));
      for (const r of 组) s.appendChild(图条目(r));
      box.appendChild(s);
    }
    return box;
  }

  function 图条目(r) {
    const c = document.createElement('div');
    c.className = 'yc-card';
    const 头 = document.createElement('div');
    头.className = 'yc-imgh';
    const 缩 = document.createElement('div');
    缩.className = 'yc-thumb';
    if (!图上(缩, r.图)) 缩.textContent = '无图';
    头.appendChild(缩);
    const 名 = document.createElement('div');
    名.className = 'yc-imgn';
    const t = document.createElement('div');
    t.className = 'yc-ct';
    t.textContent = r.名 || '（没名字）';
    const s = document.createElement('div');
    s.className = 'yc-cs';
    s.textContent = [r.分类, r.来源, 时刻话(r.时)].filter(Boolean).join(' · ');
    名.appendChild(t);
    名.appendChild(s);
    头.appendChild(名);
    c.appendChild(头);

    const 动 = document.createElement('div');
    动.className = 'yc-acts';
    if (r.图) 动.appendChild(小钮('看大图', 'cgbig', r.id));
    动.appendChild(小钮('改分类', 'cgmove', r.id));
    动.appendChild(小钮('删掉', 'cgdel', r.id));
    c.appendChild(动);

    // 改分类 —— 展开一条选单再点（照「换」那套：展开的 id 单独记着）
    if (CG缓存.改 === r.id) {
      const p = document.createElement('div');
      p.className = 'yc-pick';
      const h = document.createElement('div');
      h.className = 'yc-pk-t';
      h.textContent = '挪到哪一类？';
      p.appendChild(h);
      for (const 分类 of 图分类s) {
        const row = document.createElement('div');
        row.className = 'yc-pk-r';
        row.appendChild(小钮(分类 === r.分类 ? '· ' + 分类 : 分类, 'cgmovego', r.id + '\x01' + 分类));
        p.appendChild(row);
      }
      c.appendChild(p);
    }
    return c;
  }

  function 壁纸页() {
    const box = document.createElement('div');
    const 记 = CG缓存.果;
    if (!记) { box.appendChild(空话('翻一下图库…')); 读CG(); return box; }
    CG要重读(记);
    if (!记.成) { box.appendChild(空话(图库不可用话(记.因))); return box; }

    const 有图 = 记.列.filter((r) => r.图);
    const 没图 = 记.列.length - 有图.length;
    const 现在 = 存.壁纸 ? (记.列.filter((x) => x.id === 存.壁纸)[0] || {}).名 : '';

    box.appendChild(条目卡('壁纸', '换的是「遗尘行记」自己这个壳的背景', [
      一行('现在这张', 存.壁纸 ? (现在 || '（已不在库里）') : '没挂'),
      一行('能当壁纸的', 有图.length + ' 张'),
    ], '不碰正文 · 不改卡 · 就一张，不轮播、不加滤镜'));

    if (存.壁纸) {
      const 动 = document.createElement('div');
      动.className = 'yc-acts';
      动.appendChild(小钮('撤掉壁纸', 'wpoff'));
      box.appendChild(动);
    }
    if (没图) box.appendChild(空话('另有 ' + 没图 + ' 条没有图字节（图床来的只存了引用）—— 这一轮显示不了。'));

    for (const 分类 of 图分类s) {
      const 组 = 有图.filter((r) => r.分类 === 分类);
      const s = 小节(分类 + '（' + 组.length + '）');
      if (!组.length) { s.appendChild(空话('这一类还没有能当壁纸的图。')); box.appendChild(s); continue; }
      const 格 = document.createElement('div');
      格.className = 'yc-wgrid';
      for (const r of 组) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'yc-wp' + (存.壁纸 === r.id ? ' yc-wpon' : '');
        b.setAttribute('data-act', 'wpset');
        b.setAttribute('data-v', 串(r.id));
        const th = document.createElement('div');
        th.className = 'yc-thumb';
        图上(th, r.图);
        b.appendChild(th);
        const n = document.createElement('div');
        n.className = 'yc-wn';
        n.textContent = r.名 || '（没名字）';
        b.appendChild(n);
        if (存.壁纸 === r.id) {
          const k = document.createElement('div');
          k.className = 'yc-wk';
          k.textContent = '✓ 正在用';
          b.appendChild(k);
        }
        格.appendChild(b);
      }
      s.appendChild(格);
      box.appendChild(s);
    }
    return box;
  }

  const 页工厂 = {
    主角: 主角页,
    资产: 资产页,
    角色图鉴: 角色图鉴页,
    成长: 成长页,
    任务: 任务页,
    特殊事件: 特殊事件页,
    论坛: 论坛页,
    信息: 信息页,
    局势: 局势页,
    风物志: 风物志页,
    'CG 收集': CG页,
    壁纸: 壁纸页,
    世界书: 世界书页,
    设置: 设置页,
  };

  function 未读角标(名) {
    if (名 === '信息') {
      let n = 0;
      for (const k of Object.keys(数据.会话)) n += 数据.会话[k].未读 || 0;
      for (const k of Object.keys(数据.群)) n += 数据.群[k].未读 || 0;
      return n;
    }
    return 0;
  }

  function 应用面板() {
    if (!球) return;
    const 显 = 配置.面板.球 !== false;
    球.style.display = 显 ? '' : 'none';
  }

  // 🔴 壁纸挂在**壳**（`.yc-win`）上 —— 不是正文、不是球（`D157`）。
  //    抬头 / 回执 / 页都在这层里面 ⇒ 换一张图，整个手机跟着换。
  // ⚠ 上一批页内图的地址在 `清图址()` 里统一还；**壁纸这个地址单独还** ——
  //    不然刷新一次就把背景撤没了。
  function 应用壁纸() {
    if (!窗) return;
    const id = 存.壁纸;
    if (!id) { 改壁纸(''); return; }
    // 🔴 「不用重取」有两个条件：还是同一条 **＋ 库没被改过**（`图库.代`）。
    //    只看 id 是不够的 —— 那一条可以在别处被删掉 / 被换成别的图，而 id 一个字都没变。
    if (id === 壁纸已画 && 壁纸址 && 壁纸已画代 === 图库.代()) return;
    // ⚠ **拿到新图之前不撤旧的** —— 老的先撤会出现「背景空一下再回来」的闪。
    //   真撤不掉的风险是零：`壁纸址` 始终指向一个**还没被还掉**的地址，新的一到手才还它。
    图库.取(id).then((r) => {
      if (存.壁纸 !== id) return;                 // 这中间又换了 / 撤了 —— 以现值为准
      if (!r || !r.图) {
        // 图被删了，或者那是一条只有引用的图床记录 ⇒ 指针作废，不静默留个死指针
        存.壁纸 = '';
        写存储();
        改壁纸('');
        try { 刷新(); } catch (_) {}     // 这一趟 `刷新` 会再进这里一次：那时 id 已是 ''，走上面清空那条
        return;
      }
      const 新址 = 造址(r.图);
      if (!新址) return;
      改壁纸(新址);
      壁纸已画 = id;
      壁纸已画代 = 图库.代();
    }).catch(() => {});
  }

  // 换背景（`址` 为空 ＝ 撤掉）。旧地址在这里还，别处不许还 —— 免得还了两次。
  function 改壁纸(址) {
    if (壁纸址 && 壁纸址 !== 址) { try { URL.revokeObjectURL(壁纸址); } catch (_) {} }
    壁纸址 = 址 || '';
    if (!址) 壁纸已画 = null;
    if (窗) 窗.style.backgroundImage = 址 ? 'url("' + 址 + '")' : '';
  }

  function 刷新() {
    if (!窗) return;
    清图址();          // 上一批页内图的地址该还了（DOM 马上就要整个换掉）
    应用壁纸();
    应用面板();
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
        k.textContent = a.做 ? (正在生成 === a.名 ? '生成中…' : a.类) : '未做';
        b.appendChild(n);
        b.appendChild(k);
        const 标 = 未读角标(a.名);
        if (标) {
          const g = document.createElement('span');
          g.className = 'yc-badge';
          g.textContent = 标 > 99 ? '99+' : String(标);
          b.appendChild(g);
        }
        wall.appendChild(b);
      }
      页.appendChild(wall);
      // 回执条 —— 提到公共层（不然在论坛页生成完了，回执只在主角页看得见）
      if (提示) 页.appendChild(提示条(提示));
      return;
    }

    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'yc-back';
    back.setAttribute('data-act', 'back');
    back.textContent = '← 返回';
    页.appendChild(back);

    if (提示) 页.appendChild(提示条(提示));

    const 造 = 页工厂[当前页];
    if (造) 页.appendChild(造());
    else {
      const e = document.createElement('div');
      e.className = 'yc-empty';
      e.textContent = `${当前页}：还没做`;
      页.appendChild(e);
    }

    // 私聊/群聊：每次重画都滚到底 —— 看的是最新那一句
    if (当前页 === '信息' && 会话选中) {
      try { 窗.scrollTop = 窗.scrollHeight; } catch (_) {}
    }
  }

  function 提示条(t) {
    const e = document.createElement('div');
    e.className = 'yc-toast' + (t.坏 ? ' yc-toast-bad' : '');
    e.textContent = t.字;
    return e;
  }

  function 开窗() {
    if (!窗) return;
    窗.hidden = false;
    定位窗();
    存.开合 = true; 写存储();
    刷新();
    // 🔴 注入那一段存在酒馆页面的内存里、不落盘 ⇒ 每次开窗都重设一次（§14.5）
    注入();
    try { 查自动(); } catch (_) {}
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

  // ── 轮 3 的动作总台 ────────────────────────────────────────────────────
  // 返回 true ＝ 这个动作我认了，调用方别再往下走。
  function 当前件(档名) {
    if (档名 === '信息') return 会话选中 ? { 类: 会话选中.类, 名: 会话选中.名 } : null;
    if (档名 === '风物志') {
      const 地 = 地点选中 || 串(取(变量, ['世界', '地点'], ''));
      return 地 ? { 名: 地 } : null;
    }
    return {};
  }

  function 说(坏, 字) { 提示 = { 坏: !!坏, 字 }; 刷新(); }

  function 点动作(k, act, e) {
    const v = act.getAttribute('data-v');
    const 名 = act.getAttribute('data-名');

    if (k === 'gen') {
      const 件 = 当前件(v);
      if (件 === null) { 说(true, v === '信息' ? '先点开一个会话，再让它回。' : '读不到当前地点 —— 先在主线里走到一个地方。'); return true; }
      if (在生成(v)) return true;
      入队(v, '手动', 件);
      刷新();
      return true;
    }
    if (k === 'auto') {
      const p = 配置.档[v];
      if (!p) return true;
      if (!p.自动 && !配置.地址) { 说(true, '还没配 API —— 先填地址和 key。'); return true; }
      p.自动 = !p.自动;
      存配置();
      查自动();          // 刚打开 ⇒ 记下当前楼层当起点（不会一次把攒的账全补上）
      刷新();
      return true;
    }

    if (k === '书带') {
      const 段 = 串(v).split('\x01');
      开关带.目标 = 段[0];
      安全跑(async () => {
        const 坏 = await 开关带(段[1] === '1');
        if (坏) 说(true, 坏); else 刷新();   // 成了就重画 —— 缓存已清，会重读一遍真值
      });
      return true;
    }
    if (k === '书换') {
      if (v && v !== 书当前) { 书当前 = v; 书页缓存.果 = null; 刷新(); }
      return true;
    }

    if (k === 'post') { 帖展开 = Number(act.getAttribute('data-i')); 刷新(); return true; }
    if (k === 'postback') { 帖展开 = null; 刷新(); return true; }

    if (k === 'talk') {
      会话选中 = { 类: act.getAttribute('data-类'), 名 };
      const c = 会话选中.类 === '群' ? 数据.群[名] : 数据.会话[名];
      if (c) { c.未读 = 0; 存数据(); }
      刷新();
      return true;
    }
    if (k === 'talkback') { 会话选中 = null; 录中 = null; 刷新(); return true; }
    if (k === 'newtalk') { 录中 = { 类: '单聊', 选: [] }; 刷新(); return true; }
    if (k === 'newgroup') { 录中 = { 类: '群', 选: [] }; 刷新(); return true; }
    if (k === 'pick') {
      if (!录中) return true;
      const i = 录中.选.indexOf(名);
      if (i < 0) 录中.选.push(名); else 录中.选.splice(i, 1);
      return true;      // 🔴 不重画 —— 复选框自己已经翻过来了，重画反而把它翻回去
    }
    if (k === 'groupmake') {
      if (!录中 || !录中.选.length) { 说(true, '一个人都没勾。'); return true; }
      const 群 = 录中.选.slice().sort().join('、');
      数据.群[群] = 数据.群[群] || { 成员: 录中.选.slice().sort(), 条: [], 未读: 0 };
      录中 = null;
      会话选中 = { 类: '群', 名: 群 };
      存数据();
      刷新();
      return true;
    }
    if (k === 'open') {
      录中 = null;
      会话选中 = { 类: '单聊', 名 };
      数据.会话[名] = 数据.会话[名] || { 条: [], 未读: 0 };
      数据.会话[名].未读 = 0;
      存数据();
      刷新();
      return true;
    }
    if (k === 'send') {
      const 框 = act.parentNode && act.parentNode.querySelector('textarea');
      const 字 = 框 ? 串(框.value).trim() : '';
      if (!字) return true;
      const 我 = { 谁: '我', 字 };
      if (会话选中) {
        const c = 会话选中.类 === '群' ? 数据.群[会话选中.名] : 数据.会话[会话选中.名];
        if (c) { c.条 = c.条.concat([我]).slice(-(会话选中.类 === '群' ? 条数上限.群 : 条数上限.会话)); c.未读 = 0; }
        存数据();
        入队('信息', '手动', { 类: 会话选中.类, 名: 会话选中.名 });
      }
      刷新();
      return true;
    }

    if (k === 'fopen') { 地点选中 = 名; 刷新(); return true; }
    if (k === 'fback') { 地点选中 = null; 刷新(); return true; }
    if (k === 'f界域' || k === 'f大区' || k === 'f地域') {
      风筛选[k.slice(1)] = v;
      筛卡();
      return true;
    }

    // ── 图那一层（轮 4）────────────────────────────────────────────────────
    if (k === 'cgcat') { CG缓存.分类 = v; 刷新(); return true; }
    if (k === 'cgcancel') { CG缓存.待存 = null; 提示 = null; 刷新(); return true; }
    if (k === 'cgsave') {
      const 待 = CG缓存.待存 || [];
      if (!待.length) { 说(true, '还没选图。'); return true; }
      const 分类 = CG缓存.分类;
      安全跑(async () => {
        let 成 = 0;
        const 坏 = [];
        for (const f of 待) {
          try {
            await 图库.存({ 分类, 来源: '本机', 名: f.名, 图: f.图 });
            成++;
          } catch (e) { 坏.push(f.名 + '：' + 串(e && e.message ? e.message : e)); }
        }
        CG缓存.待存 = null;
        // ⚠ 这里**不用**手动作废缓存 —— CG 页 / 壁纸页每次画都拿 `图库.代` 对一次账（`CG要重读`），
        //   风物志那份索引同理。写入方少写一句也不会留下「存进去了、界面还是旧的」。
        说(!!坏.length, 坏.length
          ? '存进去 ' + 成 + ' 张，' + 坏.length + ' 张没存上 —— ' + 坏.slice(0, 2).join('；')
          : '存进去 ' + 成 + ' 张（' + 分类 + '）。');
      });
      return true;
    }
    if (k === 'cgbig') { CG缓存.大图 = Number(v) || null; 刷新(); return true; }
    if (k === 'cgbigoff') { CG缓存.大图 = null; 刷新(); return true; }
    if (k === 'cgmove') {
      const id = Number(v) || null;
      CG缓存.改 = (CG缓存.改 === id ? null : id);
      提示 = null;
      刷新();
      return true;
    }
    if (k === 'cgmovego') {
      const 段 = 串(v).split('\x01');
      const id = Number(段[0]);
      const 分类 = 段[1];
      if (!id || 图分类s.indexOf(分类) < 0) return true;
      CG缓存.改 = null;
      安全跑(() => 图库.取(id).then((r) => {
        if (!r) { 说(true, '这一条已经不在库里了。'); return null; }
        r.分类 = 分类;
        return 图库.存(r).then(() => { 说(false, '「' + (r.名 || '这一条') + '」挪到「' + 分类 + '」了。'); });
      }));
      return true;
    }
    if (k === 'cgdel') {
      const id = Number(v);
      if (!id) return true;
      const 今 = Date.now();
      if (删确认.id !== id || 今 - 删确认.时 > 6000) {
        删确认 = { id, 时: 今 };
        说(false, '再点一下「删掉」就从图库里删了（6 秒内有效）—— 删了找不回来，原始文件还在你自己那儿。');
        return true;
      }
      删确认 = { id: 0, 时: 0 };
      安全跑(() => 图库.删(id).then(() => {
        // 🔴 删的正好是壁纸 ⇒ 指针一起作废，别留个指向已删图的死指针（§15.12）
        if (存.壁纸 === id) { 存.壁纸 = ''; 写存储(); }
        CG缓存.大图 = null; CG缓存.改 = null;   // 看大图 / 改分类选的是哪一条 —— 那条没了，这两格得跟着收
        说(false, '删掉了。');
      }));
      return true;
    }
    if (k === 'wpset') {
      const id = Number(v);
      if (!id) return true;
      存.壁纸 = id; 写存储();
      说(false, '换上了 —— 换的是这个 app 壳自己的背景，正文一个字没动。');
      return true;
    }
    if (k === 'wpoff') {
      存.壁纸 = ''; 写存储();
      说(false, '壁纸撤了，壳回到原来的底色。');
      return true;
    }

    if (k === 'set') { 设档 = v; 刷新(); return true; }
    if (k === 'setd') { 设档位 = v; 刷新(); return true; }
    if (k === 'pickmodel') { 配置.模型 = act.getAttribute('data-m'); 存配置(); 说(false, '默认模型设成 ' + 配置.模型 + ' 了。'); return true; }
    if (k === 'resetbreach') {
      const 今 = Date.now();
      if (今 - 确认默认 > 6000) {
        确认默认 = 今;
        说(false, `再点一下「恢复默认」就把「${设档位}」这一档的参数和破限词重置掉（6 秒内有效）。地址和 key 不动。`);
        return true;
      }
      确认默认 = 0;
      // `空配置()` 每次现造一份新对象 ⇒ 直接拿它当默认档，不用再单独存一份「默认值」
      配置.档[设档位] = 空配置().档[设档位];
      存配置();
      说(false, `「${设档位}」已恢复默认。`);
      return true;
    }
    if (k === 'reinject') { 注入(); 说(false, 注入读数.话 || `重设了一次 —— 这次塞进去 ${注入读数.用字} / ${注入读数.总} 字。`); return true; }
    if (k === 'checkbook') {
      const 单 = 配置.档[设档位].书单;
      说(false, `正在读世界书（${单.length} 条）…`);
      取书(单).then((r) => 说(r.缺.length, r.缺.length
        ? `取到 ${单.length - r.缺.length} 条 · ${r.字} 字。取不到：${r.缺.join('、')}`
        : `书单 ${单.length} 条全取到了 · 共 ${r.字} 字。`)).catch((e) => 说(true, 串(e && e.message ? e.message : e)));
      return true;
    }
    if (k === 'test') {
      if (测中) return true;
      测中 = true; 测果 = null; 刷新();
      Promise.resolve().then(测连接).then((r) => { 测果 = r; })
        .catch((e) => { 测果 = { 坏: true, 字: 串(e && e.message ? e.message : e) }; })
        .then(() => { 测中 = false; 刷新(); });
      return true;
    }
    if (k === 'models') {
      if (测中) return true;
      测中 = true; 测果 = null; 刷新();
      Promise.resolve().then(拉模型).then((r) => { 测果 = r; })
        .catch((e) => { 测果 = { 坏: true, 字: 串(e && e.message ? e.message : e) }; })
        .then(() => { 测中 = false; 刷新(); });
      return true;
    }
    return false;
  }

  // ── 配置类控件的收口 ───────────────────────────────────────────────────
  // 🔴 一律**不重画**：一重画输入框就丢焦点，等于打一个字跑一次光标。
  function 收数(el, 原, 小, 大) {
    const n = Number(el.value);
    if (!Number.isFinite(n)) return 原;
    return Math.max(小, Math.min(大, n));
  }

  function 收改动(e) {
    const t = e.target;
    if (!t || !t.getAttribute) return;
    const 取属 = (k) => t.getAttribute('data-' + k);
    const 值 = t.type === 'checkbox' ? t.checked : t.value;

    // ── 选图（CG 收集）──────────────────────────────────────────────────────
    // 🔴 只**收下**，还没落库 —— 等玩家选完放哪一类，再点「存进图库」。
    // ⚠ `input` 和 `change` 都往这儿冒，只认 `change` 那一次 —— 不然会读两遍，
    //    第二遍读到的还是刚被清空的 value（选了个寂寞）。
    if (取属('file') !== null) {
      if (e.type !== 'change') return;
      let fs = [];
      try { fs = t.files ? Array.prototype.slice.call(t.files) : []; } catch (_) { fs = []; }
      CG缓存.待存 = fs.map((f) => ({ 名: 图名(f.name), 图: f }));
      CG缓存.分类 = 图分类s[0];
      提示 = null;
      try { t.value = ''; } catch (_) {}     // 清掉才能再选同一批
      刷新();
      return;
    }

    if (取属('筛') !== null) { 风筛选.词 = 串(t.value); 筛卡(); return; }
    if (取属('写') !== null) return;                       // 聊天输入框 —— 发送时才读
    if (t.getAttribute('data-act') === 'pick') return;      // 勾人 —— 点击那条路已经处理了

    let 改过 = false;
    const 键 = 取属('cfg');
    if (键 !== null) { 配置[键] = 串(值); 改过 = true; }
    const 档键 = 取属('cfgd');
    if (档键 !== null) {
      const p = 配置.档[设档位];
      const 界 = { 温度: [0, 2], 上限: [100, 8000], 间隔: [1, 100], 带楼: [0, 60] };
      const [小, 大] = 界[档键] || [0, 0];
      p[档键] = 档键 === '模型' ? 串(值) : 收数(t, p[档键], 小, 大);
      改过 = true;
    }
    const 勾键 = 取属('cfgc');
    if (勾键 !== null) { 配置.档[设档位][勾键] = !!值; 改过 = true; }
    const 总键 = 取属('cfgj');
    if (总键 !== null) {
      if (总键 === '自动总') 配置.自动总 = !!值;
      else 配置.注入[总键] = 收数(t, 配置.注入[总键], 总键 === '总' ? 1000 : 200, 总键 === '总' ? 50000 : 20000);
      改过 = true;
    }
    const 段键 = 取属('cfgjs');
    if (段键 !== null) { 配置.注入.段[段键] = !!值; 改过 = true; }
    const 板键 = 取属('cfgp');
    if (板键 !== null) { 配置.面板[板键] = !!值; 改过 = true; }
    const 书名 = 取属('cfgb');
    if (书名 !== null) {
      配置.档[设档位].书单 = 串(t.value).split('\n').map((s) => s.trim()).filter(Boolean);
      改过 = true;
    }
    const 破键 = 取属('cfgt');
    if (破键 !== null) {
      const 文 = 串(t.value);
      // 🔴 破限词清空 ⇒ **落回默认**，不留空串（§14.2.2：不带破限有些站直接拒，
      //    那会变成「测试连接过了、正式调用被拒」）。`自定义` 那格清空就是清空。
      配置.档[设档位][破键] = (破键 === '破限' && !文.trim()) ? 默认破限[设档位] : 文;
      if (破键 === '破限' && 破限数块) 破限数块.textContent = 破限字数话(文, 配置.档[设档位][破键]);
      改过 = true;
    }

    if (改过) { 存配置(); if (取属('cfgp') === '球') 应用面板(); }
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
        if (点动作(k, act, e)) return;
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

    // ── 设置页的控件 ＋ 风物志的搜索 ──────────────────────────────────────
    // 🔴 这两类都**不重画**（重画 = 输入框丢焦点）—— 只改 `配置` / `风筛选` 再落盘。
    窗.addEventListener('input', 收改动);
    窗.addEventListener('change', 收改动);

    // 信息页的输入框：回车发送、Shift+回车换行
    窗.addEventListener('keydown', (e) => {
      const t = e.target;
      if (e.key !== 'Enter' || e.shiftKey) return;
      if (!t || t.tagName !== 'TEXTAREA' || t.getAttribute('data-写') === null) return;
      const b = t.parentNode && t.parentNode.querySelector('[data-act="send"]');
      if (b) { e.preventDefault(); b.click(); }
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
    // 🔴 把注入清掉 —— 不清的话，手机卸载了、它编的那段还留在提示词里冒充现状
    try {
      const c = 酒馆上下文();
      if (c && typeof c.setExtensionPrompt === 'function') c.setExtensionPrompt(注入键, '', 注入位置, 注入深度, false, 注入角色);
    } catch (_) {}
    for (const [t, e, f] of 视口监听) { try { t.removeEventListener(e, f, true); } catch (_) {} }
    try { for (const [t, e, f] of 视口监听) { try { t.removeEventListener(e, f); } catch (_) {} } } catch (_) {}
    视口监听 = [];
    try { if (键监听) 取文档().removeEventListener('keydown', 键监听); } catch (_) {}
    键监听 = null;
    try { if (球 && 球.parentNode) 球.parentNode.removeChild(球); } catch (_) {}
    try { if (窗 && 窗.parentNode) 窗.parentNode.removeChild(窗); } catch (_) {}
    try { const s = 取文档().getElementById(挂样式键); if (s && s.parentNode) s.parentNode.removeChild(s); } catch (_) {}
    球 = 窗 = 页 = 抬头时 = 抬头地 = null;
    // 对象地址跟着走 —— 节点都摘了，这些地址再没人用得上
    清图址();
    if (壁纸址) { try { URL.revokeObjectURL(壁纸址); } catch (_) {} 壁纸址 = ''; }
    壁纸已画 = null; 壁纸已画代 = -1;
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
    // 注入那一段不落盘 ⇒ 每次启动重设一次（拿不到酒馆接口时 `注入读数.话` 会说明）
    注入();

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
          配置: JSON.parse(JSON.stringify(配置)),
          数据: JSON.parse(JSON.stringify(数据)),
          换哪件, 提示,
          注入读数: JSON.parse(JSON.stringify(注入读数)),
          正在生成, 队忙, 队: 队.map((x) => ({ 档: x.档, 因: x.因, 件: x.件 })),
          会话选中, 帖展开, 地点选中, 设档, 设档位, 测中, 测果,
          CG: {
            待存: (CG缓存.待存 || []).length, 分类: CG缓存.分类,
            大图: CG缓存.大图, 改: CG缓存.改,
            读过没: !!CG缓存.果, 成: CG缓存.果 ? !!CG缓存.果.成 : null,
          },
          壁纸挂着: !!壁纸址, 壁纸已画,
          图库代: 图库.代(), 地图索引代, 壁纸已画代,
          // 这个纯函数本身（不是它的读数）—— 桩里没有「选文件」那条路，只有把函数递出去才咬得住
          图名,
        }),
        // 写动作直出（桩测要 await，点击回调那条路不返回 promise）
        卸掉, 换上, 图库,
      };
    } catch (_) {}
  }

  启动();
})();

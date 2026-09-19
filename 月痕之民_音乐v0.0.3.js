// ============================================================================
// 月痕之民 · 音乐播放器
//   版本 v0.0.3
//   装在卡里的是 `tavern_helper.scripts` 第 3 条，`content` 只有一行 import：
//     import 'https://cdn.jsdelivr.net/gh/ZIMOJUNA/114514@main/月痕之民_音乐v0.0.3.js';
//
// ── 它做什么 ────────────────────────────────────────────────────────────────
//   跟着事件链放音乐：读 MVU 的 `世界.主线` → 找正在走的那条线 → 看它的 `配乐` 格
//   （六档: 日常 / 紧张 / 战斗 / 悲恸 / 凯旋 / 静谧）→ 从曲目表挑一首放。
//   作者内置的曲子、玩家自填的链接、网易云直链，走的是同一条路。
//
// ── v0.0.2 → v0.0.3 改了什么 ────────────────────────────────────────────────
//   驾驶员真机实测报回八条，分两类：真 bug 四条 ＋ 功能压根没做四条。
//
//   ① 🔴 加「单一真源」—— 这是四条 bug 的总闸。
//      病根: 界面到处去**猜**音频在不在放，而且猜的**时机**不对。换曲走的是
//      「旧曲淡出 700ms → 才启动新曲」，而界面刷新跑在启动**之前**，那一刻新曲
//      还没响，就判成「没在播」，把球的动效关掉了；700ms 后曲子真响了，却没人
//      再去打开它。⇒ 真机现象「只有第一次有波浪动效」。
//      改法: 音频元素在 play / pause / playing / ended / emptied / error 时**主动
//      喊一声**，界面听到才改；状态真变了才动 DOM。
//   ② 🔴 中间键改成**真正的播放键**。原来开头一句 `if (!d.src) return` —— 还没
//      载入任何曲子时点它**什么都不做**，所以真机上「非得先点 ⏮/⏭ 才有声音」。
//      现在: 没曲子就挑一首放 / 在放就暂停 / 暂停就续播 / 播完了就重放。
//   ③ 🔴 兜底手势不再抢跑。原来那条兜底挂在**整份文档的捕获阶段**，手指一按下
//      就先把暂停的曲子 play() 起来，紧接着按钮自己的逻辑看到「咦已经在放了」
//      又给 pause() —— 净效果是「点了没反应」。现在只有**确实想放**时才补一次。
//      ⚠ 这一条是**读代码推出来的**，没在真机上抓到现行；②③ 一起改完这条路就
//        整个拆掉了，不管它是不是真凶都不会再有。
//   ④ 播放模式: 顺序 / 列表循环 / 单曲循环 / 随机（四种，点一下转一格，存本地）。
//      🔴 手动 ⏮/⏭ **永远按当前档的顺序走**（可预测），随机只作用于**自动续播**；
//         **绝不跨档** —— 走到档尾就回到本档第一首（顺序模式则在档尾停下）。
//   ⑤ 曲目表重做: 六档**一次只展开一档**（其余收成一行标题带数量）。原来六档全铺
//      开、空档还带一整句提示，面板被撑得老长。
//   ⑥ 曲目行**可点** —— 点哪首放哪首，并从这首开始往下走。原来整行是个 `<div>`，
//      行里唯一能按的是删除键。
//      ⇒ 真机报的「到不了其他曲目，只能困在日常」就是靠 ⑤⑥ 解决的: 点开别的档、
//        点那首歌，就放它。
//   ⑦ 悬浮球: 外圈金色光环绕圈转（播放时转、暂停停住并变暗）＋ **可换成自己的图**
//      （面板「外观」区: 粘链接 或 选本地图片）。内置默认见图 `球图内置`。
//   ⑧ 抬头条顶部一条**渐变流光**（播放时横向流动、暂停时静止变暗）。
//   ⑨ 抬头两行改成**单方向循环滚动**（一圈到底 → 停一下 → 重来），速度慢、可读。
//      放得下就不滚 —— 别没事乱滚。
//   ⑩ 面板动效: 抽屉展开淡入、曲目行悬停位移、按钮回弹、chip 过渡。
//   ⑪ 🔴 抬头副行**不再变馊**。真机截图那句「没有正在走的线，且一首能放…」是
//      **过期文本** —— 理由只在选曲成功时写一次，之后刷新界面不会重算，就一直挂着。
//      现在刷新界面时**重算路线理由**。
//
// ── 🔴 存储版本**保持 2**（v0.0.2 是 2）───────────────────────────────────
//   本轮只**新增**字段（`模式` / `球图`），旧存档读进来完全无损。
//   ⇒ v0.0.2 时期粘过的曲目**不用重粘**。这是有意的: 升版本的代价是玩家重粘一次，
//     能不加就不加。将来真出现**破坏性**结构变化（字段改名 / 语义变了）才升。
//
// ── 它不做什么（照旧）─────────────────────────────────────────────────────
//   ✗ 不做音效 —— 本卡没有战斗实时演算，没地方挂
//   ✗ 不做 TTS（念白）—— 跟音乐是两条路
//   ✗ 不动 ST 原生的 Dynamic Audio 扩展
//   ✗ 不做「模型在正文里出 <bgm> 标记」那套 —— 选曲只认变量里的 `配乐` 格
//   ✗ 不上传、不转码、不代理任何音频 —— 只放 URL
//
// ── 🔴 一条必须写进说明书的限制（不是 bug，是浏览器的规矩）──────────────────
//   浏览器不许「没被用户点过」的页面自动出声。⇒ 玩家先点一下悬浮球（解锁），
//   之后切曲才会自动跟。没解锁之前，曲子备好了也不会响。
//
// ── 🔴 另一条（关于「跟着鼓点动」）─────────────────────────────────────────
//   本播放器的旋转 / 流光**只跟「在放 / 不在放」这个状态**，不跟频谱。
//   原因是硬限制: 要读波形得把音频接进 Web Audio 的 AnalyserNode，而
//   `createMediaElementSource` 一旦接上**跨域**音频，浏览器会把输出**直接静音**
//   （防偷录）。网易云外链没有 CORS 头 ⇒ 真要读波形，音乐就没了。
//   ⇒ 这不是偷懒，是绕不过去。要看真频谱，只能等将来音频全部自托管在同源域名下。
//
// ── 🔴 三条红线 ─────────────────────────────────────────────────────────────
//   `_` 与 `z` 是酒馆助手注入的全局量，本文件**不 import**（另引会出现三实例地雷）。
//   本文件不 import 任何东西。
//   图标是**手写的几何路径**（24×24 网格 / 描边 2 / 圆头），没有引任何第三方图标库，
//   也没有引任何图片、字体、CSS 框架 —— 零依赖是硬约束。
// ============================================================================

(function () {
  'use strict';

  // ══ 0. 常量 ═══════════════════════════════════════════════════════════════
  const 版本 = 'v0.0.3';
  const RUNTIME_KEY = '__yuehenMusicRuntime__';  // 单例键（挂在宿主窗口上）
  const LS_KEY = 'yuehen_music_v1';
  const LS_版本 = 2;                             // 存储结构版本 —— 对不上就当没存过，不猜
                                                 //   🔴 v0.0.3 **故意不升**（还是 2）:
                                                 //   本轮只新增字段，旧存档读进来无损 ⇒
                                                 //   v0.0.2 时期粘过的曲目不用重粘。
  const FADE_MS = 700;                           // 交叉淡入淡出时长
  const 面板宽 = 316;                            // v0.0.2 是 288 —— 传送行要塞 5 个按钮
                                                 //   ＋ 音量条，288 装不下（会把音量挤没）
  const 球尺寸 = 52;                             // v0.0.2 是 44。要往里装图，44 太小。
                                                 //   🔴 单一来源: 别的地方一律用它，不写裸数字
                                                 //   （v0.0.2 把 44 写死在 4 处，改一处就错位）
  const 档名表 = ['日常', '紧张', '战斗', '悲恸', '凯旋', '静谧'];
  const 默认档 = '日常';
  const 模式表 = ['顺序', '列表循环', '单曲循环', '随机'];
  const 模式默认 = '列表循环';                   // 见文件头 ④ —— BGM 放完就静音太伤，
                                                 //   默认选「列表循环」而不是「顺序」
  const 音量默认 = 0.5;
  const 拖动阈值 = 6;                            // px —— 超过它才算拖动，否则算点击
  const 同步去抖 = 200;                          // ms —— 变量事件可能连发，攒一下再选曲
  const 视口去抖 = 120;                          // ms
  const 动效_开合 = 190;                         // ms —— 要和 CSS 里的 --ym-dur 对上
  const 滚动速度 = 22;                           // px/秒 —— 抬头滚动的速度。越小越慢。
                                                 //   驾驶员要求「比现在慢」，22 是慢速可读档
  const 滚动最少秒 = 7;                          // 秒 —— 再短也得滚这么久，否则一闪而过
  const 图大小上限 = 1024 * 1024;                // 1MB —— 上传的图存 localStorage，
                                                 //   转成 base64 会涨约 1/3，太大写不进去
  const 音频后缀 = /\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|webm)(\?|#|$)/i;

  // ══ 1. 内置层（作者填）════════════════════════════════════════════════════
  // 音频文件的 CDN 前缀。曲目表里写文件名，拼起来就是完整地址。
  // ⚠ 现在留空 —— 音频一个都还没有（放哪也还没定，见 `扩展规划.md` §1.11）。
  const AUDIO_BASE = '';

  // 六档曲目表。一首都没有就是空数组 —— 空着不报错，播放器静默待命。
  const TRACKS = {
    日常: [],
    紧张: [],
    战斗: [],
    悲恸: [],
    凯旋: [],
    静谧: [],
  };

  // 钉死表 —— 命中就直接用它，**不看 `配乐` 格**。
  // 形状: { 章节: /正则/, 节点: /正则/ 或 null, 曲: 'final-boss.m4a' }
  // 🔴 键写成**正则**而不是章名 —— 只认关键词，**不预设任何具体剧情**。
  const PINNED = [];

  // 抬头条的底图槽位。留空 = 不上图。
  const 抬头图 = '';

  // 🔴 悬浮球的图。这是**给玩家看的默认形象**（内置层）。
  //   玩家在面板「外观」区粘链接 / 选本地图，会**盖过**它（存在 localStorage，不进卡）。
  //   ⚠ 单独放一个 CDN 文件，不塞进本文件 —— 塞进来脚本会从 66KB 涨到约 370KB，
  //     为一张装饰图不值当；单独放还能以后单独换图。
  //   ⚠ 图挂了（404 / 断网）会自动退回手写的音符图标，不会留一个空球。
  const 球图内置 = 'https://cdn.jsdelivr.net/gh/ZIMOJUNA/114514@main/月痕之民_音乐球.webp';

  // ══ 2. 外挂层（创意工坊 / 高级玩家）══════════════════════════════════════
  //   window.月痕音乐外挂 = {
  //     曲目: { 战斗: ['https://.../boss.m4a'] },
  //     钉死: [ { 章节: '创世神', 节点: '', 曲: 'https://.../final.m4a' } ],
  //   };
  // 🔴 刻意**不**用 `getWorldbook` 那类接口 —— 签名随酒馆助手版本变，猜错就是静默失效。
  const 外挂键 = '月痕音乐外挂';

  // ══ 3. 宿主环境 ═══════════════════════════════════════════════════════════
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
      try { if (w && typeof w.Mvu === 'object' && w.Mvu && typeof w.Mvu.getMvuData === 'function') { 宿主 = w; return w; } } catch (_) {}
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

  // ══ 4. 存储 ═══════════════════════════════════════════════════════════════
  // 音量 / 静音 / 悬浮球位置 / 播放模式 / 球图 / 玩家自填曲目 / 曲目名字 —— 全在
  // localStorage，**不进卡**。
  // ⚠ `曲目` 与 `名字` 是**两张表**，故意的:
  //   `曲目[档]` 是「这一档有哪些链接」；`名字[链接]` 是「这个链接叫什么」——
  //   同一个链接可能同时挂在两档，名字该共用一份。
  const 空存储 = () => ({
    版本: LS_版本,
    音量: 音量默认,
    静音: false,
    模式: 模式默认,
    球位: { x: null, y: null },
    球图: '',              // '' = 用内置那张
    曲目: {},
    名字: {},
    钉死: [],
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
    out.音量 = 夹(o.音量, 0, 1, 音量默认);
    out.静音 = !!o.静音;
    // 🔴 模式: 只认表里那四个字面量。写歪了（手改存档 / 旧版本）就回默认，
    //    绝不让一个不认识的字符串流进 `步进`。
    out.模式 = (模式表.indexOf(o.模式) >= 0) ? o.模式 : 模式默认;
    if (typeof o.球图 === 'string' && o.球图.length < 图大小上限 * 2) out.球图 = o.球图;
    if (o.球位 && typeof o.球位 === 'object') {
      out.球位.x = o.球位.x === null || o.球位.x === undefined ? null : 夹(o.球位.x, 0, 1, null);
      out.球位.y = o.球位.y === null || o.球位.y === undefined ? null : 夹(o.球位.y, 0, 1, null);
    }
    if (o.曲目 && typeof o.曲目 === 'object') {
      for (const 档 of 档名表) {
        const a = o.曲目[档];
        if (Array.isArray(a)) out.曲目[档] = a.filter(u => typeof u === 'string' && u.trim()).slice(0, 200);
      }
    }
    if (o.名字 && typeof o.名字 === 'object') {
      let n = 0;
      for (const k of Object.keys(o.名字)) {
        const v = o.名字[k];
        if (typeof v === 'string' && v.trim() && n < 400) { out.名字[k] = v.slice(0, 60); n++; }
      }
    }
    if (Array.isArray(o.钉死)) {
      out.钉死 = o.钉死
        .filter(p => p && typeof p === 'object' && typeof p.曲 === 'string' && p.曲.trim())
        .map(p => ({ 章节: String(p.章节 || ''), 节点: String(p.节点 || ''), 曲: String(p.曲) }))
        .slice(0, 100);
    }
    return out;
  }

  // 写存储 —— 返回**成没成**。图太大时 localStorage 会抛配额错，得让调用方知道。
  function 写存储() {
    // `模式` 有两份: 热路径读的那个变量，和 `存` 里那份（存档的副本）。
    //   落盘前对齐一次，省得哪条路径漏了同步、两边悄悄分家。
    存.模式 = 模式;
    try { localStorage.setItem(LS_KEY, JSON.stringify(存)); return true; }
    catch (_) { return false; }
  }

  let 存 = 读存储();

  // ══ 5. 曲目表 ═════════════════════════════════════════════════════════════
  // 三种音源拼成一张表，**优先级从低到高**（后面的盖前面的）:
  //   内置层（AUDIO_BASE + 文件名）→ 玩家自填（localStorage）→ 外挂层（全局钩子）
  // 「盖」是**追加**不是替换 —— 玩家往里加一首，作者那几首还在。
  function 读外挂层() {
    try {
      const w = 宿主 && 宿主[外挂键];
      return w && typeof w === 'object' ? w : null;
    } catch (_) { return null; }
  }

  const 拼地址 = (名) => (/^https?:\/\//i.test(名) ? 名 : (AUDIO_BASE ? AUDIO_BASE.replace(/\/?$/, '/') + 名 : ''));

  function 取曲库() {
    const 库 = { _外挂钉死: [] };
    for (const 档 of 档名表) 库[档] = [];

    for (const 档 of 档名表) {
      for (const 名 of TRACKS[档] || []) {
        const u = 拼地址(名);
        if (u) 库[档].push(u);
      }
    }
    for (const 档 of 档名表) {
      for (const u of 存.曲目[档] || []) if (u) 库[档].push(u);
    }
    const 外 = 读外挂层();
    if (外) {
      for (const 档 of 档名表) {
        const a = 外.曲目 && 外.曲目[档];
        if (Array.isArray(a)) for (const u of a) if (typeof u === 'string' && u.trim()) 库[档].push(u.trim());
      }
      if (Array.isArray(外.钉死)) for (const p of 外.钉死) if (p && p.曲) 库._外挂钉死.push(p);
    }
    return 库;
  }

  const 可用 = (库, 档) => (库[档] || []).filter(u => !坏曲.has(u));

  function 总曲数(库) {
    库 = 库 || 取曲库();
    let n = 0;
    for (const 档 of 档名表) n += (库[档] || []).length;
    return n;
  }

  // ── 名字 ──────────────────────────────────────────────────────────────────
  const 尾名 = (u) => {
    try { return decodeURIComponent(String(u).split('/').pop().split('?')[0]).slice(0, 60); }
    catch (_) { return String(u).slice(-60); }
  };
  const 网易ID = (u) => {
    const m = /^https?:\/\/music\.163\.com\/song\/media\/outer\/url\?id=(\d+)/.exec(String(u));
    return m ? m[1] : '';
  };
  function 显示名(u) {
    const 名 = 存.名字[u];
    if (名) return 名;
    const id = 网易ID(u);
    if (id) return '网易云 · ' + id;
    return 尾名(u) || '曲目';
  }
  function 来源(u) {
    if (网易ID(u)) return '网易云';
    const m = /\.([a-z0-9]{2,5})$/i.exec(尾名(u));
    return m ? m[1].toUpperCase() : '链接';
  }

  // ══ 6. 选曲 ═══════════════════════════════════════════════════════════════
  function 编正则(s) {
    const t = String(s || '').trim();
    if (!t) return null;
    try { return new RegExp(t); } catch (_) { return null; }
  }

  function 命中钉死(章节, 节点, 库) {
    const 表 = [];
    for (const p of PINNED) if (p && p.曲) 表.push(p);
    for (const p of 存.钉死) if (p && p.曲) 表.push(p);
    for (const p of 库._外挂钉死 || []) if (p && p.曲) 表.push(p);

    for (const p of 表) {
      const rc = p.章节 instanceof RegExp ? p.章节 : 编正则(p.章节);
      if (!rc) continue;
      if (!rc.test(章节)) continue;
      const rn = p.节点 instanceof RegExp ? p.节点 : 编正则(p.节点);
      if (rn && !rn.test(节点)) continue;
      const u = 拼地址(p.曲);
      if (u) return u;
    }
    return null;
  }

  function 取当前线(世界) {
    const 主 = 世界 && 世界.主线;
    if (!主 || typeof 主 !== 'object') return null;
    let 备选 = null;
    for (const k of Object.keys(主)) {
      const v = 主[k];
      if (!v || typeof v !== 'object') continue;
      if (v.状态 !== '进行中') continue;
      if (v.类型 === '主线') return v;
      if (!备选) 备选 = v;
    }
    return 备选;
  }

  let 线要的档 = 默认档;
  let 当前线名 = '';

  // 「哪条线、要哪一档」—— 只读 MVU，不碰曲库。
  //   🔴 单独拎出来是为了修「抬头文字变馊」: 刷界面时要能**重算**这一段，
  //      而不是留着上次那句（真机截图里的「没有正在走的线，且一首能放…」就是馊的）。
  function 路线() {
    let 线 = null;
    try {
      const w = 找宿主();
      if (w && w.Mvu && typeof w.Mvu.getMvuData === 'function') {
        let d = w.Mvu.getMvuData({ type: 'message', message_id: 'latest' });
        let sd = d && d.stat_data;
        if (!sd || !Object.keys(sd).length) {
          d = w.Mvu.getMvuData({ type: 'chat' });
          sd = d && d.stat_data;
        }
        线 = 取当前线(sd && sd.世界);
      }
    } catch (_) { 线 = null; }

    const 章节 = (线 && 线.章节) || '';
    const 节点 = (线 && 线.节点) || '';
    当前线名 = 线 ? '「' + (章节 || '未命名') + '」' + (节点 ? '（' + 节点 + '）' : '') : '';
    const 目标档 = (线 && 档名表.indexOf(线.配乐) >= 0) ? 线.配乐 : 默认档;
    线要的档 = 目标档;
    return {
      线, 章节, 节点, 目标档,
      文: 线 ? '正在走' + 当前线名 + '，档是「' + 目标档 + '」' : '没有正在走的线，落默认档「' + 默认档 + '」',
    };
  }

  function 选曲() {
    const 库 = 取曲库();
    const 路 = 路线();
    const 章节 = 路.章节, 节点 = 路.节点, 目标档 = 路.目标档;

    const 钉 = 命中钉死(章节, 节点, 库);
    if (钉) return { 曲: 钉, 档: null, 目标档, 因: '钉死表命中了' + (当前线名 || '（没有正在走的线也照样命中）') };

    const 池 = 可用(库, 目标档);
    if (!池.length) {
      for (const 别的 of 档名表) {
        const p = 可用(库, 别的);
        if (p.length) {
          return {
            曲: p[Math.floor(Math.random() * p.length)], 档: 别的, 目标档,
            因: 路.文 + '；那一档还空着，从「' + 别的 + '」借了一首',
          };
        }
      }
      return { 曲: null, 档: 目标档, 目标档, 因: 路.文 + '，但一首能放的曲子都还没有' };
    }
    return { 曲: 池[Math.floor(Math.random() * 池.length)], 档: 目标档, 目标档, 因: 路.文 };
  }

  // ══ 7. 音频层 ＋ 播放状态真源 ═════════════════════════════════════════════
  // BGM 用 `HTMLAudioElement` 而不是 Web Audio: 几 MB 的文件能边下边播，
  // 换成 decodeAudioData 得整个下完才出声。
  // 两个 deck 轮流当值 —— 换曲时新的淡入、旧的淡出，就是「交叉」。
  let deck = [null, null];
  let 当前 = 0;
  let 手势已挂 = false;
  let 当前曲 = null;
  let 当前档 = null;
  let 当前因 = '';
  // 播放模式（四种，见 `模式表`）。启动时从存档来，点模式键转圈。
  let 模式 = 存.模式;
  let 同步计时 = null;
  let 已销毁 = false;

  // 🔴 单一真源。`在放` **只由音频事件驱动**（见 造deck），别处一律读它、不自己猜。
  let 在放 = false;
  // 玩家的**意图**: 想放 / 想停。兜底手势只看它 —— 这是 ③ 那个抢跑的根治点。
  let 想放 = false;

  const 坏曲 = new Set();

  function 造deck() {
    const a = new Audio();
    a.preload = 'none';
    a._lvl = 0;
    a.volume = 0;

    // 🔴 状态真源: 这几个事件是**唯一**改 `在放` 的地方。
    //   换曲时 `当前` 会先翻到新 deck，旧 deck 淡出时的 pause 事件必须被挡掉
    //   （`a === deck[当前]` 那道判断），否则旧曲一停界面就以为「没在播」。
    for (const ev of ['play', 'pause', 'playing', 'ended', 'emptied', 'error']) {
      a.addEventListener(ev, () => { if (a === deck[当前]) 同步状态(); });
    }

    a.addEventListener('ended', () => {
      if (a !== deck[当前]) return;
      if (模式 === '单曲循环') { 想放 = true; 落曲(当前曲, 当前档); return; }
      if (模式 === '随机') { 步进(1, true); return; }
      // 顺序 / 列表循环: 走到档尾时 —— 顺序**停**，列表循环回第一首。
      步进(1, true);
    });

    a.addEventListener('error', () => {
      if (a !== deck[当前]) return;
      try { if (a.src) 坏曲.add(a.src); } catch (_) {}
      // 🔴 加载失败换个档再试，但**别再回头选同一首**（已在 `坏曲` 里）。
      步进(1, true);
    });

    return a;
  }

  function 应用音量(d) {
    if (!d) return;
    try { d.volume = Math.max(0, Math.min(1, (d._lvl || 0) * 存.音量 * (存.静音 ? 0 : 1))); } catch (_) {}
  }

  // 用 setInterval 不用 requestAnimationFrame: 后台标签页里 rAF 会整个停掉，
  // 淡出永远走不完，状态就卡在「正在淡出」上了。
  function 淡到(d, 目标, ms, 完了) {
    if (!d) { if (完了) 完了(); return; }
    if (prefersReduced()) { d._lvl = 目标; 应用音量(d); if (完了) 完了(); return; }
    const 起 = d._lvl || 0, t0 = Date.now();
    const timer = setInterval(() => {
      const k = Math.min(1, (Date.now() - t0) / ms);
      d._lvl = 起 + (目标 - 起) * k;
      应用音量(d);
      if (k >= 1) { clearInterval(timer); if (完了) 完了(); }
    }, 30);
  }

  function prefersReduced() {
    try { return !!(宿主.matchMedia && 宿主.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; }
  }

  // 播放被浏览器拒了 —— 挂一次性 pointerdown 兜底重试。
  //   🔴 ③ 这个兜底**绝不许抢跑**: 它挂在文档的**捕获阶段**，手指一按下就先跑，
  //      比按钮自己的 click 还早。原来它无条件 `d.play()` —— 于是「暂停着的时候
  //      点播放键」会变成: 兜底先 play() → click 走进播放键看到「咦在放了」→ pause()
  //      ⇒ 净效果是「点了没反应」。现在**只有确实想放（想放 === true）才补**。
  function 挂手势兜底() {
    if (手势已挂) return;
    const 文档 = 取文档();
    if (!文档 || !文档.addEventListener) return;
    手势已挂 = true;
    const 试 = () => {
      文档.removeEventListener('pointerdown', 试, true);
      手势已挂 = false;
      if (!想放) return;                       // 🔴 意图是「停」就什么都不做
      const d = deck[当前];
      if (d && d.src && d.paused) d.play().catch(() => {});
    };
    文档.addEventListener('pointerdown', 试, true);
  }

  // 唯一的「试着放」入口。放不成就挂手势兜底 —— 没有第二个地方去碰 play()。
  //   🔴 全文件**只有这一处**碰 `play()`**。曾经另有一条旁路: 点球时顺手把暂停的曲子放起来 ——
  //      已经删了，因为它**有害**: 「暂停着的时候点球开面板」会把音乐又放起来，玩家没让你放。
  //      球的那一下点击由 `挂手势兜底`（挂在文档捕获阶段）接手，它按 `想放` 走，不抢跑。
  function 播() {
    const d = deck[当前];
    if (!d || !d.src) return;
    try { const p = d.play(); if (p && p.catch) p.catch(() => 挂手势兜底()); } catch (_) {}
  }

  // 落一首曲子。`换曲` / `步进` / `点某首歌` 最后都走这里。
  function 落曲(u, 档) {
    当前曲 = u; 当前档 = 档 || 当前档;
    想放 = true;
    const 旧 = deck[当前];
    当前 = 1 - 当前;
    const 新 = deck[当前];
    if (!新) return;
    try { 新.src = u; 新.currentTime = 0; 新._lvl = 0; 应用音量(新); } catch (_) {}
    const 开播 = () => {
      try { const p = 新.play(); if (p && p.catch) p.catch(() => 挂手势兜底()); } catch (_) {}
      同步状态();
    };
    if (旧 && 旧.src && !旧.paused) 淡到(旧, 0, FADE_MS, () => { try { 旧.pause(); } catch (_) {} 开播(); 淡到(新, 1, FADE_MS); });
    else { 开播(); 淡到(新, 1, FADE_MS); }
  }

  function 换曲() {
    if (已销毁) return;
    const r = 选曲();
    if (!r.曲) { 当前因 = r.因; 刷新UI(null); return; }
    if (r.曲 === 当前曲) { 当前因 = r.因; 刷新UI(null); return; }
    当前因 = r.因;
    落曲(r.曲, r.档);
    刷新UI(null);
  }

  // ── 步进（上/下一首）──────────────────────────────────────────────────────
  // 🔴 手动 ⏮/⏭ **永远按当前档的顺序走**（可预测），**绝不跨档** —— 走到档尾
  //    就回到本档第一首。驾驶员 2026-09-19 明确: 「自动重新在这个档里播放」。
  //    「到不了其他曲目」靠**点曲目行**解决（点开别的档、点那首歌）。
  // 🔴 `自动` = 是不是「播完了自己往下走」:
  //    - 顺序模式 + 自动 + 已经是本档最后一首 ⇒ **停下**（不回头）
  //    - 随机模式 + 自动 ⇒ 随机挑一首（不等于当前那首）
  //    手动点 ⏭ 在随机模式下**依然是顺序下一首** —— 玩家按了「下一首」，
  //    期待的是「这一档的下一首」，不是「换一首别的」。
  function 步进(方向, 自动) {
    if (已销毁) return;
    const 库 = 取曲库();
    const 档 = (当前档 && 可用(库, 当前档).length) ? 当前档 : 默认档;
    const 池 = 可用(库, 档);
    if (!池.length) { 当前因 = '这一首所在的档现在一首能放的都没有了'; 刷新UI(null); return; }

    const i = 池.indexOf(当前曲);
    let j;

    if (自动 && 模式 === '随机') {
      if (池.length === 1) j = 0;
      else { j = i; let 转 = 0; while (j === i && 转++ < 50) j = Math.floor(Math.random() * 池.length); }
    } else if (自动 && 模式 === '顺序') {
      j = (i < 0) ? 0 : i + 方向;
      if (j >= 池.length || j < 0) {
        // 顺序模式: 本档放完了 —— 停下，明确说一声，别静默
        想放 = false;
        try { const d = deck[当前]; if (d) d.pause(); } catch (_) {}
        当前因 = '「' + 档 + '」这一档放完了（顺序播放，放完就停）';
        刷新UI(null);
        return;
      }
    } else {
      j = (i < 0) ? 0 : (i + 方向 + 池.length) % 池.length;
    }

    const u = 池[j];
    if (u === 当前曲) {
      // 这一档只有一首 —— 别装作换了（那会让玩家以为按钮坏了）
      当前因 = '「' + 档 + '」这一档只有这一首';
      刷新UI(null);
      return;
    }
    当前档 = 档;
    落曲(u, 档);
    当前因 = '「' + 档 + '」档里' + (方向 > 0 ? '下一首' : '上一首');
    刷新UI(null);
  }
  const 上一首 = () => 步进(-1, false);
  const 下一首 = () => 步进(1, false);

  // ── 播放键（中间那个）────────────────────────────────────────────────────
  //   🔴 ② 一个键管四种情况。v0.0.2 开头是 `if (!d || !d.src) return` ——
  //      还没载入曲子时点它**什么都不做**，真机现象就是「非得先点 ⏮/⏭ 才有声音」。
  function 播放键() {
    const d = deck[当前];
    // (a) 还没载入任何曲子 ⇒ 挑一首放
    if (!d || !d.src) { 放一首(); return; }
    // (b) 上一首已经播完了 ⇒ 从头重放（否则 play() 会立刻又 ended）
    try {
      if (d.ended) { 想放 = true; 落曲(当前曲, 当前档); 刷新UI(null); return; }
    } catch (_) {}
    // (c) 暂停中 ⇒ 续播
    if (d.paused) { 想放 = true; 播(); }
    // (d) 正在放 ⇒ 暂停。🔴 这一支**只许 pause()，不许先试着 play() 一下** ——
    //     先 play() 再 pause() 的净效果就是「点了没反应」（③ 那个抢跑的病根正是这个形状）
    else { 想放 = false; try { d.pause(); } catch (_) {} }
    同步状态();
    刷新UI(null);
  }

  // 没有已载入的曲子时，「放一首」= 走正常选曲；选不出来再从当前档挑第一首
  function 放一首() {
    const r = 选曲();
    if (r.曲) { 当前因 = r.因; 落曲(r.曲, r.档); 刷新UI(null); return; }
    const 库 = 取曲库();
    for (const 档 of 档名表) {
      const p = 可用(库, 档);
      if (p.length) { 当前档 = 档; 当前因 = '没有正在走的线，落默认档；「' + 档 + '」有曲子'; 落曲(p[0], 档); 刷新UI(null); return; }
    }
    当前因 = '一首能放的曲子都没有 —— 把链接粘到上面的框里';
    刷新UI(null);
  }

  // ── 状态同步（单一真源的下游）────────────────────────────────────────────
  function 同步状态() {
    const d = deck[当前];
    const 新 = !!(d && d.src && !d.paused);
    if (新 !== 在放) {
      在放 = 新;
      try { if (球 && 球.classList) 球.classList.toggle('ym-playing', 在放); } catch (_) {}
      try { if (窗 && 窗.classList) 窗.classList.toggle('ym-playing', 在放); } catch (_) {}
    }
    刷播放键();
    刷抬头();
  }

  // ══ 8. 变量同步 ═══════════════════════════════════════════════════════════
  const 变量事件 = ['mag_variable_initialized', 'mag_variable_update_ended', 'mag_variable_updated'];

  function 同步() {
    if (已销毁) return;
    if (同步计时) clearTimeout(同步计时);
    同步计时 = setTimeout(() => { 同步计时 = null; 换曲(); }, 同步去抖);
  }

  let 已订阅 = [];
  function 订阅变量() {
    const w = 找宿主();
    const on = (() => { try { return typeof w.eventOn === 'function' ? w.eventOn : (typeof eventOn === 'function' ? eventOn : null); } catch (_) { return null; } })();
    if (!on) return false;
    for (const e of 变量事件) {
      try { on(e, 同步); 已订阅.push(e); } catch (_) {}
    }
    return 已订阅.length > 0;
  }

  // ══ 9. UI ═════════════════════════════════════════════════════════════════
  let 球 = null, 窗 = null, 面板 = null, 列表 = null, 筹码 = null;
  let 筹码表 = [];
  let 手选档 = null;
  let 收起中 = false;
  let 关计时 = null;
  let 视口计时 = null;

  const 图标 = (内) => '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + 内 + '</svg>';
  const 图 = {
    音符: 图标('<path d="M9 17.5V6.4l10-2.1v11.2"/><circle cx="6.4" cy="17.6" r="2.6"/><circle cx="16.4" cy="15.5" r="2.6"/>'),
    上一首: 图标('<path d="M20 5.8 9.4 12 20 18.2Z"/><path d="M5 5.8v12.4"/>'),
    下一首: 图标('<path d="M4 5.8 14.6 12 4 18.2Z"/><path d="M19 5.8v12.4"/>'),
    播放: 图标('<path d="M8 5.4 19 12 8 18.6Z"/>'),
    暂停: 图标('<path d="M9.5 5.6v12.8M14.5 5.6v12.8"/>'),
    有声: 图标('<path d="M4 9.6h3.6L12 6.2v11.6L7.6 14.4H4Z"/><path d="M15.7 9.5a3.6 3.6 0 0 1 0 5"/><path d="M18.4 7a7.2 7.2 0 0 1 0 10"/>'),
    静音: 图标('<path d="M4 9.6h3.6L12 6.2v11.6L7.6 14.4H4Z"/><path d="m16.3 10.1 4.1 4.1M20.4 10.1l-4.1 4.1"/>'),
    展开: 图标('<path d="m7 10 5 5 5-5"/>'),
    关闭: 图标('<path d="M6.6 6.6 17.4 17.4M17.4 6.6 6.6 17.4"/>'),
    // 四种播放模式（手写几何，24×24 网格）
    顺序: 图标('<path d="M4 6.5h9M4 12h9M4 17.5h9"/><path d="m16 9.5 3 2.5-3 2.5"/>'),
    列表循环: 图标('<path d="M17 3 20.5 6.5 17 10"/><path d="M20.5 6.5H7A4.5 4.5 0 0 0 2.5 11"/><path d="M7 21 3.5 17.5 7 14"/><path d="M3.5 17.5H17a4.5 4.5 0 0 0 4.5-4.5"/>'),
    单曲循环: 图标('<path d="M17 3 20.5 6.5 17 10"/><path d="M20.5 6.5H7A4.5 4.5 0 0 0 2.5 11"/><path d="M7 21 3.5 17.5 7 14"/><path d="M3.5 17.5H17a4.5 4.5 0 0 0 4.5-4.5"/><path d="m11.2 10.6 1.4-.8v4.6"/>'),
    随机: 图标('<path d="M4 7h3c1.4 0 2.7.7 3.4 1.9l3.2 5.2c.7 1.2 2 1.9 3.4 1.9h3"/><path d="M4 17h3c1.4 0 2.7-.7 3.4-1.9l3.2-5.2c.7-1.2 2-1.9 3.4-1.9h3"/><path d="m17.5 5 2.5 2-2.5 2"/><path d="m17.5 15 2.5 2-2.5 2"/>'),
    上传: 图标('<path d="M12 15.6V4.4"/><path d="m7.6 8.8 4.4-4.4 4.4 4.4"/><path d="M4.6 15v3.2a2 2 0 0 0 2 2h10.8a2 2 0 0 0 2-2V15"/>'),
    等化: '<svg class="ym-eq" viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" focusable="false">' +
      '<rect x="4.5" y="7" width="3.2" height="10" rx="1.4"/><rect x="10.4" y="4.5" width="3.2" height="15" rx="1.4"/><rect x="16.3" y="8.5" width="3.2" height="7" rx="1.4"/></svg>',
  };
  const 模式图标 = { 顺序: 图.顺序, 列表循环: 图.列表循环, 单曲循环: 图.单曲循环, 随机: 图.随机 };

  const 样式 = `
.ym-ball,.ym-win{
  --ym-bg:rgba(19,21,28,.96); --ym-panel:rgba(255,255,255,.06);
  --ym-line:rgba(255,255,255,.13); --ym-line-2:rgba(255,255,255,.22);
  --ym-fg:#e9e7e1; --ym-fg-2:#b3afa4; --ym-fg-3:#8b877d;
  --ym-gold:#c9b477; --ym-gold-bg:rgba(201,180,119,.16); --ym-danger:#e0857f;
  --ym-cyan:#7fd4d4; --ym-violet:#b48cd8;
  --ym-ease:cubic-bezier(.2,.8,.2,1); --ym-dur:180ms}
@supports (backdrop-filter:blur(4px)) or (-webkit-backdrop-filter:blur(4px)){
  .ym-ball{background:rgba(19,21,28,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
  .ym-win{background:rgba(19,21,28,.87);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}}

/* ── 悬浮球 ─────────────────────────────────────────────────────────────── */
.ym-ball{position:fixed;z-index:2147483000;width:var(--ym-ball-size,52px);height:var(--ym-ball-size,52px);
  padding:0;margin:0;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:var(--ym-bg);border:1px solid var(--ym-line-2);color:var(--ym-fg-2);
  cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;overflow:visible;
  box-shadow:0 4px 16px rgba(0,0,0,.42);
  transition:transform var(--ym-dur) var(--ym-ease),opacity var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-ball:hover{transform:scale(1.06)}
.ym-ball:active{transform:scale(.94)}
.ym-ball:focus-visible{outline:2px solid var(--ym-gold);outline-offset:2px}
.ym-ball.ym-idle{opacity:.42}
.ym-ball.ym-playing{color:var(--ym-gold)}
/* ⑦ 外圈金色光环绕圈转 —— 播放时转，暂停时停住。纯 CSS，不占 JS。 */
.ym-halo{position:absolute;inset:-3px;border-radius:50%;pointer-events:none;opacity:0;
  background:conic-gradient(from 0deg,transparent 0 52%,var(--ym-gold) 76%,var(--ym-cyan) 90%,transparent 100%);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 3px));
  mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 3px));
  transition:opacity 240ms var(--ym-ease)}
.ym-ball.ym-playing .ym-halo{opacity:1;animation:ym-spin 2.6s linear infinite}
@keyframes ym-spin{to{transform:rotate(360deg)}}
/* ⑦ 球里那张图（玩家自己的 jpg / gif / webp）—— 裁成圆形 */
.ym-pic{position:absolute;inset:2px;width:calc(100% - 4px);height:calc(100% - 4px);
  border-radius:50%;object-fit:cover;display:none;
  transition:filter 260ms var(--ym-ease)}
.ym-ball.ym-haspic .ym-pic{display:block}
.ym-ball.ym-haspic .ym-note,.ym-ball.ym-haspic .ym-eq{display:none}
/* 暂停/停止时压暗 —— gif 停不下来（浏览器限制），压暗是唯一能让「已暂停」看得出来的一招 */
.ym-ball.ym-haspic:not(.ym-playing) .ym-pic{filter:brightness(.5) saturate(.5)}
.ym-eq{display:none}
.ym-ball.ym-playing .ym-eq{display:block}
.ym-ball.ym-playing .ym-note{display:none}
.ym-ball.ym-haspic .ym-eq,.ym-ball.ym-haspic .ym-note{display:none!important}
.ym-eq rect{transform-box:fill-box;transform-origin:bottom;animation:ym-eq .9s ease-in-out infinite}
.ym-eq rect:nth-child(2){animation-delay:.15s}
.ym-eq rect:nth-child(3){animation-delay:.3s}
@keyframes ym-eq{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}

/* ── 浮窗 ───────────────────────────────────────────────────────────────── */
.ym-win{position:fixed;z-index:2147483001;width:${面板宽}px;box-sizing:border-box;
  border-radius:14px;background:var(--ym-bg);border:1px solid var(--ym-line-2);
  color:var(--ym-fg);font:13px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;
  text-align:left;box-shadow:0 12px 36px rgba(0,0,0,.5);overflow:hidden;
  opacity:0;transform:translateY(6px) scale(.985);
  transition:opacity var(--ym-dur) var(--ym-ease),transform var(--ym-dur) var(--ym-ease)}
.ym-win.ym-open{opacity:1;transform:none}
.ym-win[hidden]{display:none}
.ym-head{position:relative;display:flex;align-items:center;gap:9px;padding:10px 9px 9px 11px;
  background-color:rgba(255,255,255,.026);
  background-image:var(--ym-head-img,none);background-size:cover;background-position:center;
  border-bottom:1px solid var(--ym-line)}
/* ⑧ 抬头条顶上的渐变流光 —— 播放时横向流动，暂停时静止变暗 */
.ym-head::before{content:'';position:absolute;left:0;right:0;top:0;height:2px;pointer-events:none;
  background:linear-gradient(90deg,var(--ym-gold),var(--ym-cyan),var(--ym-violet),var(--ym-gold));
  background-size:200% 100%;opacity:.4;
  transition:opacity 260ms var(--ym-ease)}
.ym-win.ym-playing .ym-head::before{opacity:1;animation:ym-flow 3.4s linear infinite}
@keyframes ym-flow{to{background-position:-200% 0}}
.ym-mark{flex:0 0 auto;width:27px;height:27px;border-radius:8px;display:flex;align-items:center;
  justify-content:center;background:var(--ym-gold-bg);color:var(--ym-gold)}
.ym-htxt{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}
/* ⑨ 抬头两行: 外面这层裁掉溢出，里面那层被 JS 推着走 */
.ym-now,.ym-sub{position:relative;overflow:hidden;white-space:nowrap}
.ym-now{font-size:13px;font-weight:600;line-height:1.35;color:var(--ym-fg)}
.ym-sub{font-size:11px;line-height:1.35;color:var(--ym-fg-3)}
.ym-mq{display:inline-block;white-space:nowrap;will-change:transform}
@keyframes ym-marq{
  0%,10%{transform:translateX(0)}
  86%,100%{transform:translateX(var(--ym-shift,0px))}}
.ym-ic{flex:0 0 auto;width:26px;height:26px;padding:0;border:0;border-radius:7px;background:none;
  color:var(--ym-fg-3);cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-ic:hover{background:var(--ym-panel);color:var(--ym-fg)}
.ym-ic:focus-visible{outline:2px solid var(--ym-gold);outline-offset:1px}
.ym-body{padding:11px 12px 12px}
.ym-win.ym-collapsed .ym-body{display:none}
.ym-row{display:flex;align-items:center;gap:6px}
.ym-btn{flex:0 0 auto;height:36px;min-width:36px;padding:0 10px;border-radius:9px;cursor:pointer;
  display:inline-flex;align-items:center;justify-content:center;gap:6px;
  background:var(--ym-panel);border:1px solid var(--ym-line);color:var(--ym-fg-2);
  font:13px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease),
    border-color var(--ym-dur) var(--ym-ease),transform 90ms var(--ym-ease)}
.ym-btn:hover{background:rgba(255,255,255,.12);color:var(--ym-fg)}
.ym-btn:active{transform:scale(.93)}
.ym-btn:focus-visible{outline:2px solid var(--ym-gold);outline-offset:2px}
.ym-btn[disabled]{opacity:.4;cursor:default}
/* 传送行: 5 个按钮 + 音量条挤一行。40px 是触控热区的下限附近，再小就点不准了。 */
.ym-transport .ym-btn{min-width:40px;padding:0 5px}
.ym-btn.ym-main{width:44px;height:44px;min-width:44px;border-radius:50%;padding:0;
  background:var(--ym-gold);border-color:var(--ym-gold);color:#191a14}
.ym-btn.ym-main:hover{background:#d9c68d;color:#191a14}
.ym-btn.ym-on{background:var(--ym-gold-bg);border-color:rgba(201,180,119,.55);color:var(--ym-gold)}
.ym-range{flex:1 1 auto;min-width:0;height:24px;accent-color:var(--ym-gold)}
.ym-tab{width:100%;margin-top:11px;height:34px;padding:0 10px;border-radius:9px;cursor:pointer;
  display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--ym-line);
  color:var(--ym-fg-2);font:12px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-tab:hover{background:var(--ym-panel);color:var(--ym-fg)}
.ym-tab:focus-visible{outline:2px solid var(--ym-gold);outline-offset:2px}
.ym-count{color:var(--ym-fg-3)}
.ym-chev{margin-left:auto;display:flex;transition:transform var(--ym-dur) var(--ym-ease)}
.ym-tab[aria-expanded=true] .ym-chev{transform:rotate(180deg)}
.ym-pane{margin-top:10px;border-top:1px solid var(--ym-line);padding-top:10px}
.ym-pane[hidden]{display:none}
/* ⑩ 抽屉展开淡入上移 —— 光切 hidden 是没有过渡的（那是离散属性） */
.ym-pane.ym-anim{animation:ym-pane-in 200ms var(--ym-ease)}
@keyframes ym-pane-in{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}
.ym-chips{display:flex;flex-wrap:wrap;gap:6px}
.ym-chip{height:30px;padding:0 10px;border-radius:999px;cursor:pointer;
  display:inline-flex;align-items:center;gap:5px;
  background:none;border:1px solid var(--ym-line);color:var(--ym-fg-3);
  font:12px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease),
    border-color var(--ym-dur) var(--ym-ease),transform 90ms var(--ym-ease)}
.ym-chip:hover{color:var(--ym-fg);border-color:var(--ym-line-2)}
.ym-chip:active{transform:scale(.95)}
.ym-chip:focus-visible{outline:2px solid var(--ym-gold);outline-offset:2px}
.ym-chip[aria-pressed=true]{background:var(--ym-gold-bg);border-color:rgba(201,180,119,.6);color:var(--ym-gold)}
.ym-chip.ym-cur{box-shadow:inset 0 -2px 0 var(--ym-gold)}
.ym-chip em{font-style:normal;font-size:10px;color:var(--ym-fg-3)}
.ym-chip[aria-pressed=true] em{color:var(--ym-gold)}
.ym-field{margin-top:9px}
.ym-in,.ym-ta{width:100%;box-sizing:border-box;padding:8px 9px;border-radius:9px;
  background:rgba(0,0,0,.3);border:1px solid var(--ym-line);color:var(--ym-fg);
  font:12px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:border-color var(--ym-dur) var(--ym-ease)}
.ym-in{height:34px}
.ym-ta{height:74px;margin-top:6px;resize:vertical;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}
.ym-in:focus,.ym-ta:focus{outline:none;border-color:rgba(201,180,119,.6)}
.ym-in::placeholder,.ym-ta::placeholder{color:#6f6b62}
.ym-msg{flex:1 1 auto;min-width:0;font-size:11px;line-height:1.4;color:var(--ym-fg-3)}
.ym-msg.ym-bad{color:var(--ym-danger)}
.ym-adv{margin-top:9px;font-size:11px;color:var(--ym-fg-3)}
.ym-adv summary{cursor:pointer;padding:3px 0;outline-offset:2px}
.ym-adv summary:focus-visible{outline:2px solid var(--ym-gold)}
.ym-list{margin-top:11px;max-height:230px;overflow:auto;overscroll-behavior:contain}
.ym-sec{display:flex;align-items:center;gap:6px;margin:0;padding:5px 6px;border-radius:8px;
  font-size:11px;color:var(--ym-fg-3);letter-spacing:.04em;width:100%;box-sizing:border-box;
  background:none;border:0;cursor:pointer;text-align:left;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-sec:hover{background:var(--ym-panel);color:var(--ym-fg-2)}
.ym-sec:focus-visible{outline:2px solid var(--ym-gold);outline-offset:-2px}
.ym-sec[aria-expanded=true]{color:var(--ym-gold)}
.ym-sec span{color:var(--ym-fg-3)}
.ym-sec em{font-style:normal;margin-left:auto;font-size:10px;color:var(--ym-gold);
  border:1px solid rgba(201,180,119,.45);border-radius:999px;padding:1px 6px}
/* 折叠箭头: 收起的朝右、展开的朝下 */
.ym-caret{flex:0 0 auto;display:flex;transition:transform var(--ym-dur) var(--ym-ease)}
.ym-sec[aria-expanded=false] .ym-caret{transform:rotate(-90deg)}
.ym-body-list{padding:0 0 2px 4px}
.ym-tr{display:flex;align-items:center;gap:5px;padding:0;border-radius:8px;
  transition:background var(--ym-dur) var(--ym-ease),transform 110ms var(--ym-ease)}
.ym-tr:hover{background:var(--ym-panel);transform:translateX(2px)}
.ym-tr.ym-now{background:var(--ym-gold-bg);box-shadow:inset 2px 0 0 var(--ym-gold)}
/* ⑥ 曲目行整行可点 = 一个原生 button（不是 div 假按钮）。
   删除键是它的**兄弟**而不是子节点 —— 按钮套按钮是非法 HTML。 */
.ym-pick{flex:1 1 auto;min-width:0;display:flex;align-items:center;gap:7px;
  padding:5px 6px;background:none;border:0;border-radius:8px;cursor:pointer;text-align:left;
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:color var(--ym-dur) var(--ym-ease)}
.ym-pick:focus-visible{outline:2px solid var(--ym-gold);outline-offset:-2px}
.ym-pick .ym-nm{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-size:12px;color:var(--ym-fg-2)}
.ym-tr.ym-now .ym-nm{color:var(--ym-fg)}
.ym-pick .ym-src{flex:0 0 auto;font-size:10px;color:var(--ym-fg-3)}
.ym-x{flex:0 0 auto;width:24px;height:24px;padding:0;border:0;border-radius:6px;background:none;
  color:var(--ym-fg-3);cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-x:hover{background:rgba(224,133,127,.15);color:var(--ym-danger)}
.ym-x:focus-visible{outline:2px solid var(--ym-gold);outline-offset:1px}
.ym-empty{padding:3px 0 6px 6px;font-size:11px;line-height:1.5;color:var(--ym-fg-3)}
@media (prefers-reduced-motion: reduce){
  .ym-ball,.ym-win,.ym-btn,.ym-ic,.ym-tab,.ym-chip,.ym-x,.ym-chev,.ym-tr,.ym-pic,.ym-halo{transition-duration:1ms}
  .ym-ball.ym-playing .ym-halo{animation:none;opacity:.85}
  .ym-win.ym-playing .ym-head::before{animation:none}
  .ym-eq rect{animation:none;transform:none}
  .ym-pane.ym-anim{animation:none}
  .ym-mq{animation:none!important}}
`;

  function 注入样式(文档) {
    if (文档.getElementById('ym-style')) return;
    const s = 文档.createElement('style');
    s.id = 'ym-style';
    s.textContent = 样式;
    (文档.head || 文档.documentElement).appendChild(s);
  }

  // ── 球的位置 ──────────────────────────────────────────────────────────────
  function 定位球() {
    if (!球) return;
    const { x, y } = 存.球位;
    if (x === null || y === null) { 球.style.right = '18px'; 球.style.bottom = '88px'; 球.style.left = ''; 球.style.top = ''; return; }
    球.style.left = (x * 100).toFixed(2) + '%';
    球.style.top = (y * 100).toFixed(2) + '%';
    球.style.right = ''; 球.style.bottom = '';
  }

  function 夹球() {
    if (!球) return;
    const { x, y } = 存.球位;
    if (x === null || y === null) return;
    const v = 视口();
    const 半 = 球尺寸 / 2;
    const left = Math.min(Math.max(0, x * v.w - 半), Math.max(0, v.w - 球尺寸));
    const top = Math.min(Math.max(0, y * v.h - 半), Math.max(0, v.h - 球尺寸));
    球.style.left = Math.round(left) + 'px'; 球.style.top = Math.round(top) + 'px';
    球.style.right = ''; 球.style.bottom = '';
  }

  function 定位窗() {
    if (!窗 || !球) return;
    const v = 视口();
    const r = 球.getBoundingClientRect();
    const 宽 = 窗.offsetWidth || 面板宽;
    const 高 = 窗.offsetHeight || 220;
    let left = r.left + r.width / 2 - 宽 / 2;
    let top = r.top - 高 - 10;
    if (top < v.y + 8) top = Math.min(v.y + v.h - 高 - 8, r.bottom + 10);
    left = Math.max(v.x + 8, Math.min(v.x + v.w - 宽 - 8, left));
    窗.style.left = Math.round(left) + 'px';
    窗.style.top = Math.round(Math.max(v.y + 8, top)) + 'px';
    窗.style.right = ''; 窗.style.bottom = '';
  }

  function 开窗() {
    if (!窗) return;
    if (关计时) { clearTimeout(关计时); 关计时 = null; }
    窗.hidden = false;
    定位窗();
    void 窗.offsetWidth;
    窗.classList.add('ym-open');
    if (球 && 球.setAttribute) 球.setAttribute('aria-expanded', 'true');
    刷新UI(null);
  }

  function 关窗(还焦点) {
    if (!窗 || 窗.hidden) return;
    const 文档 = 取文档();
    let 焦点在里面 = false;
    try { 焦点在里面 = !!(文档 && 文档.activeElement && 窗.contains && 窗.contains(文档.activeElement)); } catch (_) {}
    窗.classList.remove('ym-open');
    if (球 && 球.setAttribute) 球.setAttribute('aria-expanded', 'false');
    const 等 = prefersReduced() ? 0 : 动效_开合;
    关计时 = setTimeout(() => { 关计时 = null; if (窗) 窗.hidden = true; }, 等);
    if (还焦点 && 焦点在里面 && 球 && typeof 球.focus === 'function') { try { 球.focus(); } catch (_) {} }
  }

  function 收起(到) {
    if (!窗) return;
    收起中 = !!到;
    窗.classList.toggle('ym-collapsed', 收起中);
    const b = 窗.querySelector('[data-ym=collapse]');
    if (b && b.setAttribute) {
      b.setAttribute('aria-expanded', String(!收起中));
      b.setAttribute('aria-label', 收起中 ? '展开面板' : '收起面板');
    }
    if (!收起中) 定位窗();
  }

  function 说(el, 文, 坏) {
    if (!el) return;
    el.textContent = 文;
    if (el.classList && el.classList.toggle) el.classList.toggle('ym-bad', !!坏);
  }

  function 正在输入(el) {
    try { return 取文档().activeElement === el; } catch (_) { return false; }
  }

  const 转义 = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ── ⑨ 抬头滚动（单方向: 一圈到底 → 停一下 → 重来）─────────────────────────
  //   放得下就**不滚** —— 别没事乱滚。速度按「超出多少像素」算，保证匀速。
  function 走马灯(外, 内, 文) {
    if (!外 || !内) return;
    if (内.textContent !== 文) 内.textContent = 文 || '';
    try {
      if (内.style && 内.style.removeProperty) 内.style.removeProperty('--ym-shift');
      if (内.style) 内.style.animation = 'none';
      if (prefersReduced()) return;
      const 外宽 = 外.clientWidth || 0, 内宽 = 内.scrollWidth || 0;
      const 超 = 内宽 - 外宽;
      if (!外宽 || 超 <= 3) return;                 // 放得下 / 量不到 —— 不滚
      const 秒 = Math.max(滚动最少秒, (超 + 8) / 滚动速度);
      if (内.style && 内.style.setProperty) 内.style.setProperty('--ym-shift', -(超 + 8) + 'px');
      if (内.style) 内.style.animation = 'ym-marq ' + 秒.toFixed(1) + 's linear infinite';
    } catch (_) {}
  }

  function 刷播放键() {
    if (!窗) return;
    const pb = 窗.querySelector('[data-ym=play]');
    if (pb) {
      pb.innerHTML = 在放 ? 图.暂停 : 图.播放;
      if (pb.setAttribute) pb.setAttribute('aria-label', 在放 ? '暂停' : '播放');
    }
    const mb = 窗.querySelector('[data-ym=mute]');
    if (mb) {
      mb.innerHTML = 存.静音 ? 图.静音 : 图.有声;
      if (mb.classList && mb.classList.toggle) mb.classList.toggle('ym-on', !!存.静音);
      if (mb.setAttribute) {
        mb.setAttribute('aria-pressed', String(!!存.静音));
        mb.setAttribute('aria-label', 存.静音 ? '取消静音' : '静音');
      }
    }
    const ob = 窗.querySelector('[data-ym=mode]');
    if (ob) {
      ob.innerHTML = 模式图标[模式] || 图.顺序;
      if (ob.setAttribute) {
        ob.setAttribute('aria-label', '播放模式：' + 模式 + '（点一下换下一种）');
        ob.setAttribute('title', '播放模式：' + 模式);
      }
      if (ob.classList && ob.classList.toggle) ob.classList.toggle('ym-on', 模式 !== '顺序');
    }
  }

  function 刷抬头() {
    if (!窗) return;
    const 态 = 当前曲 ? ((在放 ? '正在放 · ' : '已暂停 · ') + 显示名(当前曲)) : '待命';
    走马灯(窗.querySelector('[data-ym=now]'), 窗.querySelector('[data-ym=nowin]'), 态);
    走马灯(窗.querySelector('[data-ym=info]'), 窗.querySelector('[data-ym=infoin]'), 当前因 || '待命');
  }

  // ⑪ 理由**重算** —— 治「抬头副行变馊」。
  //   真机截图里那句「没有正在走的线，且一首能放…」是**过期文本**: 理由只在选曲成功
  //   那一下写一次，之后加歌 / 删歌 / 切档 / 换模式都不重算，就一直挂着。
  function 重算理由(库) {
    const 路 = 路线();
    当前因 = 路.文 + (总曲数(库 || 取曲库()) ? '' : '，但一首能放的曲子都没有');
  }

  // 🔴 两个入口分清楚，别互相踩:
  //   `刷新UI({因})`  —— 刚才选过曲，用**那个**理由（它带着「从哪档借的」这层信息）
  //   `刷新UI({重算:true})` —— 数据变了（加歌 / 删歌 / 切档 / 换模式），重算理由
  //   `刷新UI(null)` —— 只重画面，理由原样留着（比如刚按了暂停）
  //   ⚠ 踩过的坑: 一开始写成「结果为空就重算」—— 于是 `步进` 刚写好的
  //     「这一档放完了」在下一行 `刷新UI(null)` 里被当场抹掉。
  function 刷新UI(结果) {
    if (结果) {
      if (结果.因) 当前因 = 结果.因;
      else if (结果.重算) 重算理由();
    }
    if (!窗) return;
    const 库 = 取曲库();

    const vol = 窗.querySelector('[data-ym=vol]');
    if (vol && 正在输入(vol) !== true) vol.value = String(Math.round(存.音量 * 100));

    const cnt = 窗.querySelector('[data-ym=count]');
    if (cnt) { const n = 总曲数(库); cnt.textContent = n ? ' · ' + n : ''; }

    const addto = 窗.querySelector('[data-ym=addto]');
    if (addto) addto.textContent = 手选档 || 线要的档 || 默认档;

    if (球 && 球.classList) {
      球.classList.toggle('ym-idle', !当前曲);
      // 🔴 在放/暂停这类**状态类**由 同步状态() 统一管（单一真源），这里不碰
    }
    刷播放键();
    刷抬头();
    刷筹码(库);
    渲染面板(库);
  }

  // ── 六个档的 chip ─────────────────────────────────────────────────────────
  //   点 chip = **切到这一档**（既看它的歌单，加歌也加进它）—— v0.0.2 它只管「加进哪档」，
  //   和「看哪档」是两个概念，会打架。
  function 建筹码() {
    if (!筹码) return;
    const 文档 = 取文档();
    筹码.innerHTML = '';
    筹码表 = [];
    for (const 档 of 档名表) {
      const b = 文档.createElement('button');
      b.type = 'button';
      b.className = 'ym-chip';
      b.setAttribute('data-ym', 'pick');
      b.setAttribute('data-档', 档);
      b.setAttribute('aria-pressed', 'false');
      const t = 文档.createElement('span');
      t.textContent = 档;
      b.appendChild(t);
      const e = 文档.createElement('em');
      e.textContent = '0';
      b.appendChild(e);
      筹码.appendChild(b);
      筹码表.push({ 档, 按钮: b, 数: e });
    }
  }

  function 刷筹码(库) {
    if (!筹码表.length) return;
    库 = 库 || 取曲库();
    const 选中 = 手选档 || 线要的档 || 默认档;
    for (const c of 筹码表) {
      const n = (库[c.档] || []).length;
      if (c.数) c.数.textContent = String(n);
      if (c.按钮.setAttribute) {
        c.按钮.setAttribute('aria-pressed', String(c.档 === 选中));
        c.按钮.setAttribute('title', c.档 === 线要的档 ? '当前这条线要的是这一档' : '');
      }
      if (c.按钮.classList && c.按钮.classList.toggle) c.按钮.classList.toggle('ym-cur', c.档 === 线要的档);
    }
  }

  // ── ⑤⑥ 曲目列表: 六档一次只展开一档 ＋ 每行可点 ───────────────────────────
  function 渲染面板(库) {
    if (!列表 || !面板 || 面板.hidden) return;
    库 = 库 || 取曲库();
    const 选中 = 手选档 || 线要的档 || 默认档;
    const 段 = [];

    if (存.钉死.length) {
      段.push('<div class="ym-sec" style="cursor:default">钉死 <span>' + 存.钉死.length + '</span></div>');
      for (let i = 0; i < 存.钉死.length; i++) {
        const p = 存.钉死[i];
        const 描述 = (p.章节 || '(空)') + (p.节点 ? ' · ' + p.节点 : '') + ' → ' + 显示名(p.曲);
        段.push('<div class="ym-tr"><span class="ym-nm" style="flex:1 1 auto;min-width:0;overflow:hidden;' +
          'text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:var(--ym-fg-2);padding:5px 6px" ' +
          'title="' + 转义(描述) + '">' + 转义(描述) + '</span>' +
          '<button type="button" class="ym-x" data-ym=delpin data-i="' + i + '" aria-label="删掉这条钉死">' + 图.关闭 + '</button></div>');
      }
    }

    for (const 档 of 档名表) {
      const 池 = 库[档] || [];
      const 是选中 = (档 === 选中);
      段.push('<button type="button" class="ym-sec" data-ym=pick data-档="' + 转义(档) + '" ' +
        'aria-expanded="' + String(是选中) + '">' +
        '<span class="ym-caret" aria-hidden="true">' + 图.展开 + '</span>' +
        转义(档) + ' <span>' + 池.length + '</span>' +
        (档 === 线要的档 ? '<em>当前线</em>' : '') + '</button>');

      if (!是选中) continue;                 // 🔴 只展开选中的那一档

      if (!池.length) {
        段.push('<div class="ym-empty">这一档还空着 —— 把链接粘到上面，点「加进「' + 转义(档) + '」」。</div>');
        continue;
      }
      const 玩家 = 存.曲目[档] || [];
      段.push('<div class="ym-body-list">');
      for (const u of 池) {
        const 在放这首 = (u === 当前曲);
        段.push('<div class="ym-tr' + (在放这首 ? ' ym-now' : '') + '">' +
          '<button type="button" class="ym-pick" data-ym=track data-档="' + 转义(档) + '" data-u="' + 转义(u) + '" ' +
          'title="放这一首" aria-label="放 ' + 转义(显示名(u)) + '">' +
          '<span class="ym-nm">' + 转义(显示名(u)) + '</span>' +
          '<span class="ym-src">' + 转义(来源(u)) + '</span>' +
          '</button>' +
          (玩家.indexOf(u) >= 0
            ? '<button type="button" class="ym-x" data-ym=del data-档="' + 转义(档) + '" data-u="' + 转义(u) + '" aria-label="删掉这首">' + 图.关闭 + '</button>'
            : '') +
          '</div>');
      }
      段.push('</div>');
    }
    if (!段.length) 段.push('<div class="ym-empty">还没有曲子。把音频直链或网易云单曲链接粘到上面，一行一条。</div>');
    列表.innerHTML = 段.join('');
  }

  // ── 把玩家粘进来的文本拆成曲目（纯字符串处理，不发任何网络请求）──────────
  const 网易外链 = (id) => 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3';

  function 认一条(t) {
    if (/^https?:\/\//i.test(t)) {
      if (音频后缀.test(t)) return { u: t };
      // 🔴 歌单 / 专辑 / 歌手页**必须先挡** —— 它们的 `?id=` 长得跟单曲一模一样，
      //    先提 ID 的话 `playlist?id=999` 会被当成歌曲 999，放出来是 404。
      if (/[?&#/](playlist|album|toplist|artist)/i.test(t)) return { 弃: t + '（歌单 / 专辑 / 歌手页 —— 拆不了，得逐首粘）' };
      const m = t.match(/(?:song|program)\D{0,12}?id=(\d+)/i) || t.match(/[?&#/]id=(\d+)/);
      if (m) return { u: 网易外链(m[1]) };
      return { 弃: t + '（看不出是音频直链）' };
    }
    if (/^\d{5,}$/.test(t)) return { u: 网易外链(t) };
    return { 弃: t + '（认不出来）' };
  }

  function 拆曲目(文本) {
    const 得 = [], 弃 = [];
    for (const 原行 of String(文本 || '').split(/\r?\n/)) {
      let 行 = 原行.trim();
      if (!行) continue;
      let 名 = '';
      const k = 行.search(/[|｜]/);
      if (k >= 0) {
        名 = 行.slice(0, k).trim();
        行 = 行.slice(k + 1).trim();
        if (!行) { 弃.push(原行.trim() + '（只有名字，没写链接）'); continue; }
      }
      const 块 = 行.split(/[\s,，、;；]+/).map(s => s.trim()).filter(Boolean);
      let 首 = true;
      for (const t of 块) {
        const r = 认一条(t);
        if (r.u) 得.push({ u: r.u, 名: 首 ? 名 : '' });
        else if (r.弃) 弃.push(r.弃);
        首 = false;
      }
    }
    const 见 = new Set(), 净 = [];
    for (const x of 得) { if (见.has(x.u)) continue; 见.add(x.u); 净.push(x); }
    return { 得: 净, 弃 };
  }

  // ── ⑦ 球图 ───────────────────────────────────────────────────────────────
  const 取球图 = () => 存.球图 || 球图内置;

  function 装球图() {
    if (!球) return;
    const img = 球.querySelector('[data-ym=pic]');
    if (!img) return;
    const u = 取球图();
    if (!u) { if (球.classList) 球.classList.remove('ym-haspic'); return; }
    // 🔴 图挂了（404 / 断网 / 格式不支持）就退回手写音符图标，**不留一个空球**。
    //    这里用 addEventListener 而不是 onerror= —— 桩测里的假元素没有 onerror 属性。
    const 挂 = () => { try { if (球.classList) 球.classList.remove('ym-haspic'); } catch (_) {} };
    if (img.addEventListener) { img.addEventListener('error', 挂); img.addEventListener('load', () => { try { if (球.classList) 球.classList.add('ym-haspic'); } catch (_) {} }); }
    try { img.src = u; } catch (_) { 挂(); }
  }

  // ── 建 UI ────────────────────────────────────────────────────────────────
  function 建UI() {
    const 文档 = 取文档();
    if (!文档 || !文档.body) return false;
    注入样式(文档);

    球 = 文档.createElement('button');
    球.type = 'button';
    球.className = 'ym-ball';
    球.setAttribute('aria-label', '月痕音乐');
    球.setAttribute('aria-expanded', 'false');
    球.setAttribute('aria-controls', 'ym-win');
    球.title = '月痕音乐 —— 点一下解锁声音，再点开关面板';
    球.innerHTML = '<span class="ym-halo" aria-hidden="true"></span>' +
      '<img class="ym-pic" data-ym=pic alt="" aria-hidden="true">' +
      '<span class="ym-note">' + 图.音符 + '</span>' + 图.等化;

    窗 = 文档.createElement('div');
    窗.className = 'ym-win';
    窗.id = 'ym-win';
    窗.hidden = true;
    窗.setAttribute('role', 'region');
    窗.setAttribute('aria-label', '月痕音乐播放器');
    窗.innerHTML = `
      <div class="ym-head" data-ym=head>
        <span class="ym-mark" aria-hidden="true">${图.音符}</span>
        <span class="ym-htxt">
          <span class="ym-now" data-ym=now><span class="ym-mq" data-ym=nowin>待命</span></span>
          <span class="ym-sub" data-ym=info><span class="ym-mq" data-ym=infoin></span></span>
        </span>
        <button type="button" class="ym-ic" data-ym=collapse aria-expanded="false" aria-controls="ym-body" aria-label="收起面板">${图.展开}</button>
        <button type="button" class="ym-ic" data-ym=close aria-label="关闭面板">${图.关闭}</button>
      </div>
      <div class="ym-body" id="ym-body" data-ym=body>
        <div class="ym-row ym-transport">
          <button type="button" class="ym-btn" data-ym=prev aria-label="上一首">${图.上一首}</button>
          <button type="button" class="ym-btn ym-main" data-ym=play aria-label="播放">${图.播放}</button>
          <button type="button" class="ym-btn" data-ym=next aria-label="下一首">${图.下一首}</button>
          <button type="button" class="ym-btn" data-ym=mode aria-label="播放模式：列表循环">${图.列表循环}</button>
          <button type="button" class="ym-btn" data-ym=mute aria-label="静音" aria-pressed="false">${图.有声}</button>
          <input class="ym-range" data-ym=vol type="range" min="0" max="100" step="1" value="${Math.round(存.音量 * 100)}" aria-label="音量">
        </div>
        <button type="button" class="ym-tab" data-ym=toggle-pane aria-expanded="false" aria-controls="ym-pane">
          <span>曲目</span><span class="ym-count" data-ym=count></span>
          <span class="ym-chev" aria-hidden="true">${图.展开}</span>
        </button>
        <div class="ym-pane" id="ym-pane" data-ym=pane hidden>
          <div class="ym-chips" data-ym=chips role="group" aria-label="切到哪一档"></div>
          <div class="ym-field">
            <input class="ym-in" data-ym=name type="text" maxlength="60"
              placeholder="名字（可空；只粘一条链接时生效）" aria-label="曲目名字">
            <textarea class="ym-ta" data-ym=ta aria-label="曲目链接，一行一条"
              placeholder="一行一条：音频直链 / 网易云单曲链接 / 歌曲 ID&#10;多条时想各自起名，写成：  名字 | 链接"></textarea>
          </div>
          <div class="ym-row" style="margin-top:8px">
            <button type="button" class="ym-btn" data-ym=add>加进「<span data-ym=addto>日常</span>」</button>
            <span class="ym-msg" data-ym=parse role="status" aria-live="polite"></span>
          </div>
          <details class="ym-adv">
            <summary>外观：悬浮球的图</summary>
            <div class="ym-field">
              <input class="ym-in" data-ym=picurl type="text" maxlength="600"
                placeholder="图片链接 https://…（留空 = 用默认那张）" aria-label="悬浮球图片链接">
              <div class="ym-row" style="margin-top:6px">
                <button type="button" class="ym-btn" data-ym=picfile>${图.上传} 选本地图片</button>
                <button type="button" class="ym-btn" data-ym=picreset>恢复默认</button>
              </div>
              <input type="file" data-ym=picinput accept="image/*" hidden aria-hidden="true">
              <span class="ym-msg" data-ym=picmsg role="status" aria-live="polite"></span>
            </div>
          </details>
          <details class="ym-adv">
            <summary>钉死：按章节关键词固定放某一首</summary>
            <div class="ym-row" style="margin-top:6px">
              <input class="ym-in" data-ym=pin type="text" maxlength="80"
                placeholder="章节关键词，例如 创世神" aria-label="章节关键词">
              <button type="button" class="ym-btn" data-ym=addpin>钉死</button>
            </div>
          </details>
          <div class="ym-list" data-ym=list></div>
        </div>
      </div>`;
    面板 = 窗.querySelector('[data-ym=pane]');
    列表 = 窗.querySelector('[data-ym=list]');
    筹码 = 窗.querySelector('[data-ym=chips]');
    // 🔴 抽屉默认收起**用 JS 显式写**，不靠 HTML 里那个 `hidden` 属性 ——
    //   属性要靠解析器落到属性上，而 `渲染面板` 读的是属性，两边容易对不上。
    面板.hidden = true;

    if (抬头图) { try { 窗.style.setProperty('--ym-head-img', 'url("' + 抬头图 + '")'); } catch (_) {} }
    // 球的尺寸也从 JS 给一份 —— CSS 里那个 var 有兜底值，但写在这里能保证
    // 「一个常量管所有地方」（拖动夹取、定位都用 球尺寸）。
    try { 球.style.setProperty('--ym-ball-size', 球尺寸 + 'px'); } catch (_) {}

    文档.body.appendChild(球);
    文档.body.appendChild(窗);
    定位球();
    建筹码();
    绑事件(文档);
    装球图();
    同步状态();
    刷新UI(null);
    return true;
  }

  let 视口监听 = [];
  function 挂视口监听() {
    const w = (() => { try { return (取文档().defaultView) || 宿主; } catch (_) { return 宿主; } })();
    const 加 = (目标, 名, 函数) => {
      try { if (目标 && 目标.addEventListener) { 目标.addEventListener(名, 函数); 视口监听.push([目标, 名, 函数]); } } catch (_) {}
    };
    加(w, 'resize', 视口变);
    加(w, 'orientationchange', 视口变);
    try { if (w.visualViewport) 加(w.visualViewport, 'resize', 视口变); } catch (_) {}
  }

  function 视口变() {
    if (已销毁) return;
    if (视口计时) clearTimeout(视口计时);
    视口计时 = setTimeout(() => {
      视口计时 = null;
      夹球();
      if (窗 && !窗.hidden) 定位窗();
    }, 视口去抖);
  }

  // ── 选档（chip 和档标题共用）─────────────────────────────────────────────
  function 选档(档) {
    if (档名表.indexOf(档) < 0) return;
    手选档 = 档;
    刷新UI({ 重算: true });
  }

  // ── ⑦ 球图: 存 / 清 ──────────────────────────────────────────────────────
  function 设球图(u, 提示元素) {
    存.球图 = String(u || '');
    if (!写存储()) { 说(提示元素, '存不下 —— 图太大了，换小一点的（1MB 以内）', true); return; }
    装球图();
    const 框 = 窗 && 窗.querySelector('[data-ym=picurl]');
    if (框 && u && u.slice(0, 5) !== 'data:') 框.value = u;
    说(提示元素, u ? '球的图换了' : '球的图恢复默认');
  }

  let 键监听 = null;
  function 绑事件(文档) {
    // ── 球: 拖动 or 点击 ──────────────────────────────────────────────────
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
      const v = 视口();
      const 半 = 球尺寸 / 2;
      球.style.left = Math.round(Math.max(v.x, Math.min(v.x + v.w - 球尺寸, e.clientX - 半))) + 'px';
      球.style.top = Math.round(Math.max(v.y, Math.min(v.y + v.h - 球尺寸, e.clientY - 半))) + 'px';
      球.style.right = ''; 球.style.bottom = '';
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

    // ── 窗 ────────────────────────────────────────────────────────────────
    窗.addEventListener('click', (e) => {
      const b = e.target && e.target.closest ? e.target.closest('[data-ym]') : null;
      if (!b) return;
      const k = b.getAttribute('data-ym');
      const 取属 = (n) => (b.getAttribute ? b.getAttribute(n) : null);

      if (k === 'prev') { 上一首(); }
      else if (k === 'play') { 播放键(); }
      else if (k === 'next') { 下一首(); }
      else if (k === 'mode') {
        // 四种模式转一圈。🔴 只认表里那四个 —— 别的地方读 `模式` 时都假定它合法。
        const i = 模式表.indexOf(模式);
        模式 = 模式表[(i < 0 ? 0 : i + 1) % 模式表.length];
        写存储();
        刷新UI({ 重算: true });
      }
      else if (k === 'mute') {
        存.静音 = !存.静音; 写存储();
        应用音量(deck[0]); 应用音量(deck[1]); 刷新UI(null);
      }
      else if (k === 'collapse') 收起(!收起中);
      else if (k === 'close') 关窗(true);
      else if (k === 'toggle-pane') {
        const 要开 = 面板.hidden;
        面板.hidden = !要开;
        if (b.setAttribute) b.setAttribute('aria-expanded', String(要开));
        if (要开) {
          // ⑩ 展开时补一次入场动画 —— 光切 hidden 是离散的，没有过渡
          try {
            面板.classList.remove('ym-anim'); void 面板.offsetWidth; 面板.classList.add('ym-anim');
          } catch (_) {}
          定位窗(); 渲染面板();
        }
      }
      // ⑥ 点某一首歌 ⇒ 放它，并**从这首开始往下走**（它成为当前锚点）
      else if (k === 'track') {
        const 档 = 取属('data-档'), u = 取属('data-u');
        if (u) {
          手选档 = 档;
          if (档名表.indexOf(档) >= 0) 当前档 = 档;
          当前因 = '你点了「' + (档 || '') + '」档的《' + 显示名(u) + '》，从这首开始往下走';
          落曲(u, 当前档);
          刷新UI(null);
        }
      }
      else if (k === 'pick') 选档(取属('data-档'));
      else if (k === 'add') 加曲(false);
      else if (k === 'addpin') 加曲(true);
      else if (k === 'del') {
        const 档 = 取属('data-档'), u = 取属('data-u');
        存.曲目[档] = (存.曲目[档] || []).filter(x => x !== u);
        清理名字(u);
        写存储(); 刷新UI({ 重算: true });
      }
      else if (k === 'delpin') {
        存.钉死.splice(Number(取属('data-i')) || 0, 1);
        写存储(); 刷新UI({ 重算: true });
      }
      // ── 外观 ─────────────────────────────────────────────────────────
      else if (k === 'picfile') {
        const f = 窗.querySelector('[data-ym=picinput]');
        if (f && typeof f.click === 'function') { try { f.click(); } catch (_) {} }
      }
      else if (k === 'picreset') 设球图('', 窗.querySelector('[data-ym=picmsg]'));
    });

    窗.addEventListener('input', (e) => {
      const t = e.target;
      if (!t || !t.getAttribute) return;
      const k = t.getAttribute('data-ym');
      if (k === 'vol') {
        存.音量 = Math.max(0, Math.min(1, Number(t.value) / 100));
        写存储();
        应用音量(deck[0]); 应用音量(deck[1]);
      } else if (k === 'picurl') {
        // 边打边存太吵（每敲一个字都写一次 localStorage）—— 只在看起来是完整链接时才吃
        const v = String(t.value || '').trim();
        if (!v) { 设球图('', 窗.querySelector('[data-ym=picmsg]')); return; }
        if (/^(https?:\/\/|data:image\/)/i.test(v)) 设球图(v, 窗.querySelector('[data-ym=picmsg]'));
      }
    });

    // 本地图片 → 转成 data URL 存起来（不然浏览器读不到硬盘上的文件）
    窗.addEventListener('change', (e) => {
      const t = e.target;
      if (!t || !t.getAttribute || t.getAttribute('data-ym') !== 'picinput') return;
      const 提示 = 窗.querySelector('[data-ym=picmsg]');
      const f = t.files && t.files[0];
      if (!f) return;
      if (f.size > 图大小上限) { 说(提示, '这张图 ' + Math.round(f.size / 1024) + 'KB，超了 1MB —— 换小一点的', true); return; }
      if (typeof FileReader !== 'function') { 说(提示, '这个环境读不了本地文件 —— 改成粘链接吧', true); return; }
      try {
        const r = new FileReader();
        r.onload = () => 设球图(String(r.result || ''), 提示);
        r.onerror = () => 说(提示, '这张图读不出来', true);
        r.readAsDataURL(f);
      } catch (_) { 说(提示, '这张图读不出来', true); }
    });

    键监听 = (e) => {
      if (e.defaultPrevented) return;
      if (e.key !== 'Escape' || !窗 || 窗.hidden) return;
      关窗(true);
    };
    文档.addEventListener('keydown', 键监听);
  }

  function 清理名字(u) {
    for (const 档 of 档名表) if ((存.曲目[档] || []).indexOf(u) >= 0) return;
    delete 存.名字[u];
  }

  function 加曲(当钉死) {
    const ta = 窗 && 窗.querySelector('[data-ym=ta]');
    const 名框 = 窗 && 窗.querySelector('[data-ym=name]');
    const 提示 = 窗 && 窗.querySelector('[data-ym=parse]');
    if (!ta) return;
    const { 得, 弃 } = 拆曲目(ta.value);
    if (!得.length) { 说(提示, 弃.length ? 弃[0] : '框是空的 —— 先粘一条链接进来', true); return; }

    if (当钉死) {
      const 词框 = 窗.querySelector('[data-ym=pin]');
      const 词 = String((词框 && 词框.value) || '').trim();
      // 🔴 关键词空着就**不写**。空章节在 `命中钉死` 里连正则都编不出来（直接 continue），
      //    也就是一条永远不会命中的死条目。
      if (!词) { 说(提示, '钉死得先写章节关键词 —— 空关键词一条都不会命中', true); return; }
      try { new RegExp(词); } catch (_) { 说(提示, '这个关键词不是合法的正则（比如括号没配对）', true); return; }
      for (const x of 得) 存.钉死.push({ 章节: 词, 节点: '', 曲: x.u });
      写存储();
      ta.value = '';
      说(提示, '加了 ' + 得.length + ' 条钉死：章节名里含「' + 词 + '」时放它');
      刷新UI({ 重算: true });
      return;
    }

    const 档 = 手选档 || 线要的档 || 默认档;
    const 单名 = (得.length === 1 && 名框) ? String(名框.value || '').trim().slice(0, 60) : '';
    for (const x of 得) {
      const 名 = x.名 || 单名;
      if (名) 存.名字[x.u] = 名;
      存.曲目[档] = (存.曲目[档] || []).concat([x.u]);
    }
    写存储();
    ta.value = '';
    if (名框) 名框.value = '';
    说(提示, '加进「' + 档 + '」' + 得.length + ' 首' + (弃.length ? ' · 跳过 ' + 弃.length + ' 条' : ''));
    if (弃.length) { try { console.info('[月痕音乐] 跳过的：', 弃); } catch (_) {} }
    刷新UI({ 重算: true });
  }

  function 点球() {
    if (!窗) return;
    if (窗.hidden) 开窗(); else 关窗(false);
  }

  // ══ 10. 生命周期 ══════════════════════════════════════════════════════════
  function 销毁() {
    if (已销毁) return;
    已销毁 = true;
    try { if (同步计时) clearTimeout(同步计时); } catch (_) {}
    try { if (视口计时) clearTimeout(视口计时); } catch (_) {}
    try { if (关计时) clearTimeout(关计时); } catch (_) {}
    for (const d of deck) { try { d.pause(); d.src = ''; } catch (_) {} }
    deck = [null, null];
    for (const [t, n, f] of 视口监听) { try { t.removeEventListener(n, f); } catch (_) {} }
    视口监听 = [];
    try { if (键监听) 取文档().removeEventListener('keydown', 键监听); } catch (_) {}
    键监听 = null;
    try { if (球 && 球.parentNode) 球.parentNode.removeChild(球); } catch (_) {}
    try { if (窗 && 窗.parentNode) 窗.parentNode.removeChild(窗); } catch (_) {}
    try { const s = 取文档().getElementById('ym-style'); if (s && s.parentNode) s.parentNode.removeChild(s); } catch (_) {}
    球 = 窗 = 面板 = 列表 = 筹码 = null;
    筹码表 = [];
    try { delete 宿主[RUNTIME_KEY]; } catch (_) {}
  }

  function 启动() {
    找宿主();

    try {
      const 旧 = 宿主[RUNTIME_KEY];
      if (旧 && 旧.版本 === 版本 && typeof 旧.destroy === 'function') 旧.destroy();
    } catch (_) {}

    deck = [造deck(), 造deck()];

    if (!建UI()) {
      const 文档 = 取文档();
      if (文档 && 文档.addEventListener) {
        文档.addEventListener('DOMContentLoaded', () => { if (!建UI()) console.warn('[月痕音乐] 挂不上 UI'); }, { once: true });
      } else {
        console.warn('[月痕音乐] 找不到可挂载的文档 —— 播放器没起来');
        return;
      }
    }
    挂视口监听();

    const 订阅成功 = 订阅变量();
    if (!订阅成功) console.warn('[月痕音乐] 订不上 MVU 事件 —— 切曲只能手动，或等页面重载');

    try {
      宿主[RUNTIME_KEY] = {
        版本, destroy: 销毁,
        刷新: () => 换曲(),
        // 给桩测 / 调试用的小口子（真机上用不到）
        探针: () => ({
          在放, 模式, 当前曲, 当前档, 当前因,
          球图: 取球图(),
          球类: (() => { try { return 球 && 球.classList && 球.classList.contains ? 球.classList.contains('ym-playing') : null; } catch (_) { return null; } })(),
          窗类: (() => { try { return 窗 && 窗.classList && 窗.classList.contains ? 窗.classList.contains('ym-playing') : null; } catch (_) { return null; } })(),
        }),
        // 桩测用: 拿到当前那个音频元素 —— 好手动触发 `ended` 走「自动续播」那条路
        // （真机上这个事件由浏览器发，桩里发不出来）。
        取音频: () => deck[当前],
      };
    } catch (_) {}

    换曲();
  }

  启动();
})();

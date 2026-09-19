// ============================================================================
// 月痕之民 · 音乐播放器
//   版本 v0.0.2
//   装在卡里的是 `tavern_helper.scripts` 第 3 条，`content` 只有一行 import：
//     import 'https://cdn.jsdelivr.net/gh/ZIMOJUNA/114514@main/月痕之民_音乐v0.0.2.js';
//
// ── 它做什么 ────────────────────────────────────────────────────────────────
//   跟着事件链放音乐：读 MVU 的 `世界.主线` → 找正在走的那条线 → 看它的 `配乐` 格
//   （六档: 日常 / 紧张 / 战斗 / 悲恸 / 凯旋 / 静谧）→ 从曲目表挑一首放。
//   作者内置的曲子、玩家自填的链接、网易云直链，走的是同一条路。
//
// ── v0.0.1 → v0.0.2 改了什么 ────────────────────────────────────────────────
//   ① 🔴 修一个阻断级 bug：面板一渲染就把「粘贴框 ＋ 加歌按钮」自己抹掉了
//      （渲染写错了容器 —— 写的是整个抽屉，不是那个专门留的列表格子）
//      ⇒ 真机上「加了一首歌后这个加歌界面就没有了」，加第二首只能刷新页面。
//   ② 曲目能起名字了。原来一首歌的身份就是 URL 的尾巴，而网易云外链的尾巴
//      恒等于 `url` ⇒ 面板里一排全是「url」。现在可以写「名字 | 链接」。
//   ③ 加歌能选档了。原来往哪一档加由「当前那条线要哪一档」隐式决定，玩家说不上话，
//      而且那个档名还看不见。现在六个档是看得见的 chip，默认停在当前线要的那档。
//   ④ 图标全部换成手写内联 SVG。原来是彩色 emoji ＋ 单色字形 ＋ 纯文本三种混用。
//   ⑤ 开合有过渡了（`hidden` 是离散属性，原来那段 transition 永远不触发）；
//      抬头拆成两层：「正在放什么」和「哪条线哪一档」不再互相顶掉。
//   ⑥ 收起 与 关闭 分成两件事；Esc 关闭时把焦点还给悬浮球；视口变化重算位置。
//   ⑦ 悬浮球从 <div> 改成原生 <button>（键盘和读屏器才认）。
//
// ── 它不做什么（照旧）─────────────────────────────────────────────────────
//   ✗ 不做音效 —— 本卡没有战斗实时演算，没地方挂
//   ✗ 不做 TTS（念白）—— 跟音乐是两条路
//   ✗ 不动 ST 原生的 Dynamic Audio 扩展
//   ✗ 不做「模型在正文里出 <bgm> 标记」那套 —— 选曲只认变量里的 `配乐` 格
//   ✗ 不上传、不转码、不代理任何音频 —— 只放 URL
//
// ── 🔴 两条必须写进说明书的限制（不是 bug，是浏览器的规矩）──────────────────
//   ① 浏览器不许「没被用户点过」的页面自动出声。⇒ 玩家先点一下悬浮球（解锁），
//      之后切曲才会自动跟。没解锁之前，曲子备好了也不会响。
//   ② 音频文件现在**一个都没有** —— 曲目表默认全空。播放器静默待命，不报错。
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
  const 版本 = 'v0.0.2';
  const RUNTIME_KEY = '__yuehenMusicRuntime__';  // 单例键（挂在宿主窗口上）
  const LS_KEY = 'yuehen_music_v1';
  const LS_版本 = 2;                             // 存储结构版本 —— 对不上就当没存过，不猜
                                                 //   v0.0.1 存的是 1。v0.0.2 加了 `名字` 表 ⇒ 升到 2，
                                                 //   老头存档整份作废（代价: 已粘过的曲目要重粘一次）。
  const FADE_MS = 700;                           // 交叉淡入淡出时长
  const 面板宽 = 288;
  const 档名表 = ['日常', '紧张', '战斗', '悲恸', '凯旋', '静谧'];
  const 默认档 = '日常';
  const 音量默认 = 0.5;
  const 拖动阈值 = 6;                            // px —— 超过它才算拖动，否则算点击
  const 同步去抖 = 200;                          // ms —— 变量事件可能连发，攒一下再选曲
  const 视口去抖 = 120;                          // ms
  const 动效_开合 = 190;                         // ms —— 要和 CSS 里的 --ym-dur 对上
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
  // 用途: 「最终和创世神大战放这一首」这种时刻，要的是那一首特定的曲子，
  //       不是「一首随机的战斗曲」。
  // 形状: { 章节: /正则/, 节点: /正则/ 或 null, 曲: 'final-boss.m4a' }
  // 🔴 键写成**正则**而不是章名 —— 只认关键词，**不预设任何具体剧情**。
  //    写成 '终章·创世神' 那种就等于把终局的名字定死了，跟「不许定死现有内容」顶着。
  const PINNED = [];

  // 抬头条的底图槽位。留空 = 不上图。
  //   填了它（`data:image/...;base64,…` 或一个 https 地址）抬头条就有底图。
  //   ⚠ 上图之前得先确认字还看得清 —— 那要同时给抬头条压一层暗色蒙版，
  //     跟填图是同一件事，别只填图不压蒙版。
  const 抬头图 = '';

  // ══ 2. 外挂层（创意工坊 / 高级玩家）══════════════════════════════════════
  // 工坊包不能是脚本，所以工坊创作者改不了这个文件。留给他们的口子是全局钩子:
  // 任何脚本往宿主窗口的 `月痕音乐外挂` 塞一份曲目，播放器每次选曲时读一次。
  //
  //   window.月痕音乐外挂 = {
  //     曲目: { 战斗: ['https://.../boss.m4a'] },   // 追加到对应档
  //     钉死: [ { 章节: '创世神', 节点: '', 曲: 'https://.../final.m4a' } ],
  //   };
  //
  // 🔴 刻意**不**用 `getWorldbook` 那类接口 —— 它的签名随酒馆助手版本变，猜错就是静默失效。
  //    用全局变量当钩子: 零 API 依赖，接不接、怎么接，将来定。
  const 外挂键 = '月痕音乐外挂';

  // ══ 3. 宿主环境 ═══════════════════════════════════════════════════════════
  // 这段脚本可能跑在酒馆助手的 iframe 里，而 MVU 与酒馆助手的全局量挂在**父窗口**。
  // 跨域时读父窗口会抛 —— 所以每个候选都 try/catch，逐个试。
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

  // 可见视口。⚠ 不要用 innerWidth/innerHeight 当唯一来源 —— 手机软键盘弹起来、
  //   浏览器缩放、或者宿主被嵌在别的容器里时，那两个值都不等于「看得见的区域」。
  function 视口() {
    const w = (() => { try { return (取文档().defaultView) || 宿主; } catch (_) { return 宿主; } })();
    try {
      const vv = w.visualViewport;
      if (vv && vv.width) return { x: vv.offsetLeft || 0, y: vv.offsetTop || 0, w: vv.width, h: vv.height };
    } catch (_) {}
    return { x: 0, y: 0, w: w.innerWidth || 360, h: w.innerHeight || 640 };
  }

  // ══ 4. 存储 ═══════════════════════════════════════════════════════════════
  // 音量 / 静音 / 悬浮球位置 / 玩家自填曲目 / 曲目名字 —— 全在 localStorage，**不进卡**。
  // 读的时候三道保险: try/catch（隐私模式会抛）· 版本校验（结构变了就当没存过）· 逐项夹取。
  //
  // ⚠ `曲目` 与 `名字` 是**两张表**，故意的:
  //   `曲目[档]` 是「这一档有哪些链接」
  //   `名字[链接]` 是「这个链接叫什么」—— 同一个链接可能同时挂在两档，名字该共用一份。
  //   合成一个「{曲, 名} 数组」的话，同一个链接挂两档就得写两份名字，删一处另一处变孤儿。
  //   ⇒ 名字按**链接**存，不按「档里的位置」存。
  const 空存储 = () => ({
    版本: LS_版本,
    音量: 音量默认,
    静音: false,
    球位: { x: null, y: null },
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

  function 写存储() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(存)); } catch (_) {}
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
    const 库 = { _外挂钉死: [] };   // `_外挂钉死` 不是档名 —— 它是钉死表里的外挂那一段
    for (const 档 of 档名表) 库[档] = [];

    // 内置层: 表里写的是文件名，要拼 AUDIO_BASE
    for (const 档 of 档名表) {
      for (const 名 of TRACKS[档] || []) {
        const u = 拼地址(名);
        if (u) 库[档].push(u);
      }
    }
    // 玩家层: 存的已经是完整 URL（`拆曲目` 只放行 http 开头，和它自己拼出来的网易云外链）
    for (const 档 of 档名表) {
      for (const u of 存.曲目[档] || []) if (u) 库[档].push(u);
    }
    // 外挂层: 同样是完整 URL —— 工坊创作者写的是外链，不是文件名
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

  // 挑得出声的那些 —— 加载失败过的（`坏曲`）不再给
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
  // 玩家写过的名字优先；没写过就按来源自动起一个 —— **不许再出现一排「url」**。
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
  // 顺序: 钉死表（作者 + 玩家 + 外挂）→ 正在走的那条线的 `配乐` 格 → 默认档「日常」。
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

  // 从 MVU 的 `世界.主线` 里挑「正在走的那条线」。
  // 优先 `类型 === '主线'` 且 `状态 === '进行中'`（同时只允许一条）；
  // 没有就退而求其次，任何一条 `进行中` 的线都行（支线 / 地域 / 个人）。
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

  // 这条线**要**哪一档。UI 要拿它当「加歌默认落哪一档」的默认值，
  // 所以单独拎出来，不在选曲里就地算。
  let 线要的档 = 默认档;

  function 选曲() {
    const 库 = 取曲库();
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
    const 线名 = 线 ? '「' + (章节 || '未命名') + '」' + (节点 ? '（' + 节点 + '）' : '') : '';

    // `目标档` = **这条线要的档**，`档` = **实际放的那一首来自哪档**。
    // 🔴 两个必须分开: 要的那档空着时会去别的档借一首，但「玩家想加一首曲子」该加进
    //    **要的那档**，不是借来的那档 —— 混成一个的话，玩家看着「战斗」线的剧情，
    //    把自己找的战斗曲加进了「日常」档。
    const 目标档 = (线 && 档名表.indexOf(线.配乐) >= 0) ? 线.配乐 : 默认档;
    线要的档 = 目标档;

    const 钉 = 命中钉死(章节, 节点, 库);
    if (钉) return { 曲: 钉, 档: null, 目标档, 因: '钉死表命中了' + (线名 || '（没有正在走的线也照样命中）') };

    const 池 = 可用(库, 目标档);
    if (!池.length) {
      // 这一档没曲子 —— 别就此闭嘴，去别的档借一首（有总比没有强），借不到才静音
      for (const 别的 of 档名表) {
        const p = 可用(库, 别的);
        if (p.length) {
          return {
            曲: p[Math.floor(Math.random() * p.length)], 档: 别的, 目标档,
            因: (线 ? '正在走' + 线名 + '，要「' + 目标档 + '」档' : '没有正在走的线') +
              '；那一档还空着，从「' + 别的 + '」借了一首',
          };
        }
      }
      return { 曲: null, 档: 目标档, 目标档, 因: 线 ? '正在走' + 线名 + '，档是「' + 目标档 + '」，但一首能放的曲子都没有' : '没有正在走的线，且一首能放的曲子都没有' };
    }
    return { 曲: 池[Math.floor(Math.random() * 池.length)], 档: 目标档, 目标档, 因: 线 ? '正在走' + 线名 + '，档是「' + 目标档 + '」' : '没有正在走的线，落默认档' };
  }

  // ══ 7. 音频层 ═════════════════════════════════════════════════════════════
  // BGM 用 `HTMLAudioElement` 而不是 Web Audio: 几 MB 的文件能边下边播，
  // 换成 decodeAudioData 得整个下完才出声。
  // 两个 deck 轮流当值 —— 换曲时新的淡入、旧的淡出，就是「交叉」。
  let deck = [null, null];
  let 当前 = 0;
  let 已解锁 = false;
  let 手势已挂 = false;
  let 当前曲 = null;      // 正在放（或正想放）的 URL —— 同一首不重放
  let 当前档 = null;
  let 当前因 = '';        // 最近一次选曲的理由 —— 抬头副行一直显示它
  let 同步计时 = null;
  let 已销毁 = false;
  // 加载失败的曲子记在这儿，本次会话里不再选它。
  // 🔴 必须有: 网易云的 VIP / 付费歌会 404。不记的话「失败 → 换一首 → 又选中它 →
  //    又失败」会变成一个无限重试的圈，而且每圈都在做淡入淡出，玩家看到的是一抽一抽的播放器。
  const 坏曲 = new Set();

  function 造deck() {
    const a = new Audio();
    a.preload = 'none';       // 没解锁之前一个字节都不下
    a._lvl = 0;
    a.volume = 0;
    a.addEventListener('ended', () => 下一首());            // 正常播完 —— 顺着往下走
    a.addEventListener('error', () => {                      // 加载失败 —— 记下来，换一首
      try { if (a.src) 坏曲.add(a.src); } catch (_) {}
      下一首();
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
  function 挂手势兜底() {
    if (手势已挂) return;
    const 文档 = 取文档();
    if (!文档 || !文档.addEventListener) return;
    手势已挂 = true;
    const 试 = () => {
      文档.removeEventListener('pointerdown', 试, true);
      手势已挂 = false;
      解锁();
      const d = deck[当前];
      if (d && d.src && d.paused) d.play().catch(() => {});
    };
    文档.addEventListener('pointerdown', 试, true);
  }

  // 解锁只能在**用户手势的同步调用栈里**做（点悬浮球时）。走到「模型写完剧情」
  // 那一步早已脱离点击栈，浏览器会直接拒。所以解锁是玩家点一下换来的，
  // 之后切曲才能全自动 —— 这不是能绕的东西。
  function 解锁() {
    try {
      const d = deck[当前] || deck[0];
      if (d && d.src) d.play().then(() => { 已解锁 = true; }).catch(() => 挂手势兜底());
      else 已解锁 = true;
    } catch (_) {}
  }

  // 落一首曲子。`换曲`（跟着变量走）和 `播指定`（玩家点前后）最后都走这里。
  function 落曲(u, 档) {
    当前曲 = u; 当前档 = 档 || 当前档;
    const 旧 = deck[当前];
    当前 = 1 - 当前;
    const 新 = deck[当前];
    if (!新) return;
    try { 新.src = u; 新.currentTime = 0; 新._lvl = 0; 应用音量(新); } catch (_) {}
    const 开播 = () => {
      try { const p = 新.play(); if (p && p.catch) p.catch(() => 挂手势兜底()); } catch (_) {}
    };
    if (旧 && 旧.src && !旧.paused) 淡到(旧, 0, FADE_MS, () => { try { 旧.pause(); } catch (_) {} 开播(); 淡到(新, 1, FADE_MS); });
    else { 开播(); 淡到(新, 1, FADE_MS); }
  }

  function 换曲() {
    if (已销毁) return;
    const r = 选曲();
    if (!r.曲) { 刷新UI(r); return; }
    // 同一首就让它继续放着 —— 别每轮都从头再来一遍
    if (r.曲 === 当前曲) { 刷新UI(r); return; }
    落曲(r.曲, r.档);
    刷新UI(r);
  }

  // 上/下一首走的是**当前档里的顺序**，不是在整库里重新随机 ——
  // 玩家点了「下一首」，期待的是「这一档的下一首」，不是「换一首别的」。
  //   自动播完（`ended`）走的也是这条路 ⇒ 按钮和自动续播的语义是同一个。
  function 步进(方向) {
    if (已销毁) return;
    const 库 = 取曲库();
    const 档 = (当前档 && 可用(库, 当前档).length) ? 当前档 : 默认档;
    const 池 = 可用(库, 档);
    if (!池.length) return;
    const i = 池.indexOf(当前曲);
    const j = i < 0 ? 0 : (i + 方向 + 池.length) % 池.length;
    const u = 池[j];
    if (u === 当前曲) return;   // 这一档只有一首 —— 那就还是它，不重放
    落曲(u, 档);
    刷新UI(null);
  }
  const 上一首 = () => 步进(-1);
  const 下一首 = () => 步进(1);

  function 暂停切换() {
    const d = deck[当前];
    if (!d || !d.src) return;
    try {
      if (d.paused) { const p = d.play(); if (p && p.catch) p.catch(() => 挂手势兜底()); }
      else d.pause();
    } catch (_) {}
    刷新UI(null);
  }

  // ══ 8. 变量同步 ═══════════════════════════════════════════════════════════
  // 监听的是 MVU 的**变量更新结束**事件，不是消息渲染 —— 变量的时刻与渲染的时刻
  // 不是一回事，读早了会读到上一轮的值（音乐会慢一轮）。
  // 事件名取自 MVU bundle 里的实际字符串（`mag_variable_*`）。
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
  let 手选档 = null;        // 玩家在 chip 上亲手选的档；null = 跟着「当前线要的那档」走
  let 收起中 = false;
  let 关计时 = null;
  let 视口计时 = null;

  // ── 图标：手写的几何路径（24×24 网格 / 描边 2 / 圆头 / currentColor）──────
  //   🔴 没引任何图标库。原来混着彩色 emoji、单色字形和纯文本三种渲染体系，
  //      在 Windows 上 emoji 一定渲染成彩色位图，跟这套线性风格打架。
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
    等化: '<svg class="ym-eq" viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" focusable="false">' +
      '<rect x="4.5" y="7" width="3.2" height="10" rx="1.4"/><rect x="10.4" y="4.5" width="3.2" height="15" rx="1.4"/><rect x="16.3" y="8.5" width="3.2" height="7" rx="1.4"/></svg>',
  };

  const 样式 = `
.ym-ball,.ym-win{
  --ym-bg:rgba(19,21,28,.96); --ym-panel:rgba(255,255,255,.06);
  --ym-line:rgba(255,255,255,.13); --ym-line-2:rgba(255,255,255,.22);
  --ym-fg:#e9e7e1; --ym-fg-2:#b3afa4; --ym-fg-3:#8b877d;
  --ym-gold:#c9b477; --ym-gold-bg:rgba(201,180,119,.16); --ym-danger:#e0857f;
  --ym-ease:cubic-bezier(.2,.8,.2,1); --ym-dur:180ms}
@supports (backdrop-filter:blur(4px)) or (-webkit-backdrop-filter:blur(4px)){
  .ym-ball{background:rgba(19,21,28,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
  .ym-win{background:rgba(19,21,28,.87);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}}
.ym-ball{position:fixed;z-index:2147483000;width:44px;height:44px;padding:0;margin:0;
  border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:var(--ym-bg);border:1px solid var(--ym-line-2);color:var(--ym-fg-2);
  cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;
  box-shadow:0 4px 16px rgba(0,0,0,.42);
  transition:transform var(--ym-dur) var(--ym-ease),opacity var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-ball:hover{transform:scale(1.06)}
.ym-ball:focus-visible{outline:2px solid var(--ym-gold);outline-offset:2px}
.ym-ball.ym-idle{opacity:.42}
.ym-ball.ym-playing{color:var(--ym-gold)}
.ym-eq{display:none}
.ym-ball.ym-playing .ym-eq{display:block}
.ym-ball.ym-playing .ym-note{display:none}
.ym-eq rect{transform-box:fill-box;transform-origin:bottom;animation:ym-eq .9s ease-in-out infinite}
.ym-eq rect:nth-child(2){animation-delay:.15s}
.ym-eq rect:nth-child(3){animation-delay:.3s}
@keyframes ym-eq{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
.ym-win{position:fixed;z-index:2147483001;width:288px;box-sizing:border-box;
  border-radius:14px;background:var(--ym-bg);border:1px solid var(--ym-line-2);
  color:var(--ym-fg);font:13px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;
  text-align:left;box-shadow:0 12px 36px rgba(0,0,0,.5);overflow:hidden;
  opacity:0;transform:translateY(6px) scale(.985);
  transition:opacity var(--ym-dur) var(--ym-ease),transform var(--ym-dur) var(--ym-ease)}
.ym-win.ym-open{opacity:1;transform:none}
.ym-win[hidden]{display:none}
.ym-head{position:relative;display:flex;align-items:center;gap:9px;padding:9px 9px 9px 11px;
  background-color:rgba(255,255,255,.026);
  background-image:var(--ym-head-img,none);background-size:cover;background-position:center;
  border-bottom:1px solid var(--ym-line)}
.ym-mark{flex:0 0 auto;width:27px;height:27px;border-radius:8px;display:flex;align-items:center;
  justify-content:center;background:var(--ym-gold-bg);color:var(--ym-gold)}
.ym-htxt{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px}
.ym-now{font-size:13px;font-weight:600;line-height:1.35;color:var(--ym-fg);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ym-sub{font-size:11px;line-height:1.35;color:var(--ym-fg-3);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ym-ic{flex:0 0 auto;width:26px;height:26px;padding:0;border:0;border-radius:7px;background:none;
  color:var(--ym-fg-3);cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-ic:hover{background:var(--ym-panel);color:var(--ym-fg)}
.ym-ic:focus-visible{outline:2px solid var(--ym-gold);outline-offset:1px}
.ym-body{padding:11px 12px 12px}
.ym-win.ym-collapsed .ym-body{display:none}
.ym-row{display:flex;align-items:center;gap:8px}
.ym-btn{flex:0 0 auto;height:36px;min-width:36px;padding:0 10px;border-radius:9px;cursor:pointer;
  display:inline-flex;align-items:center;justify-content:center;gap:6px;
  background:var(--ym-panel);border:1px solid var(--ym-line);color:var(--ym-fg-2);
  font:13px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease),border-color var(--ym-dur) var(--ym-ease)}
.ym-btn:hover{background:rgba(255,255,255,.12);color:var(--ym-fg)}
.ym-btn:focus-visible{outline:2px solid var(--ym-gold);outline-offset:2px}
.ym-btn[disabled]{opacity:.4;cursor:default}
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
.ym-chips{display:flex;flex-wrap:wrap;gap:6px}
.ym-chip{height:30px;padding:0 10px;border-radius:999px;cursor:pointer;
  display:inline-flex;align-items:center;gap:5px;
  background:none;border:1px solid var(--ym-line);color:var(--ym-fg-3);
  font:12px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease),border-color var(--ym-dur) var(--ym-ease)}
.ym-chip:hover{color:var(--ym-fg);border-color:var(--ym-line-2)}
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
.ym-list{margin-top:11px;max-height:196px;overflow:auto;overscroll-behavior:contain}
.ym-sec{display:flex;align-items:center;gap:6px;margin:10px 0 4px;font-size:11px;
  color:var(--ym-gold);letter-spacing:.04em}
.ym-sec:first-child{margin-top:0}
.ym-sec span{color:var(--ym-fg-3)}
.ym-sec em{font-style:normal;margin-left:auto;font-size:10px;color:var(--ym-gold);
  border:1px solid rgba(201,180,119,.45);border-radius:999px;padding:1px 6px}
.ym-tr{display:flex;align-items:center;gap:7px;padding:4px 6px;border-radius:8px}
.ym-tr:hover{background:var(--ym-panel)}
.ym-tr.ym-now{background:var(--ym-gold-bg);box-shadow:inset 2px 0 0 var(--ym-gold)}
.ym-tr .ym-nm{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-size:12px;color:var(--ym-fg-2)}
.ym-tr.ym-now .ym-nm{color:var(--ym-fg)}
.ym-tr .ym-src{flex:0 0 auto;font-size:10px;color:var(--ym-fg-3)}
.ym-x{flex:0 0 auto;width:24px;height:24px;padding:0;border:0;border-radius:6px;background:none;
  color:var(--ym-fg-3);cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:background var(--ym-dur) var(--ym-ease),color var(--ym-dur) var(--ym-ease)}
.ym-x:hover{background:rgba(224,133,127,.15);color:var(--ym-danger)}
.ym-x:focus-visible{outline:2px solid var(--ym-gold);outline-offset:1px}
.ym-empty{padding:5px 0;font-size:11px;line-height:1.5;color:var(--ym-fg-3)}
@media (prefers-reduced-motion: reduce){
  .ym-ball,.ym-win,.ym-btn,.ym-ic,.ym-tab,.ym-chip,.ym-x,.ym-chev{transition-duration:1ms}
  .ym-eq rect{animation:none;transform:none}}
`;

  function 注入样式(文档) {
    if (文档.getElementById('ym-style')) return;
    const s = 文档.createElement('style');
    s.id = 'ym-style';
    s.textContent = 样式;
    (文档.head || 文档.documentElement).appendChild(s);
  }

  function 定位球() {
    if (!球) return;
    const { x, y } = 存.球位;
    if (x === null || y === null) { 球.style.right = '18px'; 球.style.bottom = '88px'; 球.style.left = ''; 球.style.top = ''; return; }
    球.style.left = (x * 100).toFixed(2) + '%';
    球.style.top = (y * 100).toFixed(2) + '%';
    球.style.right = ''; 球.style.bottom = '';
  }

  // 视口变了（转屏 / 软键盘 / 缩放）—— 归一化坐标按新视口重算，再夹进可见区。
  function 夹球() {
    if (!球) return;
    const { x, y } = 存.球位;
    if (x === null || y === null) return;
    const v = 视口();
    const left = Math.min(Math.max(0, x * v.w - 22), Math.max(0, v.w - 44));
    const top = Math.min(Math.max(0, y * v.h - 22), Math.max(0, v.h - 44));
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
    if (top < v.y + 8) top = Math.min(v.y + v.h - 高 - 8, r.bottom + 10);   // 上面放不下就翻到下面
    left = Math.max(v.x + 8, Math.min(v.x + v.w - 宽 - 8, left));
    窗.style.left = Math.round(left) + 'px';
    窗.style.top = Math.round(Math.max(v.y + 8, top)) + 'px';
    窗.style.right = ''; 窗.style.bottom = '';
  }

  // 开 / 关 / 收起 是三件事，别混成一个布尔值:
  //   关   = 整体隐藏（球再点一下、或 Esc）
  //   收起 = 只留抬头条，内容收进去（面板还开着）
  function 开窗() {
    if (!窗) return;
    if (关计时) { clearTimeout(关计时); 关计时 = null; }
    窗.hidden = false;
    定位窗();                      // ⚠ 必须在 hidden=false **之后** —— 藏着量不到真实高度
    void 窗.offsetWidth;           // 逼一次重排，否则过渡会从「已经是终态」开始，等于没有
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

  function 刷新UI(结果) {
    if (结果 && 结果.因) 当前因 = 结果.因;
    if (!窗) return;
    const 库 = 取曲库();
    const d = deck[当前];
    const 在放 = !!(d && d.src && !d.paused);

    const pb = 窗.querySelector('[data-ym=play]');
    if (pb) { pb.innerHTML = 在放 ? 图.暂停 : 图.播放; pb.setAttribute('aria-label', 在放 ? '暂停' : '播放'); }
    const mb = 窗.querySelector('[data-ym=mute]');
    if (mb) {
      mb.innerHTML = 存.静音 ? 图.静音 : 图.有声;
      if (mb.classList && mb.classList.toggle) mb.classList.toggle('ym-on', !!存.静音);
      mb.setAttribute('aria-pressed', String(!!存.静音));
      mb.setAttribute('aria-label', 存.静音 ? '取消静音' : '静音');
    }
    const vol = 窗.querySelector('[data-ym=vol]');
    // 正在拖音量条的时候别去覆盖它，否则手感是「拖不动」
    if (vol && 正在输入(vol) !== true) vol.value = String(Math.round(存.音量 * 100));

    // 🔴 抬头是**两层**：「正在放什么」和「哪条线哪一档」各占一行。
    //    v0.0.1 把两者塞进同一格 —— 谁最后刷新谁赢，于是同一首歌的标题会在
    //    「正在放: xxx」和「没有正在走的线，落默认档」之间来回跳。
    const now = 窗.querySelector('[data-ym=now]');
    if (now) now.textContent = 当前曲 ? ((在放 ? '正在放 · ' : '已暂停 · ') + 显示名(当前曲)) : '待命';
    const info = 窗.querySelector('[data-ym=info]');
    if (info) info.textContent = 当前因 || '待命';

    const cnt = 窗.querySelector('[data-ym=count]');
    if (cnt) { const n = 总曲数(库); cnt.textContent = n ? ' · ' + n : ''; }

    if (球 && 球.classList) {
      球.classList.toggle('ym-idle', !当前曲);
      球.classList.toggle('ym-playing', 在放);
    }
    const addto = 窗.querySelector('[data-ym=addto]');
    if (addto) addto.textContent = 手选档 || 线要的档 || 默认档;
    刷筹码(库);
    渲染面板(库);
  }

  function 正在输入(el) {
    try { return 取文档().activeElement === el; } catch (_) { return false; }
  }

  const 转义 = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ── 六个档的 chip ─────────────────────────────────────────────────────────
  //   默认停在「当前这条线要的那档」（带金下划线），玩家点过就听玩家的。
  //   两个状态分开表达: 选中 = aria-pressed（金色实底）；当前线 = ym-cur（金下划线）。
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
    const 选中 = 手选档 || 线要的档;
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

  // ── 曲目列表 ──────────────────────────────────────────────────────────────
  //   🔴 写进 `列表`（那个专门留的格子），**不是**写进 `面板`。
  //      v0.0.1 写的是 `面板` —— 而面板里还装着粘贴框和两个按钮，
  //      一渲染就把加歌表单自己抹了。这就是那条「加了一首歌后界面就没了」。
  function 渲染面板(库) {
    if (!列表 || !面板 || 面板.hidden) return;
    库 = 库 || 取曲库();
    const 选中 = 手选档 || 线要的档;
    const 段 = [];

    if (存.钉死.length) {
      段.push('<div class="ym-sec">钉死 <span>' + 存.钉死.length + '</span></div>');
      for (let i = 0; i < 存.钉死.length; i++) {
        const p = 存.钉死[i];
        const 描述 = (p.章节 || '(空)') + (p.节点 ? ' · ' + p.节点 : '') + ' → ' + 显示名(p.曲);
        段.push('<div class="ym-tr"><span class="ym-nm" title="' + 转义(描述) + '">' + 转义(描述) + '</span>' +
          '<button type="button" class="ym-x" data-ym=delpin data-i="' + i + '" aria-label="删掉这条钉死">' + 图.关闭 + '</button></div>');
      }
    }

    for (const 档 of 档名表) {
      const 池 = 库[档] || [];
      // 空档折叠 —— 六个「(0)」铺满面板，真正有内容的那一档反而被淹掉。
      //   但「当前线要的档」和「玩家手选的档」就算空着也要露出来，否则他不知道往哪加。
      if (!池.length && 档 !== 线要的档 && 档 !== 选中) continue;
      const 玩家 = 存.曲目[档] || [];
      段.push('<div class="ym-sec">' + 转义(档) + ' <span>' + 池.length + '</span>' +
        (档 === 线要的档 ? '<em>当前线</em>' : '') + '</div>');
      if (!池.length) {
        段.push('<div class="ym-empty">这一档还空着 —— 把链接粘到上面，点「加进「' + 转义(档) + '」」。</div>');
        continue;
      }
      for (const u of 池) {
        const 在放这首 = (u === 当前曲);
        段.push('<div class="ym-tr' + (在放这首 ? ' ym-now' : '') + '">' +
          '<span class="ym-nm" title="' + 转义(显示名(u)) + '">' + 转义(显示名(u)) + '</span>' +
          '<span class="ym-src">' + 转义(来源(u)) + '</span>' +
          (玩家.indexOf(u) >= 0
            ? '<button type="button" class="ym-x" data-ym=del data-档="' + 转义(档) + '" data-u="' + 转义(u) + '" aria-label="删掉这首">' + 图.关闭 + '</button>'
            : '') +
          '</div>');
      }
    }
    if (!段.length) 段.push('<div class="ym-empty">还没有曲子。把音频直链或网易云单曲链接粘到上面，一行一条。</div>');
    列表.innerHTML = 段.join('');
  }

  // ── 把玩家粘进来的文本拆成曲目 ────────────────────────────────────────────
  // 纯字符串处理，**不发任何网络请求** —— 所以它永不挂。
  // 一行一条。每行可以写成 `名字 | 链接`，也可以只写链接（自动起名）。
  // 能吃:
  //   ① 音频直链（.mp3 / .m4a / ...）
  //   ② 网易云单曲分享链接（`music.163.com/song?id=123` 之类）→ 提 ID → 拼外链直链
  //   ③ 光秃秃的一串数字 = 歌曲 ID → 同上
  // 🔴 网易云的 **VIP / 付费歌拿不到**（会 404），版权受限的也拿不到 —— 这是它的规矩，不是 bug。
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
      const k = 行.search(/[|｜]/);            // `名字 | 链接` —— 竖线两边是名字和链接
      if (k >= 0) {
        名 = 行.slice(0, k).trim();
        行 = 行.slice(k + 1).trim();
        if (!行) { 弃.push(原行.trim() + '（只有名字，没写链接）'); continue; }
      }
      // 一行里塞了多条链接（空格 / 逗号分隔）也认 —— 名字只给第一条
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

  // ── 建 UI ────────────────────────────────────────────────────────────────
  function 建UI() {
    const 文档 = 取文档();
    if (!文档 || !文档.body) return false;
    注入样式(文档);

    // 原生 <button>，不是 <div role=button> —— 键盘、读屏器、焦点环都靠它。
    球 = 文档.createElement('button');
    球.type = 'button';
    球.className = 'ym-ball';
    球.setAttribute('aria-label', '月痕音乐');
    球.setAttribute('aria-expanded', 'false');
    球.setAttribute('aria-controls', 'ym-win');
    球.title = '月痕音乐 —— 点一下解锁声音，再点开关面板';
    球.innerHTML = '<span class="ym-note">' + 图.音符 + '</span>' + 图.等化;

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
          <span class="ym-now" data-ym=now>待命</span>
          <span class="ym-sub" data-ym=info></span>
        </span>
        <button type="button" class="ym-ic" data-ym=collapse aria-expanded="false" aria-controls="ym-body" aria-label="收起面板">${图.展开}</button>
        <button type="button" class="ym-ic" data-ym=close aria-label="关闭面板">${图.关闭}</button>
      </div>
      <div class="ym-body" id="ym-body" data-ym=body>
        <div class="ym-row">
          <button type="button" class="ym-btn" data-ym=prev aria-label="上一首">${图.上一首}</button>
          <button type="button" class="ym-btn ym-main" data-ym=play aria-label="播放">${图.播放}</button>
          <button type="button" class="ym-btn" data-ym=next aria-label="下一首">${图.下一首}</button>
          <button type="button" class="ym-btn" data-ym=mute aria-label="静音" aria-pressed="false">${图.有声}</button>
          <input class="ym-range" data-ym=vol type="range" min="0" max="100" step="1" value="${Math.round(存.音量 * 100)}" aria-label="音量">
        </div>
        <button type="button" class="ym-tab" data-ym=toggle-pane aria-expanded="false" aria-controls="ym-pane">
          <span>曲目</span><span class="ym-count" data-ym=count></span>
          <span class="ym-chev" aria-hidden="true">${图.展开}</span>
        </button>
        <div class="ym-pane" id="ym-pane" data-ym=pane hidden>
          <div class="ym-chips" data-ym=chips role="group" aria-label="加进哪一档"></div>
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

    if (抬头图) { try { 窗.style.setProperty('--ym-head-img', 'url("' + 抬头图 + '")'); } catch (_) {} }

    文档.body.appendChild(球);
    文档.body.appendChild(窗);
    定位球();
    建筹码();
    绑事件(文档);
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

  let 键监听 = null;
  function 绑事件(文档) {
    // ── 球: 拖动 or 点击 ──────────────────────────────────────────────────
    //   pointerdown → 超过阈值才算拖 → pointerup 落位；没动过就是点击。
    //   `pointercancel` 也要收尾 —— 否则拖动状态会挂住，球粘在指针上。
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
      const 边 = 44;
      球.style.left = Math.round(Math.max(v.x, Math.min(v.x + v.w - 边, e.clientX - 边 / 2))) + 'px';
      球.style.top = Math.round(Math.max(v.y, Math.min(v.y + v.h - 边, e.clientY - 边 / 2))) + 'px';
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
      if (k === 'prev') { 解锁(); 上一首(); }
      else if (k === 'play') { 解锁(); 暂停切换(); }
      else if (k === 'next') { 解锁(); 下一首(); }     // 和自动续播同一条路，不再「重新随机」
      else if (k === 'mute') {
        存.静音 = !存.静音; 写存储();
        应用音量(deck[0]); 应用音量(deck[1]); 刷新UI(null);
      }
      else if (k === 'collapse') 收起(!收起中);
      else if (k === 'close') 关窗(true);
      else if (k === 'toggle-pane') {
        面板.hidden = !面板.hidden;
        b.setAttribute('aria-expanded', String(!面板.hidden));
        if (!面板.hidden) { 定位窗(); 渲染面板(); }   // 🔴 打开就得渲染一次 —— 光切 hidden 列表是空的
      }
      else if (k === 'pick') {
        手选档 = b.getAttribute('data-档');
        刷新UI(null);
      }
      else if (k === 'add') 加曲(false);
      else if (k === 'addpin') 加曲(true);
      else if (k === 'del') {
        const 档 = b.getAttribute('data-档'), u = b.getAttribute('data-u');
        存.曲目[档] = (存.曲目[档] || []).filter(x => x !== u);
        清理名字(u);
        写存储(); 刷新UI(null);
      }
      else if (k === 'delpin') {
        存.钉死.splice(Number(b.getAttribute('data-i')) || 0, 1);
        写存储(); 刷新UI(null);
      }
    });

    窗.addEventListener('input', (e) => {
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute('data-ym') === 'vol') {
        存.音量 = Math.max(0, Math.min(1, Number(t.value) / 100));
        写存储();
        应用音量(deck[0]); 应用音量(deck[1]);
      }
    });

    // Esc 关窗。⚠ 不 preventDefault、不 stopPropagation —— 别把 ST 自己的模态框的 Esc 吞掉。
    键监听 = (e) => {
      if (e.defaultPrevented) return;
      if (e.key !== 'Escape' || !窗 || 窗.hidden) return;
      关窗(true);
    };
    文档.addEventListener('keydown', 键监听);
  }

  // 删掉一首之后，如果没有任何一档还引用这个链接，名字也一起收掉（别攒孤儿）
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
      //    也就是一条永远不会命中的死条目 —— 与其偷偷塞一条废物进去，不如当场说清楚。
      if (!词) { 说(提示, '钉死得先写章节关键词 —— 空关键词一条都不会命中', true); return; }
      try { new RegExp(词); } catch (_) { 说(提示, '这个关键词不是合法的正则（比如括号没配对）', true); return; }
      for (const x of 得) 存.钉死.push({ 章节: 词, 节点: '', 曲: x.u });
      写存储();
      ta.value = '';
      说(提示, '加了 ' + 得.length + ' 条钉死：章节名里含「' + 词 + '」时放它');
      刷新UI(null);
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
    刷新UI(null);
  }

  function 点球() {
    解锁();   // 🔴 必须在点击的同步栈里 —— 这是唯一能解锁的时机
    if (!窗) return;
    if (窗.hidden) 开窗(); else 关窗(false);
  }

  // ══ 10. 生命周期 ══════════════════════════════════════════════════════════
  function 销毁() {
    if (已销毁) return;
    已销毁 = true;                       // 🔴 先立旗 —— 旧的 MVU 订阅还在，迟到的回调不许再碰 deck
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

    // 单例: 重载时先把旧的那份收掉，否则会两份一起放
    try {
      const 旧 = 宿主[RUNTIME_KEY];
      if (旧 && 旧.版本 === 版本 && typeof 旧.destroy === 'function') 旧.destroy();
    } catch (_) {}

    deck = [造deck(), 造deck()];

    if (!建UI()) {
      // 文档还没准备好 —— 等它
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
    // 变量事件订不上也不能躺平 —— 留一个手动/兜底入口
    if (!订阅成功) console.warn('[月痕音乐] 订不上 MVU 事件 —— 切曲只能手动，或等页面重载');

    try {
      宿主[RUNTIME_KEY] = { 版本, destroy: 销毁, 刷新: () => 换曲() };
    } catch (_) {}

    // 开局先选一次（此时多半还没解锁，曲子备好但不出声 —— 这是预期）
    换曲();
  }

  启动();
})();

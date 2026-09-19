// ============================================================================
// 月痕之民 · 音乐播放器
//   版本 v0.0.1
//   ⚠ 身份 = **预备**。这个文件写好了，但**没推托管、没装卡** —— 那是两道单独的闸门。
//     装卡时只往 `tavern_helper.scripts` 加第 3 条，`content` 是一行 `import`：
//       import 'https://cdn.jsdelivr.net/gh/ZIMOJUNA/114514@main/月痕之民_音乐v0.0.1.js';
//
// ── 它做什么 ────────────────────────────────────────────────────────────────
//   跟着事件链放音乐：读 MVU 的 `世界.主线` → 找正在走的那条线 → 看它的 `配乐` 格
//   （六档: 日常 / 紧张 / 战斗 / 悲恸 / 凯旋 / 静谧）→ 从曲目表挑一首放。
//   作者内置的曲子、玩家自填的链接、网易云直链，走的是同一条路，悬浮窗对它们一视同仁。
//
// ── 它不做什么 ──────────────────────────────────────────────────────────────
//   ✗ 不做音效 —— 本卡没有战斗实时演算，没地方挂
//   ✗ 不做 TTS（念白）—— 跟音乐是两条路
//   ✗ 不动 ST 原生的 Dynamic Audio 扩展
//   ✗ 不做「模型在正文里出 <bgm> 标记」那套 —— 选曲只认变量里的 `配乐` 格
//   ✗ 不上传、不转码、不代理任何音频 —— 只放 URL
//
// ── 🔴 三条必须写进说明书的限制（不是 bug，是浏览器的规矩）──────────────────
//   ① 浏览器不许「没被用户点过」的页面自动出声。⇒ 玩家先点一下悬浮球（解锁），
//      之后切曲才会自动跟。没解锁之前，曲子备好了也不会响。
//   ② 音频文件现在**一个都没有** —— 曲目表默认全空。播放器静默待命，不报错。
//      作者传了音频、或玩家自填了链接，它才开始出声。
//   ③ 切曲的时刻取决于 MVU 的变量什么时候落地。本脚本监听的是 MVU 的
//      `mag_variable_update_ended`（变量写完之后），**不是**消息渲染 ——
//      具体会不会慢一轮，**要真机才知道**，未验证。
//
// ── 🔴 两条红线 ─────────────────────────────────────────────────────────────
//   `_` 与 `z` 是酒馆助手注入的全局量，本文件**不 import**（另引会出现三实例地雷）。
//   本文件不 import 任何东西。
// ============================================================================

(function () {
  'use strict';

  // ══ 0. 常量 ═══════════════════════════════════════════════════════════════
  const 版本 = 'v0.0.1';
  const RUNTIME_KEY = '__yuehenMusicRuntime__';  // 单例键（挂在宿主窗口上）
  const LS_KEY = 'yuehen_music_v1';
  const LS_版本 = 1;                             // 存储结构版本 —— 对不上就当没存过，不猜
  const FADE_MS = 700;                           // 交叉淡入淡出时长
  const 档名表 = ['日常', '紧张', '战斗', '悲恸', '凯旋', '静谧'];
  const 默认档 = '日常';
  const 音量默认 = 0.5;
  const 拖动阈值 = 6;                            // px —— 超过它才算拖动，否则算点击
  const 同步去抖 = 200;                          // ms —— 变量事件可能连发，攒一下再选曲
  const 音频后缀 = /\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|webm)(\?|#|$)/i;

  // ══ 1. 内置层（作者填）════════════════════════════════════════════════════
  // 音频文件的 CDN 前缀。曲目表里写文件名，拼起来就是完整地址。
  // ⚠ 现在留空 —— 音频一个都还没有（放哪也还没定，见 `扩展规划.md` §1.11）。
  //   填了它、再往 TRACKS 里写文件名，内置曲才生效。
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
  //   `章节` 命中 且（`节点` 为 null 或也命中）⇒ 用这一首。
  // 🔴 键写成**正则**而不是章名 —— 只认关键词，**不预设任何具体剧情**。
  //    写成 '终章·创世神' 那种就等于把终局的名字定死了，跟「不许定死现有内容」顶着。
  // ⚠ 这也正是「章节名格式必须写死」的第二个理由: 钉死表靠章节名当键，名字飘了表就失效。
  const PINNED = [];

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
  // ⚠ 这条路径**未在月痕真机上验证过**（`C1` 是别的卡生产验证过的）。
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

  // ══ 4. 存储 ═══════════════════════════════════════════════════════════════
  // 音量 / 静音 / 悬浮球位置 / 玩家自填曲目 —— 全在 localStorage，**不进卡**。
  // 读的时候三道保险: try/catch（隐私模式会抛）· 版本校验（结构变了就当没存过）· 逐项夹取。
  const 空存储 = () => ({
    版本: LS_版本,
    音量: 音量默认,
    静音: false,
    球位: { x: null, y: null },
    曲目: {},
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
      out.球位.x = o.球位.x === null ? null : 夹(o.球位.x, 0, 1, null);
      out.球位.y = o.球位.y === null ? null : 夹(o.球位.y, 0, 1, null);
    }
    if (o.曲目 && typeof o.曲目 === 'object') {
      for (const 档 of 档名表) {
        const a = o.曲目[档];
        if (Array.isArray(a)) out.曲目[档] = a.filter(u => typeof u === 'string' && u.trim()).slice(0, 200);
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
  let 同步计时 = null;
  // 加载失败的曲子记在这儿，本次会话里不再选它。
  // 🔴 必须有: 网易云的 VIP / 付费歌会 404（见文件头的说明）。不记的话
  //    「失败 → 换一首 → 又选中它 → 又失败」会变成一个无限重试的圈，
  //    而且每圈都在做淡入淡出，玩家看到的是一抽一抽的播放器。
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
  // 这条只能兜底: `play()` 带 promise 的调用点多数不在用户手势里。
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

  function 换曲(强制) {
    const r = 选曲();
    if (!r.曲) { 刷新UI(r); return; }
    // `强制` 只给「玩家亲手点的」用 —— 变量驱动的换曲遇到同一首就让它继续放着，
    // 别每轮都从头再来一遍。
    if (r.曲 === 当前曲 && !强制) { 刷新UI(r); return; }
    当前曲 = r.曲;
    当前档 = r.档;

    const 旧 = deck[当前];
    当前 = 1 - 当前;
    const 新 = deck[当前];
    try {
      新.src = r.曲;
      新.currentTime = 0;
      新._lvl = 0;
      应用音量(新);
    } catch (_) {}

    const 开播 = () => {
      const p = 新.play();
      if (p && p.catch) p.catch(() => 挂手势兜底());
    };
    if (旧 && 旧.src && !旧.paused) 淡到(旧, 0, FADE_MS, () => { try { 旧.pause(); } catch (_) {} 开播(); 淡到(新, 1, FADE_MS); });
    else { 开播(); 淡到(新, 1, FADE_MS); }

    刷新UI(r);
  }

  // 上/下一首走的是**当前档里的顺序**，不是在整库里重新随机 ——
  // 玩家点了「下一首」，期待的是「这一档的下一首」，不是「换一首别的」。
  function 步进(方向) {
    const 库 = 取曲库();
    const 档 = (当前档 && 可用(库, 当前档).length) ? 当前档 : 默认档;
    const 池 = 可用(库, 档);
    if (!池.length) return;
    const i = 池.indexOf(当前曲);
    const j = i < 0 ? 0 : (i + 方向 + 池.length) % 池.length;
    当前曲 = null;   // 先清掉 —— 否则 `播指定` 会把「同一首」当成要跳过的
    播指定(池[j], 档);
  }
  const 上一首 = () => 步进(-1);
  const 下一首 = () => 步进(1);

  function 播指定(u, 档) {
    if (u === 当前曲) return;
    当前曲 = u; 当前档 = 档 || 当前档;
    const 旧 = deck[当前];
    当前 = 1 - 当前;
    const 新 = deck[当前];
    try { 新.src = u; 新.currentTime = 0; 新._lvl = 0; 应用音量(新); } catch (_) {}
    const 开播 = () => { const p = 新.play(); if (p && p.catch) p.catch(() => 挂手势兜底()); };
    if (旧 && 旧.src && !旧.paused) 淡到(旧, 0, FADE_MS, () => { try { 旧.pause(); } catch (_) {} 开播(); 淡到(新, 1, FADE_MS); });
    else { 开播(); 淡到(新, 1, FADE_MS); }
    刷新UI(null);
  }

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
    if (同步计时) clearTimeout(同步计时);
    同步计时 = setTimeout(() => { 同步计时 = null; 换曲(false); }, 同步去抖);
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
  let 球 = null, 窗 = null, 面板 = null;

  const 样式 = `
.ym-ball{position:fixed;z-index:2147483000;width:44px;height:44px;border-radius:50%;
  background:rgba(28,30,38,.86);border:1px solid rgba(255,255,255,.18);color:#e8e6e0;
  font:16px/1 system-ui,sans-serif;display:flex;align-items:center;justify-content:center;
  cursor:pointer;touch-action:none;user-select:none;backdrop-filter:blur(6px);
  box-shadow:0 4px 16px rgba(0,0,0,.35);transition:transform .18s ease,opacity .18s ease}
.ym-ball:hover{transform:scale(1.06)}
.ym-ball:focus-visible{outline:2px solid #c9b477;outline-offset:2px}
.ym-ball.ym-idle{opacity:.35}
.ym-win{position:fixed;z-index:2147483001;width:268px;padding:12px;border-radius:14px;
  background:rgba(24,26,33,.94);border:1px solid rgba(255,255,255,.16);color:#e8e6e0;
  font:13px/1.5 system-ui,sans-serif;backdrop-filter:blur(10px);
  box-shadow:0 10px 34px rgba(0,0,0,.45);transition:opacity .18s ease,transform .18s ease}
.ym-win[hidden]{display:none}
.ym-row{display:flex;align-items:center;gap:8px;margin-top:9px}
.ym-row:first-child{margin-top:0}
.ym-btn{flex:0 0 auto;min-width:34px;height:30px;padding:0 9px;border-radius:8px;cursor:pointer;
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#e8e6e0;
  font:13px/1 system-ui,sans-serif}
.ym-btn:hover{background:rgba(255,255,255,.15)}
.ym-btn:focus-visible{outline:2px solid #c9b477;outline-offset:2px}
.ym-btn.ym-on{background:rgba(201,180,119,.28);border-color:rgba(201,180,119,.6)}
.ym-btn[disabled]{opacity:.4;cursor:default}
.ym-info{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  color:#b9b5aa;font-size:12px}
.ym-title{font-size:12px;letter-spacing:.06em;color:#c9b477;text-transform:uppercase}
.ym-range{flex:1 1 auto;min-width:0;accent-color:#c9b477}
.ym-ta{width:100%;box-sizing:border-box;height:88px;margin-top:8px;padding:7px;border-radius:8px;
  background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.16);color:#e8e6e0;
  font:12px/1.45 ui-monospace,monospace;resize:vertical}
.ym-hint{margin-top:7px;color:#8f8b81;font-size:11px;line-height:1.5}
.ym-pane{margin-top:10px;max-height:190px;overflow:auto}
.ym-track{display:flex;align-items:center;gap:6px;padding:3px 0;font-size:11px;color:#b9b5aa}
.ym-track span{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ym-x{flex:0 0 auto;cursor:pointer;color:#8f8b81;background:none;border:0;font-size:13px;padding:0 3px}
.ym-x:hover{color:#e0857f}
.ym-档{color:#c9b477;font-size:11px;margin-top:7px}
@media (prefers-reduced-motion: reduce){.ym-ball,.ym-win{transition:none}}
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

  function 定位窗() {
    if (!窗 || !球) return;
    const 文档 = 取文档();
    const w = (文档.defaultView || 宿主).innerWidth || 360;
    const h = (文档.defaultView || 宿主).innerHeight || 640;
    const r = 球.getBoundingClientRect();
    const 宽 = 268, 高 = 窗.offsetHeight || 200;
    let left = r.left + r.width / 2 - 宽 / 2;
    let top = r.top - 高 - 10;
    if (top < 8) top = Math.min(h - 高 - 8, r.bottom + 10);
    left = Math.max(8, Math.min(w - 宽 - 8, left));
    窗.style.left = left + 'px'; 窗.style.top = Math.max(8, top) + 'px';
    窗.style.right = ''; 窗.style.bottom = '';
  }

  function 刷新UI(结果) {
    if (!窗) return;
    const d = deck[当前];
    const 在放 = !!(d && d.src && !d.paused);
    窗.querySelector('[data-ym=play]').textContent = 在放 ? '❚❚' : '▶';
    窗.querySelector('[data-ym=play]').setAttribute('aria-label', 在放 ? '暂停' : '播放');
    窗.querySelector('[data-ym=mute]').classList.toggle('ym-on', !!存.静音);
    窗.querySelector('[data-ym=mute]').setAttribute('aria-pressed', String(!!存.静音));
    const vol = 窗.querySelector('[data-ym=vol]');
    // 正在拖音量条的时候别去覆盖它，否则手感是「拖不动」
    if (vol && 正在输入(vol) !== true) vol.value = String(Math.round(存.音量 * 100));
    const info = 窗.querySelector('[data-ym=info]');
    if (结果) info.textContent = 结果.因;
    else if (当前曲) info.textContent = (在放 ? '正在放: ' : '已暂停: ') + 尾名(当前曲) + (当前档 ? '（' + 当前档 + '）' : '（钉死）');
    else info.textContent = '待命';
    球.classList.toggle('ym-idle', !当前曲);
    渲染面板();
  }

  function 正在输入(el) {
    try { return 取文档().activeElement === el; } catch (_) { return false; }
  }

  const 尾名 = (u) => { try { return decodeURIComponent(String(u).split('/').pop().split('?')[0]).slice(0, 40); } catch (_) { return String(u).slice(-40); } };

  function 渲染面板() {
    if (!面板 || 面板.hidden) return;
    const 库 = 取曲库();
    const 行 = [];
    for (const 档 of 档名表) {
      const 池 = 库[档] || [];
      行.push('<div class="ym-档">' + 档 + '（' + 池.length + '）</div>');
      for (const u of 池) {
        行.push('<div class="ym-track"><span title="' + 转义(u) + '">' + 转义(尾名(u)) + '</span>' +
          (存.曲目[档] && 存.曲目[档].indexOf(u) >= 0 ? '<button class="ym-x" data-ym=del data-档="' + 档 + '" data-u="' + 转义(u) + '" aria-label="删掉这首">✕</button>' : '') +
          '</div>');
      }
    }
    if (存.钉死.length) {
      行.push('<div class="ym-档">钉死（' + 存.钉死.length + '）</div>');
      for (let i = 0; i < 存.钉死.length; i++) {
        const p = 存.钉死[i];
        行.push('<div class="ym-track"><span title="' + 转义(p.曲) + '">' + 转义(p.章节 || '(任意)') + (p.节点 ? ' · ' + 转义(p.节点) : '') + ' → ' + 转义(尾名(p.曲)) + '</span>' +
          '<button class="ym-x" data-ym=delpin data-i="' + i + '" aria-label="删掉这条">✕</button></div>');
      }
    }
    if (!行.length) 行.push('<div class="ym-hint">还没有曲子。把音频直链粘到上面那个框里，一行一条。</div>');
    面板.innerHTML = 行.join('');
  }

  const 转义 = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ── 把玩家粘进来的文本拆成曲目 ────────────────────────────────────────────
  // 纯字符串处理，**不发任何网络请求** —— 所以它永不挂。
  // 能吃三种:
  //   ① 音频直链（.mp3 / .m4a / ...）
  //   ② 网易云单曲分享链接（`music.163.com/song?id=123` 之类）→ 提 ID → 拼外链直链
  //   ③ 光秃秃的一串数字 = 歌曲 ID → 同上
  // 🔴 网易云的 **VIP / 付费歌拿不到**（会 404），版权受限的也拿不到 —— 这是它的规矩，不是 bug。
  // 🔴 歌单链接（`playlist?id=`）**拆不了** —— 那要读网易云的接口，而浏览器不许网页读别家数据
  //    （同源策略）。想放整个歌单，得逐首粘。
  const 网易外链 = (id) => 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3';

  function 拆曲目(文本) {
    const 得 = [], 弃 = [];
    const 块 = String(文本 || '').split(/[\s,，、;；]+/).map(s => s.trim()).filter(Boolean);
    for (const t of 块) {
      if (/^https?:\/\//i.test(t)) {
        if (音频后缀.test(t)) { 得.push(t); continue; }
        // 🔴 歌单 / 专辑 / 歌手页**必须先挡** —— 它们的 `?id=` 长得跟单曲一模一样，
        //    先提 ID 的话 `playlist?id=999` 会被当成歌曲 999，放出来是 404。
        if (/[?&#/](playlist|album|toplist|artist)/i.test(t)) { 弃.push(t + '（歌单 / 专辑 / 歌手页 —— 拆不了，得逐首粘）'); continue; }
        const m = t.match(/(?:song|program)\D{0,12}?id=(\d+)/i) || t.match(/[?&#/]id=(\d+)/);
        if (m) { 得.push(网易外链(m[1])); continue; }
        弃.push(t + '（看不出是音频直链）');
        continue;
      }
      if (/^\d{5,}$/.test(t)) { 得.push(网易外链(t)); continue; }
      弃.push(t + '（认不出来）');
    }
    return { 得: Array.from(new Set(得)), 弃 };
  }

  // ── 建 UI ────────────────────────────────────────────────────────────────
  function 建UI() {
    const 文档 = 取文档();
    if (!文档 || !文档.body) return false;
    注入样式(文档);

    球 = 文档.createElement('div');
    球.className = 'ym-ball';
    球.setAttribute('role', 'button');
    球.setAttribute('tabindex', '0');
    球.setAttribute('aria-label', '月痕音乐 —— 点一下解锁声音，再点开关面板');
    球.textContent = '♪';
    球.title = '月痕音乐';

    窗 = 文档.createElement('div');
    窗.className = 'ym-win';
    窗.hidden = true;
    窗.setAttribute('role', 'dialog');
    窗.setAttribute('aria-label', '月痕音乐播放器');
    窗.innerHTML = `
      <div class="ym-row"><span class="ym-title">月痕音乐</span>
        <span class="ym-info" data-ym=info>待命</span></div>
      <div class="ym-row">
        <button class="ym-btn" data-ym=prev aria-label="上一首">⏮</button>
        <button class="ym-btn" data-ym=play aria-label="播放">▶</button>
        <button class="ym-btn" data-ym=next aria-label="下一首">⏭</button>
        <button class="ym-btn" data-ym=mute aria-label="静音" aria-pressed="false">🔇</button>
        <input class="ym-range" data-ym=vol type="range" min="0" max="100" value="${Math.round(存.音量 * 100)}" aria-label="音量">
      </div>
      <div class="ym-row"><button class="ym-btn" data-ym=toggle-pane aria-expanded="false">曲目</button>
        <span class="ym-info" data-ym=hint></span></div>
      <div class="ym-pane" data-ym=pane hidden>
        <textarea class="ym-ta" data-ym=ta aria-label="粘贴音频直链，一行一条"
          placeholder="一行一条：音频直链，或网易云单曲链接 / 歌曲 ID"></textarea>
        <div class="ym-row"><button class="ym-btn" data-ym=add>加进去</button>
          <button class="ym-btn" data-ym=addpin>加成钉死</button>
          <span class="ym-info" data-ym=parse></span></div>
        <div data-ym=list></div>
      </div>`;
    面板 = 窗.querySelector('[data-ym=pane]');

    文档.body.appendChild(球);
    文档.body.appendChild(窗);
    定位球();
    绑事件(文档);
    刷新UI(null);
    return true;
  }

  function 绑事件(文档) {
    // ── 球: 拖动 or 点击 ──────────────────────────────────────────────────
    let 按下 = null, 动过 = false;
    球.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      按下 = { x: e.clientX, y: e.clientY, t: Date.now() };
      动过 = false;
      try { 球.setPointerCapture(e.pointerId); } catch (_) {}
    });
    球.addEventListener('pointermove', (e) => {
      if (!按下) return;
      const dx = e.clientX - 按下.x, dy = e.clientY - 按下.y;
      if (!动过 && Math.hypot(dx, dy) < 拖动阈值) return;
      动过 = true;
      const w = 文档.defaultView || 宿主;
      球.style.left = Math.max(0, Math.min(w.innerWidth - 44, e.clientX - 22)) + 'px';
      球.style.top = Math.max(0, Math.min(w.innerHeight - 44, e.clientY - 22)) + 'px';
      球.style.right = ''; 球.style.bottom = '';
    });
    // pointercancel 也要收尾 —— 否则拖动状态会挂住，球粘在指针上
    const 收尾 = (e, 落位) => {
      if (!按下) return;
      const 是点击 = !动过 && Date.now() - 按下.t < 600;
      按下 = null;
      try { 球.releasePointerCapture(e.pointerId); } catch (_) {}
      if (落位 && 动过) {
        const w = 文档.defaultView || 宿主;
        const r = 球.getBoundingClientRect();
        存.球位.x = Math.max(0, Math.min(1, (r.left + 22) / (w.innerWidth || 1)));
        存.球位.y = Math.max(0, Math.min(1, (r.top + 22) / (w.innerHeight || 1)));
        写存储();
      }
      if (是点击) 点球();
    };
    球.addEventListener('pointerup', (e) => 收尾(e, true));
    球.addEventListener('pointercancel', (e) => 收尾(e, false));
    球.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); 点球(); }
    });

    // ── 窗 ────────────────────────────────────────────────────────────────
    窗.addEventListener('click', (e) => {
      const b = e.target.closest ? e.target.closest('[data-ym]') : null;
      if (!b) return;
      const k = b.getAttribute('data-ym');
      if (k === 'prev') { 解锁(); 上一首(); }
      else if (k === 'play') { 解锁(); 暂停切换(); }
      else if (k === 'next') { 解锁(); 换曲(true); }
      else if (k === 'mute') { 存.静音 = !存.静音; 写存储(); 应用音量(deck[0]); 应用音量(deck[1]); 刷新UI(null); }
      else if (k === 'toggle-pane') {
        面板.hidden = !面板.hidden;
        b.setAttribute('aria-expanded', String(!面板.hidden));
        定位窗();
      }
      else if (k === 'add') 加曲(false);
      else if (k === 'addpin') 加曲(true);
      else if (k === 'del') {
        const 档 = b.getAttribute('data-档'), u = b.getAttribute('data-u');
        存.曲目[档] = (存.曲目[档] || []).filter(x => x !== u);
        写存储(); 刷新UI(null);
      }
      else if (k === 'delpin') {
        存.钉死.splice(Number(b.getAttribute('data-i')) || 0, 1);
        写存储(); 刷新UI(null);
      }
    });

    窗.addEventListener('input', (e) => {
      if (e.target.getAttribute && e.target.getAttribute('data-ym') === 'vol') {
        存.音量 = Math.max(0, Math.min(1, Number(e.target.value) / 100));
        写存储();
        应用音量(deck[0]); 应用音量(deck[1]);
      }
    });

    // Esc 关窗
    文档.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && 窗 && !窗.hidden) { 窗.hidden = true; }
    });
  }

  function 加曲(当钉死) {
    const ta = 窗.querySelector('[data-ym=ta]');
    const 提示 = 窗.querySelector('[data-ym=parse]');
    const { 得, 弃 } = 拆曲目(ta.value);
    if (!得.length) {
      提示.textContent = 弃.length ? '一条都没认出来' : '框是空的';
      return;
    }
    if (当钉死) {
      for (const u of 得) 存.钉死.push({ 章节: '', 节点: '', 曲: u });
      提示.textContent = '加了 ' + 得.length + ' 条钉死（章节留空了 —— 现在它对所有章节都命中，去 localStorage 里填关键词）';
    } else {
      // 加进**这条线要的那一档**（`目标档`），不是正在放的那一首借来的档
      const 档 = 选曲().目标档 || 默认档;
      存.曲目[档] = (存.曲目[档] || []).concat(得);
      提示.textContent = '加进「' + 档 + '」档 ' + 得.length + ' 首' + (弃.length ? ' · 跳过 ' + 弃.length + ' 条' : '');
    }
    写存储();
    ta.value = '';
    刷新UI(null);
  }

  function 点球() {
    解锁();   // 🔴 必须在点击的同步栈里 —— 这是唯一能解锁的时机
    if (!窗) return;
    窗.hidden = !窗.hidden;
    if (!窗.hidden) { 定位窗(); 刷新UI(null); }
  }

  // ══ 10. 生命周期 ══════════════════════════════════════════════════════════
  function 销毁() {
    try { if (同步计时) clearTimeout(同步计时); } catch (_) {}
    for (const d of deck) { try { d.pause(); d.src = ''; } catch (_) {} }
    deck = [null, null];
    try { if (球 && 球.parentNode) 球.parentNode.removeChild(球); } catch (_) {}
    try { if (窗 && 窗.parentNode) 窗.parentNode.removeChild(窗); } catch (_) {}
    try { const s = 取文档().getElementById('ym-style'); if (s && s.parentNode) s.parentNode.removeChild(s); } catch (_) {}
    球 = 窗 = 面板 = null;
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

    const 订阅成功 = 订阅变量();
    // 变量事件订不上也不能躺平 —— 留一个手动/兜底入口
    if (!订阅成功) console.warn('[月痕音乐] 订不上 MVU 事件 —— 切曲只能手动，或等页面重载');

    try {
      宿主[RUNTIME_KEY] = { 版本, destroy: 销毁, 刷新: () => 换曲(false) };
    } catch (_) {}

    // 开局先选一次（此时多半还没解锁，曲子备好但不出声 —— 这是预期）
    换曲(false);
  }

  启动();
})();

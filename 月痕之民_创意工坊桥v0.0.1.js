/**
 * 月痕之民 · 创意工坊 —— 卡内桥 v0.0.1
 *
 * 卡里第 6 条 TH 脚本 import 本文件（卡外托管 D86）。
 * 规格：《卡内桥_方案.md》§4（安全）· §5（协议）· §6.2（canonical）· §7（安装事务）。
 * 铁律：本文件只写「当前聊天的世界书条目」，绝不碰 MVU 变量、绝不发消息、绝不越出 WS.origin。
 */
(() => {
  'use strict';

  // ---- 常量 ----
  const BRIDGE_VERSION = '0.0.1';
  const RUNTIME_KEY = '__yuehen_workshop_bridge__';
  const WORKSHOP_ORIGIN = 'https://yuehen-workshop.ywl2007128.workers.dev';
  const WORKSHOP_ORIGINS = [WORKSHOP_ORIGIN];
  const CARD_SCOPE = 'yuehen-zhimin';
  const TEXT_FORMAT = 'yuehen-wf-v1';
  const MAX_ENTRY_CHARS = 20000;
  const ENTRY_PREFIX = '[创意工坊][世界因子]';
  const META_KEY = 'yuehenWorkshop';
  const META_SOURCE = 'yuehen-workshop';
  const META_KIND = 'workshop_package';
  const CAPABILITIES = ['handshake', 'getContext', 'getEntries', 'upsertWorkshopEntries'];
  const ALLOWED_PACKAGE_TYPES = ['world_factor'];
  const ENTRY_ORDER_BASE = 900;
  const ENTRY_POSITION = { type: 'at_depth', role: 'system', depth: 3 };
  const WB_TIMEOUT_MS = 15000;
  const BUTTON_NAME = '打开创意工坊';
  const CHAT_CHANGED_EVENT = 'chat_id_changed';
  const OVERLAY_ID = 'yhws-root';
  const FRAME_ID = 'yhws-frame';

  // ---- 错误 ----
  class BridgeError extends Error {
    constructor(code, message) {
      super(message);
      this.code = code;
    }
  }

  const fail = (code, message) => {
    throw new BridgeError(code, message);
  };

  // ---- 纯函数：UTF-8 / SHA-256（自带实现，不依赖 crypto.subtle 的安全上下文）----
  const SHA256_K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);

  const rotr = (x, n) => ((x >>> n) | (x << (32 - n))) >>> 0;

  /** sha256(utf8(text)) → 64 位小写 hex，不带前缀（E5 §6.1 格式） */
  function sha256Hex(text) {
    const bytes = new TextEncoder().encode(String(text));
    const bitLength = bytes.length * 8;
    const padded = new Uint8Array((((bytes.length + 8) >> 6) + 1) << 6);
    padded.set(bytes);
    padded[bytes.length] = 0x80;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 8, Math.floor(bitLength / 0x100000000));
    view.setUint32(padded.length - 4, bitLength >>> 0);

    const H = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
    const w = new Uint32Array(64);

    for (let offset = 0; offset < padded.length; offset += 64) {
      for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4);
      for (let i = 16; i < 64; i++) {
        const x = w[i - 15];
        const y = w[i - 2];
        const s0 = (rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3)) >>> 0;
        const s1 = (rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10)) >>> 0;
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let i = 0; i < 64; i++) {
        const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
        const ch = ((e & f) ^ (~e & g)) >>> 0;
        const t1 = (h + S1 + ch + SHA256_K[i] + w[i]) >>> 0;
        const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
        const maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
        const t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0;
        d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    let hex = '';
    for (let i = 0; i < 8; i++) hex += H[i].toString(16).padStart(8, '0');
    return hex;
  }

  // ---- 纯函数：包 → 正文 / 身份 / 分类 ----
  /** v1 只支持 world_factor：一包一条，多因子合并（页面侧同一份实现，测试向量对齐） */
  function packageToWorldbookText(pkg) {
    const factors = pkg && pkg.payload && Array.isArray(pkg.payload.worldFactors) ? pkg.payload.worldFactors : [];
    return factors.map((factor) => `【${factor.title}】\n${factor.content}`).join('\n\n');
  }

  function packageIdentity(pkg) {
    const payload = (pkg && pkg.payload) || {};
    return {
      packageId: String((pkg && pkg.id) || ''),
      packageType: String((pkg && pkg.type) || ''),
      packageTarget: String(payload.target || (pkg && pkg.packageTarget) || (pkg && pkg.type) || ''),
    };
  }

  /** 只认我们自己写的桶；别人的 extra 一律不外发 */
  function entryMeta(entry) {
    const meta = entry && entry.extra ? entry.extra[META_KEY] : null;
    if (!meta || meta.source !== META_SOURCE || meta.kind !== META_KIND) return null;
    return meta;
  }

  function isSamePackage(entry, identity) {
    const meta = entryMeta(entry);
    return (
      Boolean(meta) &&
      meta.packageId === identity.packageId &&
      meta.packageType === identity.packageType &&
      meta.packageTarget === identity.packageTarget
    );
  }

  /** 'managed' 本包条目 · 'collision' 同名但不是本包 · 'other' 无关条目 */
  function classifyEntry(entry, identity, entryName) {
    if (isSamePackage(entry, identity)) return 'managed';
    if (entry && entry.name === entryName) return 'collision';
    return 'other';
  }

  const contentHashOf = (entry) => sha256Hex(String((entry && entry.content) || ''));

  // ---- 宿主定位 ----
  function findHostWindow() {
    if (window.parent === window) return window;
    let current = window;
    for (let depth = 0; depth < 4; depth++) {
      const parent = current.parent;
      if (!parent || parent === current) return null;
      let helper = null;
      try {
        helper = parent.TavernHelper;
      } catch {
        return null; // 跨源：宁可报错，绝不退化
      }
      if (helper) return parent;
      current = parent;
    }
    return null;
  }

  function hostOriginOf(hostWin) {
    try {
      const origin = hostWin.location.origin;
      return typeof origin === 'string' && /^https?:\/\//.test(origin) ? origin : null;
    } catch {
      return null;
    }
  }

  function notify(message) {
    try {
      if (typeof toastr !== 'undefined' && toastr && typeof toastr.warning === 'function') {
        toastr.warning(message, '创意工坊');
        return;
      }
    } catch {
      /* 落回 console */
    }
    try {
      console.warn(`[创意工坊桥] ${message}`);
    } catch {
      /* 无处可说就算了 */
    }
  }

  const shortMessage = (error) => String((error && error.message) || error || '').slice(0, 120);

  // ---- 运行时 ----
  function createRuntime() {
    const state = { hostWin: null, hostDoc: null, hostOrigin: null, root: null, frame: null, listeners: [], buttonSub: null, chatSub: null, disposed: false };

    // ---- 接口解析（本窗口的裸名 → 本窗口 TavernHelper → 宿主 TavernHelper）----
    function api(name) {
      if (typeof window[name] === 'function') return window[name];
      const own = window.TavernHelper;
      if (own && typeof own[name] === 'function') return own[name].bind(own);
      const host = state.hostWin;
      if (host && host !== window) {
        const helper = host.TavernHelper;
        if (helper && typeof helper[name] === 'function') return helper[name].bind(helper);
      }
      return null;
    }

    function withTimeout(promise, message) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new BridgeError('worldbook-error', message)), WB_TIMEOUT_MS);
        Promise.resolve(promise).then(
          (value) => {
            clearTimeout(timer);
            resolve(value);
          },
          (error) => {
            clearTimeout(timer);
            reject(error);
          },
        );
      });
    }

    // ---- 世界书读写（唯一出口；extra 桶只在这里进出）----
    async function readWorldbook(name) {
      const get = api('getWorldbook');
      if (!get) fail('internal', '桥没拿到世界书接口，请更新酒馆助手。');
      try {
        const entries = await withTimeout(get(name), '读世界书超时了。');
        return Array.isArray(entries) ? entries : [];
      } catch (error) {
        if (error instanceof BridgeError) throw error;
        fail('worldbook-error', `读世界书失败了：${shortMessage(error)}`);
      }
    }

    function targetSummary() {
      const getChatName = api('getChatWorldbookName');
      let name = null;
      if (getChatName) {
        try {
          name = getChatName('current');
        } catch {
          name = null;
        }
      }
      if (typeof name !== 'string' || !name) name = null;
      let exists = false;
      if (name) {
        const getNames = api('getWorldbookNames');
        try {
          exists = typeof getNames === 'function' ? getNames().includes(name) : true;
        } catch {
          exists = true;
        }
      }
      return { worldbookName: name, exists };
    }

    function fnv1a8(text) {
      let hash = 0x811c9dc5;
      for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193) >>> 0;
      }
      return hash.toString(16).padStart(8, '0');
    }

    function chatTag() {
      try {
        const st = (typeof window.SillyTavern !== 'undefined' && window.SillyTavern) || (state.hostWin && state.hostWin.SillyTavern);
        const context = st && typeof st.getContext === 'function' ? st.getContext() : null;
        const id = (context && context.chatId) || (context && typeof context.getCurrentChatId === 'function' ? context.getCurrentChatId() : null);
        return typeof id === 'string' && id ? fnv1a8(id) : null;
      } catch {
        return null;
      }
    }

    function versionsInfo() {
      const versions = { bridge: BRIDGE_VERSION };
      try {
        const getVersion = api('getTavernHelperVersion');
        const version = getVersion ? getVersion() : null;
        if (typeof version === 'string' && version) versions.th = version;
      } catch {
        /* 拿不到就不报 */
      }
      return versions;
    }

    // ---- 包校验 ----
    function validatePackage(pkg) {
      if (!pkg || typeof pkg !== 'object') fail('invalid-package', '这个包的内容不完整。');
      if (typeof pkg.id !== 'string' || !pkg.id) fail('invalid-package', '这个包没有编号。');
      if (!ALLOWED_PACKAGE_TYPES.includes(pkg.type)) fail('invalid-package', '这个包的类型月痕还装不了。');
      if (pkg.cardScope !== CARD_SCOPE) fail('invalid-package', '这个包不是给月痕之民的。');
      if (pkg.reviewStatus !== 'approved') fail('invalid-package', '这个包还没有过审。');
      if (!Number.isInteger(pkg.revision) || pkg.revision < 1) fail('invalid-package', '这个包的版本号不对。');
      if (typeof pkg.title !== 'string' || !pkg.title) fail('invalid-package', '这个包没有标题。');
      if (!/^[0-9a-f]{64}$/.test(String(pkg.contentHash || ''))) fail('invalid-package', '这个包的指纹格式不对。');
      const factors = pkg.payload && pkg.payload.worldFactors;
      if (!Array.isArray(factors) || factors.length === 0) fail('invalid-package', '这个包里没有世界因子。');
      for (const factor of factors) {
        if (!factor || typeof factor.title !== 'string' || !factor.title) fail('invalid-package', '世界因子缺标题。');
        if (typeof factor.content !== 'string' || !factor.content) fail('invalid-package', '世界因子缺正文。');
      }
      return pkg;
    }

    function validateExpected(expected) {
      if (!expected || typeof expected !== 'object') fail('bad-request', '请求缺少预期值。');
      const { worldbookName, entryUid, localEntryHash, newEntryHash, revision } = expected;
      if (worldbookName !== null && typeof worldbookName !== 'string') fail('bad-request', '目标世界书名不合法。');
      if (entryUid !== null && typeof entryUid !== 'number') fail('bad-request', '目标条目编号不合法。');
      if (localEntryHash !== null && !/^[0-9a-f]{64}$/.test(String(localEntryHash))) fail('bad-request', '本地指纹格式不对。');
      if (!/^[0-9a-f]{64}$/.test(String(newEntryHash))) fail('bad-request', '新指纹格式不对。');
      if (!Number.isInteger(revision) || revision < 1) fail('bad-request', '版本号不合法。');
      return { worldbookName, entryUid, localEntryHash, newEntryHash, revision, overwriteLocal: expected.overwriteLocal === true };
    }

    function buildMeta(pkg, identity, contentHash) {
      return {
        source: META_SOURCE,
        kind: META_KIND,
        packageId: identity.packageId,
        packageType: identity.packageType,
        packageTarget: identity.packageTarget,
        programOnly: false,
        revision: pkg.revision,
        contentHash,
        installedAt: new Date().toISOString(),
        textFormat: TEXT_FORMAT,
      };
    }

    function verifyWritten(entry, text, newHash) {
      if (!entry || entry.content !== text) return false;
      if (contentHashOf(entry) !== newHash) return false;
      const meta = entryMeta(entry);
      return Boolean(meta) && meta.contentHash === newHash;
    }

    // ---- 动作：handshake / getContext / getEntries ----
    async function actionHandshake() {
      return {
        protocol: 1,
        bridge: { version: BRIDGE_VERSION },
        capabilities: CAPABILITIES.slice(),
        cardScope: CARD_SCOPE,
        textFormat: TEXT_FORMAT,
        maxEntryChars: MAX_ENTRY_CHARS,
        target: targetSummary(),
      };
    }

    async function actionGetContext() {
      const target = targetSummary();
      const installed = [];
      if (target.worldbookName && target.exists) {
        const entries = await readWorldbook(target.worldbookName);
        for (const entry of entries) {
          const meta = entryMeta(entry);
          if (!meta) continue;
          installed.push({
            packageId: meta.packageId,
            packageType: meta.packageType,
            packageTarget: meta.packageTarget,
            revision: meta.revision,
            contentHash: meta.contentHash,
            comment: entry.name,
          });
        }
      }
      return { cardScope: CARD_SCOPE, chatTag: chatTag(), target, installed, versions: versionsInfo() };
    }

    async function actionGetEntries(payload) {
      if (!payload || typeof payload !== 'object') fail('bad-request', '请求格式不对。');
      const name = payload.worldbookName === undefined ? null : payload.worldbookName;
      if (name !== null && typeof name !== 'string') fail('bad-request', '世界书名不合法。');
      const target = targetSummary();
      if (name !== target.worldbookName) fail('bad-request', '只能读当前聊天的世界书。');
      if (!name || !target.exists) return { worldbookName: name, exists: false, entries: [] };
      const entries = await readWorldbook(name);
      return {
        worldbookName: name,
        exists: true,
        entries: entries.map((entry) => ({ uid: entry.uid, name: entry.name, content: entry.content, meta: entryMeta(entry) })),
      };
    }

    // ---- 动作：upsertWorkshopEntries（安装事务 §7.3）----
    async function actionUpsert(payload) {
      if (!payload || typeof payload !== 'object') fail('bad-request', '请求格式不对。');
      const pkg = validatePackage(payload.package);
      const expected = validateExpected(payload.expected);
      const identity = packageIdentity(pkg);
      const entryName = ENTRY_PREFIX + pkg.title;
      const text = packageToWorldbookText(pkg);
      if (text.length > MAX_ENTRY_CHARS) fail('too-large', `正文 ${text.length} 字，超过上限 ${MAX_ENTRY_CHARS} 字。`);
      const newHash = sha256Hex(text);
      if (newHash !== expected.newEntryHash) fail('hash-mismatch', '页面算出的正文指纹和桥算的不一致，已停止写入。');
      if (expected.revision !== pkg.revision) fail('bad-request', '预期版本号和包的版本号不一致。');

      const target = targetSummary();
      if (target.worldbookName !== expected.worldbookName) fail('conflict', '目标世界书和预览时不一样了，请重新预览。');

      let wbName = target.worldbookName;
      let entries = wbName ? await readWorldbook(wbName) : [];
      const mine = entries.filter((entry) => isSamePackage(entry, identity));

      if (mine.length > 1) fail('conflict', '世界书里有两条同源条目，请先手动处理。');
      const namesake = entries.find((entry) => classifyEntry(entry, identity, entryName) === 'collision');
      if (namesake) fail('conflict', '世界书里已有同名条目，它不属于这个包，桥不动它。');

      if (mine.length === 1) return updateExisting(wbName, mine[0], { pkg, identity, entryName, text, newHash, expected });

      if (expected.entryUid !== null) fail('conflict', '预览时那条条目现在找不到了，请重新预览。');
      if (expected.localEntryHash !== null) fail('conflict', '世界书刚被改过，请重新预览。');
      if (!wbName) {
        const create = api('getOrCreateChatWorldbook');
        if (!create) fail('internal', '桥没拿到世界书接口，请更新酒馆助手。');
        try {
          wbName = await withTimeout(create('current'), '创建聊天世界书超时了。');
        } catch (error) {
          if (error instanceof BridgeError) throw error;
          fail('worldbook-error', `创建聊天世界书失败了：${shortMessage(error)}`);
        }
        if (typeof wbName !== 'string' || !wbName) fail('worldbook-error', '没能建出当前聊天的世界书。');
        entries = [];
      }
      return createNew(wbName, entries, { pkg, identity, entryName, text, newHash });
    }

    async function updateExisting(wbName, entry, context) {
      const { pkg, identity, entryName, text, newHash, expected } = context;
      const meta = entryMeta(entry);
      if (entry.uid !== expected.entryUid) fail('conflict', '预览时那条条目的编号变了，请重新预览。');
      const localHash = contentHashOf(entry);
      if (localHash !== expected.localEntryHash) fail('conflict', '世界书刚被改过，请重新预览。');
      if (Number(meta.revision) > pkg.revision) fail('conflict', '本地装的是更新的版本，不能用旧版本盖回去。');
      // E5 §7.4 原则四：改了正文就必须升版本号 —— 同版本号却换了正文的包一律拒
      if (Number(meta.revision) === pkg.revision && meta.contentHash !== newHash) {
        fail('conflict', '同版本号的正文对不上（包被原地改过），请让发布者升版本号。');
      }
      if (localHash !== meta.contentHash && !expected.overwriteLocal) fail('conflict', '这条在本地被改过，没勾「覆盖」就不动它。');
      if (localHash === newHash && Number(meta.revision) === pkg.revision) {
        return { action: 'unchanged', uid: entry.uid, entryHash: newHash, revision: pkg.revision, worldbookName: wbName };
      }

      const update = api('updateWorldbookWith');
      if (!update) fail('internal', '桥没拿到世界书接口，请更新酒馆助手。');
      let updated;
      try {
        updated = await withTimeout(
          update(
            wbName,
            (worldbook) => {
              const current = worldbook.find((item) => item.uid === entry.uid);
              if (!current) fail('conflict', '条目在写入前消失了，请重新预览。');
              if (contentHashOf(current) !== localHash) fail('conflict', '世界书刚被改过，请重新预览。');
              return worldbook.map((item) =>
                item.uid === entry.uid
                  ? { ...item, name: entryName, content: text, enabled: true, extra: { ...(item.extra || {}), [META_KEY]: buildMeta(pkg, identity, newHash) } }
                  : item,
              );
            },
            { render: 'debounced' },
          ),
          '写入世界书超时了。',
        );
      } catch (error) {
        if (error instanceof BridgeError) throw error;
        fail('worldbook-error', `写入世界书失败了：${shortMessage(error)}`);
      }

      const written = Array.isArray(updated) ? updated.find((item) => item.uid === entry.uid) : null;
      if (!verifyWritten(written, text, newHash)) fail('worldbook-error', '写入后核对没通过，已停下。');
      return { action: 'updated', uid: entry.uid, entryHash: newHash, revision: pkg.revision, worldbookName: wbName };
    }

    async function createNew(wbName, entries, context) {
      const { pkg, identity, entryName, text, newHash } = context;
      const order = ENTRY_ORDER_BASE + entries.filter((entry) => entryMeta(entry)).length;
      const newEntry = {
        name: entryName,
        content: text,
        enabled: true,
        strategy: { type: 'constant', keys: [], keys_secondary: { logic: 'and_any', keys: [] }, scan_depth: 'same_as_global' },
        position: { ...ENTRY_POSITION, order },
        extra: { [META_KEY]: buildMeta(pkg, identity, newHash) },
      };

      const create = api('createWorldbookEntries');
      if (!create) fail('internal', '桥没拿到世界书接口，请更新酒馆助手。');
      let result;
      try {
        result = await withTimeout(create(wbName, [newEntry], { render: 'debounced' }), '写入世界书超时了。');
      } catch (error) {
        if (error instanceof BridgeError) throw error;
        fail('worldbook-error', `写入世界书失败了：${shortMessage(error)}`);
      }

      const written = result && Array.isArray(result.new_entries) ? result.new_entries[0] : null;
      const uid = written && written.uid;
      const duplicates = result && Array.isArray(result.worldbook) ? result.worldbook.filter((entry) => isSamePackage(entry, identity)) : [];
      if (duplicates.length > 1) {
        await compensate(wbName, uid, newHash, 'conflict');
        fail('conflict', '检测到重复安装，已撤回本次写入，请再试一次。');
      }
      if (typeof uid !== 'number' || !verifyWritten(written, text, newHash)) {
        await compensate(wbName, uid, newHash, 'worldbook-error');
        fail('worldbook-error', '写入后核对没通过，已停下。');
      }
      return { action: 'created', uid, entryHash: newHash, revision: pkg.revision, worldbookName: wbName };
    }

    /** 只撤「本事务刚写、且仍等于本事务数值」的那条；它已被别人动过就什么都不做 */
    async function compensate(wbName, uid, newHash, code) {
      const remove = api('deleteWorldbookEntries');
      if (typeof uid !== 'number' || !remove) return;
      try {
        await withTimeout(
          remove(wbName, (entry) => entry.uid === uid && contentHashOf(entry) === newHash, { render: 'debounced' }),
          '撤回超时了。',
        );
      } catch {
        /* 撤不掉就停手，不再叠写 */
      }
    }

    // ---- 动作分发表 ----
    const ACTIONS = {
      handshake: actionHandshake,
      getContext: actionGetContext,
      getEntries: actionGetEntries,
      upsertWorkshopEntries: actionUpsert,
    };

    // ---- 消息（只认工坊源 + 当前 iframe）----
    function onMessage(event) {
      if (state.disposed) return;
      if (!WORKSHOP_ORIGINS.includes(event.origin)) return;
      const frame = state.frame;
      if (!frame || event.source !== frame.contentWindow) return;
      const data = event.data;
      if (!data || typeof data !== 'object' || data.protocol !== 1) return;
      const requestId = typeof data.requestId === 'string' && data.requestId ? data.requestId : null;
      if (!requestId) return;

      const reply = (body) => {
        if (state.disposed || state.frame !== frame || event.source !== frame.contentWindow) return;
        try {
          event.source.postMessage({ protocol: 1, requestId, ...body }, WORKSHOP_ORIGIN);
        } catch {
          /* iframe 正在卸载 */
        }
      };

      if (typeof data.action !== 'string' || !data.action) {
        reply({ ok: false, result: null, error: { code: 'bad-request', message: '请求格式不对。' } });
        return;
      }
      const handler = ACTIONS[data.action];
      if (!handler) {
        reply({ ok: false, result: null, error: { code: 'unsupported-action', message: '这个功能这座桥还没有。' } });
        return;
      }
      Promise.resolve()
        .then(() => handler(data.payload))
        .then((result) => reply({ ok: true, result, error: null }))
        .catch((error) => {
          const known = error instanceof BridgeError;
          reply({
            ok: false,
            result: null,
            error: known
              ? { code: error.code, message: error.message }
              : { code: 'internal', message: `桥内部出错了：${shortMessage(error)}` },
          });
        });
    }

    function onKeydown(event) {
      if (event.key === 'Escape' && state.root && state.root.style.display !== 'none') close();
    }

    // ---- 宿主与监听 ----
    function resolveHost() {
      const hostWin = findHostWindow();
      const hostDoc = hostWin ? hostWin.document : null;
      const hostOrigin = hostWin ? hostOriginOf(hostWin) : null;
      if (!hostWin || !hostDoc || !hostDoc.body) fail('internal', '找不到酒馆页面，打不开工坊。');
      if (!hostOrigin) fail('internal', '当前酒馆地址不是正常的网页地址，打不开工坊。');
      state.hostWin = hostWin;
      state.hostDoc = hostDoc;
      state.hostOrigin = hostOrigin;
    }

    function attachHostListeners() {
      detachHostListeners();
      const hostWin = state.hostWin;
      if (!hostWin) return;
      hostWin.addEventListener('message', onMessage);
      hostWin.addEventListener('keydown', onKeydown, true);
      state.listeners.push(
        () => hostWin.removeEventListener('message', onMessage),
        () => hostWin.removeEventListener('keydown', onKeydown, true),
      );
    }

    function detachHostListeners() {
      for (const off of state.listeners) {
        try {
          off();
        } catch {
          /* 忽略 */
        }
      }
      state.listeners = [];
    }

    // ---- 界面 ----
    function ensureOverlay() {
      if (state.root && state.root.isConnected) return;
      const doc = state.hostDoc;
      const root = doc.createElement('div');
      root.id = OVERLAY_ID;
      root.style.cssText =
        'position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;background:rgba(15,18,25,.55)';

      const panel = doc.createElement('div');
      panel.style.cssText =
        'display:flex;flex-direction:column;width:min(960px,92vw);height:min(720px,88vh);background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.35)';

      const bar = doc.createElement('div');
      bar.style.cssText =
        'display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 12px;background:#1f2430;color:#fff;font:14px/1.6 system-ui,-apple-system,"Microsoft YaHei",sans-serif';
      const title = doc.createElement('span');
      title.textContent = '创意工坊';
      const closeButton = doc.createElement('button');
      closeButton.type = 'button';
      closeButton.textContent = '关闭';
      closeButton.style.cssText = 'border:0;border-radius:6px;padding:4px 12px;cursor:pointer;background:#3a4356;color:#fff;font:inherit';
      bar.append(title, closeButton);

      const frame = doc.createElement('iframe');
      frame.id = FRAME_ID;
      frame.title = '创意工坊';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
      frame.style.cssText = 'flex:1;width:100%;border:0;background:#fff';
      frame.src = `${WORKSHOP_ORIGIN}/card#hostOrigin=${encodeURIComponent(state.hostOrigin)}`;

      panel.append(bar, frame);
      root.append(panel);
      root.addEventListener('click', (event) => {
        if (event.target === root) close();
      });
      closeButton.addEventListener('click', () => close());
      doc.body.appendChild(root);
      state.root = root;
      state.frame = frame;
    }

    function closeOverlay() {
      if (state.root) {
        try {
          state.root.remove();
        } catch {
          /* 已经不在 DOM 里 */
        }
      }
      state.root = null;
      state.frame = null;
    }

    function open() {
      if (state.disposed) return;
      try {
        if (!state.hostWin || !state.hostDoc || !state.hostDoc.body || !state.hostOrigin) resolveHost();
        attachHostListeners();
        ensureOverlay();
      } catch (error) {
        notify(error instanceof BridgeError ? error.message : `打不开创意工坊：${shortMessage(error)}`);
        return;
      }
      state.root.style.display = 'flex';
    }

    function close() {
      if (state.root) state.root.style.display = 'none';
    }

    function destroy() {
      state.disposed = true;
      detachHostListeners();
      if (state.buttonSub) {
        try {
          state.buttonSub.stop();
        } catch {
          /* 忽略 */
        }
        state.buttonSub = null;
      }
      if (state.chatSub) {
        try {
          state.chatSub.stop();
        } catch {
          /* 忽略 */
        }
        state.chatSub = null;
      }
      closeOverlay();
      if (window[RUNTIME_KEY] === runtime) window[RUNTIME_KEY] = undefined;
    }

    // ---- 装配 ----
    const eventOn = api('eventOn');
    if (eventOn) {
      const getButtonEvent = api('getButtonEvent');
      try {
        const buttonEvent = getButtonEvent ? getButtonEvent(BUTTON_NAME) : null;
        if (buttonEvent) state.buttonSub = eventOn(buttonEvent, () => open());
      } catch (error) {
        notify(`按钮没接上：${shortMessage(error)}`);
      }
      try {
        state.chatSub = eventOn(CHAT_CHANGED_EVENT, () => closeOverlay());
      } catch {
        /* 没有切聊天事件也不影响主流程 */
      }
    } else {
      notify('没有找到酒馆助手的脚本接口，创意工坊打不开。');
    }

    try {
      resolveHost();
      attachHostListeners();
    } catch {
      /* 宿主晚点再找：open() 会重试 */
    }

    const runtime = { open, close, destroy, pure: { packageToWorldbookText, sha256Hex, classifyEntry } };
    return runtime;
  }

  // ---- 启动（单例：先拆旧的再建新的）----
  function init() {
    try {
      const previous = window[RUNTIME_KEY];
      if (previous && typeof previous.destroy === 'function') previous.destroy();
      const runtime = createRuntime();
      window[RUNTIME_KEY] = runtime;
      if (typeof $ === 'function' && $.fn) $(window).on('pagehide', () => runtime.destroy());
      else window.addEventListener('pagehide', () => runtime.destroy());
    } catch (error) {
      notify(`创意工坊桥启动失败：${shortMessage(error)}`);
    }
  }

  if (typeof $ === 'function' && typeof $.fn !== 'undefined') $(init);
  else setTimeout(init, 0);
})();

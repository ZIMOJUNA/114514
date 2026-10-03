/**
 * 月痕之民 · 创意工坊 —— 卡内桥 v0.0.1
 *
 * 卡里第 6 条 TH 脚本 import 本文件（卡外托管 D86）。
 * 规格：《卡内桥_方案.md》§4（安全）· §5（协议）· §6.2（canonical）· §7（安装事务）。
 * 铁律：本文件只写「角色绑定的那本世界书的条目」，绝不碰 MVU 变量、绝不发消息、绝不越出 WS.origin。
 */
(() => {
  'use strict';

  // ---- 常量 ----
  // 桥的真身版本。文件名的 `v0.0.1` 是**托管 URL 的一部分**（卡里 import 的就是它），
  // 换文件名就得改卡 ⇒ 文件名不动，版本以这个常量为准（handshake 里报给页面）。
  const BRIDGE_VERSION = '0.0.3';
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
  const META_KIND_ENTRY = 'workshop_entry';
  // 握手报的"我能认到第几版"：条目模型 2 = v2（阶段 2）；正则模型 1 = 会写正则（阶段 3）。
  // 拿不到这个数 ⇒ 页面整页挡住（卡内桥是旧版本，Ctrl+F5 硬刷新）。
  const ENTRY_MODEL = 2;
  const REGEX_MODEL = 1;
  const REGISTRY_KEY = 'yuehen_workshop_install_registry';
  // 修复登记：修复是"先删后装"，中间那几秒最危险（旧的没了、新的还没进）⇒ 每一步记一笔，
  // 断电/刷新后能看出修到哪一步停的。键 = `<候选编号>::<包号>`。
  const REPAIR_KEY = 'yuehen_workshop_repair_registry';
  const NO_CHARACTER_KEY = '__no_character__';
  const CAPABILITIES = [
    'handshake', 'getContext', 'getEntries', 'upsertWorkshopEntries',
    'listInstalledProjects', 'getProjectDiff', 'uninstallProject',
    'repairScan', 'repairProject',
  ];
  // 分类词汇：照命定之诗的 `PROJECT_TAXONOMY.projectTypes`（事件 / 系统核心 / 角色 / 扩展），
  // 「扩展」再分 规则 / 内容 两个子类；外加月痕自己的三类（世界因子 / 主线 / 音乐）。
  // ⚠ 与命定 `PROJECT_CONTENT_POLICY` 的唯一差异：他们的「扩展」允许"条目或正则二选一"，
  //   我们**每一类都要求世界书条目**（挂账：要不要放开等驾驶员裁 —— 放开要动装/预览的
  //   "必须先有目标世界书"这个前置条件，不是加一行表）。
  const PACKAGE_TYPE_ORDER = ['world_factor', 'system_core', 'character', 'event', 'extension', 'mainline', 'music'];
  const EXTENSION_KINDS = ['规则', '内容'];
  const ALLOWED_PACKAGE_TYPES = PACKAGE_TYPE_ORDER;
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

  // ---- v2 条目身份（桶名沿用，kind 区分：v1 一条装整个包 / v2 一条装一个条目）----
  /**
   * 我们写过的条目，v1/v2 都认（列表与卸载要能看见两种）。
   * 🔴 v1 的 `entryMeta` 一个字不动 —— 它的行为被 v1 回归测试逐字节盯着。
   */
  function managedMetaOf(entry) {
    const meta = entry && entry.extra ? entry.extra[META_KEY] : null;
    if (!meta || meta.source !== META_SOURCE) return null;
    return meta.kind === META_KIND || meta.kind === META_KIND_ENTRY ? meta : null;
  }

  const v2MetaOf = (entry) => {
    const meta = managedMetaOf(entry);
    return meta && meta.kind === META_KIND_ENTRY ? meta : null;
  };

  const v2EntryKeyOf = (entry) => {
    const meta = v2MetaOf(entry);
    return meta && typeof meta.entryKey === 'string' && meta.entryKey ? meta.entryKey : null;
  };

  /** v2 的"这条属于哪个包"：包身份三件套全等（照 §5.1，五个字段里前三个 ＋ entryKey 在 key 上认） */
  function v2IsSamePackage(entry, identity) {
    const meta = v2MetaOf(entry);
    return (
      Boolean(meta) &&
      meta.packageId === identity.packageId &&
      meta.packageType === identity.packageType &&
      meta.packageTarget === identity.packageTarget
    );
  }

  /**
   * v2 条目写进世界书时挂在 `extra.yuehenWorkshop` 上的东西。
   * `contentHash` 是**这条正文的 hash**，同时也是"本地基线"—— 下次升级时
   * 拿它和世界书里的正文现算一遍比，才知道玩家有没有在本地改过这条（§6.2 三方比较）。
   *
   * `installedAt` 是"**这条第一次落地**"的时间：升级改写正文时沿用旧的，不刷新 ——
   * 否则它悄悄变成"最后写的时间"，而 `listInstalledProjects` 正是拿它当"什么时候装的"报给玩家。
   */
  function buildEntryMeta(pkg, identity, entryKey, contentHash, installedAt) {
    return {
      source: META_SOURCE,
      kind: META_KIND_ENTRY,
      packageId: identity.packageId,
      packageType: identity.packageType,
      packageTarget: identity.packageTarget,
      entryKey,
      packageTitle: String((pkg && pkg.title) || ''), // 显示用，不作身份
      revision: pkg.revision,
      contentHash,
      installedAt: typeof installedAt === 'string' && installedAt ? installedAt : new Date().toISOString(),
      textFormat: V2_TEXT_FORMAT,
    };
  }

  /**
   * v2 计划摘要：**逐个字段按固定顺序拼**（不依赖对象键序）再取 sha256。
   * 页面与桥各算一遍对表 —— 对不上就说明两份 canonical 漂了（桥旧了或页旧了），
   * 那一刻要**拒绝安装**，不能让玩家看到的是 A、装进去的是 B（v1 的 newEntryHash 就是干这个的）。
   */
  function planDigest(entries, regexEntries) {
    const 段 = (list, 拼) => list.map(拼);
    const 条目行 = 段(entries || [], (entry) =>
      [
        entry.entryKey, entry.name, entry.enabled ? '1' : '0',
        entry.strategy.type, entry.strategy.keys.join(''),
        entry.strategy.keys_secondary.logic, entry.strategy.keys_secondary.keys.join(''),
        String(entry.strategy.scan_depth),
        entry.position.type, String(entry.position.depth), String(entry.position.order), entry.position.role,
        String(entry.probability),
        entry.recursion.prevent_incoming ? '1' : '0', entry.recursion.prevent_outgoing ? '1' : '0', String(entry.recursion.delay_until),
        String(entry.effect.sticky), String(entry.effect.cooldown), String(entry.effect.delay),
        entry.outletName, entry.content,
      ].join(''),
    );
    // 正则行同样**逐字段全覆盖**：摘要的用处就是"两边要写进去的字节相同"，
    // 只挑五个字段的话，min_depth 这类漂了两边照样报绿（自洽检查永远绿）。
    const 正则行 = 段(regexEntries || [], (item) =>
      [
        item.entryKey, item.id, item.script_name, item.enabled ? '1' : '0',
        item.find_regex, item.replace_string, item.trim_strings.join(''),
        item.source.user_input ? '1' : '0', item.source.ai_output ? '1' : '0', item.source.slash_command ? '1' : '0',
        item.source.world_info ? '1' : '0', item.source.reasoning ? '1' : '0',
        item.destination.display ? '1' : '0', item.destination.prompt ? '1' : '0',
        item.run_on_edit ? '1' : '0', String(item.min_depth), String(item.max_depth),
      ].join(''),
    );
    return sha256Hex(
      [V2_TEXT_FORMAT, String(条目行.length), ...条目行, 'regex', String(正则行.length), ...正则行].join(''),
    );
  }

  // ---- 纯函数 v2：包 → 条目数组 / 正则数组（页面侧同一份实现，测试向量对齐）----
  // 形状与报错照命定成法（逐条抽原函数核过，见《工坊v2_方案.md》§2–§3）：
  //   两套写法都收（新形状 ＋ 酒馆老式数字/布尔）· 缺省值补齐 · 值不合法就报错并指到具体那条。
  //   条目名 = [创意工坊][分类]原名（剥旧头，幂等）；包名只进正则名，不进条目名。
  //   🔴 身份叫 entryKey，**不叫 key** —— 酒馆/命定的 key 是关键词数组，撞名会把 `key: ['侵蚀']` 当身份。
  //   🔴 产出的 entryKey 是纯函数给写入侧留的把手：写入前必须挪走（条目进 extra、正则由 id 承载），别原样发给酒馆助手。
  const V2_TEXT_FORMAT = 'yuehen-wf-v2';
  const REGEX_ID_PREFIX = 'yuehen_workshop:';
  const WORKSHOP_HEADER = '[创意工坊]';
  const ENTRY_KEY_RE = /^[a-z0-9][a-z0-9._-]*$/;
  const POSITION_NAMES = [
    'before_character_definition', 'after_character_definition',
    'before_example_messages', 'after_example_messages',
    'before_author_note', 'after_author_note',
    'at_depth', 'outlet',
  ];
  const POSITION_ALIASES = {
    before_char: 'before_character_definition',
    after_char: 'after_character_definition',
    before_AN: 'before_author_note',
    after_AN: 'after_author_note',
    before_EM: 'before_example_messages',
    after_EM: 'after_example_messages',
  };
  const POSITION_BY_NUMBER = [
    'before_character_definition', 'after_character_definition',
    'before_author_note', 'after_author_note',
    'at_depth', 'before_example_messages', 'after_example_messages', 'outlet',
  ];
  const STRATEGY_TYPES = ['constant', 'selective', 'vectorized'];
  const SECONDARY_LOGICS = ['and_any', 'not_all', 'not_any', 'and_all'];
  const ROLE_NAMES = { 0: 'system', system: 'system', 1: 'user', user: 'user', 2: 'assistant', assistant: 'assistant' };
  const CATEGORY_LABELS = {
    world_factor: '世界因子',
    system_core: '系统核心',
    character: '角色',
    event: '事件',
    extension: '扩展',
    mainline: '主线',
    music: '音乐',
  };
  // 酒馆正则的"作用范围"数字（`regex_placement`，出处 `public/scripts/extensions/regex/engine.js:281`）。
  // 🔴 0（MD_DISPLAY）已废弃**不收**；4 是历史 sendAs 的空位，也不收。
  const REGEX_PLACEMENTS = [
    { 数字: 1, 字段: 'user_input' },
    { 数字: 2, 字段: 'ai_output' },
    { 数字: 3, 字段: 'slash_command' },
    { 数字: 5, 字段: 'world_info' },
    { 数字: 6, 字段: 'reasoning' },
  ];

  const v2IsSet = (value) => value !== undefined && value !== null;
  const v2Pick = (...values) => { for (const value of values) if (v2IsSet(value)) return value; return undefined; };
  const tableGet = (table, key) => (Object.prototype.hasOwnProperty.call(table, key) ? table[key] : null);
  const v2Text = (value) => (typeof value === 'string' ? value : '');
  const v2NumberOrNull = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : null);
  const v2Label = (name, index, word) => `第 ${index + 1} 条${word}${v2Text(name).trim() ? `「${v2Text(name).trim()}」` : ''}`;
  const v2Bad = (label, message) => fail('package-invalid', `${label}：${message}`);

  const v2Keys = (value) => {
    const list = typeof value === 'string' ? [value] : Array.isArray(value) ? value : [];
    return list.filter((item) => v2IsSet(item)).map((item) => String(item));
  };

  function v2Number(value, pathName, fallback, label) {
    if (!v2IsSet(value)) return fallback;
    if (typeof value !== 'number' || !Number.isFinite(value)) v2Bad(label, `${pathName} 必须是有限数字：${String(value)}。`);
    return value;
  }

  function v2KeyOf(item, index, label, seen, word) {
    const key = v2Pick(item.entryKey);
    if (typeof key !== 'string' || !key) v2Bad(label, `缺少 entryKey（${word}）。`);
    if (!ENTRY_KEY_RE.test(key)) v2Bad(label, `entryKey「${key}」不合规 —— 只能用小写字母、数字、点、横线、下划线，且以字母或数字开头。`);
    // 🔴 查重必须走 tableGet：`constructor` 是合法 entryKey，而 Object.prototype 上
    //    全小写的键只有它一个 —— 裸 `seen[key]` 会读出构造函数（真值）⇒ 假报"重复"，把好条目拒掉。
    const 已见 = tableGet(seen, key);
    if (已见 !== null) v2Bad(label, `entryKey「${key}」与第 ${已见 + 1} 条重复。`);
    seen[key] = index;
    return key;
  }

  function v2StrategyOf(item, label) {
    const strategy = item.strategy && typeof item.strategy === 'object' ? item.strategy : {};
    const secondary = strategy.keys_secondary && typeof strategy.keys_secondary === 'object' ? strategy.keys_secondary : {};

    const namedType = v2Pick(strategy.type, item.strategyType);
    let type;
    if (v2IsSet(namedType)) {
      if (STRATEGY_TYPES.indexOf(namedType) < 0) v2Bad(label, `不支持的触发策略：${String(namedType)}。`);
      type = namedType;
    } else if (item.constant === true) {
      type = 'constant';
    } else if (item.vectorized === true) {
      type = 'vectorized';
    } else {
      type = 'selective';
    }

    const namedLogic = v2Pick(secondary.logic, item.secondaryLogic);
    let logic;
    if (v2IsSet(namedLogic)) {
      if (SECONDARY_LOGICS.indexOf(namedLogic) < 0) v2Bad(label, `不支持的次要关键词逻辑：${String(namedLogic)}。`);
      logic = namedLogic;
    } else {
      const raw = v2Pick(item.selectiveLogic, item.selective_logic, 0);
      if (!Number.isInteger(raw)) v2Bad(label, `selectiveLogic 必须是整数：${String(raw)}。`);
      if (raw < 0 || raw >= SECONDARY_LOGICS.length) v2Bad(label, `不支持的 selectiveLogic：${String(raw)}。`);
      logic = SECONDARY_LOGICS[raw];
    }

    const scanDepth = v2Pick(strategy.scan_depth, strategy.scanDepth, 'same_as_global');
    const scanOk = scanDepth === 'same_as_global' || (typeof scanDepth === 'number' && Number.isFinite(scanDepth) && scanDepth >= 0);
    if (!scanOk) v2Bad(label, `scan_depth 必须是「same_as_global」或非负数字：${String(scanDepth)}。`);

    return {
      type,
      keys: v2Keys(v2Pick(strategy.keys, item.key, [])),
      keys_secondary: { logic, keys: v2Keys(v2Pick(secondary.keys, item.keysecondary, [])) },
      scan_depth: scanDepth,
    };
  }

  function v2PositionOf(item, index, label) {
    const position = item.position && typeof item.position === 'object' ? item.position : {};
    const named = v2Pick(position.type, item.positionType);
    let type;
    if (v2IsSet(named)) {
      const alias = tableGet(POSITION_ALIASES, named);
      if (alias) type = alias;
      else if (POSITION_NAMES.indexOf(named) >= 0) type = named;
      else v2Bad(label, `不支持的插入位置：${String(named)}。`);
    } else if (typeof item.position === 'number') {
      if (!Number.isInteger(item.position)) v2Bad(label, `插入位置必须是整数：${String(item.position)}。`);
      if (item.position < 0 || item.position >= POSITION_BY_NUMBER.length) v2Bad(label, `不支持的 SillyTavern 插入位置：${String(item.position)}。`);
      type = POSITION_BY_NUMBER[item.position];
    } else if (v2IsSet(item.position) && (typeof item.position !== 'object' || Array.isArray(item.position))) {
      v2Bad(label, `不支持的插入位置：${String(item.position)}。`);
    } else {
      // 没写 position，或只写了 position.depth/order/role ⇒ 我方缺省 at_depth（与 v1 条目落点一致）
      type = ENTRY_POSITION.type;
    }

    const roleValue = v2Pick(position.role, item.role);
    let role = tableGet(ROLE_NAMES, roleValue);
    if (!role && type === 'at_depth' && v2IsSet(roleValue)) v2Bad(label, `不支持的 @D role：${String(roleValue)}。`);
    if (!role) role = 'system';

    return {
      type,
      depth: v2Number(v2Pick(item.depth, position.depth), 'position.depth', ENTRY_POSITION.depth, label),
      order: v2Number(v2Pick(item.order, position.order), 'position.order', ENTRY_ORDER_BASE + index, label),
      role,
    };
  }

  function v2RecursionOf(item) {
    const recursion = item.recursion && typeof item.recursion === 'object' ? item.recursion : {};
    return {
      prevent_incoming: v2Pick(recursion.prevent_incoming, item.excludeRecursion) === true,
      prevent_outgoing: v2Pick(recursion.prevent_outgoing, item.preventRecursion) === true,
      delay_until: v2NumberOrNull(v2Pick(recursion.delay_until, item.delayUntilRecursion)),
    };
  }

  function v2EffectOf(item) {
    const effect = item.effect && typeof item.effect === 'object' ? item.effect : {};
    return {
      sticky: v2NumberOrNull(v2Pick(effect.sticky, item.sticky)),
      cooldown: v2NumberOrNull(v2Pick(effect.cooldown, item.cooldown)),
      delay: v2NumberOrNull(v2Pick(effect.delay, item.delay)),
    };
  }

  /** 剥我们自己的完整头「[创意工坊][分类]」；作者自己写的方括号一律留着 */
  function stripWorkshopHeader(name) {
    if (name.indexOf(WORKSHOP_HEADER) !== 0) return name;
    const rest = name.slice(WORKSHOP_HEADER.length);
    if (rest.charAt(0) !== '[') return name;
    const close = rest.indexOf(']');
    return close < 0 ? name : rest.slice(close + 1);
  }

  const categoryLabelOf = (pkg) => tableGet(CATEGORY_LABELS, String((pkg && pkg.type) || '')) || String((pkg && pkg.type) || '');

  function formatWorkshopEntryName(category, rawName) {
    return `${WORKSHOP_HEADER}[${category}]${stripWorkshopHeader(rawName)}`;
  }

  /** 正则名 = [创意工坊] 包标题 - 正则名；已带头就不重复加（幂等） */
  function formatWorkshopRegexName(projectName, rawName) {
    const text = String(rawName);
    return text.indexOf(WORKSHOP_HEADER) === 0 ? text : `${WORKSHOP_HEADER} ${projectName} - ${text}`;
  }

  function v2EntryOf(item, index, category, seen) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) v2Bad(`第 ${index + 1} 条`, '不是一个条目对象。');
    const rawName = v2Text(item.name);
    const label = v2Label(rawName, index, '');
    if (!rawName.trim()) v2Bad(label, '缺少条目名 name。');
    const entryKey = v2KeyOf(item, index, label, seen.keys, '条目编号');
    if (!v2Text(item.content)) v2Bad(label, '缺少正文 content。');
    // §4：包内条目名不许重复（查的是**格式化之后**的名字 —— 甲 与 [创意工坊][世界因子]甲 也会撞）
    const 全名 = formatWorkshopEntryName(category, rawName);
    const 同名 = tableGet(seen.names, 全名);
    if (同名 !== null) v2Bad(label, `条目名与第 ${同名 + 1} 条重复。`);
    seen.names[全名] = index;
    const probability = v2Number(item.probability, 'probability', 100, label);
    if (probability < 0 || probability > 100) v2Bad(label, `概率要在 0 到 100 之间：${String(probability)}。`);
    return {
      entryKey,
      name: 全名,
      content: item.content,
      enabled: v2IsSet(item.enabled) ? item.enabled === true : item.disable !== true,
      strategy: v2StrategyOf(item, label),
      position: v2PositionOf(item, index, label),
      probability,
      recursion: v2RecursionOf(item),
      effect: v2EffectOf(item),
      outletName: String(v2Pick(item.outletName, item.outlet_name, '')),
    };
  }

  /**
   * 包里的 `placement`（酒馆的"作用范围"数字数组）→ 酒馆助手真正认的 `source` 五个布尔。
   * 出处：`from_tavern_regex`（JSR `src/function/tavern_regex.ts:176`）把 `placement` 拆成这五个布尔，
   * 反方向则拼回去 ⇒ **写入时只能给 `source`，给 `placement` 会被丢掉**。
   */
  function v2SourceOf(item, label) {
    const 清单 = v2Pick(item.placement);
    const 用的 = v2IsSet(清单) ? 清单 : [2]; // 缺省 [2] ＝ AI_OUTPUT（照 §3.3）
    if (!Array.isArray(用的)) v2Bad(label, `placement 必须是一个数组：${String(用的)}。`);
    const source = { user_input: false, ai_output: false, slash_command: false, world_info: false, reasoning: false };
    for (const 号 of 用的) {
      const 命中 = REGEX_PLACEMENTS.find((项) => 项.数字 === 号);
      if (!命中) {
        v2Bad(label, `不支持的 placement ${JSON.stringify(号)} —— 只认 1 用户输入 / 2 AI 输出 / 3 斜杠命令 / 5 世界书 / 6 思维链。`);
      }
      source[命中.字段] = true;
    }
    return source;
  }

  function v2RegexOf(item, index, packageId, projectName, seen) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) v2Bad(`第 ${index + 1} 条正则`, '不是一个正则对象。');
    const rawName = v2Text(v2Pick(item.name, item.scriptName, item.script_name, ''));
    const label = v2Label(rawName, index, '正则');
    const entryKey = v2KeyOf(item, index, label, seen, '正则编号');
    if (!v2Text(item.findRegex)) v2Bad(label, '缺少匹配表达式 findRegex。');
    // 🔴 `substituteRegex` 兑现不了：`from_tavern_regex` 写死 `substituteRegex: 0`（JSR 源码里挂着 TODO）。
    //    给了别的值就该报错，不许"收下但写不进去"—— 那是静默降级。
    const 替换模式 = v2Pick(item.substituteRegex);
    if (v2IsSet(替换模式) && 替换模式 !== 0) {
      v2Bad(label, `substituteRegex 只能是 0（酒馆助手这一版写死 0，别的值写进去会被丢掉）：${String(替换模式)}。`);
    }
    const 修剪 = Array.isArray(item.trimStrings) ? item.trimStrings : [];
    return {
      entryKey,
      id: `${REGEX_ID_PREFIX}${packageId}:${entryKey}`,
      script_name: formatWorkshopRegexName(projectName, rawName || `正则${index + 1}`),
      enabled: item.disabled !== true,
      // 形状 = 酒馆助手的 `TavernRegex`（`@types/function/tavern_regex.d.ts:30`）：
      //   `trim_strings` 是**数组**（不是换行串 —— 换行串是酒馆正则面板那个输入框的格式）；
      //   `placement`/`substitute_regex`/`scope` 都不是这个对象的字段，写入时给不了。
      find_regex: item.findRegex,
      replace_string: v2Text(item.replaceString),
      trim_strings: 修剪.filter((行) => typeof 行 === 'string' && 行.length > 0),
      source: v2SourceOf(item, label),
      // `destination.display ↔ 酒馆的 markdownOnly`、`destination.prompt ↔ promptOnly`，
      // **是恒等不是取反**（`to_tavern_regex`：`display: markdownOnly, prompt: promptOnly`）。
      // 语义：两个都 false ＝ 直接改聊天记录本体（显示与提示词都吃到）；true 的那个 ＝ 只管那一边。
      destination: { display: item.markdownOnly === true, prompt: item.promptOnly === true },
      run_on_edit: item.runOnEdit === true,
      min_depth: v2NumberOrNull(item.minDepth),
      max_depth: v2NumberOrNull(item.maxDepth),
    };
  }

  /** v2 包的世界书条目数组（缺省补齐、逐条校验；返回的是"要写进去的形状"，key 由写入侧落到 extra） */
  function packageToEntries(pkg) {
    const payload = (pkg && pkg.payload) || {};
    const items = payload.entries;
    // 🔴 **`entries` 这个键必须写**，哪怕一条都没有 —— 判路看形状（`Array.isArray(payload.entries)` ⇒ v2 包），
    //    缺这个键会被当成 v1 包走另一条路。所以"缺键"与"空数组"给的是**两句不同的话**。
    if (!Array.isArray(items)) {
      fail('package-invalid', '这个包没有条目数组（payload.entries 这个键缺失）—— 判路看的是形状，只带正则的扩展也要写成 entries: []。');
    }
    if (items.length === 0) {
      // 命定的 `PROJECT_CONTENT_POLICY`：**扩展是 `anyOf:["worldbook","regex"]`** —— 二选一，但**至少要有一个**。
      // ⇒ 空 `entries` 只在「类型＝扩展 且 正则 ≥ 1 条」时成立；其余六类照旧硬要世界书条目。
      const 正则数 = Array.isArray(payload.regexEntries) ? payload.regexEntries.length : 0;
      if (String((pkg && pkg.type) || '') !== 'extension' || 正则数 === 0) {
        fail('package-invalid', '这个包里没有世界书条目（payload.entries 是空的）—— 只有「扩展」可以只带正则，而且至少得有一条正则。');
      }
    }
    const category = categoryLabelOf(pkg);
    const seen = { keys: {}, names: {} };
    return items.map((item, index) => v2EntryOf(item, index, category, seen));
  }

  /** v2 包的正则数组（没写就返回空数组；返回的是"要写进去的 ST 正则对象"） */
  function packageToRegexEntries(pkg) {
    const payload = (pkg && pkg.payload) || {};
    const items = payload.regexEntries;
    if (!v2IsSet(items)) return [];
    if (!Array.isArray(items)) fail('package-invalid', '包里的正则不是一个数组（payload.regexEntries）。');
    const packageId = String((pkg && pkg.id) || '');
    const projectName = String((pkg && pkg.title) || '未命名包');
    const seen = { keys: {} };
    return items.map((item, index) => v2RegexOf(item, index, packageId, projectName, seen));
  }

  // ---- v2 计划的落地：条目 → 世界书里的那一条 / 对账 ----
  /**
   * canonical 产出的条目 → 世界书里的那一条。
   * 🔴 这里正是"把 entryKey 挪走"的那一步：`entryKey` 不进世界书，它进 `extra.yuehenWorkshop`。
   */
  function entryPayloadOf(entry, pkg, identity, installedAt) {
    const payload = {
      name: entry.name,
      enabled: entry.enabled,
      content: entry.content,
      strategy: entry.strategy,
      position: entry.position,
      probability: entry.probability,
      recursion: entry.recursion,
      effect: entry.effect,
      outletName: entry.outletName,
    };
    payload.extra = { [META_KEY]: buildEntryMeta(pkg, identity, entry.entryKey, sha256Hex(entry.content), installedAt) };
    return payload;
  }

  // 逐字段比（不比 JSON —— 两边的键序不一样，拿字符串比会假红）
  const 逐项同 = (a, b) => a.length === b.length && a.every((item, index) => String(item) === String(b[index]));
  const 策略同 = (a, b) =>
    Boolean(a) && Boolean(b) && a.type === b.type && a.scan_depth === b.scan_depth &&
    逐项同(a.keys || [], b.keys || []) &&
    Boolean(a.keys_secondary) && Boolean(b.keys_secondary) &&
    a.keys_secondary.logic === b.keys_secondary.logic &&
    逐项同(a.keys_secondary.keys || [], b.keys_secondary.keys || []);
  const 落点同 = (a, b) => Boolean(a) && Boolean(b) && a.type === b.type && a.depth === b.depth && a.order === b.order && a.role === b.role;
  const 规则同 = (a, b, 字段) => Boolean(a) && Boolean(b) && 字段.every((name) => a[name] === b[name]);

  /** 世界书里那一条，和"按新包该长成什么样"是不是一模一样（决定要不要写这一条） */
  function sameEntry(现有, 目标) {
    return (
      现有.name === 目标.name &&
      现有.enabled === 目标.enabled &&
      现有.content === 目标.content &&
      现有.probability === 目标.probability &&
      String(现有.outletName || '') === String(目标.outletName || '') &&
      策略同(现有.strategy, 目标.strategy) &&
      落点同(现有.position, 目标.position) &&
      规则同(现有.recursion, 目标.recursion, ['prevent_incoming', 'prevent_outgoing', 'delay_until']) &&
      规则同(现有.effect, 目标.effect, ['sticky', 'cooldown', 'delay'])
    );
  }

  const 行 = (entry) => ({ entryKey: entry.entryKey, name: entry.name });

  /**
   * 对账（**只算不写**）：拿世界书现状 ＋ 新包计划，算出最终该是什么样、以及六类明细。
   * 预览（`getProjectDiff`）与写入（`upsertWorkshopEntries`）**共用这一份** ——
   * 预览与实际写入必须是同一套判据，否则预览说 A、写进去是 B。
   *
   * 六类：`added` 新增 · `modified` 改写 · `unchanged` 一字不差 · `skipped` 本地改过且没勾覆盖 ⇒ 不动 ·
   *       `removed` 旧版有新版没有 ⇒ 会删 · `conflict` 撞名/编号重复 ⇒ **不写，报错**
   */
  function reconcilePlan(live, plan, identity, pkg, overwriteLocal) {
    const 现有 = Array.isArray(live) ? live : [];
    const 按编号 = {};
    const 重复 = [];
    for (const entry of 现有) {
      if (!v2IsSamePackage(entry, identity)) continue;
      const key = v2EntryKeyOf(entry);
      if (!key) continue;
      if (按编号[key]) 重复.push(key);
      else 按编号[key] = entry;
    }

    const added = [], modified = [], skipped = [], unchanged = [], removed = [], conflict = [];
    const 计划编号 = {};
    const 目标 = new Map();
    for (const entry of plan) {
      计划编号[entry.entryKey] = true;
      const 旧 = 按编号[entry.entryKey];
      // 已存在的那条：沿用它的 installedAt（＝第一次落地的时间），改写正文不刷新它
      const 旧meta = 旧 ? v2MetaOf(旧) : null;
      const payload = entryPayloadOf(entry, pkg, identity, 旧meta && 旧meta.installedAt);
      目标.set(entry.entryKey, payload);
      if (!旧) {
        added.push(行(entry));
        continue;
      }
      // 基线 hash 对不上 ⇒ 玩家在本地改过这条。基线缺失（不是我们写的）也按"改过"算 —— 宁可少写，不静默覆盖
      const 本地改过 = contentHashOf(旧) !== String((旧meta && 旧meta.contentHash) || '');
      if (本地改过 && !overwriteLocal) skipped.push({ entryKey: entry.entryKey, name: 旧.name, reason: 'local-changed' });
      else if (sameEntry(旧, payload)) unchanged.push(行(entry));
      else modified.push({ entryKey: entry.entryKey, name: payload.name, localChanged: 本地改过 });
    }
    for (const key of Object.keys(按编号)) {
      if (计划编号[key]) continue;
      const 旧 = 按编号[key];
      const 旧meta = v2MetaOf(旧);
      // 新版删掉的条目**一律删**（§6.2 第一步「先删本项目在这本书里的全部条目」的语义）。
      // ⚠ 这是全流程里唯一会**丢掉玩家本地改动**的地方（别处都拦着不让覆盖），
      //   所以必须如实标出来，好让页面在预览里点名提醒 —— 删了就找不回来了。
      removed.push({ entryKey: key, name: 旧.name, localChanged: contentHashOf(旧) !== String((旧meta && 旧meta.contentHash) || '') });
    }
    for (const key of 重复) conflict.push({ entryKey: key, reason: 'duplicate' });
    for (const entry of plan) {
      const 撞名 = 现有.find((item) => !v2IsSamePackage(item, identity) && item.name === entry.name);
      if (撞名) conflict.push({ entryKey: entry.entryKey, name: entry.name, reason: 'collision' });
    }

    // 最终数组：别人的条目原样、我们的按计划改写/剔除、计划里新的追加在后面
    const next = [];
    const 用过的 = {};
    const 不动 = {}; // 跳过的 ＋ 一字不差的 ⇒ 统统原样放回
    for (const item of skipped) 不动[item.entryKey] = true;
    for (const item of unchanged) 不动[item.entryKey] = true;
    for (const entry of 现有) {
      if (!v2IsSamePackage(entry, identity)) {
        next.push(entry);
        continue;
      }
      const key = v2EntryKeyOf(entry);
      if (!key || 用过的[key] || !计划编号[key]) continue; // 多余 / 重复 / 新版没有了 ⇒ 剔除
      用过的[key] = true;
      if (不动[key]) {
        next.push(entry); // 🔴 **原样放回**：连 meta 都不碰 —— 说了 unchanged 就得真的一个字没改
        continue;
      }
      next.push({ ...entry, ...目标.get(key), extra: { ...(entry.extra || {}), ...目标.get(key).extra }, uid: entry.uid });
    }
    for (const entry of plan) {
      if (用过的[entry.entryKey]) continue;
      next.push(目标.get(entry.entryKey));
    }

    // 要不要真的写？全是 unchanged / skipped ⇒ **一次都不调世界书接口**（不惊动酒馆、不动文件）
    const 需要写 = added.length > 0 || modified.length > 0 || removed.length > 0;
    return { next, added, modified, skipped, unchanged, removed, conflict, 需要写 };
  }

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

    /**
     * 目标世界书 ＝ **角色绑定的那一本**（角色的 `data.extensions.world`），
     * 也就是酒馆助手 `getCharWorldbookNames('current').primary` 报的那本
     * （JSR 的 `lorebook.ts` 就是读 `character.data.extensions.world`）。
     *
     * 🔴 2026-10-02 变更 1：**不再用「当前聊天那本」**。工坊装的是给这个角色用的世界因子，
     *   而卡自己的世界书（导入「卡内世界书」得到的那本，月痕是 157 条）就绑在角色上 ——
     *   装进它，之后**新开的每个聊天都生效**；装进聊天世界书只在那一个对话里生效。
     *   出处：`卡内桥_方案.md` §0.5（驾驶员 2026-10-02 拍板「改成：月痕之民那本」）。
     *
     * `supported=false` ⇒ 酒馆助手太老、根本没有这个接口（老版本只能拿到聊天世界书，
     * 但那条路已经废弃）—— 页面据此显示「更新酒馆助手」，而不是「没绑书」，两者要分清。
     */
    function targetSummary() {
      const getCharBooks = api('getCharWorldbookNames');
      const supported = typeof getCharBooks === 'function';
      let name = null;
      if (supported) {
        try {
          const books = getCharBooks('current');
          const primary = books && books.primary;
          name = typeof primary === 'string' && primary ? primary : null;
        } catch {
          name = null;
        }
      }
      let exists = false;
      if (name) {
        const getNames = api('getWorldbookNames');
        try {
          exists = typeof getNames === 'function' ? getNames().includes(name) : true;
        } catch {
          exists = true;
        }
      }
      return { worldbookName: name, exists, supported };
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

    // ---- 角色正则读写（唯一出口）----
    //
    // 🔴 三处"真机上是这样的"，都从源码核过，不这么写就会静默干错事：
    //
    // 1. **没当前角色时，读会读到别人身上**。`getTavernRegexes({type:'character'})` 走
    //    `RawCharacter.findIndex('current')` → `this_chid === undefined` 时返回 **-1**，
    //    而 `characters.at(-1)` 是**数组最后一个角色**（不是 undefined）⇒ 群聊/没选角色时
    //    读到的是**最后一个角色**的正则。写的那一侧有 `id === -1` 就抛错的保护，读的这一侧没有。
    //    ⇒ 所以读之前必须先确认"有当前角色"。出处：JSR `src/function/raw_character.ts:89`
    //    ＋ `src/function/tavern_regex.ts:122`。
    // 2. **写入接口不返回"写后重读"**：`updateTavernRegexesWith` 返回的是 **updater 自己的返回值**
    //    （`src/function/tavern_regex.ts:335`）⇒ 核对必须自己再 `getTavernRegexes` 读一遍，
    //    这一点和世界书那几个接口**正好相反**（那边返回的才是真值）。
    // 3. **写正则 = 改角色卡**：角色正则存在 `character.data.extensions.regex_scripts`，
    //    `replaceTavernRegexes({type:'character'})` 最后 `writeExtensionField` → POST
    //    `/api/characters/edit` ⇒ **卡文件会被改写**（和玩家在正则面板里手动加一条是一回事）。
    //    不是"只写世界书"那半边了 —— 这一条要在回执里对页面说清。
    //
    // 另外：写入后会 `render_tavern_regexes_debounced()`（重刷整屏消息 + 发 CHAT_CHANGED），
    // 是个**慢操作** ⇒ 装/升/卸各只写一次，绝不在循环里写。

    /** 有没有"当前角色"。没有就别碰角色正则（见上面第 1 条）。 */
    function hasCurrentCharacter() {
      const getId = api('getCurrentCharacterId');
      if (typeof getId === 'function') {
        try {
          return Boolean(getId());
        } catch {
          /* 落到下面的退路 */
        }
      }
      const getName = api('getCurrentCharacterName');
      if (typeof getName === 'function') {
        try {
          const name = getName();
          return typeof name === 'string' && name.length > 0;
        } catch {
          return false;
        }
      }
      return false;
    }

    function requireCurrentCharacter(干什么) {
      if (!hasCurrentCharacter()) fail('no-character', `现在没有选中的角色，${干什么}要用到"这个角色的正则" —— 先选一个角色再来。`);
    }

    /** 拿不到接口 ⇒ null（不是"没有正则"，那是 []） */
    function readCharacterRegexes() {
      const get = api('getTavernRegexes');
      if (typeof get !== 'function') return null;
      try {
        const list = get({ type: 'character' });
        return Array.isArray(list) ? list : [];
      } catch {
        return null;
      }
    }

    /** 这只角色的"局部正则"开关开没开；读不到接口 ⇒ null */
    function characterRegexAllowed() {
      const 问 = api('isCharacterTavernRegexesEnabled');
      if (typeof 问 !== 'function') return null;
      try {
        return 问() === true;
      } catch {
        return null;
      }
    }

    /**
     * 一次写完这只角色的全部正则（`next` 是**整份**新数组 —— 这个接口是全量替换，
     * 别人的条目必须原样带回去）。
     */
    async function writeCharacterRegexes(next) {
      const update = api('updateTavernRegexesWith');
      if (typeof update !== 'function') fail('internal', '桥没拿到正则接口，请把酒馆助手更新到新版。');
      try {
        await withTimeout(
          update(() => next, { type: 'character' }),
          '写入正则超时了。',
        );
      } catch (error) {
        if (error instanceof BridgeError) throw error;
        fail('regex-error', `写入正则失败了：${shortMessage(error)}`);
      }
    }

    /**
     * 写后核对：自己**重读**一遍（见上面第 2 条），按 id 找回来逐字段比。
     * 不依赖接口的返回值。
     */
    function sameRegex(实, 目标) {
      if (!实) return false;
      const 字段 = ['id', 'script_name', 'enabled', 'find_regex', 'replace_string', 'run_on_edit'];
      for (const 名 of 字段) if (实[名] !== 目标[名]) return false;
      if (JSON.stringify(实.trim_strings || []) !== JSON.stringify(目标.trim_strings || [])) return false;
      if (JSON.stringify(实.source || null) !== JSON.stringify(目标.source || null)) return false;
      if (JSON.stringify(实.destination || null) !== JSON.stringify(目标.destination || null)) return false;
      if (v2NumberOrNull(实.min_depth) !== v2NumberOrNull(目标.min_depth)) return false;
      if (v2NumberOrNull(实.max_depth) !== v2NumberOrNull(目标.max_depth)) return false;
      return true;
    }

    /**
     * 对账明细里那一行（世界书那边是 `{entryKey, name}`，正则这边报脚本名）。
     * 🔴 从**现存**正则上取时它身上没有 `entryKey` 字段 —— 条目键只活在 id 里
     *    （id = `yuehen_workshop:<包号>:<条目键>`），所以要从 id 拆回来。
     */
    const 正则行 = (item) => ({
      entryKey: item.entryKey || 正则的条目键(item.id) || null,
      scriptName: item.script_name || '',
    });

    /** 这条正在跑的正则是不是**这个包**装的（按 id 前缀认，见 §5.2） */
    const 是本包正则 = (item, packageId) => String((item && item.id) || '').indexOf(`${REGEX_ID_PREFIX}${packageId}:`) === 0;

    /** 从正则 id 里把包号拆出来（`yuehen_workshop:<包号>:<条目键>`；条目键不含冒号 ⇒ 从最后一个冒号切） */
    function 正则的包号(id) {
      const 全 = String(id || '');
      if (全.indexOf(REGEX_ID_PREFIX) !== 0) return null;
      const 余下 = 全.slice(REGEX_ID_PREFIX.length);
      const 切点 = 余下.lastIndexOf(':');
      return 切点 > 0 ? 余下.slice(0, 切点) : null;
    }

    function 正则的条目键(id) {
      const 包号 = 正则的包号(id);
      return 包号 === null ? null : String(id).slice((REGEX_ID_PREFIX + 包号 + ':').length);
    }

    /**
     * 正则的显示名：`[创意工坊] <包标题> - <正则名>` ⇒ 取回**包标题**。
     * 只在"世界书条目一条不剩、只剩正则"时用得上（那种项目没有条目能读出标题）。
     */
    function 正则显示名(item) {
      const 名 = String((item && item.script_name) || '');
      const 去头 = 名.indexOf(WORKSHOP_HEADER) === 0 ? 名.slice(WORKSHOP_HEADER.length).trim() : 名;
      const 切点 = 去头.lastIndexOf(' - ');
      const 标题 = 切点 > 0 ? 去头.slice(0, 切点) : 去头;
      return 标题 || '（未命名项目）';
    }

    /**
     * 正则对账（与世界书那套同一个思路：一条路覆盖装与升）。
     *
     * 顺序规则：**别人的保持相对原位，本项目的统一排在末尾、按包里的顺序**。
     * 这样"重装同一版"第二次跑出来和第一次写的完全一样 ⇒ 全 unchanged ⇒ 一次都不写，
     * 收敛且幂等（正则的数组顺序 = 执行顺序，所以顺序必须是可预测的）。
     *
     * 🔴 正则没有 `localChanged` 这一说：角色正则身上**没有能放基线的地方**
     *    （ST 的 `RegexScriptData` 没有 `extra` 那样的扩展袋），所以"玩家改过没有"分不出来。
     *    命定的成法也是升级就把本项目正则**卸了重装**（§6.2 第 4 条），本实现对账等价于此。
     */
    function reconcileRegexPlan(live, plan, packageId) {
      // 🔴 认领必须带**包号**：两个项目都叫 `yuehen_workshop:` 开头，
      //    只按公共前缀认的话，装 B 会把 A 的正则当"旧版多出来的"删掉（这个接口是整份替换）。
      const 前缀 = `${REGEX_ID_PREFIX}${packageId}:`;
      const 是我的 = (item) => String((item && item.id) || '').indexOf(前缀) === 0;
      const 目标表 = {};
      for (const item of plan) 目标表[item.id] = item;
      const 现有表 = {};
      for (const item of live) if (是我的(item)) 现有表[String(item.id)] = item;

      const added = [];
      const modified = [];
      const unchanged = [];
      const removed = [];
      for (const item of plan) {
        const 旧 = tableGet(现有表, item.id);
        if (!旧) added.push(正则行(item));
        else if (sameRegex(旧, item)) unchanged.push(正则行(item));
        else modified.push(正则行(item));
      }
      for (const item of live) {
        if (!是我的(item)) continue;
        if (!tableGet(目标表, String(item.id))) removed.push(正则行(item));
      }

      // 别人的原样、按原顺序；本项目的按包里顺序接在后面
      const 别人的 = live.filter((item) => !是我的(item));
      const 按编号 = {};
      for (const item of live) if (是我的(item)) 按编号[String(item.id)] = item;
      const 我的新的 = plan.map((item) => (tableGet(按编号, item.id) && sameRegex(按编号[item.id], item) ? 按编号[item.id] : item));
      return {
        next: 别人的.concat(我的新的),
        added, modified, unchanged, removed,
        需要写: added.length > 0 || modified.length > 0 || removed.length > 0,
      };
    }

    // ---- 安装登记（脚本变量，照 §5.3）----
    // 登记是**旁证不是主证**：世界书条目自己的 `extra` 才是"装没装"的凭据，
    // 所以脚本变量拿不到、写不进去，都只降级、不阻断安装。
    function registryScopeKey() {
      const getName = api('getCurrentCharacterName');
      let name = null;
      try {
        name = typeof getName === 'function' ? getName() : null;
      } catch {
        name = null;
      }
      return typeof name === 'string' && name ? name : NO_CHARACTER_KEY;
    }

    /** 返回登记对象；**null ＝ 这套接口拿不到**（不是"没登记过"，那是 `{}`） */
    function readRegistry() {
      const get = api('getVariables');
      const getScriptId = api('getScriptId');
      if (typeof get !== 'function' || typeof getScriptId !== 'function') return null;
      try {
        const variables = get({ type: 'script', script_id: getScriptId() });
        const raw = variables && variables[REGISTRY_KEY];
        return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
      } catch {
        return null;
      }
    }

    async function writeRegistry(registry) {
      const set = api('updateVariablesWith');
      const getScriptId = api('getScriptId');
      if (typeof set !== 'function' || typeof getScriptId !== 'function') return false;
      try {
        await set(
          (variables) => {
            variables[REGISTRY_KEY] = registry;
            return variables;
          },
          { type: 'script', script_id: getScriptId() },
        );
        return true;
      } catch {
        return false;
      }
    }

    /** 记下"这个包装在哪、什么版本"；失败只回 false，调用方不许因此报错 */
    async function rememberInstall(pkg, worldbookName) {
      const registry = readRegistry();
      if (!registry) return false;
      const scope = registryScopeKey();
      const 桶 = registry[scope] && typeof registry[scope] === 'object' ? registry[scope] : {};
      桶[String(pkg.id)] = {
        packageId: String(pkg.id),
        worldbookName,
        installedVersion: pkg.revision,
        originalEntryStates: [], // 留给"替换原版"（第五阶段）填，现在只占位
        installedAt: new Date().toISOString(),
      };
      registry[scope] = 桶;
      return writeRegistry(registry);
    }

    async function forgetInstall(packageId) {
      const registry = readRegistry();
      if (!registry) return false;
      const scope = registryScopeKey();
      const 桶 = registry[scope] && typeof registry[scope] === 'object' ? registry[scope] : {};
      if (!(packageId in 桶)) return true;
      delete 桶[packageId];
      registry[scope] = 桶;
      return writeRegistry(registry);
    }

    const 登记里那一版 = (registry, packageId) => {
      if (!registry) return null;
      const 桶 = registry[registryScopeKey()];
      const 条 = 桶 && typeof 桶 === 'object' ? 桶[packageId] : null;
      return 条 && typeof 条 === 'object' ? 条 : null;
    };

    // ---- 修复登记（同一条脚本变量，另开一个键；照安装登记那对助手写）----

    /** 返回修复记录表；**null ＝ 这套接口拿不到**（不是"没有记录"，那是 `{}`） */
    function readRepairRegistry() {
      const get = api('getVariables');
      const getScriptId = api('getScriptId');
      if (typeof get !== 'function' || typeof getScriptId !== 'function') return null;
      try {
        const variables = get({ type: 'script', script_id: getScriptId() });
        const raw = variables && variables[REPAIR_KEY];
        return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
      } catch {
        return null;
      }
    }

    async function writeRepairRegistry(表) {
      const set = api('updateVariablesWith');
      const getScriptId = api('getScriptId');
      if (typeof set !== 'function' || typeof getScriptId !== 'function') return false;
      try {
        await set(
          (variables) => {
            variables[REPAIR_KEY] = 表;
            return variables;
          },
          { type: 'script', script_id: getScriptId() },
        );
        return true;
      } catch {
        return false;
      }
    }

    /** 记一笔修复进度；写不进去只回 false —— 修复本身不许被它挡住（照 §5.3） */
    async function 记修复(repairId, patch) {
      const 表 = readRepairRegistry();
      if (!表) return false;
      表[repairId] = Object.assign(
        { repairId, updatedAt: new Date().toISOString() },
        表[repairId] && typeof 表[repairId] === 'object' ? 表[repairId] : {},
        patch,
      );
      表[repairId].updatedAt = new Date().toISOString();
      return writeRepairRegistry(表);
    }

    /** 修完了就把记录销掉（失败的那笔**留着** —— 那是给玩家的现场） */
    async function 销修复(repairId) {
      const 表 = readRepairRegistry();
      if (!表) return false;
      if (!(repairId in 表)) return true;
      delete 表[repairId];
      return writeRepairRegistry(表);
    }

    // ---- 动作：handshake / getContext / getEntries ----
    async function actionHandshake() {
      return {
        protocol: 1,
        bridge: { version: BRIDGE_VERSION },
        capabilities: CAPABILITIES.slice(),
        cardScope: CARD_SCOPE,
        textFormat: TEXT_FORMAT,
        entryModel: ENTRY_MODEL,
        regexModel: REGEX_MODEL,
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
      if (name !== target.worldbookName) fail('bad-request', '只能读这个角色绑定的那本世界书。');
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
      // §3.1 判路：有 `payload.entries` ⇒ v2。**不看版本字符串**（那是自由文本，等于让包自己挑解释器）。
      // 判的是"字段在不在"而不是"是不是数组"：v2 包把 entries 写成非数组时，
      // 要报 v2 那句"包里没有条目"，而不是 v1 的"没有世界因子"。
      const 送来 = payload.package;
      if (送来 && typeof 送来 === 'object' && 送来.payload && 送来.payload.entries !== undefined) return actionUpsertV2(payload);
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
      // 🔴 变更 1：目标书缺失一律**拒**，绝不代建。代建只能建出「当前聊天那本」，
      //   而落点已经改成「角色绑定的那本」—— 建错本比不装更糟（玩家会找不到装到哪去了）。
      if (!target.supported) fail('internal', '桥没拿到「角色世界书」接口，请把酒馆助手更新到新版。');
      if (!target.worldbookName) {
        fail('no-worldbook', '这个角色还没绑定世界书，装不进去。在酒馆里给角色绑上一本（月痕之民就是「导入卡内世界书」得到的那本），再回来装。');
      }
      if (!target.exists) {
        fail('no-worldbook', `角色绑定的世界书「${target.worldbookName}」找不到了，可能被删掉或改了名 —— 先在酒馆里重新绑定，再回来装。`);
      }

      const wbName = target.worldbookName;
      const entries = await readWorldbook(wbName);
      const mine = entries.filter((entry) => isSamePackage(entry, identity));

      if (mine.length > 1) fail('conflict', '世界书里有两条同源条目，请先手动处理。');
      const namesake = entries.find((entry) => classifyEntry(entry, identity, entryName) === 'collision');
      if (namesake) fail('conflict', '世界书里已有同名条目，它不属于这个包，桥不动它。');

      if (mine.length === 1) return updateExisting(wbName, mine[0], { pkg, identity, entryName, text, newHash, expected });

      if (expected.entryUid !== null) fail('conflict', '预览时那条条目现在找不到了，请重新预览。');
      if (expected.localEntryHash !== null) fail('conflict', '世界书刚被改过，请重新预览。');
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

    // ---- 动作：v2 装 / 升 / 已装扫描 / 差分 / 卸（§6、§7）----
    function validatePackageV2(pkg) {
      if (!pkg || typeof pkg !== 'object') fail('invalid-package', '这个包的内容不完整。');
      if (typeof pkg.id !== 'string' || !pkg.id) fail('invalid-package', '这个包没有编号。');
      if (!ALLOWED_PACKAGE_TYPES.includes(pkg.type)) fail('invalid-package', '这个包的类型月痕还装不了。');
      if (pkg.cardScope !== CARD_SCOPE) fail('invalid-package', '这个包不是给月痕之民的。');
      if (pkg.reviewStatus !== 'approved') fail('invalid-package', '这个包还没有过审。');
      if (!Number.isInteger(pkg.revision) || pkg.revision < 1) fail('invalid-package', '这个包的版本号不对。');
      if (typeof pkg.title !== 'string' || !pkg.title) fail('invalid-package', '这个包没有标题。');
      if (!/^[0-9a-f]{64}$/.test(String(pkg.contentHash || ''))) fail('invalid-package', '这个包的指纹格式不对。');
      return pkg; // 条目数组由 packageToEntries 校验（报错会指到第几条）
    }

    function validateExpectedV2(expected) {
      if (!expected || typeof expected !== 'object') fail('bad-request', '请求缺少预期值。');
      // 🔴 `worldbookName` **允许为空**：只带正则的扩展根本没有世界书那半（§22.1），页面那里就是 `null`。
      //    "空计划配空书名"这条一致性**不在这里判** —— 这儿看不见计划，硬判会把合法情形判错。
      const 书名 = expected.worldbookName;
      if (v2IsSet(书名) && 书名 !== null && typeof 书名 !== 'string') fail('bad-request', '目标世界书名不合法。');
      if (!/^[0-9a-f]{64}$/.test(String(expected.planHash || ''))) fail('bad-request', '条目清单指纹格式不对。');
      if (!Number.isInteger(expected.revision) || expected.revision < 1) fail('bad-request', '版本号不合法。');
      return {
        worldbookName: typeof 书名 === 'string' && 书名 ? 书名 : null,
        planHash: String(expected.planHash),
        revision: expected.revision,
        overwriteLocal: expected.overwriteLocal === true,
      };
    }

    function throwConflict(conflict) {
      const 撞名 = conflict.filter((item) => item.reason === 'collision');
      if (撞名.length) {
        fail('conflict', `世界书里已经有同名条目（${撞名.map((item) => item.name).join('、')}），它们不属于这个包，桥不动它们。请先在酒馆里改名或删掉，再回来装。`);
      }
      const 重复 = conflict.filter((item) => item.reason === 'duplicate');
      fail('conflict', `世界书里这个包有重复条目（${重复.map((item) => item.entryKey).join('、')}），请先手动处理。`);
    }

    /** 目标世界书的四道闸（v1 那四道，一字不差地复用判据） */
    function requireTarget(需要世界书) {
      const target = targetSummary();
      if (!target.supported) fail('internal', '桥没拿到「角色世界书」接口，请把酒馆助手更新到新版。');
      // 🔴 只带正则的包**世界书那半一个字都不写** ⇒ 没绑书也放行（§22.1）。
      //    `supported` 那道照旧卡着：桥太老的话，这条路上别的地方也走不通，
      //    与其开一条半通的路，不如让他先把酒馆助手更新了。
      if (需要世界书 === false) return target;
      if (!target.worldbookName) {
        fail('no-worldbook', '这个角色还没绑定世界书，装不进去。在酒馆里给角色绑上一本（月痕之民就是「导入卡内世界书」得到的那本），再回来装。');
      }
      if (!target.exists) {
        fail('no-worldbook', `角色绑定的世界书「${target.worldbookName}」找不到了，可能被删掉或改了名 —— 先在酒馆里重新绑定，再回来装。`);
      }
      return target;
    }

    /** v2 的装与升**同一条路**：一次回调里全量对账（§6.1），旧版多出来的条目顺带剔除（§6.2 的"全删重写"等价物） */
    async function actionUpsertV2(payload) {
      const pkg = validatePackageV2(payload.package);
      const expected = validateExpectedV2(payload.expected);
      const identity = packageIdentity(pkg);
      const plan = packageToEntries(pkg);
      const regexEntries = packageToRegexEntries(pkg);
      // 🔴 「这个包有没有世界书那半」——**只算这一次**，下面几处都看它。
      //    `plan` 为空是 `packageToEntries` 放行的（类型＝扩展 且 正则 ≥ 1 条），不是随便什么包都能空。
      const 只装正则 = plan.length === 0;
      // 🔴 带正则的包，**先验能不能装正则，再动世界书**（§15.3 第 4 条）：
      //    两件事分开做的话，会出现"世界书装进去了、正则悄悄没装"——玩家看到条目生效、
      //    正则不生效，而且没地方能看出少了什么。宁可整包拒。
      if (regexEntries.length) {
        requireCurrentCharacter('装这个包');
        if (readCharacterRegexes() === null) fail('internal', '桥没拿到正则接口，请把酒馆助手更新到新版。');
      }
      for (const entry of plan) {
        const 长度 = String(entry.content).length;
        if (长度 > MAX_ENTRY_CHARS) fail('too-large', `条目「${entry.name}」正文 ${长度} 字，超过上限 ${MAX_ENTRY_CHARS} 字。`);
      }
      // 页面与桥各算一遍摘要：对不上 ⇒ 有一边是旧版本，宁可不装也不装错
      if (planDigest(plan, regexEntries) !== expected.planHash) {
        fail('hash-mismatch', '页面算出的条目清单和桥算的对不上，已停止写入 —— 桥或页面有一边是旧版本，刷新页面（Ctrl+F5）再来。');
      }
      if (expected.revision !== pkg.revision) fail('bad-request', '预期版本号和包的版本号不一致。');

      const target = requireTarget(!只装正则);
      const wbName = 只装正则 ? null : target.worldbookName;
      // 目标书对不上＝预览之后世界书被换过 ⇒ 世界书那半必须重看。只带正则时没有目标书，这条不适用。
      if (!只装正则 && target.worldbookName !== expected.worldbookName) fail('conflict', '目标世界书和预览时不一样了，请重新预览。');
      const live = 只装正则 ? [] : await readWorldbook(wbName);
      const 预演 = reconcilePlan(live, plan, identity, pkg, expected.overwriteLocal);
      if (预演.conflict.length) throwConflict(预演.conflict);

      // 🔴 全是一字不差 / 跳过 ⇒ **一次都不调世界书接口**：不惊动酒馆、不动文件。
      //    「重装同一版 = 世界书一个字不变」这才是能拿 sha 验的承诺。
      let 实写 = null;
      if (预演.需要写) {
        const update = api('updateWorldbookWith');
        if (!update) fail('internal', '桥没拿到世界书接口，请更新酒馆助手。');
        try {
          await withTimeout(
            update(
              wbName,
              (worldbook) => {
                // 🔴 用**最新数组**重算一遍（§6.1 原则一）：不用预览时的快照。
                //    回调里抛错 ⇒ 整批一条都不写。
                const 现算 = reconcilePlan(worldbook, plan, identity, pkg, expected.overwriteLocal);
                if (现算.conflict.length) throwConflict(现算.conflict);
                实写 = 现算;
                return 现算.next;
              },
              { render: 'debounced' },
            ),
            '写入世界书超时了。',
          );
        } catch (error) {
          if (error instanceof BridgeError) throw error;
          fail('worldbook-error', `写入世界书失败了：${shortMessage(error)}`);
        }
      }

      // 写后重读核对：**不依赖 uid 被补上**（§13 未验证项），按包身份数条数、逐条比正文
      // 只带正则的包没读过世界书 —— `[]` 对 `plan.length === 0`，下面那圈一条都不会进。
      const after = 只装正则 ? [] : await readWorldbook(wbName);
      const 我的 = after.filter((entry) => v2IsSamePackage(entry, identity));
      if (我的.length !== plan.length) {
        fail('worldbook-error', `写入后核对没通过：世界书里本项目应该有 ${plan.length} 条，实际 ${我的.length} 条 —— 可能只写进去一部分。再点一次安装可以补齐（对账写入是重复安全的）。`);
      }
      const 明细 = 实写 || 预演; // 没写时以预演为准（两者在"没写"这一支上必然一致）
      const 跳过 = 明细.skipped.map((item) => item.entryKey);
      const 按编号 = new Map();
      for (const entry of 我的) 按编号.set(v2EntryKeyOf(entry), entry);
      for (const entry of plan) {
        const 写进去的 = 按编号.get(entry.entryKey);
        if (!写进去的) {
          fail('worldbook-error', `写入后核对没通过：条目「${entry.name}」没找到，已停下。`);
        }
        if (跳过.indexOf(entry.entryKey) >= 0) continue; // 跳过的保留玩家本地版本，正文本来就该对不上
        if (写进去的.content !== entry.content || 写进去的.name !== entry.name) {
          fail('worldbook-error', `写入后核对没通过：条目「${entry.name}」的内容和预期不一致，已停下。`);
        }
      }

      // ---- 正则那半（世界书写完、核对过了才动；整份一次写完，见正则区第 3 条）----
      let 正则明细 = { added: [], modified: [], unchanged: [], removed: [] };
      let 正则写了 = false;
      if (regexEntries.length) {
        const 现读 = readCharacterRegexes();
        // 🔴 读不出来时**不能**拿 `[]` 顶替：那会把"别人的正则"当成不存在，
        //    写回去的一份里就没有它们了（这个接口是整份替换）⇒ 宁可停手。
        if (现读 === null) fail('regex-error', '读不到这个角色的正则，已停止写入 —— 这次世界书那半也没动，刷新页面再来。');
        const 对账 = reconcileRegexPlan(现读, regexEntries, String(pkg.id));
        正则明细 = 对账;
        if (对账.需要写) {
          await writeCharacterRegexes(对账.next);
          // 写后**自己重读**（`updateTavernRegexesWith` 返回的不是写后真值，见正则区第 2 条）
          const 重读 = readCharacterRegexes();
          if (重读 === null) fail('regex-error', '写入正则后读不回来了，请刷新页面再看一次。');
          const 我的正则 = 重读.filter((item) => 是本包正则(item, String(pkg.id)));
          if (我的正则.length !== regexEntries.length) {
            fail('regex-error', `写入后核对没通过：这个项目的正则应该有 ${regexEntries.length} 条，实际 ${我的正则.length} 条 —— 可能只写进去一部分。世界书那半已经装好了，再点一次安装会把正则补齐（对账写入是重复安全的）。`);
          }
          const 找回 = new Map();
          for (const item of 我的正则) 找回.set(String(item.id), item);
          for (const item of regexEntries) {
            const 写进去的 = 找回.get(item.id);
            if (!写进去的 || !sameRegex(写进去的, item)) {
              fail('regex-error', `写入后核对没通过：正则「${item.script_name}」和预期不一致 —— 世界书那半已经装好了，再点一次安装会重写它。`);
            }
          }
          正则写了 = true;
        }
      }

      const 首次装 = !live.some((entry) => v2IsSamePackage(entry, identity));
      const 登记写进去了 = await rememberInstall(pkg, wbName);
      return {
        action: 首次装 ? 'installed' : 'updated',
        entryModel: ENTRY_MODEL,
        worldbookName: wbName,
        revision: pkg.revision,
        entryCount: plan.length,
        entryKeys: plan.map((entry) => entry.entryKey),
        wrote: Boolean(实写), // 这次到底动没动世界书（全 unchanged 时 false）
        added: 明细.added,
        modified: 明细.modified,
        skipped: 明细.skipped,
        unchanged: 明细.unchanged,
        removed: 明细.removed,
        regexModel: REGEX_MODEL,
        regexCount: regexEntries.length,
        regexKeys: regexEntries.map((item) => item.entryKey),
        // 这次到底动不动正则（带正则的包全 unchanged 时 false）。两半各报各的：
        // 世界书那半没动不代表正则没动，反过来也一样。
        regexWrote: 正则写了,
        regexAdded: 正则明细.added,
        regexModified: 正则明细.modified,
        regexUnchanged: 正则明细.unchanged,
        regexRemoved: 正则明细.removed,
        // 这只角色的「允许局部正则」开关。false ⇒ 正则**装进去了但不会跑**，
        // 得玩家自己开（正则区开头那个闸门）；页面要据此显眼提示，别让玩家以为装死了。
        regexAllowed: regexEntries.length ? characterRegexAllowed() : null,
        registered: 登记写进去了,
      };
    }

    async function actionGetProjectDiff(payload) {
      if (!payload || typeof payload !== 'object') fail('bad-request', '请求格式不对。');
      const pkg = validatePackageV2(payload.package);
      const identity = packageIdentity(pkg);
      const plan = packageToEntries(pkg);
      const regexEntries = packageToRegexEntries(pkg);
      const target = targetSummary();
      if (!target.supported) fail('internal', '桥没拿到「角色世界书」接口，请把酒馆助手更新到新版。');
      // 预览与写入**同一套判据**（§6.1 原则一）：装的时候会因为这两条被拒的包，
      // 预览时就得说清，不能让玩家看到"能装"再点下去吃一个错。
      let 正则现状 = null;
      if (regexEntries.length) {
        requireCurrentCharacter('预览这个包');
        正则现状 = readCharacterRegexes();
        if (正则现状 === null) fail('internal', '桥没拿到正则接口，请把酒馆助手更新到新版。');
      }
      const 共同项 = {
        entryModel: ENTRY_MODEL,
        worldbookName: target.worldbookName,
        revision: pkg.revision,
        entryCount: plan.length,
        regexCount: regexEntries.length,
        regexModel: REGEX_MODEL,
        regexAllowed: regexEntries.length ? characterRegexAllowed() : null,
        planHash: planDigest(plan, regexEntries),
      };
      // 正则差分算在分支**之前**：下面那条"没书"的早退也要报真差分，不能全算新增
      const 正则结果 = regexEntries.length
        ? reconcileRegexPlan(正则现状, regexEntries, String(pkg.id))
        : { added: [], modified: [], unchanged: [], removed: [] };
      if (!target.worldbookName || !target.exists) {
        // 🔴 这里**不判"挡不挡"**，只如实报「没书」＋「本来会做什么」——
        //    挡不挡是页面的事：要写世界书的包没书＝挡；只带正则的包没书＝照装（§22.1）。
        //    正则该报**真差分**（不是"全算新增"）：只带正则的包装过之后再预览，
        //    得看得出"一条都没变"，不能每次都说"要新增 3 条"。
        return {
          ...共同项, exists: false, mode: 'install',
          added: plan.map(行), modified: [], skipped: [], unchanged: [], removed: [], conflict: [],
          regexAdded: 正则结果.added, regexModified: 正则结果.modified,
          regexUnchanged: 正则结果.unchanged, regexRemoved: 正则结果.removed,
        };
      }
      const live = await readWorldbook(target.worldbookName);
      const 结果 = reconcilePlan(live, plan, identity, pkg, payload.overwriteLocal === true);
      const 登记 = 登记里那一版(readRegistry(), String(pkg.id));
      const 首次 = !live.some((entry) => v2IsSamePackage(entry, identity));
      return {
        ...共同项,
        exists: true,
        mode: 首次 ? 'install' : 'upgrade',
        fromVersion: 首次 ? null : (登记 && 登记.installedVersion !== undefined ? 登记.installedVersion : null),
        added: 结果.added,
        modified: 结果.modified,
        skipped: 结果.skipped,
        unchanged: 结果.unchanged,
        removed: 结果.removed,
        conflict: 结果.conflict,
        regexAdded: 正则结果.added,
        regexModified: 正则结果.modified,
        regexUnchanged: 正则结果.unchanged,
        regexRemoved: 正则结果.removed,
      };
    }

    /** 已装项目显示名：v2 用包标题（只作显示）；v1 那一条的名字去掉我们的前缀 */
    function 已装显示名(组) {
      for (const item of 组) {
        const 标题 = String((item.meta && item.meta.packageTitle) || '');
        if (标题) return 标题;
      }
      const 名 = String((组[0].entry && 组[0].entry.name) || '');
      return 名.indexOf(ENTRY_PREFIX) === 0 ? 名.slice(ENTRY_PREFIX.length) : 名;
    }

    async function actionListInstalledProjects() {
      const target = targetSummary();
      if (!target.supported) fail('internal', '桥没拿到「角色世界书」接口，请把酒馆助手更新到新版。');
      const 读不出来 = [];
      let rows = [];
      if (target.worldbookName) {
        if (target.exists) rows = await readWorldbook(target.worldbookName);
        else 读不出来.push(target.worldbookName); // 书没了 ⇒ 如实报"扫不全"，不是"没装"
      }
      // 正则那半：**没有当前角色就不读**（读了会落到名单最后一个角色身上，见正则区第 1 条）。
      // 读不成不报错：世界书那半照样列得出来，只是把"正则这半边没扫"如实报出去。
      const 有角色 = hasCurrentCharacter();
      const 正则list = 有角色 ? readCharacterRegexes() : null;
      const 正则可用 = 正则list !== null;
      const 正则组 = {};
      for (const item of 正则list || []) {
        const 包号 = 正则的包号(item.id);
        if (!包号) continue;
        if (!正则组[包号]) 正则组[包号] = [];
        正则组[包号].push(item);
      }
      const registry = readRegistry();
      const 分组 = {};
      for (const entry of rows) {
        const meta = managedMetaOf(entry);
        if (!meta || !meta.packageId) continue;
        const id = String(meta.packageId);
        if (!分组[id]) 分组[id] = [];
        分组[id].push({ entry, meta });
      }
      // 并集：只装了正则、世界书条目一条不剩的项目**也要列出来**（否则玩家看得见正则、
      // 却在这张表里找不到它，卸载入口就没了）
      const 全部包号 = Object.keys(分组).concat(Object.keys(正则组).filter((id) => !分组[id]));
      const projects = 全部包号.map((packageId) => {
        const 组 = 分组[packageId] || [];
        const 正则们 = 正则组[packageId] || [];
        const 条 = 登记里那一版(registry, packageId);
        const 第一 = 组.length ? 组[0].meta : null;
        const 是v2 = 组.some((item) => item.meta.kind === META_KIND_ENTRY) || 正则们.length > 0;
        // 没有登记时的退路：取**最大** revision，不是第一条的 —— 升级只改了一部分条目时，
        // 一字不差那几条的 meta 仍停在旧版本号（它们是原样放回的），只看第一条会报低。
        const 版本们 = 组.map((item) => v2NumberOrNull(item.meta.revision)).filter((value) => value !== null);
        return {
          packageId,
          name: 组.length ? 已装显示名(组) : (正则们.length ? 正则显示名(正则们[0]) : packageId),
          entryModel: 是v2 ? 2 : 1,
          localVersion: (条 && 条.installedVersion !== undefined ? 条.installedVersion : null) ??
            (版本们.length ? Math.max(...版本们) : null),
          entryCount: 组.length,
          entryKeys: 是v2 ? 组.map((item) => item.meta.entryKey).filter(Boolean) : [],
          regexCount: 正则们.length,
          regexKeys: 正则们.map((item) => 正则的条目键(item.id)).filter(Boolean),
          worldbookName: (条 && 条.worldbookName) || (组.length ? target.worldbookName : null),
          installedAt: (条 && 条.installedAt) || (第一 && 第一.installedAt) || null,
          registered: Boolean(条),
        };
      });
      return {
        worldbookName: target.worldbookName,
        exists: Boolean(target.worldbookName && target.exists),
        complete: 读不出来.length === 0,
        unreadableWorldbookNames: 读不出来,
        registryAvailable: registry !== null,
        entryModel: ENTRY_MODEL,
        regexModel: REGEX_MODEL,
        regexAvailable: 正则可用,
        // 这只角色的「允许局部正则」开关。装了正则却没开 ⇒ 正则一条都不会跑（正则区开头那个闸门），
        // 页面要据此显眼提示 —— 这张表上"装了正则的项目"就是会踩这条的那些。
        characterRegexAllowed: 有角色 ? characterRegexAllowed() : null,
        projects,
      };
    }

    async function actionUninstallProject(payload) {
      if (!payload || typeof payload !== 'object') fail('bad-request', '请求格式不对。');
      const packageId = String(payload.packageId || '');
      if (!packageId) fail('bad-request', '请求没说要卸哪个包。');
      const target = targetSummary();
      if (!target.supported) fail('internal', '桥没拿到「角色世界书」接口，请把酒馆助手更新到新版。');
      if (payload.worldbookName !== undefined && payload.worldbookName !== null && target.worldbookName && payload.worldbookName !== target.worldbookName) {
        fail('bad-request', '只能卸这个角色绑定的那本世界书里的东西。');
      }
      // 🔴 这里**不**卡"书必须在"：书被删掉/这个角色没绑书时，正则与登记还在，
      //    玩家得有条路把它们清掉 —— 否则列表里那一条永远卸不掉（阶段 2 是卡住的，阶段 3 放开）。
      const wbName = target.worldbookName;
      const 世界书能读 = Boolean(wbName && target.exists);
      const 是我包的 = (entry) => {
        const meta = managedMetaOf(entry);
        return Boolean(meta) && String(meta.packageId || '') === packageId;
      };

      // ---- 正则先删，世界书后删 ----
      // 顺序是刻意的：孤儿世界书条目只是躺着不生效，**孤儿正则还会主动改显示**
      // （它是替换规则，玩家会直接看到版面被改坏）⇒ 先拆会咬人的那个。
      // 一次写回（整份替换），写后重读核对。
      let 删正则 = null;
      let 正则条目键 = [];
      if (hasCurrentCharacter()) {
        const 现有 = readCharacterRegexes();
        if (现有 !== null) {
          const 我的正则 = 现有.filter((item) => 是本包正则(item, packageId));
          正则条目键 = 我的正则.map((item) => 正则的条目键(item.id)).filter(Boolean);
          删正则 = 我的正则.length;
          if (我的正则.length) {
            const 留下 = 现有.filter((item) => !是本包正则(item, packageId));
            await writeCharacterRegexes(留下);
            const 重读 = readCharacterRegexes();
            if (重读 === null) fail('regex-error', '删完正则后读不回来了，请刷新页面再看一次。');
            const 残留 = 重读.filter((item) => 是本包正则(item, packageId)).length;
            if (残留 > 0) fail('regex-error', `卸载后核对没通过：还剩 ${残留} 条这个项目的正则没删掉，请再点一次卸载。`);
            if (重读.length !== 留下.length) {
              fail('regex-error', `卸载后核对没通过：这个角色应该还剩 ${留下.length} 条正则，实际 ${重读.length} 条 —— 别人的正则可能被动了，请刷新页面核对一遍。`);
            }
          }
        }
      }

      const live = 世界书能读 ? await readWorldbook(wbName) : [];
      const 我的 = live.filter(是我包的);
      if (我的.length === 0) {
        return {
          packageId, worldbookName: wbName, worldbookScanned: 世界书能读,
          deletedEntries: 0, entryKeys: [], remainingEntries: 0, othersIntact: true,
          deletedRegexes: 删正则, regexKeys: 正则条目键,
          registryCleared: await forgetInstall(packageId),
        };
      }
      const remove = api('deleteWorldbookEntries');
      if (!remove) fail('internal', '桥没拿到世界书接口，请更新酒馆助手。');
      let 结果;
      try {
        结果 = await withTimeout(remove(wbName, 是我包的, { render: 'debounced' }), '卸载超时了。');
      } catch (error) {
        if (error instanceof BridgeError) throw error;
        fail('worldbook-error', `卸载失败了：${shortMessage(error)}`);
      }
      const 删掉 = 结果 && Array.isArray(结果.deleted_entries) ? 结果.deleted_entries.length : null;
      const registryCleared = await forgetInstall(packageId);
      // 写后重读核对：这个包的条目真没了、别人的一条没少
      const after = await readWorldbook(wbName);
      const 残留 = after.filter(是我包的).length;
      if (残留 > 0) {
        fail('worldbook-error', `卸载后核对没通过：还剩 ${残留} 条没删掉，请再点一次卸载。`);
      }
      return {
        packageId,
        worldbookName: wbName,
        worldbookScanned: true,
        deletedEntries: 删掉 === null ? 我的.length : 删掉,
        entryKeys: 我的.map((entry) => v2EntryKeyOf(entry)).filter(Boolean),
        remainingEntries: 0,
        othersIntact: after.length === live.length - 我的.length,
        // null ＝ 没扫正则（没当前角色 / 没接口），不是"删了 0 条"
        deletedRegexes: 删正则,
        regexKeys: 正则条目键,
        registryCleared,
      };
    }

    // ---- 动作：repairScan / repairProject（修复：扫残骸 ＋ 按 uid 快照清干净再重装）----
    //
    // 修的是**工坊自己留下的残骸**：装到一半被打断、元数据缺件、留着 v1 老条目、条目键重复……
    // 这些状态"再点一次安装"修不好 —— 对账写入（`reconcilePlan`）只认自己写得出的身份
    // （包身份三件套 ＋ 条目键）：认不出的一律当"别人的条目"，轻则原样留着（残骸永远躺在那），
    // 重则撞名/重复 ⇒ `conflict` 直接把整包装配拒掉。
    // ⇒ 只有一条路：**按 uid 快照把残骸删干净，再按最新版重装**（最新版由页面取好递进来）。
    //
    // 删是危险动作，所以照成法三道闸：
    //   ① 要删的必须有 **uid 快照**（认不出的条目，uid 是唯一的把手）；
    //   ② 快照不全一律拒（扫描看到 N 条、递进来 M 条 ⇒ 删一半留一半，是最糟的结果）；
    //   ③ 删完独立重读核对，装完再确认残骸没回来。
    //
    // 🔴 名字只当**线索**不当身份（E5 §8.1）：`[创意工坊]` 开头却没有我们 `extra` 的条目
    //    一律只**列出来给玩家看**，绝不凭名字自动删 —— 那可能只是别人的条目长得像。
    // 🔴 正则不进快照：正则 id 里自带包号＋条目键，对账写入按 id 全覆盖、连"旧版删掉的"
    //    都会剔掉（`reconcileRegexPlan`）⇒ 删了再装等于白写两遍角色卡文件（写正则 = 改卡，
    //    而且是重刷整屏的慢操作）。正则是**对账的事**，不是修复的事。

    /** 条目 uid 的统一文本形（比较一律用它：ST 给的是数字，读回来可能是数字也可能是串） */
    function uid文本(entry) {
      const 原 = entry && entry.uid;
      if (typeof 原 === 'number' && Number.isFinite(原)) return String(原);
      if (typeof 原 === 'string' && 原) return 原;
      return null;
    }

    function 去重(list) {
      const 出 = [];
      const 见过 = new Set();
      for (const 项 of list) {
        const 键 = String(项);
        if (见过.has(键)) continue;
        见过.add(键);
        出.push(项);
      }
      return 出;
    }

    /** 兜底分组用的"项目名"：`[创意工坊][分类]名字` → 名字（元数据认不出时只剩这条线索） */
    function 名字里的项目名(name) {
      let 余 = String(name || '');
      if (余.indexOf(WORKSHOP_HEADER) === 0) 余 = 余.slice(WORKSHOP_HEADER.length);
      if (余.charAt(0) === '[') 余 = 余.slice(余.indexOf(']') + 1);
      return 余.trim() || '（未能命名的条目）';
    }

    /**
     * 扫这本书里所有"工坊痕迹"，按项目分组，逐组标出**不完整在哪**（`problems` 人话）。
     *
     * 分组：**认得出包号就按包号，认不出才退到显示名**（名字是线索不是身份）。
     * 扫不到的书（没绑书 / 书被删了 / 读接口报错）如实进 `unreadableWorldbookNames`，**不抛**。
     */
    async function actionRepairScan() {
      const target = targetSummary();
      if (!target.supported) fail('internal', '桥没拿到「角色世界书」接口，请把酒馆助手更新到新版。');
      // 🔴 **没绑书不硬拒**（与卸载同一条路，§22.1）：只带正则的包根本没有世界书那半，玩家在
      //    "没绑书"这状态下照样能装、能看已装、能卸 —— 修复扫描要是把他顶回去，他收到的是
      //    "没有要修的东西"，而真相是**这一遍压根没扫**。候选只从世界书条目里长出来，所以没书
      //    ⇒ 零候选、重装那条路本来就走不到，`actionRepairProject` 那道的闸照旧留着。
      const 世界书能读 = Boolean(target.worldbookName && target.exists);
      const 读不出来 = [];
      let rows = [];
      if (世界书能读) {
        try {
          rows = await readWorldbook(target.worldbookName);
        } catch {
          读不出来.push(target.worldbookName); // 读不出来就如实报"没扫全"，不许说成"书里干净"
        }
      } else if (target.worldbookName) {
        读不出来.push(target.worldbookName); // 绑了、但书找不到了 —— 与"压根没绑"分开报
      }

      const 有角色 = hasCurrentCharacter();
      const 正则list = 有角色 ? readCharacterRegexes() : null;
      const registry = readRegistry();
      const 修复表 = readRepairRegistry();

      // 挑出"跟工坊有关"的条目：有我们的元数据，**或者**名字像工坊的。两者都不是的连报都不报
      // —— 这是要玩家拿主意的账本，不是全书的清单。
      const 分组 = new Map();
      for (const entry of rows) {
        const meta = managedMetaOf(entry);
        const name = String((entry && entry.name) || '');
        if (!meta && name.indexOf(WORKSHOP_HEADER) !== 0) continue;
        const 包号 = meta && meta.packageId ? String(meta.packageId) : null;
        const 键 = 包号 ? `id:${包号}` : `名:${name}`;
        if (!分组.has(键)) 分组.set(键, []);
        分组.get(键).push({ entry, meta });
      }

      const candidates = [];
      for (const [键, 条们] of 分组) {
        const packageId = 键.indexOf('id:') === 0 ? 键.slice(3) : null;
        const 有元数据 = 条们.filter((条) => 条.meta);
        const 认不出 = 条们.filter((条) => !条.meta);
        const 缺件 = 条们.filter((条) => 条.meta && (!条.meta.packageId || (条.meta.kind === META_KIND_ENTRY && !条.meta.entryKey)));
        const 老v1 = 条们.filter((条) => 条.meta && 条.meta.kind === META_KIND);
        // 条目键重复：第一个对账认得出，**多出来的副本**它只会判 conflict（装不下去）
        const 见过 = new Set();
        const 重复副本 = [];
        for (const 条 of 条们) {
          if (!条.meta || 条.meta.kind !== META_KIND_ENTRY) continue;
          const 条目键 = String(条.meta.entryKey || '');
          if (!条目键) continue;
          if (见过.has(条目键)) 重复副本.push(条);
          else 见过.add(条目键);
        }
        // 要清掉的 = 对账**认不出**的 ＋ 重复键多出来的副本（这些正是"安装修不好"的那些）
        const 要删 = [...new Set([...认不出, ...缺件, ...老v1, ...重复副本])];
        const uids = [];
        for (const 条 of 要删) {
          const uid = uid文本(条.entry);
          if (uid !== null && uids.indexOf(uid) < 0) uids.push(uid);
        }
        const 没uid = 要删.length - uids.length;
        const 项目名 = 有元数据.length ? 已装显示名(有元数据) : 名字里的项目名(条们[0].entry.name);

        const problems = [];
        if (认不出.length) {
          problems.push(`${认不出.length} 条名字像工坊条目、身上却没有工坊标记 —— 认不出是哪个项目装的，只能按 uid 删掉它们`);
        }
        if (老v1.length) {
          problems.push(`${老v1.length} 条是 v1 老版本留下的整包条目，v2 的对账认不出它们，会一直躺在书里`);
        }
        if (缺件.length) {
          problems.push(`${缺件.length} 条缺件（没有项目编号或条目键），升级和删除都认不出它们`);
        }
        if (重复副本.length) {
          problems.push(`条目键重复：${去重(重复副本.map((条) => String(条.meta.entryKey))).join('、')}（重复的副本会让安装直接报"冲突"，装不下去）`);
        }
        if (没uid) {
          problems.push(`要清的 ${要删.length} 条里有 ${没uid} 条读不到 uid ⇒ 删不掉，修复会被拒绝（桥不许盲删）`);
        }

        const 是v2 = 有元数据.some((条) => 条.meta.kind === META_KIND_ENTRY);
        const 登记条 = packageId ? 登记里那一版(registry, packageId) : null;
        const 版本们 = 有元数据.map((条) => v2NumberOrNull(条.meta.revision)).filter((值) => 值 !== null);
        const 登记版本 = 登记条 && 登记条.installedVersion !== undefined ? 登记条.installedVersion : null;
        candidates.push({
          candidateId: `${target.worldbookName}::${packageId || 项目名}`,
          name: 项目名,
          packageId,
          worldbookName: target.worldbookName,
          entryModel: 是v2 ? 2 : (有元数据.length ? 1 : null),
          localVersion: 登记版本 ?? (版本们.length ? Math.max(...版本们) : null),
          entryCount: 条们.length,
          entryKeys: 条们.map((条) => v2EntryKeyOf(条.entry)).filter(Boolean),
          // 修复要按这两样删：`entryUids` 是能定位的把手，`expectedEntryCount` 是**应该有几条**
          //（含读不到 uid 的）—— 页面把两个数原样递回来，桥就能自己发现"快照被截断了"
          entryUids: uids,
          expectedEntryCount: 要删.length,
          unaddressableEntryCount: 没uid,
          problems,
        });
      }

      const pending = 修复表
        ? Object.keys(修复表).map((repairId) => {
            const 条 = 修复表[repairId] && typeof 修复表[repairId] === 'object' ? 修复表[repairId] : {};
            return {
              repairId,
              candidateId: String(条.candidateId || ''),
              packageId: String(条.packageId || ''),
              worldbookName: String(条.worldbookName || ''),
              status: String(条.status || 'unknown'),
              error: 条.error ? String(条.error) : null,
              updatedAt: String(条.updatedAt || ''),
            };
          })
        : [];

      return {
        worldbookName: target.worldbookName,
        exists: Boolean(target.worldbookName && target.exists),
        // 🔴 "扫全了" ＝ **真的扫过** 且没读漏。没绑书时 `读不出来` 是空的，光看它报 `complete: true`
        //    等于说"书里干净" —— 那是假话（这一遍压根没扫）。页面认这个字段决定说不说"没有要修的"。
        complete: 世界书能读 && 读不出来.length === 0,
        unreadableWorldbookNames: 读不出来,
        registryAvailable: registry !== null,
        repairRegistryAvailable: 修复表 !== null,
        entryModel: ENTRY_MODEL,
        regexModel: REGEX_MODEL,
        regexAvailable: 正则list !== null,
        characterRegexAllowed: 有角色 ? characterRegexAllowed() : null,
        candidates,
        pending,
      };
    }

    /** 修复任务的两道闸（照成法）：要清的必须**条条能定位**，否则一律拒 —— 桥不许盲删 */
    function 规范化修复目标(raw, wbName) {
      if (!raw || typeof raw !== 'object') fail('bad-request', '修复请求缺少修复目标。');
      const candidateId = String(raw.candidateId || '').trim();
      if (!candidateId) fail('bad-request', '修复请求缺少候选编号（candidateId）。');
      const 书 = String(raw.worldbookName || '').trim();
      if (书 !== wbName) {
        fail('conflict', `这个修复任务是冲着《${书 || '（没写书名）'}》扫的，现在绑定的却是《${wbName}》—— 重新扫一遍再来。`);
      }
      const uids = [];
      for (const 项 of Array.isArray(raw.entryUids) ? raw.entryUids : []) {
        const 文本 = typeof 项 === 'number' && Number.isFinite(项) ? String(项) : (typeof 项 === 'string' && 项 ? 项 : null);
        if (文本 === null) fail('bad-request', `修复目标里的 uid 既不是数字也不是字符串：${JSON.stringify(项)}。`);
        if (uids.indexOf(文本) < 0) uids.push(文本);
      }
      const 应有 = Number.isInteger(raw.expectedEntryCount) && raw.expectedEntryCount >= 0 ? raw.expectedEntryCount : null;
      // 闸①：没有可安全定位的旧内容 ⇒ 不许盲删
      if (uids.length === 0) {
        fail('bad-request', '这个候选没有可安全定位的旧内容（一条 uid 快照都没有）—— 桥不许盲删。它可能本来就没什么要清的（直接安装/升级就行），也可能扫过之后书变了，重新扫一遍再看。');
      }
      // 闸②：快照不全 ⇒ 一律拒（扫描看到 N 条、只递进来 M 条 ＝ 会删一半留一半）
      if (应有 !== null && uids.length !== 应有) {
        fail('bad-request', `旧条目快照不完整：扫描时这一组要清 ${应有} 条，只有 ${uids.length} 条能定位 —— 已禁止自动删除。请先在酒馆里手动处理那几条认不出的条目，或者重新扫一遍再看。`);
      }
      return { candidateId, worldbookName: 书, uids, 应有 };
    }

    /**
     * 修复一个项目：**按 uid 快照清掉对账认不出的残骸 → 按最新版重装 → 独立核对**。
     * 最新版的包由页面取好递进来（和安装同一个包对象），修复不自己去网上拿。
     */
    async function actionRepairProject(payload) {
      if (!payload || typeof payload !== 'object') fail('bad-request', '请求格式不对。');
      const pkg = validatePackageV2(payload.package);
      validateExpectedV2(payload.expected);
      const identity = packageIdentity(pkg);
      const target = requireTarget();
      const wbName = target.worldbookName;
      const 目标 = 规范化修复目标(payload.target, wbName);
      const packageId = String(pkg.id);
      const repairId = `${目标.candidateId}::${packageId}`;
      const 删的集合 = new Set(目标.uids);

      await 记修复(repairId, {
        candidateId: 目标.candidateId,
        packageId,
        worldbookName: wbName,
        status: 'preparing',
        error: null,
        startedAt: new Date().toISOString(),
        // 快照原样留档：万一删完就断电了，这一笔至少能告诉玩家"当时打算清哪些"
        entryUids: 目标.uids,
        expectedEntryCount: 目标.应有,
      });
      try {
        // ---- ① 先清残骸（按 uid，**不按名字**）----
        const 现在 = await readWorldbook(wbName);
        const 书里uid = new Set();
        for (const entry of 现在) {
          const uid = uid文本(entry);
          if (uid !== null) 书里uid.add(uid);
        }
        const 真在 = 目标.uids.filter((uid) => 书里uid.has(uid));
        let 删了 = 0;
        if (真在.length) {
          const remove = api('deleteWorldbookEntries');
          if (!remove) fail('internal', '桥没拿到世界书接口，请更新酒馆助手。');
          let 结果;
          try {
            结果 = await withTimeout(
              remove(wbName, (entry) => {
                const uid = uid文本(entry);
                return uid !== null && 删的集合.has(uid);
              }, { render: 'debounced' }),
              '清理旧痕迹超时了。',
            );
          } catch (error) {
            if (error instanceof BridgeError) throw error;
            fail('worldbook-error', `清理旧痕迹失败了：${shortMessage(error)}`);
          }
          删了 = 结果 && Array.isArray(结果.deleted_entries) ? 结果.deleted_entries.length : 真在.length;
        }
        // 删完**独立重读**核对：快照里那些真没了。
        // 这一条对账写入自己查不出来（残骸身上没有身份，它数不到），所以只能在这儿查。
        const 删后 = await readWorldbook(wbName);
        const 残留 = 删后.filter((entry) => {
          const uid = uid文本(entry);
          return uid !== null && 删的集合.has(uid);
        });
        if (残留.length) {
          fail('worldbook-error', `清理没干净：还有 ${残留.length} 条旧痕迹留在书里，已停手（新版一条都没装）。再点一次修复，或者去酒馆的世界书里手动删掉那几条。`);
        }
        await 记修复(repairId, { status: 'replacing', error: null, deletedEntries: 删了 });

        // ---- ② 按最新版重装（与"装"**同一条路**：预演→写入→写后核对全是它的活）----
        const 回执 = await actionUpsertV2(payload);

        // ---- ③ 装完再确认残骸没回来（对照的还是**同一份 uid 快照**）----
        // 判据里带上"仍然认不出"：新版条目万一被酒馆补了同一个 uid，那是新装的东西，不是残骸。
        await 记修复(repairId, { status: 'verifying', error: null });
        const 装后 = await readWorldbook(wbName);
        const 又出现 = 装后.filter((entry) => {
          const uid = uid文本(entry);
          return uid !== null && 删的集合.has(uid) && !v2IsSamePackage(entry, identity);
        });
        if (又出现.length) {
          fail('worldbook-error', `修复后核对没通过：刚清掉的 ${又出现.length} 条旧痕迹又出现在书里了，请刷新页面核对一遍。`);
        }
        await 销修复(repairId);
        return Object.assign({}, 回执, {
          action: 'repaired',
          installAction: 回执.action, // 这次重装到底是"首装"还是"升级"
          repair: {
            candidateId: 目标.candidateId,
            deletedEntries: 删了,
            expectedEntryCount: 目标.应有,
            entryCount: 回执.entryCount,
            regexCount: 回执.regexCount,
          },
        });
      } catch (error) {
        // 失败的那笔**留着**：状态机 preparing → replacing → verifying → failed，
        // 下次扫描会把它报在 `pending` 里，玩家能看出"上次修到哪一步炸的"。
        await 记修复(repairId, { status: 'failed', error: shortMessage(error) });
        throw error;
      }
    }

    // ---- 动作分发表 ----
    const ACTIONS = {
      handshake: actionHandshake,
      getContext: actionGetContext,
      getEntries: actionGetEntries,
      upsertWorkshopEntries: actionUpsert,
      listInstalledProjects: actionListInstalledProjects,
      getProjectDiff: actionGetProjectDiff,
      uninstallProject: actionUninstallProject,
      repairScan: actionRepairScan,
      repairProject: actionRepairProject,
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

    const runtime = {
      open,
      close,
      destroy,
      pure: {
        packageToWorldbookText,
        sha256Hex,
        classifyEntry,
        packageToEntries,
        packageToRegexEntries,
        formatWorkshopEntryName,
        formatWorkshopRegexName,
        planDigest,
        entryPayloadOf,
        reconcilePlan,
        v2EntryKeyOf,
        managedMetaOf,
        v2Defaults: {
          textFormat: V2_TEXT_FORMAT,
          regexIdPrefix: REGEX_ID_PREFIX,
          header: WORKSHOP_HEADER,
          orderBase: ENTRY_ORDER_BASE,
          depth: ENTRY_POSITION.depth,
          positionType: ENTRY_POSITION.type,
          categoryLabels: CATEGORY_LABELS,
          allowedTypes: ALLOWED_PACKAGE_TYPES,
          extensionKinds: EXTENSION_KINDS,
        },
      },
    };
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

/* ══════════════════════════════════════════════════════════════════════════
   月痕之民 · 全楼层美化 v4.3.2 —— 真身脚本
   （v4.2.0 → v4.3.1 这段本文件**一字未动**，改的都是 CSS；v4.3.2 是第一次动它：
     ① 判定请求 / ② 交锋对抗 的取值改成「按标签」＋ 关系符改真关系。
     方案 ＝ `备份与存档/归档/方案稿/_美化v4.3.2_判定行按标签取值.md`）
   ──────────────────────────────────────────────────────────────────────────
   🔴 这份文件是**从哪来的**：
      从方案稿 `备份与存档/归档/方案稿/_美化宿主原型/_定标_贴底图.html`
      里那个 `<script>`（55,779 字符）搬过来，**底图 / 粒子 / 星野 / 尺 / 开关
      那几段一个字没改**；只有**入口那一段**改了（见下面「本轮改了哪几处」）。

   🔴 它跑在**酒馆助手的楼层 iframe 里**，不是独立网页。三条随之而来的事实：
      ① `about:srcdoc` **没有 query string** ⇒ 原型里那套 `?sk=` / `?t=` / `?len=`
         截图参数在真机里**永远取空**，全部走默认值。本地预览页改用
         `window.__YH_Q` 传（预览页把它内联进 srcdoc），真机不定义它 ⇒ 结果一样是默认值。
      ② iframe 里 `window.parent` 是酒馆主窗口，但 `srcdoc` 的源是 opaque，
         **碰 parent 会抛** ⇒ 一律不碰，只用酒馆助手注入到**本 iframe 全局**的 API。
      ③ 酒馆助手 `predefine.js` 会把父窗口的 `showdown` / `TavernHelper` 和
         全部解绑成全局的 API 函数（`getChatMessages` / `getCurrentMessageId` …）
         **merge 进 iframe 的 window** ⇒ 这里可以直接裸调。

   🔴 本轮改了哪几处（**改完请照这张表复核**，别的地方应与原型逐字节相同）：
      A. 新增 `THEME` 常量（皮肤与各项默认档）—— 原型的默认值原样搬，一行没换。
      B. 新增 `readBody()`：`getChatMessages(getCurrentMessageId())` 取本楼**原始正文**。
         ⚠ 取的是 `message` 字段 ＝ `chat[i].mes`（**存储值**，显示层正则不改它）。
      C. `MSG` 从**手写演示数据**改成 `parseBody()` 解析出的结构（解析规则见那段注释）。
      D. `render()` 的目标从 `#chat` 改成**挂载点里建出来的** `#chat`。
      E. `#host` 由脚本在挂载点上建（壳里只有一个空的 `<div data-yh-mount>`）。
      F. `.bar`（标定工具条）**默认不建** —— 挂载点带 `data-yh-bar="1"` 才建。
      G. `q()` 改读 `window.__YH_Q`。
      H. 去掉 `MSG` 那段 `?len=` 量尺分支（它只服务原型截图）。

   ⚠ **未验证**：iframe 里 `showdown` / `builtin.renderMarkdown` 的实际可用性
      是**读 `predefine.js` 源码推出来的**，没在浏览器里跑过。
      本版本**不依赖**它们 —— 正文的粗体自己解，见 `inline()`。
   ══════════════════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════════════
   一 · 星图（复刻 `_3`）
   ─────────────────────────────────────────────────────────────────────
   坐标全部归一化 0~1，画的时候乘回原图尺寸 1080×1441 —— 这样 viewBox 就等于
   原图坐标系，量出来的数可以**原样填进来**，中间不做任何换算（换一次错一次）。

   标 `✔` 的是扫描线直接量到的顶点：
     t  (0.726,0.346) 顶上尖角 —— 由两条边反向延长求交得出
     L  (0.885,0.510) 右端
     v  (0.450,0.520) 左中汇聚（y=0.518 那一行挤了 5 个点，就是这儿）
     F' (0.271,0.752) 左下角（左缘 x 在 y=0.752 取到最小值 0.269）
     M  (0.730,0.932) 右下汇聚（y=0.923 那一行 5 条线收口）
   顺带被量出来的还有那束"铅笔线"：M 点上收口的是 v→M · b→M · C→M · r→M · L→M
   五条（各自反算回去的斜率都对得上）。未标注的是照图配的。
   ══════════════════════════════════════════════════════════════════════ */
var STAR = {
  V:{
    t:[.726,.346], L:[.885,.510], v:[.450,.520], Fp:[.271,.752], M:[.730,.932],   /* ✔ */
    m:[.400,.730], p:[.362,.792],                                                 /* 左下小三角 */
    y:[.630,.386], z:[.688,.412], a:[.652,.446],                                  /* 顶下小三角 */
    c:[.700,.556], k:[.742,.552], w:[.795,.566], e:[.782,.578], x:[.752,.588],    /* 中央网笼 */
    f:[.672,.596], b:[.700,.622], C:[.716,.638], r:[.742,.650],
    S:[.512,.648], T:[.556,.690],
    q:[.302,.892], s:[.420,.924], t2:[.503,.892], u:[.590,.924], w2:[.632,.896]   /* 底部平扇 */
  },
  E:[['t','v'],['t','L'],['v','L'],['v','M'],['L','M'],['v','Fp'],['Fp','M'],
     ['Fp','m'],['m','p'],['Fp','p'],['m','S'],
     ['y','z'],['z','a'],['a','y'],['y','v'],['z','L'],
     ['v','c'],['v','f'],['v','k'],['v','S'],['v','T'],['T','M'],
     ['c','k'],['k','w'],['w','e'],['e','x'],['x','C'],['f','b'],['b','C'],
     ['C','r'],['c','f'],['k','x'],['w','r'],['b','x'],
     ['b','M'],['C','M'],['r','M'],
     ['M','q'],['M','s'],['M','t2'],['M','u'],['M','w2'],
     ['q','s'],['s','t2'],['t2','u'],['u','w2']],
  /* 源图里那条**虚线**：从顶下小三角一路点下去，落到中央网笼 */
  D:[['z','C']],
  /* 顶点旁的原图字母。**这批小字母是"图纸感"的来源** ——
     去掉它们，剩下的只是一堆线；留着才读得出"这是一张测绘图"。 */
  LBL:[['t',.742,.338],['L',.896,.504],['v',.434,.512],["F'",.243,.760],['M',.742,.942],
       ['y',.618,.378],['z',.698,.404],['a',.636,.456],['N',.624,.424],
       ['m',.410,.722],['p',.348,.800],['S',.498,.654],['T',.546,.698],
       ['c',.688,.548],['k',.748,.542],['w',.804,.560],['e',.790,.586],['x',.760,.596],
       ['f',.660,.602],['b',.688,.630],['C',.704,.650],['r',.750,.656],
       ["q'",.288,.900],["s'",.426,.934],["t'",.494,.900],["u'",.594,.934],["w'",.638,.904]],
  /* 源图上零星几粒亮斑。数量少、位置固定 —— 随机撒会每刷新一次变个样。 */
  DUST:[[.155,.183],[.883,.132],[.062,.412],[.930,.288],[.118,.618],[.408,.214],
        [.812,.703],[.245,.905],[.958,.585],[.522,.318],[.690,.128],[.078,.826],
        [.866,.855],[.318,.062]]
};

var FW = 1080, FH = 1441;   /* 原图尺寸。viewBox 就用它，量出的数直接乘。 */

function starSVG(){
  var V = STAR.V, s = [];
  var px = function(p){ return [(p[0]*FW).toFixed(1), (p[1]*FH).toFixed(1)]; };
  /* 🔴 `vector-effect:non-scaling-stroke` 是必须的：viewBox 一旦被缩放到 860px 宽，
     1 单位的线会跟着变成 0.8px，亮底上直接消失。锁死成 **1 CSS px 发丝线**，
     这才是源图那根金线的观感（原图 1080px 宽上就是 1px）。 */
  /* ── 动效的排序：**按到 M 点的距离** ──────────────────────────────
     M 是量出来的那个「束心」（`v→M` / `b→M` / `C→M` / `r→M` / `L→M`
     五条边都收敛到它）。**远的先画、近的后画** ⇒ 观感是这张图
     **从中心往外长**，正是 `审美.md` §7.2 记的那条语法：「从一个虚空放射的束」。
     占的职能是**空间连续** —— 它说明"这张图从哪儿来"，不是"让它动一下好看"。
     🔴 `--i` 是**排序名次**（不是数组下标）—— 不排序的话，画出来的顺序是
        我写数组的顺序，跟几何无关，读起来就是"随机闪烁"。
     🔴 `--len` 必须**逐线算**。写死一个常数的话：短线画完之后会空等，
        长线到动画结束还没画完。`stroke-dasharray` 的长度是**每条线自己的**。 */
  var M = [V.M[0]*FW, V.M[1]*FH];
  var all = STAR.E.map(function(e){ return {e:e, c:'sl'}; })
    .concat(STAR.D.map(function(e){ return {e:e, c:'sd'}; }));
  all.forEach(function(o){
    var A = px(V[o.e[0]]);
    o.d = Math.hypot(A[0]-M[0], A[1]-M[1]);
  });
  all.sort(function(a,b){ return b.d - a.d; });
  /* 🔴 每个空元素**必须以 `/>` 收尾**，见文件头 ④ —— 少一个斜杠就整张图只剩一条线 */
  all.forEach(function(o, i){
    var A=px(V[o.e[0]]), B=px(V[o.e[1]]);
    var len = Math.hypot(B[0]-A[0], B[1]-A[1]).toFixed(1);
    s.push('<line class="'+o.c+'" style="--i:'+i+';--len:'+len+'" x1="'+A[0]+'" y1="'+A[1]+
           '" x2="'+B[0]+'" y2="'+B[1]+'" stroke-width="1" vector-effect="non-scaling-stroke"/>');
  });
  /* 尘埃点排在**所有线之后**亮起 —— 职能是**层级**（先骨架、后细节）。
     ⚠ 不加 `--i` 的话它们跟线同时出现，那"先线后点"这层意思就没了。 */
  var nE = all.length;
  STAR.DUST.forEach(function(p, i){
    s.push('<circle class="sc" style="--i:'+(nE+i)+'" cx="'+(p[0]*FW).toFixed(1)+
           '" cy="'+(p[1]*FH).toFixed(1)+'" r="1.8"/>');
  });
  STAR.LBL.forEach(function(l, i){
    s.push('<text class="sx" style="--i:'+(nE+STAR.DUST.length+i)+'" x="'+(l[1]*FW).toFixed(1)+
           '" y="'+(l[2]*FH).toFixed(1)+'">'+l[0]+'</text>');
  });
  return '<svg viewBox="0 0 '+FW+' '+FH+'" preserveAspectRatio="xMidYMid slice">'+s.join('')+'</svg>';
}

/* ══════════════════════════════════════════════════════════════════════
   二 · 锡箔（复刻 `_5`）
   ─────────────────────────────────────────────────────────────────────
   源图是**折皱的银箔带**，不是实心多边形。所以画法不是 fill，是 **stroke 一条
   闭合折线**：带宽 36~63px（量出来的：左缘那道 0.315→0.378 ＝ 63px，
   右缘那道 0.872→0.905 ＝ 36px）。

   ══════════════════════════════════════════════════════════════════════
   🔴 **2026-09-21 重做。驾驶员原话：「锡箔这不是用 svg 重画的吧？
      看上去非常不美观，而且也不是直线，像乱画的一样。」**
      —— 三句话，三个病，全中，逐个说：

   ① 「**也不是直线**」＝ 几何错了，这是根。
      旧的 `FOIL.P` 是**沿源图外轮廓扫扫描线采的 25 个点** —— 采样的时候把
      **照片边缘的模糊**也当成形状采进去了，于是采出来一条**圆滚滚的闭合曲线**，
      `stroke` 一描就成了"**弯铁丝**"。
      可源图根本不是曲线：它是**棱角分明的直边多边形环**。
      ⇒ **把直边采成曲线** = 形状的**性质**被改掉了，不是精度问题。
      ⇒ 现在改用 `_量_箔顶点.ps1` **量出来的斜率突变点**（见下面 `FOIL.H` 的注释），
        每个顶点之间是**直线段**，拐角靠 `stroke-linejoin:miter` 出硬角。

   ② 「**非常不美观**」＝ 折面只有"沿带"一个方向的变化。
      旧 `foilRuns` 每片**横跨整条带宽**、灰度只有一个值 ⇒ 一条带子上是**一列方块**，
      跨带方向**完全均匀**。可真实的皱箔，明暗在**两个方向上都在变**
      （不然就只是"一条卷起来的色卡"）。
      ⇒ 现在把带子切成 **沿带 × 跨带 的二维格子**，灰度场做**空间相关**
        （低频大折面 ＋ 每格小抖动），读出来才是"折起来的金属"。

   ③ 「**像乱画的一样**」＝ 三圈同心环**形状一样、只是缩了**。
      真实的皱箔是**几层各自独立折过的箔叠在一起**，所以每一层的拐角位置**对不齐**。
      旧的 `ECHO` 只缩不放转，三圈拐角落在同几条射线上 ⇒ 读成"回形针".
      ⇒ 现在每圈带**自己的旋转**，拐角**互相错开**。

   ⚠ 仍然**不用 `feTurbulence`**（滤镜在 DOMPurify 里过不过没实测过，不拿它当唯一实现）。
     皱感全靠**二维灰度场**做出来 —— 纯 `<path>`，白名单里稳的。
   ══════════════════════════════════════════════════════════════════════ */
var FOIL = {
  /* 环的形状 —— **量出来的，不是画的**。
     `_量_箔顶点.ps1` 逐行求亮像素的左右极值，直边表现为"斜率恒定的线性段"，
     斜率突变处就是顶点。量出来是 **7 个拐点**（不是五边形、也不是圆）：
       顶 (0.521,0.000) · 右上 (0.989,0.237) · 右下 (0.989,0.660) ·
       右下二 (0.728,0.851) · 底 (0.300,1.000) · 左下 (0.083,0.811) · 左 (0.000,0.342)
     ⚠ 坐标**归一化到外接框**（0..1），外接框在画布上由 `BB` 给出。
     左右两条边**接近垂直**（x 几乎不变）—— 这是这个形状的性格，别"修"圆了。 */
  H:[[.521,.000],[.989,.237],[.989,.660],[.728,.851],[.300,1.000],[.083,.811],[.000,.342]],
  /* 外接框 [x, y, w, h]，同样量自源图：箔占 x .306~.912 · y .387~.911（原图 1080x1441）。 */
  BB:[.306,.387,.606,.524],
  /* 三圈"回声"。源图里箔是折了几层的，内圈比外圈小、还整体偏一点、**并且各自转过一个角度**
     ⇒ [缩放, 平移x, 平移y, **旋转度**, 线宽, 种子]。
     🔴 旋转是这次新加的：不转的话三圈拐角落在同几条射线上，读成"回形针"。
     🔴 **2026-09-21 二改：第二圈从"缩在里面"改成"跨出去"。**
        对照源图看，第二圈**几乎和外圈一样大、转过去一个角**，
        所以它和外圈是**相交**的 —— 交叠那几段是双层箔，最亮。
        旧值 (0.66 / 转19° / 平移 .055,.095) 缩得太小又挪得太远，
        变成**一个小环飘在旁边**，跟外圈没有任何交叠 ⇒ 读成"剪坏了的三块"。
        ⇒ 现在 (0.74 / 转32° / 平移 .030,.052)：够大够转，两圈在四条边上都压得住。 */
  ECHO:[[1.00, 0,     0,     0,  46, 7],
        [0.74, .030, .052,  32, 34, 23],
        [0.46, .130, .160, -22,  22, 41]],
  /* 横穿整块的那几根**直发丝**。源图里它们比箔更锐、更细，是"划痕"不是"折边"。
     ⚠ 归一化坐标改成**对整张画布**（旧版也是），所以别乘 BB。 */
  HAIR:[[[.395,.415],[.735,.885]], [[.560,.375],[.645,.900]],
        [[.290,.600],[.900,.760]], [[.480,.430],[.905,.560]]]
};

/* 固定种子随机 —— 不用 Math.random，否则每次截图长得都不一样，没法比。 */
function rng(seed){ var s = seed>>>0; return function(){ s = (s*1664525 + 1013904223)>>>0; return s/4294967296; }; }

/* ── 箔带的「折面」怎么切 ────────────────────────────────────────────────
   返回值是一串 `{cls, d}`：**同灰度的连续几片并成一条 path**（外缘正走、
   内缘倒走、Z 闭合）。

   🔴 **2026-09-21 从"一维"改成"二维"。** 改的原因见 `FOIL` 上面那段②：
      一维（每片横跨整条带宽、一个灰度）切出来的是一条**均匀的色带**，
      跨带方向没有任何变化 ⇒ 读成"一卷色卡"，不是"一块折起来的金属"。
      真实皱箔的明暗在**两个方向上都变**，所以现在切成 **列 × 行** 的格子。

   三个要点，前几版的病根各自对应一条（①③ 保留自上一版，仍然成立）：

   ① **按整圈弧长布缝**，不是逐条边各切各的。
      逐边切的话，两条边在**顶点**处各算各的法向 ⇒ 外缘在那里裂出一个**三角楔口**。
   ② 缝上的法向用**相邻两段法向按段内位置加权**（＝顶点法向平滑）。
      ⚠ 但**顶点本身仍然是硬角**（`stroke-linejoin:miter` + 顶点两边分属不同段）
        —— 平滑的是"取法向"这件事，不是"把角磨圆"。①和②不矛盾：
        ① 治的是两条边接缝处裂口，② 治的是法向在段内跳变。
   ③ 同灰度**并成一条 path** ⇒ 那几片之间连缝都没有，剩下的只有灰度台阶。
      ⚠ 二维之后**只在同一行内**并：跨行并会把"跨带方向的变化"抹掉，等于退回一维。

   🔴 灰度场怎么造（这是"像不像皱箔"的全部）：
      先沿带撒一串**低频大折面**（每 2~5 列换一次基调，`hold` 控制），
      再在**跨带方向**上给每行一个小偏移 ⇒ 同一个大折面里，靠外和靠里的格子
      **不同档** ⇒ 眼睛读出"这个面是斜的"，而不是"这是个色块"。
      最后叠一点**孤立的亮点**（高光）—— 皱箔最显眼的就是那些碎高光。
   ⚠ 毛边幅度**收窄过**：第一版是 ±23%，拍出来带子边缘是**楼梯**。现在 ±6%。
      ⚠ 跨带方向**不收窄**（`ROWJIT` 给得大）—— 那是折面本身，不是毛边。 */
function foilRuns(pts, hw, r, rows){
  var n = pts.length, i, j, k;
  var seg = [], cum = [0], total = 0;
  for(i=0;i<n;i++){
    var L = Math.hypot(pts[(i+1)%n][0]-pts[i][0], pts[(i+1)%n][1]-pts[i][1]);
    seg.push(L); total += L; cum.push(total);
  }
  if(total < 4) return [];
  rows = rows || 2;
  var m = Math.max(10, Math.round(total / (hw*1.15)));   /* 列数：每列约 1.15 个带宽 */
  /* ── 列的**位置**（沿弧长的归一位置，0..1）────────────────────────────
     🔴 **列宽必须不均匀**（2026-09-21 拍图才看出来的第四个病）。
        旧版 `s = total*i/m` ＋ ±35% 抖动 ⇒ 列宽**基本相等**，
        切出来就是"一片片等宽方块排着走"，读成**虚线胶带**；
        驾驶员那句「像乱画的一样」有一半是这儿来的。
        源图里皱箔的折面**大小差好几倍**，所以这里让列宽在 0.4~2.0 倍之间随机。
     ⚠ 必须**累积**着走（下一列的起点＝上一列的终点）：只给每列独立的随机宽度、
        位置仍按 `i/m` 算，随机完会自己排匀，等于没做。 */
  var wts = [], acc = 0;
  for(i=0;i<m;i++){ var wt = 0.4 + r()*1.6; wts.push(wt); acc += wt; }
  var colU = [0];
  for(i=0;i<m;i++) colU.push(colU[i] + wts[i]/acc);
  /* ── 跨带的 rows+1 条偏移线（外缘 → 内缘）──
     每条线上逐列抖动；**行间抖动独立** ⇒ 格子不会排成规整的网格。 */
  var OFF = [];
  for(j=0;j<=rows;j++){
    var base = hw * (1 - 2*j/rows);
    var a = [];
    for(i=0;i<=m;i++) a.push(base * (0.94 + r()*0.12));
    OFF.push(a);
  }
  var O = [], IN = [];
  for(i=0;i<=m;i++){
    var s = total * colU[i];
    /* 列宽已经随机过了，这里只补一点**缝的抖动**（0.7 → 0.35），
       免得缝精确落在列宽边界上、把随机宽度又抹平。首尾缝钉死，方便闭合。 */
    if(i>0 && i<m) s += (r()-.5)*(total/m)*0.35;
    s = Math.max(0, Math.min(total, s));
    k = 0; while(k < n-1 && cum[k+1] <= s) k++;
    var A = pts[k], B = pts[(k+1)%n], Lk = seg[k] || 1;
    var u = (s - cum[k]) / Lk;
    var ux = (B[0]-A[0])/Lk, uy = (B[1]-A[1])/Lk;        /* 本段方向 */
    var C = pts[(k+1)%n], D = pts[(k+2)%n], Ln = seg[(k+1)%n] || 1;
    var vx = (D[0]-C[0])/Ln, vy = (D[1]-C[1])/Ln;        /* 下一段方向 */
    /* 左法向的加权平均（u 越靠近段尾，越偏下一段）⇒ 法向在段内平滑 */
    var nx = -((1-u)*uy + u*vy), ny = ((1-u)*ux + u*vx);
    var nl = Math.hypot(nx,ny) || 1; nx /= nl; ny /= nl;
    var px = A[0] + ux*(s-cum[k]), py = A[1] + uy*(s-cum[k]);
    O.push([px + nx*OFF[0][i], py + ny*OFF[0][i]]);      /* 外缘＝第 0 条 */
    var rowPts = [];
    for(j=1;j<rows;j++) rowPts.push([px + nx*OFF[j][i], py + ny*OFF[j][i]]);
    IN.push({ p:[px - nx*OFF[rows][i], py - ny*OFF[rows][i]], mid:rowPts });
  }
  /* ── 灰度场 ────────────────────────────────────────────────────────────
     `tone[c]` = 第 c 列的大折面基调（0..3，0 最亮）。低频：一 hold 就是好几列。

     🔴 **档位分布必须避开两端**（2026-09-21 拍图才看出来的）：
        `--foilA` 在**亮底**上等于底色（甲·纸 `#e6e3e2` vs 底 `#fafaf9`，1.01:1），
        `--foilD` 在**暗底**上等于底色（丙·蚀 `#292a26` vs 底 `#181915`）。
        ⇒ 任何一端占多数，那个皮肤上就有**一大半带子是隐形的**，
          只剩零星几块深色 ⇒ 正是驾驶员说的「一盘散块」。
        ⇒ 所以分布**压在中间两档**（各 33%），两端只当**高光/暗缝**用（14% / 20%）。 */
  var tone = [], hold = 0, cur = 1;
  for(i=0;i<m;i++){
    if(hold <= 0){
      var v = r();
      cur = v<.14 ? 0 : v<.47 ? 1 : v<.80 ? 2 : 3;
      hold = 2 + Math.floor(r()*4);
    }
    tone.push(cur); hold--;
  }
  /* 每行的固定偏置 —— 同一个大折面里，靠外/靠里不同档 ⇒ 读成"斜的面"。
     ⚠ **必须对称为 0**：偏成负的等于整体调亮，亮底上就是整体变隐形。 */
  var rowBias = [];
  for(j=0;j<rows;j++) rowBias.push([-1,-1,0,0,0,1][Math.floor(r()*6)]);
  /* ── 逐行、逐格拼 path（同一行内、同档的相邻格并成一条）── */
  var out = [], fix = function(p){ return p[0].toFixed(1)+' '+p[1].toFixed(1); };
  for(j=0;j<rows;j++){
    var rowHi = (j===rows-1) ? IN.map(function(o){ return o.p; }) : IN.map(function(o){ return o.mid[j]; });
    var rowLo = (j===0) ? O : IN.map(function(o){ return o.mid[j-1]; });
    var start = 0, cls0 = -1;
    var flush = function(a, b, cls){
      if(b <= a) return;
      var d = [], q;
      for(q=a;q<=b;q++) d.push((q===a?'M':'L') + fix(rowLo[q]));
      for(q=b;q>=a;q--) d.push('L' + fix(rowHi[q]));
      out.push({ cls: Math.max(0, Math.min(3, cls)), d: d.join('') + 'Z' });
    };
    for(i=0;i<m;i++){
      /* 🔴 逐格抖动给到 30%：低了会切出**轴对齐的矩形**（`tone` 管列、`rowBias` 管行，
         两者都是整行整列的常数 ⇒ 格子全是规整方块，边界上的偏置一变就成"L"形），
         看着像"贴上去的色块"而不是"折起来的金属"。
         高了（>50%）就退化成电视雪花 —— 折面**要成片**，只是别成矩形。 */
      var c = tone[i] + rowBias[j] + (r()<.30 ? (r()<.5?-1:1) : 0);
      if(cls0 < 0){ cls0 = c; start = i; }
      else if(c !== cls0){ flush(start, i, cls0); cls0 = c; start = i; }
    }
    flush(start, m, cls0);
  }
  return out;
}

function foilSVG(){
  var s = [];
  var GRAY = ['fA','fB','fC','fD'];
  var bx = FOIL.BB[0]*FW, by = FOIL.BB[1]*FH, bw = FOIL.BB[2]*FW, bh = FOIL.BB[3]*FH;
  FOIL.ECHO.forEach(function(ring, ri){
    var k = ring[0], ox = ring[1]*FW, oy = ring[2]*FH, rot = ring[3]*Math.PI/180;
    var w = ring[4], seed = ring[5];
    var cx = bx + bw/2, cy = by + bh/2;      /* 以外接框中心为心缩/转 */
    var pts = FOIL.H.map(function(p){
      var x = (p[0]-.5)*bw*k, y = (p[1]-.5)*bh*k;          /* 归一到框中心再缩放 */
      return [cx + x*Math.cos(rot) - y*Math.sin(rot) + ox,
              cy + x*Math.sin(rot) + y*Math.cos(rot) + oy];
    });
    /* 🔴 为什么不是「沿中线摆一排同向短线」（前六版就是这个，读出来是**一盘散块**）：
       同向短线之间必然有缝，缝一多就成了**一圈虚线**。
       源图的箔是**一整条实心带** ⇒ 必须 stroke 一条闭合折线。 */
    var r = rng(seed), hw = w/2;
    /* 底带兜底：折面理论上严丝合缝，但外缘是**抖的**，万一某处露出缝，
       露出来的是"金属底"而不是页面底色。
       ⚠ 它还顺手当**收边线**用：折面宽度在 ±6% 里抖，抖窄的地方这条底带
         就露出 1~2px 的一线 `--foilC` ⇒ 读成箔的边，不是脏边。 */
    var d = pts.map(function(p,i){ return (i?'L':'M')+p[0].toFixed(0)+' '+p[1].toFixed(0); }).join(' ')+' Z';
    s.push('<path class="fb" d="'+d+'" stroke-width="'+w+'" stroke-linejoin="miter"/>');
    /* 动效序号：**外圈先成形、内圈跟上**，圈内再按折面顺序错开。
       占的职能是**层级** —— 先大块后小块、先外后内，不是"整块一起淡入"。
       `ri*40` 是给每一圈一个基准位移，否则三圈的序号会互相穿插。
       ⚠ 二维之后每圈的 path 条数变多，基准位移从 34 抬到 40。 */
    foilRuns(pts, hw, r, ri === 0 ? 3 : 2).forEach(function(run, qi){
      s.push('<path class="'+GRAY[run.cls]+'" style="--i:'+(ri*40 + qi)+'" d="'+run.d+'"/>');
    });
  });
  FOIL.HAIR.forEach(function(h){
    s.push('<line class="fh" x1="'+(h[0][0]*FW).toFixed(0)+'" y1="'+(h[0][1]*FH).toFixed(0)+
           '" x2="'+(h[1][0]*FW).toFixed(0)+'" y2="'+(h[1][1]*FH).toFixed(0)+
           '" vector-effect="non-scaling-stroke"/>');
  });
  return '<svg viewBox="0 0 '+FW+' '+FH+'" preserveAspectRatio="xMidYMid slice">'+s.join('')+'</svg>';
}

/* ── 尘埃粒子 · v2 ＝ 真 JS 粒子系统（Canvas 2D）────────────────────────
   见样式表里 `.tex .pt` 那段注释（为什么从 CSS 改成 JS、职能挂在哪、边界在哪）。

   ⚠ 为什么是**一个 canvas** 而不是「每颗粒子一个绝对定位的 div」：
      后者是 40 个 DOM 节点 ＋ 40 个合成层，前者是**一张位图**。
      落卡之后 HTML 里只有一个 `<canvas>` 标签 —— 卡面干净，
      也不用把 40 组内联样式拼进正则的 `replaceString`。

   参数表读法（`[小, 大]` ＝ 该字段在这个区间里取随机）：
     n 颗数           s 尺寸 px         o 不透明度（外面再乘一个 0.72~1.0 的闪烁）
     v 速度 —— **每秒占屏宽的比例**，不是 px/sec：这样换容器尺寸观感不变
     spin 自转 °/s    par ＝ [摆幅x, 摆幅y, 周期s, 相位rad] ← 两层相位差 π ⇒ 反相
   🔴 **尺寸与不透明度的下界是拍图拍出来的，别再往小调**：
      v1 给 `s:[2.5,4.5]/[5,8.5]`，拍出来是**看不出形状的小点** —— 而驾驶员点名
      要「有形状」。7px 以下十字的四个缺口糊在一起，等于一个方块。
      ⇒ 现值 `[3.2,6.0]/[6.5,11.5]`，且**小粒子不派十字**（见 `field()` 里抽签那行）。
      ⚠ 不透明度也连着抬过两轮（`.16~.42`→`.20~.52`→ 现值）：粒子在 `.tex` 里
        ⇒ **吃负空间遮罩，文字场里要乘 0.55**。但它**个子小**，
        所以可以比锡箔那种成片的元素高一截 —— 一颗 8px 的十字 @ .6 的视觉分量，
        远小于一条 700px 长的带子 @ .46。 */
var PTC = {
  FAR : {n:26, s:[3.2, 6.0], o:[.30,.52], v:[.0020,.0060], spin:[ 4,12], par:[.025,.015,90, 0]},
  NEAR: {n:14, s:[6.5,11.5], o:[.45,.78], v:[.0060,.0130], spin:[10,26], par:[.025,.015,52,Math.PI]}
};
/* 四种形状。没有语义差别，纯粹是"碎屑"的质感。
   ⚠ 别加圆形 —— 驾驶员点名要"有形状"，圆点就是没形状。
   🔴 十字写成两个 `rect` 叠：nonzero 填充会自动合并，不用手抄 12 个顶点。
   🔴 **离屏 sprite 预渲染**：这四条只在这里各跑一次，每帧只 `drawImage`。 */
var PTSH = [
  function(c,s){ c.moveTo(s/2,0); c.lineTo(s,s/2); c.lineTo(s/2,s); c.lineTo(0,s/2); c.closePath(); },
  function(c,s){ c.moveTo(s/2,0); c.lineTo(s,s); c.lineTo(0,s); c.closePath(); },
  function(c,s){ c.rect(0, s*.34, s, s*.32); },
  function(c,s){ c.rect(s*.38,0,s*.24,s); c.rect(0,s*.38,s,s*.24); }
];
var PTV = (function(){
  var cv, ctx, W=1, H=1, dpr=1, frames=0,
      sprites=[], fields={}, raf=0, last=0, frozen=null, painted=false, sig='';
  var GAP=1000/30, EDGE=.06;      /* 限帧 30fps · EDGE＝出界多少才从对面绕回来（归一化） */

  function reduce(){
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  /* sprite 按 64px 画、用到 3~12px 上 —— 缩放插值顺手把边缘磨柔，比硬边好看。 */
  function spr(color){
    return PTSH.map(function(draw){
      var c=document.createElement('canvas'); c.width=c.height=64;
      var g=c.getContext('2d');
      g.fillStyle=color; g.beginPath(); draw(g,64); g.fill();
      return c;
    });
  }
  function field(spec, seed){
    var r=rng(seed), a=[], i;
    for(i=0;i<spec.n;i++){
      var ang=r()*Math.PI*2, S=spec.s[0]+r()*(spec.s[1]-spec.s[0]);
      /* 🔴 十字只派给够大的粒子 —— 小粒子上的十字读成一个方块。 */
      var pool = S>=6.5 ? [0,1,2,3] : [0,1,2];
      a.push({
        x0:r(), y0:r(), x:0, y:0, s:S,
        o:spec.o[0]+r()*(spec.o[1]-spec.o[0]),
        v:spec.v[0]+r()*(spec.v[1]-spec.v[0]),
        dx:Math.cos(ang), dy:Math.sin(ang),
        rot:r()*360,
        spin:(spec.spin[0]+r()*(spec.spin[1]-spec.spin[0]))*(r()<.5?-1:1),
        tw:r()*Math.PI*2, twT:3+r()*4,              /* 闪烁相位 / 周期 s */
        k:pool[Math.floor(r()*pool.length)]
      });
    }
    return a;
  }
  /* 位置存归一化（0..1），速度是"每秒几倍屏宽"。
     ⚠ y 的增量要乘 `W/H`：两个轴各自归一化之后，同一个 v 在像素空间里会画成椭圆，
       乘完才是**像素空间里的直线**。 */
  /* 🔴 **位置用解析式算（初始位置 ＋ 速度×t），不做增量累加。**
     理由是**原理**，不是从某次读数反推的：增量版下 `?t=` 冻结出来的位置取决于
     `freeze()` 之前 rAF 已经跑过几帧 —— 那是个调度时序，不是定值
     ⇒ 同一个 query 拍两次，**原理上就可能不一样**。
     改成解析式之后，任意 t 的位置只由 (初始位置, 速度, t) 决定，与帧数无关。
     ✅ 实测：`?t=12` 连拍三次，两两比对差 188 / 886 个像素（0.01% / 0.05%），
        量级是抗锯齿舍入 ⇒ 可复现。
     ⚠ 记一笔没查明的：改之前测到过一次 4.64% 的大差异，**重跑不复现**。
        按项目规矩「不可复现的读数，追它比放着贵」—— 记在这儿，不追。 */
  function wrap(v){
    var span = 1 + 2*EDGE;
    v = (v + EDGE) % span; if(v < 0) v += span;
    return v - EDGE;                       /* 出界 EDGE 之后从对面绕回来 */
  }
  function layout(t){
    var k = W/H;
    ['FAR','NEAR'].forEach(function(nm){
      var it=fields[nm]; if(!it) return;
      for(var i=0;i<it.length;i++){
        var p=it[i];
        p.x = wrap(p.x0 + p.dx*p.v*t);
        p.y = wrap(p.y0 + p.dy*p.v*t*k);
      }
    });
  }
  function paint(t){
    if(!ctx) return;
    layout(t);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,W,H);
    ['FAR','NEAR'].forEach(function(nm){
      var it=fields[nm]; if(!it) return;
      var P=PTC[nm].par, ph=t*Math.PI*2/P[2]+P[3];
      var ox=Math.sin(ph)*P[0]*W, oy=Math.cos(ph)*P[1]*H;
      for(var i=0;i<it.length;i++){
        var p=it[i];
        var rad=(p.rot+t*p.spin)*Math.PI/180, cs=Math.cos(rad), sn=Math.sin(rad), hs=p.s/2;
        ctx.globalAlpha = p.o*(0.72+0.28*Math.sin(t*Math.PI*2/p.twT+p.tw));
        ctx.setTransform(dpr*cs, dpr*sn, -dpr*sn, dpr*cs, dpr*(p.x*W+ox), dpr*(p.y*H+oy));
        ctx.drawImage(sprites[p.k], -hs, -hs, p.s, p.s);
      }
    });
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.globalAlpha=1;
    painted=true;
  }
  function loop(now){
    raf=requestAnimationFrame(loop);
    if(!last){ last=now; return; }
    var d=now-last;
    if(d<GAP) return;                          /* 限帧 —— 粒子飘得慢，30 帧看不出差别 */
    last=now;
    /* ⚠ 不需要传 dt：`paint` 按**绝对时刻**算位置（见 `layout`），
       所以掉帧 / 切走再回来都不会累积误差。 */
    paint(now/1000);
    /* 诊断：画了多少帧。拍图时 `--dom --grep=data-f` 读它 ——
       **这是唯一能证明"循环真在跑"而不掺 CSS 动画的判据**（比图比出来的是混合物）。
       留着一个自增赋值，成本是一次属性写，可忽略。 */
    cv.dataset.f = ++frames;
  }
  function start(){
    if(!ctx||raf) return;
    if(reduce()){ if(!painted) paint(frozen===null?0:frozen); return; }
    if(frozen!==null) return;                  /* 冻结着（截图用）就别自己跑起来 */
    if(document.hidden) return;
    last=0; raf=requestAnimationFrame(loop);
  }
  function stop(){ if(raf){ cancelAnimationFrame(raf); raf=0; } }
  function fit(){
    if(!cv) return;
    var r=cv.getBoundingClientRect();
    W=Math.max(1,Math.round(r.width)); H=Math.max(1,Math.round(r.height));
    dpr=Math.min(window.devicePixelRatio||1, 2);  /* 封顶 2：手机 DPR 3 的屏省 55% 像素 */
    cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr);
    paint(frozen!==null?frozen:(last/1000||0));
  }
  function recolor(){
    var c=getComputedStyle(document.body).getPropertyValue('--sig').trim()||'#888888';
    if(c===sig) return false;
    sig=c; sprites=spr(c);
    return true;
  }
  return {
    mount:function(el){
      cv=el; ctx=cv.getContext('2d');
      fields.FAR=field(PTC.FAR,91); fields.NEAR=field(PTC.NEAR,137);
      recolor(); fit();
      if(window.ResizeObserver) new ResizeObserver(fit).observe(cv);
      else window.addEventListener('resize',fit);
      document.addEventListener('visibilitychange',function(){ document.hidden?stop():start(); });
      if(window.matchMedia){
        var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
        var on=function(){ if(mq.matches){ stop(); paint(frozen===null?0:frozen); } else start(); };
        mq.addEventListener ? mq.addEventListener('change',on) : mq.addListener(on);
      }
    },
    /* `?t=` 冻结（截图用）：CSS 动画冻在 t 秒，粒子**也画在 t 秒** ——
       否则同一个 query 拍两次粒子位置不一样，`_比图.ps1` 逐像素比图就废了。 */
    freeze:function(t){ frozen=t; stop(); paint(t); },
    /* 换肤 / 换信号色之后调：重取颜色；`active=false`（角标档）就停掉不跑。 */
    resync:function(active){
      var changed=recolor();
      if(!active){ stop(); return; }
      if(changed && !raf && frozen===null) paint(last/1000||0);
      start();
    }
  };
})();

/* ── 画内星野 · v1 ＝ 真 3D 星场（透视 ＋ 景深）────────────────────────
   出处：驾驶员 2026-09-21 ——
     「**画内之物**（diegetic）。做进「天幕」档：星图带透视与景深，像舱窗外的星。
       🔴「**动态演算**」＝不是静态摆好，要真的按时间/状态算出来。」

   🔴 **为什么不能是"把手绘星图斜一下"**（这条决定了整个做法）：
     透视 ＋ 景深的核心是**同一个东西在不同深度上表现不同** ——
     近处的星划得快、远处的星几乎不动；焦点上的星是锐点、离焦的是软斑。
     一张平面 SVG 无论怎么 `transform`，**所有元素都躺在同一个深度上**，
     做出来是"把画斜着摆"，不是"透过窗看出去"。
     ⇒ 必须**真的建一个三维星场、每帧再投影**。
     这就是那句「不是静态摆好，要真的算出来」的字面意思。

   ⚠ **它不替换现有手绘星图（`.st`），也不跟它抢活**：
     `.st` ＝ **复刻源图的刻度盘**：平面、精确、不动，是"仪器"。
     `.sk` ＝ **窗外那层天**：三维、连续、按 t 演算。
     两层叠起来才有「透过刻度盘看出去」的读法。删掉任何一层都少一层意思。
     🔴 **但这条是审美判断，得驾驶员的眼睛说了算** —— 工具条上有「画内星野 开/关」，
        两档都拍得出来（见文件末尾汇报里那两张图）。

   ── 三件事都是真算的，参数不是随手调的 ──────────────────────────────
   ① **透视投影**：星在**天球**上（方位角 a、仰角 e、半径 r），相机在球心。
      `xc = x·cosθ − z·sinθ`（θ ＝ 天幕转角），`sx = cx + f·xc/zc`。
      ⇒ 视差**是投影自带的**，不用另写"远景层/近景层"——
        近星 r 小 ⇒ 同样的 θ 变化扫过更大的角 ⇒ 划得快。这是真的，不是分两层假的。
   ② **景深（弥散圆）**：离焦量按薄透镜近似的标准式 **`CoC ∝ |1/r − 1/r_foc|`**。
      焦点平面 `r_foc` 放在星场中偏近处 ⇒ 近星化成大软斑（散景）、
      远星是小软点、焦点上的是锐点带一点衍射十字。**"像舱窗"靠的就是这一条。**
      ⚠ 不做真高斯模糊（canvas 2D 没有，自己写也太贵）——
        预渲染 `blurN` 档模糊 sprite，按 CoC 取最近一档再按尺寸缩放。同 PTV 的 sprite 套路。
   ③ **闪烁（大气抖动）**：真实恒星的闪烁幅度**随天顶距增大**（越靠地平线穿过的空气越厚）。
      ⇒ 幅度按 `airmass` 加权，**不是**给每颗随机一个幅度。
      ⚠ 幅度压得很小（峰值 ±14%）—— 大了就从"星在闪"变成"画面在噪"，
        那正是 `审美.md` §6.3 点名的「竞争性循环动画」。

   ── 占哪条职能（§6.3 五职能，占一个才能留）────────────────────────────
     **空间连续** —— 它说明的是"这层纹路在文字**后面**、而且后面还有纵深"。
     跟 v4 表里「鼠标视差 ±10px」是同一条，区别只是这条不用鼠标、自己走。
     🔴 **那条慢漂移不是"装饰性循环"**：静止的三维星场和一张平面图在屏幕上
        **长得一模一样** —— 没有漂移就没有视差，没有视差就没有"透视"。
        这是它非动不可的理由（不是"好看所以动"）。
     ⚠ 反过来说：**关掉动效时它必须仍然是一张对的星图**（§8 第 5 关）——
        所以 `prefers-reduced-motion` 下是"画一帧、停住"，不是"隐藏"。

   ── 「状态」从哪来 ──────────────────────────────────────────────────
     `t` 一档现在就能算（rAF 时钟）。**转角 θ** 留了输入口：`SKY.yaw(度)`。
     原型里挂在工具条那根滑杆上（0~360°），标定用。
     🔴 **要不要把它绑到游戏变量上**（比如"星障偏角"那类），是**卡的事、要驾驶员裁**。
        本模块**不擅自发明变量** —— 只保证"给一个角度，天就转到那个角度"，别的不管。
   ══════════════════════════════════════════════════════════════════ */
var SKC = {
  n     : 260,          /* 星数（撒在整个天球带上；屏幕上同时看得见约 1/3） */
  rFoc  : 2.10,         /* 焦点平面的天球半径 —— 景深零点，也是半径分布的中心 */
  oct   : 1.70,         /* 半径按**倍频**撒：从 rFoc/2^1.7 到 rFoc×2^1.7（0.64 ~ 6.9）*/
  fovK  : 0.55,         /* 焦距 ＝ **画布宽** × 这个数（卡片是横长的，跟宽走才对） */
  blurN : 6,            /* 预渲染几档模糊 */
  yawT  : 140,          /* 自转一圈多少秒。慢到"不是动画"、快到"看得出在走" */
  pitch : -0.05,        /* 相机俯仰（弧度），让天顶略偏上 */
  twAmp : 0.14          /* 闪烁峰值幅度 —— 上限，别再抬 */
};
/* 🔴 **两处参数是拍图拍出来才改对的，记在这儿免得再犯**（2026-09-21 第一版）：
   ① **半径撒错了方向。** 第一版写 `rNear + (rFar−rNear)·r()²`，注释还写着"越远星越多"——
      可 `r()²` 的密度**集中在 0**，于是绝大多数星挤在最近处、全部重度离焦，
      拍出来是一片**灰色光斑**（像脏镜头，不像星空）。
      ⇒ 改成**按倍频撒**（`rFoc × 2^±1.7`）：每个倍频段里星数相同，
        近处那一小段不会因为"半径范围大"就被塞满。
       ⚠ 顺带纠一条我原先的说法：**真实恒星几乎都在"无穷远"**，视差小到测不出。
        所以"星在盒子里按 1/r² 衰减"**不是天文，是光学上的假定** ——
        这条要的是"像透过舱窗看出去"的**观感**（近处有东西糊掉、远处是锐点），
        不是仿真。**如实记：这是有意为之的假定，不是物理。**
   ② **离焦尺寸放大过头。** 第一版 `s = sz·(1.5 + 5.2/r)·(1 + coc·3.4)`，
      r 最小那颗算出来 **53px**，alpha 还有 0.35 ⇒ 一个巨大的灰圆。
      ⇒ 收成 `(1.6 + 1.2/r)·(1 + coc·1.9)`，最大约 11px；
        同时 alpha 的离焦衰减从 `/(1+coc·1.9)` 提到 `/(1+coc·4.5)` ——
        **放大和变淡要一起做**，只放大不变淡就是"糊了一坨"。
   ③ **距离不再决定亮度。** 第一版用 `(rNear/r)²`，r=7 的星只有 r=0.55 的 0.6%，
      得夹一个 0.16 的地板才看得见 —— 而地板一夹，"远近"这个信息就没了，
      等于白算。⇒ **删掉**。深度这件事**只由视差和离焦两样承担**，
      这两样恰好就是驾驶员要的「透视」和「景深」。亮度全部交给 `mag`（本征亮度）。*/
var SKY = (function(){
  var cv, ctx, W=1, H=1, dpr=1, frames=0, stat=null,
      stars=[], pops=[], raf=0, last=0, frozen=null, painted=false, tints=[];
  var GAP=1000/30, yaw=0, yawAuto=true;
  var sigKey='';

  function reduce(){
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function hx(c){                                   /* '#rrggbb' → [r,g,b] */
    c=(c||'#888888').trim();
    if(c.charAt(0)!=='#') return [136,136,136];
    if(c.length===4) c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];
    var v=parseInt(c.slice(1,7),16);
    return [(v>>16)&255,(v>>8)&255,v&255];
  }
  function mix(a,b,t){
    return 'rgb('+Math.round(a[0]+(b[0]-a[0])*t)+','+Math.round(a[1]+(b[1]-a[1])*t)+
           ','+Math.round(a[2]+(b[2]-a[2])*t)+')';
  }
  /* ── sprite：第 0 档是锐点（带衍射十字），越往后越软越大 ──────────────
     十字**只给锐点** —— 离焦之后真实的十字本来就糊掉了，给软斑画十字是假的。
     ⚠ 用 `createRadialGradient` 的 alpha 衰减当高斯近似：真高斯要逐像素循环，
        64×64×6 档 × 每档几颗 = 太多了；径向渐变在视觉上分不出来。 */
  function spr(color){
    var out=[];
    for(var k=0;k<SKC.blurN;k++){
      var R=64, c=document.createElement('canvas'); c.width=c.height=R;
      var g=c.getContext('2d'), m=R/2;
      var t = k/(SKC.blurN-1);                       /* 0 = 锐 1 = 最软 */
      var rgb = hx(color);
      var ga = function(a){ return 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+a+')'; };
      /* 亮核占半径的比例。k=0 是 0.30（一个小实心核 ＋ 一圈柔光），
         k=5 是 0.85（几乎实心的散景盘，只留一圈软边）。 */
      var core = 0.30 + t*0.55;
      var gd = g.createRadialGradient(m,m,0, m,m, m*0.98);
      gd.addColorStop(0, color);
      gd.addColorStop(core, color);
      gd.addColorStop((core+1)/2, ga(0.32));         /* 中间补一档，免得像圆锥 */
      gd.addColorStop(1, ga(0));
      /* ⚠ `addColorStop` 不吃 `currentColor`、也不吃 var() —— 必须给实色 */
      g.globalAlpha=1; g.fillStyle=gd;
      g.beginPath(); g.arc(m,m,m*0.98,0,Math.PI*2); g.fill();
      /* 🔴 **衍射十字只挂在锐点档** —— 离焦之后真实的十字本来就糊掉了，
         给软斑画十字是假的。但第一版这里有两处让它**从来没出现过**：
           ① 十字长度 `L=m*0.92`、线宽 `R*0.028` —— 画到屏幕上只有几 px 时，
              sprite 被整体缩到 1/20，线宽变成 **0.08 个屏幕像素**，直接没了；
           ② 最亮的星也只有 ~14px，压根到不了"看得出十字"的尺寸。
         ⇒ 线宽提到 `R*0.06`、长度收到 `m*0.78`，让它在 5px 以上就有一点痕迹。 */
      if(k===0){
        g.strokeStyle=color; g.lineWidth=R*0.06; g.lineCap='butt';
        var L=m*0.78;
        g.beginPath(); g.moveTo(m-L,m); g.lineTo(m+L,m);
        g.moveTo(m,m-L); g.lineTo(m,m+L); g.stroke();
        /* 45° 的两根短芒 —— 真实的四芒星是这么长的，两根等长会读成"加号" */
        var S=m*0.34;
        g.globalAlpha=0.50;
        g.beginPath();
        g.moveTo(m-S*0.7,m-S*0.7); g.lineTo(m+S*0.7,m+S*0.7);
        g.moveTo(m-S*0.7,m+S*0.7); g.lineTo(m+S*0.7,m-S*0.7); g.stroke();
      }
      out.push(c);
    }
    return out;
  }
  /* ── 生成星场 ────────────────────────────────────────────────────────
     · 方位角 a 均匀撒满一圈（自转时不会有"这块密那块空"）
     · 仰角存**归一化的 u∈[−1,1]**，画的时候才乘 `elevMax` ——
       这样换画布高宽比时**密度自动保持**，不用重新生成（重新生成会换一批星，看着像换了个天）
     · 半径 r 按**倍频**撒（正负各 `oct` 倍），不是 `u²` —— 理由见文件头 ①。
     · 亮度 `mag` 走幂律（亮星少、暗星多）—— 真实的恒星亮度函数就是长尾的，
       均匀分布会让画面"处处一样亮"，读起来像网点而不像星空。
       ⚠ 下限**不能压太低**：底图是**白纸**（`#fafaf9`），星画在纸上。
         深色天幕上 0.1 的 alpha 是颗暗星；白纸上 0.1 的 alpha 什么都看不见。 */
  function field(seed){
    var r=rng(seed), a=[], i;
    for(i=0;i<SKC.n;i++){
      var u = r()*2-1;
      a.push({
        az : r()*Math.PI*2,
        u  : u,
        /* 半径按**倍频**撒：`2^(±oct)` ⇒ rFoc/3.25 ~ rFoc×3.25。
           ⚠ 别用 `r()²`（第一版那么写的）—— 它的密度**集中在 0**，
             于是星全堆在最近处、全部重度离焦，拍出来是一片灰斑。
             倍频撒法每个倍频段里星数相同，"近处"那一小段不会被塞满。 */
        rad: SKC.rFoc*Math.pow(2, (r()*2-1)*SKC.oct),
        mag: 0.45 + Math.pow(r(), 2.2)*0.55,         /* ⚠ 下限 0.45，见上（白纸）*/
        tint: r()<0.28 ? 1 : 0,                    /* 少部分是调过的那一支 */
        tw : r()*Math.PI*2,                        /* 闪烁相位 */
        twT: 2.6 + r()*4.4,                        /* 闪烁周期 s —— 周期不同才不会整片一起闪 */
        sz : 0.70 + r()*0.85                       /* 本征大小（相对） */
      });
    }
    return a;
  }
  /* ── 每帧：投影 ＋ 景深 ＋ 闪烁 ─────────────────────────────────────
     ⚠ **位置是解析式**（由 az/u/rad/yaw 现算），不做增量累加 ——
       理由同 PTV 那条：增量版的 `?t=` 冻结位置取决于冻结前跑过几帧，
       那是个调度时序，不是定值 ⇒ 同一个 query 拍两次原理上就可能不一样。 */
  function paint(t){
    if(!ctx) return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,W,H);
    var f = W*SKC.fovK;
    var cx = W/2, cy = H/2 + H*SKC.pitch;
    var elevMax = Math.atan((H*0.62)/f);          /* 上下各留 12% 余量，边上不至于秃 */
    var ct=Math.cos(yaw), st=Math.sin(yaw);
    /* 归一化分母取**最近那一颗**的 CoC（半径下限就是 rFoc/2^oct），
       这样 `coc` 恒在 [0,1]，`lv` 正好铺满 0..blurN-1 档。 */
    var rMin = SKC.rFoc/Math.pow(2, SKC.oct);
    var cocMax = Math.abs(1/rMin - 1/SKC.rFoc);
    /* 🔴 **计数器**：星野是画在 canvas 上的，DOM 里查不到、CSS 也问不出来 ——
       "一颗都没画"和"画了但太淡看不见"在**图上长得一模一样**（都是一张白纸）。
       第一版就撞过：索引写反 ⇒ `drawImage` 抛异常 ⇒ 静默零输出，
       我是靠 Chrome 的 `--enable-logging=stderr` 才抓到的。
       ⇒ 把每一档筛掉多少**数出来**，交给 `geo()` 落进 `data-geo`。
       ⚠ 这几个数只在 `paint()` 里更新，**不参与任何绘制逻辑**，删掉不影响画面。 */
    var nBack=0, nOff=0, nDim=0, nDraw=0, aMax=0, sMin=1e9, sMax=0;
    for(var i=0;i<stars.length;i++){
      var p=stars[i];
      var e = p.u*elevMax;
      var ce=Math.cos(e), se=Math.sin(e);
      var x = p.rad*ce*Math.sin(p.az), y = p.rad*se, z = p.rad*ce*Math.cos(p.az);
      var zc = x*st + z*ct;                        /* 相机绕 y 轴转 −yaw */
      if(zc < 0.22){ nBack++; continue; }          /* 背面 / 近裁剪 */
      var xc = x*ct - z*st;
      var sx = cx + f*xc/zc, sy = cy - f*(y)/zc;
      if(sx < -70 || sx > W+70 || sy < -70 || sy > H+70){ nOff++; continue; }
      /* ① 距离 → 亮度：**只给一点点**，而且是有意为之的观感，不是物理。
         🔴 第一版这里写的是 `(rNear/r)²`（"物理的 1/r²"），**错在两处**：
            · 真实恒星几乎都在无穷远，1/r² 描述的是**点光源在空间里**，
              不是"贴在同一个天球上的星"⇒ 拿它当物理依据本身就不成立；
            · 就算按那个式子算，r 最大那颗只有最近那颗的 0.6% 亮，
              必须夹一个 0.16 的地板才看得见 —— **而地板一夹，"远近"这个信息就没了**，
              等于白算一场，只留下一堆调参的借口。
         ⇒ 改成 `(rFoc/r)^0.40` 夹 [0.75, 1.15]：近处略强、远处略弱，
           **幅度小到不承担"深度"这件事**。深度**只由视差和离焦两样承担** ——
           而这两样恰好就是驾驶员要的「透视」和「景深」。亮度全部交给 `mag`（本征亮度）。 */
      var dist = Math.min(1.15, Math.max(0.75, Math.pow(SKC.rFoc/p.rad, 0.40)));
      /* ② 景深：弥散圆 → 模糊档 ＋ 尺寸放大 */
      var coc = Math.abs(1/p.rad - 1/SKC.rFoc)/cocMax;
      var lv  = Math.min(SKC.blurN-1, Math.round(coc*(SKC.blurN-1)));
      /* ③ 大气抖动：天顶距越大闪得越凶（airmass 近似 1/(sin e + 0.16)） */
      var air = Math.min(1, 0.30/Math.max(0.16, se+0.16));
      var twk = 1 + SKC.twAmp*air*Math.sin(t*Math.PI*2/p.twT + p.tw);
      /* ④ 离焦 ⇒ 峰值亮度掉（能量摊到更大的面积上了）。
         🔴 **放大和变淡必须一起做**：第一版放大到 53px、alpha 却只掉到 0.35，
            出来是一个巨大的灰圆 —— 像脏镜头，不像失焦的灯。
         ⇒ 尺寸封顶 14px（见下），衰减 `/(1+coc·2.6)`。 */
      var al  = p.mag*dist*twk/(1 + coc*2.6);
      if(al < 0.055){ nDim++; continue; }            /* 门槛按白纸定，见 `field()` 头注 */
      /* 🔴 **`s` 是 sprite 的外接尺寸，`pops` 里那套 sprite 的实心核只占半径的
         30%~85%** —— 所以"看得见的点"比 `s` 小一圈。第一版 `s` 只有 2~4px，
         缩下去实心核不到 1 个屏幕像素，整颗星被抗锯齿摊成一层灰雾。
         ⇒ 底数抬到 2.2，让最暗的星也有 ~3px；近处重度离焦的封顶 14px。 */
      var s = Math.min(14, p.sz*(2.2 + 1.4/p.rad)*(1 + coc*1.9));
      nDraw++; if(al>aMax) aMax=al; if(s<sMin) sMin=s; if(s>sMax) sMax=s;
      ctx.globalAlpha = Math.min(1, al);
      /* ⚠ `pops` 是 **[色支][模糊档]**（`tints.map(spr)` ⇒ 外层是色支）。
         第一版写成 `pops[lv][p.tint]` —— 索引反了，`pops[2]` 直接 undefined，
         `drawImage` 抛 `Cannot read properties of undefined (reading '0')`，
         **整个星野一颗星都不画**（而且是静默的：页面上只是"没有星星"）。 */
      ctx.drawImage(pops[p.tint][lv], sx-s/2, sy-s/2, s, s);
    }
    ctx.globalAlpha=1;
    painted=true;
    stat = { n:stars.length, back:nBack, off:nOff, dim:nDim, draw:nDraw,
             aMax:aMax, sMin:(nDraw?sMin:0), sMax:sMax, W:W, H:H };
  }
  function loop(now){
    raf=requestAnimationFrame(loop);
    if(!last){ last=now; return; }
    var d=now-last;
    if(d<GAP) return;
    var dt=d/1000; last=now;
    if(yawAuto) yaw += dt*Math.PI*2/SKC.yawT;      /* 自转 —— 透视可读的唯一来源 */
    paint(now/1000);
    cv.dataset.f = ++frames;                       /* 诊断用，同 PTV */
  }
  function start(){
    if(!ctx||raf) return;
    if(reduce()){ if(!painted) paint(frozen===null?0:frozen); return; }
    if(frozen!==null) return;
    if(document.hidden) return;
    last=0; raf=requestAnimationFrame(loop);
  }
  function stop(){ if(raf){ cancelAnimationFrame(raf); raf=0; } }
  function fit(){
    if(!cv) return;
    var r=cv.getBoundingClientRect();
    W=Math.max(1,Math.round(r.width)); H=Math.max(1,Math.round(r.height));
    dpr=Math.min(window.devicePixelRatio||1, 2);
    cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr);
    paint(frozen!==null?frozen:(last/1000||0));
  }
  /* ⚠ 换肤要重取颜色 —— **canvas 读不到 CSS 变量**（同 PTV 那条）。
     取两支：`--sig` 本色，和它往 `--bg` 调 45% 的淡支。
     🔴 为什么不另挑一个暖色：那会变成**在调色板外面发明颜色**（§4 / §9 禁）。
        星空要的"有的偏冷有的偏暖"，靠**同色系两支 ＋ 亮度差**已经够了。 */
  function recolor(){
    var cs=getComputedStyle(document.body);
    var s=cs.getPropertyValue('--sig').trim()||'#888888';
    var b=cs.getPropertyValue('--bg').trim()||'#ffffff';
    var key=s+'|'+b;
    if(key===sigKey) return false;
    sigKey=key;
    tints=[s, mix(hx(s), hx(b), 0.45)];
    pops=tints.map(spr);
    return true;
  }
  return {
    mount:function(el){
      cv=el; ctx=cv.getContext('2d');
      stars=field(20517);                          /* 固定种子 —— 见 `rng` 那条 */
      recolor(); fit();
      if(window.ResizeObserver) new ResizeObserver(fit).observe(cv);
      else window.addEventListener('resize',fit);
      document.addEventListener('visibilitychange',function(){ document.hidden?stop():start(); });
      if(window.matchMedia){
        var mq=window.matchMedia('(prefers-reduced-motion: reduce)');
        var on=function(){ if(mq.matches){ stop(); paint(frozen===null?0:frozen); } else start(); };
        mq.addEventListener ? mq.addEventListener('change',on) : mq.addListener(on);
      }
    },
    freeze:function(t){ frozen=t; stop(); paint(t); },
    /* `?yaw=` 或工具条滑杆 —— 给了角度就**停掉自转**，不然手一松它又转走 */
    yaw:function(deg){ if(deg===null||deg===undefined){ yawAuto=true; return; }
                       yawAuto=false; yaw=deg*Math.PI/180; paint(last/1000||0); },
    yawAuto:function(on){ yawAuto=!!on; if(on) start(); },
    /* ⚠ 取模之后**必须再补一次正数** —— JS 的 `%` 对负数返回负值，
       自转久了 yaw 会变负，滑杆就会拿到 −37 这种越界值（滑杆是 0~360）。 */
    yawDeg:function(){ var d=(yaw*180/Math.PI)%360; return d<0?d+360:d; },
    /* 给 `geo()` 读的自检数（见 `paint()` 里那段）。**只读，不参与绘制。** */
    stat:function(){ return stat; },
    /* 换肤 / 切档之后调：重取颜色；`active=false` 就停掉不跑（省电那半）*/
    resync:function(active){
      recolor();
      if(!active){ stop(); return; }
      start();
    }
  };
})();

/* ── 散点 grain · 静态层 ─────────────────────────────────────────────────
   见样式表里 `.tex .gr` 那段（为什么不用 CSS 点阵、颗粒为什么按设备像素）。
   🔴 **没有 rAF**：tile 是固定的，画一次就完事。
   ⚠ 黑点比白点多（62 : 38）：中性噪声在浅底上主要靠黑点显形、
     在深底上靠白点，偏向黑一点两边都不至于"发灰"。 */
var GRN = (function(){
  var cv, ctx, pat=null;
  function tile(seed){
    var R=64, c=document.createElement('canvas'); c.width=c.height=R;
    var g=c.getContext('2d'), r=rng(seed);
    for(var i=0;i<R*R*0.08;i++){                 /* 密度 8% */
      g.fillStyle = r()<.62 ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.42)';
      g.fillRect(r()*R|0, r()*R|0, 1, 1);        /* 1 设备像素一个点 */
    }
    return c;
  }
  function paint(){
    if(!ctx||!pat) return;
    /* ⚠ **不做 setTransform** —— pattern 按 1:1 铺在**设备像素**上，
       这样高 DPR 屏的颗粒自然更细（实物就该这样）。 */
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,cv.width,cv.height);
    ctx.fillStyle=pat;
    ctx.fillRect(0,0,cv.width,cv.height);
  }
  function fit(){
    if(!cv) return;
    var r=cv.getBoundingClientRect();
    var dpr=Math.min(window.devicePixelRatio||1, 2);
    cv.width=Math.max(1,Math.round(r.width*dpr));
    cv.height=Math.max(1,Math.round(r.height*dpr));
    cv.dataset.wh = cv.width+'x'+cv.height;   /* 诊断：容器尺寸漂没漂，读这个 */
    paint();
  }
  return {
    mount:function(el){
      cv=el; ctx=cv.getContext('2d');
      pat=ctx.createPattern(tile(20260921),'repeat');
      fit();
      if(window.ResizeObserver) new ResizeObserver(fit).observe(cv);
      else window.addEventListener('resize',fit);
    }
  };
})();

/* ══════════════════════════════════════════════════════════════════════
   三 · 正文 —— 🔴 **本轮改写的就是这一段**
   ──────────────────────────────────────────────────────────────────────
   原型里 `MSG` 是**手写的两块演示数据**（`_定版.html` 原样搬过来的）；
   真身没有手写数据 —— 正文得**从聊天里取回来**。
   取法见 `readBody()`，取回来怎么切成结构见 `parseBody()`。
   ══════════════════════════════════════════════════════════════════════ */

/* ── 挂载点 ──────────────────────────────────────────────────────────
   壳里只有一行空 `<div data-yh-mount></div>`（壳的全文见预览页里那个复制框）。
   **卡子（`.host` 那张纸）由脚本在这儿建**，不写进壳里 —— 理由：
     壳是卡内正则的替换串，写进壳里的东西**每改一次设计就要动一次卡**；
     塞进脚本就只用换 GitHub 上那个文件名（版本号在文件名里）。
   ⚠ 挂载点原先想给个 `class="yh"` —— **别给**：`.yh` 在样式表里是**正文块**
     （一楼一块的那个），挂到宿主上会串。宿主只认 `data-yh-mount` 和脚本补的 `host`。 */
var MOUNT=document.querySelector('[data-yh-mount]');
if(!MOUNT){                                     /* 没有挂载点就什么都不做，别抛 */
  MOUNT=document.createElement('div');
  MOUNT.setAttribute('data-yh-mount','');
  document.body.appendChild(MOUNT);
}
/* 🔴 宿主骨架 —— 与原型 `<body>` 里那块**逐项对应**，一个不多一个不少：
     原型的 `.ruler`（底图是装饰层那段说明）**不带过来**，那是原型页的旁注，不是卡面。
     原型的 `.bar`（标定工具条）见下面 `BAR` 那段 —— 默认不建。 */
MOUNT.className='host';                         /* 原型的 `<div class="host" id="host">` */
MOUNT.id='host';
MOUNT.innerHTML=
  '<div class="tex" aria-hidden="true" id="tex"></div>'+
  '<header><span class="dot"></span><b>月痕之民</b><span class="sp"></span>'+
    '<span id="hlabel"></span><span class="tag">NS 1916</span></header>'+
  /* 色彩渐变条。纯装饰 ⇒ aria-hidden，不进 tab 序、不挡点击（跟 .tex 同一条规矩）。 */
  '<div class="gb" id="gb" aria-hidden="true"></div>'+
  '<div class="chat" id="chat"></div>';

/* 🔴 转义 ＋ 行内粗体。两件事写在一起、**顺序不能反**：
     `esc` 必须**先**把 `& < > " '` 全转义，`**` 才轮到换成 `<strong>`。
     反过来写，模型写 `**<b>**` 就会把自己的尖括号留成**真标签** ——
     那等于把模型输出当 HTML 插进 DOM，本项目明令不许。
   ⚠ **只认 `**`，不认单星号斜体**：卡里〈正文_输出格式〉只规定了 `{}` 对白与分行，
     没规定 markdown。`**` 是有实证会出现的 —— 创世回廊那边要专门写一段
     `removeAsterisks()` 递归删它。月痕正文要粗体（`D128` 买真 700 就是为了它），
     所以这儿是**渲染**它，不是删它。 */
function esc(s){
  return String(s==null?'':s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
function inline(s){ return esc(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>'); }

/* ── 取本楼正文 ──────────────────────────────────────────────────────
   🔴 **为什么不让壳直接带正文**（这是 `D127` 的核心取舍）：
     壳是卡内正则的替换串，正文只能经 `$1` 进去 —— 而 `$1` 是**未渲染的原始文本**，
     直接放进 HTML 有两个**会静默出事**的坑：
       ① 正文里只要出现三反引号，外层围栏就被提前闭合，整份 HTML 泄进 markdown；
       ② 正文里的 `<` / `</div>` 会被 iframe 的 HTML 解析器当成真标签。
     ⇒ 壳里**不放正文**，壳的字节**恒定**；正文由 iframe 内的脚本自己取回来。

   ⚠ 取的字段是 `message` ＝ `chat[i].mes`，**存储值** —— 显示层那趟正则不改它
     （`messageFormatting` 只把结果拿去显示，不回写 chat）。
     ⇒ 拿到的**带 `<narrative>` 包装、也带 `<UpdateVariable>` 块**，得自己剥。 */
function readBody(){
  var raw='';
  /* ⚠ 三样都可能不在：不在楼层 iframe 里（比如被当脚本 iframe 跑）、酒馆助手没装、
     或这层还没有消息。**整段 try 兜住** —— 碰 parent 在 `srcdoc` 的 opaque 源下会抛，
     不能让它把后面半份脚本一起带崩。 */
  try{
    var id=(typeof getCurrentMessageId==='function')?getCurrentMessageId():null;
    var arr=(typeof getChatMessages==='function'&&id!=null)?getChatMessages(id):null;
    if(arr&&arr.length) raw=arr[0].message||'';
  }catch(e){ raw=''; }
  if(!raw) return '';
  /* 剥掉 `<UpdateVariable>`（变量更新块）—— 它归变量层，显示层本来也有条正则删它。 */
  raw=raw.replace(/<[Uu]pdate[Vv]ariable>[\s\S]*?<\/[Uu]pdate[Vv]ariable>/g,'');
  /* 🔴 **战况块要留下，排在正文前面**（2026-09-21 修）。
     上一版只取 `<narrative>` 里那段、并把 `<battle_status>` 当垃圾删掉 ——
     照〈正文_输出格式〉的表格，战况块本来就写在 `<narrative>` **外面**
     ⇒ 那个写法等于**战况永远不显示**，而且不报错（"战斗美化"就是来还这笔账的）。
     卡里〈角色属性与检定总则〉四、6 定的顺序是「战况块在 `<narrative>` 之前」，
     所以这里按那个顺序拼回去，`parseBody` 靠开头那行 `<battle_status>` 认它。 */
  var bs=(raw.match(/<battle_status>([\s\S]*?)<\/battle_status>/i)||[])[1];
  /* 🔴 **战斗收尾块** —— 方案 §4.3 新加的，**卡还没吐**（`9900052` 五、原话只是
     「留痕：照〈检定_结构化记录〉出一条」，驾驶员 2026-09-21 裁定「那就改不就得了」）。
     ⇒ 渲染层先认着这对标签：吐了就自动出结算面板，没吐就整块不出。
   ⚠ 它是**一场仗打完那一轮**才有的一块，绝大多数楼层没有 ⇒ **缺席不报缺**。 */
  var bc=(raw.match(/<battle_closure_log>([\s\S]*?)<\/battle_closure_log>/i)||[])[1];
  var m=raw.match(/<narrative>([\s\S]*?)<\/narrative>/i);
  /* 配对失败（模型漏写闭合标签）⇒ 退回全文，只把三个已知块摘掉 */
  var body=m?m[1]:raw
    .replace(/<battle_status>[\s\S]*?<\/battle_status>/gi,'')
    .replace(/<battle_closure_log>[\s\S]*?<\/battle_closure_log>/gi,'')
    .replace(/<\/?narrative>/gi,'');
  /* 顺序 ＝ 卡里〈正文_输出格式〉的顺序：**战况 → 正文 → 收尾**。 */
  return (bs?'<battle_status>\n'+bs.trim()+'\n</battle_status>\n':'') + body.trim() +
    (bc?'\n<battle_closure_log>\n'+bc.trim()+'\n</battle_closure_log>':'');
}

/* ── 把正文切成结构 ──────────────────────────────────────────────────
   规则**全部**抄自卡里那条〈正文_输出格式〉，不是我定的：
     · `{角色名}「对白」` 单独成行 ＝ 一句对白（`{}` 里只写名字，不写动作情绪）
     · 其余非空行 ＝ 叙事
     · 对白之外的神态动作**另起一行**、不和对白挤一行
   ⇒ 一行一行读就够了，不需要正则扫全文。
   ⚠ 每轮最多一对 `<narrative>`、包住**整轮**正文 ⇒ **一楼只有一块**，
     所以 `MSG` 是**长度 1 的数组**（原型里是两块手写数据）。
   ⚠ 段头那行 `who` 本轮只接了**说话人**那一半：
     原型写的是「灰港 · 薇拉 / 卡厄斯」＝ 场景 · 在场角色，
     而**场景名在正文里没有来源**（它得从 MVU 变量里读）⇒ 这一半**留空，等驾驶员裁**。

   🔴 **另有两块不是正文，但要走同一个流**（2026-09-21 加）：
     · `<battle_status>…</battle_status>` —— 战况块，在 `<narrative>` **外面、前面**
     · `【检定】…` —— 结构化检定记录，出处 ＝ 卡里 `147523 检定_结构化记录`
   ⚠ **`【检定】` 的落位卡里没规定** —— `147523` 只说「除正文叙述外，**另输出**一条」，
     `9900051` 的位置表只有「里面＝人话」「外面＝战况/变量」两类，它两边都不算。
     ⇒ 渲染层**两种位置都收**：在 `<narrative>` 里就随正文行流过来，在外面由上面
     `readBody()` 退回全文时带进来。**不替驾驶员定**，他看实物再说。 */
function parseBody(text, no){
  var p=[], names=[], battle=null, closure=null;
  var lines=String(text).split(/\r?\n/), i=0;
  /* ① 战况块 —— `readBody()` 把它顶到第一行，认这对标签就够，不看行号。 */
  if(/^<battle_status>/i.test(lines[0]||'')){
    var buf=[];
    for(i=1;i<lines.length;i++){
      if(/^<\/battle_status>/i.test(lines[i])){ i++; break; }
      buf.push(lines[i]);
    }
    battle=parseBattle(buf);
  }
  /* ② 剩下的逐行读。⚠ `i` 从上面接着走 —— 战况块吃掉的行不能再当正文读一遍。 */
  for(;i<lines.length;i++){
    var t=lines[i].trim(); if(!t) continue;
    /* 🔴 检定记录 —— 卡里那七行是**一个整体**，不能一行一条地读成正文。
       块的边界：`【检定】` 那行起，往后**所有带缩进的行**都归它
       （卡里的样例七行全带前导空格，`147523` 的排版就是这么排的）。
       碰见第一个不带缩进的行 ⇒ 块结束。
       ⚠ 用 `lines[++i]` 而不是 `lines[i+1]` —— 收几行就得把那几行从主循环里吃掉，
         否则下一轮 for 会把它们当正文再读一遍（缩进没了，看着像叙述）。 */
    if(/^【检定】/.test(t)){
      var rec=[t];
      while(i+1<lines.length && /^[ \t]+\S/.test(lines[i+1])) rec.push(lines[++i].trim());
      p.push(['k', rec]); continue;
    }
    /* 🔴 **这两块的续行是 `> ` 引用块，不是缩进** —— 跟上面【检定】那份
       （缩进两格）**不是同一个形状**。出处 ＝ 卡 `254984 角色属性与检定总则` 五、2。
       ⚠ 方案 §4.5 原写「照上面那个收集器同形加两条」；干跑时才发现照那个
         `/^[ \t]+\S/` 写会**一行都收不到** —— 收不到就整块塌成一行标题，
         而 `parseReq` 拿到空记录、渲染出空面板，**不报错**。
       ⚠ `[ \t]*>` 而不是 `^>` —— 模型可能把它缩进着写。 */
    if(/^【判定请求/.test(t)){
      var qrec=[t];
      while(i+1<lines.length && /^[ \t]*>/.test(lines[i+1])) qrec.push(lines[++i].trim());
      p.push(['q', parseReq(qrec)]); continue;
    }
    if(/^【交锋对抗/.test(t)){
      var xrec=[t];
      while(i+1<lines.length && /^[ \t]*>/.test(lines[i+1])) xrec.push(lines[++i].trim());
      p.push(['x', parseClash(xrec)]); continue;
    }
    /* 🔴 战斗收尾块 —— `readBody()` 把它吊在最后。同上：认标签，不看行号。 */
    if(/^<battle_closure_log>/i.test(t)){
      var cbuf=[];
      for(i++;i<lines.length;i++){
        if(/^<\/battle_closure_log>/i.test(lines[i].trim())) break;
        cbuf.push(lines[i]);
      }
      closure=parseClosure(cbuf); continue;
    }
    var m=t.match(/^\{([^}]+)\}([\s\S]*)$/);
    if(!m){ p.push(['n', t]); continue; }
    var who=m[1].trim(), say=m[2].trim();
    /* 卡里的样例把对白写成 `{薇拉}「别回头。」` —— 直角引号**是正文的一部分**，
       而下面 `render()` 落结构时又会补一对 ⇒ 这里先剥掉一层，
       免得正文里出现「「别回头。」」。 */
    var q=say.match(/^「([\s\S]*)」$/); if(q) say=q[1];
    if(names.indexOf(who)<0) names.push(who);
    p.push(['s', who, say]);
  }
  return {no:no, who:names.join(' · '), p:p, battle:battle, closure:closure};
}

/* ── 战况块：文本表 → 结构 ────────────────────────────────────────────
   源格式抄自卡里〈角色属性与检定总则〉四、6（**一行一个参战单位**）：
     战况 · 第 <n> 回合
     | <单位名> | 先攻 <值> | HP <x>/<y> | MP <x>/<y> | SP <x>/<y> | 状态 <A · B> |
   🔴 **行序 ＝ 行动次序**（卡里硬要求一：先攻高的写第一行，每回合重掷故行序会变）。
     ⇒ 这里**原样保留顺序**，序号按行号生成 —— 排序是卡要传达的信息，不是噪音。
   ⚠ **按前缀认字段、不按列号** —— 列序是卡定的，但模型偶发会挪动或漏列；
     按前缀认的话，挪了也对、漏了也只是少一行，不会整行错位。 */
function parseBattle(lines){
  var round='', units=[];
  lines.forEach(function(raw){
    var t=raw.trim(); if(!t) return;
    var r=t.match(/^战况\s*·\s*第\s*(\S+?)\s*回合/);
    if(r){ round=r[1]; return; }
    if(t.charAt(0)!=='|') return;
    /* ⚠ 模型常顺手补一行 markdown 表头分隔（`|---|---|`）—— 卡里没有，见着就扔，
       否则它会变成一个名叫 `---` 的空单位行。 */
    if(/^[|\-:\s]+$/.test(t)) return;
    var c=t.replace(/^\|/,'').replace(/\|$/,'').split('|').map(function(s){return s.trim()});
    if(c.length<2||!c[0]) return;
    units.push(c);
  });
  return {round:round, units:units};
}

/* ── 从任意一段文本里抠出第一个整数 ───────────────────────────────────
   ⚠ 只认**第一个**整数。`DC 18` / `对方总值 15` / `17` 三种写法都落在 18 / 15 / 17。
     `-?\d+` 里的负号是给"负修正"留的（卡里 `总值` 那行会出现 `-2`）。 */
function numOf(s){ var m=String(s).match(/-?\d+/); return m?+m[0]:null; }

/* ══════════════ 战况块 ══════════════════════════════════════════════ */

/* 池子一格 —— **三个池子同一个写法：数就是数，没有条**。
   🔴 上一版给 HP 挂了十格刻度、给 MP/SP 挂数字，理由是"HP 需要一眼扫出还剩多少"。
     **那个理由站不住**：读者要看的是 `5788/10000`，不是一个还得先数格子再换算的比例。
     驾驶员 2026-09-21 原话：「**数字不做你要做条？？？**」
     ⇒ `HP 5788/10000 −4212`，三个池子一律长这样。
     刻度、灭格、`prevOn`、`chg in/out` **整套全删** —— 它们存在的唯一理由就是喂那十格。
   ⚠ `prev` **留着**：增量本身是一句话（"这一回合掉了 4212"）。
     它不画出来，它是**写出来**的 —— 这也正是删掉刻度之后唯一剩下的变化通道。
   ⚠ `z>0` 兜住 `MP 0/0`（不这么写会算出 `NaN`）。 */
function poolCell(k, v, prev, ix){
  /* ⚠ `ix` ＝ 这是本行的第几个池子。CSS 靠它（`.k0/.k1/.k2`）把三个池子钉在固定的列上 ——
     不钉的话宽屏上每行的 `HP` 起点都不一样，读者没法竖着扫（见 CSS 里那段注释）。
     多余的池子（卡里现在没有第 4 个）不编号，退回自动占位，**不吞**。 */
  var kc=(ix!=null&&ix<3)?' k'+ix:'';
  var m=String(v).match(/^(\d+)\s*\/\s*(\d+)$/);
  if(!m) return '<span class="f'+kc+'"><i>'+esc(k)+'</i><b>'+esc(v)+'</b></span>';
  var a=+m[1], z=+m[2];
  var d=(prev!=null&&!isNaN(prev))?a-prev:null;
  /* 🔴 **这里一个字都不报颜色，是有意的。**
     我原来在这写过一版「只有 HP 见底才上信号色」，还挂了个 `.low` 出去 ——
     **那个类和那句注释都是死的**：CSS 那边后来裁的是
     「`--sig` 在战况块里只有一个意思 ＝ **这个单位在告急**，见底的 HP 不给它」。
     两边注释对着干，结果就是 `.low` 渲染出来、CSS 里查无此类，
     **屏幕上什么都不发生、也不报错**（跟 `.mp` / `.cmp.over>i` 是同一个病，
     现在有 `_查_无样式类.mjs` 专门抓这个）。
     ⇒ 见底的 HP 靠 `7/26` 这两个数自己说；掉血的方向靠 `−19` 自己说。
       颜色不是把同一件事再报一遍的地方。 */
  return '<span class="f'+kc+'">'+
    '<i>'+esc(k)+'</i><b>'+a+'</b><u>/'+z+'</u>'+
    /* 增量为 0 ⇒ 一个字都不出。没有变化可报时它**什么都不说**，这是对的，不是降级。 */
    (d?'<em>'+(d>0?'+':'−')+Math.abs(d)+'</em>':'')+'</span>';
}

/* 行首那个**行动次序**号 —— `①②③…`。
   🔴 卡自己写着「**行序 ＝ 行动次序**……那不是噪音，那正是信息」（`254984` 四、6 硬要求一）。
     ⇒ 号不是装饰：它是战况块里**唯一在报"谁先动"的东西**，
       而先攻每回合重掷 ⇒ **号每回合换人**，那正是要看的。
       驾驶员问的「这战况有展现每个人的作用吗」，一半的答案就在这个号上；
       另一半在检定记录首行那句 `主体:A → 对象:B` —— 两边靠**同一个号**对上（见 `ORDMAP`）。
   ⚠ 圈号只有 1~20；到 21 退回 `(21)` —— 宁可换一种写法，不许编号错。 */
var ORD='①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳';
function ordNo(i){ return i<20?ORD.charAt(i):'('+(i+1)+')'; }

/* 本轮「单位名 → 行动次序号」。`battleHTML` 建，`checkHTML` 查。
   ⚠ 只能是模块级的：`checkHTML` 手上只有一条检定记录，够不到战况块。 */
var ORDMAP={};

/* 单位名里那截 `（存活 4/6）` —— 半角全角括号都收。
   ⚠ 比对上一回合时也得先摘掉它，否则"存活 4/6"变了名字就配不上同一行了。 */
function unitName(raw){
  var gm=String(raw||'').match(/^([\s\S]*?)\s*[（(]\s*(存活[\s\S]*?)\s*[)）]\s*$/);
  return gm?{name:gm[1], grp:gm[2]}:{name:String(raw||''), grp:''};
}

/* 战况块 —— **脊是行动次序，不是资源表**。
   🔴 上一版把这一块做成了"队伍资源一览"：三行池子＋一行状态，谁打谁完全看不出来。
     驾驶员原话：「**这战况有展现每个人的作用吗？？？**」
     ⇒ 现在每一行是**一个单位的一手**，按**行序 ＝ 行动次序**排（卡里硬要求一），
       行首给号（`①②③`），名字旁边给先攻，池子带**对上一回合的增量**，
       `存活 n/m` 单独站一格并同样带增量。
     ⇒ 一行读下来就是一句话：**「③ 灰港守卫(存活 4/6 −2) 先攻15 HP 12/40 −28 …」**
       「这一回合谁动了、动了之后还剩多少」全在这一行里。
   ⚠ `prev` ＝ 上一回合的同名单位（没有就 `null`）：增量、存活变化都靠它。
     拿不到就**一个增量都不出** —— 不报"读不到"，也不假装。 */
function battleHTML(b, pb){
  if(!b||!b.units.length) return '';
  /* 上一回合按**单位名**建索引 —— 卡里没给单位 ID，名字是唯一的身份。
     ⚠ 配不上就当作"没有上一回合"，不猜。 */
  var prev={}, prevIx={};
  if(pb&&pb.units) pb.units.forEach(function(c,ix){
    var nm=unitName(c[0]).name.trim();
    if(nm){ prev[nm]=c; prevIx[nm]=ix; }
  });
  /* 🔴 **每建一次就重写一遍。** 一楼里可能有多个战况块，但**同一时刻只有一个是"当前轮"**，
     而 `checkHTML` 是紧接着 `battleHTML` 跑的（见 `render`）⇒ 后写的那个就是对的。
     ⚠ 不清空的话，上一楼层的单位会留在表里给这一层的检定配上号 —— 配错号比不配号更坏。 */
  ORDMAP={};
  var rows=b.units.map(function(c,ix){
    var u=unitName(c[0]), nm=u.name.trim(), grp=u.grp, cells=[], st='', ini='', pi=0;
    if(nm) ORDMAP[nm]=ix;
    var pc=prev[nm];
    for(var j=1;j<c.length;j++){
      var f=c[j];
      var s=f.match(/^状态\s*([\s\S]*)$/);
      if(s){ st=s[1].trim(); continue; }
      var k=f.match(/^(先攻|HP|MP|SP)\s+(\S+)$/);
      if(!k){ if(f) cells.push('<span class="f"><b>'+esc(f)+'</b></span>'); continue; }  /* 不认识的列照显，不吞 */
      if(k[1]==='先攻'){ ini=k[2]; continue; }   /* 先攻挪到名字旁边站，见下面的拼装 */
      var pv=null;
      if(pc) for(var q=1;q<pc.length;q++){
        var k2=String(pc[q]).match(/^(先攻|HP|MP|SP)\s+(\S+)$/);
        if(k2&&k2[1]===k[1]){ pv=numOf(k2[2]); break; }
      }
      cells.push(poolCell(k[1],k[2],pv,pi++));
    }
    /* `（存活 4/6）` —— 上一版只是把它拼在名字后面当注解。
       🔴 它是**集群的血条**：`254984` 里集群的减员就是战斗力本身（`10000→5788`）。
         ⇒ 单独立一格、带标签、**带上跟上一回合的差**（`−2`）。
           驾驶员那句「集群减员 10000→5788 [57%] 🟡 能推战况块的 x/y 与 存活 n/m
           两回合对比可得」要的就是这个差 —— 之前推不出来，是因为没把两个回合摆在一起。 */
    var gv='';
    var sv=grp.match(/(\d+)\s*\/\s*(\d+)/);
    if(sv){
      var gd=null;
      if(pc){ var pg=unitName(pc[0]).grp.match(/(\d+)\s*\/\s*(\d+)/); if(pg) gd=+sv[1]-+pg[1]; }
      /* 🔴 `.gone` ＝ **这个单位在告急**（集群被打残了）。这是全卡**唯一**用 `--sig`
         报警的地方（见 CSS 里那条注释）。⚠ 只在真掉了的时候上，不是"没满就上"。 */
      gv='<span class="g'+(gd<0?' gone':'')+'"><i>存活</i><b>'+sv[1]+'</b><u>/'+sv[2]+'</u>'+
        (gd?'<em>'+(gd>0?'+':'−')+Math.abs(gd)+'</em>':'')+'</span>';
    } else if(grp) gv='<span class="g">'+esc(grp)+'</span>';
    /* 卡里硬要求五：昏迷/失能单位**照样占一行**，状态写【跳过行动】**不许删行**。
       ⇒ 这里只把它读轻（`.skip` 降透明度、`.st.out` 退成 faint），**不隐藏**。 */
    var skip=/跳过行动/.test(st);
    /* 🔴 `--dy` ＝ **上一回合这个单位排在第几行，跟现在差几行**。
       先攻每回合重掷 ⇒ 行序会变；变了就该**看得见地滑过去**，不是"啪"地换个位置。
       ⚠ 用 `translateY(calc(var(--dy) * 100%))`：百分比是相对**元素自身高度**，
         所以哪怕行高不等（换行的那几行会高一截）也不用去测像素。
         `--dy` 只在**真的换了行**的时候写，没换的行走 `rowIn`（按次序落位），
         两条动画分开 —— 一条动画只能报一件事。 */
    var dy=(prevIx[nm]!=null&&prevIx[nm]!==ix)?(prevIx[nm]-ix):0;
    return '<div class="u'+(skip?' skip':'')+(dy?' mv':'')+'"'+
      ' style="--ri:'+ix+(dy?';--dy:'+dy:'')+'">'+
      '<span class="i">'+ordNo(ix)+'</span>'+
      '<span class="n">'+esc(nm)+'</span>'+
      '<span class="f ini"><i>先攻</i><b>'+esc(ini||'—')+'</b></span>'+
      cells.join('')+
      /* 🔴 `存活` 排在**数值串的最后**，不是名字后面。
         它是集群专属的一格 ⇒ 五个单位里只有一个有，另外四个那格是空的。
         放在中间 ⇒ 中间凭空多出 86px 的空洞，看起来像**排版坏了**，不像"这格没值"。
         放在数值串末尾 ⇒ 那点空并进 `状态` 那列本来就有的留白里，**看不见了**。
         ⚠ 位置变了，但它跟 `HP` 的关系没变：集群的战斗力就是 `存活 n/m`（见上面那条注释）。 */
      gv+
      '<span class="st'+(skip?' out':'')+'">'+esc(st||'无')+'</span></div>';
  }).join('');
  /* 卡里硬要求三：没有状态写「无」，**不许留空** —— 上面 `st||'无'` 兜的就是它。 */
  return '<div class="bs"><div class="bsh">'+
    '<span class="mk"><i class="gl gl-bs" aria-hidden="true"></i>战况</span>'+
    '<span class="lb">第</span><span class="rn">'+esc(b.round||'—')+'</span><span class="lb">回合</span>'+
    '<span class="hd">行序 ＝ 行动次序</span>'+
    '<span class="ct">'+b.units.length+' 单位</span></div>'+rows+'</div>';
}

/* ── 找**上一回合**的战况块 ──────────────────────────────────────────
   只为一件事：让每个池子旁边的增量**有东西可比**（"这一回合掉了 4212"）。
   🔴 拿不到就返回 `null`，所有增量都不出 —— 不报"读不到"，也不假装。
   ⚠ 往前找**最多 3 层** —— 中间可能隔着旁白层 / 玩家层，那些没有战况块。
   ⚠ 整段 try 兜住：不在楼层 iframe 里、酒馆助手没装都会抛，不能带崩渲染。 */
function prevBattle(){
  try{
    if(typeof getCurrentMessageId!=='function'||typeof getChatMessages!=='function') return null;
    var id=getCurrentMessageId();
    if(typeof id!=='number'||id<1) return null;
    for(var k=id-1;k>=0&&k>id-4;k--){
      var arr=getChatMessages(k); if(!arr||!arr.length) continue;
      var raw=arr[0].message||'';
      var bs=(raw.match(/<battle_status>([\s\S]*?)<\/battle_status>/i)||[])[1];
      if(bs) return parseBattle(bs.trim().split(/\r?\n/));
    }
  }catch(e){}
  return null;
}

/* ══════════════ 检定记录 ════════════════════════════════════════════
   源格式抄自卡里 `147523 检定_结构化记录`（**七行**，除首行外全带缩进）：
     【检定】<战斗|剧情> | <类型> | 主体:<A> → 对象:<B>
       取用骰 #<n> = <裸骰>
       总值 <裸骰>+<属性Mod>+<技能>+<装备> = <合计>
       对标 <对方总值|DC 目标值> | 层差 k=<n> | 档位 <大成功|成功|失败|大失败>
       结果 <伤害数值|叙事后果> | <状态变化>
       位子 <这一手花了哪个位子> | 余 <还剩哪些>
   🔴 **七行里只有六行是固定的** —— 「位子」那行**只在战斗中写**
      （卡里原话：战斗中比剧情轨**多一行**）。⇒ 它缺席是**正常**，不当缺失报。
   ⚠ 档位判定**先长后短**：`大成功` 里含着 `成功`、`大失败` 里含着 `失败`，
     先测短的会把大成功判成"成功"。 */
function tierOf(s){
  if(/大成功/.test(s)) return 'crit';
  if(/大失败/.test(s)) return 'fumble';
  if(/成功/.test(s)) return 'ok';
  if(/失败/.test(s)) return 'fail';
  return '';
}
var TIER_TXT={crit:'大成功',ok:'成功',fail:'失败',fumble:'大失败'};

/* 文本 → 结构。**不吞**：模型多写一个字段时，宁可多落一行也不要静默丢。 */
function parseCheck(rec){
  var head=(rec[0]||'').replace(/^【检定】/,'').trim();
  var seg=head.split('|').map(function(s){return s.trim()});
  var o={track:seg[0]||'', type:seg[1]||'', me:'', it:'', extra:[],
         die:null, dieAlt:'', sum:null, sumAlt:'', tgt:'', tgtNum:null,
         k:'', tier:'', tierTxt:'', res:'', chg:'', slot:'', slotLeft:'',
         mean:'', chain:'', delta:''};
  var vm=(seg[2]||'').match(/^主体\s*[:：]\s*([\s\S]*?)\s*(?:→|->|—>)\s*对象\s*[:：]\s*([\s\S]*)$/);
  if(vm){ o.me=vm[1]; o.it=vm[2]; } else { o.me=seg[2]||''; }
  rec.slice(1).forEach(function(line){
    var m=line.match(/^(\S+)\s+([\s\S]*)$/);
    if(!m){ o.extra.push(['·', line]); return; }
    var k=m[1], v=m[2].trim();
    if(k==='取用骰'){
      var d=v.match(/^(#\S+)\s*=\s*(\S+)$/);
      if(d) o.die={no:d[1], raw:d[2], val:numOf(d[2])}; else o.dieAlt=v;
    } else if(k==='总值'){
      var e=v.match(/^([\s\S]*?)\s*=\s*(\S+)$/);
      if(e) o.sum={expr:e[1], val:numOf(e[2]), valTxt:e[2]}; else o.sumAlt=v;
    } else if(k==='对标'){
      var p=v.split('|').map(function(s){return s.trim()});
      o.tgt=p[0]||''; o.tgtNum=numOf(o.tgt);
      p.forEach(function(x){
        if(/^层差/.test(x)) o.k=x.replace(/^层差\s*/,'').replace(/^k\s*[:：=]?\s*/i,'');
        else if(/^档位/.test(x)){ o.tier=tierOf(x); o.tierTxt=x.replace(/^档位\s*/,''); }
      });
    } else if(k==='结果'){
      var q=v.split('|').map(function(s){return s.trim()});
      o.res=q[0]||''; o.chg=q[1]||'';
    } else if(k==='位子'){
      var w=v.split('|').map(function(s){return s.trim()});
      o.slot=w[0]||''; o.slotLeft=w[1]||'';
    /* ── 下面三行是**新加的**（`_检定与战况方案.md` §4.1），卡还没吐 ──────────
       渲染层先认着：卡吐了就自动出面板，没吐（现在）就走老路，
       **缺席不报缺** —— 与「位子」那行同一条纪律（剧情轨本来就没有）。 */
    } else if(k==='手段'){ o.mean=v;
    } else if(k==='结算'){ o.chain=v;
    } else if(k==='变更'){ o.delta=v;
    } else { o.extra.push([k, v]); }
  });
  /* 档位没在 `对标` 行里认出来（模型改了写法）⇒ 退回整块扫一遍，别让面板丢掉结论。 */
  if(!o.tier) o.tier=tierOf(rec.join(' '));
  if(!o.tierTxt) o.tierTxt=TIER_TXT[o.tier]||'';
  /* 单方 vs 对抗：卡里 `对标` 那格写的是「对方总值」或「DC 目标值」两种东西，
     标出来 —— 同一个数字，一个是"过线"一个是"压过谁"，读法不同。 */
  o.tag=/^DC/i.test(o.tgt)?'DC':'对抗';
  return o;
}

/* ── 账本一行 ────────────────────────────────────────────────────────
   面板的全部语言就是这一条：**左标签、右值、一行一步**。
   参考图上那块结算清单就是这个形状 —— 而月痕的检定记录**本来就是一本账**：
   取用骰 → 加值 → 总值 → 对标 → 层差 → 结算 → 变更 → 位子，一步一行。
   🔴 为什么不做判定轴 —— 驾驶员 2026-09-21 原话：「**数字不做你要做条？？？**」
     轴把"差多少"**画成长度**；可长度读不出数，读者还得回明细里查"总值是 22"。
     账本把同一件事**写成数**。图形没了，信息一个不少。
   ⚠ 空值 ⇒ **整行不出**（剧情轨没有位子，没造成伤害就没有结算）。
     那不是缺，是本来就没有 —— 与「位子」那行同一条纪律。 */
/* ⚠ `ROWI` 是**账本行的序号**，写进 `style="--ri"`，动效拿它做逐行错开。
     跟战况块的 `--ri`（行号）是两回事，各算各的。
   🔴 它必须在每次拼一块面板之前归零 —— 跟 `ORDMAP` 同一条纪律：
     **计数器不清，下一块面板的行会接着上一块往下排**，错开的节奏就断了（而且不报错）。 */
var ROWI=0;
function row(k, v, cls, kc, f){
  if(!v) return '';
  /* 🔴 `<i class="ld">` ＝ 标签和值中间那排**引导点**。2026-09-21 第三遍加的，
     起因是拍出来看见的：值推到最右之后，`手段` 和 `威吓 · 兵刃 斩月` 中间
     **裂开六七百像素什么都没有** —— 读一行要横跳一次，八行横跳八次。
     理由与做法写在 CSS 那条 `.ld` 上（连"为什么不用渐变画点"一起）。 */
  return '<div class="rw'+(cls?' '+cls:'')+'" style="--ri:'+(ROWI++)+'">'+
    (kc?ic(kc):'')+'<span class="rk">'+esc(k)+'</span><i class="ld"></i>'+
    '<span class="rv">'+v+'</span>'+
    (f==null?'':'<span class="vb"><i style="--v:'+(+f).toFixed(3)+'"></i></span>')+'</div>';
}

/* 总值那一串 —— `18+5(敏捷)+2(斩击)+1(斩月)`。
   🔴 **原样印，只把名字拆出来上色，绝不替它编名字。**
     卡里 `总值` 那格的写法是
       `<裸骰>+<属性Mod>(<属性名>)+<技能>(<技能名>)+<装备>(<兵刃名>)`
     —— 名字是**卡要求模型写的**（方案 §4.1），不是我从数里猜的。
     模型没写名字就照印裸数，一个字都不解释。
   ⚠ 第一项是**取用骰**（跟 `取用骰` 那行的裸骰是同一个数），单独标出来：
     读者一眼能看出"这一下里多少是运气、多少是本事"。 */
function termsHTML(expr, dieVal){
  return String(expr||'').split(/(?=[+\-])/).map(function(t){
    var s=t.trim(); if(!s) return '';
    var m=s.match(/^([+\-]?)\s*(\d+)\s*(?:[（(]\s*([^）)]*)\s*[)）])?$/);
    if(!m) return '<span class="tm">'+esc(s)+'</span>';
    /* 裸骰那一项**没有名字**，加值项都带名字 —— 拿这个把两者分开。 */
    var isDie=(m[1]!=='-'&&!m[3]&&dieVal!=null&&+m[2]===dieVal);
    /* ⚠ 名字**连着括号一起印**（`+5(风度)`）—— 括号是卡里 `总值` 那格的原文格式，
       不是装饰。拆掉它就成了"5 后面跟了两个字"，读者得自己猜那两个字是干嘛的。 */
    return '<span class="tm'+(isDie?' die':'')+'">'+
      (m[1]?'<em>'+(m[1]==='-'?'−':'+')+'</em>':'')+
      '<b>'+m[2]+'</b>'+(m[3]?'<i>(</i><i class="nm">'+esc(m[3])+'</i><i>)</i>':'')+'</span>';
  }).join('');
}

/* 手段 —— `斩击 · 兵刃 斩月`。
   🔴 **这一行是驾驶员点名要的**：「参照图上的**招式名 / 所使武器**」。
     卡里本来就有（`技能.<名>` · `装备.<名>`），只是 `147523` 没引它们
     ⇒ 方案 §4.1 给记录加了这一格，**卡要改**，渲染层先认着。
   ⚠ 前半段是**招式名**（卡里 `技能.<名>` 或 `普通攻击`）⇒ 上强调；
     后半段是 `兵刃 <武器名>` ⇒ 拆成"标签 ＋ 名字"，跟池子那边同一个写法。 */
function meanHTML(s){
  return String(s||'').split(/\s*[·・]\s*/).map(function(p,i){
    var m=p.match(/^(\S+)\s+(.+)$/);
    if(m&&/^(兵刃|武器|器|装备)$/.test(m[1]))
      return '<span class="mp art"><i>'+esc(m[1])+'</i><b>'+esc(m[2])+'</b></span>';
    return '<span class="mp'+(i?'':' mv')+'"><b>'+esc(p)+'</b></span>';
  }).join('<span class="sep">·</span>');
}

/* 结算链 —— `4212 × 1.5 × 1.0 × (1 − 0.2) × (1 − 0.1) = 4212`。
   🔴 这一行是**参照图上那条伤害基准计算**的月痕对应物；五个因子卡里全都有出处
     （`攻.值` · `技能.倍率` · 档位推出的系数 · 阶位差压制率 · 三抗，见方案 §2）。
     ⇒ 原样印。**不重排、不化简、不替我算** —— 每一项都要能拿回卡里对得上。
   ⚠ `=` 右边那一项上强调：一串乘法的落点是它，不是中间任何一项。 */
function chainHTML(s){
  var parts=String(s||'').split(/\s*=\s*/);
  var lhs=parts[0], rhs=parts.slice(1).join(' = ');
  var terms=lhs.split(/\s*([×xX*])\s*/).map(function(t){
    t=t.trim(); if(!t) return '';
    if(/^[×xX*]$/.test(t)) return '<em class="op">×</em>';
    /* 🔴 **括号必须留着，而且必须是真字符。** 第一版把 `(1 − 0.2)` 的括号换成
       CSS 留白，屏幕上就成了 `22 × 1.0 × 1.0 × 1 − 0 × 1 − 0 = 22` ——
       那**是另一个算式**（乘除优先级全变了），读者照着算会算出别的数。
       ⚠ 也不能拿 `::before{content:'('}` 补：那样选中复制出来的算式**没有括号**。
       一条算式在屏幕上是错的、复制出来也是错的，那是两个 bug。 */
    var m=t.match(/^[（(]\s*1\s*[−\-]\s*([\d.]+)\s*[)）]$/);
    if(m) return '<span class="cs"><i>(</i><u>1 −</u><b>'+m[1]+'</b><i>)</i></span>';
    return '<span class="tm"><b>'+esc(t)+'</b></span>';
  }).join('');
  return terms+(rhs?'<em class="op">=</em><span class="tot">'+esc(rhs)+'</span>':'');
}

/* 变更 —— `亡命徒集群 HP 10000 → 5788 [57%] | 存活 6/6 → 4/6`。
   🔴 **这一格回答的是驾驶员那句「集群减员 10000→5788 [57%]」。**
     他说这个"能推战况块的 x/y 与 存活 n/m 两回合对比可得" —— 对，
     但那是**渲染层替读者做了一次减法**；记录里直接写出来，读者就不用推。
     ⇒ 两个回合的对比照样在战况块里出（那边才是"看得见变化"的地方），
       这里是**记录留痕**：这一手把谁从多少打到了多少。
   ⚠ 箭头后面那一项加粗、下降时上信号色 —— 一行里只允许一处强调。 */
function deltaHTML(s){
  return String(s||'').split(/\s*\|\s*/).map(function(p){
    var m=p.match(/^([\s\S]*?)\s*(\d+)\s*(?:→|->|➜)\s*(\d+)\s*(?:\[\s*([\d.]+%)\s*\])?\s*$/);
    if(!m) return '<span class="dg">'+esc(p)+'</span>';
    /* ⚠ 这里原来算过一个 `dec`（"新值比旧值小"）挂成 `.dg.dec`，注释还写着
       「下降时上信号色」—— **CSS 里没这条规则，纯是句空话**。已删。
       🔴 旧值 → 新值的方向**已经由三级递进说完了**（见 CSS 里 `.dg>u` / `.dg>.ar` / `.dg>b`
         那三档：`--faint` → `--dim` → `--ink 700`），加颜色是把同一件事报第二遍。 */
    return '<span class="dg">'+
      (m[1]?'<i>'+esc(m[1])+'</i>':'')+
      '<u>'+m[2]+'</u><em class="ar">→</em><b>'+m[3]+'</b>'+
      /* ⚠ 方括号照印 —— 卡里 `变更` 那格写的就是 `[57%]`，剥掉会读成"新值后面跟了个数"。 */
      (m[4]?'<s>['+esc(m[4])+']</s>':'')+'</span>';
  }).join('<span class="sep">|</span>');
}

/* 检定面板 —— **一本账**。
   🔴 上一版这块是「判定轴 ＋ 两张明细表」，轴把差距画成长度、表把同几个数再抄一遍。
     驾驶员一句「**数字不做你要做条？？？**」把它整个否了。
     ⇒ 现在只剩一种走法：**一行一步，数就是数**。
   🔴 首行那句 `主体:A → 对象:B` 是**承重的** —— 驾驶员问「这战况有展现每个人的作用吗」，
     战况块的行动次序号答了一半，这句答另一半：**这一条检定是谁打谁**。
     两边的号来自同一个 `ORDMAP` ⇒ 读者能在战况块里找到同一号那一行，对上它的池子。
   ⚠ 找不到号（剧情轨 / 名字对不上）就**不出号**，不猜、不补 0。 */
function checkHTML(rec){
  var o=parseCheck(rec);
  var dieVal=(o.die&&o.die.val!=null)?o.die.val:null;
  var T=(o.sum&&o.sum.val!=null)?o.sum.val:null;
  var D=(o.tgtNum!=null)?o.tgtNum:null;
  /* 🔴 自然 20 / 自然 1 —— **这两个标记是承重的，不是装饰。**
     卡里〈角色属性与检定总则〉三、4 的判序原话：
       「先判自然20与自然1，再判总值。**二者无视对抗结果，压过总值比较。**」
     ⇒ 账本上完全可能出现「**总值 18 < 对标 26，档位却是大成功**」。
       那不是面板自相矛盾 —— 是"这一掷本身改判了"，比较那一栏根本没用上。
       所以极值必须在比较旁边标出来。**只标"这个骰是极值"这个事实**，
       不加"暴击 / 必中"之类卡里没有的词。 */
  var nat=(dieVal===20)?'hi':((dieVal===1)?'lo':'');
  ROWI=0;
  var c=[];
  /* ① 取用骰 —— 极值当场标，不留到结论条才说。
     ⚠ 这一行**没有行类**：上面那两条横线（`.r-sum` / `.r-chain`）报的是
       "**一次计算从这儿开始**"，而取用骰是**原料**、不是计算 ⇒ 不该有线。
       （原来这儿挂过 `'r-die'`，CSS 里查无此类，白白给下一个读代码的人一个假钩子。） */
  if(o.die) c.push(row('取用骰',
    '<span class="no">'+esc(o.die.no)+'</span><b class="die">'+esc(o.die.raw)+'</b>'+
    (nat?'<span class="nat">'+(nat==='hi'?'自然 20':'自然 1')+'</span>':'')));
  else if(o.dieAlt) c.push(row('取用骰', esc(o.dieAlt)));
  /* ② 手段 —— 招式 · 兵刃。**卡还没吐这行**（方案 §4.1），缺席就整行不出。 */
  if(o.mean) c.push(row('手段', meanHTML(o.mean)));
  /* ③ 总值 —— 逐项带名字，末项 ＝ 合计。 */
  if(o.sum) c.push(row('总值',
    '<span class="ex">'+termsHTML(o.sum.expr,dieVal)+'</span>'+
    '<em class="op">=</em><b class="tot">'+esc(o.sum.valTxt)+'</b>','r-sum'));
  else if(o.sumAlt) c.push(row('总值', esc(o.sumAlt)));
  /* ④ 对标 ＋ 层差 —— 层差跟着对标走，它俩是同一句话的两半。 */
  if(o.tgt) c.push(row('对标',
    '<b class="tg">'+esc(o.tgt)+'</b>'+
    (o.k?'<span class="kk">层差 k=<b>'+esc(o.k)+'</b></span>':'')));
  /* ⑤ 结算 —— 伤害链。**卡还没吐这行。** */
  if(o.chain) c.push(row('结算','<span class="cx">'+chainHTML(o.chain)+'</span>','r-chain'));
  /* ⑥ 变更 —— 前后值 ＋ 百分比。**卡还没吐这行。** */
  if(o.delta) c.push(row('变更', deltaHTML(o.delta),'r-delta'));
  /* ⑦ 状态变化 —— 后果，跟变更挨着。 */
  if(o.chg) c.push(row('状态', esc(o.chg)));
  /* ⑧ 位子 —— 战斗中才有；剧情轨不出这行是**正常**，不是缺失。 */
  if(o.slot) c.push(row('位子',
    '<b class="sl">'+esc(o.slot)+'</b>'+
    (o.slotLeft?'<span class="rest">'+esc(String(o.slotLeft).replace(/^余\s*/,'余 '))+'</span>':'')));
  /* 不认识的键照落一行，**不吞** —— 模型多写一个字段时宁可多一行也不静默丢。 */
  o.extra.forEach(function(x){ c.push(row(x[0]==='·'?'·':x[0], esc(x[1]))); });

  /* 结论条 —— 档位 / 比较 / 结果，一条读完。
     🔴 档位是**一个词**，不是一条色带（`数字不做条` 的同一条理：颜色只负责"是哪一档"，
       不负责"差多少" —— 差多少由 `26 > 12` 这两个数自己说）。
     🔴 **关系符必须是真关系，不能一律印 `≥`。**
       第一版不管三七二十一印 `≥` ⇒ 屏幕上出现了「**11 ≥ 20 · 失败**」和
       「**25 ≥ 31 · 大成功**」两种**假命题**。读者照着这一行核，会以为面板算错了 ——
       而错的是这一行字。⇒ 现值：
         · 普通情形印**真关系**（`>` / `<` / `=`），过没过由它自己说；
         · 极值改判时**不印关系符**，改成 `总值 25 对标 31` ——
           因为这一掷根本没用上比较，印任何一个符号都是在说一件没发生的事。 */
  var cmp='';
  if(T!=null&&D!=null){
    if(nat){
      cmp='<span class="cmp over"><i>总值</i><b>'+T+'</b><i>对标</i><b>'+D+'</b></span>'+
        '<span class="ov">极值压过比较</span>';
    }else{
      /* ⚠ `<` 必须写成 `&lt;` —— 裸 `<` 后面跟着 `</em>` 时，
         HTML 解析器怎么处理**取决于它猜不猜得出标签名**，那是"碰巧能跑"，
         不是"写对了"。实体是确定的。 */
      var rel=(T>D)?'>':((T<D)?'&lt;':'=');
      cmp='<span class="cmp"><b>'+T+'</b>'+
        '<em class="'+(T>=D?'ge':'lt')+'">'+rel+'</em><b>'+D+'</b></span>';
    }
  }
  var no=(o.me&&ORDMAP[String(o.me).trim()]!=null)?ordNo(ORDMAP[String(o.me).trim()]):'';
  /* 🔴 **2026-09-21 第五遍：这块面板改成"先折叠、点开才出结果"。**
     驾驶员原话：「**检定的话是可以点击查看结果的，先折叠，然后出来**」。
     ⚠ 用**原生 `<details>` / `<summary>`**，不挂 JS click —— 三个理由：
       ① `<summary>` 天然可聚焦、回车／空格就能开合，**键盘和读屏不用另写一行**；
       ② JS 开关在"选中复制"和重新渲染之后会掉状态，原生元素不掉；
       ③ 这块 HTML 是**我们自己的脚本**在 iframe 里生成的、不过 ST 的净化器，
          所以 `<details>` 不会被吃掉（这正是外链宿主那条路的好处）。
     🔴 **`.ch` ＋ `.hd2` 一起进 `<summary>`，`.led` ＋ `.cz` 留在折叠体里。**
        折起来看到的是「**这是个什么检定 · 谁打谁**」—— 那是这块面板的身份；
        打开才给账本和结论。所以 `.ch`/`.hd2` 从 `<div>` 降成 `<span>`
        （`<summary>` 的内容模型只收短语），排版照旧交给 CSS 的 flex/grid。
     🔴 **动效一行新的都没写 —— 白捡一个"展开"。**
        下面那套"证据先到、结论最后落"的错开（`.play .led .rw` 的 `--ri` 阶梯
        ＋ `.cz` 的 0.3s）本来就是按"逐行出现"设计的。
        折叠体在 `<details>` 关着时**根本不渲染** ⇒ 那批动画**不会在开页时跑掉**，
        而是在**点开的那一刻**才开始。同一批关键帧，换个触发时机就是展开动效。
     ⚠ 承重的那句 `主体:A → 对象:B` **留在折起来的状态里** —— 它在答驾驶员
        「这战况有展现每个人的作用吗」，藏进折叠体等于把它答的那半句撤了。 */
  return '<details class="ck"'+(o.tier?' data-tier="'+o.tier+'"':'')+
    (nat?' data-nat="'+nat+'"':'')+'>'+
    '<summary class="sh">'+
      '<span class="ch"><span class="mk" aria-hidden="true"><i class="gl gl-ck"></i></span>'+
      '<span class="lb">检定</span>'+
      '<span class="ty">'+esc(o.type||'—')+'</span>'+
      '<span class="fo">'+esc(o.track)+'</span></span>'+
      '<span class="hd2">'+(no?'<span class="i">'+no+'</span>':'')+
        '<b>'+esc(o.me||'—')+'</b>'+(o.it?'<em>→</em><span>'+esc(o.it)+'</span>':'')+'</span>'+
      '<span class="dp" aria-hidden="true"></span>'+
    '</summary>'+
    '<div class="led">'+c.join('')+'</div>'+
    '<div class="cz"><span class="tier">'+esc(o.tierTxt||'—')+'</span>'+cmp+
      (o.res?'<span class="rs">'+esc(o.res)+'</span>':'')+'</div>'+
    '</details>';
}

/* ══════════════ 战斗结算 ════════════════════════════════════════════
   源格式 ＝ 方案 §4.3（**卡还没吐**，`9900052` 五、只说了「留痕：照〈检定_结构化记录〉
   出一条」，驾驶员 2026-09-21 裁定「那就改不就得了」⇒ 改的是卡，渲染层先认着）：
     <battle_closure_log>
     【战斗结算】<歼|退|和>
       战利品 <名> ×<n> · <名> ×<n>
       经验 <来源> +<n>% | 合计 <n>% | 截断 <是|否>
       状态清算 <到期清掉的状态名|无>
     </battle_closure_log>
   ⚠ 键名**照抄不译**：`歼/退/和` 原样印出来，不替它展开成"歼灭/击退" ——
     那是替卡造词（同「中间那段差距不给它起名字」那条纪律）。 */
function parseClosure(lines){
  var o={kind:'', loot:'', exp:'', purge:'', more:[]}, started=false;
  lines.forEach(function(raw){
    var t=raw.trim(); if(!t) return;
    var h=t.match(/^【战斗结算】\s*([\s\S]*)$/);
    if(h){ o.kind=h[1].trim(); started=true; return; }
    var m=t.match(/^(\S+)\s+([\s\S]*)$/);
    if(!m){ o.more.push(t); return; }
    if(m[1]==='战利品') o.loot=m[2].trim();
    else if(m[1]==='经验') o.exp=m[2].trim();
    else if(m[1]==='状态清算') o.purge=m[2].trim();
    else o.more.push(t);          /* 不认识的键照落一行，不吞 */
  });
  return started?o:null;
}

/* 战利品 —— `名 ×n · 名 ×n`。数量单独上色：它是这一行里唯一会变的那个数。 */
function lootHTML(s){
  return String(s||'').split(/\s*[·・]\s*/).map(function(p){
    var m=p.match(/^([\s\S]*?)\s*[×xX*]\s*(\d+)$/);
    if(!m) return '<span class="lt"><b>'+esc(p)+'</b></span>';
    return '<span class="lt"><b>'+esc(m[1])+'</b><s>×'+m[2]+'</s></span>';
  }).join('<span class="sep">·</span>');
}

/* 经验 —— `<来源> +<n>% | 合计 <n>% | 截断 <是|否>`。
   ⚠ `合计` 上强调：三段里只有它是这一场的落点，另两段是它的来历与处置。 */
function expHTML(s){
  return String(s||'').split(/\s*\|\s*/).map(function(p){
    var m=p.match(/^(\S+)\s+([\s\S]*)$/);
    if(m&&m[1]==='合计') return '<span class="xp sum"><i>合计</i><b>'+esc(m[2])+'</b></span>';
    return '<span class="xp">'+esc(p)+'</span>';
  }).join('<span class="sep">|</span>');
}

/* 结算面板 —— 三条账，一块，排在整层的**最后**（它是这一场仗的收尾）。
   ⚠ **不写"战斗结束"之类的话**：这块本身就在报"打完了"，再说一遍是同义反复。
   ⚠ 一块都没有（模型只写了标题行）⇒ 返回空串，**不出一个空壳**。 */
function closureHTML(o){
  if(!o) return '';
  ROWI=0;
  var c=[];
  if(o.loot) c.push(row('战利品', lootHTML(o.loot)));
  if(o.exp) c.push(row('经验', expHTML(o.exp)));
  if(o.purge) c.push(row('状态清算', esc(o.purge)));
  o.more.forEach(function(x){ c.push(row('·', esc(x))); });
  if(!c.length) return '';
  return '<div class="bk"><div class="bkh">'+
    '<span class="mk"><i class="gl gl-bk" aria-hidden="true"></i>结算</span>'+
    (o.kind?'<span class="ty">'+esc(o.kind)+'</span>':'')+'</div>'+
    '<div class="led">'+c.join('')+'</div></div>';
}

/* 🔴 楼层号—— `.blk` 里那个大编号。
   `getCurrentMessageId()` 给的是**聊天数组下标（0 起）**，人读的楼层从 1 起 ⇒ +1。
   补零成两位：`01` 比 `1` 更像"仪器读数"，且宽度不跳（原型就是这么定的）。
   ⚠ 写法跟原型那句 `('0'+si).slice(-2)` 不同 —— 那种写法到三位数会把 `100` 截成 `00`。
     原型里 `si` 是段内对白序号、够不到三位，所以没暴雷；楼层号够得到。 */
function floorNo(){
  var id=null;
  try{ id=(typeof getCurrentMessageId==='function')?getCurrentMessageId():null; }catch(e){}
  var n=(typeof id==='number'&&id>=0)?id+1:1;
  return (n<10?'0':'')+n;
}


/* ══════════════════════════════════════════════════════════════════════════
   ① 判定请求 · ② 交锋对抗 —— 并进生产（2026-09-23，v4.2.0）
   ──────────────────────────────────────────────────────────────────────────
   两块**源码**出处 ＝ 原型
     `备份与存档/归档/方案稿/_美化宿主原型/_废弃_两格式/_印_两格式.html`
     的渲染器（L397–678）；**身份色整套**（分配 ＋ ΔE）的源码出处 ＝
     `.../_废弃_三格式/` 那份的 `_印_判定战况.html` L536–673 ＋ L952–988。

   🔴 **三处与原型不同，都是刻意的：**

   (1) `S` / `L` → 改名 **`ICON_S` / `ICON_D`**。
       生产全库 `S` 有 60 处、`L` 有 25 处（2026-09-23 边界探针实测）
       ⇒ 照原型搬会**当场覆盖生产自己的变量**，而且不一定报错。
   (2) `ncScope()` **没搬** —— 它给探针挂的是原型页的类 `.p2`。
       生产里皮肤类落在 `document.body` 上（`apply()` 那句
       `document.body.className=[cur.sk,…]`），所以探针直接挂 `document.body`。
   (3) `screenNames()` **收窄了** —— 原型扫的是全屏 `.nm2`，而生产里 `.nm2` 是 0 处
       ⇒ 照搬会永远扫到空集，`ncAssign` 一个候选都找不到、
       **每个名字都"没分到"而屏幕上看不出任何异常**。
       现在只取**这两块自己产出的名字**（判定面板的主语/对象 ＋ 交锋的攻防双方）。

   🔴 **`nameOf` / `ncScope` / `resolveColor` / `hueOf` / `lum` / `contrast` / `L_in`
      没搬** —— 它们是原型页那 387 行**自检**的零件，而自检是**原型页的量尺**
      （`CLAUDE.md`：自写的检查器不能替代闸门）。生产是 iframe 里跑的东西，
      没有 `#ROOT`、没有 `<pre id="AUDIT">`。
      搬过来的只有 `ncAssign` **真正要用**的那三件：`toRGB` / `toLab` / `dE76`。

   ⚠ **继承来的假设**（不是本轮新增，但要知道）：`ncAssign` 靠
      `getComputedStyle` 把 `--nc` 解成真实色，所以**它跑的时候 CSS 必须已在**。
      生产本来就是这个假设 —— `render()`（L1700）无条件立即跑，
      而 `rule()` 也是当场 `getComputedStyle(document.body)` 读 `--sig`。
      CSS 若没到，症状是**所有名字同一个色、不报错**。
   ══════════════════════════════════════════════════════════════════════════ */

/* ── 一、徽记 ─────────────────────────────────────────────────────────────
   六枚，同一套笔画语言：24 格视框 / 1.8 描边 / 方头方角 / 零实心填充。
   🔴 每枚底下那行 `报告：…` 是**验收判据**：说不清它报告什么的，就不该在这儿
      （驾驶员 2026-09-22：「加动态icon很难吗？？？」—— 要的是**会说话的图**，
       不是会动的图）。⚠ 原来那枚「挡住」随【裁决驳回】一起撤了 ——
      撤掉而不是留着：这是「一类一块」的对应表，多一枚没有归属的图形，
      下一个人就得反过来猜它是给谁用的。 */
var ICON_S = "fill='none' stroke='#000' stroke-width='1.8'"
           + " stroke-linecap='square' stroke-linejoin='miter'";
var ICON_D = {
  /* ① 门槛 —— 两根立柱 ＋ 一道横杆。
     报告：**这条线立在这儿，等着被够到**（事前）。
     ⚠ 跟 `tgt` 那枚十字准星**必须分得开** —— 准星是"把一个值按到一条线上"（事后）。 */
  gate: "<path " + ICON_S + " d='M5.5 4 V20 M18.5 4 V20 M5.5 12 H18.5'/>",
  /* ② 对撞 —— 两个尖角面对面。报告：**两边各使各的劲，撞上了**。 */
  vs:   "<path " + ICON_S + " d='M3.5 5.5 L9.5 12 L3.5 18.5 M20.5 5.5 L14.5 12 L20.5 18.5'/>",
  /* ⑤ 骰 —— 一颗斜投影的方盒（三面，看得见顶）。
     报告：**这一颗就是从骰池里抓出来的那一颗实体**，不是"随机"这个概念。 */
  die:  "<path " + ICON_S + " d='M12 2.5 L20.5 7.2 V16.8 L12 21.5 L3.5 16.8 V7.2 Z"
      + " M12 2.5 V12 M12 12 L20.5 7.2 M12 12 L3.5 7.2'/>",
  /* ⑥ 准星 —— 四向刻度 ＋ 中心一个圈。报告：**把一个值按到那条线上**（事后）。 */
  tgt:  "<path " + ICON_S + " d='M12 2.5 V7 M12 17 V21.5 M2.5 12 H7 M17 12 H21.5"
      + " M8.5 12 A3.5 3.5 0 1 1 15.5 12 A3.5 3.5 0 1 1 8.5 12'/>",
  /* ⑦ 几份 —— 三根**等长**竖笔并排，底下**不画基线**。
     报告：**这一格不是一个数，是几份不同来路的东西并在一起**。
     ⚠ 故意等长：这里答的是"有几份"，不是"每份多少" —— 不等长就成柱状图了。 */
  mean: "<path " + ICON_S + " d='M7 6 V18 M12 6 V18 M17 6 V18'/>",
  /* ⑧ 合计 —— 等号。报告：**左边那些全归到这一个数上**。
     卡文原样就是 `D20 = 骰值 + 加值 = 总值`。 */
  sum:  "<path " + ICON_S + " d='M4 9.4 H20 M4 14.6 H20'/>"
};
var ICONS = {
  gate:{mv:0, layers:[['gate','']], act:'静止　报告：门槛是事先立的，它不动'},
  vs:  {mv:1, layers:[['vs','m-join']], act:'两侧合拢 → 碰上　报告：两边撞上了'},
  die: {mv:0, layers:[['die','']],  act:'静止　报告：抓出来的就是这一颗，它不会变'},
  tgt: {mv:0, layers:[['tgt','']],  act:'静止　报告：那条线是钉死的'},
  mean:{mv:0, layers:[['mean','']], act:'静止　报告：几份并排摆着，各自不动'},
  sum: {mv:0, layers:[['sum','']],  act:'静止　报告：已经归到这一个数上'}
};
var ICON_MISS = [];
function uri(body){
  return 'url("data:image/svg+xml,' + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>" + body + "</svg>") + '")';
}
function ic(k){
  /* 🔴 缺 key **不许抛** —— 抛一下整页就白，而且一声不吭。
     原型 2026-09-22 撞过：四枚行徽记当时没写，而 `row()` 早就在按 key 点它们
     ⇒ `ic()` 读到 `undefined.mv` 当场抛 ⇒ **整页空白、截图只剩 35KB**，
     而页面上没有一个字说为什么。
     ⇒ 缺 key 改成：记一笔 ＋ 画个虚线空框（`.ic-miss`），把名字留在 `data-k` 上。 */
  var s = ICONS[k];
  if (!s){ ICON_MISS.push(k); return '<span class="ic ic-miss" data-k="' + k + '"></span>'; }
  return '<span class="ic" data-mv="' + s.mv + '" data-k="' + k + '">'
    + s.layers.map(function(l){ return '<i class="' + l[1] + '" data-l="' + l[0] + '"></i>'; }).join('')
    + '</span>';
}
/* 图标是 `mask` 画的，`--g` 得逐枚写上去 —— 一次遍历所有带 `data-l` 的 `<i>`。 */
function fillMasks(scope){
  [].forEach.call((scope || document).querySelectorAll('.ic>i[data-l]'), function(el){
    el.style.setProperty('--g', uri(ICON_D[el.getAttribute('data-l')]));
  });
}

/* ── 二、身份色：名字 → 槽位 → `--nc` ─────────────────────────────────────
   ⚠ 生产原来**一个字都没有**（2026-09-23 探针：`hash32` / `nameStyle` /
     `ncAssign` / `.ncol` / `--nhk` / `--nlt` 各 0 处）。整套随这两块一起进来。 */
function hash32(s){
  var h = 2166136261;
  for (var i = 0; i < s.length; i++){
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}
/* `--nhk` ∈ 3..21（0/1/2 与 22/23 是告急色的禁区）· `--nlt` ∈ 0|1（明度档）
   🔴 上限是 **21 不是 23** —— 第一版放到 23，而槽 23 在 +345°，
     **离槽 0（+360°＝0°）只有 15°** ⇒ 禁区等于只挡了一边。
   ⇒ 可用区 ＝ **+45° … +315°**（19 格），禁区是以告急色相为中心、宽 90° 的一段。 */
var NC_S0 = 3, NC_SN = 21, NC_TIERS = 2;
/* 同屏两个名字的最小可接受 ΔE。
   🔴 2026-09-22 由 20 提到 30 —— **达标不等于分得开**：
     截图摊开看，ΔE 20.6 的那一对是 `卡厄斯|薇拉`，**两个都是绿的**。
     ΔE 20 在色度学上早过"两种颜色"的线，眼睛看到的却还是"一坨绿里深浅两档"。
     ⚠ 不改成"全局最优摊开"：那会让加第 6 个人时**前 5 个一起换色**
       （对局中途变色＝灾难）。贪心＋哈希偏好保的是**稳定**。 */
var NC_SEP = 30;
var NCMAP = {};           /* 名字 → "槽.档"，**这一屏**的分配结果 */
var NC_MISS = 0;          /* 没分到色、退回裸哈希的名字数（必须 0） */
var NC_LOG = {};          /* 每个名字分到了什么、离首选多远、跟已定色的最小 ΔE */

/* 在**指定皮肤作用域里**把「槽.档」解析成真实颜色。
   🔴 必须走这条链：`--nhk`/`--nlt` 写在元素上 → `.ncol` 自己那条 `--nc` 解析
      → `color`。**不能在本函数里另写一份 HSL 公式** —— 那样等于绕过被检验的对象，
      而且 `--nS`/`--nL0`/`--nstep` 是**每张皮不同**的，写死了就只对一张皮成立。 */
var _ncProbe = null;
function ncColorIn(sc, s, t){
  if (!_ncProbe){
    _ncProbe = document.createElement('span');
    _ncProbe.className = 'ncol';
    /* 🔴 **必须自己把 `color` 接上 `var(--nc)`。**
       `.ncol` 那条规则**只声明 `--nc`，不设 `color`** ——
       真正消费它的是 `.vs .hd b` / `.sb>i` / `[data-win]` 那几条。
       所以一个光秃秃的 `.ncol` 探针读回来的永远是**继承色**：38 个格子全返回同一个 rgb
       ⇒ 每一格 ΔE 都是 0 ⇒ `anyOk` 恒为 false ⇒ 回退到"第一个候选"，
       而**屏幕上看不出任何异常**。这条坑踩在 2026-09-22。 */
    _ncProbe.style.cssText = 'color:var(--nc);position:absolute;left:-9999px;top:0;'
      + 'width:4px;height:4px';
  }
  if (_ncProbe.parentNode !== sc) sc.appendChild(_ncProbe);
  _ncProbe.style.setProperty('--nhk', String(s));
  _ncProbe.style.setProperty('--nlt', String(t));
  return toRGB(getComputedStyle(_ncProbe).color);
}
/* 候选顺序：离首选槽**由近到远**（环上距离，最大 9）；同距先看首选档。
   顺序定死 ⇒ 同一个集合永远得到同一套色。 */
function ncCand(ps, pt){
  var out = [];
  for (var s = NC_S0; s <= NC_SN; s++){
    var d = Math.abs(s - ps);
    if (d > (NC_SN - NC_S0 + 1) / 2) d = (NC_SN - NC_S0 + 1) - d;
    out.push({s: s, t: pt, d: d, m: 0});
    out.push({s: s, t: 1 - pt, d: d, m: 1});
  }
  out.sort(function(a, b){ return (a.d - b.d) || (a.m - b.m) || (a.s - b.s); });
  return out;
}
/* 分配规则（**给定一份名字集合、完全确定**）：
     1. 名字**先排序** —— 结果只跟"这一屏有谁"有关，跟出场顺序无关
     2. 每个名字先试**自己哈希算出来的那格**（保住"名字自己决定颜色"的直觉）
     3. 那一格跟已定的色分不开 ⇒ 退到"离已定色都够远"的格里、**离首选格最近**的一个
   🔴 为什么要错开（自检⑩ 量出来的，不是看着别扭）：纯哈希在**同一屏 5 个名字**上，
      40 对里 **12 对基本同色**，其中两个名字拿到的 rgb **完全相同**。
      19 个槽看着多，但**随机撒 5 个点，最近的一对必然很近** —— 不是运气差，是必然。
   ⚠ 代价说清楚：同一屏里多一个名字，可能把别人的色挤走一格。换来的是"同屏一定分得开"。
   ⚠ 尺子跟自检同一把：**CIE ΔE76**。**不能用"槽距 ≥ N"这种便宜规则代替** ——
      实测相隔 30° 在同一档下值 ΔE 26，但只要另一个名字换一档明度，就能把它抵消回 14.6。
      槽距是"色相上的距离"，ΔE 才是"眼睛看到的距离"。 */
function ncAssign(sc, names){
  var uniq = [], seen = {};
  names.forEach(function(n){
    n = String(n == null ? '' : n).trim();
    if (n && !seen[n]){ seen[n] = 1; uniq.push(n); }
  });
  uniq.sort();
  var map = {}, used = {}, taken = [], log = {};
  uniq.forEach(function(nm){
    var h = hash32(nm), ps = NC_S0 + (h % (NC_SN - NC_S0 + 1)), pt = (h >>> 8) & 1;
    var ok = null, fb = null, fbMin = -1, anyOk = false;
    ncCand(ps, pt).forEach(function(c){
      var key = c.s + '.' + c.t;
      if (used[key]) return;
      var rgb = ncColorIn(sc, c.s, c.t);
      if (!rgb) return;
      var mn = 1e9;
      taken.forEach(function(q){ var d = dE76(rgb, q); if (d < mn) mn = d; });
      if (!taken.length) mn = 999;
      if (mn >= NC_SEP){ anyOk = true; if (!ok) ok = {c: c, rgb: rgb, mn: mn}; }
      if (mn > fbMin){ fbMin = mn; fb = {c: c, rgb: rgb, mn: mn}; }   /* 兜底：分不开就取最远的 */
    });
    var w = ok || fb;
    if (!w){ NC_MISS++; return; }
    used[w.c.s + '.' + w.c.t] = 1;
    taken.push(w.rgb);
    map[nm] = w.c.s + '.' + w.c.t;
    /* 诊断：`anyOk`＝存在满足隔离的格子（false ⇒ 这个集合在这张皮上根本做不到）·
       `mn`＝最终这一格跟已定色的最小 ΔE ·
       `off`＝离哈希首选槽挪了几格（0 ＝ 没被挤走） */
    log[nm] = {pref: ps + '.' + pt, pick: map[nm], mn: w.mn, anyOk: anyOk,
      off: Math.abs(w.c.s - ps) > 9 ? 19 - Math.abs(w.c.s - ps) : Math.abs(w.c.s - ps)};
  });
  NC_LOG = log;
  return map;
}
/* 🔴 返回的样式串必须挂在**带 `.ncol` 的同一个元素**上 —— `.ncol` 那条规则
   在这一层解析 `var(--nhk)`，换个元素就取不到。
   ⚠ 没分到的退回裸哈希（**保证名字一定有颜色**），并记一笔。 */
function nameStyle(nm){
  nm = String(nm == null ? '' : nm).trim();
  var k = NCMAP[nm];
  if (!k){                                   /* 没分到：退回裸哈希，**保证名字一定有颜色** */
    NC_MISS++;
    var h = hash32(nm);
    k = (NC_S0 + (h % 19)) + '.' + ((h >>> 8) & 1);
  }
  var p = k.split('.');
  return '--nhk:' + p[0] + ';--nlt:' + p[1];
}
/* 这一屏会出现的人 —— **只取这两块自己产出的名字**。
   🔴 原型那份扫的是全屏 `.nm2`；生产里 `.nm2` 是 0 处 ⇒ 照搬会永远扫到空集，
     `ncAssign` 一个候选都找不到、**每个名字都"没分到"而屏幕上看不出任何异常**。
   🔴 两块**共用同一份分配**：不然同一个人在两块里颜色不一样，比撞色还坏。 */
function screenNamesOf(msgs){
  var out = [];
  (msgs || []).forEach(function(m){
    (m.p || []).forEach(function(l){
      if (l[0] === 'q'){ out.push(l[1].who); }
      else if (l[0] === 'x'){ out.push(l[1].atk); out.push(l[1].def); }
    });
  });
  return out;
}

/* ── 色彩换算：sRGB → Lab → ΔE76 ─────────────────────────────────────────
   走的是标准 sRGB→XYZ(D65)→Lab。这里自己算是可以的：它是**换算**不是**测量**；
   真正的测量（把 `hsl()` 解成 rgb）仍然交给浏览器（`ncColorIn` 那条）。 */
function toRGB(s){
  var m = String(s).match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  var p = m[1].split(/[,/]/).map(function(x){ return parseFloat(x); });
  if (p.length > 3 && p[3] === 0) return null;               /* 全透明＝没量到 */
  return [p[0], p[1], p[2]];
}
function toLab(p){
  var f = p.map(function(v){ v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  var X = (f[0]*0.4124 + f[1]*0.3576 + f[2]*0.1805) / 0.95047,
      Y =  f[0]*0.2126 + f[1]*0.7152 + f[2]*0.0722,
      Z = (f[0]*0.0193 + f[1]*0.1192 + f[2]*0.9505) / 1.08883;
  var g = function(t){ return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; };
  X = g(X); Y = g(Y); Z = g(Z);
  return [116 * Y - 16, 500 * (X - Y), 200 * (Y - Z)];
}
function dE76(a, b){
  var A = toLab(a), B = toLab(b);
  return Math.sqrt(Math.pow(A[0]-B[0],2) + Math.pow(A[1]-B[1],2) + Math.pow(A[2]-B[2],2));
}

/* ── 三、结论带：`[梯子] [档位名] [→ 下一档] [比数] [判词]` ────────────────
   🔴 **这两块的结论不是二值，是一条四档梯子**（`D131` ④「统一」：
     ① ② 共用 `大成功 / 成功 / 失败 / 大失败`）。
     ⇒ 那个二值印章在这两块上**报不全**（它答不出"离下一档还有多远"）。
     ⚠ 但**这不是个仪表** —— 梯子报的是**离散的档位名**，一格一个名，
       没有连续量、没有刻度值。它答的是"现在站哪一档、下一档叫什么"。
     ⚠ 档位格**小圆点、不填大块**（驾驶员「大面积实心填充＝廉价」）。
   ⚠ 四条档位名跟生产 `TIER_TXT` 是**同一张表**，所以档位 → `data-tier`
     直接复用生产的 `tierOf()`（它会**先长后短**判：`大成功` 里含着 `成功`，
     先测短的会把大成功判成"成功"）。**不新开第二张表** ——
     两张表一旦不同步，**不报错、只是色不对**。 */
var GEARS = ['大成功', '成功', '失败', '大失败'];
/* 查得到就给出属性，查不到就一个字都不给。
   🔴 **不给 `data-tier` 的后果 ＝ 印章落回生产默认色（"成功"绿），一眼就是错的** ——
      这是**有意的**：**宁可错得显眼，也不许悄悄盖一个对的章。**
      （枚举值拼错不会报错，只会不生效 —— 这就是它阴的地方。） */
function tierAttr(gear){
  var t = tierOf(gear);
  return t ? ' data-tier="' + t + '"' : '';
}
function czStrip(g){
  var gears = g.gears || GEARS, n = gears.length;
  /* 🔴 `gi` 认不出来时**不给 `cur` 点、档位名印 `—`** —— 生产自己就是这么处理
     认不出的档位的（`esc(o.tierTxt||'—')`）。**不猜一个档顶上**。 */
  var gi = (g.gi >= 0 && g.gi < n) ? g.gi : -1;
  var lad = '';
  for (var i = 0; i < n; i++){
    lad += '<s class="' + (i === gi ? 'cur' : (gi >= 0 && i < gi ? 'on' : '')) + '"></s>';
  }
  var next = (gi >= 0 && gi + 1 < n) ? gears[gi + 1] : '';
  return '<div class="cz' + (g.win ? ' ncol' : '') + '"'
    + (g.win ? ' data-win="' + g.win.side + '" style="' + nameStyle(g.win.nm) + '"' : '') + '>'
    + '<span class="gr" title="' + esc(gears.join(' / ')) + '">' + lad + '</span>'
    + '<span class="tier">' + esc(gi >= 0 ? gears[gi] : '—') + '</span>'
    + (gi >= 0
        ? (next ? '<span class="nx"><i>→</i>下一档<b>' + esc(next) + '</b></span>'
                : '<span class="nx">到头了</span>')
        : '')
    + '<span class="cmp">' + (g.cmp || '') + '</span>'
    /* 🔴 **2026-09-25 驾驶员裁定「A」：档位认得出来时不再印 `.rs`。**
       `gi` 是 `GEARS.indexOf(verdict)`（L2056 / L2192）**精确串比**出来的 ——
       **不是** `tierOf()` 那个"先长后短"的判法（那个是给 `data-tier` 用的）。
       ⇒ `gi >= 0` **等价于**「`verdict` 逐字就是 `gears[gi]`」
       ⇒ 上面 `.tier` 印的 `gears[gi]` 和这里 `.rs` 印的 `verdict` 是**同一个词**
       ⇒ 所以这一支砍掉是**零信息损失** —— 不是"少印一处信息"，
         是"同一处信息印了两遍"。
       ⚠ **认不出来时（`gi < 0`）照旧印**：那时候 `.tier` 印的是 `—`，
         判词是档位的**唯一**出处，砍掉就真没了。
       ⚠ **`.rs` 还兼着一个活**：CSS L1676 那条 `margin-left:auto` 靠它把
         结论条右端顶开。所以这一支不印之后，**右端会空出来**。
         这是本裁定的既有代价、不是 bug —— 要改右端形态是另一件事，别顺手改。 */
    + (gi >= 0 ? '' : '<span class="rs">' + esc(g.verdict || '') + '</span>')
    + '</div>';
}

/* ── 四、小工具 ────────────────────────────────────────────────────────── */
/* 从一行里把**带符号的整数**按出现顺序取出来。
   ⚠ 先把 `D20` 这个**标签**摘掉 —— 不摘的话 `20` 会被当成第一个数据混进来。 */
function numsOf(s){
  var m = String(s).replace(/\bD\d+\b/gi, ' ').match(/[+-]?\d+/g) || [];
  return m.map(Number);
}
/* `+8` / `-2` 拆成（运算符, 数值）—— 卡里 `总修正[[加值]]`、`加值[[X]]` 都可能是负的。
   ⚠ 原型是 `mod.replace('+','')` 直接印，碰上负数会印成 `+ -2`。这里把号接过来。 */
/* ── 取值：**认标签，不认位置**（2026-09-26 v4.3.2）────────────────────────
   🔴 为什么要改：旧写法（`numsOf` 抓前三个数）在真机上把 ① 判定请求印成了
      「11 + 11 = 0」。模型原话是
        `> 投骰结果: 优势取最高 = 11。D20 = [11] + 总修正[0] = 最终值[11]`
      —— 它在规范写法**前面**多加了一句，行里就多出一个数 ⇒ 三个槽整体右移一格。
      **「取最高 / 取最低」是卡里的正式规则，不是模型乱写**（格式模板自己就写着
      「双方各取所需颗数，取最低/取最高后报出」）⇒ 认标签才治本。 */
function 取数(s, 标签){
  /* 标签后面第一个带符号整数。
     ⚠ `D20` 这种标签**自己带数字** ⇒ 正则必须先吃掉非数字，否则会把 `20` 当成值取走。
     方括号 / 全角括号 / 加号都吃掉 —— 模型实测会把占位符 `[[骰值]]` 写成 `[11]`。 */
  var m = String(s).match(new RegExp(标签 + '\\s*[^0-9+-]{0,12}?\\s*([+-]?\\d+)'));
  return m ? m[1] : '';
}
/* 一行里取「骰值 / 加值 / 总值」三段。
   ① 先按标签取；
   ② 标签认不全、且这行**恰好三个数** ⇒ 退回按位置 —— 三个数**就是**规范写法本身，
      此时位置读法可证正确；
   ③ 其余（多于三个数又认不出标签）⇒ **三段全留空**。
   🔴 ③ 这一支存在的唯一理由：**宁可空着，不许猜** —— L2008「不替它编值」在取值上的落实。 */
function 三段(s, 标){
  var a = 取数(s, 标[0]), b = 取数(s, 标[1]), c = 取数(s, 标[2]);
  if (a !== '' && b !== '' && c !== '') return [a, b, c];
  var v = numsOf(s);
  if (v.length === 3) return [String(v[0]), String(v[1]), String(v[2])];
  return ['', '', ''];
}
/* ── 关系符 ──────────────────────────────────────────────────────────────
   🔴 **必须是真关系** —— 这是 L1529 已经裁过的原则（一律印 `≥` 会造出
      「11 ≥ 20 · 失败」这种假命题）。③ 检定早改过来了，①② 一直写死 `>=` / `>`。
   ⚠ 极值（自然 20 / 自然 1）时**不印关系符** —— 那一掷没用上比较，
      印任何符号都是在说一件没发生的事。判据照抄 ③ 的 L1491。
   🔴 只返回 `czStrip` 那层 `.cmp` 的**内层内容**，不自己包 `.cmp`：
      CSS `.ck .cz>.cmp>em` 是**直接子代**选择器，自己再包一层样式会整个不生效。
      （③ 是自己拼 `<div class="cz">` 才敢自带 `.cmp`；①② 走 `czStrip`，结构不同。） */
function 关系符(T, D, 极){
  var t = parseFloat(T), d = parseFloat(D);
  if (!isFinite(t) || !isFinite(d)) return '';
  if (极) return '<b>' + esc(T) + '</b><em>对标</em><b>' + esc(D) + '</b>';
  var rel = (t > d) ? '&gt;' : ((t < d) ? '&lt;' : '=');
  return '<b>' + esc(T) + '</b><em class="' + (t >= d ? 'ge' : 'lt') + '">' + rel + '</em><b>' + esc(D) + '</b>';
}
function 是极值(骰){ var n = parseFloat(骰); return n === 20 || n === 1; }

function signOf(v, raw){
  var n = parseFloat(v);
  if (!isFinite(n)) return ['+', String(raw == null ? '' : raw).replace(/^\+/, '')];
  return [n < 0 ? '−' : '+', String(Math.abs(n))];
}

/* ══ ① 判定请求 —— **骰前的依据** ═════════════════════════════════════════
   文本格式出处 ＝ 卡 `254984 角色属性与检定总则` 五、2 标准日志格式：

     【判定请求 | 行动简述】
     > 角色: [角色名] | 轨道: 战斗/剧情 | 形式: 明骰/暗骰
     > 取用骰: 第 [n] 个 = [裸骰]
     > 目标难度 (DC): [DC数值] ([难度描述])
     > 属性与修正: [属性名]([调整值]) + 技能/装备修正([修正值]) [+ 裁量(优势·理由: …)]
     > 投骰结果: D20 = [[骰值]] + 总修正[[加值]] = 最终值[[总值]]
     > 判定结论: 【大成功 / 成功 / 失败 / 大失败】

   🔴 **续行是 `> ` 引用块，不是缩进** —— 跟〈检定_结构化记录〉那份（缩进两格）
      **不是同一个形状**。方案 §4.5 原写「照检定那个收集器同形加两条」，
     干跑时才发现照那个 `/^[ \t]+\S/` 写会**一行都收不到**。
   ⚠ 各项**按标签认，不按行号认**：模型调换顺序、多写一行，都不该让整块塌掉。
   ⚠ 认不出的项**就空着**，由渲染层决定是"整行不出"还是"印 —"。
     **不替它编值** —— 编出来的数无处可查（卡里〈合理性审查〉那条的同一条纪律）。 */
function pick(rec, re){
  for (var i = 1; i < rec.length; i++){
    var m = String(rec[i]).replace(/^\s*>\s?/, '').match(re);
    if (m) return m;
  }
  return null;
}
function parseReq(rec){
  var o = {act:'', who:'', track:'', form:'', die:{no:'', raw:'', face:20},
           dc:'', dcName:'', src:[], roll:{d:'', mod:'', tot:''},
           verdict:'', gears:GEARS, gi:-1};
  o.act = String(rec[0] || '').replace(/^【判定请求/, '').replace(/】\s*$/, '')
    .replace(/^\s*\|\s*/, '').trim();
  var m;
  m = pick(rec, /^角色\s*[:：]\s*([\s\S]*)$/);
  if (m){
    /* `角色: 薇拉 | 轨道: 战斗 | 形式: 明骰` —— 竖线切段，每段再 `键: 值`。
       🔴 **第一段是例外**：上面那条正则的 `^角色\s*[:：]` 已经把**键**吃掉了，
       切出来的第一段**只剩值** ⇒ 它永远就是 `o.who`，不能再拿 `k === '角色'` 去认。
       ⚠ 2026-09-23 预览页抓到的真 bug：照「每段都按键认」写，
       `k === '角色'` 永不成立 ⇒ `o.who` **恒为空** ⇒ ① 面板 ① 后面那个名字是空的，
       而且 `ncAssign` 收不到这个名字 ⇒ 面板三处身份色**全掉裸哈希兜底**（NC_MISS=3）。
       ⚠ 原型里这段是**写死的样例对象**（`who:'薇拉'`），从没跑过真解析 ——
       这个错是移植成真解析器时带进来的，在原型里看不见。 */
    var segs = m[1].split('|');
    o.who = (segs[0] || '').trim();
    for (var si = 1; si < segs.length; si++){
      var kv = segs[si].split(/[:：]/);
      if (kv.length < 2) continue;
      var k = kv[0].trim(), v = kv.slice(1).join(':').trim();
      if (k === '轨道') o.track = v;
      else if (k === '形式') o.form = v;
    }
  }
  m = pick(rec, /^取用骰\s*[:：]\s*第\s*(\d+)\s*个\s*=\s*([+-]?\d+)/);
  if (m){ o.die.no = m[1]; o.die.raw = m[2]; }
  m = pick(rec, /^目标难度[^:：]*[:：]\s*([+-]?\d+)\s*(?:[（(]\s*([^）)]*?)\s*[)）])?/);
  if (m){ o.dc = m[1]; o.dcName = m[2] || ''; }
  m = pick(rec, /^属性与修正\s*[:：]\s*([\s\S]*)$/);
  if (m){
    var rhs = m[1], re = /([^()+（）]*?)\s*[（(]([^）)]*)[)）]/g, g;
    while ((g = re.exec(rhs))){
      var nm = g[1].trim();
      o.src.push({name:nm, val:g[2].trim(), dis:/裁量/.test(nm)});
    }
    /* 一项都拆不出来（模型没按 `名字(值)` 写）⇒ **原样印**，不编名字。
       跟生产 `termsHTML` 那条同一条纪律：「原样印，绝不替它编名字」。 */
    if (!o.src.length && rhs.trim()) o.src.push({name:'', val:rhs.trim(), dis:false});
  }
  m = pick(rec, /^投骰结果\s*[:：]\s*([\s\S]*)$/);
  if (m){
    /* 标签出处 ＝ 卡 `254984` 五、2：D20 = [骰值] + 总修正[加值] = 最终值[总值]。
       ① 的三个标签卡里本来就有 ⇒ ① 不需要改卡。 */
    var v = 三段(m[1], ['D20', '总修正', '最终值']);
    o.roll.d = v[0]; o.roll.mod = v[1]; o.roll.tot = v[2];
  }
  m = pick(rec, /^判定结论\s*[:：]\s*([\s\S]*)$/);
  if (m){
    var g2 = m[1].match(/【([^】]+)】/);
    o.verdict = (g2 ? g2[1] : m[1]).trim();
    o.gi = GEARS.indexOf(o.verdict);
  }
  return o;
}
/* 账本正文。**借生产的 `.rw/.rk/.ld/.rv/.vb`，一个字不改。**
   **不给条的行**：目标难度（它没有分母 —— DC 12 是"一条线"，不是"占多少"）、
   属性与修正（不是数，是三个来源）。
   **给条的行**：取用骰（÷骰面）、最终值（÷它自己 ⇒ 满格，它就是合计）。
   ⚠ 达标那根条**在这儿不给** —— 那正是「检定」那块面板的活（对标行），
     这块重复一遍就成了同一个数说两遍。
   ⚠ `face:20` 的出处 ＝ 卡三、2 核心公式 `检定总值 = D20骰值 + …`
     ＋ 三、4「骰值来源: 一律取自本轮检定骰池条目」（骰池值域 1~20）。 */
function reqHTML(c){
  var out = row('申报', '<b style="color:var(--ink);font-weight:700">' + esc(c.who) + '</b>'
    + '<span class="sep">·</span><span style="color:var(--pdim)">' + esc(c.track) + '</span>'
    + '<span class="sep">·</span><span style="color:var(--pdim)">' + esc(c.form) + '</span>',
    'fw', 'gate');
  out += row('取用骰', '<span class="no">' + esc(c.die.no) + '</span>'
    + '<b class="die">' + esc(c.die.raw) + '</b>', '', 'die',
    parseFloat(c.die.raw) / c.die.face);
  out += row('目标难度', '<b class="tg">' + esc(c.dc) + '</b>'
    + '<span class="kk">' + esc(c.dcName) + '</span>', 'fw', 'tgt');
  /* 加值拆三个具名来源 —— **这块面板的全部意义在这一行**：
     检定那边只给一个 `+8`，这里说得出「+3 感知 / +4 技能 / +1 裁量·居高临下」。 */
  var src = c.src.map(function(s){
    return '<span class="src' + (s.dis ? ' dis' : '') + '">'
      + '<b>' + esc(s.val) + '</b>'
      + (s.name ? '<em>(</em><i>' + esc(s.name) + '</i><em>)</em>' : '')
      + '</span>';
  }).join('<em class="op">+</em>');
  out += row('属性与修正', src, 'fw r-sum', 'mean');
  var so = signOf(c.roll.mod, c.roll.mod);
  out += row('投骰结果', '<span class="ex"><b class="die">' + esc(c.roll.d) + '</b></span>'
    + '<em class="op">+</em><span class="tm"><b>' + esc(so[1]) + '</b></span>'
    + '<em class="op">=</em><b class="tot">' + esc(c.roll.tot) + '</b>',
    'r-chain', 'sum', 1);
  return out;
}
function reqPane(c){
  /* 🔴 **2026-09-25 驾驶员裁「折」—— 原来硬写的 `open` 撤掉。**
     依据是量出来的、不是感觉：560 宽下这一屏 **正文 ≈240px vs 数据框 963px**
     （战况 144 ＋ ① 365 ＋ ② 299 ＋ ② 299），一层楼 1567px，正文被压到底下。
     折起来 ⇒ 877px，省 690（44%）。
     ⚠ **与 ③ 检定同一条口径**（驾驶员 2026-09-21：「检定的话是可以点击查看结果的，
       先折叠，然后出来」）—— 现在三块面板一致：**折起来看身份，点开看账本**。
     ⚠ **动效一行不用加** —— 入场那批的闸已是 `.play .ck[open]`（2026-09-25 修），
       `[open]` 跟着开合变 ⇒ 折着时 `animation-name:none`，点开才跑。白捡一个展开动效。
     ⚠ 折起来**不丢"结果"** —— 签带＋`.hd2` 已经写着 谁 · 档位 · DC · 行动 · 最终值22；
       丢的是**推导**（属性与修正那三个具名来源），那正是"点开才给"的东西。 */
  return '<details class="ck" data-stage="before"' + tierAttr(c.gears[c.gi]) + '>'
    + '<summary class="sh"><div class="ch">'
      + '<span class="mic">' + ic('gate') + '判定请求'
        + '<em style="font-style:normal;opacity:.6">REQUEST</em></span>'
      + '<span class="ty">' + esc(c.act) + '</span>'
      + '<span class="fo">骰前</span>'
      + '<span class="bdg ncol" style="' + nameStyle(c.who) + '"><i>最终值</i><b>'
        + esc(c.roll.tot) + '</b></span>'
    + '</div>'
    + '<div class="hd2">'
      + '<i>①</i><b class="nm2 ncol" style="' + nameStyle(c.who) + '">' + esc(c.who) + '</b>'
      + '<span class="act"><u>' + esc(c.dcName) + '</u><em>·</em><u>DC</u><b>'
        + esc(c.dc) + '</b></span>'
      + '<span class="arw">→</span><span style="color:var(--pdim)">' + esc(c.act) + '</span>'
    + '</div></summary>'
    + '<div class="led ncol" style="' + nameStyle(c.who) + '">' + reqHTML(c) + '</div>'
    + czStrip({gears:c.gears, gi:c.gi,
        cmp: 关系符(c.roll.tot, c.dc, 是极值(c.roll.d)),
        verdict:c.verdict})
    + '</details>';
}

/* ══ ② 交锋对抗 —— 两块里唯一"两边都有人"的一块 ═════════════════════════
   文本格式出处 ＝ 同一节（卡 `254984` 五、2）：

     【交锋对抗 | 攻方名 vs 防方名】
     > 相容性校验: 【逻辑成立 / 逻辑失效】 ([简述])
     > 攻方手段: [技能名称] | 防方手段: [防御方式]
     > 取用骰: 第 [n] 个 = [裸骰]（双方各取所需颗数，取最低/取最高后报出）
     > 攻方检定: D20[[骰值]] + 加值[[X]] = [[攻方总值]]
     > 防方检定: D20[[骰值]] + 加值[[Y]] = [[防方总值]]
     > 对抗结论: 【大成功 / 成功 / 失败 / 大失败】
     > 结算状态: 生命扣除 [X] | 理智/人性扣除 [Y] | 附加状态: [状态描述]

   🔴 两条总值**共用一把尺**（分母取两边大的那个）—— 各量各的会让两根都满，
      那就什么也没报。 */
function parseClash(rec){
  var o = {atk:'', def:'', gate:'', gateNote:'', die:{no:'', raw:''},
           a:{move:'', d:'', mod:'', tot:''},
           b:{move:'', d:'', mod:'', tot:''},
           chg:[], verdict:'', gears:GEARS, gi:-1};
  var head = String(rec[0] || '').replace(/^【交锋对抗/, '').replace(/】\s*$/, '')
    .replace(/^\s*\|\s*/, '').trim();
  var vs = head.split(/\s+vs\s+/i);
  o.atk = (vs[0] || '').trim();
  o.def = (vs[1] || '').trim();
  var m;
  m = pick(rec, /^相容性校验\s*[:：]\s*([\s\S]*)$/);
  if (m){
    var g = m[1].match(/【([^】]+)】/);
    o.gate = (g ? g[1] : m[1]).trim();
    var n = m[1].match(/[（(]\s*([^）)]*?)\s*[)）]/);
    o.gateNote = n ? n[1].trim() : '';
    /* 闸门「通/断」由**卡自己的两个词**决定 —— 不另立判据。
       ⚠ 认不出就**不当它通**：`data-gate` 不给，左缘杆就不会长出来，
         而 `.gate>b` 保持生产默认色。**宁可不画，不许画一个假的"通"。** */
    o.gateOn = /成立/.test(o.gate) ? true : (/失效/.test(o.gate) ? false : null);
  }
  m = pick(rec, /^攻方手段\s*[:：]\s*([\s\S]*)$/);
  if (m){
    var seg = m[1].split('|');
    o.a.move = seg[0].trim();
    var d2 = (seg[1] || '').replace(/^\s*防方手段\s*[:：]\s*/, '').trim();
    o.b.move = d2;
  }
  /* 有的模型会另起一行写防方手段 —— 两条路都收。 */
  m = pick(rec, /^防方手段\s*[:：]\s*([\s\S]*)$/);
  if (m) o.b.move = m[1].trim();
  m = pick(rec, /^取用骰\s*[:：]\s*第\s*(\d+)\s*个\s*=\s*([+-]?\d+)/);
  if (m){ o.die.no = m[1]; o.die.raw = m[2]; }
  m = pick(rec, /^攻方检定\s*[:：]\s*([\s\S]*)$/);
  /* ② 的 `最终值` 标签是 2026-09-26 往卡里新补的（原先两个总值裸奔）。
     补了之后：新格式走标签 ✅ / 老格式（恰好三数）走兜底 ✅ /
     老格式**且带优势前缀**（四数）⇒ 留空 —— 诚实的空白，不是错数。 */
  if (m){ var va = 三段(m[1], ['D20', '加值', '最终值']); o.a.d = va[0]; o.a.mod = va[1]; o.a.tot = va[2]; }
  m = pick(rec, /^防方检定\s*[:：]\s*([\s\S]*)$/);
  if (m){ var vb = 三段(m[1], ['D20', '加值', '最终值']); o.b.d = vb[0]; o.b.mod = vb[1]; o.b.tot = vb[2]; }
  m = pick(rec, /^结算状态\s*[:：]\s*([\s\S]*)$/);
  if (m){
    m[1].split('|').forEach(function(seg){
      var kv = seg.split(/[:：]/);
      if (kv.length < 2) return;
      var k = kv[0].trim(), v = kv.slice(1).join(':').trim();
      if (v) o.chg.push([k, v]);
    });
  }
  m = pick(rec, /^对抗结论\s*[:：]\s*([\s\S]*)$/);
  if (m){
    var g3 = m[1].match(/【([^】]+)】/);
    o.verdict = (g3 ? g3[1] : m[1]).trim();
    o.gi = GEARS.indexOf(o.verdict);
  }
  return o;
}
/* 🔴 两条总值**共用一把尺**（分母取两边大的那个）。 */
function clashHTML(c){
  var hi = Math.max(parseFloat(c.a.tot), parseFloat(c.b.tot));
  function side(s, cls, nm){
    var v = hi ? parseFloat(s.tot) / hi : 0;
    var so = signOf(s.mod, s.mod);
    return '<div class="sd ' + cls + ' ncol" style="' + nameStyle(nm) + '">'
      + '<span class="hd"><b>' + esc(nm) + '</b>'
        /* 🔴 这里原本是 `'<u>' + esc(s.way) + '</u><s>' + esc(s.move) + '</s>'` ——
           **2026-09-23 驾驶员裁「裁掉」**。理由：`way`（手段类别）**卡格式里没有出处**
           （`> 攻方手段: [技能名称]` 只有名字），`parseClash` 从不给它赋值
           ⇒ `<u>` 恒空，可它是 `.hd`（`display:flex;gap:7px`）的**一个 flex 子项**，
           照样吃间隙 ⇒ 实测名字和手段之间是 **14px 而不是 7px**（量出来的：`U(0px)`）。
           ⚠ 跟 `kc` 判空、`who` 解析同源 —— **原型 fixture 有的字段，真卡格式里没有**。 */
        + '<s>' + esc(s.move) + '</s></span>'
      + '<span class="cl"><em>D20</em><b>' + esc(s.d) + '</b><em>' + so[0] + '</em><b>'
        + esc(so[1]) + '</b><em>=</em><b class="v">' + esc(s.tot) + '</b></span>'
      + '<span class="sb"><i style="--v:' + v.toFixed(3) + '"></i></span>'
      + '</div>';
  }
  return '<div class="gate"><b>' + esc(c.gate) + '</b><u>' + esc(c.gateNote) + '</u></div>'
    + '<div class="vs">' + side(c.a, 'l', c.atk) + '<div class="mid">对</div>'
      + side(c.b, 'r', c.def) + '</div>'
    + '<div class="chg">' + c.chg.map(function(t){
        var nil = /^[—\-–]$/.test(t[1]);
        return '<span' + (nil ? ' class="nil"' : '') + '><i>' + esc(t[0]) + '</i>'
          + '<b>' + esc(t[1]) + '</b></span>'; }).join('') + '</div>';
}
/* ── ② 谁赢了 ──────────────────────────────────────────────────────────
   🔴 **照卡〈角色属性与检定总则〉四、2 的判序现算，不拿档位名反推** ——
     档位名是**结论**、判序是**依据**，两个都印在这块面板上，让它们互相印证。
     卡文原话：「先判自然20与自然1，再判总值。二者无视对抗结果，压过总值比较。」
     ＋「【成功】攻方总值 ≥ 防方总值 / 【失败】攻方总值 < 防方总值」。
   🔴 **这个函数第一版是错的，全过程记下来免得再犯**：第一版按**档位号**猜赢家
     （`gi === 0` ⇒ 攻方，否则防方）。危险在哪儿：那两个数就印在这块面板右边，
     **色和它右边那行数随时可能互相打脸，而且不报错**。
   ⚠ 认不出的情况 ⇒ 返回 `null`，由 `clashPane` 决定**不染色**（走生产默认）
     —— 不猜。 */
function clashWin(c){
  var d = parseFloat(c.die.raw);
  if (d === 20) return {side:'atk', nm:c.atk};   /* 大成功：自然20，无视对抗结果 */
  if (d === 1)  return {side:'def', nm:c.def};   /* 大失败：自然1，攻方败 */
  var a = parseFloat(c.a.tot), b = parseFloat(c.b.tot);
  if (!isFinite(a) || !isFinite(b)) return null;
  return a >= b ? {side:'atk', nm:c.atk} : {side:'def', nm:c.def};
}
function clashPane(c){
  var w = clashWin(c);
  var a = parseFloat(c.a.tot), b = parseFloat(c.b.tot);
  var diff = (isFinite(a) && isFinite(b)) ? (a - b) : '';
  var so = signOf(diff, diff);
  /* 🔴 **不给 `data-tier`** —— 生产那套 `--ok`/`--bad` 染的是**这一掷的成/败**。
     ② 要报的是**谁赢了那两个数** —— 两边的总值就印在它下面，色必须跟着它们走。
     ⇒ 走 `--nc`，按**赢那一方**的身份色染（驾驶员 2026-09-22：「交锋按照攻防双色」）。
     ⚠ 不给 `data-tier` 的代价：生产的 `.ck .cz .tier` **默认就是 `--oktx`/`--okbg`**
       ⇒ 不管谁赢，结论印章都盖成"成功绿"。**这是个假话。**
       新增的那条 `.ck .cz[data-win] .tier` 就是来接这个位置的。
     ⚠ `w` 为 null（认不出赢家）⇒ **整块不染**，让「假话绿」露出来 —— 有意的。 */
  /* 🔴 **2026-09-25 驾驶员裁「折」** —— 同 ①，撤掉硬写的 `open`（理由与量值见 `reqPane`）。
     ⚠ 折起来仍看得到**这一击的结论**：签带上「差 ±n」徽记按赢家身份色染（`D130` ①），
       两边名字与手段、取用骰也都在。丢的是**推演**（相容性校验闸门 · 两根数值条 ·
       结算状态那三格）—— 那些是"要查的时候点开"的东西。 */
  return '<details class="ck"'
    + (c.gateOn === false ? ' data-gate="off"' : (c.gateOn === true ? ' data-gate="on"' : '')) + '>'
    + '<summary class="sh"><div class="ch">'
      + '<span class="mic">' + ic('vs') + '交锋对抗'
        + '<em style="font-style:normal;opacity:.6">CLASH</em></span>'
      + '<span class="ty">' + esc(c.a.move) + ' × ' + esc(c.b.move) + '</span>'
      + '<span class="fo">战斗</span>'
      /* 「差」这枚徽记说的是**谁赢了多少** ⇒ 它跟着赢家染色，不跟着攻方。 */
      + '<span class="bdg ncol"' + (w ? ' data-win="' + w.side + '"' : '')
        + ' style="' + nameStyle(w ? w.nm : c.atk) + '"><i>差</i><b>'
        + (diff === '' ? '—' : so[0] + so[1]) + '</b></span>'
    + '</div>'
    + '<div class="hd2">'
      + '<i>②</i><b class="nm2 ncol" style="' + nameStyle(c.atk) + '">' + esc(c.atk) + '</b>'
      + '<span class="arw">对</span>'
      + '<b class="nm2 ncol" style="' + nameStyle(c.def) + '">' + esc(c.def) + '</b>'
      + '<span class="act"><u>取用骰</u><b>' + esc(c.die.no) + ' ' + esc(c.die.raw) + '</b></span>'
    + '</div></summary>'
    /* ⚠ 这块的账本**不给单方身份色** —— 交锋是**两边都有人的唯一一块**，
       挂 `ncol` 等于说"这块属于攻方"。里面每一处 `--nc` 消费者
       （`.vs .hd b` / `.sb>i`）都在 `.sd` 里自带身份色，外层这个只是兜底。 */
    + '<div class="led">' + clashHTML(c) + '</div>'
    + czStrip({gears:c.gears, gi:c.gi, win:w,
        cmp: 关系符(c.a.tot, c.b.tot, 是极值(c.a.d) || 是极值(c.b.d)),
        verdict:c.verdict})
    + '</details>';
}


var MSG=[parseBody(readBody(), floorNo())];
/* 🔴 上一回合的战况 —— **只在开场读一次**，不是每帧读。
   它唯一的用途是让 HP 刻度"从上一回合的格数走到这一回合"（见 `poolCell` 的 `prev`）。
   ⚠ 拿不到就是 `null`，刻度静止；**不报错、不提示、不假装有**。 */
var PREV=prevBattle();

function render(){
  document.getElementById('chat').innerHTML = MSG.map(function(m){
    var si=0;                       /* 段内第**几句对白** —— 变体 2 的编号用它（`01`/`02`…）
                                       🔴 `si++` **只能在对白分支里加**。
                                          第一版写在外面（每行都加），结果叙述行也占号 ——
                                          第 1 段显示成 `02` / `04`（1 和 3 是叙述行，没有框可挂），
                                          读起来像"编号漏了"，其实是"号被看不见的行吃掉了"。
                                          ⚠ 编号是**给说话框用的** ⇒ 只数说话框。 */
    /* 🔴 **战况块必须先画，`body` 才能画。**
       检定面板首行那个行动次序号查的是 `ORDMAP`，而 `ORDMAP` 是 `battleHTML` 建的
       ⇒ 上一版把它写在 `return` 里（在 `body` **之后**才求值），
         `checkHTML` 拿到的会是一张**空表**：号全部不出，而且**不报错**。
       ⚠ 这类"顺序错了但结果只是少个装饰"的错最阴 —— 面板照样出、图照样好看。
         ⇒ 一条纪律：**建索引的调用，永远排在读索引的调用前面。** */
    var bsH=battleHTML(m.battle, PREV);
    var body=m.p.map(function(l){
      /* 🔴 说话框。`.av` 带 `aria-hidden` —— 它**是空的**，
         对读屏器报一个"图片"只会制造噪声；它是纯粹的空间占位（给将来的头像留的）。
         ⚠ `.idx` 常驻在 DOM 里，只有变体 2 显示它（另外两套 `display:none`）——
           这样三套变体共用一份结构，落卡时换 `<style>` 就行，不用改正文。
         ⚠ 编号补零成两位：`01` 比 `1` 更像"仪器读数"，且宽度不跳。 */
      /* 🔴 正文是**模型输出**，一律先过 `inline()`（＝ 转义 ＋ 只认 `**`）再进 DOM。
         `m.no` / `m.who` 虽然是我们自己算的，也照过一遍 —— 转义是幂等的，
         少一处"这处安全所以不用"，就少一条以后被改坏的路。 */
      if(l[0]==='k') return checkHTML(l[1]);      /* 检定记录 —— 面板，不是段落 */
      if(l[0]==='q') return reqPane(l[1]);       /* ① 判定请求 —— 面板，不是段落 */
      if(l[0]==='x') return clashPane(l[1]);     /* ② 交锋对抗 —— 面板，不是段落 */
      if(l[0]!=='s') return '<p class="tx">'+inline(l[1])+'</p>';
      si++;
      return '<p class="tx say"><span class="mk"></span>'+
        '<span class="av" aria-hidden="true"></span>'+
        '<span class="idx">'+('0'+si).slice(-2)+'</span>'+
        '<span class="nm">'+inline(l[1])+'</span>'+
        '<span class="qt">「'+inline(l[2])+'」</span></p>';
    }).join('');
    var lines=m.p.map(function(l){return l[0]});
    /* 🔴 战况块排在 `.yh` **前面** —— 卡里〈正文_输出格式〉规定的顺序是
       「战况块在 `<narrative>` 之前」，`readBody()` 也是按那个顺序拼的。
       ⚠ 它在 `.yh`（那条带大编号与五线谱的正文块）**外面**：
         卡里明说战况块「不在战斗里不出」，它是**这一回合的仪表读数**，
         不是正文的一部分 ⇒ 不跟正文共用那个编号头。 */
    /* 🔴 结算块排在**最后** —— 顺序 ＝ 卡里〈正文_输出格式〉的顺序：战况 → 正文 → 收尾。
       ⚠ 它跟战况块一样在 `.yh` **外面**：那是"这一场仗的账"，不是正文的一段。 */
    return bsH+
      '<div class="yh"><div class="blk"><i>'+esc(m.no)+'</i></div>'+
      '<div class="top"><span class="meta">'+esc(m.who)+'</span>'+
      '<svg class="rule" viewBox="0 0 600 11" preserveAspectRatio="none" data-lines="'+
        lines.join('')+'"></svg></div>'+body+'</div>'+
      closureHTML(m.closure);
  }).join('');
}
/* 🔴 `render()` 的调用点**不在这儿** —— 它挪进 `apply()` 了（见那边注释）。
   理由：面板里 ① ② 两块的**身份色要读当前这张皮的参数**，而皮是 `apply()` 挂上去的。
   ⇒ 「画面板」必须在挂皮之后，而且**换皮要重画**。跟 `.rule` 那趟同一条道理。 */

function rule(svg){
  var L=(svg.dataset.lines||'').split(''), W=600, H=11, S=[], n=L.length||1, step=W/n;
  var cs=getComputedStyle(document.body);
  var sig=cs.getPropertyValue('--sig').trim()||'#000';
  var ink=cs.getPropertyValue('--ink').trim()||'#000';
  /* 🔴 五线谱（`--staff:1`，只有丁·尼尔打开）。
     出处 ＝ PlatinumGames 开发博客：为免"systematic and sterile"变成寡淡，
     特意加了一条**乐谱母题** —— 五线谱 / 低音谱号 / **双小节线** / 冒号。
     （博客原话点名不是"流动的高音谱号"，是**谱线、低音谱号、双小节线、冒号**这四样。）

     ⚠ **为什么必须同时把 `.rule` 加高**：SVG 的 viewBox 是 `0 0 600 11`，
        CSS 高 11px。5 条线塞进 11px ⇒ 间距 2.5px，
        **1x 下会糊成一条灰带、根本读不出是五条**。
        `审美.md` §0.2 那条判据管的就是这个：「**一个元素如果它的存在感小于
        "读者能注意到"的阈值，它就不是一个设计决定，是一个 bug**」。
        ⇒ 丁档下 `.rule` 高度改 26px（`body.sk-nier .top .rule`），间距变 6.5px。
        `preserveAspectRatio="none"` 会把 11 个单位等比拉满 26px，
        而 `vector-effect:non-scaling-stroke` 保证线宽**还是 1px**（不会被拉成 2.4px）。 */
  var style=cs.getPropertyValue('--rule').trim()||'line';
  /* 一条极细线的构造器 —— 四种画法共用，省得每次都把 vector-effect 写漏。
     ⚠ `vector-effect="non-scaling-stroke"` 是**必须的**：`preserveAspectRatio="none"`
       会把坐标系纵向拉伸（丁档 11→26px），没有它线宽会被一起拉粗。 */
  var hair=function(x1,y1,x2,y2,o,w){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+
    '" stroke="'+ink+'" stroke-width="'+(w||1)+'" opacity="'+o+'" vector-effect="non-scaling-stroke"/>'; };
  if(style==='staff'){
    for(var k=0;k<5;k++){
      var y=(0.5+k*2.5).toFixed(2);
      /* 中间那条（第三线）稍亮一点 —— 谱表的中线，读谱的人先看它 */
      S.push('<line x1="0" y1="'+y+'" x2="'+W+'" y2="'+y+'" stroke="'+ink+
             '" stroke-width="1" opacity="'+(k===2?'.30':'.17')+'" vector-effect="non-scaling-stroke"/>');
    }
    /* **双小节线**：两端各两条竖线，间距 3 个单位（拉伸后 ≈7px）—— 这是博客点名的那一样 */
    var bar=function(x){ return '<line x1="'+x+'" y1="0.4" x2="'+x+'" y2="'+(H-0.4)+
      '" stroke="'+ink+'" stroke-width="1" opacity=".30" vector-effect="non-scaling-stroke"/>'; };
    S.push(bar(0.5)+bar(3.5)+bar(W-3.5)+bar(W-0.5));
  } else if(style==='barcode'){
    /* ── 甲 · 纸：条形码（第一参照 045）────────────────────────────────
       基线照旧，**右端**接一截疏密不等的竖条。放右端不放左端，是因为左边
       紧挨着「灰港 · 薇拉 / 卡厄斯」那行小字，再堆竖条会糊成一片。
       ⚠ 条宽只有 1/2/3 三种值 —— 全用随机宽度会读成"噪点"，
         三种宽度来回切才读得出"这是编码"。 */
    S.push(hair(0,H-1,W,H-1,'.20'));
    var bc=[2,1,1,3,1,2,1,1,3,2,1,1], bx=W-3, bi;
    for(bi=bc.length-1;bi>=0;bi--){
      bx-=bc[bi];
      S.push('<rect x="'+bx.toFixed(1)+'" y="1.5" width="'+bc[bi]+'" height="'+(H-3.5)+
             '" fill="'+ink+'" opacity=".34"/>');
      bx-=2;
    }
  } else if(style==='tick'){
    /* ── 乙 · 霜：坐标刻度基线（第一参照「海底谈」页）──────────────────
       每 12 个单位一根短刻度，每 5 根一根长的 —— 长短交替才有"尺"的读法，
       全一样长会读成"梳子"。上沿再给一条极淡的平行线，把刻度框成一条带。 */
    S.push(hair(0,H-1,W,H-1,'.20'));
    S.push(hair(0,2,W,2,'.10'));
    for(var tx=0;tx<=W;tx+=12){
      var major=((tx/12)%5===0);
      S.push(hair(tx,H-1,tx,H-1-(major?8:3.5), major?'.42':'.20'));
    }
  } else if(style==='dot'){
    /* ── 丙 · 蚀：星点线（§7.2 孤星金线星图的星点）────────────────────
       只放点、**不放基线** —— 放了基线就跟甲/乙的"线"读成一类了。
       2×2 的方点而不是圆点：圆点在 1x 下会糊成一个模糊的团，
       方点在小尺寸下边界清楚，和这套「锐角几何」的语法一致（§2.0 ④）。 */
    for(var dx=4;dx<W;dx+=13){
      S.push('<rect x="'+dx.toFixed(1)+'" y="'+(H/2-1)+'" width="2" height="2" fill="'+ink+
             '" opacity=".32"/>');
    }
  } else {
    S.push('<line x1="0" y1="'+(H-1)+'" x2="'+W+'" y2="'+(H-1)+'" stroke="'+ink+
           '" stroke-width="1" opacity=".22" vector-effect="non-scaling-stroke"/>');
  }
  var cur=-1;
  for(var i=0;i<n;i++) if(L[i]==='s'&&cur<0) cur=i*step+1.5;
  if(cur>=0) S.push('<rect x="'+cur.toFixed(1)+'" y="0" width="6" height="'+H+'" fill="'+sig+'"/>');
  svg.innerHTML=S.join('');
}
document.querySelectorAll('.rule').forEach(rule);

/* ── 标定工具条（`.bar`）—— 🔴 **默认不建，卡里永远不建** ────────────────
   它是**标定工具，不是卡面**（原型自己那句注释：「这是标定工具，不是交付形态」）。
   玩家读到的一条消息里挂一排「信号色 / 中性色 / 负空间 / 天幕转角」的按钮，
   是拿调试面板当成品。
   ⇒ 判据放在**挂载点**上：`<div data-yh-mount data-yh-bar="1">` 才建。
     本地预览页给这个属性（驾驶员要继续翻皮肤）；**卡里那份壳不给**。
   ⚠ 为什么不是另写一份"预览专用 JS"：那就有**两份会各自漂移的模板**了。
     一份脚本、一个开关，预览看到的与卡里跑的**是同一段代码**。 */
var BAR = MOUNT.getAttribute('data-yh-bar')==='1';
if(BAR){
  var bar=document.createElement('div');
  bar.className='bar';
  bar.innerHTML=
    '<b>月痕 · 定标＋底图</b>'+
    '<span>皮肤</span>'+
    '<button data-sk="sk-paper" class="on">甲 · 纸</button>'+
    '<button data-sk="sk-frost">乙 · 霜</button>'+
    '<button data-sk="sk-eclipse">丙 · 蚀</button>'+
    '<button data-sk="sk-nier">丁 · 尼尔</button>'+
    '<span class="sep"></span>'+
    '<span>说话框</span>'+
    '<button data-say="1" class="on">引文线</button>'+
    '<button data-say="2">索引</button>'+
    '<button data-say="3">同排</button>'+
    '<span class="sep"></span>'+
    '<span>底图</span>'+
    '<button data-tex="both" class="on">两张</button>'+
    '<button data-tex="star">星图</button>'+
    '<button data-tex="foil">锡箔</button>'+
    '<button data-tex="none">关</button>'+
    '<span class="sep"></span>'+
    '<span>位置</span>'+
    '<button data-pos="sky" class="on">天幕</button>'+
    '<button data-pos="head">顶图</button>'+
    '<button data-pos="corner">右下角</button>'+
    '<span class="sep"></span>'+
    '<span>浓度</span>'+
    '<button data-lv="lv1">淡</button>'+
    '<button data-lv="lv2" class="on">中</button>'+
    '<button data-lv="lv3">显</button>'+
    '<span class="sep"></span>'+
    '<span>渐变条</span>'+
    '<button data-gb="off">关</button>'+
    '<button data-gb="thin" class="on">细</button>'+
    '<button data-gb="wide">宽</button>'+
    '<button data-gbk="sys">系统青</button>'+
    '<button data-gbk="skin" class="on">随皮肤</button>'+
    '<button data-gbk="block">硬边·土色</button>'+
    '<button data-gbk="ef">硬边·官方三色</button>'+
    '<button data-cap="off">不收口</button>'+
    '<button data-cap="fade">两端淡出</button>'+
    '<button data-cap="dots" class="on">网点收口</button>'+
    '<span class="sep"></span>'+
    '<span>信号色</span>'+
    '<button data-sig="now" class="on">现用</button>'+
    '<button data-sig="ef">终末地官方</button>'+
    '<span class="sep"></span>'+
    '<span>中性色</span>'+
    '<button data-neu="hue" class="on">带色相</button>'+
    '<button data-neu="gray">纯灰</button>'+
    '<span class="sep"></span>'+
    '<span>负空间</span>'+
    '<button data-ns="off">关</button>'+
    '<button data-ns="on" class="on">开</button>'+
    '<span class="sep"></span>'+
    '<span>天幕</span>'+
    '<button data-sky="two">两档</button>'+
    '<button data-sky="step" class="on">三阶</button>'+
    '<button data-sky="ramp">斜坡</button>'+
    '<button data-sky="pct">旧·百分比</button>'+
    '<span class="sep"></span>'+
    '<span>画内星野</span>'+
    '<button data-sk3d="off">关</button>'+
    '<button data-sk3d="on" class="on">开</button>'+
    '<span class="sep"></span>'+
    '<span>天幕转角</span>'+
    '<input type="range" id="yaw" min="0" max="360" step="1" value="0" title="拖它就停自转；点「↻ 自转」回到自动">'+
    '<button id="yawAuto">↻ 自转</button>'+
    '<span class="sep"></span>'+
    '<span>颗粒</span>'+
    '<button data-grain="off">关</button>'+
    '<button data-grain="on" class="on">细</button>'+
    '<button data-grain="coarse">粗</button>'+
    '<span class="sep"></span>'+
    '<span>斜纹</span>'+
    '<button data-stripe="off" class="on">关</button>'+
    '<button data-stripe="on">官方黑纹</button>'+
    '<span class="sep"></span>'+
    /* 检定版式 A/B 的切换钮 2026-09-21 **删了** —— 两种版式都不做了（判定轴被否）。
       留着两颗翻不出东西的钮，比没有钮更坏。 */
    '<span class="sp"></span>'+
    '<button id="replay">↻ 重播动效</button>';
  document.body.insertBefore(bar, MOUNT);   /* 原型里它就在 .host **前面** */
}

function replay(){
  /* 🔴 触发点挂在 **`.host`** 上，不是 `#chat` 上 ——
     这一轮新增的动效里有三条是**宿主层**的（渐变条 / 星图 / 锡箔），
     `#chat` 上的 `.play` 根本辐射不到它们。
     挂一个 `.host.play` 就全覆盖：`#chat` 是 `.host` 的后代，
     原来的 `.play .blk` 照旧命中，**不用改老选择器，也不用挂两处**。 */
  var h=document.getElementById('host');
  h.classList.remove('play'); void h.offsetWidth; h.classList.add('play');
}
replay();
/* ⚠ 工具条**默认不建** ⇒ 这两个按钮可能根本不存在，一律判空再挂。 */
var replayBtn=document.getElementById('replay');
if(replayBtn) replayBtn.onclick=replay;

/* ── 底图装配 ───────────────────────────────────────────────────────
   星图 / 锡箔各画一次，存起来；切换时只换 class 不重画（重画会闪）。
   ⚠ 星图和锡箔落卡时是**静态 HTML**（卡正则只做字符串替换、不跑 JS），
     这里用 JS 拼只是为了原型里能一处改、两处生效。
   🔴 **粒子不走这条路**：它是真 JS（`PTV`），落卡投递口是
     `data.extensions.tavern_helper.scripts`（酒馆助手），**不是正则层**。
     两条路径别混 —— 正则层里塞 `<script>` 会被 DOMPurify 剥掉。 */
var TEX = {star: starSVG(), foil: foilSVG()};
/* 🔴 `.sk` **必须排第一** —— 它是"窗外那层天"，要画在刻度盘（`.st`）和箔（`.fo`）后面。
   三个都是 `position:absolute` 且 `z-index:auto` ⇒ **由文档顺序决定叠放**，
   把 `.sk` 放到后面就变成"星星贴在盘上面"，读法是反的。 */
document.getElementById('tex').innerHTML =
  '<div class="sk"><canvas></canvas></div>'+
  '<div class="st">'+TEX.star+'</div><div class="fo">'+TEX.foil+'</div>'+
  '<div class="pt"><canvas class="gr"></canvas><canvas class="pl"></canvas></div>';
SKY.mount(document.querySelector('#tex .sk canvas'));
PTV.mount(document.querySelector('#tex .pt canvas.pl'));
GRN.mount(document.querySelector('#tex .pt canvas.gr'));

/* ── 版面探针：把**真实**的盒模型量出来，落进 `data-geo` ─────────────
   🔴 为什么要它：负空间遮罩的拐点得钉在「文字场的上下沿」，那两条沿是几 px
      决定了整条遮罩对不对得上。`_算_遮罩与浓度.mjs` 里那组数（卡片 503 /
      文字场 63→471）是**从 CSS 推的** —— 而表头高度推不出来：
      `.tag` 是 `font-size:9.5px` ＋ **`line-height:normal`**，行高由字体度量决定，
      CSS 里根本没有那个数。推出来的 32px 和别处写的 41px 就对不上。
      ⇒ 量一次，别猜。读法：`node _拍.mjs 本文件 --dom --grep=data-geo` */
function geo(){
  var h=document.getElementById('host'), H=h.getBoundingClientRect();
  var q=function(sel){
    var e=document.querySelector(sel); if(!e) return '—';
    var r=e.getBoundingClientRect();
    return (r.top-H.top).toFixed(1)+'~'+(r.bottom-H.top).toFixed(1);
  };
  var yhs=document.querySelectorAll('#host .yh'), last=yhs[yhs.length-1].getBoundingClientRect();
  /* 🔴 顺带验一条**会静默失败**的东西：`calc()` 能不能当遮罩的拐点位置。
     拐点要写成 `calc(100% - 33px)`（钉在文字场下沿），一旦这个值解析不了，
     整条 `mask-image` **不报错、直接失效** ⇒ 遮罩消失、星图满浓度铺满全卡。
     表现是"底图变清楚了"，看着还挺好，**根本不会有人发现**。 */
  var ok = CSS.supports('mask-image','linear-gradient(180deg,#000 0,#000 calc(100% - 33px))');
  var okw = CSS.supports('-webkit-mask-image','linear-gradient(180deg,#000 0,#000 calc(100% - 33px))');
  /* 🔴 再验一条同类的：**`var(--sky)` 到底解析成什么**。
     上面那条只证明"语法支持"，不证明"这条遮罩真的挂上去了"。
     中间还有三步会静默失败：① `--sky` 有没有定义（选择器没匹配上就取空）；
     ② `var(--gbh)` 在 `--sky` 里能不能解析（自定义属性之间套用）；
     ③ 两个 `-webkit-` / 标准属性哪个生效。
     取**计算后的值**是唯一能一次问清这三步的读法 —— 图上永远看不出来。 */
  var te=document.querySelector('#tex'), mi='—';
  if(te){ var cs=getComputedStyle(te);
    var raw=cs.maskImage||cs.webkitMaskImage||'none';
    /* ⚠ 别用 `split(',')` 取段 —— `rgb(0, 0, 0)` 里面就有逗号，
       取前两段会切出 `linear-gradient(rgb(0, 0` 这种半截（第一版就是这么错的）。
       只留 **alpha 分量 + 位置**，`rgb(...)` 那截颜色没信息量、还占长度。      */
    /* ⚠ 数逗号，别取"最后一个数"：`rgb(0, 0, 0)`（不透明）只有两个逗号，
       取最后一个数会读成 `0.00` —— 跟"alpha 0"长得一模一样，是个会骗人的假读数。
       三个分量 ⇒ alpha 1.00；四个 ⇒ 第四个才是 alpha。 */
    var seg=raw.replace(/rgba?\(([^)]*)\)/g, function(m,inner){
      var n=inner.split(',').map(function(s){return s.trim()});
      return (n.length>=4?(+n[3]).toFixed(2):'1.00');
    }).replace(/\s+/g,' ').slice(0,240);
    mi='(' + raw.split('rgba').length + '档) ' + seg;
  }
  h.dataset.geo = 'H=' + H.height.toFixed(1)
    + ' 页顶=' + H.top.toFixed(1)          /* ⚠ 拍图窗口不够高时，宿主下半截根本不在画面里 */
    + ' header=' + q('#host>header') + ' gb=' + q('#host .gb')
    + ' top=' + q('#host .top') + ' 文字场=' + q('#host .top').split('~')[0]
      + '~' + (last.bottom-H.top).toFixed(1)
    + ' n块=' + yhs.length
    + ' calc拐点=' + (ok?'支持':'❌不支持') + '/webkit:' + (okw?'支持':'❌不支持')
    + ' 遮罩=' + mi
    /* 星野的自检数（见 `paint()` 里那段）。**DOM 里查不到 canvas 画了什么**，
       所以"没画"和"画了看不见"只能靠这几个数分开：`draw=0` ⇒ 没画；
       `draw>0 但 aMax 很小` ⇒ 画了太淡。 ⚠ `-` 表示 `paint()` 一次都没跑过。 */
    + ' 星野=' + (function(){ var s=SKY.stat(); if(!s) return '-';
        /* ⚠ `stat` 记的是**最后一次 `paint()` 的数**，它**不知道**现在这块是不是被藏起来了
           —— 角标档/关闭档只是 `opacity:0` ＋ 停 rAF，最后一帧还留在画布上。
           撞过：`pos=corner` 和 `pos=sky` 读出来一模一样，看着像"角标档没生效"。
           ⇒ 把**真正决定可见性的那个数**（`.sk` 的计算后 opacity）并排印出来。 */
        var el=document.querySelector('#tex .sk');
        var op=el?getComputedStyle(el).opacity:'?';
        return 'op'+op+' ' + s.draw+'/'+s.n + '(背'+s.back+' 框外'+s.off+' 太淡'+s.dim+')'
             + ' aMax=' + s.aMax.toFixed(3)
             + ' 尺寸=' + s.sMin.toFixed(1) + '~' + s.sMax.toFixed(1)
             + ' 画布=' + s.W + 'x' + s.H; })();
}

/* ── 三档开关：**一次改全**，别让几个函数各改一半 class 互相打架 ── */
var LBL={'sk-paper':'PAPER','sk-frost':'FROST','sk-eclipse':'ECLIPSE','sk-nier':'NIER'};
var cur={sk:'sk-paper', tex:'both', pos:'sky', lv:'lv2',
         gb:'thin', gbk:'skin', neu:'hue', ns:'on', sig:'now',  /* ns 默认开 —— 理由见上面负空间那段 */
         grain:'on', stripe:'off', cap:'dots', sky:'step', sk3d:'on',
         say:'1'};                      /* 说话框变体 1/2/3 —— 2026-09-21 加 */
var KEYS=['sk','tex','pos','lv','gb','gbk','neu','ns','sig','grain','stripe','cap','sky','sk3d','say'];
/* gbk 是**多值**的：柔和渐变两档各一个类，硬边色块两档各一个类。
   ⚠ 写成映射表而不是三元链 —— 三元链每加一档都要再套一层，且默认值容易漏。 */
var GBK={'sys':'gbk-sys', 'block':'gbk-block', 'ef':'gbk-ef'};
function apply(){
  /* 🔴 body 上挂的**四个类一处分发** —— `neu-gray` / `gbk-sys` 也是 body 类。
     分开写（`document.body.className=...` 之后再 `classList.add(...)`）容易漏，
     一漏就是"某个开关看着没生效"，而查起来要翻到样式表里去。
     ⚠ `neu-gray` 是**纯灰对照组**（见皮肤变量那段注释）：默认不带它。 */
  document.body.className = [cur.sk, cur.lv,
    cur.neu==='gray' ? 'neu-gray' : '',
    GBK[cur.gbk] || '',
    cur.sig==='ef' ? 'sig-ef' : '',
    'say'+cur.say].filter(Boolean).join(' ');
  var h = document.getElementById('host');
  h.dataset.pos = cur.pos;
  h.dataset.gb  = cur.gb;
  h.dataset.ns  = cur.ns;
  h.dataset.grain  = cur.grain;
  h.dataset.stripe = cur.stripe;
  h.dataset.cap    = cur.cap;
  h.dataset.sky    = cur.sky;
  h.dataset.sk3d   = cur.sk3d;
  document.getElementById('hlabel').textContent = LBL[cur.sk];
  var t=document.getElementById('tex');
  t.style.display = (cur.tex==='none') ? 'none' : '';
  t.querySelector('.st').style.display = (cur.tex==='foil') ? 'none' : '';
  t.querySelector('.fo').style.display = (cur.tex==='star') ? 'none' : '';
  KEYS.forEach(function(k){
    document.querySelectorAll('.bar [data-'+k+']').forEach(function(x){
      x.classList.toggle('on', x.dataset[k]===cur[k]);
    });
  });
  /* 🔴 身份色**必须在这里算**，不能挪到文件前面去 ——
     `--nS` / `--nL0` / `--nstep` / `--nh0` 是**每张皮各有各的**，而且**只写在皮肤类上**；
     皮肤类是上面那行 `document.body.className=…` 才挂上去的 ⇒
     挪到 `apply()` 之前的任何位置，探针都读不到参数 ⇒ `--nc` 整条解析失败 ⇒
     **身份色整批不出、而且不报错**。
     ⇒ 「**算色 → 重画面板 → 重画图标**」三件事跟着换皮一起走 ——
       跟下面那行 `.rule` 同一条道理（尺也是按算出来的颜色画的）。
     ⚠ 顺序不能倒：`render()` 里 `nameStyle()` 读的是 `NCMAP`，而 `NCMAP` 是这里建的。
     ⚠ 作用域必须是 `document.body` —— 探针要在**挂了皮的那一层**才继承得到参数。 */
  NCMAP = ncAssign(document.body, screenNamesOf(MSG));
  render();
  /* 图标是 `mask` 画的，`--g` 得逐枚写上去 —— 必须在 `render()` **之后**
     （DOM 得先在，否则 `querySelectorAll` 扫到空集、**图标全不画、不报错**）。 */
  fillMasks(document);
  document.querySelectorAll('.rule').forEach(rule);   /* 尺按算出来的颜色画 ⇒ 换肤要重画 */
  replay();
  /* 粒子的颜色取自 `--sig` —— **canvas 读不到 CSS 变量**，得用 JS 取，
     所以换肤 / 换信号色之后必须重取一次 sprite。
     角标档不放粒子 ⇒ 顺手把 rAF 停掉：**看不见的东西不该继续烧电**。 */
  PTV.resync(cur.pos !== 'corner' && cur.tex !== 'none');
  /* 画内星野同一条规矩：角标档、`tex=none`、工具条上关掉 —— 三个条件任一成立就不跑。
     ⚠ 跟粒子一样**隐藏和停 rAF 两条都要有**（只隐藏不停 ⇒ 看不见的 canvas 照旧每帧烧电）。 */
  SKY.resync(cur.pos !== 'corner' && cur.tex !== 'none' && cur.sk3d === 'on');
}
function set(k,v){ if(k==='sk'&&!LBL[v]) return; cur[k]=v; apply(); }
KEYS.forEach(function(k){
  document.querySelectorAll('.bar [data-'+k+']').forEach(function(b){ b.onclick=function(){ set(k,b.dataset[k]) }; });
});

/* ── 天幕转角：滑杆 ＋ 「↻ 自转」 ────────────────────────────────────────
   🔴 这一对立在这里，是因为它演示的是 #9 那句「**按时间/状态算出来**」的**状态那一半**：
      · 自转 ＝ 时间在算（`t` 一档）
      · 拖滑杆 ＝ 状态在算（给一个角度，天就转到那儿）
     ⚠ 拖动会**停掉自转**（`yaw()` 里做）—— 否则手一松它又转走，读不出"这个角度长什么样"。
     这是标定工具，不是交付形态：**卡里到底绑不绑游戏变量、绑哪个，要驾驶员裁。** */
/* ⚠ 工具条默认不建 ⇒ 滑杆与按钮都可能不在。`yawTick` 本来就判了 `yawEl`，这里补上挂载。 */
var yawEl=document.getElementById('yaw');
if(yawEl) yawEl.oninput=function(){ SKY.yaw(+yawEl.value); };
var yawAutoBtn=document.getElementById('yawAuto');
if(yawAutoBtn) yawAutoBtn.onclick=function(){ SKY.yawAuto(true); };
/* 自转时把滑杆位置跟着刷 —— 不跟的话下一次拖动会从旧位置跳回去，读不出来。
   ⚠ **只起一条 ticker**（在模块加载时起一次），别写在 onclick 里 ——
     那样每点一次「↻ 自转」就多一条永不退出的 rAF，点十次十条。
     这条 ticker 本身几乎不花钱：同步的是 DOM 属性，不是重画 canvas。 */
(function yawTick(){
  /* ⚠ 三个条件都满足才写：星野开着、手没按在滑杆上、自转中。
     不这么写的话，拖滑杆时会被 ticker 每帧抢回去，**滑杆根本拖不动**。 */
  if(yawEl && cur.sk3d==='on' && document.activeElement!==yawEl
     && document.querySelector('#host').dataset.pos!=='corner'){
    var d=Math.round(SKY.yawDeg());
    if(+yawEl.value!==d) yawEl.value=d;            /* 值没变就不写 —— 少一次属性写 */
  }
  requestAnimationFrame(yawTick);
})();

/* ── 取参：`window.__YH_Q`（🔴 本轮改的地方）────────────────────────────
   🔴 **为什么不读 `location.search`**：真身跑在酒馆助手的楼层 iframe 里，
     内容是 `srcdoc` —— 它的地址是 `about:srcdoc`，**根本没有 query string**。
     原型里那套 `?sk=` / `?t=` 在真机上永远取空 ⇒ 只能另找一口。
   ⇒ 约定：预览页把参数**内联进 srcdoc** 成 `window.__YH_Q = {...}`。
     真机不定义它 ⇒ 全走默认值 —— 而"全走默认值"正是真机应有的行为。
     ⚠ **别改回读 query**：那样在真机上不报错，只是所有开关静默失效。
   ⚠ 顺带解决一个原型里的老坑：原来 `t` / `yaw` 得**各写一条自己的正则**，
     因为 `q()` 的字符集是 `[a-zA-Z0-9-]`、**不含小数点**，`t=0.30` 会被截成 `0`。
     走对象之后没有字符集这回事了，两条特例正则一并退休。
     （原注释里那条"字符集必须带连字符"的教训说的是 `sk=sk-eclipse` 被截成 `"sk"`、
       皮肤类挂不上 ⇒ 所有 `var()` 集体取空、表现成"底图没画出来"。
       走对象之后这类 bug 结构上不可能再有 —— 但**判据留着**：
       变量类问题先查**类名挂上没有**，别只看图。） */
var Q=(window.__YH_Q && typeof window.__YH_Q==='object') ? window.__YH_Q : {};
var q=function(k){ var v=Q[k]; return (v===undefined||v===null)?undefined:String(v); };
KEYS.forEach(function(k){ if(q(k)!==undefined) cur[k] = q(k); });
apply();
/* ⚠ **`geo()` 挪到文件最末尾了**（原来在这儿）。
   它是个**探针**，量的是"这一屏最终长什么样"—— 可 `?t=` / `?yaw=` 那两段在它**后面**，
   于是 `data-geo` 里印的永远是**还没冻、还没转**的状态。
   撞过：`?yaw=0` 和 `?yaw=40` 两次读出来的星野统计**一模一样**（60/260、背147、框外53），
   看着像"转角没生效"，其实只是**读数取早了**。
   ⇒ 探针必须排在所有会改状态的代码**之后**。 */
window.addEventListener('resize', geo);  /* 窗口一变，文字场下沿就变 —— 得重量 */

/* ⚠ 原来这里是 `location.search.match(/t=([\d.]+)/)` —— 见上面 `__YH_Q` 那段，一并改掉。
   `Q.t` 是**数字**（预览页写的是数字字面量），下面 `+ft` / `-d` 照旧吃得住。 */
var ft=(Q.t===undefined||Q.t===null)?undefined:+Q.t;
if(ft!==undefined){
  var chat=document.getElementById('chat');
  chat.classList.add('freeze'); void chat.offsetWidth;
  /* 🔴 **冻结范围必须是整个 `#host`，不能只是 `#chat`。**
     第一版写的是 `chat.querySelectorAll('*')` —— 漏掉了 `.tex` 里那一整片：
       `.tex .sd/.sc/.sx`（手绘星图）、`path.fC/path.fD`（锡箔折面）、`.fb/.fh`（箔的描边）
     全都挂着 `metaIn` 入场动画，**它们不在 `.chat` 里面**，所以一个都没冻上。
     代价：同一条 `?t=40` 的 URL 拍两次，**箔的多边形边缘抗锯齿不一样**。
     实测噪声底（纸底、卡内 y 279..1292、10 桶）：
       全卡平均差 **−0.24 个亮度单位**，单桶最大 **−0.68**，
       每桶有 **三千到七千个像素**在翻 —— 而 #8「天幕分层」那条的峰值信号
       也只有 **1.36**。**信号只比噪声高两倍**，这条结论的强度被我高估了。
     ⇒ 改成扫 `#host` 全体。（`.freeze` 那个类照旧留在 `#chat` 上，它管的是别的事。） */
  var hostEl=document.getElementById('host');
  hostEl.querySelectorAll('*').forEach(function(el){
    var cs=getComputedStyle(el);
    if(cs.animationName==='none') return;
    var d=parseFloat(cs.animationDelay)||0;
    el.style.animationDelay=(-(+ft-d))+'s';
    el.style.animationPlayState='paused';
  });
  /* 🔴 粒子也要一起冻在同一刻 —— 否则同一个 `?t=` 拍两次，CSS 动画一样、
     粒子位置却不一样，`_比图.ps1` 的逐像素比对直接作废。 */
  PTV.freeze(+ft);
  /* 画内星野同一条 —— 它的位置还是**解析式**算的（见 `paint` 头注），
     所以 `?t=` 一给就是定值，连抗锯齿级别的抖动都不该有。 */
  SKY.freeze(+ft);
}
/* `?yaw=` —— 把天幕钉在一个角度上（截图对照用）。给了它就停自转。
   ⚠ **必须排在 `?t=` 之后**：`freeze()` 会 `stop()`、`yaw()` 会 `paint()`，
     顺序反了的话 `yaw()` 画完又被 `freeze(12)` 用另一个 t 重画一次，
     而 `?t=` 与 `?yaw=` 都用时到底该是哪个 t 就说不清了。
     现在这条顺序的含义是明确的：**t 定时刻、yaw 定角度，两个都钉死 ⇒ 完全可复现。** */
var fy=(Q.yaw===undefined||Q.yaw===null)?undefined:+Q.yaw;
if(fy!==undefined){ if(yawEl) yawEl.value=fy; SKY.yaw(fy); }   /* ⚠ 工具条不建时没有滑杆 */

/* ══ 截图专用：一条什么都不做的循环，只为**不让页面闲下来** ══════════════
   🔴 为什么非要这个（这条是量出来的，不是猜的）：

   `_拍.mjs` 给 Chrome 的参数里有 `--virtual-time-budget=4000`。它的语义是
   「虚拟时钟**最多**推进 4000ms」—— 但**页面一旦没有待办任务，它就提前收工**，
   截图落在哪个时刻就成了随机的。

   本来 `sk3d=on` 的时候，`SKY` 那条 rAF 循环让页面永远有活干 ⇒ 每次都跑满
   4000ms ⇒ 看起来"稳定"。**但那是巧合，不是保证** —— `sk3d=off` 时没有任何循环，
   截图时刻就随机了。

   实测（丙·蚀皮肤、`?t=40&yaw=0`，每张与第 1 张逐像素比）：
     加这条循环**之前**  sk3d=on  2.808% / 0.184% / 0.048%
                        sk3d=off 2.703%（另一次 0.000%）
     加这条循环**之后**  sk3d=off **0.007% / 0.000%**  ← 修好了
                        sk3d=on  2.770% / 0.232%      ← **没修好**
   ⇒ 我之前"同一 URL 拍两次完全一样"的结论是**三次撞运气**，这一条作废：
     **`?t=` 截图不是逐像素可复现的。**

   🔴 **残留问题（未查明，只记一笔）**：`sk3d=on` 时仍有 0.2%~2.8% 的像素在变，
      差在**正文文字**上（放大看是整段文字的双影）和几颗星图的字母。
      `sk3d=off` 却已经是逐字节相同 ⇒ **变量就是"星野那层开不开"本身。**
      **推测**（未证实）：`.sk` 是一张 1716×1026 的 canvas，开不开它决定了
      这一页的图层树和光栅化时机，而 Chrome 会据此在**灰度抗锯齿**和
      **次像素抗锯齿**之间切换 —— 文字就跟着差半个像素。
      **没有验证**，也不再往下追（闸门冻结：闪红只记一笔）。
      ⇒ **实践口径**：做逐像素对照时，要么把 `sk3d` 固定成 `off` 再比，
        要么接受文字区有 0.2~2.8% 的噪声底、**只看卡片上下两条带**。

   ⚠ 这条循环**只在 `?t=` 时起**，正常浏览不跑。它不改任何显示状态，
     只是把"恰好跑满预算"从巧合变成确定行为。 */
if(ft!==undefined){
  (function keepalive(){ requestAnimationFrame(keepalive); })();
}

/* 🔴 **探针放最后一行**（理由见上面 `apply()` 那段注释）。 */
geo();

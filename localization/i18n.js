// ============================================================================
//  The Point Tree — 简体中文汉化层  (localization/i18n.js)
//  ---------------------------------------------------------------------------
//  设计参考「天体增量树 汉化」：不修改任何游戏源码，采用
//  「加载期拦截 + 运行时词典替换」，上游更新时可干净合并。
//
//  工作原理（TMT / The-Modding-Tree 引擎）：
//    1. 包装 addLayer —— 图层数据（名称/升级/成就/里程碑/可点击项/信息框/
//       子标签页内容）在注册时即被翻译；函数型字段包一层，求值后翻译返回值。
//    2. 包装 run() / gridRun() —— 所有经它们渲染的 v-html 文本（含动态拼串）。
//    3. 包装 doPopup() —— 弹窗标题与正文。
//    4. 包装 Vue.component() —— 只做少量「模板字面量」定点补丁（组件模板里的
//       静态英文不经过任何 JS 函数，只能改模板）。
//    5. MutationObserver —— 兜底翻译运行期插入的文本节点（index.html 静态文案等）。
//    6. 设置页注入「语言：中文 / English」按钮，选择存 localStorage。
//
//  词典文件：localization/zh_CN.js （window.PT_I18N）
// ============================================================================
(function () {
    "use strict";

    // ------------------------------------------------------------------
    // 0. 语言状态
    // ------------------------------------------------------------------
    var LS_KEY = "pointtree_i18n_lang";
    var lang = "zh-CN";
    try { lang = localStorage.getItem(LS_KEY) || "zh-CN"; } catch (e) { /* ignore */ }
    // URL 参数 ?lang=en / ?lang=zh-CN：便于分享与临时切换。
    // 规则：URL 参数**只在本地还没存过语言时**才作为初始值生效，
    // 一旦用户手动切换过（localStorage 有值），就以后者为准 ——
    // 否则带 ?lang=xx 的链接会把用户的切换弹回去。
    try {
        var qm = /[?&]lang=(en|zh-CN)/.exec(location.search);
        var stored = null;
        try { stored = localStorage.getItem(LS_KEY); } catch (e) { /* ignore */ }
        if (qm && !stored) { lang = qm[1]; localStorage.setItem(LS_KEY, lang); }
    } catch (e) { /* ignore */ }

    var DICTS = window.PT_I18N || {};
    var active = DICTS[lang] || DICTS["zh-CN"] || { exact: {}, fragment: {} };
    var exact = active.exact || {};
    var fragment = active.fragment || {};
    var ENABLED = (lang === "zh-CN");

    // ------------------------------------------------------------------
    // 1. 词典匹配器：所有 key 按长度降序合成一条正则，一次替换
    //    - 纯英文单词键自动加 \b 边界
    //    - 追加「HTML 标签」分支，整段标签原样保留（属性名/样式/路径不被误译）
    // ------------------------------------------------------------------
    var masterRe = null;
    var masterTest = null;
    var masterMap = {};

    function escapeRe(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function isPureWord(s) {
        return /^[A-Za-z]+$/.test(s);
    }

    // 纯单词键的「右向守卫」：后面紧跟代码符号时不匹配
    //   style='width:69px'  → 不动（CSS 声明）
    //   <img width='100'>   → 不动（HTML 属性）
    //   {'width': 1}        → 不动（JS 键）
    //   "Cost:" / "Cost:<br>" → 照常译（冒号后不是值字符，属于文案）
    var WORD_GUARD_AFTER = "(?![\\w$'\"])(?![=])(?!:[\\w#.\\-])";

    function buildMatcher() {
        var seen = {}, keys = [], k, i;
        // 整串词条与片段词条都进入正则：
        //   exact 只是「整串相等时优先命中」，但在拼接串里（"0.000 Water"）也需要它来做子串替换。
        // 副作用（"The Prestige Tree" 被 "Prestige" 误译）由 translate() 里的
        // 「已含中文就不再走子串替换」规则挡住。
        for (k in exact) if (!seen[k]) { seen[k] = 1; keys.push(k); }
        for (k in fragment) if (!seen[k]) { seen[k] = 1; keys.push(k); }
        keys.sort(function (a, b) { return b.length - a.length; });
        var parts = [];
        masterMap = {};
        for (i = 0; i < keys.length; i++) {
            k = keys[i];
            masterMap[k] = (k in exact) ? exact[k] : fragment[k];
            parts.push(isPureWord(k)
                ? ("\\b" + escapeRe(k) + "\\b" + WORD_GUARD_AFTER)
                : escapeRe(k));
        }
        if (parts.length) {
            masterRe = new RegExp("(" + parts.join("|") + ")|(<[^>]*>)", "g");
            masterTest = new RegExp(parts.join("|"));
        }
    }
    buildMatcher();

    // 译文集合：若输入本身就是某条词典的译文，直接返回 —— 保证翻译幂等，
    // 避免「译文里恰好含英文术语」时被再次替换（如 "…Discord 服务器" → "…服务器 服务器"）
    var OUTPUTS = (function () {
        var s = {};
        for (var k in exact) if (typeof exact[k] === "string") s[exact[k]] = 1;
        for (var k2 in fragment) if (typeof fragment[k2] === "string") s[fragment[k2]] = 1;
        return s;
    })();

    // ------------------------------------------------------------------
    // 2. 保护层：资源路径 / id 形态 token 先掩码，翻译后还原
    // ------------------------------------------------------------------
    var PATH_RE = /\b(?:resources|Savebank|css|js|music|fragments|docs|data)\/[^\s'"<>()]*/g;
    var ID_SCAN = /[A-Za-z0-9]+(?:-[A-Za-z0-9]+)+/g;

    function idShape(s) {
        return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)+$/.test(s);
    }
    // 「id 形态但其实是显示名」白名单：该 token 出现在某条**有实际翻译**的词典 key 里。
    //   只要一条 key 被译成了中文（译文 ≠ 原文），key 里出现的 id 形态 token 都是
    //   「待翻译的显示文本」——无论译文最终是译成中文（如 Time-bound→时间束缚）
    //   还是有意保留英文（如 Discord 等专名），都不该被 ID_SCAN 掩码。
    //   否则，像「细菌 2 - 时间束缚」这种译文标题里带短横线的 key，会因整条译文
    //   含 '-' 而被误判，导致 key 里的 Time-bound / Reset-75 等 token 被掩码，
    //   进而破坏长 fragment 键的整段匹配（细菌技能树因此残留英文）。
    var ID_SAFE = (function () {
        var safe = {};
        function harvest(k, v) {
            if (typeof v !== "string") return;
            if (v === k) return;                 // 未翻译（译文=原文）的 key 不作为白名单依据
            var m = String(k).match(ID_SCAN);
            if (!m) return;
            for (var i = 0; i < m.length; i++) {
                safe[m[i]] = 1;
            }
        }
        for (var k in exact) harvest(k, exact[k]);
        for (var k2 in fragment) harvest(k2, fragment[k2]);
        return safe;
    })();

    // ------------------------------------------------------------------
    // 3. 翻译核心
    // ------------------------------------------------------------------
    var cache = new Map();
    var CACHE_MAX = 8000;

    // 少量「选项值」整串映射：这些词只在设置页作为取值出现（off/on/…），
    // 单独查表比丢进正则安全（"on" 当子串会误伤 "on the left" 之类）
    var SPECIAL = { off: "关", on: "开", ultra: "极强", earthquake: "地震" };

    // 精通等级名（v4.1r 新增的 Mastery Ranks）：
    // rankName() 渲染成 `Good 2` 这种「名次 + 空格 + 序号」的文本节点，序号随进度变化，
    // 无法用静态词条覆盖，这里按前缀查表，序号原样保留。
    var RANK_NAMES = {
        None: "无", Good: "良好", Great: "优秀", Better: "更佳", Excellent: "卓越",
        Terrific: "极佳", Superb: "精湛", Awesome: "惊人", Amazing: "非凡", Fantastic: "奇妙",
        Incredible: "难以置信", Outstanding: "出类拔萃", Insane: "疯狂", Perfection: "完美",
        Holy: "神圣", Angelic: "天使", Demonic: "恶魔", Godly: "神级", Divine: "神性",
        Penultimate: "倒数第二", Supreme: "至尊", Maxima: "极值", Cosmic: "宇宙",
        Transcended: "超越", Celestial: "天界", Absolute: "绝对", Insanity: "癫狂",
        Unfathomable: "深不可测", Awakened: "觉醒", Unbound: "无界", Singularity: "奇点",
    };
    var RANK_RE = /^([A-Z][A-Za-z]+) (\d{1,6})$/;
    var RANK_NONE_RE = /^([A-Z][A-Za-z]+)$/;

    // ------------------------------------------------------------------
    // 3.5 数字写法归一
    //     游戏渲染文本前会用 notationChooserText()（js/utils/NumberFormating.js）
    //     重排文中的数字：
    //         50M   → 50,000,000   （缩写被展开）
    //         3750  → 3,750        （补上千分位）
    //         0.1   → 0.100        （补足小数位）
    //         4.0   → 4            （去掉小数末尾的 0）
    //     运行时字符串因此与词典键对不上，长句只能被碎片词条零敲碎打地改写，
    //     出现「Endgame: 共 11 SP + 50,000,000 (New Layer currency)」这种中英混杂。
    //     这里做两件事：
    //       ① 抹平千分位与小数末尾的 0（词典键与运行时字符串同样归一后比对）
    //       ② 把被展开的长数字压回 K/M/B/T/Qd 缩写，再查一次
    // ------------------------------------------------------------------
    function normNums(s) {
        return s.replace(/(^|[^A-Za-z0-9.])(\d[\d,]*)(?:\.(\d+))?(?![0-9A-Za-z.])/g,
            function (m, pre, int, frac) {
                var v = int.replace(/,/g, "");
                if (frac !== undefined) {
                    frac = frac.replace(/0+$/, "");
                    return pre + v + (frac ? "." + frac : "");
                }
                return pre + v;
            });
    }

    var SCALE = [[1e15, "Qd"], [1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "K"]];
    function compactNumber(digits) {
        var v = Number(digits);
        if (!isFinite(v) || v < 1e3) return null;
        for (var i = 0; i < SCALE.length; i++) {
            var p = SCALE[i][0];
            // 只还原成「整数 + 后缀」的写法（50,000,000 → 50M）；
            // 411,411 这类压不成整数的保持原样。
            if (v >= p && v % p === 0 && v / p < 1000) return String(v / p) + SCALE[i][1];
        }
        return null;
    }

    // 把被展开的长数字压回缩写，生成候选串（最多 8 种组合）
    function compactVariants(str) {
        var re = /(^|[^A-Za-z0-9.e])(\d{1,3}(?:,\d{3})+)/g;
        var m, res = [""], pos = 0, n = 0;
        while ((m = re.exec(str)) && res.length < 8) {
            var head = str.slice(pos, m.index + m[1].length);
            var short = compactNumber(m[2].replace(/,/g, ""));
            var alts = short ? [m[2], short] : [m[2]];
            var next = [];
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < alts.length; j++) next.push(res[i] + head + alts[j]);
            }
            res = next.slice(0, 8);
            pos = m.index + m[0].length;
            n++;
        }
        if (!n) return null;
        var tail = str.slice(pos), out = [];
        for (var k = 0; k < res.length; k++) out.push(res[k] + tail);
        return out;
    }

    // 「归一后的写法 → 词典键」索引，首次用到时建好（约 4000 条）
    var normIndex = null;
    function getNormIndex() {
        if (normIndex) return normIndex;
        normIndex = {};
        function add(k) {
            var n = normNums(k);
            if (n === k) return;
            if (!Object.prototype.hasOwnProperty.call(normIndex, n)) normIndex[n] = k;
            else if (normIndex[n] !== k) normIndex[n] = null;   // 归一后撞车：弃用，免误译
        }
        for (var k in exact) add(k);
        for (var f in fragment) add(f);   // fragment 里也有整句键，同样要能反查
        return normIndex;
    }

    // 「游戏渲染后的写法 → 词典键」别名索引
    // 游戏在渲染前用 notationChooserText() 重排数字，规则很碎：缩写展开、补千分位、
    // 补 / 去小数末尾的 0、e 记数法取整、甚至连 "3," 里的逗号都会被吞掉。
    // 逐条逆向猜不可靠，这里干脆用游戏自己的格式化函数把每个词典键跑一遍，
    // 得到「这行在运行时会长成什么样」，再拿运行时字符串直接反查。
    var aliasMap = null, aliasStamp = null, aliasProbedAt = 0;
    function getAliasMap() {
        // 记数法 / 精度切换后渲染结果会变，用一次「探针格式化」判断要不要重建
        // （探针每秒最多算一次，避免每个文本节点都跑一遍格式化）
        if (typeof window.notationChooserText !== "function" || typeof window.format !== "function") return null;
        var now = Date.now();
        if (aliasMap && now - aliasProbedAt < 1000) return aliasMap;
        aliasProbedAt = now;
        var stamp;
        // 探针要选一段「一定会被重排」的文字：刚加载时玩家设置还没读进来，
        // 格式化结果与设置读入后不同，靠它判断要不要重建别名表。
        try { stamp = window.notationChooserText("1.25M Sac"); } catch (e) { return aliasMap; }
        if (aliasMap && stamp === aliasStamp) return aliasMap;
        aliasStamp = stamp;
        aliasMap = {};
        function add(k) {
            if (k.indexOf("<") >= 0 || !/[0-9]/.test(k)) return;
            var r;
            try { r = window.notationChooserText(k); } catch (e) { return; }
            if (typeof r !== "string" || r === k) return;
            if (!Object.prototype.hasOwnProperty.call(aliasMap, r)) aliasMap[r] = k;
        }
        for (var k in exact) add(k);
        for (var f in fragment) add(f);
        // 更新日志是「一整块 HTML」一次性交给格式化函数的，数字重排的上下文与
        // 单句不同（例如 ee10 → e1e10、ErUp 4b → ErUp 4.000B）。只能把整块格式化，
        // 再按 <br> 与原文对齐，把「渲染后的整行」也登记成别名。
        try {
            if (modInfo && typeof modInfo.changelog === "string") {
                var rawLines = modInfo.changelog.split("<br>");
                var fmtLines = window.notationChooserText(modInfo.changelog).split("<br>");
                for (var i = 0; i < rawLines.length && i < fmtLines.length; i++) {
                    var a = rawLines[i].replace(/^\s+|\s+$/g, "");
                    var b = fmtLines[i].replace(/^\s+|\s+$/g, "");
                    if (!a || a === b) continue;
                    if (!Object.prototype.hasOwnProperty.call(exact, a)) continue;
                    if (!Object.prototype.hasOwnProperty.call(aliasMap, b)) aliasMap[b] = a;
                }
            }
        } catch (e) { /* 没有 modInfo 就跳过 */ }
        return aliasMap;
    }

    // 查词典：整串 → 渲染别名 → 数字写法归一 → 缩写还原
    function lookupKey(str) {
        if (Object.prototype.hasOwnProperty.call(exact, str)) return str;
        if (!/[0-9]/.test(str)) return null;
        var alias = getAliasMap();
        if (alias && Object.prototype.hasOwnProperty.call(alias, str)) return alias[str];
        var idx = getNormIndex();
        var n = normNums(str);
        // 运行时字符串本身可能「看着就规范」（游戏把 3,750 写成 3,750 又或吞掉逗号），
        // 所以 n 与 str 相同也要查一次归一索引：词典键的写法未必规范。
        if (Object.prototype.hasOwnProperty.call(exact, n)) return n;
        if (idx[n]) return idx[n];
        if (str.indexOf(",") >= 0) {
            var alts = compactVariants(str);
            if (alts) {
                for (var i = 0; i < alts.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(exact, alts[i])) return alts[i];
                    var an = normNums(alts[i]);
                    if (an !== alts[i] && idx[an]) return idx[an];
                }
            }
        }
        return null;
    }

    function translate(str) {
        if (!ENABLED || typeof str !== "string" || str.length < 2) return str;
        // 换行符规范化：源码文件在 Windows 上常是 CRLF，但 JS 引擎解析
        // 模板字符串时会把 \r\n 规范成 \n，导致「词典键(CRLF)」与
        // 「运行时字符串(LF)」对不上。这里统一成 \n 再匹配。
        if (str.indexOf("\r") >= 0) str = str.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        if (SPECIAL[str] !== undefined) return SPECIAL[str];
        var rk = RANK_RE.exec(str);
        if (rk && RANK_NAMES[rk[1]] !== undefined) return RANK_NAMES[rk[1]] + " " + rk[2];
        var rk1 = RANK_NONE_RE.exec(str);
        if (rk1 && RANK_NAMES[rk1[1]] !== undefined) return RANK_NAMES[rk1[1]];
        if (/^[A-Za-z0-9]$/.test(str)) return str;
        if (OUTPUTS[str] === 1) return str;                 // 已是译文，幂等返回
        if (cache.has(str)) return cache.get(str);
        var out;
        var hitKey = lookupKey(str);
        if (hitKey !== null) {
            var ev = Object.prototype.hasOwnProperty.call(exact, hitKey) ? exact[hitKey] : fragment[hitKey];
            // 只有「原文是 id 形态、译文也仍是 id 形态」才认为这条词典没有真正翻译
            //（例如 foo-bar → foo-bar），保留原文以免误伤代码标识符。
            // 若译文已中文化（如 Transcending-Dimensional → 超越-维度），即使译文里
            // 带短横线也应当使用译文——否则像 Supra-Eternity、Supra-Reality 这类
            // 成就名会永远显示英文。
            out = (idShape(hitKey) && typeof ev === "string" && idShape(ev)) ? hitKey : ev;
        } else if (PROTECTED[str] === 1 || PROTECTED[str.replace(/^\s+|\s+$/g, "")] === 1) {
            // 模板补丁的产物（如「The Prestige Tree 由 Jacorb 与 Aarex 制作」）：
            // 里面的英文专名不能再被子串词条改写。
            // 注意：Vue 编译后的文本节点常带首尾空白/换行，需用 trim 后的形态再查一次，
            // 否则「The Prestige Tree」会被 "Prestige" 子串规则误译成「The 威望 Tree」。
            out = str;
        } else {
            var guards = [];
            var masked = str.replace(PATH_RE, function (m) {
                guards.push(m);
                return "\u0001" + (guards.length - 1) + "\u0001";
            });
            masked = masked.replace(ID_SCAN, function (m) {
                if (ID_SAFE[m] === 1) return m;
                guards.push(m);
                return "\u0001" + (guards.length - 1) + "\u0001";
            });
            if (masterTest && masterTest.test(masked)) {
                out = masked.replace(masterRe, function (m, key, tag) {
                    if (tag !== undefined) return tag;
                    return masterMap[m];
                });
            } else {
                out = masked;
            }
            if (guards.length) out = out.replace(/\u0001(\d+)\u0001/g, function (_, i) { return guards[+i]; });
        }
        // 时间单位：数字前缀限定，避免误伤普通英文（ms 必须排在 s 之前）
        out = out
            .replace(/(\d+(?:\.\d+)?)\s?ms(?![\w])/g, "$1毫秒")
            .replace(/(\d+(?:\.\d+)?)\s?y(?![\w])/g, "$1年")
            .replace(/(\d+(?:\.\d+)?)\s?d(?![\w])/g, "$1天")
            .replace(/(\d+(?:\.\d+)?)\s?h(?![\w])/g, "$1小时")
            .replace(/(\d+(?:\.\d+)?)\s?m(?![\w])/g, "$1分")
            .replace(/(\d+(?:\.\d+)?)\s?s(?![\w])/g, "$1秒");
        // 精通等级：游戏把「Your rank is None (#0)」拼成一串，等级名随名次数字变化，
        // 这里只替换「等级名 + (#数字)」这种形态，别的地方不动。
        if (out.indexOf(" (#") >= 0) {
            out = out.replace(/\b([A-Z][A-Za-z]+)(?= \(#\d+\))/g, function (m, n) {
                return RANK_NAMES[n] !== undefined ? RANK_NAMES[n] : m;
            });
        }
        if (cache.size >= CACHE_MAX) cache.clear();
        cache.set(str, out);
        return out;
    }

    // ------------------------------------------------------------------
    // 4. 函数包装：保留原函数，仅翻译其字符串返回值
    // ------------------------------------------------------------------
    function wrapTextFn(fn) {
        if (typeof fn !== "function" || fn.__ptWrapped) return fn;
        var orig = fn;
        var wrapped = function () {
            var r = orig.apply(this, arguments);
            return (typeof r === "string") ? translate(r) : r;
        };
        wrapped.__ptWrapped = true;
        wrapped.__ptOrig = orig;
        return wrapped;
    }
    function translateValue(v) {
        if (typeof v === "string") return translate(v);
        if (typeof v === "function") return wrapTextFn(v);
        return v;
    }

    // ------------------------------------------------------------------
    // 5. 图层数据结构 —— 只翻「显示字段」，绝不碰 id / 样式 / 代码
    // ------------------------------------------------------------------
    // 层对象自身的显示字段。注意 resource / baseResource 是**层级**字段
    // （main-display / resource-display / 树节点 tooltip 都会拼它），不是集合项字段。
    var LAYER_FIELDS = ["name", "tooltip", "tooltipLocked", "subtitle", "effectDescription",
        "startText", "resource", "baseResource"];
    var ITEM_FIELDS = [
        "name", "title", "description", "desc", "tooltip", "tooltipLocked",
        "display", "effectDisplay", "fullDisplay", "body", "text", "label",
        "requirementDescription", "effectDescription", "challengeDescription",
        "goalDescription", "rewardDescription", "unlockedDescription",
        "currencyDisplayName", "resource", "baseResource",
        "respecText", "masterButtonText", "sellOneText", "sellAllText", "masterButtonText"
    ];
    var COLLECTIONS = ["upgrades", "buyables", "milestones", "challenges",
        "achievements", "clickables", "grid", "bars", "infoboxes", "sublayers"];

    function translateItem(obj) {
        if (!obj || typeof obj !== "object") return;
        for (var i = 0; i < ITEM_FIELDS.length; i++) {
            var f = ITEM_FIELDS[i];
            if (obj[f] !== undefined) obj[f] = translateValue(obj[f]);
        }
    }

    // tabFormat / content 数组：[组件名, 载荷...]
    // 只翻文本型组件的 payload[1]；容器型组件递归其数组载荷；其余（id、数字）不动
    var TEXT_TYPES = { "display-text": 1, "raw-html": 1, "text": 1, "info": 1, "tooltip": 1 };

    function translateFormatArray(arr) {
        if (!Array.isArray(arr)) return;
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (!Array.isArray(item) || typeof item[0] !== "string") continue;
            if (TEXT_TYPES[item[0]]) {
                if (item[1] !== undefined) item[1] = translateValue(item[1]);
            } else {
                for (var j = 1; j < item.length; j++) {
                    if (Array.isArray(item[j])) translateFormatArray(item[j]);
                }
            }
        }
    }

    function translateMicrotabs(mt) {
        if (!mt || typeof mt !== "object") return;
        for (var grp in mt) {
            var tabs = mt[grp];
            if (!tabs || typeof tabs !== "object") continue;
            for (var name in tabs) {
                var tab = tabs[name];
                if (!tab || typeof tab !== "object") continue;
                // 键名是 player.subtabs 的存储值，**不能改名**；把译文注入 title，
                // 由 tab-buttons 模板读 title（见下方 Vue.component 补丁）
                var zh = translate(name);
                if (zh !== name && tab.title === undefined) tab.title = zh;
                if (tab.title !== undefined) tab.title = translateValue(tab.title);
                if (tab.content) translateFormatArray(tab.content);
            }
        }
    }

    function translateLayerData(d) {
        if (!d || typeof d !== "object") return;
        var i, f;
        for (i = 0; i < LAYER_FIELDS.length; i++) {
            f = LAYER_FIELDS[i];
            if (d[f] !== undefined) d[f] = translateValue(d[f]);
        }
        for (i = 0; i < COLLECTIONS.length; i++) {
            var col = d[COLLECTIONS[i]];
            if (!col || typeof col !== "object") continue;
            for (var id in col) translateItem(col[id]);
        }
        if (d.hotkeys) {
            for (var hk in d.hotkeys) {
                var h = d.hotkeys[hk];
                if (h && typeof h === "object" && h.description !== undefined) h.description = translateValue(h.description);
            }
        }
        if (d.microtabs) translateMicrotabs(d.microtabs);
        if (d.midsection) translateFormatArray(d.midsection);
        if (d.tabFormat) {
            if (Array.isArray(d.tabFormat)) translateFormatArray(d.tabFormat);
            else if (typeof d.tabFormat === "object") {
                for (var sub in d.tabFormat) {
                    var t = d.tabFormat[sub];
                    if (!t || typeof t !== "object") continue;
                    var zh = translate(sub);
                    if (zh !== sub && t.title === undefined) t.title = zh;
                    if (t.title !== undefined) t.title = translateValue(t.title);
                    if (t.content) translateFormatArray(t.content);
                }
            }
        }
    }

    // ------------------------------------------------------------------
    // 6. Hook: addLayer —— 图层注册时翻译
    // ------------------------------------------------------------------
    var origAddLayer = window.addLayer;
    if (typeof origAddLayer === "function") {
        window.addLayer = function (layerName, layerData, tabLayers) {
            try { translateLayerData(layerData); }
            catch (e) { console.warn("[PTI18N] layer '" + layerName + "' translate failed", e); }
            return origAddLayer(layerName, layerData, tabLayers);
        };
    } else {
        console.warn("[PTI18N] addLayer 未找到，汉化层可能失效");
    }

    // ------------------------------------------------------------------
    // 7. Hook: run() / gridRun() / doPopup()
    // ------------------------------------------------------------------
    function hookRuntime() {
        if (typeof window.run === "function" && !window.__ptRunHooked) {
            window.__ptRunHooked = true;
            var origRun = window.run;
            window.run = function (func, target, args) {
                var r = origRun(func, target, args);
                return (typeof r === "string") ? translate(r) : r;
            };
        }
        if (typeof window.gridRun === "function" && !window.__ptGridHooked) {
            window.__ptGridHooked = true;
            var origGrid = window.gridRun;
            window.gridRun = function (layer, func, data, id) {
                var r = origGrid(layer, func, data, id);
                return (typeof r === "string") ? translate(r) : r;
            };
        }
        if (typeof window.doPopup === "function" && !window.__ptPopupHooked) {
            window.__ptPopupHooked = true;
            var origPopup = window.doPopup;
            window.doPopup = function (type, text, title, timer, color, image) {
                if (typeof text === "string") arguments[1] = translate(text);
                if (typeof title === "string" && title !== "" ) arguments[2] = translate(title);
                else if (title === "" || title === undefined) {
                    // 源码里空标题会落到默认英文标题，这里补上译文
                    arguments[2] = translate(type === "achievement" ? "Achievement Unlocked!"
                        : type === "challenge" ? "Challenge Complete" : "Something Happened?");
                }
                return origPopup.apply(this, arguments);
            };
        }
    }

    // ------------------------------------------------------------------
    // 7.5 Hook: alert() / confirm() / prompt() —— 浏览器原生对话框
    //    对话框由浏览器绘制，但**正文文本是页面传进去的**，所以可以翻译；
    //    对话框上的「确定 / 取消」按钮属于浏览器界面，跟随浏览器语言，页面无法改。
    //    prompt 的第二个参数（默认输入值，如重置确认口令）是代码用的字面量，不译。
    // ------------------------------------------------------------------
    function hookDialogs() {
        ["alert", "confirm", "prompt"].forEach(function (name) {
            var orig = window[name];
            if (typeof orig !== "function" || orig.__ptHooked) return;
            var wrapped = function (msg) {
                var args = Array.prototype.slice.call(arguments);
                if (typeof args[0] === "string") args[0] = translate(args[0]);
                return orig.apply(window, args);
            };
            wrapped.__ptHooked = true;
            window[name] = wrapped;
        });
    }

    // ------------------------------------------------------------------
    // 8. Hook: Vue.component —— 模板定点补丁
    //    组件模板里的静态英文不经过任何会返回字符串的函数，只能改模板字面量。
    //    注意：只替换「模板里的纯文本段」，不碰 {{ }} 与 v-bind 表达式。
    // ------------------------------------------------------------------
    var TEMPLATE_PATCH = {
        // 微标签页 / 主标签页按钮：让 title 优先于键名（键名是存档里的 id，不能改）
        "tab-buttons": [
            [">{{tab}}</button>", ">{{data[tab].title ? data[tab].title : tab}}</button>"]
        ],
        // 顶部信息条（overlay-head 模板里的静态英文）
        "overlay-head": [
            ["You have ", "你拥有 "],
            ["Offline Time: ", "离线时间："],
            ["Dev Speed: ", "开发速度："],
            ["Current endgame: ", "当前终局："]
        ],
        "main-display": [
            ["You have ", "你拥有 "]
        ],
        "resource-display": [
            ["You have made a total of ", "累计获得 "],
            ["You have ", "你拥有 "],
            ["You are gaining ", "你每秒获得 "],
            [" per second", ""],
            ["Your best ", "你的最佳 "],
            [" is ", " 为 "]
        ],
        "upgrade": [
            ["<br>Currently: ", "<br>当前："],
            ["<br><br>Cost: ", "<br><br>花费："]
        ],
        "challenge": [
            ["Goal:  ", "目标： "],
            ["Reward: ", "奖励："],
            ["Currently: ", "当前："]
        ],
        "respec-button": [
            ["Respec", "洗点"],
            ["Disable respec confirmation", "禁用洗点确认"]
        ],
        "master-button": [
            ["Click me!", "点我！"]
        ],
        "sell-one": [["Sell One", "出售 1 个"]],
        "sell-all": [["Sell All", "全部出售"]],
        "options-tab": [
            [">Save<", ">保存<"],
            ["Autosave: ", "自动保存："],
            ["HARD RESET", "硬重置"],
            ["Export to clipboard", "导出到剪贴板"],
            [">Import<", ">导入<"],
            ["Import save from clipboard", "从剪贴板导入存档"],
            ["Export save to file", "导出存档到文件"],
            ["Import save from file", "从文件导入存档"],
            ["Action Mode (Not recommended on mobile): ", "操作模式（不推荐手机端）："],
            // 选项值是内部 id（off/on/ultra/…），用 $pt 走整串词典，避免直接改文案
            ["{{ getActionMode() }}", "{{ $pt(getActionMode()) }}"],
            ["{{ getThemeName() }}", "{{ $pt(getThemeName()) }}"],
            ["{{ getNotationName() }}", "{{ $pt(getNotationName()) }}"],
            ["Offline Prod: ", "离线产出："],
            ["Theme: ", "主题："],
            ["Show Milestones: ", "显示里程碑："],
            ["High-Quality Tree: ", "高质量树："],
            ["Completed Challenges: ", "已完成挑战："],
            ["Single-Tab Mode: ", "单标签模式："],
            ["Shift-Click to Toggle Tooltips: ", "Shift+点击切换提示框："],
            ["Sound Effect: ", "音效： "],
            ["Notation: ", "记数法："],
            ["Show Milestone Popups: ", "显示里程碑弹窗："],
            ["?\"ON\":\"OFF\"", "?\"开\":\"关\""],
            ["?\"HIDDEN\":\"SHOWN\"", "?\"隐藏\":\"显示\""],
            ["?\"ALWAYS\":\"AUTO\"", "?\"总是\":\"自动\""],
            // 语言切换按钮：设置页没有可挂载的容器 id，只能改模板末尾的 </table>
            ["</table>",
                "<tr><td colspan=\"3\"><button class=\"opt\" onclick=\"PTI18N.toggle()\">" +
                "<span>{{ $ptLang() }}</span></button></td></tr></table>"]
        ],
        "info-tab": [
            ["Made by ", "作者："],
            ["The Prestige Tree made by Jacorb and Aarex", "The Prestige Tree 由 Jacorb 与 Aarex 制作"],
            [" by Acamaeda and FlamemasterNXF", "，作者 Acamaeda 与 FlamemasterNXF"],
            [">Changelog<", ">更新日志<"],
            ["Time Played: ", "游戏时长："],
            ["<h3>Hotkeys</h3>", "<h3>快捷键</h3>"],
            ["Credits", "致谢"],
            ["Savebank from 'The Plant Tree'", "存档库来自《The Plant Tree》"],
            ["Minigame inspired from 'The Mario Maker 2 Tree'", "小游戏灵感来自《The Mario Maker 2 Tree》"],
            ["Import/Export save from file code from 'The Mario Maker 2 Tree'", "存档文件导入 / 导出代码来自《The Mario Maker 2 Tree》"],
            ["Pixabay for the Upgrade/MS/Buyable/Ach sound effects", "升级 / 里程碑 / 可购买项 / 成就音效来自 Pixabay"],
            ["Some beta testers", "以及各位参与测试的玩家"],
            ["Infinity Notation by unicodes", "无限记数法：unicodes"],
            ["Main Point Tree server", "点数树主服务器"],
            ["The Point Tree Discord", "点数树 Discord"],
            ["Incremental Games Plaza Account", "Incremental Games Plaza 账号"]
        ]
    };

    // 模板补丁产物集合：这些字符串是「已成型的译文」，translate() 直接原样返回，
    // 免得其中的英文专名（Prestige Tree / The Modding Tree …）再被子串词条改写
    var PROTECTED = (function () {
        var s = {};
        for (var c in TEMPLATE_PATCH) {
            var rules = TEMPLATE_PATCH[c];
            for (var i = 0; i < rules.length; i++) s[rules[i][1]] = 1;
        }
        return s;
    })();

    function patchTemplate(name, tpl) {
        var rules = TEMPLATE_PATCH[name];
        if (rules) {
            for (var i = 0; i < rules.length; i++) {
                // 英文模式下跳过文案翻译类补丁，只保留「结构类」补丁（语言按钮注入）
                if (!ENABLED && rules[i][0] !== "</table>") continue;
                tpl = tpl.split(rules[i][0]).join(rules[i][1]);
            }
        }
        return tpl;
    }

    if (window.Vue && typeof window.Vue.component === "function") {
        var origComponent = window.Vue.component;
        window.Vue.component = function (name, options) {
            // 注意：Vue.component(name) 也是取值方式，此时 options 为 undefined
            if (typeof name === "string" && options && typeof options.template === "string") {
                // 语言按钮必须**无条件**注入（英文模式下也要有，否则切到英文就找不回入口）；
                // 其余汉化补丁只在中文模式下生效。
                if (name === "options-tab") {
                    try { options.template = patchTemplate(name, options.template); }
                    catch (e) { console.warn("[PTI18N] template patch '" + name + "' failed", e); }
                } else if (ENABLED) {
                    try { options.template = patchTemplate(name, options.template); }
                    catch (e) { console.warn("[PTI18N] template patch '" + name + "' failed", e); }
                }
            }
            return origComponent.apply(this, arguments);
        };
    }

    // Vue 模板里可直接调用的翻译助手：设置页那些「值型插值」
    // （{{ getActionMode() }} 等）用它走整串词典，避免去改选项 id
    if (window.Vue && window.Vue.prototype) window.Vue.prototype.$pt = translate;
    // 语言按钮文字：随当前语言动态显示
    if (window.Vue && window.Vue.prototype) {
        window.Vue.prototype.$ptLang = function () {
            return ENABLED ? "语言：中文（点此切换 English）" : "Language: English (click for 中文)";
        };
    }

    // ------------------------------------------------------------------
    // 9. 兜底：DOM 文本节点观察器
    //    处理 index.html 静态文案、运行期拼接插入的文本等
    // ------------------------------------------------------------------
    var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, CODE: 1, PRE: 0 };

    function translateTextNode(node) {
        var t = node.nodeValue;
        if (!t || !/[A-Za-z]{2}/.test(t)) return;
        if (node.__ptDone === t) return;
        // 源码里跨行缩进、带首尾空白的文案（index.html 的 Discord 链接、changelog 每行后跟的
        // <br> 前空格等）会带一串换行 / 制表符 / 尾随空格，词典键是压平后、去首尾空白的形态。
        // 注意顺序：**先看哪个形态能整句命中词典**，再看碎片替换的结果。
        // 早期版本是「压平后只要有碎片改动就收工」，于是带数字的长句（如 changelog 里
        // 被游戏展开成 50,000,000 的那行）只被碎片规则改了一半，中英混杂。
        var cands = [t];
        if (/\s{2,}|\n|^\s|\s$/.test(t)) {
            var flat = t.replace(/\s+/g, " ");
            cands.push(flat);
            if (flat.trim() !== flat) cands.push(flat.trim());
        }
        var zh = null, ci;
        for (ci = 0; ci < cands.length; ci++) {
            if (lookupKey(cands[ci]) !== null) { zh = translate(cands[ci]); break; }
        }
        if (zh === null) {
            // 没有整句词条：退回「逐级压平 + 碎片替换」，取第一个有改动的结果
            zh = translate(t);
            for (ci = 1; ci < cands.length && zh === t; ci++) {
                var z = translate(cands[ci]);
                if (z !== cands[ci]) zh = z;
            }
        }
        if (zh !== t) {
            node.__ptDone = zh;      // 记录「我们自己写进去的值」，防止自己触发自己
            node.nodeValue = zh;
        } else {
            node.__ptDone = t;
        }
    }

    function walkDom(root) {
        if (!root) return;
        if (root.nodeType === 3) { translateTextNode(root); return; }
        if (root.nodeType !== 1) return;
        if (SKIP_TAGS[root.tagName] === 1) return;
        var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        var n;
        while ((n = tw.nextNode())) {
            var p = n.parentNode;
            if (p && SKIP_TAGS[p.tagName] === 1) continue;
            translateTextNode(n);
        }
    }

    function startDomHook() {
        walkDom(document.body);
        var mo = new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
                var m = muts[i];
                if (m.type === "characterData") {
                    if (m.target.__ptDone !== m.target.nodeValue) translateTextNode(m.target);
                } else if (m.type === "childList") {
                    for (var j = 0; j < m.addedNodes.length; j++) walkDom(m.addedNodes[j]);
                }
            }
        });
        mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    }

    // ------------------------------------------------------------------
    // 10. 语言切换
    // ------------------------------------------------------------------
    function setLanguage(l) {
        try { localStorage.setItem(LS_KEY, l); } catch (e) { /* ignore */ }
        location.reload();
    }

    // ------------------------------------------------------------------
    // 11. 启动
    // ------------------------------------------------------------------
    window.PTI18N = {
        t: translate,
        lang: function () { return lang; },
        toggle: function () { setLanguage(lang === "zh-CN" ? "en" : "zh-CN"); },
        stats: function () {
            var n = 0, k;
            for (k in exact) n++;
            for (k in fragment) n++;
            return { exact: Object.keys(exact).length, fragment: Object.keys(fragment).length, total: n, enabled: ENABLED };
        }
    };

    // 接管标签页标题（游戏在 utils.js 里会把它设成英文 modInfo.name）
    function applyTitle() {
        try {
            var want = ENABLED ? "点数树 The Point Tree" : "The Point Tree";
            if (document.title !== want) document.title = want;
        } catch (e) { /* ignore */ }
    }

    function boot() {
        hookRuntime();
        hookDialogs();
        // 标签页标题：原版 index.html 没有 <title>，且 js/utils.js:343 会写
        // `document.title = modInfo.name`（纯英文）。标题属于浏览器窗体文字，
        // 但内容由页面决定，所以可以本地化 —— 在游戏加载完成后接管一次。
        applyTitle();
        startDomHook();
        applyTitle();
        setInterval(function () { hookRuntime(); applyTitle(); }, 500);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
    // run()/doPopup() 在 utils.js 之后才定义，这里补一次
    setTimeout(hookRuntime, 0);
    setTimeout(hookRuntime, 200);
    hookDialogs();
})();

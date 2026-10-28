# 简体中文汉化层（The Point Tree）

本目录是该游戏的**简体中文汉化层**，采用「加载期拦截 + 运行时词典替换」方案，
**不修改任何游戏源码**（`js/` 下一行未动），因此上游更新时可以干净合并。

方案沿用同目录工作区里《天体增量树》汉化项目的做法：词典 + 引擎 + 语言切换 + 覆盖率审计。

## 文件

| 文件 | 作用 |
|---|---|
| `zh_CN.js` | 词典：`window.PT_I18N = { "zh-CN": { exact: {…}, fragment: {…} } }`，共 **3,256** 条（exact 2,978 + fragment 278） |
| `i18n.js` | 翻译引擎：包装 `addLayer` / `run` / `gridRun` / `doPopup` / `alert`·`confirm`·`prompt` / `Vue.component`，并用 `MutationObserver` 兜底，同时接管标签页标题 |

### 哪些「浏览器窗体里的字」能汉化

| 位置 | 能否汉化 | 原因 |
|---|---|---|
| `alert` / `confirm` / `prompt` 的正文 | ✅ 可以 | 文字由页面传入，引擎包装这三个函数即可 |
| 浏览器标签页标题 | ✅ 可以 | `document.title` 由页面控制 |
| 对话框上的「确定 / 取消」按钮 | ❌ 不行 | 浏览器自带 UI，跟随浏览器界面语言 |
| 地址栏、右键菜单、另存为、打印、「离开此网站？」提示 | ❌ 不行 | 全部由浏览器绘制，网页无权修改；想让它们变中文只能改浏览器语言设置 |

## 接入方式

`index.html` 里在 `js/mod.js` 之后、`js/technical/loader.js` 之前引入（顺序不能反：
`addLayer` 由 `layerSupport.js` 定义，图层文件由 `loader.js` 装载，引擎必须夹在中间）：

```html
<script src="localization/zh_CN.js"></script>
<script src="localization/i18n.js"></script>
```

> 另外给 `index.html` 补了 `<meta charset="utf-8" />`。原文件没有声明字符集，
> 浏览器会按本地编码（中文 Windows 是 GBK）解析，UTF-8 的中文会把相邻的引号字节吞掉，
> 直接报 `SyntaxError`。这一行是汉化层能工作的前提，也是原文件的缺陷。

## 引擎工作原理（The-Modding-Tree 引擎）

1. **注册期**：包装 `addLayer`，深度遍历图层数据，翻译显示字段
   （`name` / `title` / `description` / `display` / `effectDisplay` / `requirementDescription` /
   `tooltip` / `body` / `resource` / `respecText` …）；函数型字段包一层，**求值后**翻译返回值。
   `tabFormat` / `midsection` / `microtabs` 的数组载荷按「文本型组件」逐个翻译。
2. **渲染期**：包装 `run()` / `gridRun()`（所有 `v-html` 文本都经它们）、`doPopup()`（弹窗标题与正文）。
3. **浏览器原生对话框**：包装 `alert()` / `confirm()` / `prompt()`。
   对话框是浏览器画的，但**正文是页面传进去的字符串**，所以可以翻译
   （如进入小游戏时的 `Your current progress will not be saved!` → 「你当前的进度不会被保存！」）。
   对话框上的「确定 / 取消」按钮属于浏览器界面，跟随浏览器语言，页面无法改。
   `prompt()` 的第二个参数（默认输入值）和需要玩家原样输入的口令
   （`I WANT TO RESET THIS`）保持英文 —— 否则代码里的字面量比对会失败。
4. **标签页标题**：`js/utils.js:343` 会写 `document.title = modInfo.name`（纯英文），
   引擎在加载完成后接管为「点数树 The Point Tree」。
5. **模板补丁**：组件模板里的静态英文（`Cost:`、`Goal:`、设置页按钮、信息页致谢等）
   不经过任何会返回字符串的函数，只能在 `Vue.component()` 注册前改模板字面量。
6. **兜底**：`MutationObserver` 监听 DOM 文本节点，处理 `index.html` 静态文案与运行期拼出的串。
7. **匹配**：所有词条按长度降序合成**一条正则**一次替换；纯字母键自动加 `\b` 边界。

### exact 与 fragment

- `exact`：整串相等时优先命中，同时**也参与子串替换**——因为大量文案是
  `"0.000 " + resource` 这类拼接串，只靠整串永远匹配不上。
- `fragment`：动态拼接的静态片段（源码里 `"…" + format(x) + "…"`）、标签内的标签词。

### 四类保护（避免误伤非展示内容）

| 保护 | 解决什么 |
|---|---|
| **HTML 标签整体保护** | 正则里追加 `<[^>]*>` 分支，标签内属性名/样式/路径不被替换（`style='width:40px'`、`onclick=…` 保持原样） |
| **资源路径掩码** | `resources/…`、`css/…`、`js/…` 等路径先掩码再还原，避免出现 `resources/宠物/…` |
| **id 形态 token 掩码** | `A2-Iridite-Battle-End` 这类短横连接内部 id 整体掩码，避免被单词级词条逐段误译；但「词典里有干净整串译文」的显示名（`Anti-Dragon`）照常翻译 |
| **纯单词键右向守卫** | `width` / `cap` 这类单词键后紧跟 `'` `"` `=` 或 `:`+值 时不匹配，`style='width:69px'` 不会被译成 `宽度` |
| **译文幂等** | 若输入本身就是某条译文，直接返回；模板补丁产物登记为 `PROTECTED`，避免 `"The Prestige Tree 由 … 制作"` 里的 `Prestige` 被二次译成「威望」 |

## 语言切换

游戏内 **设置页最下方 → 「语言：中文（点此切换 English）」**，选择写入 `localStorage`，切换后自动刷新。
也支持 URL 参数：`index.html?lang=en` / `index.html?lang=zh-CN`。

## 术语口径

见工作区 `汉化术语表.md`。要点：货币名意译（点数碎片 / 基础点数 / 重生点数 / 威望点数 /
超级点数 / 至尊点数 / 纪元晶体 / 纪元碎片），缩写（PF / BP / RP / PP / MP / SP / EC / EF）
一律保留英文；升级编号（MU31 / PU22 / ErUp 35 / SB5 / MA86）保留原样。

## 维护须知

1. **单行探测通过 ≠ 页面渲染通过。** 更新日志是 `let changelog = \`…\`` 生成的一整块 HTML，
   走的是长串路径而不是整条 exact；改完词典要跑一次整块对拍。
2. **别拿 CSS 属性名或代码标识符当词条。** 单词型 fragment 键极易撞样式与 JS。
3. **术语译文里的并列符号用 `、`，不要用 `-`**，否则会被 id 掩码规则吃掉。
4. **词典是 CRLF 无关的**（本文件由脚本生成，UTF-8 无 BOM），改动请改 `tools/parts/*.json` 后重跑生成脚本，
   不要手改 `zh_CN.js`。
5. **想回到英文原版**：删掉 `index.html` 里那两行 `<script src="localization/…">` 即可，
   源码零改动、存档通用。

## 审计数据（生成时）

- 词典：3,256 条；`exact` 2,978 / `fragment` 278
- 全层遍历（19 个图层 × 全部子标签页）：**纯英文残留 2 条**，均为作品名
  （`The Point Tree`、`The Modding Tree`），有意保留
- 英文模式（`?lang=en`）回归：界面与原版一致，无中文残留、无脚本报错

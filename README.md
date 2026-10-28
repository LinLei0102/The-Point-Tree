# The Point Tree · 点数树（简体中文汉化）

> 基于 The-Modding-Tree 引擎的增量游戏《The Point Tree》，作者 **randim82**。
> 本仓库是 **LinLei0102 的 fork**，额外挂载了一套**简体中文汉化层**。

当前分支 **`point`** 对应游戏 **v4.1「新重置层、技能树以及更多！」**
（新增细菌 / 技能树层、RNG 小游戏层、纪元 4、精通挑战 3）。

---

## 怎么玩

**本地**：克隆或下载后**直接双击 `index.html`**。纯前端、无需构建、无需起服务器。

```bash
git clone -b point git@github.com:LinLei0102/The-Point-Tree.git
```

**在线**：本仓库暂未开启 GitHub Pages。想开的话：
`Settings → Pages → Source 选 Deploy from a branch → 分支 point、目录 / (root) → Save`，
之后即可用 `https://linlei0102.github.io/The-Point-Tree/` 打开。

**切换语言**：设置页（齿轮）最下方的「语言：中文（点此切换 English）」，或在地址后加
`?lang=en` / `?lang=zh-CN`。切换后自动刷新，存档通用。

## 分支

| 分支 | 游戏版本 | 说明 |
|---|---|---|
| **`point`** | **v4.1** | **最新版**，汉化最完整，推荐 |
| `master` | v3.6S | 旧版本，同样带汉化，但不含 v4.1 新增内容 |

## 汉化

汉化以**独立目录**形式挂载，**不修改 `js/` 下任何游戏源码**：

```
localization/
├── zh_CN.js      词典（3,978 条：exact 3,608 + fragment 370）
├── i18n.js       引擎（包装 addLayer / run / doPopup / alert·confirm·prompt / Vue.component + DOM 兜底）
├── README.md     汉化层原理、保护机制、维护须知
├── 术语表.md      统一译名（货币 / 机制 / 层名 / 稀有度 / 保留英文的专名）
└── 验收报告.md    覆盖率实测、功能验证、已知取舍
```

`index.html` 里只多三行：`<meta charset="utf-8">` 与两个 `<script src="localization/…">`。
**想回到英文原版**：删掉那两行 script 即可，存档通用。

覆盖情况：21 个图层（含设置页、信息页、更新日志）全层遍历后，**纯英文残留仅 2 条**，
均为作品名（The Point Tree / The Modding Tree）。

> 浏览器自绘的界面（对话框的「确定 / 取消」、地址栏、右键菜单）页面无权修改；
> `alert` / `confirm` / `prompt` 的**正文**与标签页标题已汉化。

## 原作与致谢

- 游戏：**The Point Tree** — randim82（[Discord](https://discord.com/invite/RRK9Dwzf6P)）
- 引擎：**The Modding Tree** — Acamaeda、FlamemasterNXF
- 前身：**The Prestige Tree** — Jacorb、Aarex
- 音效素材：Pixabay；存档文件导入 / 导出代码参考自《The Mario Maker 2 Tree》
- 汉化：LinLei0102

> 引擎自带文档仍保留在 [`docs/`](docs/!general-info.md)（The-Modding-Tree 原始文档，供改 MOD 参考）。

## 许可

本仓库沿用上游的 MIT 许可（见 `LICENSE` 与 `Prestige-tree-license`）。
游戏与引擎版权归原作者所有；`localization/` 下的汉化文件同样以 MIT 发布，
可整体删除而不影响游戏运行。

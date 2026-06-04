---
name: zblog-editorial-pass
description: Edits 老Z的博客 posts in docs/_posts to reduce generic AI tone while keeping facts, code, and compliance text—per docs/EDITORIAL-PASS-PLAN.md. Use for 去AI味, 润色博文, editorial pass, or making _posts sound like personal tech notes.
---

# zblog：博文编辑润色（去 AI 腔）

维护计划：`docs/EDITORIAL-PASS-PLAN.md`（不发布）。与全局 skill `de-ai-writing` 互补：本 skill **绑定本仓库** 的保留项与版式。

## 何时执行

- 新文初稿写完后 **通读一遍**
- 用户要求：去 AI 味、润色、编辑 pass、读起来像人写的技术笔记
- 长文按章润色（PCI、SEO 指南等），避免单次巨大 diff

## 必须保留（勿为「去味」删掉）

- 事实、版本号、法规名、产品名、RFC/标准引用
- 公式、代码块、Mermaid、表格数据
- 合规免责声明（PCI 等）
- 站内/官方外链

## 必须遵守的版式

润色时同步检查 `.cursor/rules/zblog-markdown-posts.mdc`：

- 中文与 `**` 之间半角空格
- 折叠块公式用 `::: details`，不用 `<details>`
- 站内链 `./slug.html`

## 替换方向（非机械全文替换）

| 少写 | 可改成 |
| --- | --- |
| 在当今 / 随着…的发展 | 直接写场景或问题 |
| 本文将从 A、B、C 三个维度 | 下面分三块 / 先…再… |
| 扮演着至关重要的角色 | 做 X 时绕不开 / 常见用法是 |
| 深入解析 / 全面梳理 | 按步骤捋 / 把名词对齐 |
| 赋能 / 闭环 / 抓手 | 删掉或改成具体结果 |
| 综上所述 | 删掉或一句收束 |

## 语气目标

- 像 **个人技术笔记**：有取舍、有场景，偶尔第一人称（「我觉得」「说白了」适度）
- 长短句交错；忌整段排比、报告朗诵感
- 小节引导 1～2 句口语即可，不必每章「本节将介绍」

## 工作流

1. 读 frontmatter 与首段：标题营销词可保留，正文 `##` 宜具体。
2. 只改 **叙述句**；不动代码缩进与表格数字。
3. 抽读 3 段（文首、中段、小结）：读出声无朗诵感。
4. 计划中把该文标 **②**（若维护 EDITORIAL-PASS-PLAN 表）。

## 提交

`docs(editorial): pass · <slug>` 或合并在 `docs(post):` 提交里说明润色。

## 关联 skill

- 结构：`.cursor/skills/zblog-tech-article-structure/SKILL.md`
- 新建：`.cursor/skills/zblog-new-tech-post/SKILL.md`

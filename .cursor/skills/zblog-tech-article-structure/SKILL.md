---
name: zblog-tech-article-structure
description: Outlines structure and narrative patterns for long-form Chinese technical posts on 老Z的博客—disambiguation tables, diagrams, sections, code, and closings. Use when planning, outlining, or restructuring a 技术文章 in docs/_posts.
---

# zblog：技术文章结构

面向 **说清概念 + 能照着做** 的长文，不是营销稿。参考范本：`docs/_posts/codex-hook-review-guide.md`、`mainstream-ai-coding-tools-comparison.md`、`claude-code-advanced-usage-guide.md`。

## 推荐骨架

```text
Frontmatter
→ 首段（问题/场景/易混点）
→ 姊妹篇 + 官方链接（可选）
→ 「先分清 X」对照表（多义词、多产品时强烈建议）
→ 分章讲解（由浅入深或按工作流）
→ 实操 / 配置示例（可复制）
→ 踩坑 / 清单
→ 小结（3～6 条 bullet，不写「综上所述」）
→ 参考链接
```

## 何时用哪种块

| 块类型 | 何时用 | 注意 |
| --- | --- | --- |
| **对照表** | 两个以上同名/近义概念（Review vs trust、CLI vs Agent） | 表内加粗用 `<strong>` 或中英文空格规则 |
| **Mermaid** | 流程、时序、架构关系 | 见 `zblog-markdown-vuepress`；节点 id 勿用单字母 `L` |
| **代码块** | 命令、配置、hook 脚本 | 标语言；长脚本可只示核心段 + 注释省略 |
| **`::: tip` / `::: warning`** | 合规、安全、易错点 | Hope 容器；PCI/密钥类用 warning |
| **`::: details`** | 折叠推导、自测答案 | **有公式必须用此容器**，不用原生 `<details>` |
| **分栈/场景节** | 读者技术栈不同（React/Go、双闸协作） | 各节自给自足，避免来回跳 |

## 章节标题

- 正文 `##`：具体动作或对象，如「Codex Hooks 与 Git Hooks：区别、关联与协作」
- 少用：「深度解析」「完全指南」「全面梳理」（SEO 可留在 `title`，正文另写）
- 三级 `###`：步骤、模式、示例（「1）提交前」「模式 C」）

## 叙述习惯（本博客）

- **先对齐名词，再展开机制**；产品对比文先画「工具 vs 模型」维度。
- **一段只推进一个论点**；列表项说清「是什么 / 何时用 / 别和什么混」。
- 时效内容（模型名、定价）加一句 **以官方当期为准** + 链接。
- 结尾 **小结** 用 bullet 回扣文首混淆点，不重复全文。

## 系列文

- 计划/目录：`llm-from-scratch-series-plan.md` 式，可短。
- 日课/连载：文首链上一篇/下一篇；公式与符号与系列前文一致。
- 姊妹篇互链：工具选型 ↔ 模型族 ↔ 具体实践（如 Codex 三篇关系）。

## 动笔前 5 问

1. 读者读完能 **做哪一件事**（配置 hook、选型、排障）？
2. 最容易 **误解** 的一点是什么？→ 文首或第一张表。
3. 哪些内容已有旧文？→ 链过去，只写增量。
4. 是否需要 **可抄仓库路径**（`scripts/checks/`、`.codex/hooks.json`）？
5. 哪些段适合 **图** 代替千字 prose？

## 配套 skill

- 版式：`.cursor/skills/zblog-markdown-vuepress/SKILL.md`
- 去 AI 腔：`.cursor/skills/zblog-editorial-pass/SKILL.md`

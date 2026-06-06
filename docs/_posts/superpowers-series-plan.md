---
title: Superpowers 系列总目录：Agent Skill 工作流地图
date: 2026-06-06
categories:
  - AI大模型
tags:
  - Superpowers
  - Agent Skills
  - Cursor
  - AI编程
  - 工作流
  - 系列
author: 老Z
---

本文是 **「Superpowers」系列** 的总目录：按 **Agent 协作工作流** 顺序介绍 [obra/superpowers](https://skills.sh/obra/superpowers) 这套开源 skill 套件——从「先 invoke skill 再动手」到规划、执行、质量、收尾。正文偏 **概念与决策**，具体 IDE 命令放在各篇附录。

姊妹篇（Skills 安装与目录结构，不重复展开）：[Claude Code 进阶：MCP、Skills 与自用习惯](./claude-code-advanced-usage-guide.html)。

## 使用方式

- **阅读顺序**：严格按 Part 1 → Part 6；每篇文首有上一篇 / 下一篇链接。
- **与 AI 协作**：在对话里说「继续 Superpowers Part N」即可按该篇主题扩写或答疑。
- **进度维护**：每发一篇，把下表「状态」改为已发布并补上链接。

## 总体规划

**主线**：Skill 纪律 → **规划**（brainstorm + 计划）→ **执行**（隔离 + 跨会话 / 子 Agent / 并行）→ **质量**（TDD + 调试 + 验证 + Review）→ **收尾与自定义 Skill**。

**文件命名**：`superpowers-part-NN-英文短slug.md`（NN 两位数字）。

**覆盖的 14 个 skill**（合并进 6 篇正文，不逐 skill 单开一篇）：

| skill | 并入 Part |
| --- | --- |
| `using-superpowers` | 1 |
| `brainstorming`、`writing-plans` | 2 |
| `using-git-worktrees`、`executing-plans` | 3 |
| `subagent-driven-development`、`dispatching-parallel-agents` | 4 |
| `test-driven-development`、`systematic-debugging`、`verification-before-completion`、`requesting-code-review`、`receiving-code-review` | 5 |
| `finishing-a-development-branch`、`writing-skills` | 6 |

## 篇章一览

| Part | 主题 | 规划文件名 | 核心要点 | 状态 |
|:---:|:---|:---|:---|:---:|
| 1 | 入门：Skill 生态与调用纪律 | [superpowers-part-01-using-superpowers.html](./superpowers-part-01-using-superpowers.html) | Agent Skill 是什么；superpowers 地图；1% 规则；Rigid vs Flexible；反模式自检 | **已发布** |
| 2 | 规划：需求对齐与可执行计划 | [superpowers-part-02-planning.html](./superpowers-part-02-planning.html) | brainstorming 硬门槛；一问一答收 spec；writing-plans 拆任务与检查点 | **已发布** |
| 3 | 执行（上）：隔离 workspace 与跨会话执行 | [superpowers-part-03-execution-isolation.html](./superpowers-part-03-execution-isolation.html) | 为何执行前要隔离；executing-plans 分批落地与 review 检查点 | **已发布** |
| 4 | 执行（下）：子 Agent 与并行派发 | [superpowers-part-04-execution-agents.html](./superpowers-part-04-execution-agents.html) | subagent 逐任务 + 中间 review；多独立故障并行 dispatch | **已发布** |
| 5 | 质量闭环：TDD、调试、验证、Review | [superpowers-part-05-quality.html](./superpowers-part-05-quality.html) | 先红后绿；根因调试；完成前跑命令拿证据；发起与接收 review | **已发布** |
| 6 | 收尾与自定义 Skill | [superpowers-part-06-finish-and-write-skills.html](./superpowers-part-06-finish-and-write-skills.html) | 分支 merge/PR/清理四选一；SKILL.md 结构与 TDD 式验证 | **已发布** |

## 工作流总览

```mermaid
flowchart LR
    P1["Part 1\n调用纪律"] --> P2["Part 2\n规划"]
    P2 --> P3["Part 3\n隔离 + 跨会话执行"]
    P3 --> P4["Part 4\n子 Agent / 并行"]
    P4 --> P5["Part 5\n质量闭环"]
    P5 --> P6["Part 6\n收尾 + 写 Skill"]
```

## 标签与分类

新篇沿用：**分类** `AI大模型`；**标签** 含 `Superpowers`、`Agent Skills`、`系列`。与工具链相关的附录可叠 `建站`。

## 变更记录

| 日期 | 说明 |
| --- | --- |
| 2026-06-06 | 创建系列计划；发布 Part 1 |
| 2026-06-06 | 发布 Part 2（规划篇） |
| 2026-06-06 | 发布 Part 3（执行上：隔离 + executing-plans） |
| 2026-06-06 | 发布 Part 4（执行下：subagent + 并行） |
| 2026-06-06 | 发布 Part 5（质量闭环） |
| 2026-06-06 | 发布 Part 6（收尾 + writing-skills）；**系列完结** |

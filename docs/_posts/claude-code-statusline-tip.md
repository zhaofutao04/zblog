---
title: Claude Code 小技巧：用 /statusline 定制底部状态栏（上下文、费用、Git 一眼看清）
date: 2026-04-10
categories:
  - AI大模型
  - 建站
tags:
  - Claude Code
  - statusline
  - 终端
  - 开发效率
  - 小技巧
author: 老Z
---

长会话写代码时，最怕两件事：**上下文快满了还在猛聊**，以及**费用和限速心里没数**。Claude Code 底部有一条可定制的 **status line（状态栏）**，官方提供了 **`/statusline` 斜杠命令**，用自然语言描述需求就能自动生成脚本并写入配置。下文先讲官方机制与手写要点，再介绍社区里高定制的 **[ccstatusline](https://github.com/sirmalloc/ccstatusline)**，以及 **ccusage**、**tweakcc** 等周边工具怎么选。

> 官方文档：[Customize your status line](https://docs.claude.com/en/docs/claude-code/statusline)（英文，字段最全）。  
> 本博客相关长文：[Claude Code 进阶：MCP、Skills](./claude-code-advanced-usage-guide.html)。

## `/statusline` 能帮你做什么

在 Claude Code 对话里输入 **`/statusline`**（文档里多为小写；以你当前 CLI 里补全显示为准），后面跟**自然语言**，描述你希望底部显示什么。Claude 会：

1. 在 **`~/.claude/`** 下生成（或更新）状态栏脚本；  
2. 自动改 **`~/.claude/settings.json`**（或项目级配置）里的 `statusLine` 段。

**典型需求示例**（可直接复制改一改）：

```text
/statusline show model name and context percentage with a progress bar
```

```text
/statusline 显示模型名、当前目录名、上下文使用百分比和会话累计费用（美元）
```

适合的场景包括：盯着 **context 占用**、看 **session 费用**、扫一眼 **Git 分支/目录**、区分多会话等 —— 官方说明里强调：状态栏脚本**在本地执行，不消耗 API token**。

## 不想手写配置时：优先用命令

手动维护 Bash + `jq` 当然可以（见下文），但日常最省脑的是：**先用 `/statusline` 生成一版**，再按需改文案或字段。生成不对时，可以继续对话细化，例如「把进度条改成两行，第一行 Git 分支，第二行上下文」。

## 手动配置长什么样（心里有数即可）

若你已有脚本路径，配置核心是 `statusLine.type = "command"`，以及要执行的 `command`：

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2
  }
}
```

- **`command`**：在 shell 里跑，可以是脚本路径，也可以是**内联命令**（例如用 `jq` 从 stdin 读 JSON 拼一行字符串）。  
- **`padding`**（可选）：额外左右留白字符数，默认 `0`。

配置可放在**用户级** `~/.claude/settings.json`，也可按官方说明放在**项目级** settings，便于团队统一风格。

## 底层机制（理解一次，后面都顺）

1. Claude Code 按一定频率把你的**会话状态打成 JSON**，通过 **stdin** 喂给 `command`。  
2. 你的脚本从 stdin 读完 JSON，**往 stdout 打印什么，底部就显示什么**（可多行）。  
3. **何时刷新**：官方写明会在例如**新的助手消息之后**、**权限模式变化**、**vim 模式切换**等时机更新；有 **300ms 防抖**；若上一次脚本还在跑又触发更新，**正在跑的那次会被取消**。  
4. 改脚本后通常要等到**下一次会触发刷新的交互**才会看到效果。

因此：**脚本要快、少阻塞**；需要复杂逻辑时避免每次起很慢的子进程链。

## 常用 JSON 字段（做自定义时查表用）

完整字段与示例 JSON 以官方页为准，这里只列高频项：

| 用途 | 可参考字段 |
|------|------------|
| 模型 | `model.display_name`、`model.id` |
| 目录 | `workspace.current_dir`、`workspace.project_dir` |
| 上下文 | `context_window.used_percentage`、`context_window.remaining_percentage`、`context_window.context_window_size` |
| 费用与时间 | `cost.total_cost_usd`、`cost.total_duration_ms`、`cost.total_api_duration_ms` |
| 限速 | `rate_limits.five_hour.used_percentage`、`rate_limits.seven_day.used_percentage` 及对应 `resets_at` |
| 会话 | `session_id`、`session_name`、`transcript_path` |

要做 **彩色 Git 状态**、**OSC 8 可点击链接** 等，官方文档里有现成例子（依赖终端是否支持 ANSI / 超链接）。

## 社区方案：[ccstatusline](https://github.com/sirmalloc/ccstatusline)（高可定制 + TUI）

若你想要 **Powerline 风格、多行状态栏、可视化搭积木**，而不想长期手搓 `jq`，可以试 **[ccstatusline](https://github.com/sirmalloc/ccstatusline)**（MIT）。它是专为 **Claude Code CLI** 设计的 **status line 格式化器**：同样走官方的 **`statusLine.type: "command"`**，由 Claude Code 把 JSON 从 stdin 喂进来，它负责渲染成底部一行或多行。

**大致能力**（具体 widget 与版本说明以仓库 README 为准）：

- **交互配置**：`npx -y ccstatusline@latest` 或 `bunx -y ccstatusline@latest` 打开内置 TUI，增删排序组件、改配色、预览效果；可一键把命令写进 **`~/.claude/settings.json`**。  
- **Powerline / 主题**：箭头分隔、真彩色、多内置主题；支持配置**多条独立状态行**（不再限于「挤在一行」）。  
- **常用 Widget 示例**：模型名、输出样式、Git 分支 / 变更行数 / worktree、当前目录、各类 token 计数与 **输入输出速度**、上下文长度与百分比（含「可用上下文」口径）、会话时钟、**Session 费用（美元）**、**5 小时 block** 与重置倒计时、终端宽度、Claude Code 版本、自定义文本 / **自定义 shell 命令**、**OSC 8 可点击链接**、Skills 展示、Vim 模式、Thinking effort、系统内存等。  
- **配置位置**：界面设置多在 **`~/.config/ccstatusline/settings.json`**；与 Claude 的衔接仍落在 `statusLine.command`（例如 `npx -y ccstatusline@latest`）。  
- **环境变量**：Claude 配置不在默认路径时用 **`CLAUDE_CONFIG_DIR`**；部分 **Usage** 类组件会直连 Anthropic 用量接口，可走大写 **`HTTPS_PROXY`**（仓库说明里有写）。

与 **`/statusline`** 的关系：**官方命令**适合「描述需求 → 生成脚本」快速落地；**ccstatusline** 适合长期维护、追求组件化和颜值。二者底层都是 **stdin JSON → 命令 → stdout**，可按需切换或保留官方生成的脚本。

> Windows：仓库声明支持 PowerShell / cmd / WSL；Powerline 需配合 **Nerd Font** 等终端字体，详见其 README 的 Windows 小节。

## 还有哪些相关工具（怎么选）

| 方向 | 代表项目 | 说明 |
|------|----------|------|
| **用量 / 成本可视化** | [ccusage](https://ccusage.com/guide/statusline) 的 *Statusline Integration* | 侧重会话成本、burn rate、上下文占比等；可在 `settings.json` 里把 **`command`** 设为 `bun x` / `npx` 调用其 `statusline` 子命令。与 ccstatusline **不是互斥**：ccstatusline 文档里演示过用 **Custom Command** 嵌套跑 `ccusage`，把用量条嵌进自己的布局。 |
| **整体 UI / 主题 / 提示词** | [tweakcc](https://github.com/Piebald-AI/tweakcc) | 定位是 Claude Code **主题、系统提示、输入高亮、thinking 文案与动效** 等「整壳」定制，**不是**专职 statusline 渲染器；但若你正在折腾终端观感，可与上述 statusline 方案搭配使用（安装方式与权限以该仓库为准）。 |
| **社区变体** | 如 GitHub 上带 *ccstatusline* / *claude* + *statusline* 关键字的 fork、实验项目 | 功能可能更垂直（例如偏用量聚合）；建议看 **最近提交时间、Issue 活跃度、是否明确支持当前 Claude Code JSON 字段** 再决定是否上生产环境。 |

**选用建议**：只要显示 **两三项**、零依赖 → 优先 **`/statusline`** 或自写短脚本；要 **多组件 + 主题 + 可维护** → **[ccstatusline](https://github.com/sirmalloc/ccstatusline)**；要 **账单 / 消耗盯得紧** → 加 **[ccusage](https://ccusage.com/guide/statusline)**（单独或嵌套）；要 **换肤、动效、提示词** → 再看 **tweakcc**。工具链变化快，**以各项目当前文档为准**。

## 关闭或还原

- 对话里：**`/statusline delete`**、**`clear`**、**`remove`** 这类说法，让助手帮你拆掉状态栏（官方示例写法）。  
- 或手动删掉 `settings.json` 里的 **`statusLine` 整段**。

## 实操建议（小技巧汇总）

1. **先 `/statusline` 再微调**：比从零写 `jq` 快，尤其适合不常写 shell 的同学。  
2. **上下文条 + 模型名** 作为默认套餐，长对话时最有安全感。  
3. **费用与 5 小时 / 7 天限速** 若你账号有显示，可让状态栏一并展示，避免突然撞墙。  
4. 脚本保持**短、快**；需要 `jq` 的机器先 `brew install jq`（macOS）或按发行版安装。  
5. Windows 用户请看官方文档中的 **PowerShell / Git Bash** 小节，路径与 shebang 与 Unix 示例不同。  
6. 想要 **多行 Powerline、TUI 配组件** 时，优先装 **[ccstatusline](https://github.com/sirmalloc/ccstatusline)** 试跑，再决定要不要卸掉自写脚本。

## 小结

**`/statusline`** = 用自然语言定制 Claude Code **底部状态栏**的入口：自动生成脚本 + 写配置。本质是 **stdin JSON → 你的命令 → stdout 文本**。把「上下文、费用、目录、限速」里你最关心的两三项固定在脸上，长项目会话会舒服很多。

需要 **可视化编辑、Powerline、多 Widget** 时，可看社区项目 **[ccstatusline](https://github.com/sirmalloc/ccstatusline)**；要 **用量与成本条** 可配合 **[ccusage](https://ccusage.com/guide/statusline)**。若你还想扩展 Claude Code 与外部工具联动，可继续读 [MCP 与 Skills 那篇](./claude-code-advanced-usage-guide.html)；状态栏本身不替代 MCP，但和「长时间盯屏开发」非常搭。

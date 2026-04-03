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

长会话写代码时，最怕两件事：**上下文快满了还在猛聊**，以及**费用和限速心里没数**。Claude Code 底部有一条可定制的 **status line（状态栏）**，官方提供了 **`/statusline` 斜杠命令**，用自然语言描述需求就能自动生成脚本并写入配置 —— 这篇只讲这条命令和与之配套的最小必要知识，方便你快速用上、少踩坑。

> 官方文档：[Customize your status line](https://docs.claude.com/en/docs/claude-code/statusline)（英文，字段最全）。  
> 本博客相关长文：[Claude Code 高级用法完全指南](./claude-code-advanced-usage-guide.html)。

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

## 关闭或还原

- 对话里：**`/statusline delete`**、**`clear`**、**`remove`** 这类说法，让助手帮你拆掉状态栏（官方示例写法）。  
- 或手动删掉 `settings.json` 里的 **`statusLine` 整段**。

## 实操建议（小技巧汇总）

1. **先 `/statusline` 再微调**：比从零写 `jq` 快，尤其适合不常写 shell 的同学。  
2. **上下文条 + 模型名** 作为默认套餐，长对话时最有安全感。  
3. **费用与 5 小时 / 7 天限速** 若你账号有显示，可让状态栏一并展示，避免突然撞墙。  
4. 脚本保持**短、快**；需要 `jq` 的机器先 `brew install jq`（macOS）或按发行版安装。  
5. Windows 用户请看官方文档中的 **PowerShell / Git Bash** 小节，路径与 shebang 与 Unix 示例不同。

## 小结

**`/statusline`** = 用自然语言定制 Claude Code **底部状态栏**的入口：自动生成脚本 + 写配置。本质是 **stdin JSON → 你的命令 → stdout 文本**。把「上下文、费用、目录、限速」里你最关心的两三项固定在脸上，长项目会话会舒服很多。

若你还想扩展 Claude Code 与外部工具联动，可继续读 [MCP 与 Skills 那篇](./claude-code-advanced-usage-guide.html)；状态栏本身不替代 MCP，但和「长时间盯屏开发」非常搭。

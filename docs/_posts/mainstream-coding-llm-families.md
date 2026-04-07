---
title: 主流编程大模型怎么选：GPT、Claude、Gemini 与国产替代
date: 2026-04-01
categories:
  - AI大模型
tags:
  - GPT
  - Claude
  - Gemini
  - 国产大模型
  - AI编程
  - API
author: 老Z
---

面向 **写代码、改仓库、跑 Agent** 的用法，选模型时通常看四件事：**指令遵循与重构质量**、**上下文长度与长仓库检索**、**工具调用 / 结构化输出是否稳定**、**延迟与单价**。下面先给一张 **「名字—档位—量级指标」** 快查表，再按家族展开；**国产** 一节补 **和海外常见档的粗对应关系**（方便你迁移 POC，**不是**厂商互认表）。

> **时效说明**：本文整理于 **2026-04-01**。带 **日期后缀** 的 API `model` 字符串会轮换、下线；**定价、默认上下文、是否支持某 tool** 以各控制台与模型页为准。下表里的 **名称与数字** 是写作当期的 **文档口径归纳**，接入前请再点一次官方「Models」页核对。

另：**IDE / CLI / Copilot** 与 **OpenAI Codex 产品线** 见 [主流 AI 编程工具怎么选：工具维度 × 模型维度](./mainstream-ai-coding-tools-comparison.html)（文内已写 **GPT‑5.4、GPT‑5.3‑Codex** 等 **Codex 内可选档**）。

---

## 先快查：编程场景下名字与指标怎么对齐

读表约定：

- **上下文**：厂商写的 **input / context window** 上限，实际产品里还可能被 **套餐、区域、压缩** 砍一刀。
- **价格**：只标 **量级**（低 / 中 / 高），具体 $/M tokens 以定价页为准；同档里 **推理 / 思考** 模式常再加价。
- **示例 model id**：仅作 **搜文档用的锚点**；真实请求字符串可能是 `模型名-YYYY-MM-DD` 快照。

### 海外三家族：代表型号与量级（编程向）

| 家族 | 档位（编程里怎么说） | 你在 API 里可能看到的名字（示例） | 上下文量级（文档口径，归纳） | 价格 / 延迟（粗感） |
|------|----------------------|-----------------------------------|------------------------------|---------------------|
| **OpenAI** | 旗舰通用 + 长上下文 | `gpt-4.1`，及带日期的 snapshot | **约 1M** tokens 级 input（见 [GPT-4.1 模型页](https://platform.openai.com/docs/models/gpt-4.1)） | 中偏高；质量稳 |
| **OpenAI** | 小快省 | `gpt-4.1-mini`、`gpt-4.1-nano` | 同系常标 **长上下文**（以页为准） | **低** |
| **OpenAI** | 重推理（o 系） | `o3`、`o4-mini` 等 | 往往 **短于** 旗舰对话档（以页为准） | **高** 或按 step 计费 |
| **OpenAI** | **Codex / Agent 产品线内** | 如 **GPT‑5.4**、**GPT‑5.3‑Codex**（姊妹篇与 [Codex CLI 文档](https://developers.openai.com/codex/cli/)） | 以 **Codex / Copilot 当期列表** 为准 | 跟 **ChatGPT 套餐或 API 方案** 走，别和裸 Chat 混账 |
| **Anthropic** | 均衡主力 | 文档中的 **Claude Sonnet 4.x** 全名（常含日期后缀） | **约 200k～1M** 档（视套餐与 beta；以 [Models](https://docs.anthropic.com/en/docs/about-claude/models) 为准） | 中 |
| **Anthropic** | 最强 / 大改 | **Claude Opus 4.x** 全名 | 同上看表；**max output** 可能单独限制 | **高** |
| **Anthropic** | 轻量 | **Claude Haiku 4.x** 等 | **约 200k** 档常见 | **低** |
| **Google** | 旗舰 | `gemini-2.5-pro`（[模型说明](https://ai.google.dev/gemini-api/docs/models/gemini-2.5-pro)） | **约 1M** input 档 | 中高 |
| **Google** | 快省 | `gemini-2.5-flash` | 同 family 里偏 **低延迟** | **低～中** |

**Bedrock / Vertex**：同一颗模型在 **AWS Bedrock、GCP Vertex** 上会有 **另一套 endpoint 名**，能力大致同族，**计费和数据驻留**按云厂商合同来。

---

## 编程场景：能力矩阵（仍会变，用来对齐预期）

| 维度 | 粗略印象（会随版本迭代） |
|------|--------------------------|
| **长上下文 / 大仓库** | **Gemini 2.5 Pro、GPT‑4.1 系、Claude Sonnet/Opus 4.x** 常在文档里标 **百万级或数十万 token**；是否全开取决于你的套餐 |
| **多步推理与架构级修改** | **OpenAI o 系、Claude Opus、Gemini Pro** 常被拿来啃难 bug；日常 CRUD **Sonnet / Flash / mini** 往往够 |
| **多模态（截图、PDF）** | **GPT‑4.1、Gemini 2.5、Claude 4.x** 普遍带 **image input**；具体 MIME、分辨率限制看各 API |
| **生态与工具链** | **OpenAI**：第三方集成最广；**Gemini**：GCP / Android Studio 一条链；**Claude**：Claude Code、MCP 曝光高 |

---

## GPT 家族（OpenAI）

**参考**：[Models - OpenAI API](https://platform.openai.com/docs/models)

### 1）通用 API 档（Chat / Responses）

| 逻辑档 | 典型 model 示例 | 编程上怎么用 |
|--------|-----------------|--------------|
| **旗舰** | `gpt-4.1` | 长文件、跨目录重构、复杂 tool 流程默认主力 |
| **中小** | `gpt-4.1-mini`、`gpt-4.1-nano` | 高 QPS、lint 级小改、路由 / 分类前置 |
| **推理向** | `o3`、`o4-mini` 等 | 难定位 bug、强逻辑；别当默认补全，latency / 账单都贵 |

### 2）和「Codex」两个名字的关系（别混）

- **OpenAI Codex** = **终端 / IDE 里的 Agent 产品**（CLI、扩展、Cloud），里面再选 **带 Codex 字样或 GPT‑5.x 档** 的模型——姊妹篇已拆过。
- **GitHub Copilot** 里出现的 **Codex 档位** = **Copilot 集成**，账单与 **你是否装 Codex CLI** 无关。

**编程向小结**：GPT 系优势是 **文档 + 工具链最全**、行为相对可预期；你要自己盯 **snapshot 退役、限速、套餐是否含长上下文**。上架 App 另看 **数据使用与企业条款**。

---

## Claude 家族（Anthropic）

**参考**：[Claude Docs · Models](https://docs.anthropic.com/en/docs/about-claude/models)

Anthropic 长期用 **Opus / Sonnet / Haiku** 三档逻辑；API 字符串一般是 **`claude-{opus|sonnet|haiku}-{代际}-{YYYY-MM-DD}`** 一类快照名，**日期后缀会换**。

| 档位 | 典型用途（编程） | 和 GPT / Gemini 粗对照 |
|------|------------------|------------------------|
| **Opus** | 跨模块重构、安全审计、长规格下实现 | 对齐 **OpenAI 旗舰 + 强推理**、**Gemini 2.5 Pro** 一类「豁出去算」的活 |
| **Sonnet** | 日常开发、Code Review、中等仓库 | 对齐 **GPT‑4.1 默认主力**、**Gemini Flash 做快、Pro 做难** 里的「主力」 |
| **Haiku** | 批量小改、分类、低延迟 | 对齐 **mini / nano / Flash** |

**Consumer / API / Amazon Bedrock** 可用列表 **不一定相同**；同一 `model` 在 Bedrock 上名字也不同。

**编程向小结**：适合 **「先读完一坨文档 / 一仓库再动手」**；用 **Claude Code** 时，底层仍以 **API 里那个 model 字符串** 为准。

---

## Gemini 家族（Google）

**参考**：[Gemini API · Models](https://ai.google.dev/gemini-api/docs/models)

| 逻辑档 | API 名示例 | 编程上怎么用 |
|--------|------------|--------------|
| **Pro** | `gemini-2.5-pro` | 大仓库检索、多文件联动、要 **长上下文** 时优先看文档里的 input 上限 |
| **Flash** | `gemini-2.5-flash` | 交互补全、草稿、高并发；复杂了再切 Pro |

**Vertex AI** 与 **ai.google.dev** 消费端 **同名能力可能不同步**；合规看 **区域与数据驻留** 条款。

**编程向小结**：人已经在 **GCP / Android** 上时，账单与采购路径往往最顺；纯自己 key 调用时，和别家一样要盯 **区域限制**。

---

## 国产替代：家族、常见型号与「和谁的粗对应」

国产迭代快，下面 **型号名** 以各平台 **开放平台当前列表** 为准；**对应关系**指「迁移 POC 时常被拿来和海外比」的 **粗颗粒**，**非等价证明**。

### 总览对应表（粗颗粒）

| 你熟的海外的用法 | 国内 POC 常试的型号 / 系列（示例名） | 说明 |
|------------------|----------------------------------------|------|
| **GPT‑4.1 级通用** | 阿里 **Qwen-Max**、**Qwen3**；智谱 **GLM-4.5 / 4.6**；字节 **豆包·主力 / Seed**（以方舟展示名为准）；腾讯 **hunyuan-turbo**；百度 **ERNIE 4.x** | 各家 **「Max / Pro / Turbo」** 命名不同，要比就用 **同一内部题集** |
| **o 系重推理** | DeepSeek **R1**（`deepseek-reasoner`）、部分厂 **「思考模式」** 开关 | 重点看 **是否真链式推理**、latency 与 **是否适合 agent 循环** |
| **Claude Sonnet 长文 + 代码** | DeepSeek **V3**（`deepseek-chat`）、**Qwen3-Coder**、**GLM coder 向**、月之暗面 **Kimi 开放 API 主力档** 等 | **长上下文** 数值要以 **该型号页** 为准；工具调用要单独测 |
| **Gemini Flash 快** | Qwen **Flash / Turbo** 档、豆包 **Lite**、Haiku 类小模型 | 便宜快，但 **复杂重构** 建议升档 |

### 分家速记

**深度求索（DeepSeek）**

- **常见 API 名**：`deepseek-chat`（V3 对话）、`deepseek-reasoner`（R1 推理向）。
- **适合**：要 **单价下来**、能接受 **合规与线路** 自管的团队；自托管权重与 **官方云 API** 条款不是一回事。

**阿里通义（Qwen）**

- **常见**：**Qwen-Max / Plus**、**Qwen3**、**Qwen3-Coder**；开源权重 + **DashScope** 商业 API 双线。
- **适合**：已上 **阿里云**、要 **中文文档 + 国内 SLA**。

**智谱（GLM）**

- **常见**：**GLM-4.5 / 4.6**、**GLM-4-Air** 等；覆盖对话、代码、多模态。
- **适合**：政企 POC、**国产可控 + 合同** 路径。

**月之暗面（Kimi）**

- **特点**：长文本产品感强；**API 具体上限** 以开放平台为准。
- **适合**：**长文档 + 代码** 混排工作流。

**字节（豆包）、腾讯（混元）、百度（文心）**

- **特点**：账号、发票、政企采购与 **云 / 办公** 捆绑。
- **适合**：已有 **对应云**；编程务必选 **标明 tool calling / 代码** 的型号做 POC。

### 国产共同取舍

| 话题 | 建议 |
|------|------|
| **合规** | 数据能否出域、是否 **专有云 / 私有化**、等保与客户审计 |
| **效果** | **固定题集**（你的仓库风格、语言栈）回归；少迷信公开榜 |
| **生态** | **OpenAI 兼容**（`/v1/chat/completions`）能降迁移成本，**特性不一定对齐** |
| **容灾** | 关键路径 **双供应商或本地小模型兜底** |

---

## 一张表：先定场景，再选家族

| 你的优先级 | 可优先看的方向 |
|------------|----------------|
| **默认省心、工具最全** | OpenAI **GPT‑4.1 系 API** + 需要 Agent 时看 **Codex 产品线**（姊妹篇） |
| **大仓库、长说明、偏谨慎** | **Claude Sonnet / Opus**（以当期 model 页为准） |
| **GCP / 安卓 / 长上下文** | **Gemini 2.5 Pro + Flash** 组合 |
| **成本敏感、可自管合规** | **DeepSeek V3/R1、Qwen3、GLM** + 自建评测 |
| **国内合同与账单一体** | **通义、智谱、豆包、混元、文心** 走已有采购渠道 |

---

## 小结

- **GPT / Claude / Gemini** 不必站队：编程里更像 **快（Flash/mini/Haiku）+ 稳（Sonnet/4.1）+ 狠（Opus/o/Pro）** 的 **梯队组合**。
- **国产** 关键在 **合规、延迟、在你代码风格上的实测、供应商持续性**；上表 **对应关系** 只帮你 **少试几条弯路**，接入仍以 **开放平台 model 列表** 为准。
- 工具层见 [主流 AI 编程工具怎么选：工具维度 × 模型维度](./mainstream-ai-coding-tools-comparison.html)。

---

## 参考链接（官方文档入口）

- OpenAI：[Models](https://platform.openai.com/docs/models) · [Codex 开发者文档](https://developers.openai.com/codex/cli/)
- Anthropic：[Claude · Models](https://docs.anthropic.com/en/docs/about-claude/models)
- Google：[Gemini API · Models](https://ai.google.dev/gemini-api/docs/models)
- DeepSeek、通义、智谱、Kimi 等：**各自官网「开放平台 / API 文档」最新页**

# 博客文章「去 AI 腔」编辑计划

放在 `docs/` 下，**不会**被 `_posts` 博客插件当成文章发布。执行时按表勾选；改完可在 Git 提交信息里写 `docs(editorial): pass N · <slug>` 方便回溯。

## 目标（什么叫「优化」）

- **语气**：像人写的技术笔记——有取舍、有场景，少「综上所述 / 三个维度 / 赋能 / 生态闭环」。
- **结构**：前言 3～6 句能说完就别写两段排比；小节标题少用「深度解析」「完全指南」式营销词（必要时保留 SEO 标题里的关键词，正文另说）。
- **保留**：事实、公式、代码、Mermaid、法规名、产品名、链接；**不**为降 AI 味而删技术信息。
- **版式**：继续遵守 `.cursor/rules/zblog-markdown-posts.mdc`（中文与 `**` 之间半角空格、`::: details` 内数学等）。

## 常见替换方向（不是机械替换）

| 少写 | 可改成 |
|------|--------|
| 在当今 / 随着……的发展 | 直接写具体问题或场景 |
| 本文将从 A、B、C 三个维度 | 下面分三块：… / 先…再… |
| 扮演着至关重要的角色 | 用在 X 里很常见 / 做 Y 时绕不开 |
| 深入解析 / 全面梳理 | 按时间线捋 / 把名词对齐 / 记几条排障用的 |
| 建立……影响力 / 赋能 | 具体结果：收录、点击、少踩坑 |
| 综上所述 | 删掉或改一句收束 |

## 篇章总表（30 篇）

**状态说明**：`—` 未动 · `①` 仅动过标题/前言等局部 · `②` 全文通读过并改过中段套话 · `◆` 建议跳过或单独策略

| # | 文件 | 状态 | 下一轮重点 |
|---|------|------|------------|
| 1 | `3ds-overview.md` | ② | 第 2 批：定义段、1.0/2.0 引导、总结重写 |
| 2 | `blog-deployment.md` | ② | 已加开场白、弱化「全球分发」 |
| 3 | `blog-directory-structure.md` | ② | 已加开场白 |
| 4 | `blog-tech-architecture.md` | ② | 开场 + 主题功能表述收紧 |
| 5 | `blog-usage-guide.md` | ② | 已加开场白 |
| 6 | `claude-code-advanced-usage-guide.md` | ① | 各章开头句、列表引导语、预测段 |
| 7 | `claude-code-statusline-tip.md` | ① | 已基本口语化，复核小结 |
| 8 | `dns-resolution-deep-dive.md` | ② | 单篇：概述+步骤+性能段+总结；修正 CNAME 示意图终点 |
| 9 | `frontend-cors-static-resources.md` | ② | 单篇：概述、资源表 nuance、各节引导、总结 |
| 10 | `https-ssl-tls-deep-dive.md` | ② | 单篇：标题、概述与各章引导、检测/错误节、总结 |
| 11 | `international-card-schemes.md` | ② | 单篇：文首、各章引导、份额图免责、Visa 特点、费率表、趋势与总结 |
| 12 | `jwt-jws-jwe-guide.md` | ② | 单篇：标题、概述 RFC8725、各章引导、密钥轮换措辞、调试警示、总结改短文 |
| 13 | `llm-friendly-log-format.md` | ① | **重点**：代码块之间解释段、第 9～11 章套话 |
| 14 | `llm-from-scratch-day-01-map-and-terms.md` | ② | 文首与 **##** 引导口语化；中文加粗间距；参数段去长 bold |
| 15 | `llm-from-scratch-day-02-extra-beginners.md` | — | 已偏口语，轻扫 |
| 16 | `llm-from-scratch-day-02-nn-basics.md` | — | 教材体，轻扫 |
| 17 | `llm-from-scratch-day-03-backprop.md` | — | 同上 |
| 18 | `llm-from-scratch-day-04-embeddings.md` | — | 同上 |
| 19 | `llm-from-scratch-series-plan.md` | — | 目录文，几乎不用动 |
| 20 | `mainstream-ai-coding-tools-comparison.md` | — | 已偏说明文，复核时效块即可 |
| 21 | `mainstream-coding-llm-families.md` | ② | 已扩：三家族快查表（model 示例、上下文/价级）、分家族子表、国产↔海外粗对应；链姊妹篇 Codex |
| 22 | `mobile-wallets-apple-google-pay.md` | ② | 第 2 批：文首、未来趋势标题、总结表与引用 |
| 23 | `overseas-dev-environment.md` | ① | 长文步骤说明里的小标题语气 |
| 24 | `password-free-payment-guide.md` | ② | 第 2 批：定义、风控句、未来趋势、总结 |
| 25 | `pci-dss-implementation.md` | ② | 文首免责、各 **##** 引导、总结；代码与表格未动 |
| 26 | `pci-dss-overview.md` | ② | 文首免责、历史/核心/级别/流程/处罚/4.0 引导、罚款表说明、总结改短文 |
| 27 | `rsa-algorithm-guide.md` | ② | 单篇：概述警示、各章引导、密钥长度与宇宙比喻、PKCS/填充/TLS 提示、总结改短文 |
| 28 | `seo-complete-guide-for-tech-blogs.md` | ① | **体量最大**：按「章」改前言/小结，示例代码内标题可保留作反例 |
| 29 | `token-payment-guide.md` | ② | 第 2 批：优势节标题与正文、场景与 PCI、总结 |
| 30 | `默认模块.md` | ◆ | OpenAPI 式内容：考虑移出 `_posts` 或加说明；本轮可不「润色」 |

## 建议执行顺序（慢慢来）

1. **短篇建站**（`blog-*.md`）：4 篇，一轮搞定，建立手感。  
2. **支付中篇**（`token`、`password-free`、`3ds`、`mobile` 中段）：与已改前言衔接。  
3. **安全长文**（`jwt`、`https`、`dns`、`rsa`）：每次 1～2 章，避免一次 diff 过大。  
4. **PCI 两篇**：只动叙述，不动表格与合规引文。  
5. **LLM 系列**：仅删明显套话，保持教学一致性。  
6. **`llm-friendly-log-format` + `seo-complete-guide`**：各拆多 commit。  
7. **`claude-code-advanced` + `overseas-dev-environment`**：长，放中后期。  
8. **`默认模块.md`**：与作者单独定是否迁移。

## 完成定义

- 该文在表中状态标为 **②**。  
- 随机抽 3 段读出声，无「报告朗诵感」即可合并。

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-01 | 建立计划；若干篇已完成前言/标题 ① 档 |
| 2026-04-01 | 建站四篇 `blog-*.md` 标为 ②（开场白 + 少量用词） |
| 2026-04-01 | 第 2 批：支付四篇 `token` / `password-free` / `3ds-overview` / `mobile-wallets` 标为 ② |
| 2026-04-01 | 单篇：`dns-resolution-deep-dive.md` 标为 ② |
| 2026-04-01 | 单篇：`frontend-cors-static-resources.md` 标为 ② |
| 2026-04-01 | 单篇：`https-ssl-tls-deep-dive.md` 标为 ② |
| 2026-04-01 | 单篇：`international-card-schemes.md` 标为 ② |
| 2026-04-01 | 单篇：`jwt-jws-jwe-guide.md` 标为 ② |
| 2026-04-01 | 单篇：`rsa-algorithm-guide.md` 标为 ② |
| 2026-04-01 | 单篇：`pci-dss-overview.md` 标为 ② |
| 2026-04-01 | 单篇：`pci-dss-implementation.md` 标为 ②（章首/小结 only） |
| 2026-04-01 | 单篇：`llm-from-scratch-day-01-map-and-terms.md` 标为 ② |
| 2026-04-01 | `mainstream-coding-llm-families.md`：扩写型号/指标/国产对应表，标为 ② |

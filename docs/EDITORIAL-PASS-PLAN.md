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

## 篇章总表

**状态说明**：`—` 未动 · `①` 仅动过标题/前言等局部 · `②` 全文通读过并改过中段套话 · `◆` 已迁出 `_posts` 或非博文

| # | 文件 | 状态 | 下一轮重点 |
|---|------|------|------------|
| 1 | `3ds-overview.md` | ② | 维护型 |
| 2 | `blog-deployment.md` | ② | 维护型 |
| 3 | `blog-directory-structure.md` | ② | 维护型 |
| 4 | `blog-tech-architecture.md` | ② | 维护型 |
| 5 | `blog-usage-guide.md` | ② | 维护型 |
| 6 | `claude-code-advanced-usage-guide.md` | ① | 各章引导语；MCP 段已去「95%」硬数字 |
| 7 | `claude-code-statusline-tip.md` | ① | 复核小结 |
| 8 | `dns-resolution-deep-dive.md` | ② | 维护型 |
| 9 | `frontend-cors-static-resources.md` | ② | 维护型 |
| 10 | `https-ssl-tls-deep-dive.md` | ② | 维护型 |
| 11 | `international-card-schemes.md` | ② | 已链 Visa 全流程 |
| 12 | `jwt-jws-jwe-guide.md` | ② | 维护型 |
| 13 | `llm-friendly-log-format.md` | ① | 最佳实践/总结已改；中段代码段叙述待扫 |
| 14 | `llm-from-scratch-day-01-map-and-terms.md` | ② | 维护型 |
| 15 | `llm-from-scratch-day-02-extra-beginners.md` | — | 轻扫 |
| 16 | `llm-from-scratch-day-02-nn-basics.md` | — | 轻扫 |
| 17 | `llm-from-scratch-day-03-backprop.md` | — | 轻扫 |
| 18 | `llm-from-scratch-day-04-embeddings.md` | — | 轻扫 |
| 19 | `llm-from-scratch-series-plan.md` | — | 目录文 |
| 20 | `mainstream-ai-coding-tools-comparison.md` | ① | 已链 codex-hook；复核时效 |
| 21 | `mainstream-coding-llm-families.md` | ② | 维护型 |
| 22 | `mobile-wallets-apple-google-pay.md` | ② | 维护型 |
| 23 | `overseas-dev-environment.md` | ① | 概览/合规/组件列表已改；步骤小节待扫 |
| 24 | `password-free-payment-guide.md` | ② | 维护型 |
| 25 | `pci-dss-implementation.md` | ② | 维护型 |
| 26 | `pci-dss-overview.md` | ② | 维护型 |
| 27 | `rsa-algorithm-guide.md` | ② | 维护型 |
| 28 | `seo-complete-guide-for-tech-blogs.md` | ① | 8.1 AI 段已改；其余按章润色 |
| 29 | `token-payment-guide.md` | ② | 维护型 |
| 30 | ~~`默认模块.md`~~ | ◆ | 已迁至 `docs/api/default-module-openapi.md` |
| 31 | `visa-transaction-flow.md` | ② | 文首四阶段表+姊妹链；正文 `##` 去「深度解析」 |
| 32 | `hermes-agent-self-improving-ai.md` | ② | 分类/互链/小结；去宣传口吻 |
| 33 | `openclaw-personal-ai-assistant.md` | ② | 分类/互链/小结 |
| 34 | `http1-http2-http3-comparison.md` | — | 结构已好，轻扫 |
| 35 | `claude-code-problem-solving-methodology.md` | ① | 已链 codex-hook |
| 36 | `codex-hook-review-guide.md` | ① | 小结段已收紧；全文加粗间距可选 |

## 建议执行顺序（慢慢来）

1. **短篇建站**（`blog-*.md`）：4 篇，一轮搞定，建立手感。  
2. **支付中篇**（`token`、`password-free`、`3ds`、`mobile` 中段）：与已改前言衔接。  
3. **安全长文**（`jwt`、`https`、`dns`、`rsa`）：每次 1～2 章，避免一次 diff 过大。  
4. **PCI 两篇**：只动叙述，不动表格与合规引文。  
5. **LLM 系列**：仅删明显套话，保持教学一致性。  
6. **`llm-friendly-log-format` + `seo-complete-guide`**：各拆多 commit。  
7. **`claude-code-advanced` + `overseas-dev-environment`**：长，放中后期。  
8. **`llm-friendly-log-format` + `seo-complete-guide`**：各拆多 commit。  
9. **Skills 驱动 pass**：见 `.cursor/skills/`（新建文 → 结构 → 润色 → verify）。

## 项目级 Skills

`.cursor/skills/`：`zblog-new-tech-post`、`zblog-tech-article-structure`、`zblog-markdown-vuepress`、`zblog-editorial-pass`、`zblog-verify-post`。

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
| 2026-06-04 | P0：`默认模块.md` → `docs/api/default-module-openapi.md` |
| 2026-06-04 | pass：Visa / Hermes / OpenClaw / 支付·AI 互链；overseas-dev、claude-advanced 局部 |
| 2026-06-04 | 续：llm-friendly / seo 8.1 / overseas / codex 小结 |

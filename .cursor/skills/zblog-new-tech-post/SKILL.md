---
name: zblog-new-tech-post
description: Scaffolds new VuePress blog posts for 老Z的博客 (zblog) in docs/_posts with correct frontmatter, slug, categories, and opening paragraphs. Use when creating a new 博文, 技术文章, adding to _posts, or asking how to start a post in this repo.
---

# zblog：新建技术博文

## 路径与命名

- 正文目录：`docs/_posts/`
- 文件名：`kebab-case.md`（英文 slug，与 URL 友好；系列可用 `llm-from-scratch-day-01-*.md`）
- **不要**把编辑计划放进 `_posts`：`docs/EDITORIAL-PASS-PLAN.md` 仅供维护，不会发布

## Frontmatter 模板

```yaml
---
title: 读者看到的标题（可含副标题，用冒号分隔）
date: YYYY-MM-DD
categories:
  - 主分类
  - 次分类可选
tags:
  - 英文或中文标签
  - 产品名
author: 老Z
---
```

### 分类（与导航一致，选 1～2 个）

| 分类 | 适用主题 |
| --- | --- |
| AI大模型 | LLM、Claude/Codex/Cursor、Agent |
| 支付 | 卡组织、PCI、3DS、钱包、token |
| web3 | 链、合约（若有） |
| 建站 | VuePress、博客、SEO、部署 |
| 安全 | HTTPS、JWT、RSA（可与支付/建站叠用） |

标签：3～8 个，含 **产品/协议名**（便于标签页）；避免空泛词堆砌。

## 开篇三段式（本项目惯用）

1. **首段（3～6 句）**：场景 + 本文解决什么 + 易混概念预告（若有）。直接写问题，不用「随着…的发展」。
2. **姊妹篇/系列**：`[标题](./other-post-slug.html)` —— 站内链用 **`.html` 后缀**，相对路径 `./slug.html`。
3. **参考块**（可选）：`> 官方参考：[…](https://…)` 列 2～4 个权威外链。

## 正文起手 checklist

- [ ] 文首是否点出 **1 个核心混淆点**（如 Codex 产品 vs 模型名）？
- [ ] 是否需要 **对照表** 或 **mermaid**？（见 `zblog-tech-article-structure`）
- [ ] 代码/配置是否可运行、路径是否贴合读者环境？
- [ ] 是否链到仓库内已有相关文，避免重复造轮子？

## 完成后

```bash
pnpm dev
# 本地 http://localhost:8080 预览
pnpm build   # 合并前建议跑一遍
```

提交信息风格：`docs(post): 新增 <主题> 博文` 或 `docs(post): 修订 <slug> …`。

## 延伸阅读

- 版式：`.cursor/skills/zblog-markdown-vuepress/SKILL.md`
- 结构：`.cursor/skills/zblog-tech-article-structure/SKILL.md`
- 去 AI 腔：`docs/EDITORIAL-PASS-PLAN.md`、`.cursor/skills/zblog-editorial-pass/SKILL.md`

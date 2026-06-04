---
name: zblog-verify-post
description: Pre-publish checklist for 老Z的博客—pnpm dev/build, link checks, and common VuePress build failures for docs/_posts. Use before committing posts or when the user asks to verify/preview a blog article.
---

# zblog：发文前自检

## 命令

```bash
pnpm install          # 依赖变更后
pnpm dev              # http://localhost:8080 预览目标文
pnpm build            # 合并前建议全量构建
```

构建产物：`docs/.vuepress/dist/`。异常时清理：

```bash
rm -rf docs/.vuepress/.cache docs/.vuepress/.temp docs/.vuepress/dist
```

改 `docs/.vuepress/config.ts` 后需 **重启** `pnpm dev`。

## 检查清单

- [ ] 新文件在 `docs/_posts/*.md`，frontmatter 含 `title` `date` `categories` `author`
- [ ] `date` 合理（通常 ≤ 当天）
- [ ] 站内链 `./slug.html` 目标文存在
- [ ] Mermaid 块无控制台/终端报错
- [ ] KaTeX 在正文与 `::: details` 中均正常
- [ ] 图片路径以 `/` 开头且文件在 `docs/.vuepress/public/`
- [ ] 未误把 `EDITORIAL-PASS-PLAN.md` 等维护文档放进 `_posts`

## 常见问题

| 现象 | 处理 |
| --- | --- |
| 加粗不显示 | 中文与 `**` 加空格或 `<strong>` |
| 公式原样输出 | 行内 `$` 旁勿空格；details 改用 `::: details` |
| Mermaid 失败 | 节点加引号、改 id、减特殊字符 |
| 分类页无文 | 检查 frontmatter `categories` 与导航分类一致 |

## 提交

仅博文：`docs(post): …`  
勿提交 `.claude/`、`.cache`、`.temp`、`dist`（应在 gitignore）。

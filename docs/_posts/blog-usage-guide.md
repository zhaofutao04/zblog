---
title: 博客操作指南
date: 2026-02-21
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
author: 老Z
---

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

开发服务器地址：`http://localhost:8080`

## 添加文章

在 `docs/_posts/` 目录下创建 Markdown 文件。

### 文章格式

```markdown
---
title: 文章标题
date: 2026-02-21
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
author: 老Z
---

## 章节标题

文章内容...

<!-- more -->

更多内容...
```

### Frontmatter 字段

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| title | 是 | string | 文章标题 |
| date | 是 | string | 发布日期（YYYY-MM-DD） |
| categories | 是 | string[] | 分类 |
| tags | 是 | string[] | 标签 |
| author | 否 | string | 作者 |

### 摘要分割

`<!-- more -->` 之前的内容作为文章摘要，在列表页显示。

## 部署流程

```bash
# 1. 本地预览
npm run dev

# 2. 构建
npm run build

# 3. 提交代码
git add .
git commit -m "更新文章"
git push origin main

# 4. 等待自动部署完成（约1-2分钟）
```

## 配置修改

### 导航栏

编辑 `docs/.vuepress/config.ts`：

```typescript
navbar: [
  { text: '首页', link: '/' },
  { text: '文章', link: '/posts/' },
  { text: '分类', link: '/category/' },
  { text: '标签', link: '/tag/' },
  { text: '时间线', link: '/timeline/' },
  { text: '关于我', link: '/about/' },
]
```

### 网站信息

```typescript
export default defineUserConfig({
  title: '网站标题',
  description: '网站描述',
})

theme: hopeTheme({
  author: { name: '作者名' },
  logo: '/logo.svg',
  footer: '页脚内容',
})
```

### 自定义样式

编辑 `docs/.vuepress/styles/index.scss`。

## 静态资源

将图片等静态文件放到 `docs/.vuepress/public/` 目录，引用时使用根路径：

```markdown
![图片描述](/image.png)
```

## 分类与标签

### 分类

```yaml
categories:
  - Java技术
```

### 标签

```yaml
tags:
  - Spring Boot
  - MyBatis
```

分类和标签会自动生成对应页面。

## 常见问题

### 本地开发无法访问

检查端口是否被占用，或指定其他端口：

```bash
npm run dev -- --port 8081
```

### 构建失败

1. 删除 `node_modules` 和 `package-lock.json`
2. 重新执行 `npm install`
3. 再次构建

### 文章不显示

确认 frontmatter 格式正确，date 格式为 `YYYY-MM-DD`。

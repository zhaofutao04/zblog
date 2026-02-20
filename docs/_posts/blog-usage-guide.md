---
title: 博客操作指南
date: 2026-02-19
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
  - 操作指南
author: 老Z
---

## 开发环境

### 本地启动

```bash
cd /Users/zhaofutao/web4pay/my-blog
npm run dev
```

访问 `http://localhost:8080` 预览网站。

### 构建部署

```bash
npm run build
```

构建产物在 `docs/.vuepress/dist/` 目录。

---

## 添加文章

### 方法一：直接创建 Markdown 文件

在 `docs/_posts/` 目录下创建 `.md` 文件：

```bash
touch docs/_posts/my-new-article.md
```

### 方法二：复制模板

```bash
cp docs/_posts/java-basics.md docs/_posts/new-article.md
```

### 文章模板

```markdown
---
title: 文章标题
date: 2026-02-19
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
author: 老Z
---

## 简介

这里是文章摘要...

<!-- more -->

## 正文内容

### 一级标题

正文内容...

#### 代码示例

\`\`\`java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
\`\`\`

#### 表格

| 列1 | 列2 |
|-----|-----|
| 内容 | 内容 |

#### 引用

> 这是一段引用文字

#### 列表

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| title | ✅ | 文章标题 |
| date | ✅ | 发布日期 |
| categories | ✅ | 分类（数组） |
| tags | ✅ | 标签（数组） |
| author | ❌ | 作者，默认使用配置 |

---

## 添加分类

分类是通过文章的 `categories` 字段自动生成的，无需手动创建。

### 添加新分类

只需在文章中添加新的分类名称：

```yaml
---
categories:
  - 新分类名称
---
```

### 多级分类

```yaml
---
categories:
  - [后端开发, Java]
  - [后端开发, 数据库]
---
```

### 推荐的分类

| 分类 | 说明 |
|------|------|
| 项目文档 | 项目相关文档 |
| Java技术 | Java 相关 |
| 前端技术 | 前端相关 |
| 数据库 | 数据库相关 |
| 开发工具 | 工具使用 |
| 架构设计 | 架构相关 |
| 中间件 | 中间件技术 |

---

## 添加标签

标签也是自动生成的，在文章中配置：

```yaml
---
tags:
  - Spring Boot
  - 微服务
  - 实战
---
```

---

## 添加友情链接

编辑 `docs/.vuepress/config.ts`：

```typescript
friendLink: [
  {
    title: '链接名称',
    desc: '链接描述',
    logo: 'https://example.com/logo.png',
    link: 'https://example.com'
  },
  // 添加更多...
]
```

---

## 修改导航栏

编辑 `docs/.vuepress/config.ts`：

```typescript
navbar: [
  { text: '首页', link: '/' },
  { text: '文章', link: '/posts/' },
  { text: '新页面', link: '/new-page/' },  // 添加新导航
]
```

然后创建对应页面：

```bash
mkdir docs/new-page
echo '---\ntitle: 新页面\n---\n\n# 新页面内容' > docs/new-page/README.md
```

---

## 修改网站信息

### 网站标题和描述

编辑 `docs/.vuepress/config.ts`：

```typescript
export default defineUserConfig({
  title: '你的博客标题',
  description: '你的博客描述',
})
```

### 作者信息

```typescript
theme: recoTheme({
  author: '你的名字',
  authorAvatar: '/avatar.svg',
})
```

### 页脚和备案号

```typescript
footer: {
  createYear: 2024,
  authorInfo: '你的名字',
  beian: '你的ICP备案号'
}
```

### 更换 Logo

1. 准备 Logo 文件（推荐 SVG 格式）
2. 放到 `docs/.vuepress/public/` 目录
3. 更新配置：

```typescript
logo: '/your-logo.svg',
```

---

## 添加自定义样式

编辑 `docs/.vuepress/styles/index.scss`：

```scss
// 修改主题色
:root {
  --c-brand: #ff6b6b;        // 品牌色
  --c-brand-light: #ff8787;  // 浅品牌色
}

// 自定义首页样式
.home-blog .hero {
  // 你的样式
}

// 自定义文章样式
.theme-default-content {
  // 你的样式
}
```

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `git add .` | 暂存所有更改 |
| `git commit -m "msg"` | 提交更改 |
| `git push` | 推送到远程 |

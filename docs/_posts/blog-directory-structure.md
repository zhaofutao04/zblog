---
title: 博客目录结构说明
date: 2026-02-20
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
  - 目录结构
author: 老Z
---

## 项目根目录

```
my-blog/
├── docs/                    # 文档源码目录
├── node_modules/            # 依赖包
├── package.json             # 项目配置
├── package-lock.json        # 依赖锁定文件
└── .gitignore               # Git 忽略配置
```

## docs 目录详解

`docs/` 是 VuePress 的源码目录，所有内容都在这里：

```
docs/
├── .vuepress/               # VuePress 配置目录
│   ├── config.ts            # 主配置文件 ⭐
│   ├── styles/              # 样式目录
│   │   └── index.scss       # 自定义样式
│   ├── public/              # 静态资源目录
│   │   ├── logo.svg         # 网站 Logo
│   │   └── favicon.ico      # 网站图标
│   ├── .cache/              # 构建缓存（自动生成）
│   └── .temp/               # 临时文件（自动生成）
│
├── _posts/                  # 博客文章目录 ⭐
│   ├── blog-tech-architecture.md
│   ├── blog-directory-structure.md
│   ├── blog-deployment.md
│   ├── blog-usage-guide.md
│   ├── java-basics.md
│   └── ...
│
├── about/                   # 关于我页面
│   └── README.md
│
└── README.md                # 首页配置 ⭐
```

## 自动生成的页面

vuepress-theme-hope 会自动生成以下页面，无需手动创建：

| 页面 | 路径 | 说明 |
|------|------|------|
| 文章列表 | `/posts/` | 所有文章列表 |
| 分类 | `/category/` | 按分类浏览 |
| 标签 | `/tag/` | 按标签浏览 |
| 时间线 | `/timeline/` | 按时间归档 |

## 核心文件说明

### 1. config.ts - 主配置文件

```typescript
// docs/.vuepress/config.ts
import { hopeTheme } from 'vuepress-theme-hope'

export default defineUserConfig({
  title: '老Z的博客',
  description: '聊技术 聊生活 聊人生',

  theme: hopeTheme({
    logo: '/logo.svg',
    author: { name: '老Z' },
    navbar: [...],
    footer: '...',
    plugins: {
      blog: true,
    },
  })
})
```

**常用配置项：**

| 配置项 | 说明 |
|--------|------|
| title | 网站标题 |
| description | 网站描述（SEO） |
| head | HTML head 标签内容 |
| theme.hostname | 网站域名 |
| theme.logo | 网站 Logo |
| theme.author | 作者信息 |
| theme.navbar | 导航菜单 |
| theme.footer | 页脚内容 |
| theme.plugins | 插件配置 |

### 2. README.md - 首页配置

```yaml
---
home: true
heroImage: /logo.svg
heroText: 老Z
tagline: 路漫漫其修远兮，吾将上下而求索
heroFullScreen: true
---

## 欢迎来到我的博客

### 聊技术
分享技术心得

### 聊生活
记录生活点滴

### 聊人生
思考人生意义
```

### 3. _posts/ - 文章目录

所有博客文章放在这里，文件名格式：`{文章名}.md`

文章必须包含 frontmatter：

```yaml
---
title: 文章标题
date: 2026-02-20
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
author: 老Z
---

文章内容...
```

### 4. public/ - 静态资源

存放图片、图标等静态文件，构建后会被复制到输出目录。

访问路径：`/文件名.扩展名`

```
public/logo.svg → /logo.svg
public/favicon.ico → /favicon.ico
```

### 5. styles/index.scss - 自定义样式

```scss
// 自定义样式
pre {
  border-radius: 8px;
}

// 页脚链接样式
.vp-footer a {
  color: var(--vp-c-accent);
}
```

## 构建输出目录

运行 `npm run build` 后生成：

```
docs/.vuepress/dist/
├── index.html               # 首页
├── posts/                   # 文章列表页
├── category/                # 分类页
├── tag/                     # 标签页
├── timeline/                # 时间线页
├── assets/                  # 静态资源
│   ├── *.css
│   └── *.js
├── logo.svg                 # 复制的静态资源
├── sitemap.xml              # 站点地图
├── robots.txt               # 爬虫规则
└── 404.html                 # 404 页面
```

## 关键目录对照表

| 目录 | 用途 | 修改频率 |
|------|------|----------|
| `.vuepress/config.ts` | 网站配置 | 偶尔 |
| `.vuepress/public/` | 静态资源 | 偶尔 |
| `.vuepress/styles/` | 自定义样式 | 很少 |
| `_posts/` | 博客文章 | 经常 |
| `about/README.md` | 关于页面 | 很少 |

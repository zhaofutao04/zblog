---
title: 博客目录结构说明
date: 2026-02-21
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
author: 老Z
---

## 项目整体结构

项目结构很简单，就这些：

```
my-blog/
├── docs/                 # 所有源码都在这里
├── node_modules/
├── package.json
└── .gitignore
```

重点是 `docs/` 目录，博客的所有内容都放这里。

## docs 目录

```
docs/
├── .vuepress/            # 配置和资源
│   ├── config.ts         # 主配置，改网站信息都在这
│   ├── styles/           # 自定义样式
│   └── public/           # Logo、图标等静态文件
│
├── _posts/               # 所有博客文章
│   ├── blog-xxx.md
│   ├── java-xxx.md
│   └── ...
│
├── about/                # 关于页面
│   └── README.md
│
└── README.md             # 首页
```

## 几个关键文件

**config.ts** - 主配置文件，网站标题、导航栏、页脚都在这里改。用 TypeScript 写的，有类型提示，不容易写错。

**_posts/** - 文章目录，所有 `.md` 文件放这里就会自动被识别为博客文章。

**README.md** - 首页配置，控制首页显示什么内容、什么样式。

## 自动生成的页面

有个很方便的地方，这些页面不用自己创建，主题会自动生成：

- `/posts/` - 文章列表
- `/category/` - 分类页
- `/tag/` - 标签页
- `/timeline/` - 时间线

只要你写文章的时候填了 `categories` 和 `tags`，这些页面就自动有内容了。

## 构建输出

运行 `npm run build` 之后，生成的文件在 `docs/.vuepress/dist/`。这个目录就是最终要部署的内容。

```
dist/
├── index.html
├── posts/
├── category/
├── tag/
├── timeline/
├── assets/               # CSS、JS
├── sitemap.xml           # SEO 用
└── robots.txt
```

## 日常改什么

平时写文章就往 `_posts/` 里加 `.md` 文件。偶尔改改配置或者换换 Logo，其他基本不用动。

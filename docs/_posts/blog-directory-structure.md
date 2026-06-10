---
title: 博客目录结构
date: 2026-02-21
categories:
  - 建站
tags:
  - VuePress
  - 博客
author: 老Z
---

clone 下来先找 `docs/`：文章在 `_posts`，站点的开关几乎都在 `.vuepress/config.ts`。下面按目录树记一遍，方便自己和协作者对齐路径。

## 项目结构

```
zblog/
├── docs/                    # 源码目录
│   ├── .vuepress/           # VuePress 配置
│   ├── _posts/              # 博客文章（当前 40+ 篇，每篇一个 .md）
│   ├── about/               # 关于页面
│   ├── links/               # 友链
│   ├── api/                 # 接口草稿（不参与博客发布）
│   └── README.md            # 首页
├── package.json             # 项目配置
├── pnpm-lock.yaml           # 依赖锁定
├── tsconfig.json            # TypeScript 配置
└── .gitignore               # Git 忽略规则
```

## .vuepress 目录

```
.vuepress/
├── config.ts                # 主配置文件
├── client.ts                # 客户端配置（如 copy-page 样式）
├── styles/
│   └── index.scss           # 自定义样式
├── public/
│   ├── logo.svg             # 网站 Logo / favicon（config head 引用）
│   ├── hero.svg / avatar.svg
│   └── robots.txt           # 手工维护，构建时复制到 dist
├── .cache/                  # 构建缓存（自动生成）
└── .temp/                   # 临时文件（自动生成）
```

## _posts 目录

存放所有博客文章，每篇文章为一个 `.md` 文件。

```
_posts/
├── blog-tech-architecture.md    # 建站系列示例
├── developer-four-layers-model.md
├── …                            # 见 /posts/ 列表
```

每篇文章一个 `kebab-case.md`；URL 为 `/posts/<slug>.html`。

## 自动生成页面

vuepress-theme-hope 根据文章 frontmatter 自动生成以下页面：

| 页面 | URL | 说明 |
|------|-----|------|
| 文章列表 | `/posts/` | 所有文章 |
| 分类 | `/category/` | 按分类归档 |
| 标签 | `/tag/` | 按标签归档 |
| 时间线 | `/timeline/` | 按时间归档 |

## 构建输出

构建产物位于 `docs/.vuepress/dist/`：

```
dist/
├── index.html               # 首页
├── posts/                   # 文章列表
├── category/                # 分类页
├── tag/                     # 标签页
├── timeline/                # 时间线页
├── assets/                  # 静态资源
│   ├── *.css
│   └── *.js
├── sitemap.xml              # 站点地图
├── robots.txt               # 爬虫规则
└── 404.html                 # 404 页面
```

## 文件说明

| 文件/目录 | 用途 |
|-----------|------|
| `config.ts` | 网站配置（标题、导航、插件等） |
| `styles/index.scss` | 自定义 CSS 样式 |
| `public/` | 静态资源（图片、图标等） |
| `_posts/` | 博客文章源文件 |
| `about/README.md` | 关于页面内容 |
| `README.md` | 首页配置 |

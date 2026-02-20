---
title: 博客技术架构介绍
date: 2026-02-19
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
  - 技术架构
author: 老Z
---

## 概述

本博客基于 **VuePress 2** 构建，使用 **vuepress-theme-reco** 主题，是一个纯静态的个人博客网站。本文将详细介绍博客的技术架构。

## 核心技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| VuePress | 2.0.0-rc.19 | 静态网站生成器 |
| vuepress-theme-reco | 2.0.0-rc.26 | 博客主题 |
| Vue | 3.5.x | 前端框架 |
| Vite | 6.x | 构建工具 |
| TypeScript | - | 配置文件编写 |

## 技术架构图

```
┌─────────────────────────────────────────────────────────┐
│                     用户访问层                           │
│                   (浏览器/CDN)                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   静态文件服务                           │
│              (Cloudflare Pages)                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   VuePress 构建层                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Markdown   │  │   主题      │  │   插件      │    │
│  │   文章      │  │  (reco)     │  │  (可选)     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    开发/构建工具                         │
│              Vite + Vue 3 + TypeScript                 │
└─────────────────────────────────────────────────────────┘
```

## 核心组件说明

### 1. VuePress 2

VuePress 是一个以 Markdown 为中心的静态网站生成器。主要特性：

- **Markdown 增强**：支持代码高亮、表格、Emoji 等
- **Vue 驱动**：可以在 Markdown 中使用 Vue 组件
- **高性能**：基于 Vite 构建，热更新快
- **SEO 友好**：静态渲染，利于搜索引擎收录

### 2. vuepress-theme-reco

一款简洁优雅的博客主题，提供：

- **首页**：个性化展示
- **文章列表**：分页展示
- **分类系统**：文章分类管理
- **标签系统**：多标签支持
- **时间线**：按时间归档
- **暗黑模式**：自动/手动切换
- **响应式设计**：移动端适配

## 当前使用的功能模块

| 模块 | 文件 | 功能 |
|------|------|------|
| 导航栏 | config.ts → navbar | 顶部导航菜单 |
| 首页配置 | config.ts → homeBlog | 首页展示 |
| 页脚配置 | config.ts → footer | 页脚信息、备案号 |
| 友情链接 | config.ts → friendLink | 友链列表 |
| 分类系统 | 自动 | 根据文章 frontmatter 自动生成 |
| 标签系统 | 自动 | 根据文章 frontmatter 自动生成 |

## 可扩展组件（未使用）

以下组件可根据需要添加：

### 评论系统

```ts
// config.ts
commentConfig: {
  type: 'giscus',  // 或 'valine', 'waline'
  options: {
    // 配置项
  }
}
```

### 搜索功能

```bash
npm install -D @vuepress/plugin-search
```

### RSS 订阅

```bash
npm install -D vuepress-plugin-rss
```

### PWA 支持

```bash
npm install -D @vuepress/plugin-pwa
```

### Google Analytics

```ts
// config.ts
head: [
  ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=GA_ID' }],
]
```

## 构建流程

```
Markdown 文章
     │
     ▼
VuePress 解析 frontmatter
     │
     ▼
主题渲染页面模板
     │
     ▼
Vite 编译打包
     │
     ▼
生成静态 HTML/JS/CSS
     │
     ▼
部署到 Cloudflare Pages
```

## 相关文件

- 配置文件：`docs/.vuepress/config.ts`
- 样式文件：`docs/.vuepress/styles/index.scss`
- 静态资源：`docs/.vuepress/public/`

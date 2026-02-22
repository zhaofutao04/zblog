---
title: 博客技术架构
date: 2026-02-21
categories:
  - 建站
tags:
  - VuePress
  - 博客
author: 老Z
---

## 技术栈

| 组件 | 版本 | 说明 |
|------|------|------|
| VuePress | 2.0.0-rc.26 | 静态站点生成器 |
| vuepress-theme-hope | 2.0.0-rc.102 | 博客主题 |
| Vue | 3.5.x | 前端框架 |
| Vite | 7.x | 构建工具 |
| TypeScript | 5.x | 配置语言 |
| Sass | 1.77.x | 样式预处理器 |

## 架构图

```
┌─────────────────────────────────────────┐
│              Cloudflare CDN             │
│            (全球节点分发)               │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│           Cloudflare Pages              │
│          (静态文件托管 + CI/CD)         │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│              VuePress 2                 │
│  ┌───────────┐  ┌───────────────────┐  │
│  │ Markdown  │  │ vuepress-theme-   │  │
│  │   源文件  │  │     hope          │  │
│  └───────────┘  └───────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│          Vite + Vue 3 + TS              │
│             (构建工具链)                │
└─────────────────────────────────────────┘
```

## 主题功能

vuepress-theme-hope 提供以下内置功能：

### 博客功能
- 文章列表（`/posts/`）
- 分类页面（`/category/`）
- 标签页面（`/tag/`）
- 时间线（`/timeline/`）

### SEO 功能
- sitemap.xml 自动生成
- robots.txt 自动生成
- Open Graph meta 标签

### 其他功能
- 暗黑模式
- 图片点击放大（PhotoSwipe）
- 代码块复制按钮
- 响应式布局
- RSS/Atom/JSON Feed 支持

## 构建流程

```
Markdown + Frontmatter
         │
         ▼ VuePress 解析
         │
         ▼ 主题渲染
         │
         ▼ Vite 编译
         │
         ▼
静态 HTML/CSS/JS
         │
         ▼
部署到 Cloudflare Pages
```

## 目录结构

```
my-blog/
├── docs/
│   ├── .vuepress/
│   │   ├── config.ts      # 主配置
│   │   ├── styles/        # 样式
│   │   └── public/        # 静态资源
│   ├── _posts/            # 博客文章
│   ├── about/             # 关于页面
│   └── README.md          # 首页
├── package.json
└── node_modules/
```

## 自定义插件

### Copy Page 插件

博客集成了 `vuepress-plugin-copy-page` 插件，方便将文章复制为 Markdown 格式供 LLM 使用。

功能：
- 在文章标题旁显示"Copy page"按钮
- 支持复制整篇文章的 Markdown 源码
- 支持在新标签页预览 Markdown

## 常用命令

```bash
pnpm run dev      # 启动开发服务器
pnpm run build    # 构建生产版本
```

## 相关链接

- [VuePress 2 文档](https://v2.vuepress.vuejs.org/zh/)
- [vuepress-theme-hope 文档](https://theme-hope.vuejs.press/zh/)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 VuePress 2.x 的中文个人博客项目（老Z的博客），主要分享技术、生活和人生感悟。博客内容涵盖支付、web3、安全、建站等技术领域。

## 开发命令

```bash
# 安装依赖（使用 pnpm）
pnpm install

# 启动开发服务器（热重载）
pnpm dev
# 或
pnpm run dev

# 构建生产版本
pnpm build
# 或
pnpm run build
```

## 技术栈

- **框架**: VuePress 2.0.0-rc.26
- **主题**: vuepress-theme-hope 2.0.0-rc.102
- **语言**: TypeScript + Vue 3
- **包管理器**: pnpm
- **打包工具**: Vite
- **图表支持**: Mermaid
- **插件**:
  - Google Analytics
  - vuepress-plugin-copy-page（页面复制功能）

## 项目结构

```
zblog/
├── docs/                    # VuePress 源码目录
│   ├── .vuepress/          # VuePress 配置
│   │   ├── config.ts       # 主配置文件（主题、插件、导航等）
│   │   ├── client.ts       # 客户端配置
│   │   ├── public/         # 静态资源（logo、图片等）
│   │   └── styles/         # 自定义样式
│   ├── _posts/             # 博客文章目录
│   ├── about/              # 关于页面
│   ├── links/              # 友链页面
│   └── README.md           # 首页内容
├── package.json            # 项目配置和依赖
├── tsconfig.json          # TypeScript 配置
└── pnpm-lock.yaml         # 依赖锁定文件
```

## 核心配置文件

### VuePress 配置 (`docs/.vuepress/config.ts`)
- 网站基本信息：标题、描述、作者等
- 导航栏配置：支付、web3、建站等分类导航
- 主题配置：Hope 主题的完整配置
- 插件配置：Google Analytics、博客功能、公告等
- Markdown 增强：支持 Mermaid 图表

### TypeScript 配置 (`tsconfig.json`)
- 仅包含 VuePress 配置文件的类型检查
- 排除 `node_modules`、构建产物和缓存目录

## 内容创作

### 添加新博客文章
1. 在 `docs/_posts/` 目录创建新的 `.md` 文件
2. 使用标准的 Frontmatter 格式：
```markdown
---
title: 文章标题
date: YYYY-MM-DD
categories:
  - 分类名
tags:
  - 标签1
  - 标签2
author: 老Z
---

文章内容...
```

### 支持的内容格式
- 标准 Markdown 语法
- Mermaid 图表（在代码块中使用 `mermaid` 语言标识）
- Hope 主题的组件和功能
- 代码高亮

## 网站配置要点

### 导航分类
- 支付：payment 相关技术文章
- web3：区块链和 web3 技术
- 建站：网站开发和部署相关
- 其他：文章列表、分类、标签、时间线

### 部署信息
- 域名：www.zhaofutao.cn
- GitHub 仓库：https://github.com/zhaofutao04/zblog
- ICP 备案：沪ICP备2024095491号-1

## 开发注意事项

- 配置文件使用 TypeScript，需要重启开发服务器才能生效
- 新增文章后，分类和标签会自动生成对应页面
- 静态资源放在 `docs/.vuepress/public/` 目录中
- 自定义样式可以在 `docs/.vuepress/styles/` 中添加
- Mermaid 图表已在主题中启用，可直接在 Markdown 中使用
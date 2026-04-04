# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 VuePress 2.x 的中文个人博客项目（老Z的博客），主要分享技术、生活和人生感悟。博客内容涵盖AI大模型、支付、web3、安全、建站等技术领域。

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

# 清理缓存和临时文件
rm -rf docs/.vuepress/.cache docs/.vuepress/.temp docs/.vuepress/dist

# 检查过期依赖
pnpm outdated

# 更新依赖
pnpm update
```

## 技术栈

- **框架**: VuePress 2.0.0-rc.26
- **主题**: vuepress-theme-hope 2.0.0-rc.102
- **语言**: TypeScript + Vue 3
- **包管理器**: pnpm
- **打包工具**: Vite
- **图表支持**: Mermaid 11.12.3
- **数学公式**: KaTeX（`markdown.math`，`delimiters: 'all'`：支持 `$...$`、`$$...$$` 与 `\(...\)`、`\[...\]`）
- **插件**:
  - Google Analytics (G-2NDJZGP77K)
  - vuepress-plugin-copy-page 1.3.0-RC.1（页面复制功能）
  - 主题内 **SlimSearch**（`plugins.slimsearch`，全文索引 `indexContent: true`；已弃用的 searchPro 勿再用）

## 项目结构

```
zblog/
├── docs/                    # VuePress 源码目录
│   ├── .vuepress/          # VuePress 配置
│   │   ├── config.ts       # 主配置文件（主题、插件、导航等）
│   │   ├── client.ts       # 客户端配置（插件样式导入）
│   │   ├── public/         # 静态资源（logo.svg、图片等）
│   │   ├── styles/         # 自定义样式（index.scss）
│   │   ├── .cache/         # 构建缓存（忽略）
│   │   ├── .temp/          # 临时文件（忽略）
│   │   └── dist/           # 构建产物（忽略）
│   ├── _posts/             # 博客文章目录
│   ├── about/              # 关于页面
│   ├── links/              # 友链页面
│   └── README.md           # 首页内容（Hero 页面）
├── package.json            # 项目配置和依赖
├── tsconfig.json          # TypeScript 配置
└── pnpm-lock.yaml         # 依赖锁定文件
```

## 核心配置文件

### VuePress 配置 (`docs/.vuepress/config.ts`)
- 网站基本信息：标题、描述、作者等
- 导航栏配置：AI大模型、支付、web3、建站等分类导航
- 主题配置：Hope 主题的完整配置
- 插件配置：Google Analytics、博客功能、公告通知等
- Markdown 增强：支持 Mermaid 图表与 KaTeX 数学公式
- 页脚配置：版权信息和 ICP 备案号

### 客户端配置 (`docs/.vuepress/client.ts`)
- 导入 copy-page 插件的样式文件
- 可扩展客户端功能

### TypeScript 配置 (`tsconfig.json`)
- 目标：ESNext 模块和语法
- 严格模式启用
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
- 数学公式：KaTeX；行内 `$x$` 或 `\(x\)`，独立公式 `$$...$$` 或 `\[...\]`（勿在行内 `$` 两侧加空格，否则不解析）
- **中文旁加粗**：`**` 与相邻汉字之间建议加半角空格（如 `解释 **非线性** 为什么`）；含公式的长句加粗可用 HTML `<strong>...</strong>`；表格单元格里 `**` 易被解析失败时可改用 `<strong>`。
- **折叠块里的公式**：原生 HTML `<details>` 内文通常**不会**再走 Markdown/KaTeX，行内公式会原样显示。请用主题支持的 `::: details 标题` … `:::` 容器（与 `::: tip` 同属 markdown-hint），以便 `\(...\)` / `$...$` 正常渲染。

### 静态资源管理
- 图片和其他静态资源放在 `docs/.vuepress/public/` 目录
- 在 Markdown 中使用绝对路径引用：`/images/example.png`
- Logo 文件：`/logo.svg`、`/hero.svg`、`/avatar.svg`

## 网站配置要点

### 导航分类
- AI大模型：人工智能和大语言模型相关技术
- 支付：payment 相关技术文章和 PCI DSS 等安全标准
- web3：区块链和 web3 技术
- 建站：网站开发和部署相关
- 其他：文章列表、分类、标签、时间线

### 特殊功能
- **公告通知**：在首页显示欢迎信息
- **页面复制**：启用文章页面的复制功能，包含 URL
- **全屏模式**：支持全屏浏览
- **Google Analytics**：配置了访问统计

### 部署信息
- 域名：www.zhaofutao.cn
- GitHub 仓库：https://github.com/zhaofutao04/zblog
- ICP 备案：沪ICP备2024095491号-1

## 开发注意事项

### 配置文件更新
- 配置文件使用 TypeScript，需要重启开发服务器才能生效
- 修改 `config.ts` 后必须重新启动 `pnpm dev`

### 内容管理
- 新增文章后，分类和标签会自动生成对应页面
- 文章的分类和标签会自动出现在导航栏中
- 时间线功能会自动按时间排序显示所有文章

### 样式定制
- 自定义样式在 `docs/.vuepress/styles/index.scss`
- 插件样式通过 `client.ts` 导入
- 使用 SCSS 语法编写样式

### 构建和部署
- 构建产物在 `docs/.vuepress/dist/` 目录
- 确保在部署前运行 `pnpm build` 生成静态文件
- 缓存文件可能影响开发，必要时清理 `.cache` 和 `.temp` 目录

### Mermaid 图表
- 已在主题中启用，可直接在 Markdown 中使用
- 支持流程图、序列图、甘特图等多种图表类型
- 在代码块中使用 `mermaid` 语言标识

### 调试和故障排除
- 开发服务器在 `localhost:8080` 启动
- 检查控制台错误信息
- 清理缓存解决奇怪的构建问题
- 确保 Node.js 版本兼容（推荐 18+）
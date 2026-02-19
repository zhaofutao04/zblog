---
title: 博客目录结构说明
date: 2026-02-19
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
├── .gitignore               # Git 忽略配置
└── deploy-oss.sh            # OSS 部署脚本
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
│   │   ├── avatar.svg       # 作者头像
│   │   └── hero.svg         # 首页横幅
│   ├── .cache/              # 构建缓存（自动生成）
│   └── .temp/               # 临时文件（自动生成）
│
├── _posts/                  # 博客文章目录 ⭐
│   ├── java-basics.md
│   ├── spring-boot-intro.md
│   ├── mysql-index.md
│   ├── docker-basics.md
│   └── vue3-intro.md
│
├── about/                   # 关于我页面
│   └── README.md
│
├── categories/              # 分类页面
│   └── README.md
│
├── tags/                    # 标签页面
│   └── README.md
│
├── posts/                   # 文章列表页面
│   └── README.md
│
├── timeline/                # 时间线页面
│   └── README.md
│
├── friendship-link/         # 友情链接页面
│   └── README.md
│
└── README.md                # 首页配置 ⭐
```

## 核心文件说明

### 1. config.ts - 主配置文件

```typescript
// docs/.vuepress/config.ts
export default defineUserConfig({
  title: '老Z的博客',           // 网站标题
  description: '聊技术 聊生活',  // 网站描述

  theme: recoTheme({
    logo: '/logo.svg',         // Logo
    author: '老Z',              // 作者名
    navbar: [...],             // 导航栏
    footer: {...},             // 页脚
  })
})
```

**常用配置项：**

| 配置项 | 说明 |
|--------|------|
| title | 网站标题 |
| description | 网站描述（SEO） |
| head | HTML head 标签内容 |
| theme.logo | 网站 Logo |
| theme.author | 作者名称 |
| theme.navbar | 导航菜单 |
| theme.footer | 页脚配置 |
| theme.friendLink | 友情链接 |

### 2. README.md - 首页配置

```yaml
---
home: true
heroImage: /hero.svg
heroText: 老Z
tagline: 路漫漫其修远兮，吾将上下而求索
heroFullScreen: true
---

<!-- 首页内容 -->
```

### 3. _posts/ - 文章目录

所有博客文章放在这里，文件名格式：`{文章名}.md`

文章必须包含 frontmatter：

```yaml
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

文章内容...
```

### 4. public/ - 静态资源

存放图片、图标等静态文件，构建后会被复制到输出目录。

访问路径：`/文件名.扩展名`

```
public/logo.svg → /logo.svg
public/avatar.svg → /avatar.svg
```

### 5. styles/index.scss - 自定义样式

```scss
// 自定义 CSS 变量
:root {
  --c-brand: #3eaf7c;
}

// 覆盖主题样式
.theme-reco-content {
  max-width: 1200px !important;
}
```

## 构建输出目录

运行 `npm run build` 后生成：

```
docs/.vuepress/dist/
├── index.html               # 首页
├── posts/                   # 文章页面
├── assets/                  # 静态资源
│   ├── *.css
│   └── *.js
├── logo.svg                 # 复制的静态资源
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
| `friendship-link/README.md` | 友链页面 | 偶尔 |

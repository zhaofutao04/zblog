---
title: 博客是怎么部署的
date: 2026-02-21
categories:
  - 项目文档
tags:
  - VuePress
  - Cloudflare
author: 老Z
---

## 简单说一下部署方案

博客是静态网站，部署起来很简单。我用的是 Cloudflare Pages，主要因为：

- 免费，带宽不限
- 自带 CDN，国内访问还行
- 自动 HTTPS
- 推送代码自动部署

流程大概是这样：本地写文章 → push 到 GitHub → Cloudflare 自动拉取代码构建 → 部署到全球节点。

## Cloudflare 配置

在 Cloudflare Pages 里建个项目，配置几项：

- 构建命令：`npm run build`
- 输出目录：`docs/.vuepress/dist`
- Node 版本：22.x

就这样，其他都是默认的。每次往 GitHub 推代码，Cloudflare 会自动检测到然后重新构建部署。

## 域名绑定

我的域名是 `zhaofutao.cn`，DNS 也托管在 Cloudflare，绑定很方便。在 Pages 项目设置里添加自定义域名，Cloudflare 会自动配置 DNS 记录。

域名在阿里云买的，已经备案了，用 Cloudflare 的 CDN 也没啥问题。

## 日常更新流程

```bash
# 写文章
vim docs/_posts/xxx.md

# 本地看看效果
npm run dev

# 没问题就提交
git add .
git commit -m "新文章"
git push
```

push 之后等个一两分钟就能在线上看到了。

## 为什么不用其他方案

**Vercel** - 也挺好用的，但国内访问比 Cloudflare 慢一些。

**GitHub Pages** - 免费，但国内访问不稳定，有时候加载不出来。

**阿里云 OSS** - 国内访问最快，但配置麻烦，还要单独搞 CDN，流量大了也要花钱。

**自己的服务器** - 太折腾了，还要维护，博客这点东西没必要。

## 遇到过的坑

有次构建失败，看了日志发现是 `sass-embedded` 没装上。解决方案是把它加到 `devDependencies` 里，因为 Cloudflare 默认只安装 `devDependencies`。

还有一次 Node 版本不对，在环境变量里指定 `NODE_VERSION=22` 就好了。

## 小结

静态博客部署真的挺简单的，选个平台，配置一下构建命令，之后就是写文章 push 就行。如果只是想写写博客，不用折腾太多，能用就行。

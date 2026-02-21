---
title: 博客技术架构介绍
date: 2026-02-21
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
author: 老Z
---

## 为什么选择这个技术栈

在搭建这个博客之前，我对比了好几个方案。WordPress 太重，Hexo 主题太少，Hugo 的模板语法不太习惯。最后选了 VuePress 2 + vuepress-theme-hope，主要是因为：

- Markdown 写作体验好
- Vue 生态熟悉，方便魔改
- 构建速度快，Vite 加持
- 主题功能够用，文档也全

## 用到的主要技术

核心就是 VuePress 2，配合 vuepress-theme-hope 主题。版本信息：

- VuePress: 2.0.0-rc.26
- vuepress-theme-hope: 2.0.0-rc.102
- Vue 3.5 + Vite 6
- TypeScript 写配置
- Sass 写样式

说实话这套组合还是有些坑的，毕竟是 rc 版本，API 偶尔会变。但总体来说能用，遇到问题查 issue 基本都能解决。

## 主题自带的功能

hope 主题自带的东西挺多的，基本开箱即用：

**博客相关**
- 文章列表、分类、标签、时间线，都是自动根据文章 frontmatter 生成的
- 不用像以前那样手动维护分类页面

**SEO 相关**
- sitemap.xml 自动生成
- robots.txt 自动生成
- meta 标签也处理得不错

**其他**
- 暗黑模式支持
- 图片点击放大
- 代码一键复制
- 响应式布局

## 关于评论

之前试过 Valine，但遇到了 401 错误，懒得折腾就先关了。后面有空可能会换 Giscus，毕竟基于 GitHub Discussions，稳定性应该好一些。

## 构建和部署

本地 `npm run dev` 开发，`npm run build` 构建，构建产物在 `docs/.vuepress/dist/`。

部署用的 Cloudflare Pages，推送到 GitHub 自动触发部署，挺省心的。之前考虑过阿里云 OSS，但国内访问虽然快，配置起来麻烦，还要单独搞 CDN。

## 一点体会

静态博客的好处是省心，不用担心服务器挂了、数据库崩了。坏处是每次发文章都要重新构建，不过反正也就十几秒，可以接受。

如果你也想搭博客，我的建议是：先想清楚自己要什么功能，然后选最简单的方案。不要追求大而全，能写文章、能被人访问到就够了。

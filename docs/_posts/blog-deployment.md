---
title: 博客部署架构
date: 2026-02-19
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
  - 部署
  - Cloudflare
author: 老Z
---

## 部署架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                        开发环境                              │
│                     (本地电脑)                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │  编写文章   │ → │ npm run dev │ → │  本地预览   │    │
│  │  (Markdown) │    │  (热更新)   │    │ (localhost) │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
└─────────────────────────────────────────────────────────────┘
          │
          │ git push
          ▼
┌─────────────────────────────────────────────────────────────┐
│                      GitHub 仓库                             │
│                (代码版本管理)                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  main 分支                                           │   │
│  │  ├── docs/          # 源码                          │   │
│  │  ├── package.json   # 配置                          │   │
│  │  └── ...                                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │
          │ Webhook 触发
          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Cloudflare Pages                          │
│                   (CI/CD + 托管)                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │ 拉取代码    │ → │ npm run     │ → │  部署静态   │    │
│  │ (git clone) │    │   build     │    │   文件      │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare CDN                           │
│                   (全球加速)                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │     全球节点分发 → 用户就近访问                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                      用户访问                                │
│               www.zhaofutao.cn                              │
└─────────────────────────────────────────────────────────────┘
```

## 当前部署配置

### Cloudflare Pages 配置

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `npm run build` |
| 输出目录 | `docs/.vuepress/dist` |
| Node 版本 | 22.x（自动检测） |
| 包管理器 | bun（自动检测） |

### 域名配置

| 域名 | 类型 | 说明 |
|------|------|------|
| www.zhaofutao.cn | CNAME | 指向 Cloudflare Pages |
| zhaofutao.cn | CNAME | 指向 Cloudflare Pages |

---

## 自动部署流程

### 触发条件

- 推送到 `main` 分支
- 手动触发重新部署

### 部署步骤

```
1. Cloudflare 检测到 GitHub 推送
        ↓
2. 拉取最新代码
        ↓
3. 安装依赖 (npm install / bun install)
        ↓
4. 执行构建 (npm run build)
        ↓
5. 生成静态文件到 docs/.vuepress/dist/
        ↓
6. 部署到 Cloudflare 边缘节点
        ↓
7. 用户访问新版本
```

### 部署时间

- 平均部署时间：1-2 分钟
- 构建时间：约 20 秒
- CDN 更新：实时

---

## 部署操作

### 日常更新

```bash
# 1. 编写/修改文章
vim docs/_posts/my-article.md

# 2. 本地预览
npm run dev

# 3. 提交并推送
git add .
git commit -m "更新文章"
git push

# 4. 等待自动部署完成
```

### 手动触发部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages → 你的项目
3. 点击 View details → Create deployment
4. 选择分支，点击 Save and Deploy

### 查看部署日志

1. Cloudflare Dashboard → 项目详情
2. 点击具体部署记录
3. 查看 Building... 日志

---

## 备选部署方案

### 方案一：Vercel

| 优点 | 缺点 |
|------|------|
| 部署简单 | 国内访问较慢 |
| 免费额度充足 | - |

配置：
```
Build Command: npm run build
Output Directory: docs/.vuepress/dist
```

### 方案二：GitHub Pages

| 优点 | 缺点 |
|------|------|
| 完全免费 | 国内访问不稳定 |
| 与 GitHub 集成好 | 配置稍复杂 |

配置：
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vuepress/dist
```

### 方案三：阿里云 OSS

| 优点 | 缺点 |
|------|------|
| 国内访问快 | 需要付费 |
| 带宽稳定 | 需要 ICP 备案 |

适用场景：已备案域名 + 国内用户为主

---

## HTTPS 配置

Cloudflare Pages 自动提供 HTTPS：

- 自动申请 SSL 证书
- 自动续期
- 支持 HTTP/2
- 支持 HTTP/3（QUIC）

---

## 性能优化

### Cloudflare 自动优化

- Brotli 压缩
- 响应缓存
- 图片优化（需开启）
- Minify HTML/CSS/JS

### 手动优化建议

1. **图片压缩**：使用 WebP 格式
2. **代码分割**：VuePress 已自动处理
3. **懒加载**：图片使用懒加载
4. **CDN 缓存**：静态资源长期缓存

---

## 监控与告警

### Cloudflare Analytics

- 访问量统计
- 流量来源
- 国家/地区分布
- 响应时间

### 设置告警

1. Cloudflare Dashboard → Notifications
2. 添加告警规则
3. 配置通知方式（邮件/Webhook）

---

## 故障排查

### 部署失败

1. 检查构建日志
2. 确认 Node 版本兼容
3. 检查依赖是否完整

### 访问异常

1. 检查 DNS 解析
2. 检查 Cloudflare 状态
3. 清除浏览器缓存

### 更新未生效

1. 确认 git push 成功
2. 检查部署是否完成
3. 清除 Cloudflare 缓存

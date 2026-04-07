---
title: 跨域拉静态资源：CORS 配在哪一端
date: 2026-03-24
categories:
  - web3
tags:
  - CORS
  - 跨域
  - Nginx
  - 前端开发
  - 安全
author: 老Z
---

## 概述

图片、字体、CSS、JS、音视频从 **另一个源** 拉过来时，拦不拦主要看 **浏览器策略 + 你怎么用**。多数时候：**在真正吐文件的那台机器（或 CDN/OSS）上把 CORS 头配上** 就完事；前端只有 **Canvas、带凭证、部分字体/媒体** 这类场景要额外加 `crossOrigin` 或改请求模式。

> 别在「页面域名」上瞎配 CORS——**谁返回静态文件，谁加头**。

```mermaid
flowchart LR
    subgraph Before["无 CORS 配置"]
        Browser["浏览器"] -->|请求| Server["静态资源服务器"]
        Server -->|无 CORS 头| Browser
        Browser -.->|"❌ 跨域拦截"| Block["请求被阻止"]
    end

    subgraph After["有 CORS 配置"]
        Browser2["浏览器"] -->|请求 + Origin| Server2["静态资源服务器"]
        Server2 -->|Access-Control-Allow-Origin| Browser2
        Browser2 -->|"✅ 允许访问"| Success["资源正常加载"]
    end

    Before --> After
```

## 一、核心跨域响应头

纯静态、不走自定义 Header 时，常见就这几项（请求多半是 `GET`/`HEAD`）：

| 响应头 | 说明 | 示例值 |
|--------|------|--------|
| `Access-Control-Allow-Origin` | 允许的跨域域名 | `https://你的前端域名.com` 或 `*` |
| `Access-Control-Allow-Methods` | 允许的请求方法 | `GET, HEAD` |
| `Access-Control-Max-Age` | 预检请求缓存时间（秒） | `86400` |

::: warning 生产环境注意
生产环境**禁止使用 `*`**，务必写明具体的前端域名，以防止资源被恶意站点滥用。
:::

## 二、主流服务器配置

### 1. Nginx（最常用）

按后缀或 `location` 包一层即可；下面示例里 **`*` 只配在测试**，上线记得换成白名单域名。

```nginx
server {
    listen 80;
    server_name static.yourdomain.com;

    root /var/www/static;
    index index.html;

    # ========== 跨域配置核心 ==========
    # 匹配所有静态资源
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|mp3|mp4)$ {
        # 测试环境：允许所有源
        add_header Access-Control-Allow-Origin *;

        # 生产环境：仅允许指定前端域名（更安全）
        # add_header Access-Control-Allow-Origin "https://www.your-frontend.com";

        add_header Access-Control-Allow-Methods "GET, HEAD";
        add_header Access-Control-Max-Age 86400;

        # 静态资源缓存（可选）
        expires 7d;
    }
}
```

配置后重启 Nginx：

```bash
nginx -s reload
```

### 2. Apache

修改 `.htaccess` 或 `httpd.conf`：

```apache
<FilesMatch "\.(jpg|png|gif|css|js|woff|woff2|ttf)$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, HEAD"
</FilesMatch>
```

### 3. Node.js (Express)

如果用 Node 托管静态资源，使用 `cors` 中间件：

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// 允许所有源跨域（测试环境）
app.use(cors());

// 生产环境：仅允许指定源
// app.use(cors({ origin: "https://www.your-frontend.com" }));

// 托管静态资源
app.use(express.static('static'));

app.listen(80, () => console.log('服务启动'));
```

### 4. 云存储 / CDN

文件在 OSS/COS 一类对象存储时，**控制台里写 CORS 规则** 往往比在源站 Nginx 再糊一层省事：

```mermaid
flowchart TB
    subgraph Console["云存储控制台"]
        C1["进入 Bucket 配置"]
        C2["找到 '跨域规则 CORS'"]
        C3["新增规则"]
    end

    subgraph Rule["跨域规则配置"]
        R1["来源: https://你的前端域名"]
        R2["允许方法: GET, HEAD"]
        R3["允许 Headers: *"]
        R4["缓存时间: 86400"]
    end

    C1 --> C2 --> C3 --> Rule
```

常见云服务配置位置：

| 云服务商 | 控制台路径 |
|----------|------------|
| 阿里云 OSS | Bucket → 权限管理 → 跨域设置 |
| 腾讯云 COS | Bucket → 基础配置 → 跨域访问 |
| 七牛云 | 对象存储 → 域名管理 → 跨域配置 |

## 三、静态资源类型与跨域需求

```mermaid
flowchart TB
    subgraph Resources["静态资源类型"]
        Img["图片<br/>jpg/png/gif"]
        CSS["样式表<br/>css"]
        JS["脚本<br/>js"]
        Font["字体<br/>woff/ttf"]
        Media["音视频<br/>mp3/mp4"]
    end

    subgraph Browser["浏览器行为"]
        Default["默认行为"]
        MustCORS["必须配置 CORS"]
    end

    Img --> Default
    CSS --> Default
    JS --> Default
    Font --> MustCORS
    Media --> MustCORS

    style Font fill:#ffcdd2
    style Media fill:#ffcdd2
    style Default fill:#c8e6c9
    style MustCORS fill:#ffcdd2
```

| 资源类型 | 是否需要配置 CORS | 说明 |
|----------|-------------------|------|
| 普通图片 | 多数情况不用 | 常见 `<img src>` 走默认模式，能显示不等于能 `getImageData` |
| CSS/JS | 看用法 | 外链脚本样式一般能拉；**module、部分 API** 会再卡一层 CORS |
| **字体文件** | ✅ 要配 | `@font-face` 跨源会查 CORS |
| **音视频** | ✅ 常要配 | `MediaElement`、Web Audio 等会较真 |
| Canvas 用图 | ✅ 要配 + `crossOrigin` | 否则画布 **tainted** |

## 四、前端特殊场景处理

### 1. Canvas 绘制跨域图片

跨源图不设 `crossOrigin` 就画进 Canvas，一读像素就报 **tainted**。要么 **CDN 放行 + `anonymous`**，要么别跨域。

```html
<!-- 普通图片引用：无需配置 -->
<img src="https://cdn.example.com/image.jpg">

<!-- Canvas 绘图用图片：必须加 crossOrigin="anonymous" -->
<img
  src="https://cdn.example.com/image.jpg"
  crossOrigin="anonymous"
>
```

```javascript
// JavaScript 中设置
const img = new Image();
img.crossOrigin = 'anonymous';  // 必须设置
img.src = 'https://cdn.example.com/image.jpg';
img.onload = () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);  // 不会污染 Canvas
};
```

### 2. 带 Cookie 的跨域请求

如果静态资源需要携带登录凭证，需要服务端和前端配合：

**服务端配置：**
```nginx
add_header Access-Control-Allow-Origin "https://www.your-frontend.com";
add_header Access-Control-Allow-Credentials "true";
```

**前端配置：**
```html
<img
  src="https://cdn.example.com/avatar.jpg"
  crossOrigin="use-credentials"
>
```

::: warning 重要限制
当 `Access-Control-Allow-Credentials` 为 `true` 时，`Access-Control-Allow-Origin` **不能使用 `*`**，必须指定具体域名。
:::

## 五、本地开发环境配置

本地 **dev server 同源**，把 `/static` 代理到真 CDN，可先绕过浏览器跨域；**上线仍要在静态域配头**。

### Vite 配置

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/static': {
        target: 'https://static.yourdomain.com',
        changeOrigin: true
      }
    }
  }
}
```

### Webpack 配置

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/static': {
        target: 'https://static.yourdomain.com',
        changeOrigin: true
      }
    }
  }
}
```

```mermaid
flowchart LR
    subgraph Dev["开发环境"]
        Browser["浏览器"] -->|localhost:3000/static| Vite["Vite Dev Server"]
        Vite -->|代理请求| Target["https://static.yourdomain.com"]
    end

    style Browser fill:#e3f2fd
    style Vite fill:#c8e6c9
    style Target fill:#fff9c4
```

## 六、常见问题排查

### 问题诊断流程（按报错反查）

```mermaid
flowchart TB
    Start["跨域报错"] --> Q1{"字体文件报错？"}
    Q1 -->|是| Font["字体必须配置 CORS"]
    Q1 -->|否| Q2{"带 Cookie 请求报错？"}
    Q2 -->|是| Credential["检查 Allow-Origin<br/>不能为 *"]
    Q2 -->|否| Q3{"Canvas 绘制报错？"}
    Q3 -->|是| Canvas["添加 crossOrigin<br/>属性"]
    Q3 -->|否| Q4{"CDN/云存储报错？"}
    Q4 -->|是| Cloud["检查控制台<br/>CORS 规则配置"]
    Q4 -->|否| Server["服务端未正确配置<br/>检查响应头"]
```

### 常见错误与解决方案

| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| `字体文件跨域报错` | 字体是浏览器强制跨域限制 | 必须配置 CORS |
| `The 'Access-Control-Allow-Origin' header contains multiple values` | Nginx 重复配置了 `add_header` | 删除多余配置 |
| `Canvas has been tainted` | 跨域图片未设置 `crossOrigin` | 添加 `crossOrigin="anonymous"` |
| `Credentials flag is true, but Access-Control-Allow-Origin is '*'` | 带凭证时使用通配符 | 改为具体域名 |
| 预检请求 (OPTIONS) 失败 | 服务端未处理 OPTIONS 请求 | 添加对应路由和响应头 |

### 快速诊断方法

使用 curl 检查响应头：

```bash
# 检查静态资源是否返回正确的 CORS 头
curl -I -X GET \
  -H "Origin: https://www.your-frontend.com" \
  https://static.yourdomain.com/image.jpg

# 预期输出应包含：
# Access-Control-Allow-Origin: https://www.your-frontend.com
# Access-Control-Allow-Methods: GET, HEAD
```

## 总结

- **谁响应体里出文件，谁带 `Access-Control-Allow-*`**；前端代理只救开发环境。  
- 上线 **别用 `*`** 顶 `Allow-Origin`（尤其要带 Cookie 时，规范直接禁止 `*`）。  
- **字体、Canvas、部分媒体** 最容易踩雷；普通 `<img>` 能亮不代表能读像素。  
- 资源在云上：**控制台 CORS** 往往比回源改 Nginx 省事。

### 配置优先级（怎么省事怎么来）

```mermaid
flowchart LR
    subgraph Priority["配置优先级（从高到低）"]
        P1["1. 云存储/CDN 控制台"]
        P2["2. Nginx/Apache 服务器"]
        P3["3. Node.js 中间件"]
        P4["4. 前端 crossOrigin 属性"]
    end

    P1 --> P2 --> P3 --> P4

    style P1 fill:#c8e6c9
    style P2 fill:#c8e6c9
    style P3 fill:#fff9c4
    style P4 fill:#fff9c4
```

自建源站再动 Nginx；只有 **Canvas / 凭证** 才轮到前端补属性。

---

*参考资料: [MDN CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS), [Fetch Standard](https://fetch.spec.whatwg.org/#http-cors-protocol), [W3C CORS Spec](https://www.w3.org/TR/cors/)*
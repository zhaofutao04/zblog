---
title: HTTPS / TLS：握手、证书与线上常踩的坑
date: 2026-03-22
categories:
  - 安全
tags:
  - HTTPS
  - SSL/TLS
  - 数字证书
  - PKI
  - 网络安全
author: 老Z
---

## 概述

HTTPS = HTTP 外面套 **TLS**。这篇按 **「先握手拿对称密钥 → 再用证书把服务端钉死」** 的顺序写；版本表里 **1.2 仍大量存在**，新站能 **1.3 优先** 就优先。排障时对照 OpenSSL / 浏览器报错反查即可，别背序列图。

```mermaid
flowchart LR
    subgraph HTTP["HTTP (不安全)"]
        Client1["浏览器"] --> |"明文传输"| Server1["服务器"]
        style Client1 fill:#ffcdd2
        style Server1 fill:#ffcdd2
    end

    subgraph HTTPS["HTTPS (安全)"]
        Client2["浏览器"] --> |"加密通道"| Server2["服务器"]
        style Client2 fill:#c8e6c9
        style Server2 fill:#c8e6c9
    end

    HTTP --> HTTPS
```

## 为什么需要 HTTPS

明文 HTTP 上，**同一段 Wi‑Fi 里的人**、**路径上任意一跳**，都能看见你在传啥；TLS 至少把 **机密性 + 完整性 +（对端的）身份** 三件事兜住。

### HTTP 的安全问题

```mermaid
flowchart TB
    subgraph Threats["HTTP 安全威胁"]
        Eavesdrop["窃听 (Eavesdropping)"]
        Tampering["篡改 (Tampering)"]
        Impersonation["冒充 (Impersonation)"]
    end

    Eavesdrop --> |"明文密码<br/>敏感数据"| Impact1["隐私泄露"]
    Tampering --> |"修改响应<br/>注入恶意代码"| Impact2["数据破坏"]
    Impersonation --> |"钓鱼网站<br/>中间人攻击"| Impact3["身份伪造"]

    style Threats fill:#ffebee
    style Impact1 fill:#ffcdd2
    style Impact2 fill:#ffcdd2
    style Impact3 fill:#ffcdd2
```

| 问题 | 描述 | 风险 |
|------|------|------|
| 窃听 | HTTP 明文传输，数据可被网络嗅探 | 密码、隐私泄露 |
| 篡改 | 数据在传输途中被修改 | 恶意注入、钓鱼攻击 |
| 冒充 | 伪造服务器欺骗用户 | 身份盗窃、金融欺诈 |

## TLS/SSL 协议原理

名字里还带 SSL 是历史包袱；今天配置里写的全是 **TLS**。老版本该关就关，别为了兼容 IE 留着 1.0。

### TLS 协议版本

| 版本 | 发布年份 | 状态 | 说明 |
|------|----------|------|------|
| SSL 2.0 | 1995 | 已废弃 | 存在严重安全漏洞 |
| SSL 3.0 | 1996 | 已废弃 | POODLE 攻击 |
| TLS 1.0 | 1999 | 已废弃 | BEAST 攻击 |
| TLS 1.1 | 2006 | 已废弃 | 2020 年被废弃 |
| TLS 1.2 | 2008 | 仍广泛使用 | 当前主流版本 |
| TLS 1.3 | 2018 | 推荐使用 | 更安全、更快速 |

### TLS 1.2 握手过程

1.2 里常见 **ECDHE 换临时密钥 + 证书里公钥做认证**（具体套件看 `Cipher Suite`）。下面是一版典型流程，和你抓到的包可能差在扩展字段上：

```mermaid
sequenceDiagram
    participant Browser as 浏览器
    participant Server as 服务器

    Note over Browser: Client Hello<br/>支持的加密套件<br/>随机数 (Client Random)
    Browser->>Server: Client Hello

    Note over Server: 选择加密套件<br/>发送证书链<br/>Server Hello<br/>随机数 (Server Random)
    Server-->>Browser: Server Hello + 证书 + Server Key Exchange

    Note over Browser: 验证证书<br/>提取公钥<br/>生成 PreMaster Secret<br/>用公钥加密
    Browser->>Server: Client Key Exchange<br/>(加密的 PreMaster Secret)

    Note over Browser: Browser: PreMaster Secret + Client Random → Master Secret<br/>Server: PreMaster Secret + Client Random → Master Secret
    Browser->>Server: Change Cipher Spec

    Note over Server: 生成会话密钥<br/>Master Secret = Master Secret
    Server-->>Browser: Change Cipher Spec

    Note over Browser: 使用 Master Secret 加密所有后续数据
    Browser->>Server: 加密的 HTTP 请求

    Server-->>Browser: 加密的 HTTP 响应
```

### TLS 1.3 握手优化

1.3 把大部分参数 **收紧成少数套件**，握手常见 **1-RTT**（首次）；**0-RTT** 能省往返但有 **重放** 争议，业务要自己评估。

```mermaid
sequenceDiagram
    participant Browser as 浏览器 (TLS 1.3)
    participant Server as 服务器

    Note over Browser: Client Hello<br/>支持的加密套件<br/>支持的关键算法<br/>Client Random<br/>Key Share (客户端 DH 参数)
    Browser->>Server: Client Hello

    Note over Server: 选择加密参数<br/>直接计算密钥
    Server-->>Browser: Server Hello + Key Share<br/>Change Cipher Spec<br/>Finished

    Note over Browser: 验证证书<br/>计算会话密钥<br/>解密请求
    Browser->>Server: Change Cipher Spec<br/>Finished<br/>加密的 HTTP 请求

    Server-->>Browser: 加密的 HTTP 响应
```

TLS 1.3 的改进：

| 改进点 | TLS 1.2 | TLS 1.3 |
|--------|----------|----------|
| 握手轮次 | 2-RTT | 1-RTT |
| 密钥交换 | RSA 或 DH | 仅 DH (前向安全) |
| 加密套件 | 大量 | 5 个推荐套件 |
| 0-RTT | 不支持 | 支持 (有重放风险) |

## 加密算法详解

握手阶段用 **非对称 / DH** 把对称密钥谈拢；真正扛流量的是 **AES-GCM、ChaCha20-Poly1305** 这类对称算法。别在业务层自己发明「混合加密」，用库和服务器默认套件。

### 对称加密 vs 非对称加密

```mermaid
flowchart LR
    subgraph Symmetric["对称加密"]
        S1["同一密钥<br/>加密解密"]
        S2["AES-128-GCM<br/>AES-256-GCM"]
        S3["速度快<br/>密钥传输风险"]
    end

    subgraph Asymmetric["非对称加密"]
        A1["公钥加密<br/>私钥解密"]
        A2["RSA<br/>ECDHE"]
        A3["速度慢<br/>无需安全传输"]
    end

    S1 --> S2 --> S3
    A1 --> A2 --> A3
```

| 类型 | 算法 | 用途 | 特点 |
|------|------|------|------|
| 对称加密 | AES-128-GCM, AES-256-GCM, ChaCha20 | 数据传输加密 | 速度快，效率高 |
| 非对称加密 | RSA, ECDHE | 密钥交换 | 安全性高，速度慢 |
| 哈希算法 | SHA-256, SHA-384 | 签名验证 | 单向不可逆 |

### 加密套件

加密套件（Cipher Suite）命名格式：`TLS_密钥交换_签名算法_对称加密_哈希算法`

```bash
# TLS 1.2 加密套件示例
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
     │      │      │        │        │
     │      │      │        │        └── 哈希算法: SHA-256
     │      │      │        └── 对称加密: AES-128-GCM
     │      │      └── 签名算法: RSA
     │      └── 密钥交换: ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)
     └── 协议: TLS
```

TLS 1.3 仅保留 5 个推荐加密套件：

| 加密套件 | 密钥交换 | 对称加密 | 哈希 |
|----------|----------|----------|------|
| TLS_AES_128_GCM_SHA256 | ECDHE | AES-128-GCM | SHA-256 |
| TLS_AES_256_GCM_SHA384 | ECDHE | AES-256-GCM | SHA-384 |
| TLS_CHACHA20_POLY1305_SHA256 | ECDHE | ChaCha20-Poly1305 | SHA-256 |
| TLS_AES_128_CCM_SHA256 | ECDHE | AES-128-CCM | SHA-256 |
| TLS_AES_128_CCM_8_SHA256 | ECDHE | AES-128-CCM-8 | SHA-256 |

## 数字证书机制

证书解决的是：**你连上的这台机子，是不是域名对应的那台**。链上缺中间证、SAN 没写全、时钟歪了，都是线上实打实会炸的。

### PKI (公钥基础设施)

```mermaid
flowchart TB
    subgraph Entities["PKI 核心组件"]
        CA["证书颁发机构 (CA)"]
        RA["注册机构 (RA)"]
        CRL["证书吊销列表 (CRL)"]
        OCSP["在线证书状态协议 (OCSP)"]
    end

    subgraph Certificates["证书"]
        RootCA["根证书<br/>(Root CA)"]
        InterCA["中间证书<br/>(Intermediate CA)"]
        EndCert["终端实体证书<br/>(End Entity Certificate)"]
    end

    CA --> RA
    CA --> CRL
    CA --> OCSP
    RootCA --> InterCA
    InterCA --> EndCert

    CA -.-> |"自签名"| RootCA

    style CA fill:#e3f2fd
    style RootCA fill:#c8e6c9
    style InterCA fill:#fff9c4
    style EndCert fill:#bbdefb
```

### 证书类型

```mermaid
flowchart LR
    subgraph DV["DV 证书 (域名验证)"]
        DV1["Domain Validation"]
        DV2["仅验证域名所有权"]
        DV3["签发快速 (分钟级)"]
    end

    subgraph OV["OV 证书 (企业验证)"]
        OV1["Organization Validation"]
        OV2["验证企业身份"]
        OV3["显示企业名称"]
    end

    subgraph EV["EV 证书 (扩展验证)"]
        EV1["Extended Validation"]
        EV2["严格企业验证"]
        EV3["企业名展示（浏览器已取消绿条）"]
    end

    DV --> OV --> EV

    style DV fill:#e3f2fd
    style OV fill:#fff9c4
    style EV fill:#c8e6c9
```

| 类型 | 验证级别 | 显示信息 | 适用场景 |
|------|----------|----------|----------|
| DV | 域名所有权 | 锁标志 + HTTPS | 个人网站、博客 |
| OV | 域名 + 企业身份 | 锁标志 + 企业名 | 企业官网 |
| EV | 严格企业验证 | 证书含企业名（**已无绿色地址栏**，Chrome 等 2019 起取消） | 金融、电商 |

### 证书格式

```bash
# 常见的证书格式
# PEM (Privacy Enhanced Mail) - Base64 编码
-----BEGIN CERTIFICATE-----
MIIFxxxxx...
-----END CERTIFICATE-----

# DER (Distinguished Encoding Rules) - 二进制编码
# 通常用于 Java KeyStore

# 转换命令
openssl x509 -in cert.pem -inform PEM -out cert.der -outform DER

# PKCS#12 / PFX - 包含私钥的证书包
openssl pkcs12 -export -in cert.pem -inkey key.pem -out bundle.p12

# PEM 证书链
-----BEGIN CERTIFICATE-----      # 终端实体证书
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----      # 中间证书
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----      # 根证书 (通常系统内置)
-----END CERTIFICATE-----
```

### 证书内容 (X.509)

```bash
# 查看证书详细信息
openssl x509 -in certificate.pem -text -noout

# 证书主要字段
Certificate:
    Data:
        Version: v3
        Serial Number: 04:xx:xx:xx:xx:xx:xx:xx
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, O=Let's Encrypt, CN=R3
        Valid From: 2026-01-01 to 2026-04-01
        Subject: CN=www.example.com
        Subject Alternative Names: DNS:example.com, DNS:www.example.com
        Subject Public Key Info:
            Public Key Algorithm: RSA
            RSA Public Key: 2048 bits
        X509v3 Extensions:
            X509v3 Key Usage: Digital Signature, Key Encipherment
            X509v3 Basic Constraints: CA:FALSE
            X509v3 Subject Key Identifier: xx:xx:xx...
            X509v3 Authority Key Identifier: xx:xx:xx...
```

## TLS 握手详解

和上一节 **1.2 序列图** 对照看：这里把 **证书验证** 单独拆成流程图，方便对着 `openssl s_client` 输出一步步对。

### 完整的 TLS 1.2 握手流程

```mermaid
sequenceDiagram
    participant B as 浏览器
    participant S as 服务器
    participant CA as 证书颁发机构

    Note over B: 1. 生成 Client Random
    Note over S: 2. 生成 Server Random
    Note over S: 3. 生成 Server Key Exchange (DH 参数)

    B->>S: Client Hello<br/>TLS 版本<br/>加密套件列表<br/>Client Random<br/>Session ID

    S-->>B: Server Hello<br/>选定的加密套件<br/>Server Random<br/>Session ID

    S->>CA: 请求签发证书
    CA-->>S: 返回证书

    S->>B: Certificate<br/>服务器证书链

    S->>B: Server Key Exchange<br/>DH 参数<br/>签名

    S->>B: Server Hello Done

    Note over B: 4. 验证证书链<br/>5. 提取公钥<br/>6. 生成 PreMaster Secret<br/>7. 用公钥加密<br/>8. 生成 Master Secret

    B->>S: Client Key Exchange<br/>加密的 PreMaster Secret

    Note over B,S: 此时双方都有:<br/>Client Random<br/>Server Random<br/>PreMaster Secret<br/>→ Master Secret

    B->>S: Change Cipher Spec<br/>Encrypted Handshake Message

    S-->>B: Change Cipher Spec<br/>Encrypted Handshake Message

    Note over B,S: 握手完成<br/>使用 Master Secret 加密通信
```

### 证书验证过程

```mermaid
flowchart TB
    subgraph Verify["证书验证流程"]
        Start["验证证书"]
        Check1["1. 检查证书有效期"]
        Check2["2. 检查证书吊销状态<br/>(CRL/OCSP)"]
        Check3["3. 验证证书签名"]
        Check4["4. 验证证书链<br/>逐级向上直到根证书"]
        Check5["5. 检查主机名匹配"]
        Pass["验证通过"]
        Fail["验证失败"]
    end

    Start --> Check1
    Check1 -->|通过| Check2
    Check1 -->|失败| Fail
    Check2 -->|通过| Check3
    Check2 -->|失败| Fail
    Check3 -->|通过| Check4
    Check3 -->|失败| Fail
    Check4 -->|通过| Check5
    Check4 -->|失败| Fail
    Check5 -->|通过| Pass
    Check5 -->|失败| Fail

    style Start fill:#e3f2fd
    style Pass fill:#c8e6c9
    style Fail fill:#ffcdd2
```

## 中间人攻击 (MITM)

能控制你路径上流量的人（恶意热点、公司网关、某些运营商插页），理论上都能玩这一出；**用户点「继续访问」** 是最常见的突破口。

### 攻击原理

```mermaid
sequenceDiagram
    participant U as 用户
    participant A as 攻击者
    participant S as 服务器

    Note over U,A,S: 正常 HTTPS 通信
    U->>S: Client Hello
    S-->>U: Server Hello + 证书

    Note over U,A,S: 中间人攻击
    U->>A: Client Hello
    A->>S: Client Hello (转发)
    S-->>A: Server Hello + 证书
    A-->>U: 伪造的证书 (攻击者自签名)

    Note over U: 浏览器警告：<br/>证书无效！
```

### 防御措施

| 防御手段 | 说明 |
|----------|------|
| 证书链验证 | 验证证书是否由可信 CA 签发 |
| 证书吊销检查 | 通过 CRL/OCSP 检查证书是否被吊销 |
| HPKP（**已废弃/移除**） | 历史方案；勿新接，现多用 Certificate Transparency + 短证书周期 |
| HSTS | 强制 HTTPS 访问，防止降级攻击 |
| CT (Certificate Transparency) | 公开日志，检测异常签发 |

## HTTPS 性能优化

首连贵主要在 **TLS 往返**；能 **会话复用、OCSP Stapling、HTTP/2/3** 就省一截。下面数字是量级，别当 SLA。

### TLS 握手延迟

```mermaid
flowchart TB
    subgraph Latency["HTTPS 延迟构成"]
        DNS["DNS 解析<br/>20-100ms"]
        TCP["TCP 连接<br/>20-50ms"]
        TLS["TLS 握手<br/>50-200ms"]
        Data["数据传输<br/>依赖带宽"]
    end

    DNS --> TCP --> TLS --> Data

    style TLS fill:#fff9c4
```

### 优化策略

#### 1. TLS 会话恢复

```mermaid
sequenceDiagram
    participant B as 浏览器
    participant S as 服务器

    Note over B,S: 第一次连接 - 完整握手
    B->>S: Client Hello (无 Session ID)
    S-->>B: Session Ticket
    B->>S: 建立连接

    Note over B,S: 第二次连接 - 快速恢复
    B->>S: Client Hello + Session Ticket
    S-->>B: 使用之前会话密钥<br/>直接加密通信
```

```bash
# Nginx 配置会话恢复
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets on;
```

#### 2. OCSP Stapling

```mermaid
flowchart LR
    subgraph Before["❌ 无 OCSP Stapling"]
        C1["浏览器"]
        S1["服务器"]
        CA1["CA OCSP 服务器"]
        C1 --> S1
        S1 --> C1
        C1 --> |"查询 OCSP"| CA1
    end

    subgraph After["✅ 有 OCSP Stapling"]
        C2["浏览器"]
        S2["服务器"]
        CA2["CA OCSP 服务器"]
        C2 --> S2
        S2 --> |"证书 + OCSP 响应"| C2
        S2 --> |"预获取 OCSP"| CA2
    end
```

```nginx
# Nginx 启用 OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 1.1.1.1 valid=300s;
```

#### 3. HTTP/2 和 HTTP/3

```mermaid
flowchart TB
    subgraph HTTP1["HTTP/1.1"]
        H1["每个域名 6 个连接"]
        H2["大量请求需要排队"]
    end

    subgraph HTTP2["HTTP/2"]
        H3["单连接多路复用"]
        H4["头部压缩 HPACK"]
    end

    subgraph HTTP3["HTTP/3"]
        H5["QUIC 协议"]
        H6["0-RTT 连接建立"]
        H7["更好的丢包处理"]
    end

    HTTP1 --> HTTP2 --> HTTP3

    style HTTP1 fill:#ffcdd2
    style HTTP2 fill:#fff9c4
    style HTTP3 fill:#c8e6c9
```

#### 4. 启用 HTTP/2 和 TLS 1.3

```nginx
# Nginx HTTP/2 和 TLS 配置
server {
    listen 443 ssl http2;

    # TLS 1.3 (需要 OpenSSL 1.1.1+)
    ssl_protocols TLSv1.2 TLSv1.3;

    # 推荐的加密套件
    ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES256-GCM-SHA512';
    ssl_prefer_server_ciphers on;

    # 开启 OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # 安全头
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
}
```

### 现代 HTTPS 最佳配置

```nginx
# 完整的 HTTPS 最佳配置
server {
    listen 443 ssl http2;
    server_name www.example.com;

    ssl_certificate /path/to/full_chain.pem;
    ssl_certificate_key /path/to/private_key.pem;

    # TLS 版本
    ssl_protocols TLSv1.2 TLSv1.3;

    # 加密套件 (TLS 1.3 密码套件会被自动添加)
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;

    # SSL 会话
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;  # TLS 1.3 不需要

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 8.8.8.8 valid=300s;
    resolver_timeout 5s;

    # 安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "accelerometer=(),camera=(),geolocation=()";
}
```

## HTTPS 部署检测

上线后：**链是否完整、中间证书有没有漏、HSTS 有没有写炸**，比纠结 cipher 名字更有性价比。

### 检测工具

```bash
# 使用 OpenSSL 测试 TLS 连接
openssl s_client -connect www.example.com:443 -tls1_3
openssl s_client -connect www.example.com:443 -showcerts

# 在线检测
# https://www.ssllabs.com/ssltest/    （报告很细，适合一次性体检）
# https://cryptcheck.fr/               (简洁报告)
# https://www.wosign.com/              (国内)

# 命令行检测
echo | openssl s_client -connect www.google.com:443 -servername www.google.com 2>/dev/null | openssl x509 -noout -dates -issuer -subject
```

### 常见问题排查

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 证书链不完整 | 缺少中间证书 | 拼接完整证书链 |
| 证书过期 | 证书超过有效期 | 续期证书 |
| 主机名不匹配 | 证书 CN 与域名不符 | 重新签发证书 |
| 混合内容 | HTTPS 页面加载 HTTP 资源 | 全部改为 HTTPS |
| HSTS 失效 | 配置错误或过期 | 重新正确配置 |

## 常见 HTTPS 相关错误

Chrome / Firefox 报错串里 **ERR_*** 多半能直接映射到：链、日期、域名、套件。

### 浏览器错误提示

| 错误 | 含义 | 处理方法 |
|------|------|----------|
| `NET::ERR_CERT_AUTHORITY_INVALID` | 证书不被信任 | 检查证书链 |
| `NET::ERR_CERT_DATE_INVALID` | 证书过期 | 更新证书 |
| `NET::ERR_CERT_COMMON_NAME_INVALID` | 域名不匹配 | 检查证书 SAN |
| `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` | 加密套件不兼容 | 更新配置 |
| `SEC_ERROR_UNKNOWN_ISSUER` | 未知颁发者 | 检查中间证书 |

## 总结

- **TLS** 管握手和信道；**证书**管「是不是这个站」；混内容、链缺一环、系统时间错，照样红屏。  
- 配置：**能 1.3 就 1.3**，1.2 留着兼容时 **套件别手抄十年前的**；**HSTS** 开之前想清楚能不能全程 HTTPS。  
- 运维：**全链证书**、`openssl s_client -showcerts`、**证书到期监控** 比追求满分 cipher 分更实在。

---

*参考资料: [RFC 5246](https://tools.ietf.org/html/rfc5246), [RFC 8446](https://tools.ietf.org/html/rfc8446), [MDN HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS), [SSL Labs SSL/TLS Best Practices](https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)*

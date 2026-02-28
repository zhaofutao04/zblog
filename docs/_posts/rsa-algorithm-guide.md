---
title: RSA 加密算法深入解析 - 从数学原理到工程实践
date: 2026-02-28
categories:
  - 安全
  - 密码学
tags:
  - RSA
  - 非对称加密
  - 公钥密码
  - 数字签名
author: 老Z
---

## 概述

RSA 是目前应用最广泛的非对称加密算法，以其三位发明者 Ron Rivest、Adi Shamir 和 Leonard Adleman 的姓氏首字母命名。它是现代互联网安全的基石，被广泛应用于 SSL/TLS、数字签名、身份认证等领域。

```mermaid
flowchart TB
    subgraph "RSA 核心概念"
        A["公钥 Public Key<br/>公开分发"] --> B["加密 Encrypt"]
        A --> C["验签 Verify"]
        D["私钥 Private Key<br/>严格保密"] --> E["解密 Decrypt"]
        D --> F["签名 Sign"]
    end

    B --> G["机密性<br/>只有私钥持有者能解密"]
    F --> H["真实性<br/>任何人可用公钥验证"]
    C --> H
```

## 历史背景

```mermaid
timeline
    title RSA 发展历程
    section 理论奠基
        1976 : Diffie-Hellman 发表<br/>"New Directions in Cryptography"<br/>提出公钥密码概念
        1977 : RSA 三人组发明算法<br/>MIT 林肯实验室
    section 专利与商业化
        1983 : RSA 获得美国专利<br/>专利号 4,405,829
        1982 : RSA Data Security 成立<br/>商业化推广
        1991 : #1 标准发布
    section 标准化与普及
        1994 : RSA-129 被破解<br/>证实需要更大密钥
        2000 : RSA 专利到期<br/>成为公共领域
        2004 : NIST 发布<br/>SP 800-56B 标准
    section 现代应用
        2010s : 广泛应用于<br/>TLS/HTTPS
        2020s : 逐渐向 ECC 迁移<br/>但 RSA 仍占主导
```

### 三位发明者

| 人物 | 背景 | 贡献 |
|------|------|------|
| Ron Rivest | MIT 计算机科学教授 | 算法设计主导者 |
| Adi Shamir | 以色列数学家 | 数学理论贡献 |
| Leonard Adleman | 计算机科学家 | 理论验证 |

## 数学基础

### 1. 质数与因数分解

**质数（素数）**：只能被 1 和自身整除的大于 1 的自然数。

```
质数示例：2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, ...
```

**因数分解问题**：给定两个大质数的乘积 n = p × q，找出 p 和 q 是极其困难的。

```mermaid
flowchart LR
    subgraph "容易 - 正向"
        A["质数 p"] --> C["n = p × q"]
        B["质数 q"] --> C
    end

    subgraph "困难 - 反向"
        D["n = 一个 2048 位的数"] --> E["分解为 p 和 q ?"]
        E --> F["计算上不可行<br/>需要数十亿年"]
    end
```

### 2. 模运算

**取模运算**：a mod n 表示 a 除以 n 的余数。

```
17 mod 5 = 2   (因为 17 = 3 × 5 + 2)
23 mod 7 = 2   (因为 23 = 3 × 7 + 2)
```

**同余关系**：若 a mod n = b mod n，记作 a ≡ b (mod n)

### 3. 欧拉函数 φ(n)

对于正整数 n，欧拉函数 φ(n) 表示小于 n 且与 n 互质的正整数个数。

```
φ(1) = 1
φ(p) = p - 1           (p 为质数)
φ(p×q) = (p-1)×(q-1)   (p, q 为不同质数)
φ(12) = 4              (1, 5, 7, 11 与 12 互质)
```

### 4. 欧拉定理

若 a 和 n 互质（gcd(a, n) = 1），则：

```
a^φ(n) ≡ 1 (mod n)
```

**推论**：a^(φ(n)+1) ≡ a (mod n)

### 5. 模逆元

若 e 和 φ(n) 互质，存在整数 d 使得：

```
e × d ≡ 1 (mod φ(n))
```

d 称为 e 的模逆元，记作 d = e^(-1) mod φ(n)

## RSA 算法原理

### 密钥生成

```mermaid
flowchart TB
    A["1. 选择两个大质数 p 和 q"] --> B["2. 计算 n = p × q<br/>(模数，公钥的一部分)"]
    B --> C["3. 计算欧拉函数<br/>φ(n) = (p-1)(q-1)"]
    C --> D["4. 选择公钥指数 e<br/>满足 1 < e < φ(n)<br/>且 gcd(e, φ(n)) = 1"]
    D --> E["5. 计算私钥指数 d<br/>d = e^(-1) mod φ(n)<br/>即 e × d ≡ 1 (mod φ(n))"]
    E --> F["公钥: (n, e)"]
    E --> G["私钥: (n, d) 或 (p, q, d)"]
```

### 加密与解密

**加密**（使用公钥）：
```
密文 c = m^e mod n
```

**解密**（使用私钥）：
```
明文 m = c^d mod n
```

### 为什么能正确解密？

由欧拉定理推导：

```
c = m^e mod n
c^d = (m^e)^d mod n
    = m^(e×d) mod n
    = m^(k×φ(n)+1) mod n    (因为 e×d ≡ 1 mod φ(n))
    = m × m^(k×φ(n)) mod n
    = m × (m^φ(n))^k mod n
    = m × 1^k mod n          (欧拉定理)
    = m mod n
```

### 完整示例（小数字）

```
1. 选择质数：p = 61, q = 53

2. 计算模数：n = 61 × 53 = 3233

3. 计算欧拉函数：φ(n) = (61-1) × (53-1) = 60 × 52 = 3120

4. 选择公钥指数：e = 17（与 3120 互质）

5. 计算私钥指数：d = 17^(-1) mod 3120 = 2753
   验证：17 × 2753 = 46801 = 15 × 3120 + 1 ✓

公钥：(n=3233, e=17)
私钥：(n=3233, d=2753)

加密消息 m = 123：
c = 123^17 mod 3233 = 855

解密密文 c = 855：
m = 855^2753 mod 3233 = 123 ✓
```

## 密钥长度与安全性

### 安全强度对比

| RSA 密钥长度 | 对称加密等价强度 | 安全性评估 |
|-------------|-----------------|-----------|
| 1024 bits | 80 bits | ❌ 已不安全 |
| 2048 bits | 112 bits | ✅ 当前标准 |
| 3072 bits | 128 bits | ✅ 推荐用于长期 |
| 4096 bits | 140 bits | ✅ 高安全场景 |
| 8192 bits | 168 bits | ⚠️ 性能开销大 |

### 为什么需要这么长的密钥？

```mermaid
flowchart LR
    A["RSA 安全性<br/>基于大数分解"] --> B{"破解难度"}
    B --> C["暴力尝试<br/>需要尝试所有可能因子"]
    C --> D["n 位的数<br/>可能有 2^(n/2) 个因子"]
    D --> E["2048 位: 2^1024 种可能<br/>约 10^308 次运算"]
    E --> F["宇宙年龄内<br/>无法穷举完成"]
```

### 历史上被破解的 RSA 挑战

| 挑战 | 密钥长度 | 破解时间 | 破解者 |
|------|---------|---------|--------|
| RSA-100 | 330 bits | 1991 年 | 多个团队 |
| RSA-129 | 426 bits | 1994 年（17年） | 600 志愿者 |
| RSA-155 | 512 bits | 1999 年 | 国际团队 |
| RSA-640 | 193 bits | 2005 年 | F. Bahr 等 |
| RSA-768 | 232 bits | 2009 年 | 国际团队 |
| RSA-250 | 829 bits | 2020 年 | Boudot 等 |

## RSA 的两种主要用途

### 1. 加密通信（机密性）

```mermaid
sequenceDiagram
    participant Alice
    participant Bob

    Note over Bob: 生成密钥对<br/>公钥 (n, e), 私钥 (n, d)
    Bob->>Alice: 发送公钥 (n, e)

    Note over Alice: 消息 m
    Alice->>Alice: c = m^e mod n
    Alice->>Bob: 发送密文 c

    Note over Bob: 解密
    Bob->>Bob: m = c^d mod n
```

### 2. 数字签名（真实性与不可否认）

```mermaid
sequenceDiagram
    participant Alice
    participant Bob

    Note over Alice: 签名<br/>s = m^d mod n
    Alice->>Bob: 发送消息 m 和签名 s

    Note over Bob: 验证签名<br/>s^e mod n = m ?
    Bob->>Bob: 比较结果
```

## PKCS 标准

PKCS (Public Key Cryptography Standards，公钥密码学标准) 是由 RSA Data Security 公司制定的一系列标准，定义了 RSA 等公钥算法在实际应用中的实现规范。

### PKCS 与 RSA 的关系

```mermaid
flowchart TB
    subgraph "RSA 算法"
        A["数学原理<br/>大数分解难题"]
    end

    subgraph "PKCS 标准"
        B["PKCS#1<br/>RSA 实现规范"]
        C["PKCS#8<br/>私钥格式"]
        D["PKCS#12<br/>证书打包"]
    end

    A --> B
    B --> E["加密方案<br/>RSAES-OAEP"]
    B --> F["签名方案<br/>RSASSA-PSS"]
    C --> G["私钥存储<br/>PEM/DER 格式"]
    D --> H[".p12/.pfx 文件<br/>私钥+证书"]
```

### PKCS 系列标准一览

| 编号 | 名称 | 说明 | 与 RSA 的关系 |
|------|------|------|---------------|
| **PKCS#1** | RSA Cryptography Standard | RSA 加密和签名的核心规范 | ⭐ 最重要：定义填充、编解码 |
| PKCS#3 | Diffie-Hellman Key Agreement | DH 密钥交换 | 可与 RSA 配合用于密钥协商 |
| PKCS#5 | Password-based Encryption (PBES) | 基于密码的加密 | 用于加密保护 RSA 私钥 |
| PKCS#7 | Cryptographic Message Syntax (CMS) | 加密消息语法 | 封装 RSA 加密的数据结构 |
| **PKCS#8** | Private-Key Information Syntax | 私钥信息语法 | RSA 私钥的标准存储格式 |
| PKCS#10 | Certification Request | 证书请求格式 | CSR 文件格式 |
| **PKCS#11** | Cryptographic Token Interface | 加密令牌接口 | HSM/智能卡中 RSA 操作的 API |
| **PKCS#12** | Personal Information Exchange | 个人信息交换 | .p12/.pfx 格式，打包私钥和证书 |

### PKCS#1 详解

PKCS#1 是 RSA 最重要的标准，定义了：

```
PKCS#1 v2.2 主要内容
├── 1. 密钥表示
│   ├── RSAPublicKey 格式
│   └── RSAPrivateKey 格式
├── 2. 加密方案 (RSAES)
│   ├── RSAES-PKCS1-v1_5  (旧版，不推荐用于新系统)
│   └── RSAES-OAEP        (推荐，抗选择密文攻击)
├── 3. 签名方案 (RSASSA)
│   ├── RSASSA-PKCS1-v1_5 (广泛使用，向后兼容)
│   └── RSASSA-PSS        (推荐，可证明安全)
└── 4. 辅助算法
    ├── MGF (Mask Generation Function)
    └── 哈希函数使用规范
```

### PKCS#8 私钥格式

```mermaid
flowchart LR
    A["RSA 私钥"] --> B["PKCS#8 格式"]
    B --> C["未加密 PEM"]
    B --> D["加密 PEM<br/>(PBES2 + AES)"]

    C --> E["-----BEGIN PRIVATE KEY-----"]
    D --> F["-----BEGIN ENCRYPTED PRIVATE KEY-----"]
```

**PKCS#8 私钥结构 (ASN.1)：**

```
PrivateKeyInfo ::= SEQUENCE {
    version         INTEGER,
    algorithm       AlgorithmIdentifier,  -- 标识 RSA
    privateKey      OCTET STRING,         -- RSAPrivateKey
    attributes      [0] Attributes OPTIONAL
}

EncryptedPrivateKeyInfo ::= SEQUENCE {
    encryptionAlgorithm  AlgorithmIdentifier,  -- PBES2
    encryptedData        OCTET STRING
}
```

### PKCS#12 证书容器

PKCS#12（.p12 或 .pfx）用于打包私钥和证书链：

```
PKCS#12 容器内容
├── 用户私钥（加密）
├── 用户证书
├── 中间证书
└── 根证书（可选）
```

**生成和使用示例：**

```bash
# 从 PEM 转换为 PKCS#12
openssl pkcs12 -export \
    -inkey private.key \
    -in certificate.crt \
    -certfile ca-bundle.crt \
    -out bundle.p12 \
    -name "My Certificate"

# 从 PKCS#12 提取私钥
openssl pkcs12 -in bundle.p12 -nocerts -out private.key

# 从 PKCS#12 提取证书
openssl pkcs12 -in bundle.p12 -clcerts -nokeys -out certificate.crt
```

### PKCS#11 HSM 接口

PKCS#11 定义了与硬件安全模块 (HSM) 交互的标准 API：

```c
// PKCS#11 基本操作流程
CK_FUNCTION_LIST *funcs;

// 初始化
funcs->C_Initialize(NULL);

// 登录 HSM
funcs->C_Login(session, CKU_USER, pin, pin_len);

// 生成 RSA 密钥对
CK_ATTRIBUTE publicKeyTemplate[] = {
    {CKA_MODULUS_BITS, &modulusBits, sizeof(modulusBits)},
    {CKA_PUBLIC_EXPONENT, &publicExponent, sizeof(publicExponent)}
};
funcs->C_GenerateKeyPair(session, &mechanism,
    publicKeyTemplate, 3, privateKeyTemplate, 3,
    &hPublicKey, &hPrivateKey);

// 使用私钥签名
funcs->C_SignInit(session, &sigMechanism, hPrivateKey);
funcs->C_Sign(session, data, dataLen, signature, &sigLen);
```

### PKCS#1 vs PKCS#8 私钥格式对比

```bash
# PKCS#1 格式 (传统 RSA 私钥格式)
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...

# PKCS#8 格式 (通用私钥格式，推荐)
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkq...
```

| 特性 | PKCS#1 | PKCS#8 |
|------|--------|--------|
| 格式 | RSA 专用 | 通用格式 |
| 加密支持 | 需要额外包装 | 内置加密支持 |
| 算法标识 | 无（隐含 RSA） | 包含算法 OID |
| 推荐度 | 向后兼容 | ✅ 推荐 |

## RSA 填充方案

直接使用"教科书 RSA"是不安全的，需要添加填充。

### 为什么需要填充？

```
❌ 无填充的问题：
1. 确定性：相同明文产生相同密文
2. 可乘性：m1^e × m2^e = (m1×m2)^e mod n
3. 小指数攻击：m < n^(1/e) 时可直接开方
4. 低熵明文易被字典攻击
```

### PKCS#1 v1.5 填充

**加密填充：**

```
EM = 0x00 || 0x02 || PS || 0x00 || M

其中：
- PS: 随机填充字节（至少 8 字节）
- M: 原始消息
```

**签名填充：**

```
EM = 0x00 || 0x01 || PS || 0x00 || DigestInfo

其中：
- PS: 0xFF 字节填充
- DigestInfo: 哈希算法标识 + 消息摘要
```

### OAEP（最优非对称加密填充）

```mermaid
flowchart TB
    subgraph "OAEP 填充流程"
        A["消息 M"] --> B["与随机种子进行<br/>MGF 掩码生成"]
        B --> C["与哈希后的标签<br/>进行 XOR"]
        C --> D["生成填充后的<br/>编码消息 EM"]
    end

    subgraph "OAEP 优点"
        E["非确定性<br/>相同消息产生不同密文"]
        F["可证明安全<br/>在随机预言模型下"]
        G["抗选择密文攻击<br/>CCA 安全"]
    end
```

### PSS（概率签名方案）

```mermaid
flowchart TB
    A["消息 M"] --> B["计算哈希 H(M)"]
    B --> C["生成随机盐值 salt"]
    C --> D["计算 M' = H(M) || salt"]
    D --> E["计算 H(M')"]
    E --> F["使用 MGF 生成掩码"]
    F --> G["组合生成签名"]
```

## 实际应用场景

### 1. TLS/HTTPS

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: ClientHello
    Server->>Client: ServerHello + 证书(含 RSA 公钥)

    Note over Client: 生成预主密钥 PMS
    Client->>Client: 加密 PMS = RSA_Encrypt(server_pub, PMS)
    Client->>Server: 发送加密的 PMS

    Note over Server: PMS = RSA_Decrypt(private_key, encrypted_PMS)
    Note over Client,Server: 双方使用 PMS 生成会话密钥

    Client->>Server: 使用会话密钥加密通信
    Server->>Client: 使用会话密钥加密通信
```

### 2. 代码签名

```
1. 开发者用私钥对软件哈希签名
2. 用户下载软件时获取签名
3. 用开发者公钥验证签名
4. 确认软件未被篡改且来源可信
```

### 3. SSH 认证

```bash
# 生成 RSA 密钥对
ssh-keygen -t rsa -b 4096 -C "user@example.com"

# 公钥放到服务器 ~/.ssh/authorized_keys
# 私钥保存在本地 ~/.ssh/id_rsa

# 登录时用私钥签名挑战，服务器用公钥验证
```

### 4. 电子邮件加密 (S/MIME, PGP)

```
发送加密邮件：
1. 生成随机对称密钥 K
2. 用 K 加密邮件内容
3. 用接收者 RSA 公钥加密 K
4. 发送：加密的邮件 + 加密的 K

接收解密：
1. 用 RSA 私钥解密得到 K
2. 用 K 解密邮件内容
```

## RSA vs ECC 对比

| 特性 | RSA | ECC (椭圆曲线) |
|------|-----|----------------|
| 密钥长度 | 2048-4096 bits | 256-521 bits |
| 安全强度 | 需要更长密钥 | 更短密钥同等安全 |
| 计算速度 | 较慢（签名/验签） | 较快 |
| 带宽占用 | 较大 | 较小 |
| 专利 | 已过期 | 基本无限制 |
| 成熟度 | 高，广泛部署 | 高，逐渐普及 |
| 适用场景 | 传统系统、兼容性要求 | 移动设备、物联网 |

```mermaid
flowchart LR
    subgraph "同等安全强度对比"
        A["RSA 2048 bits"] --> C["~112 bits 安全性"]
        B["ECC 256 bits"] --> C
    end
```

## 代码实现示例

### Python (cryptography 库)

```python
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding

# 生成 RSA 密钥对
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)
public_key = private_key.public_key()

# 加密
message = b"Hello, RSA!"
ciphertext = public_key.encrypt(
    message,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# 解密
plaintext = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)
print(plaintext.decode())  # Hello, RSA!

# 签名
signature = private_key.sign(
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH
    ),
    hashes.SHA256()
)

# 验签
public_key.verify(
    signature,
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH
    ),
    hashes.SHA256()
)
```

### Java (标准库)

```java
import java.security.*;
import javax.crypto.Cipher;

public class RSAExample {
    public static void main(String[] args) throws Exception {
        // 生成密钥对
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();

        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();

        // 加密
        String message = "Hello, RSA!";
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] ciphertext = cipher.doFinal(message.getBytes());

        // 解密
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] plaintext = cipher.doFinal(ciphertext);
        System.out.println(new String(plaintext));

        // 签名
        Signature sign = Signature.getInstance("SHA256withRSA");
        sign.initSign(privateKey);
        sign.update(message.getBytes());
        byte[] signature = sign.sign();

        // 验签
        sign.initVerify(publicKey);
        sign.update(message.getBytes());
        boolean valid = sign.verify(signature);
        System.out.println("Signature valid: " + valid);
    }
}
```

### Go (crypto/rsa)

```go
package main

import (
    "crypto/rand"
    "crypto/rsa"
    "crypto/sha256"
    "fmt"
)

func main() {
    // 生成密钥对
    privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
    if err != nil {
        panic(err)
    }
    publicKey := &privateKey.PublicKey

    message := []byte("Hello, RSA!")

    // 加密 (OAEP)
    ciphertext, err := rsa.EncryptOAEP(
        sha256.New(),
        rand.Reader,
        publicKey,
        message,
        nil,
    )

    // 解密
    plaintext, err := rsa.DecryptOAEP(
        sha256.New(),
        rand.Reader,
        privateKey,
        ciphertext,
        nil,
    )
    fmt.Println(string(plaintext))

    // 签名 (PSS)
    hashed := sha256.Sum256(message)
    signature, err := rsa.SignPSS(
        rand.Reader,
        privateKey,
        crypto.SHA256,
        hashed[:],
        nil,
    )

    // 验签
    err = rsa.VerifyPSS(
        publicKey,
        crypto.SHA256,
        hashed[:],
        signature,
        nil,
    )
    fmt.Println("Signature valid:", err == nil)
}
```

### Node.js (crypto 模块)

```javascript
const crypto = require('crypto');

// 生成密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

const message = 'Hello, RSA!';

// 加密
const ciphertext = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
  Buffer.from(message)
);

// 解密
const plaintext = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
  ciphertext
);
console.log(plaintext.toString());

// 签名
const sign = crypto.createSign('SHA256');
sign.update(message);
sign.end();
const signature = sign.sign(privateKey);

// 验签
const verify = crypto.createVerify('SHA256');
verify.update(message);
verify.end();
const valid = verify.verify(publicKey, signature);
console.log('Signature valid:', valid);
```

## 安全最佳实践

### 1. 密钥长度

```javascript
// ❌ 不安全
const weakKey = crypto.generateKeyPairSync('rsa', { modulusLength: 1024 });

// ✅ 推荐
const secureKey = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

// ✅ 高安全场景
const highSecurityKey = crypto.generateKeyPairSync('rsa', { modulusLength: 4096 });
```

### 2. 公钥指数选择

```
推荐使用 e = 65537 (0x10001)

原因：
1. 足够大，防止小指数攻击
2. 是质数，与 φ(n) 互质的概率高
3. 二进制只有两个 1，计算效率高
4. 已被广泛验证和标准化
```

### 3. 填充方案选择

| 用途 | 推荐填充 | 不推荐 |
|------|----------|--------|
| 加密 | OAEP (RSAES-OAEP) | PKCS#1 v1.5（有 Bleichenbacher 攻击风险） |
| 签名 | PSS (RSASSA-PSS) | PKCS#1 v1.5（可用但有风险） |

### 4. 密钥存储

```mermaid
flowchart TB
    A["RSA 私钥存储"] --> B["硬件安全模块 HSM"]
    A --> C["密钥管理服务 KMS"]
    A --> D["加密存储<br/>使用强密码"]
    A --> E["访问控制<br/>最小权限原则"]

    style B fill:#e8f5e9
    style C fill:#e8f5e9
```

### 5. 常见攻击与防护

| 攻击类型 | 原理 | 防护措施 |
|----------|------|----------|
| Bleichenbacher | 利用 PKCS#1 v1.5 错误信息 | 使用 OAEP |
| 时间攻击 | 分析解密时间推断密钥 | 恒定时间实现 |
| 共模攻击 | 相同 n 不同 e 加密 | 每个用户独立 n |
| 小指数攻击 | e 太小且消息短 | 使用 e=65537，消息填充 |
| 因数分解 | 算法进步 | 使用 ≥2048 位密钥 |

### 6. 性能优化建议

```
1. 使用 CRT (中国剩余定理) 加速私钥运算
   - 将 d 分解为 dp = d mod (p-1) 和 dq = d mod (q-1)
   - 分别计算再合并，速度提升约 4 倍

2. 避免频繁生成新密钥对
   - 密钥生成非常慢（寻找大质数）
   - 缓存和复用密钥对

3. 大数据加密使用混合方案
   - RSA 加密对称密钥
   - 对称算法加密数据
   - 结合两者优点
```

## 混合加密方案

RSA 加密速度慢，通常与对称加密结合使用：

```mermaid
flowchart TB
    subgraph "发送方"
        A["明文数据"] --> B["对称加密<br/>AES-256-GCM"]
        C["随机生成<br/>会话密钥 K"] --> B
        C --> D["RSA 加密<br/>会话密钥 K"]
    end

    subgraph "传输"
        B --> E["加密数据"]
        D --> F["加密的会话密钥"]
    end

    subgraph "接收方"
        F --> G["RSA 解密<br/>得到会话密钥 K"]
        E --> H["AES 解密<br/>使用 K"]
        G --> H
        H --> I["明文数据"]
    end
```

```python
# 混合加密示例
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes
import os

# 生成随机会话密钥
session_key = AESGCM.generate_key(bit_length=256)

# 用 RSA 加密会话密钥
encrypted_session_key = public_key.encrypt(
    session_key,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# 用 AES 加密数据
aesgcm = AESGCM(session_key)
nonce = os.urandom(12)
ciphertext = aesgcm.encrypt(nonce, b"Large data to encrypt", None)

# 传输：encrypted_session_key + nonce + ciphertext
```

## 总结

```mermaid
mindmap
  root((RSA))
    数学基础
      大数分解难题
      欧拉定理
      模逆元
    密钥管理
      公钥 分发
      私钥 保密
      密钥长度 2048+
    应用场景
      加密通信
      数字签名
      密钥交换
      代码签名
    安全实践
      OAEP 填充
      PSS 签名
      HSM 存储
      定期轮换
    发展趋势
      向 ECC 迁移
      后量子密码
      混合方案
```

### 关键要点

1. **数学原理**：基于大整数因数分解的困难性
2. **密钥长度**：至少 2048 位，推荐 3072 或 4096 位
3. **填充方案**：加密用 OAEP，签名用 PSS
4. **性能优化**：大数据使用混合加密方案
5. **未来趋势**：逐渐向 ECC 和后量子密码迁移

### 快速参考

```
密钥生成：n = p × q, φ(n) = (p-1)(q-1), e 常用 65537, d = e^(-1) mod φ(n)
加密：c = m^e mod n
解密：m = c^d mod n
签名：s = m^d mod n
验签：m = s^e mod n
```

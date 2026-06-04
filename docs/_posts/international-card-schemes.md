---
title: 国际七大卡组织：各管哪一段路
date: 2026-02-27
categories:
  - 支付
tags:
  - 银行卡组织
  - 支付网络
  - Visa
  - Mastercard
  - 国际支付
author: 老Z
---

下面把 **Visa、Mastercard、Amex、Discover、JCB、银联、Diners** 几家串一遍：各自偏 **开放式还是闭环**、在哪些区域好使、卡号长啥样。文里的交易量、覆盖率多来自 **年报/宣传口径**，和精算报表不会一模一样；接通道前仍以 **收单合同和 MCC 实际支持** 为准。

## 什么是银行卡组织？

**卡组织（Card Scheme / Network）** 就是定规则、跑清算的那层：**发卡行、收单行、商户** 都挂在它的规矩上转钱。它不替你刷卡，但 **BIN、拒付规则、3DS、Token 标准** 往往从这儿出来。

```mermaid
flowchart TB
    subgraph "支付生态中的卡组织"
        A[持卡人] --> B[发卡银行<br/>Issuer]
        B --> C[银行卡组织<br/>Card Scheme]
        C --> D[收单机构<br/>Acquirer]
        D --> E[商户<br/>Merchant]

        C --> F[制定交易规则]
        C --> G[清算结算网络]
        C --> H[风险管理标准]
    end

    style C fill:#4a90d9,color:#fff
```

## 七大国际卡组织概览

脑图当 **目录** 用；细节以各节表格为准。

```mermaid
mindmap
  root((七大卡组织))
    Visa
      美国起源
      全球最大
      借记卡+信用卡
    Mastercard
      美国起源
      全球第二
      联系+万事达
    American Express
      美国起源
      自营发卡
      高端商务
    Discover
      美国起源
      无年费理念
      现金返还先驱
    JCB
      日本起源
      亚洲强势
      日本唯一国际品牌
    UnionPay
      中国起源
      发卡量第一
      快速国际化
    Diners Club
      首张信用卡
      商务旅行
      大额消费
```

## 各卡组织详细介绍

按 **开放式网络** 和 **自营闭环** 两类跳着看会更快；每家后面的 **卡号段** 对接风控和路由时常用。

### 1. Visa

```mermaid
flowchart LR
    subgraph "Visa 档案"
        A[成立时间: 1958年]
        B[总部: 美国旧金山]
        C[上市: NYSE: V]
        D[覆盖: 200+国家/地区]
    end
```

**发展历程**

| 年份 | 里程碑 |
|------|--------|
| 1958 | 美国银行推出 BankAmericard |
| 1970 | 成立 National BankAmericard Inc. |
| 1976 | 更名为 Visa |
| 2008 | 纽约证券交易所上市 |
| 2024 | 全球交易量超 $15 万亿 |

**核心特点**

- **覆盖面**：对外口径常写 200+ 国家/地区（以当地收单支持为准）
- **产品线**：信用卡 + Visa Electron 等借记子品牌
- **处理能力**：VisaNet 量级在公开材料里是 **万级 TPS** 那一档
- **Token 等**：VTS 一类标记化服务对接 EMVCo 路线

**卡号识别**

```
Visa 卡号范围：
┌─────────────────────────────────┐
│ 以 4 开头                        │
│ 长度：13、16 或 19 位            │
│ 示例：4111 1111 1111 1111       │
└─────────────────────────────────┘
```

### 2. Mastercard

```mermaid
flowchart LR
    subgraph "Mastercard 档案"
        A[成立时间: 1966年]
        B[总部: 美国纽约]
        C[上市: NYSE: MA]
        D[覆盖: 210+国家/地区]
    end
```

**发展历程**

| 年份 | 里程碑 |
|------|--------|
| 1966 | 多家银行联合成立 ICA |
| 1969 | 更名为 Master Charge |
| 1979 | 更名为 Mastercard |
| 2006 | 纽约证券交易所上市 |
| 2024 | 品牌价值全球前 20 |

**核心特点**

- **双品牌策略**：Mastercard（信用卡）+ Maestro（借记卡）
- **无价城市**：全球营销活动，覆盖 100+ 城市
- **数字支付**：Masterpass、Identity Check
- **金融包容性**：致力于 2025 年让 10 亿人获得金融服务

**卡号识别**

```
Mastercard 卡号范围：
┌─────────────────────────────────┐
│ 以 51-55 或 2221-2720 开头      │
│ 长度：16 位                     │
│ 示例：5500 0000 0000 0004      │
└─────────────────────────────────┘
```

### 3. American Express (Amex)

```mermaid
flowchart LR
    subgraph "American Express 档案"
        A[成立时间: 1850年]
        B[总部: 美国纽约]
        C[上市: NYSE: AXP]
        D[模式: 自营发卡+收单]
    end
```

**发展历程**

| 年份 | 里程碑 |
|------|--------|
| 1850 | 成立快递公司 |
| 1891 | 发明旅行支票 |
| 1958 | 发行第一张信用卡 |
| 1999 | 推出蓝卡 Blue Card |
| 2024 | 全球高端卡市场领先 |

**核心特点**

- **闭环模式**：既是发卡行也是收单行
- **高端定位**：年费高，权益丰富
- **商务旅行**：企业差管服务领先
- **高消费人群**：平均交易金额最高

**卡号识别**

```
American Express 卡号范围：
┌─────────────────────────────────┐
│ 以 34 或 37 开头                │
│ 长度：15 位                     │
│ 格式：XXXX XXXXXX XXXXX         │
│ 示例：3782 822463 10005        │
└─────────────────────────────────┘
```

### 4. Discover

```mermaid
flowchart LR
    subgraph "Discover 档案"
        A[成立时间: 1985年]
        B[总部: 美国伊利诺伊]
        C[上市: NYSE: DFS]
        D[特色: 无年费+返现"]
    end
```

**发展历程**

| 年份 | 里程碑 |
|------|--------|
| 1985 | Sears 推出 Discover Card |
| 2004 | 发现金卡国际收购 Pulse 网络 |
| 2007 | 从摩根士丹利分拆独立上市 |
| 2008 | 收购 Diners Club 国际 |
| 2024 | 美国返现卡市场领先 |

**核心特点**

- **无年费理念**：首创免年费信用卡
- **现金返还**：返现奖励计划先驱
- **美国本土**：主要市场在美国
- **收购 Diners**：拓展国际网络

**卡号识别**

```
Discover 卡号范围：
┌─────────────────────────────────┐
│ 以 6011、644-649、65 开头       │
│ 长度：16 或 19 位               │
│ 示例：6011 1111 1111 1117      │
└─────────────────────────────────┘
```

### 5. JCB (Japan Credit Bureau)

```mermaid
flowchart LR
    subgraph "JCB 档案"
        A[成立时间: 1961年]
        B[总部: 日本东京]
        C[性质: 非上市公司]
        D[覆盖: 190+国家/地区"]
    end
```

**发展历程**

| 年份 | 里程碑 |
|------|--------|
| 1961 | 日本信用 bureau 成立 |
| 1981 | 开始国际化扩张 |
| 1987 | 在美国发行卡片 |
| 2012 | 与 Discover 签署战略合作 |
| 2024 | 亚洲市场强势品牌 |

**核心特点**

- **日本唯一**：日本唯一的国际卡品牌
- **亚洲强势**：在东亚、东南亚接受度高
- **高端服务**：JCB Plaza 旅行服务
- **战略合作**：与 Discover 互惠合作

**卡号识别**

```
JCB 卡号范围：
┌─────────────────────────────────┐
│ 以 3528-3589 开头               │
│ 长度：16 位                     │
│ 示例：3530 1113 3330 0000      │
└─────────────────────────────────┘
```

### 6. UnionPay (中国银联)

```mermaid
flowchart LR
    subgraph "UnionPay 档案"
        A[成立时间: 2002年]
        B[总部: 中国上海]
        C[性质: 国有控股]
        D[发卡量: 全球第一"]
    end
```

**发展历程**

| 年份 | 里程碑 |
|------|--------|
| 2002 | 在上海成立 |
| 2004 | 开始国际化 |
| 2010 | 超越 Visa 成为发卡量第一 |
| 2015 | 成为全球最大银行卡组织 |
| 2024 | 覆盖 180+ 国家和地区 |

**核心特点**

- **发卡量第一**：全球发卡量最大
- **中国市场**：国内近乎垄断地位
- **快速国际化**：境外接受度持续提升
- **移动支付**：云闪付、二维码支付

**卡号识别**

```
UnionPay 卡号范围：
┌─────────────────────────────────┐
│ 以 62 开头                      │
│ 长度：16 或 19 位               │
│ 示例：6225 8801 2345 6789      │
└─────────────────────────────────┘
```

### 7. Diners Club

```mermaid
flowchart LR
    subgraph "Diners Club 档案"
        A[成立时间: 1950年]
        B[总部: 美国]
        C[归属: Discover]
        D[特色: 世界首张信用卡"]
    end
```

**发展历程**

| 年份 | 里程碑 |
|------|--------|
| 1950 | 大来俱乐部成立，首张信用卡 |
| 1981 | 被 Citicorp 收购 |
| 2004 | 大部分业务被 Discover 收购 |
| 2024 | 专注商务旅行市场 |

**核心特点**

- **历史最悠久**：世界第一张多用途信用卡
- **商务定位**：专注商务人士和旅行
- **高端服务**：机场贵宾厅服务
- **大额消费**：无预设消费限额

**卡号识别**

```
Diners Club 卡号范围：
┌─────────────────────────────────┐
│ 以 36、38、39 开头              │
│ 长度：14-19 位                  │
│ 示例：3056 9309 0259 04        │
└─────────────────────────────────┘
```

## 卡组织对比分析

下图 **纯属示意**：真实份额随统计口径（笔数、金额、境内/跨境）变很大，别拿柱状图去写招股书。

### 市场份额对比

```mermaid
xychart-beta
    title "2024年全球银行卡交易量占比（示意，勿当精确值）"
    x-axis ["Visa", "Mastercard", "UnionPay", "Amex", "其他"]
    y-axis "市场份额 %" 0 --> 60
    bar [45, 28, 15, 8, 4]
```

### 商业模式对比

| 特性 | Visa/Mastercard | American Express | Discover | UnionPay |
|------|-----------------|------------------|----------|----------|
| 模式 | 开放式 | 闭环式 | 闭环式 | 开放式 |
| 发卡 | 银行发卡 | 自营发卡 | 自营+合作 | 银行发卡 |
| 收单 | 独立收单 | 自营收单 | 自营收单 | 银行收单 |
| 费率（极粗） | 常区间约 1.5–2.5% | 常高于 Visa/MC | 视产品 | 境内常偏低 |

### 地域优势

```mermaid
flowchart TB
    subgraph "各卡组织地域优势"
        A["北美市场"]
        A1[Visa]
        A2[Mastercard]
        A3[Amex]
        A4[Discover]

        B["欧洲市场"]
        B1[Visa]
        B2[Mastercard]

        C["亚洲市场"]
        C1[UnionPay]
        C2[JCB]
        C3[Visa]

        D["中国市场"]
        D1[UnionPay]
    end
```

## 卡号识别规则汇总

**只看首位不够**：Mastercard 新 BIN、62 银联与 Discover 区间会撞车嫌疑，生产环境请用 **卡组织官方 BIN 表或网关返回的 brand**。

```mermaid
flowchart TB
    A[卡号第一位] --> B{判断卡组织}

    B -->|4| C[Visa]
    B -->|5| D{第二位}
    B -->|3| E{第二位}
    B -->|6| F{后续位}
    B -->|2| G{后续位}

    D -->|1-5 或 2221-2720| H[Mastercard]

    E -->|4 或 7| I[Amex]
    E -->|0| J[Diners Club]
    E -->|5-8| K[JCB]

    F -->|5| L[Discover]
    F -->|22-27 或 4-9| M[Mastercard]
    F -->|2| N[UnionPay]

    G -->|221-2720| O[Mastercard]
```

### BIN/IIN 范围速查表

| 卡组织 | BIN 范围 | 卡号长度 |
|--------|----------|----------|
| Visa | 4 | 13, 16, 19 |
| Mastercard | 51-55, 2221-2720 | 16 |
| Amex | 34, 37 | 15 |
| Discover | 6011, 644-649, 65, 622126-622925 | 16, 19 |
| JCB | 3528-3589 | 16 |
| UnionPay | 62 | 16, 19 |
| Diners Club | 36, 38, 39, 3095 | 14-19 |

## 技术标准与安全

几家大头都是 **EMVCo 股东**，所以芯片、3DS、QR、Token 规范会往一处凑；落地仍要看 **你接的 PSP 支持到哪版**。

### EMV 芯片标准

```mermaid
flowchart TB
    subgraph "EMVCo 股东"
        A[Visa]
        B[Mastercard]
        C[Amex]
        D[JCB]
        E[Discover]
        F[UnionPay]
    end

    subgraph "EMV 标准"
        G[芯片卡规范]
        H[3-D Secure]
        I[支付标记化]
        J[二维码支付]
    end

    A --> G
    B --> G
    C --> G
    D --> G
    E --> G
    F --> G
```

### 3-D Secure 认证

| 版本 | 特点 | 卡组织支持 |
|------|------|------------|
| 3DS 1.0 | 静态密码，体验差 | 全部支持 |
| 3DS 2.0 | 风险评估，无感认证 | 全部支持 |
| 3DS 2.2 | 强客户认证 SCA | 全部支持 |

### PCI DSS 合规

碰 **PAN / 磁道 / CVV** 的都要进 PCI 圈，和 logo 是 Visa 还是银联无关。详见 [PCI DSS 入门指南](/posts/pci-dss-overview.html)。

## 选择建议

**持卡人**：看常去哪国、要不要里程权益；**商户**：看客群币种和 **MCC 能开哪些 brand**，别盲目「全接」。

### 对消费者

```mermaid
flowchart TB
    A[选择信用卡] --> B{主要用途}

    B -->|全球旅行| C[Visa/Mastercard<br/>接受度最高]
    B -->|高端权益| D[American Express<br/>服务优质]
    B -->|国内消费| E[UnionPay<br/>手续费低]
    B -->|日本旅行| F[JCB<br/>日本优惠多]
```

### 对商户

| 考虑因素 | 建议 |
|----------|------|
| 客户群体 | 根据客户来源地选择支持的主要卡组织 |
| 交易成本 | UnionPay 费率较低，Visa/MC 居中，Amex 较高 |
| 欺诈风险 | 全部支持，使用 3-D Secure 降低风险 |
| 技术对接 | 通过聚合支付网关一次对接多卡组织 |

## 行业里常见的几个方向

时间线当 **叙事用**；具体产品名、年份以各公司发布为准。

### 数字化转型

```mermaid
timeline
    title 支付技术演进（示意）
    section 传统时代
        1950 : 首张信用卡
        1960s : 磁条卡
    section 芯片时代
        1994 : EMV 芯片标准
        2000s : 芯片卡普及
    section 数字时代
        2010 : 移动支付兴起
        2014 : Apple Pay
        2015 : Android Pay
    section 智能时代
        2020 : 无感支付
        2024 : 风控模型迭代
        未来 : 生物识别仍看监管
```

### 新兴技术

| 技术 | 应用 | 主要推动者 |
|------|------|------------|
| Tokenization | 支付标记化 | EMVCo 全体 |
| NFC | 非接触支付 | Visa, MC |
| QR Code | 二维码支付 | UnionPay, MC |
| Cryptocurrency | 稳定币结算 | Visa, MC |
| 风控模型 | 交易评分 / 反欺诈 | 全部 |

## 推荐阅读

### 官方资源

| 组织 | 链接 |
|------|------|
| Visa | [visa.com](https://usa.visa.com/) |
| Mastercard | [mastercard.com](https://www.mastercard.com/) |
| American Express | [americanexpress.com](https://www.americanexpress.com/) |
| Discover | [discover.com](https://www.discover.com/) |
| JCB | [global.jcb](https://www.global.jcb/en/) |
| UnionPay | [unionpay.com](https://www.unionpay.com/) |
| EMVCo | [emvco.com](https://www.emvco.com/) |

### 深度阅读

| 主题 | 资源 |
|------|------|
| 支付行业报告 | Nilson Report, McKinsey Payments |
| 技术标准 | EMVCo 规范文档, ISO 8583 |
| 合规要求 | [PCI DSS 入门指南](/posts/pci-dss-overview.html) |
| 技术实现 | [PCI DSS 技术实现](/posts/pci-dss-implementation.html) |

## 总结

| 卡组织 | 一句话 | 典型用途（别当死规定） |
|--------|--------|------------------------|
| Visa | 开放式、全球铺得开 | 跨境、海淘、通用收单 |
| Mastercard | 开放式、和 Visa 常成对出现 | 同上，看当地费率 |
| Amex | 多自营、费常高 | 商旅、高客单 |
| Discover | 美国本土强 | 北美电商要单独看支持 |
| JCB | 日本基因 | 访日、部分亚太 |
| UnionPay | 境内体量 + 出境扩张 | 人民币清算、华人客群 |
| Diners Club | 偏商旅历史品牌 | 看当地是否还发新卡 |

> **选卡 / 接 brand**：先看 **钱从哪清算、拒付规则谁写、费率表几行**；组织名只是入口。

---

**相关文章**：
- [Visa 交易全流程：从报文到资金落地](./visa-transaction-flow.html)
- [PCI DSS 支付卡行业数据安全标准入门指南](/posts/pci-dss-overview.html)
- [PCI DSS 技术实现指南](/posts/pci-dss-implementation.html)
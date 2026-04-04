---
title: LLM 底层原理从零到精通 · 系列学习计划（目录与进度）
date: 2026-04-01
categories:
  - AI大模型
tags:
  - LLM
  - 底层原理
  - 学习路线
  - 系列
author: 老Z
---

本文是 **「LLM 底层原理」系列** 的总目录：记录**每天教什么**、**对应文章文件名**、**完成进度**，避免半途而废或不知道下一篇写什么。已发布的篇章会链到正文。

## 使用方式

- **自学节奏**：按 Day 顺序阅读；每天约 1～2 小时（读 + 手算/小练习）。
- **与 AI 协作**：在对话里说「Day N」即可按当天主题继续讲解或扩写博客稿。
- **进度维护**：每发一篇新文章，把下表中该行的「状态」改为已发布，并补上链接。

## 总体规划

**主线**：神经网络基础 → 序列建模 → **Transformer** → **预训练与推理** → **对齐与高效训练** → **系统与前沿**。

**系列文章文件命名约定**：`llm-from-scratch-day-NN-英文短slug.md`（NN 为两位数字），便于排序与检索。

## 篇章一览（18 天）

| Day | 主题 | 规划文件名 | 核心要点 | 状态 |
|:---:|:---|:---|:---|:---:|
| 1 | 地图与术语 | [llm-from-scratch-day-01-map-and-terms.html](./llm-from-scratch-day-01-map-and-terms.html) | LM/LLM、token、上下文、参数；训练 vs 推理；五句话讲清在算什么 | **已发布** |
| 2 | 从函数到神经网络 | [llm-from-scratch-day-02-nn-basics.html](./llm-from-scratch-day-02-nn-basics.html) | 线性层、非线性、损失、梯度下降（直觉）；小网络手推 | **已发布** |
| 3 | 反向传播与计算图 | [llm-from-scratch-day-03-backprop.html](./llm-from-scratch-day-03-backprop.html) | 链式法则、计算图、为何能高效求导 | **已发布** |
| 4 | 表示学习与嵌入 | [llm-from-scratch-day-04-embeddings.html](./llm-from-scratch-day-04-embeddings.html) | one-hot → 稠密向量；embedding 是可学习矩阵 | **已发布** |
| 5 | 序列与语言建模 | `llm-from-scratch-day-05-lm-objective.md` | 自回归、\(P(w_t \mid w_{<t})\)、困惑度、交叉熵形式 | 待写 |
| 6 | RNN/门控（铺垫） | `llm-from-scratch-day-06-rnn-gates.md` | 隐状态、LSTM/GRU 解决什么；与 MLP 对比 | 待写 |
| 7 | 注意力机制 | `llm-from-scratch-day-07-attention.md` | Q/K/V、scaled dot-product；小矩阵手算 | 待写 |
| 8 | Transformer 总览 | `llm-from-scratch-day-08-transformer-overview.md` | Encoder-Decoder vs Decoder-only；残差与 LayerNorm | 待写 |
| 9 | 多头与位置编码 | `llm-from-scratch-day-09-mhsa-positional.md` | 多头直觉；RoPE/绝对位置（概念层）；\(\sqrt{d_k}\) | 待写 |
| 10 | FFN 与深度堆叠 | `llm-from-scratch-day-10-ffn-depth.md` | FFN 作用；参数量主要来自哪 | 待写 |
| 11 | 预训练目标与数据 | `llm-from-scratch-day-11-pretrain-data.md` | CLM/去噪等；数据管线粗粒度 | 待写 |
| 12 | Tokenization | `llm-from-scratch-day-12-tokenization.md` | BPE/Unigram；子词与序列长度 | 待写 |
| 13 | 规模与扩展律 | `llm-from-scratch-day-13-scaling-laws.md` | 数据、算力、参数；loss scaling 直觉 | 待写 |
| 14 | 推理与解码 | `llm-from-scratch-day-14-decoding.md` | greedy/beam/top-k/top-p；温度 | 待写 |
| 15 | KV Cache 与复杂度 | `llm-from-scratch-day-15-kv-cache.md` | \(O(n^2)\)、缓存为何省算；长上下文贵在哪 | 待写 |
| 16 | 微调与对齐 | `llm-from-scratch-day-16-sft-alignment.md` | SFT；RLHF/DPO 概念；能力 vs 偏好 | 待写 |
| 17 | 高效微调与压缩 | `llm-from-scratch-day-17-lora-quant.md` | LoRA、量化直觉；部署 | 待写 |
| 18 | 系统视角与读论文 | `llm-from-scratch-day-18-systems-papers.md` | 并行、显存、MoE 简介；对照模型卡读架构 | 待写 |

## 弹性调整

- **基础弱**：Day 2～4 可放慢，每天只攻一个子主题。
- **基础强**：Day 2～4 可合并，整体压缩到约 12～14 天。

## 标签与分类建议

新篇沿用与本计划一致：**分类** `AI大模型`；**标签**可含 `LLM`、`底层原理`、`系列`，便于读者按标签筛选。

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-01 | 创建计划；发布 Day 1 |
| 2026-04-02 | 发布 Day 2 |
| 2026-04-03 | 发布 Day 3 |
| 2026-04-04 | 发布 Day 4 |

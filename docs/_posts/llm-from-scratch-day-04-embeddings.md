---
title: LLM 底层原理从零到精通 · Day 4｜表示学习与 Embedding：离散 token 如何变成向量
date: 2026-04-04
categories:
  - AI大模型
tags:
  - LLM
  - Embedding
  - 表示学习
  - 底层原理
  - 学习笔记
  - 系列
author: 老Z
---

> 系列总目录：[《LLM 底层原理 · 系列学习计划》](./llm-from-scratch-series-plan.html) · 上一篇：[Day 3](./llm-from-scratch-day-03-backprop.html)

Day 1 说过：模型读的是 **token ID**（整数）。神经网络需要的是**实数向量**才能做矩阵乘。**Embedding（嵌入）** 就是把「第 \(i\) 个词」映射成 \(\mathbb{R}^d\) 里一个点 —— 且这个映射是**学出来的**，不是手写规则。

## 本篇目标

1. 说明 **one-hot** 表示的局限，以及为何要用**低维稠密向量**。  
2. 写出 **词嵌入矩阵** \(E \in \mathbb{R}^{|V|\times d}\)，并解释 **查表（lookup）** 与 **参数** 的对应关系。  
3. 把 embedding 看成 Day 2 的**线性层特例**：\(\mathbf{e}_i^\top E\)（one-hot 左乘矩阵）。  
4. 理解**一整句 token 序列**进入网络前，形状大致是「长度 × \(d\)」的矩阵。  
5. 知道**位置信息**还要另加（Day 9），embedding 只管「这个词学的是什么向量」。

---

## 1. 从 one-hot 说起

词表大小记为 \(|V|\)（vocabulary size）。最朴素的编码：**one-hot** —— 第 \(i\) 个 token 对应向量 \(\mathbf{e}_i \in \mathbb{R}^{|V|}\)，第 \(i\) 维为 1，其余为 0。

**问题（直觉版）**：

- **维数巨大**：\(|V|\) 可达几万～几十万，每个向量极稀疏，后续线性层权重也巨大。  
- **没有「相近」概念**：任意两个不同 token 的 one-hot **点积都是 0**，距离相同，无法表达「猫 vs 狗」比「猫 vs 会计」更相关。  
- **不随数据改进**：编码是固定的，没有**学习**。

我们希望：**维数降到 \(d \ll |V|\)**（如 768、4096），且在训练过程中**调整向量**，让用法相近的词在几何上靠近 —— 这就是**表示学习**的第一步。

---

## 2. 嵌入矩阵与查表

设模型维度为 \(d\)（常叫 **hidden size / model dim**）。定义矩阵：

\[
E \in \mathbb{R}^{|V| \times d}
\]

**第 \(i\) 行** \(E_{i,:}\) 就是 token \(i\) 的 **embedding 向量**（行向量或列向量约定依实现而定，这里按「第 \(i\) 行是 \(\mathbb{R}^d\)」理解即可）。

**前向**：给定 token ID \(i\)，取出：

\[
\mathbf{x}_i = E_{i,:} \quad \text{（lookup）}
\]

在 PyTorch 里通常是 `nn.Embedding(|V|, d)`，前向传入整型索引，底层就是查表，比真的构造 one-hot 再乘矩阵**更省算**。

**参数量**：\(|V| \times d\)。例如 \(|V|=32000\)，\(d=4096\)，仅输入嵌入就约 **1.3 亿** 参数 —— 在 7B 模型里是一大块，但不是全部（大头在注意力与 FFN，后面会拆）。

---

## 3. 与线性层的关系（Day 2 回扣）

若把 one-hot 行向量 \(\mathbf{e}_i\) 看成 \(1 \times |V|\)，则：

\[
\mathbf{e}_i \, E = E_{i,:}
\]

也就是说：**Embedding 层 = 对 one-hot 做一次线性变换，且没有加偏置**；\(E\) 就是权重矩阵。反向传播时，**只有被用到的那些行**会收到梯度（同一 batch 里出现多次的 token，梯度会**累加**）。

---

## 4. 序列：从 ID 列表到张量

一句话 token 化后得到 \((t_1, t_2, \ldots, t_n)\)，每个 \(t_j \in \{1,\ldots,|V|\}\)。

经过 embedding 后，得到 \(n\) 个 \(d\) 维向量，可堆成：

\[
X \in \mathbb{R}^{n \times d}
\]

（实现里常为 `batch × seq × d`，batch 维 Day 5～8 再系统化。）

**重要**：到这一步为止，**若只看 embedding**，模型还不知道「第几个位置」—— 交换两格 token，得到的矩阵只是**行交换**，没有额外信息区分位置。因此 Transformer 会加 **位置编码**（Day 9），与 token embedding **相加**后再进注意力层。

---

## 5. 输入嵌入 vs 输出侧（预告）

语言模型最后要预测「下一个 token 在词表上的分布」，往往有一层 **lm_head**：把隐藏状态 \(h \in \mathbb{R}^d\) 映到 \(\mathbb{R}^{|V|}\)（logits）。有的实现把 **lm_head 与 embedding 矩阵共用（weight tying）**，减少参数并常带来更好泛化；也有的分开两套矩阵。读模型卡时看到 **tied embeddings** 指的就是这类设计。

---

## 自测题

**Q1.** Embedding 矩阵的行数、列数各由什么决定？

<details>
<summary>要点</summary>
行数 ≈ 词表大小 <strong>|V|</strong>；列数 = 模型维度 <strong>d</strong>。
</details>

**Q2.** 为什么说 embedding 是「可训练参数」而不是查静态词典？

<details>
<summary>要点</summary>
矩阵 <strong>E</strong> 的元素随损失与反向传播更新，向量会适应语料中的用法。
</details>

**Q3.** 同一 batch 里同一个 token 出现两次，反向时 \(E\) 的更新会怎样？

<details>
<summary>要点</summary>
对该 token 对应行的梯度会<strong>累加</strong>（两次 lookup 各贡献一条路径）。
</details>

**Q4.** 仅使用 token embedding、不加位置信息，交换序列中两个 token 的位置，网络在「结构上」能区分吗？

<details>
<summary>要点</summary>
若后续子层对位置不敏感（纯对集合做对称运算），则区分不了；Transformer 标准做法要加<strong>位置编码</strong>。
</details>

**Q5.** \(|V|=50000\)，\(d=1024\)，仅输入 embedding 大约多少参数？

<details>
<summary>要点</summary>
\(50000 \times 1024 = 5.12 \times 10^7\)（约 5120 万）个标量。
</details>

---

## 延伸阅读（可选）

- 在 PyTorch 文档里扫一眼 `torch.nn.Embedding` 的说明，对照本文「查表 vs one-hot 乘矩阵」。  
- 打开任意开源 LLM 的 `config.json`，找 **`vocab_size`** 与 **`hidden_size`**，算一遍 \(|V|\cdot d\)。

---

## 下一篇

**Day 5** 把 **语言建模目标** 说透：自回归 \(P(w_t \mid w_{<t})\)、**交叉熵**、**困惑度**，以及和「最后一个位置预测下一个 token」的对应关系。发布后见 [系列计划](./llm-from-scratch-series-plan.html) 中的 Day 5 条目。

---
title: LLM 底层原理从零到精通 · Day 2｜从函数到神经网络：参数、层与梯度下降
date: 2026-04-02
categories:
  - AI大模型
tags:
  - LLM
  - 神经网络
  - 底层原理
  - 学习笔记
  - 系列
author: 老Z
---

> 系列总目录：[《LLM 底层原理 · 系列学习计划》](./llm-from-scratch-series-plan.html) · 上一篇：[Day 1](./llm-from-scratch-day-01-map-and-terms.html)

Day 1 说过：LLM 是一个带参数 \(\theta\) 的函数 \(f_\theta\)，训练时用损失推着 \(\theta\) 动。今天要回答：<strong>\(\theta\) 长什么样、前向怎么算、损失是什么、梯度下降在干什么</strong> —— 仍用最小数学，但会完成一次 **纸笔手推**。

## 本篇目标

1. 写出 **一层线性变换** \( \mathbf{y} = W\mathbf{x} + \mathbf{b} \)，并指出 **参数** 是哪些。  
2. 解释 **非线性（激活函数）** 为什么必要；知道 ReLU / Sigmoid 的直觉（LLM 里常用 GELU，以后再对齐）。  
3. 理解 **两层网络（MLP）** 的数据流：线性 → 非线性 → 线性。  
4. 用 **均方误差（MSE）** 这类标量损失，对 **极简 2 参数网络** 手算 \(\partial L/\partial w\)（链式法则热身）。  
5. 说清楚 **梯度下降** 一步在做什么：\(\theta \leftarrow \theta - \eta \nabla_\theta L\)。

---

## 1. 神经网络 = 带参数的函数

把输入记成向量 \(\mathbf{x} \in \mathbb{R}^{d_{\text{in}}}\)（Day 1 里以后会是 embedding 等，现在先当一串数字）。

**目标**：用一族由 \(\theta\) 编号的函数 \(f_\theta(\mathbf{x})\)，去逼近你想要的映射（例如：下一个 token 的 logits，Day 5 再精确化）。

**参数 \(\theta\)**：所有要学习的权重和偏置，训练时 **只改它们**，不改网络「接线方式」（结构）。

---

## 2. 线性层（全连接层）

一层线性变换：

\[
\mathbf{z} = W\mathbf{x} + \mathbf{b}
\]

- \(W\)：形状约为 \((d_{\text{out}} \times d_{\text{in}})\)， **权重矩阵**。  
- \(\mathbf{b}\)：长度 \(d_{\text{out}}\) 的 **偏置向量**。  
- 这一层的 **参数个数** （粗算）：\(d_{\text{out}} \cdot d_{\text{in}} + d_{\text{out}}\)。

**直觉**：\(W\) 的每一行对 \(\mathbf{x}\) 做一次加权求和，\(b_i\) 再平移一下 —— 和「多元一次函数」是一类东西，只是维度高。

**若没有非线性**：多层 \(W_3(W_2(W_1\mathbf{x}))\) 仍等价于 **一层** 线性变换（矩阵相乘仍是矩阵）。所以要「折线弯曲」的表达能力，必须在中间加 **非线性**。

---

## 3. 非线性：激活函数

常见写法：\(\mathbf{h} = \sigma(\mathbf{z})\)，\(\sigma\) 逐元素作用。

| 名字 | 公式（标量） | 直觉 |
|------|----------------|------|
| **Sigmoid** | \(\sigma(z) = 1/(1+e^{-z})\) | 把实数压到 \((0,1)\)，像概率；深层里容易梯度变小（Day 3 会再提）。 |
| **ReLU** | \(\max(0, z)\) | 简单、好算；负半轴为 0，正半轴恒等。 |
| **GELU** | （略复杂，有近似式） | <strong>Transformer / LLM 里 FFN 常用</strong>，Day 10 再点名。 |

**Day 2 只需记住**：非线性让「多层」 **不等于** 一层线性，网络才能拟合复杂关系。

---

## 4. 两层 MLP 数据流（骨架）

一种典型块（向量版）：

\[
\mathbf{z}_1 = W_1 \mathbf{x} + \mathbf{b}_1,\quad
\mathbf{h} = \sigma(\mathbf{z}_1),\quad
\mathbf{z}_2 = W_2 \mathbf{h} + \mathbf{b}_2
\]

最后 \(\mathbf{z}_2\) 可再接损失（例如与目标比大小），或对最后一维做 softmax 得到概率（分类 / 语言模型，Day 5）。

这和 Transformer 里的 **FFN（前馈子层）** 是同一类「先放大维度再压回去」的思想，只是具体矩阵维度和激活会按论文设定。

---

## 5. 损失函数（今天用 MSE 练手）

**训练** 需要标量 **损失** \(L\)：衡量当前 \(f_\theta\) 输出与「正确答案」差多少。

**均方误差（回归常用）**：若输出是标量 \(\hat{y}\)，真值为 \(y\)，

\[
L = \frac{1}{2}(\hat{y} - y)^2
\]

系数 \(\frac{1}{2}\) 只为求导时消掉平方的因子，许多教材这样写。

**语言模型** 里更常用 **交叉熵**（对概率分布），Day 5 与 Day 1 的「下一个 token」会接在一起；今天用 MSE 把 **链式法则** 算清楚即可。

---

## 6. 梯度下降（一步在干什么）

把 **所有参数** 摊平成一个向量 \(\theta\)。当前样本上算出的损失 \(L(\theta)\)。

**梯度** \(\nabla_\theta L\)：每个参数对 \(L\) 的偏导数组成的向量，指向 \(L\) **上升最快** 的方向。

**更新（最简形式）**：

\[
\theta \leftarrow \theta - \eta \nabla_\theta L
\]

\(\eta\) 叫 **学习率**（步长）。减号表示往 **损失下降** 的方向走一小步。多条数据时常见做法是 **平均** 或 **随机抽 batch** 的梯度（Day 11 量级再谈）。

---

## 7. 手推热身：1 个隐藏神经元的玩具网络

**结构**（标量，方便手算）：

- 输入 \(x\)（标量）  
- 隐藏：\(z = w_1 x + b_1\)，\(h = \sigma(z)\)。为简单起见， **令 \(\sigma\) 为恒等** （即先省略激活，或想象在 \(z>0\) 处用 ReLU 且本例中 \(z>0\)），则 \(h = z = w_1 x + b_1\)。  
- 输出：\(\hat{y} = w_2 h + b_2 = w_2(w_1 x + b_1) + b_2\)

**损失**（给定真值 \(y\)）：

\[
L = \frac{1}{2}(\hat{y} - y)^2
\]

**求 \(\partial L / \partial w_2\)**（把 \(w_1,b_1,b_2\) 当常数看 \(\hat{y}\)）：

\[
\frac{\partial L}{\partial \hat{y}} = \hat{y} - y,\quad
\frac{\partial \hat{y}}{\partial w_2} = h
\quad\Rightarrow\quad
\frac{\partial L}{\partial w_2} = (\hat{y} - y)\, h
\]

**求 \(\partial L / \partial w_1\)**（链式法则）：

\[
\frac{\partial \hat{y}}{\partial w_1} = w_2 \frac{\partial h}{\partial w_1} = w_2 x
\quad\Rightarrow\quad
\frac{\partial L}{\partial w_1} = (\hat{y} - y)\, w_2\, x
\]

若中间有 **Sigmoid** \(\sigma(z)\)，多一层：

\[
\frac{\partial L}{\partial w_1} = (\hat{y} - y)\, w_2\, \sigma'(z)\, x
\]

其中 \(\sigma'(z) = \sigma(z)(1-\sigma(z))\)。这就是 Day 3 的 **反向传播** 要系统化推广到「任意计算图」的同一种规则。

**数值小例**：设 \(x=1\)，\(w_1=1,b_1=0,w_2=1,b_2=0\)，则 \(h=1\)，\(\hat{y}=1\)。若目标 \(y=0\)，则 \(\hat{y}-y=1\)，\(\partial L/\partial w_2 = 1\cdot 1 = 1\)，\(\partial L/\partial w_1 = 1\cdot 1\cdot 1 = 1\)。梯度下降一步（只更新 \(w_2\)）\(w_2 \leftarrow w_2 - \eta\cdot 1\) 会减小 \(\hat{y}\)，合理。

---

## 自测题

**Q1.** 只有线性层、没有激活，堆三层和堆一层本质差别是什么？

::: details 要点

无本质差别：多个矩阵连乘可合并成一个矩阵，仍是线性映射。

:::

**Q2.** 线性层 \(W\mathbf{x}+\mathbf{b}\) 里，参数存在哪里？

::: details 要点

主要在矩阵 \(W\) 与向量 \(\mathbf{b}\) 的元素里（共 \(d_{\text{out}} \cdot d_{\text{in}} + d_{\text{out}}\) 个标量，与具体实现布局无关）。

:::

**Q3.** 梯度下降里为什么是减梯度，而不是加？

::: details 要点

梯度指向损失上升方向；要 **下降** 损失，沿负梯度走。

:::

**Q4.** 对上节玩具网络，若 \(\hat{y}-y=2\)，\(h=3\)，\(\partial L/\partial w_2\) 是多少？

::: details 要点

\(\partial L/\partial \hat{y}=\hat{y}-y=2\)，\(\partial L/\partial w_2 = 2\times 3 = 6\)（注意若 \(L=\frac{1}{2}e^2\) 则 \(\partial L/\partial\hat{y}=e=2\)）。

:::

**Q5.** LLM 的 FFN 里更常出现的激活是 ReLU 还是 GELU？

::: details 要点

常见是 **GELU**（或同类平滑激活）；Day 10 会对着结构再记一版。

:::

---

## 延伸阅读（可选）

- 用任意教程画一张 **2 层 MLP** 的方框图，标出 \(W_1,W_2,b_1,b_2\) 与 \(\sigma\)。  
- 思考：Day 1 说的「70B 参数」主要来自 **重复的这类矩阵**，而不是魔法常数。

---

## 下一篇

**Day 3** 把今天的链式法则推广成 **计算图上的反向传播**：[Day 3｜反向传播与计算图](./llm-from-scratch-day-03-backprop.html)。也可查看 [系列计划](./llm-from-scratch-series-plan.html)。

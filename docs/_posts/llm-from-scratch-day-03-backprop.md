---
title: LLM 底层原理从零到精通 · Day 3｜反向传播与计算图：一次遍历算完所有梯度
date: 2026-04-03
categories:
  - AI大模型
tags:
  - LLM
  - 反向传播
  - 计算图
  - 底层原理
  - 学习笔记
  - 系列
author: 老Z
---

> 系列总目录：[《LLM 底层原理 · 系列学习计划》](./llm-from-scratch-series-plan.html) · 上一篇：[Day 2](./llm-from-scratch-day-02-nn-basics.html)

Day 2 用手工链式法则算了 \(\partial L/\partial w_1\)、\(\partial L/\partial w_2\)。网络一深、节点一多，不能每次都从头推。**反向传播（backpropagation）** 做的事是：在一张**计算图**上，按固定规则**从损失往回走一遍**，得到**每个参数**的偏导数，复杂度与「算一次前向」同量级（边数线性），这才撑得起 LLM 训练。

## 本篇目标

1. 把一次前向计算画成**有向无环图（DAG）**：中间量是节点，运算是边。  
2. 理解**链式法则**在图上的两种形态：**串一串相乘**、**分叉处梯度相加**。  
3. 说出**反向传播算法**的步骤顺序（与拓扑排序相反）。  
4. 解释为什么它比「对每个参数单独求导」**省得多**。  
5. 把 **PyTorch / JAX** 里的自动微分直觉对上：前向建图、反向释放或缓存。

---

## 1. 计算图是什么？

把计算拆成**基本运算**（加、乘、矩阵乘、\(\log\)、\(\sigma\) 等），每个**中间结果**是一个节点，**依赖关系**是有向边：从输入指向输出。

**例**：\(\hat{y} = w_2 \cdot \sigma(w_1 x + b_1) + b_2\)，可拆成：

\[
z = w_1 x + b_1,\quad h = \sigma(z),\quad \hat{y} = w_2 h + b_2,\quad L = \tfrac{1}{2}(\hat{y}-y)^2
\]

前向就是按拓扑序从左算到右；**没有环**，所以是 DAG。

```mermaid
flowchart LR
  x((x)) --> z[z = w1·x+b1]
  w1((w1)) --> z
  b1((b1)) --> z
  z --> h[h = σ(z)]
  h --> yhat["ŷ = w2·h+b2"]
  w2((w2)) --> yhat
  b2((b2)) --> yhat
  yhat --> L[L = ½(ŷ-y)²]
  y((y)) --> L
```

（上图是示意；具体实现里 \(w_1,w_2\) 也会作为叶子节点参与乘法节点。）

---

## 2. 链式法则：一条链上「连乘」

若 \(L\) 只通过**一个**中间量 \(u\) 依赖 \(v\)，且再依赖 \(w\)：

\[
\frac{\partial L}{\partial w} = \frac{\partial L}{\partial u}\cdot\frac{\partial u}{\partial v}\cdot\frac{\partial v}{\partial w}
\]

**反向传播**里习惯从 \(L\) 往输入走：先算 \(\bar{u} = \partial L/\partial u\)，再乘局部导数 \(\partial u/\partial v\) 得到对 \(v\) 的贡献，依此类推。标量情形就是**一串标量相乘**；向量情形是**Jacobian 与向量相乘**（框架里用算子实现，你记「沿边传梯度」即可）。

---

## 3. 分叉：同一节点被多处使用时要「相加」

若 \(L = f(u, v)\)，且 \(u = g(x)\)、\(v = h(x)\)（**同一个 \(x\)** 影响两条路径），则多变量链式法则：

\[
\frac{\partial L}{\partial x} = \frac{\partial L}{\partial u}\frac{\partial u}{\partial x} + \frac{\partial L}{\partial v}\frac{\partial v}{\partial x}
\]

**图上规则**：中间节点 \(x\) 若**扇出（fan-out）**到多个子节点，反向传播时，**回到 \(x\) 的梯度 = 各条边上回传的梯度之和**。

**例**：\(z = x + x\)（同一 \(x\) 连到两个加数）。设上游 \(\bar{z} = \partial L/\partial z\)，则对 \(x\) 的总梯度为 \(\bar{z}\cdot 1 + \bar{z}\cdot 1 = 2\bar{z}\)。**加法节点**把上游梯度**原样复制**到每个输入，再在输入处**按路径相加** —— 这是实现里最常见的模式之一。

---

## 4. 反向传播算法（口述版）

1. **前向**：按拓扑序算每个节点的值，必要时缓存（如激活前 \(z\) 供反向用）。  
2. **初始化**：\(\bar{L} = \partial L/\partial L = 1\)（或从 \(\partial L/\partial \hat{y}\) 开始，视实现而定）。  
3. **反向**：按**与前向相反的顺序**，对每个运算节点根据**局部导数**把「上游梯度」传给**每个输入**；若某输入被多条边指回，**累加**。  
4. **叶子**：到达参数 \(w\) 的累加结果就是 \(\partial L/\partial w\)，用于 \(\theta \leftarrow \theta - \eta\nabla L\)。

每个节点只需知道**自己**的输入输出形状与局部规则（如 `matmul` 的 backward），不必知道整张图长什么样 —— 所以能模块化实现。

---

## 5. 为什么「一次反向」就够？

**笨办法**：对每个参数 \(w_i\)，扰动 \(w_i\) 看 \(L\) 变化（有限差分）—— 参数百万级时不可行。

**反向传播**：每条边只处理**常数次**运算；总代价 \(\propto\) **边数**，与一次前向同阶。深度网络层数 \(L\) 时，大致是 \(O(L)\) 乘上每层的矩阵规模，而不是 \(O(\text{参数个数} \times L)\) 的暴力。

这就是现代框架训练 billion-scale 模型的**前提**：**自动微分（autodiff）** 在计算图上跑反向模式（reverse-mode AD），与 backprop 是同一思想。

---

## 6. 与 PyTorch 的对应（直觉）

- **`tensor` 参与运算**时构建**动态图**（eager 模式下每个 `forward` 建一次）。  
- **`loss.backward()`**：从标量 \(L\) 起反向，把 `.grad` 写到 `requires_grad=True` 的叶子上。  
- **`detach` / `no_grad`**：切断边或不再建图，用于推理省内存。  
- **显存**：除参数外，还要存**反向需要的中间量**（或用 checkpoint 换时间），所以「训练比推理吃显存」—— Day 11、Day 18 会从工程侧再提。

不必会手写 autograd，但要理解：**训练一步 = 前向 + 反向 + 优化器更新**。

---

## 7. 梯度消失 / 爆炸（预告）

**很深**的网络里，若每层反向都乘上一个小于 1 的因子（如 Sigmoid 饱和区导数接近 0），梯度连乘后会**指数变小**（消失）；反之可能**爆炸**。  
这也是后来 **残差连接、更好的初始化、LayerNorm、GELU** 等动机的一部分 —— Day 8～10 会再见到。Day 2 已见过 \(\sigma'(z)\) 出现在 \(\partial L/\partial w_1\) 里；**一串这样的导数相乘**就是消失的数学来源。

---

## 自测题

**Q1.** 计算图里为什么必须是无环的？

<details>
<summary>要点</summary>
有环则「当前值依赖自身」，无法确定唯一的前向求值顺序；反向拓扑序也失去良好定义（与静态循环网络不同，那是另一套展开图）。
</details>

**Q2.** 加法节点 \(c = a + b\) 反向时，\(\bar{a}\)、\(\bar{b}\) 与上游 \(\bar{c}\) 的关系？

<details>
<summary>要点</summary>
\(\bar{a} = \bar{c}\)，\(\bar{b} = \bar{c}\)（对加法，局部导数对两输入都是 1）。
</details>

**Q3.** 若 \(x\) 同时参与 \(u=x^2\) 和 \(v=2x\)，且 \(L=u+v\)，\(\partial L/\partial x\) 是多少？

<details>
<summary>要点</summary>
\(\partial L/\partial u=1\)，\(\partial L/\partial v=1\)；\(\partial u/\partial x=2x\)，\(\partial v/\partial x=2\)；故 \(\partial L/\partial x = 2x + 2\)。
</details>

**Q4.** 反向传播与「对每个参数做有限差分」相比，主要省在哪里？

<details>
<summary>要点</summary>
有限差分需要对每个参数单独扰动，代价随参数维度线性爆炸；反向传播在图上线性规模复用中间结果。
</details>

**Q5.** `loss.backward()` 之后，参数本身变了吗？

<details>
<summary>要点</summary>
一般<strong>不会</strong>自动变；<code>.grad</code> 只是梯度。真正更新是 <code>optimizer.step()</code>（或你手写 \(\theta \leftarrow \theta - \eta g\)）。
</details>

---

## 延伸阅读（可选）

- 用纸画 Day 2 的玩具网络，在每个边上标「局部导数」，从 \(L\) 往回乘/加，与 Day 2 手算结果对照。  
- 读 PyTorch 文档里 **Autograd Mechanics** 一小节，对照本文「分叉相加」。

---

## 下一篇

**Day 4** 讲 **embedding**：离散 token ID 如何变成连续向量，以及「一张可查表」为何也是**可训练参数**。发布后见 [系列计划](./llm-from-scratch-series-plan.html) 中的 Day 4 条目。

# zblog Markdown 参考

## Mermaid 反例

```mermaid
flowchart LR
  L[损失]   %% 单字母 id L 易与语法冲突
  A(未引号含括号)  %% 标签含 ( ) 未加引号可能失败
```

改为：

```mermaid
flowchart LR
  loss["损失 L"]
  nodeA["节点说明"]
```

## 表格内强调

| 概念 | 说明 |
| --- | --- |
| Codex | <strong>产品</strong>：CLI + IDE 扩展 |

## 行内公式与加粗混排

长句含多个公式时，整句用 `<strong>` 包一段，避免 `**` 与 `$` 交错解析失败。

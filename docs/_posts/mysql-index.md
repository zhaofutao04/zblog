---
title: MySQL 索引优化指南
date: 2024-02-01
categories:
  - 数据库
tags:
  - MySQL
  - 数据库
  - 索引
author: 老Z
---

## 索引概述

索引是数据库中用于提高查询效率的数据结构。合理的索引设计可以大幅提升查询性能。

## 索引类型

### 1. 主键索引

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);
```

### 2. 唯一索引

```sql
CREATE UNIQUE INDEX idx_email ON users(email);
```

### 3. 普通索引

```sql
CREATE INDEX idx_name ON users(name);
```

### 4. 组合索引

```sql
CREATE INDEX idx_name_age ON users(name, age);
```

## 索引优化原则

1. **最左前缀原则**：组合索引从最左列开始匹配
2. **避免索引失效**：
   - 不要在索引列上使用函数
   - 不要对索引列进行计算
   - 避免使用 `!=` 或 `<>`
   - 避免使用 `OR`

## 查看执行计划

使用 `EXPLAIN` 分析 SQL 执行计划：

```sql
EXPLAIN SELECT * FROM users WHERE name = 'zhaofutao';
```

## 总结

索引优化是数据库性能调优的重要环节，需要根据实际业务场景合理设计。

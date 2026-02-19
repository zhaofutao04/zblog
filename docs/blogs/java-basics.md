---
title: Java基础知识点总结
date: 2024-01-15
categories:
  - Java技术
tags:
  - Java
  - 基础
author: 老Z
---

## 概述

Java 是一门面向对象的编程语言，具有跨平台、安全性高、稳定性好等特点。本文将总结 Java 的基础知识。

## 数据类型

Java 有两种数据类型：

### 基本数据类型

| 类型 | 关键字 | 位数 | 默认值 |
|------|--------|------|--------|
| 字节型 | byte | 8 | 0 |
| 短整型 | short | 16 | 0 |
| 整型 | int | 32 | 0 |
| 长整型 | long | 64 | 0L |
| 单精度浮点型 | float | 32 | 0.0f |
| 双精度浮点型 | double | 64 | 0.0d |
| 字符型 | char | 16 | '\u0000' |
| 布尔型 | boolean | 1 | false |

### 引用数据类型

- 类（Class）
- 接口（Interface）
- 数组（Array）

## 面向对象特性

### 封装

将数据和操作数据的方法封装在一起，通过访问修饰符控制访问权限。

```java
public class Person {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

### 继承

子类可以继承父类的属性和方法，实现代码复用。

```java
public class Student extends Person {
    private String school;

    // ...
}
```

### 多态

同一操作作用于不同对象，可以有不同的解释和执行结果。

## 总结

Java 基础是学习 Java 生态的基石，扎实掌握基础对后续学习非常重要。

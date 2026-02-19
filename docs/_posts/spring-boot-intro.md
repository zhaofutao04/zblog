---
title: Spring Boot 快速入门
date: 2024-01-20
categories:
  - Java技术
tags:
  - Spring
  - Spring Boot
author: 老Z
---

## 简介

Spring Boot 是 Spring 生态系统中的一个子项目，它简化了 Spring 应用的初始搭建和开发过程。

## 主要特点

1. **自动配置**：根据项目依赖自动配置 Spring 应用
2. **起步依赖**：简化构建配置
3. **内嵌服务器**：内置 Tomcat、Jetty 等服务器
4. **生产就绪**：提供健康检查、指标监控等功能

## 快速开始

### 创建项目

使用 Spring Initializr 创建项目：[https://start.spring.io/](https://start.spring.io/)

### 主启动类

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### RESTful 接口示例

```java
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

## 配置文件

Spring Boot 支持两种配置文件格式：

### application.properties

```properties
server.port=8080
spring.application.name=my-app
```

### application.yml

```yaml
server:
  port: 8080
spring:
  application:
    name: my-app
```

## 总结

Spring Boot 极大地简化了 Spring 应用的开发，是构建微服务架构的理想选择。

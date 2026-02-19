---
title: Docker 常用命令大全
date: 2024-02-10
categories:
  - 开发工具
tags:
  - docker
  - 容器
author: 老Z
---

## Docker 简介

Docker 是一个开源的容器化平台，可以将应用程序及其依赖打包成可移植的容器。

## 镜像命令

### 查看镜像

```bash
docker images
```

### 搜索镜像

```bash
docker search nginx
```

### 拉取镜像

```bash
docker pull nginx:latest
```

### 删除镜像

```bash
docker rmi nginx:latest
```

## 容器命令

### 运行容器

```bash
docker run -d -p 80:80 --name my-nginx nginx
```

### 查看容器

```bash
docker ps -a
```

### 停止容器

```bash
docker stop my-nginx
```

### 启动容器

```bash
docker start my-nginx
```

### 进入容器

```bash
docker exec -it my-nginx /bin/bash
```

### 删除容器

```bash
docker rm my-nginx
```

## Docker Compose

使用 Docker Compose 管理多容器应用：

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
```

启动：

```bash
docker-compose up -d
```

## 总结

Docker 是现代开发和运维的重要工具，掌握常用命令对日常开发非常有帮助。

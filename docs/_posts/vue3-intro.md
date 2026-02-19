---
title: Vue 3 组合式 API 入门
date: 2024-02-15
categories:
  - 前端技术
tags:
  - Vue
  - 前端
author: 老Z
---

## 组合式 API 简介

Vue 3 引入了组合式 API（Composition API），提供了更灵活的代码组织方式。

## 基本使用

### setup 函数

```vue
<template>
  <div>{{ count }}</div>
  <button @click="increment">+1</button>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    return {
      count,
      increment
    }
  }
}
</script>
```

### script setup 语法糖

```vue
<template>
  <div>{{ count }}</div>
  <button @click="increment">+1</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```

## 响应式 API

### ref

用于基本数据类型的响应式：

```js
const count = ref(0)
count.value++
```

### reactive

用于对象的响应式：

```js
const state = reactive({
  name: 'zhaofutao',
  age: 30
})
```

## 生命周期

```js
onMounted(() => {
  console.log('组件已挂载')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
```

## 总结

组合式 API 让代码更加模块化和可复用，是 Vue 3 的重要特性。

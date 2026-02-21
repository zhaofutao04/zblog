---
title: 博客日常操作
date: 2026-02-21
categories:
  - 项目文档
tags:
  - VuePress
  - 博客
author: 老Z
---

## 怎么写文章

文章放在 `docs/_posts/` 目录下，新建一个 `.md` 文件就行。

文件开头要写 frontmatter，告诉博客系统这篇文章的基本信息：

```markdown
---
title: 文章标题
date: 2026-02-21
categories:
  - 分类名
tags:
  - 标签1
  - 标签2
---

这里是正文...
```

`<!-- more -->` 这个标记可以用在文章摘要后面，首页列表只显示摘要部分，点击才看全文。

## 本地预览

```bash
npm run dev
```

然后打开 `http://localhost:8080` 就能看到效果。改了文件会自动刷新，挺方便的。

## 发布文章

```bash
git add .
git commit -m "发新文章"
git push
```

推送到 GitHub 之后，Cloudflare 会自动构建部署，等一两分钟就能在线上看到了。

## 常用的 Markdown 语法

代码块：
````markdown
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```
````

表格：
```markdown
| 列1 | 列2 |
|-----|-----|
| 内容 | 内容 |
```

引用：
```markdown
> 这是引用的文字
```

图片：
```markdown
![图片描述](/path/to/image.png)
```

## 分类和标签

这两个都是自动生成的，写文章的时候填上就行：

```yaml
categories:
  - Java技术
tags:
  - Spring Boot
  - 后端
```

分类建议用大类，比如"Java技术"、"前端技术"、"数据库"这种。标签可以更细一点，具体到框架或工具名。

## 改网站配置

配置文件是 `docs/.vuepress/config.ts`，改什么就打开看看，结构挺清晰的。

比如改导航栏：
```typescript
navbar: [
  { text: '首页', link: '/' },
  { text: '文章', link: '/posts/' },
  // 加新的...
]
```

改完记得 `npm run dev` 看看效果，没问题再 push。

## 换 Logo

把新 Logo 文件放到 `docs/.vuepress/public/` 目录，然后在 `config.ts` 里改：

```typescript
logo: '/新logo.svg',
```

## 自动生成的页面

这些页面不用自己写，主题自动生成：

- `/posts/` - 所有文章列表
- `/category/` - 分类页面
- `/tag/` - 标签页面
- `/timeline/` - 时间线

## 一些小技巧

1. 文件名用英文，url 会比较干净
2. 日期格式 `YYYY-MM-DD`，不然可能识别不了
3. 文章多了可以在 `_posts` 下建子目录分类存放，不影响构建
4. 图片可以放 `public` 目录，引用时直接 `/图片名.png`

## 遇到问题怎么办

大多数问题看报错信息就能找到原因。实在不行就去 GitHub 搜 issue，基本都有人遇到过。

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { hopeTheme } from 'vuepress-theme-hope'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '老Z的博客',
  description: '聊技术 聊生活 聊人生',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  theme: hopeTheme({
    // 网站基本信息
    hostname: 'https://www.zhaofutao.cn',
    author: {
      name: '老Z',
      url: 'https://www.zhaofutao.cn',
    },

    // Logo 和头像
    logo: '/logo.svg',
    repo: 'https://github.com/zhaofutao04/zblog',

    // 导航栏
    navbar: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '分类', link: '/category/' },
      { text: '标签', link: '/tag/' },
      { text: '时间线', link: '/timeline/' },
      { text: '关于我', link: '/about/' },
    ],

    // 侧边栏
    sidebar: false,

    // 博客配置
    blog: {
      intro: '/about/',
      sidebarDisplay: 'none',
    },

    // 文章配置
    articles: '/posts/',

    // 元信息
    metaLocales: {
      editLink: '在 GitHub 上编辑此页',
      lastUpdated: '上次更新',
    },

    // 页脚配置
    footer: 'Copyright © 2024-present 老Z | <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2024095491号-1</a>',

    // 版权信息
    copyright: 'Copyright © 2024-present 老Z',

    // 显示设置
    displayFooter: true,
    fullscreen: true,

    // 插件配置
    plugins: {
      // 搜索
      search: {
        locales: {
          '/': {
            placeholder: '搜索',
          },
        },
      },

      // 评论 (已禁用)
      // comment: {
      //   provider: 'Giscus',
      // },
    },
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {}
  }),

  markdown: {
    lineNumbers: true
  }
})

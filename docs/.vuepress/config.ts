import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  base: '/',
  title: '老Z的博客',
  description: '聊技术 聊生活 聊人生',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },

  theme: recoTheme({
    style: '@vuepress-reco/style-default',

    logo: '/logo.svg',
    author: '老Z',
    authorAvatar: '/avatar.svg',

    navbar: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '时间线', link: '/timeline/' },
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '关于我', link: '/about/' },
      { text: '友情链接', link: '/friendship-link/' }
    ],

    autoSetCategory: true,
    autoSetTag: true,

    friendLink: [
      {
        title: 'VuePress',
        desc: 'Vue 驱动的静态网站生成器',
        logo: 'https://vuejs.org/images/logo.png',
        link: 'https://vuepress.vuejs.org/'
      },
      {
        title: 'vuepress-theme-reco',
        desc: '一款简洁优雅的 VuePress 博客主题',
        logo: 'https://vuepress.vuejs.org/images/logo.png',
        link: 'https://vuepress-theme-reco.recoluan.com/'
      }
    ],

    homeBlog: {
      heroImage: '/hero.svg',
      heroHeight: '500',
      heroText: '老Z',
      tagline: '路漫漫其修远兮，吾将上下而求索',
      banner: '/hero.svg'
    },

    footer: {
      createYear: 2024,
      authorInfo: '老Z',
      beian: '沪ICP备2024095491号-1'
    }
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {}
  }),

  markdown: {
    lineNumbers: true
  }
})

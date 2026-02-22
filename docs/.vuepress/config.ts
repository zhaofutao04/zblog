import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { hopeTheme } from 'vuepress-theme-hope'
import { copyPagePlugin } from '../../packages/vuepress-plugin-copy-page'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '老Z的博客',
  description: '聊技术 聊生活 聊人生',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }]
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
      { text: '支付', link: '/category/支付/' },
      { text: 'web3', link: '/category/web3/' },
      { text: '建站', link: '/category/建站/' },
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
    },

    // 元信息
    metaLocales: {
      editLink: '在 GitHub 上编辑此页',
    },

    // 页脚配置
    footer: 'Copyright © 2024-present 老Z | <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2024095491号-1</a>',

    // 版权信息
    copyright: false,

    // 显示设置
    displayFooter: true,
    fullscreen: true,

    // 插件配置
    plugins: {
      // 启用博客功能
      blog: true,
      // 公告配置
      notice: [
        {
          path: '/',
          title: '欢迎访问',
          content: '本博客正在持续更新中，欢迎关注！',
        },
      ],
    },
  }),

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {}
  }),

  plugins: [
    googleAnalyticsPlugin({
      id: 'G-2NDJZGP77K',
    }),
    copyPagePlugin({
      includes: ['/posts/'],
    }),
  ],
})

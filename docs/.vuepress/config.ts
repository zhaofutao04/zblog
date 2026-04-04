import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { hopeTheme } from 'vuepress-theme-hope'
import { copyPagePlugin } from 'vuepress-plugin-copy-page'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '老Z的博客',
  description: '聊技术 聊生活 聊人生',
  // PWA 插件建议关闭链接预取，避免与 Service Worker 缓存策略冲突
  shouldPrefetch: false,

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],

    // SEO Meta 优化
    ['meta', { name: 'keywords', content: '支付安全,PCI DSS,3D Secure,AI大模型,Claude Code,密码学,区块链,web3,技术博客,老Z' }],
    ['meta', { name: 'author', content: '老Z' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],

    // Open Graph / 社交媒体优化
    ['meta', { property: 'og:site_name', content: '老Z的博客' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://www.zhaofutao.cn' }],
    ['meta', { property: 'og:title', content: '老Z的博客 - 聊技术 聊生活 聊人生' }],
    ['meta', { property: 'og:description', content: '专注于支付安全、密码学与AI开发的深度探索。涵盖PCI DSS、3D Secure、Claude Code、区块链等前沿技术实践。' }],
    ['meta', { property: 'og:image', content: 'https://www.zhaofutao.cn/logo.svg' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '老Z的博客 - 聊技术 聊生活 聊人生' }],
    ['meta', { name: 'twitter:description', content: '专注于支付安全、密码学与AI开发的深度探索' }],
    ['meta', { name: 'twitter:image', content: 'https://www.zhaofutao.cn/logo.svg' }],

    // 结构化数据
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "老Z的博客",
      "description": "专注于支付安全、密码学与AI开发的深度探索",
      "url": "https://www.zhaofutao.cn",
      "author": {
        "@type": "Person",
        "name": "老Z",
        "url": "https://www.zhaofutao.cn/about/"
      },
      "publisher": {
        "@type": "Person",
        "name": "老Z"
      },
      "inLanguage": "zh-CN",
      "copyrightYear": "2026"
    })],

    // 网站验证
    ['meta', { name: 'baidu-site-verification', content: '' }], // 需要申请百度站长工具
    ['meta', { name: 'google-site-verification', content: '' }], // 需要申请Google Search Console

    // DNS预解析优化
    ['link', { rel: 'dns-prefetch', href: '//www.google-analytics.com' }],
    ['link', { rel: 'dns-prefetch', href: '//fonts.googleapis.com' }],

    // 站点地图提示
    ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }]
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
      { text: 'AI大模型', link: '/category/ai大模型/' },
      { text: '支付', link: '/category/支付/' },
      { text: 'web3', link: '/category/web3/' },
      { text: '建站', link: '/category/建站/' },
      { text: '文章', link: '/posts/' },
      { text: '分类', link: '/category/' },
      { text: '标签', link: '/tag/' },
      { text: '时间线', link: '/timeline/' },
      { text: '关于我', link: '/about/' },
      { text: '友链', link: '/links/' },
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

    // Markdown 增强功能（KaTeX：支持 $...$ / $$...$$ 与 LaTeX 风格 \(...\) / \[...\]）
    markdown: {
      mermaid: true,
      math: {
        type: 'katex',
        delimiters: 'all',
      },
    },

    // 插件配置
    plugins: {
      // 启用博客功能
      blog: true,

      // SEO优化
      seo: {
        canonical: 'https://www.zhaofutao.cn',
      },

      // 站点地图
      sitemap: {
        hostname: 'https://www.zhaofutao.cn',
        exclude: ['/404.html'],
      },

      // PWA支持
      pwa: {
        cacheHTML: false,
        showInstall: false,
        appendBase: false,
      },

      // 全文搜索（searchPro 已弃用，改用官方 SlimSearch）
      slimsearch: {
        indexContent: true,
        hotReload: true,
      },

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
      includes: ['/'],
      excludes: ['/tags/', '/category/', '/timeline/', '/links/'],
      copyTemplate: 'withUrl'
    }),
  ],
})

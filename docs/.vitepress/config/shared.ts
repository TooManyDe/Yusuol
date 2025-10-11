// .vitepress/config.ts

import { defineConfig, type SiteConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import type { DefaultTheme } from 'vitepress' // 导入 DefaultTheme 类型

// 导入语言配置
import { themeConfig as zhThemeConfig, head as zhHead } from './zh' 
import { themeConfig as enThemeConfig, head as enHead } from './en'

// 导入工具函数
import { createRssFileZH, createRssFileEN } from '../theme/utils/rss'
import { handleHeadMeta } from '../theme/utils/handleHeadMeta'


// --- 静态常量定义 ---
const BASE_HOSTNAME = 'https://skywhisper.org'
const GA_TRACKING_ID = 'G-MB7XVBG1TQ'
const FAVICON_URL = 'https://cdn.skywhisper.org/01.ico'


// --- Vite 插件配置 ---
const vitePlugins = [
  // TDesign 自动导入
  AutoImport({
    resolvers: [TDesignResolver({ library: 'vue-next' })],
  }),
  // TDesign 组件自动注册
  Components({
    resolvers: [TDesignResolver({ library: 'vue-next' })],
  }),
]

// --- Google Analytics 脚本 ---
const gaScript = [
  ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}` }],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}');`,
  ],
]

// --- VitePress 根配置 ---
export default defineConfig({
  // 基础配置
  lastUpdated: false, // 启用最后更新时间，更实用
  cleanUrls: true,
  ignoreDeadLinks: true, // 忽略死链检查，减少构建警告
  sitemap: {
    hostname: BASE_HOSTNAME,
  },

  // 头部注入 (Head)
  // 合并通用配置和 GA 脚本
  head: [
    ['link', { rel: 'icon', href: FAVICON_URL }],
    ...gaScript, // 展开 GA 脚本
    // 语言特定的 SEO meta 标签将在 transformHead 中处理
  ],

  // 钩子函数
  async transformHead(context) {
    // 处理通用 meta 标签，例如语言切换标签等
    return handleHeadMeta(context)
  },
  buildEnd: (config: SiteConfig) => {
    // 构建结束时生成 RSS 文件
    createRssFileZH(config)
    createRssFileEN(config)
  },

  // 国际化 (Locales) 配置：推荐结构
  locales: {
    root: { // 根路径默认为中文 (zh-Hans)
      label: '简体中文',
      lang: 'zh-Hans',
      description: '不舍昼夜',
      head: zhHead,
      themeConfig: zhThemeConfig as DefaultTheme.Config,
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/', // 英文内容的基路径
      description: 'Never Resting Day nor Night',
      head: enHead,
      themeConfig: enThemeConfig as DefaultTheme.Config,
    },
  },

  // Markdown 扩展
  markdown: {
    lineNumbers: true, // 增加行号，方便代码阅读
    math: true, // 启用数学公式支持
  },

  // Vite 配置
  vite: {
    plugins: vitePlugins,
  },
})

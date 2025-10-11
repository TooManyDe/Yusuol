import { type DefaultTheme, defineConfig } from 'vitepress'

// --- 静态常量定义 ---

// 社交图标：RSS SVG 路径
// 优化：将 SVG 路径简化为单行，提高可读性。
const RSS_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>'

// --- 主题配置 Components ---

// 导航栏配置 (Nav)
const nav: DefaultTheme.NavItem[] = [
  { text: '归档', link: '/archive', activeMatch: '/archive' },
  { text: '分类', link: '/category', activeMatch: '/category/' },
  { text: '赞赏', link: '/support-me', activeMatch: '/support-me/' },
]

// 社交链接配置 (Social Links)
const socialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: { svg: RSS_ICON_SVG },
    link: '/feed.xml', // RSS Feed 链接
    ariaLabel: 'RSS Feed', // 增加无障碍标签
  },
]

// 页脚配置 (Footer)
const footer: DefaultTheme.Footer = {
  message:
    '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a> © 2025 <a href="https://skywhisper.org">SkyWhisper</a>',
  // 增加版权声明
  copyright: 'Released under the MIT License.',
}

// 主题配置 (Theme Config)
const themeConfig: DefaultTheme.Config = {
  // 头部导航
  nav,
  
  // 页脚
  footer,
  
  // 社交链接
  socialLinks,

  // 本地搜索配置 (放在 themeConfig 内部，避免重复的 themeConfig 嵌套)
  search: {
    provider: 'local',
    options: {
      locales: {
        zh: {
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询条件',
              footer: {
                selectText: '选择',
                navigateText: '切换',
              },
            },
          },
        },
      },
    },
  },

  // 国际化/文本配置
  outlineTitle: '当前页面',
  lastUpdatedText: '最近更新',
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '目录',
  darkModeSwitchLabel: '深色模式',
}

// --- 根配置 (Root Config) ---

export default defineConfig({
  // 1. 基础信息
  title: 'SkyWhisper',
  description: '不舍昼夜',
  lang: 'zh-Hans',
  titleTemplate: ':title - SkyWhisper', // 标题模板

  // 2. 主题配置
  themeConfig,

  // 3. SEO 优化 (Head)
  head: [
    ['meta', { name: 'author', content: 'SkyWhisper' }],
    ['meta', { name: 'keywords', content: 'SkyWhisper, 博客, 技术分享, VitePress' }], // 增加关键词
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  // 4. 构建优化
  cleanUrls: true, // 启用美化 URL (例如 /foo.html -> /foo/)
  lastUpdated: true, // 启用显示最后更新时间，这需要 themeConfig.lastUpdatedText 配合
  
  // 5. Markdown 拓展
  markdown: {
    lineNumbers: true, // 可选：显示代码块行号
  }
})

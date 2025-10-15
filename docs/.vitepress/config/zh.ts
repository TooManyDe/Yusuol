import { type DefaultTheme, defineConfig } from 'vitepress'

// RSS 图标 SVG
const RSS_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>'

// 导航配置
const navConfig: DefaultTheme.NavItem[] = [
  { text: "归档", link: "/archive", activeMatch: '/archive' },
  { text: "分类", link: "/category", activeMatch: '/category/' },
  { text: "赞赏", link: "/support-me", activeMatch: '/support-me/' },
]

// 社交链接配置
const socialLinksConfig: DefaultTheme.SocialLink[] = [
  {
    icon: { svg: RSS_ICON_SVG },
    link: "/feed.xml",
  },
]

// 搜索本地化配置
export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  root: {
    placeholder: '搜索',
    translations: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '无搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '网络错误'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索来源'
        },
        noResultsScreen: {
          noResultsText: '无相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}

// 主题配置
const themeConfig: DefaultTheme.Config = {
  nav: navConfig,
  
  footer: {
    message: '<a href=" ">CC BY-NC-ND 4.0</a > © 2025 <a href="https://ddbx.org">的的不休</a >',
  },
  
  outlineTitle: "当前页面",
  lastUpdatedText: "最近更新",
  returnToTopLabel: "回到顶部",
  sidebarMenuLabel: "目录",
  darkModeSwitchLabel: "深色模式",
  
  socialLinks: socialLinksConfig,
}

// 主配置
export default defineConfig({
  // 基本信息
  title: "的的不休",
  description: "不舍昼夜",
  lang: "zh-Hans",
  
  titleTemplate: ':title - ddbx',
  // 主题配置
  themeConfig,
  
  // 可选：SEO 优化
  head: [
    ['meta', { name: 'author', content: '的的不休' }],
    ['meta', { name: 'keywords', content: '的的不休, 博客, 分享' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  
  // 可选：构建优化
  cleanUrls: true,
  lastUpdated: false,
})

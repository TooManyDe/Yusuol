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


export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  }
})

// 主题配置
const themeConfig: DefaultTheme.Config = {
  nav: navConfig,
  
  footer: {
    message: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a> © 2025 <a href="https://skywhisper.org">SkyWhisper</a>',
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
  title: "SkyWhisper",
  description: "不舍昼夜",
  lang: "zh-Hans",
  
  titleTemplate: ':title - SkyWhisper',
  // 主题配置
  themeConfig,
  
  // 可选：SEO 优化
  head: [
    ['meta', { name: 'author', content: 'SkyWhisper' }],
    ['meta', { name: 'keywords', content: 'SkyWhisper, 博客, 技术分享' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  
  // 可选：构建优化
  cleanUrls: true,
  lastUpdated: false,
})
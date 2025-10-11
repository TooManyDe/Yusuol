import { type DefaultTheme, defineConfig } from 'vitepress'

// RSS 图标 SVG
const RSS_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>'

// 导航配置
const navConfig: DefaultTheme.NavItem[] = [
  { text: "Archive", link: "/en/archive/", activeMatch: '/en/archive/' },
  { text: "Category", link: "/en/category/", activeMatch: '/en/category/' },
  { text: "Sponsor", link: "/en/support-me", activeMatch: '/en/support-me' },
]

// 社交链接配置
const socialLinksConfig: DefaultTheme.SocialLink[] = [
  {
    icon: { svg: RSS_ICON_SVG },
    link: "/feed-en.xml",
  },
]


export​ ​const​ ​search​: ​DefaultTheme​.​
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear the query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate'
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
  
  docFooter: {
    prev: 'Previous',
    next: 'Next'
  },
  
  outlineTitle: "On this page",
  lastUpdatedText: "Last updated",
  returnToTopLabel: "Return to top",
  sidebarMenuLabel: "Menu",
  darkModeSwitchLabel: "Dark mode",
  
  socialLinks: socialLinksConfig,
}

// 主配置
export default defineConfig({
  // 基本信息
  title: "SkyWhisper",
  description: "Never Resting Day nor Night",
  lang: "en-US",
  
  titleTemplate: ':title - SkyWhisper',
  // 主题配置
  themeConfig,
  
  // SEO 优化
  head: [
    ['meta', { name: 'author', content: 'SkyWhisper' }],
    ['meta', { name: 'keywords', content: 'SkyWhisper, blog, technology, sharing' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'SkyWhisper RSS', href: '/feed-en.xml' }],
  ],
  
  // 构建优化
  cleanUrls: true,
  lastUpdated: false,
  
  // 可选：国际化支持
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    }
  }
})
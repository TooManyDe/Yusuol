import { type DefaultTheme, defineConfig } from 'vitepress'

// ========== 日期格式化函数 ==========
function formatDate(raw: string) {
  const date = new Date(raw)
  date.setUTCHours(12) // 可根据时区调整
  return {
    time: +date,
    string: date.toLocaleString('zh-Hans', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
    year: date.toLocaleDateString('zh-Hans', { year: 'numeric' }),
    monthDay: date.toLocaleDateString('zh-Hans', { month: '2-digit', day: '2-digit' })
  }
}

// 主题配置
const themeConfig: DefaultTheme.Config = {
  nav: [
    { text: "归档", link: "/archive", activeMatch: '/archive' },
    { text: "分类", link: "/category", activeMatch: '/category/' },
    { text: "赞赏", link: "/support-me", activeMatch: '/support-me/' },
  ],

  footer: {
    message: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a> © 2021-2025 <a href="https://skywhisper.org">SkyWhisper</a>',
  },

  docFooter: { prev: '上一篇', next: '下一篇' },
  outlineTitle: "当前页面",
  lastUpdatedText: "创建时间",  // ✅ 改为创建时间
  returnToTopLabel: "回到顶部",
  sidebarMenuLabel: "目录",
  darkModeSwitchLabel: "深色模式",

  socialLinks: [
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>'
      },
      link: "/feed.xml",
    },
  ],
}

// 主配置
export default defineConfig({
  title: "SkyWhisper",
  description: "不舍昼夜",
  lang: "zh-Hans",

  themeConfig,
  head: [
    ['meta', { name: 'author', content: 'SkyWhisper' }],
    ['meta', { name: 'keywords', content: 'SkyWhisper, 博客, 技术分享' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  cleanUrls: true,
  lastUpdated: false, // 禁用 Git 自动更新时间

  // ✅ 用 frontmatter.date 作为“创建时间”，显示精确到秒
  transformPageData(pageData) {
    if (pageData.frontmatter.date) {
      pageData.lastUpdated = formatDate(pageData.frontmatter.date).string
    }
  }
})
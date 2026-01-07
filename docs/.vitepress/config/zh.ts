import { type DefaultTheme, defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

// ==========================================
// 1. 自动生成侧边栏逻辑 (用于驱动上一篇/下一篇)
// ==========================================
function getBlogSidebar() {
  // 确保路径指向你的文章所在的文件夹
  const postsDir = path.resolve(__dirname, '../posts')
  
  // 如果文件夹不存在，直接返回空
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir)
  const posts = files
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const fullPath = path.join(postsDir, file)
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(content)
      
      // 解析日期，用于排序
      let dateValue = 0
      if (data.date) {
        dateValue = new Date(data.date).getTime()
      } else {
        // 如果没有 date 字段，则取文件创建时间
        dateValue = fs.statSync(fullPath).birthtimeMs
      }

      return {
        text: data.title || file.replace('.md', ''),
        link: `/posts/${file.replace('.md', '')}`, // 确保与你的路由一致
        date: dateValue
      }
    })

  // 关键：升序排序 (旧 -> 新)
  // 这样底部的“下一篇”就会指向时间更新的文章
  posts.sort((a, b) => a.date - b.date)

  return [
    {
      items: posts.map(({ text, link }) => ({ text, link }))
    }
  ]
}

// ==========================================
// 2. 常量定义
// ==========================================
const RSS_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>'

const navConfig: DefaultTheme.NavItem[] = [
  { text: "归档", link: "/archive", activeMatch: '/archive' },
  { text: "分类", link: "/category", activeMatch: '/category/' },
  { text: "赞赏", link: "/support-me", activeMatch: '/support-me/' },
]

const socialLinksConfig: DefaultTheme.SocialLink[] = [
  {
    icon: { svg: RSS_ICON_SVG },
    link: "/feed.xml",
  },
]

// ==========================================
// 3. 主配置
// ==========================================
export default defineConfig({
  title: "的的不休",
  description: "不舍昼夜",
  lang: "zh-Hans",
  titleTemplate: ':title - ddbx',
  cleanUrls: true,
  lastUpdated: false,

  themeConfig: {
    nav: navConfig,
    socialLinks: socialLinksConfig,
    
    // 侧边栏配置 (虽然被 CSS 隐藏，但它是上下篇跳转的核心)
    sidebar: getBlogSidebar(),

    // 上一篇下一篇文本定制
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    footer: {
      message: '© 2026 <a href="https://ddbx.org">的的不休</a >',
    },
    
    outlineTitle: "当前页面",
    lastUpdatedText: "最近更新",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "深色模式",
  },

  head: [
    ['meta', { name: 'author', content: '的的不休' }],
    ['meta', { name: 'keywords', content: '的的不休, 博客, 分享' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
})

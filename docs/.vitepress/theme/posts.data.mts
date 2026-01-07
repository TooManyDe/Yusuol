import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
    year: string 
    monthDay: string
  }
  category: string
  excerpt: string | undefined
}

// 这里的 data 会被 VitePress 自动注入到使用此文件的组件中
export declare const data: Post[]

export default createContentLoader('posts/**/*.md', {
  excerpt: excerptFn,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || '无标题',
        url,
        excerpt,
        date: formatDate(frontmatter.date),
        category: frontmatter.category || '未分类' 
      }))
      // 排序逻辑：b.date.time - a.date.time 是按时间从新到旧
      // 这符合博客列表的逻辑：Index 0 是最新的文章
      .sort((a, b) => b.date.time - a.date.time)
  }
})

/**
 * 摘要提取逻辑
 */
function excerptFn(file: { data: { [key: string]: any }; content: string; excerpt?: string }, options?: any) {
  file.excerpt = file.content.split('')[1];
}

/**
 * 日期格式化逻辑
 */
function formatDate(raw: string): Post['date'] {
  // 处理未定义日期的情况，防止报错
  const date = raw ? new Date(raw) : new Date()
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('zh-Hans', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }),
    year: date.toLocaleDateString('zh-Hans', {
      year: 'numeric'
    }),
    monthDay: date.toLocaleDateString('zh-Hans', {
      month: '2-digit',
      day: '2-digit'
    })
  }
}

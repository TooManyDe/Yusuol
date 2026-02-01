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

export declare const data: Post[]

export default createContentLoader('posts/**/*.md', {
  excerpt: excerptFn,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        date: formatDate(frontmatter.date),
        category: frontmatter.category || '未分类' 
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function excerptFn(file: { data: { [key: string]: any }; content: string; excerpt?: string }, options?: any) {
  file.excerpt = file.content.split('')[1];
}

function formatDate(raw: string): Post['date'] {
  // 直接解析原始字符串，避免 UTC 转换偏差
  const date = new Date(raw.replace(/-/g, '/'))
  
  if (isNaN(date.getTime())) {
    return { time: 0, string: '无效日期', year: '', monthDay: '' }
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  
  // 生成格式为：2026-01-01 21:59
  const formattedString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`

  return {
    time: +date,
    string: formattedString,
    year: String(date.getFullYear()),
    monthDay: `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  }
}

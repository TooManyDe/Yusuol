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
  // 这里的分割符需与你文档中的一致
  file.excerpt = file.content.split('')[1];
}

function formatDate(raw: any): Post['date'] {
  if (!raw) {
    return { time: 0, string: '无日期', year: '', monthDay: '' }
  }

  // 核心修复：处理 raw 可能已经是 Date 对象的情况
  let date: Date;
  if (raw instanceof Date) {
    date = raw;
  } else {
    // 强制转为字符串并替换，兼容不同浏览器的解析习惯
    date = new Date(String(raw).replace(/-/g, '/'));
  }

  // 如果解析失败，回退到原始解析
  if (isNaN(date.getTime())) {
    date = new Date(raw);
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  
  // 严格输出：2026-01-01 21:59
  const formattedString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`

  return {
    time: +date,
    string: formattedString,
    year: String(date.getFullYear()),
    monthDay: `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  }
}

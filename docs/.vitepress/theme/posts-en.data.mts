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
  file.excerpt = file.content.split('<!--Yusuol-->')[1];
}
function formatDate(raw: any): Post['date'] {
  if (!raw) {
    return { time: 0, string: 'No Date', year: '', monthDay: '' }
  }

  let date: Date

  if (raw instanceof Date) {
    date = raw
  } else {
    date = new Date(String(raw).replace(/-/g, '/'))
  }

  if (isNaN(date.getTime())) {
    date = new Date(raw)
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  // 英文月份缩写（NYT 风格）
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  // ✅ 时区标注
  const timezone = '(UTC+8)'

  // ✅ 最终格式：Feb 2, 2026 · 09:30 (UTC+8)
  const formattedString = `${month} ${day}, ${year} · ${hours}:${minutes} ${timezone}`

  return {
    time: +date,
    string: formattedString,
    year: String(year),
    monthDay: `${month} ${day}`
  }
}
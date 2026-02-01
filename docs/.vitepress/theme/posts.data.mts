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
    return { time: 0, string: '无日期', year: '', monthDay: '' }
  }

  let date: Date;
  if (raw instanceof Date) {
    date = raw;
  } else {
    date = new Date(String(raw).replace(/-/g, '/'));
  }

  if (isNaN(date.getTime())) {
    date = new Date(raw);
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  const formattedString = `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日${pad(date.getHours())}:${pad(date.getMinutes())}`

  return {
    time: +date,
    string: formattedString,
    year: String(date.getFullYear()),
    monthDay: `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  }
}
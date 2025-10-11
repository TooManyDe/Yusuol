import { createContentLoader } from 'vitepress'

// 扩展 Post 接口以包含 prev 和 next 链接
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
  // 新增：用于存储上一篇和下一篇文章的链接信息
  prev?: { text: string, link: string } | null
  next?: { text: string, link: string } | null
}

export declare const data: Post[]

export default createContentLoader('posts/**/*.md', {
  excerpt: excerptFn,
  transform(raw): Post[] {
    // 1. 初始处理和排序 (与你原有的代码相同)
    const sortedPosts = raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url: url.replace(/\.html$/, ''), // 确保 URL 没有 .html 扩展名
        excerpt,
        date: formatDate(frontmatter.date),
        category: frontmatter.category || '未分类' 
      }))
      .sort((a, b) => b.date.time - a.date.time)
      
    // 2. 遍历已排序的数组，注入 Prev/Next 链接
    return sortedPosts.map((post, index, array) => {
      // 在倒序数组中：
      // index + 1 是时间上更旧的一篇，即 **上一篇 (Prev)**
      // index - 1 是时间上更新的一篇，即 **下一篇 (Next)**
      
      const prevPost = array[index + 1]
      const nextPost = array[index - 1]
      
      post.prev = prevPost ? {
        text: `← ${prevPost.title}`,
        link: prevPost.url
      } : null
      
      post.next = nextPost ? {
        text: `${nextPost.title} →`,
        link: nextPost.url
      } : null
      
      return post
    })
  }
})

// ... [excerptFn 和 formatDate 函数保持不变] ...

function excerptFn(file: { data: { [key: string]: any }; content: string; excerpt?: string }, options?: any) {
  file.excerpt = file.content.split('')[1];
}

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
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


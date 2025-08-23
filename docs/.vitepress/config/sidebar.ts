import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  includeSrc: false,
  excerpt: false,
  transform(raw) {
    return raw
      // 按 frontmatter.date 排序（新 → 旧）
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.date || 0).getTime()
        const dateB = new Date(b.frontmatter.date || 0).getTime()
        return dateB - dateA
      })
  }
})
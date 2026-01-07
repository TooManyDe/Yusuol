<script setup>
import { useData, withBase } from 'vitepress'
// 确保路径指向你的 posts.data.mts
import { data as posts } from '../posts.data.mts' 
import { computed } from 'vue'

const { page } = useData()

const prevNext = computed(() => {
  // 1. 核心安全检查：防止 SSR 环境下 page 变量未定义导致的构建失败
  if (!page.value || (!page.value.relativeByPath && !page.value.url)) {
    return { prev: null, next: null }
  }

  // 2. 标准化当前页面 URL
  // 移除 .md 或 .html 后缀，并确保以 / 开头，用于在数据源中比对
  const rawPath = page.value.relativeByPath || page.value.url || ''
  const curUrl = '/' + rawPath
    .replace(/\.(md|html)$/, '')
    .replace(/^\//, '')
    .replace(/\/index$/, '') // 处理 index 路径

  // 3. 在已排序的文章列表中查找当前页面的索引
  const index = posts.findIndex(p => {
    if (!p.url) return false
    const standardizedPostUrl = p.url
      .replace(/\.(md|html)$/, '')
      .replace(/\/$/, '')
      .replace(/\/index$/, '')
    return standardizedPostUrl === curUrl || standardizedPostUrl === curUrl.replace(/\/$/, '')
  })

  // 4. 如果没找到索引（例如在归档页或分类页），则不显示导航
  if (index === -1) return { prev: null, next: null }

  // 根据你的 data 排序逻辑（新在前，旧在后）：
  // index - 1 是时间更近的文章 (上一篇)
  // index + 1 是时间更久的文章 (下一篇)
  return {
    prev: posts[index - 1] || null,
    next: posts[index + 1] || null
  }
})
</script>

<template>
  <div v-if="prevNext.prev || prevNext.next" class="blog-footer">
    <div class="pager">
      <div class="pager-item prev">
        <a v-if="prevNext.prev" :href="withBase(prevNext.prev.url)">
          <span class="desc">上一篇</span>
          <span class="title">{{ prevNext.prev.title }}</span>
        </a>
      </div>
      
      <div class="pager-item next">
        <a v-if="prevNext.next" :href="withBase(prevNext.next.url)">
          <span class="desc">下一篇</span>
          <span class="title">{{ prevNext.next.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px dashed var(--vp-c-divider);
  font-family: "ChillRoundF", var(--vp-font-family-base);
}

.pager {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.pager-item a {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.2s ease;
  height: 100%;
}

.pager-item a:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.title {
  font-size: 14px;
  font-weight: bold;
  color: var(--vp-c-brand-1);
  margin-top: 4px;
}

.next { 
  text-align: right; 
}

/* 移动端适配：当只有一项时，占据整行 */
@media (max-width: 480px) {
  .pager {
    grid-template-columns: 1fr;
  }
}
</style>

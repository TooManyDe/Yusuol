<script setup>
import { useData, withBase } from 'vitepress'
import { data as posts } from '../posts.data.mts' // 引入刚才的数据文件
import { computed } from 'vue'

const { page } = useData()

const prevNext = computed(() => {
  // 查找当前文章在列表中的索引
  // 注意：page.value.url 可能带 .html 或不带，取决于 cleanUrls 设置
  const curUrl = page.value.relativeByPath 
    ? '/' + page.value.relativeByPath.replace('.md', '') 
    : page.value.url.replace(/\.html$/, '')

  const index = posts.findIndex(p => p.url.replace(/\.html$/, '') === curUrl)

  if (index === -1) return { prev: null, next: null }

  // 因为 data 是按时间倒序排的（新在前）：
  // 下一篇 (更旧的) = index + 1
  // 上一篇 (更新的) = index - 1
  return {
    next: posts[index + 1] || null,
    prev: posts[index - 1] || null
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
  text-decoration: none;
  transition: all 0.2s;
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

.next { text-align: right; }
</style>

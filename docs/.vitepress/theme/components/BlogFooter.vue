<script setup>
import { useData, withBase } from 'vitepress'
// 路径修正：因为此文件在 components 目录下，posts.data.mts 在上一级
import { data as posts } from '../posts.data.mts' 
import { computed } from 'vue'

const { page } = useData()

const prevNext = computed(() => {
  // 查找当前文章在列表中的索引
  const curUrl = page.value.relativeByPath 
    ? '/' + page.value.relativeByPath.replace('.md', '') 
    : page.value.url.replace(/\.html$/, '')

  const index = posts.findIndex(p => p.url.replace(/\.html$/, '') === curUrl)

  if (index === -1) return { prev: null, next: null }

  // 排序逻辑同步：由于 data 是倒序排的（最新的在 index 0）
  // 上一篇 (更新的文章) = index - 1
  // 下一篇 (更旧的文章) = index + 1
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
  /* 使用你全局定义的虚线分割 */
  border-top: 1px dashed var(--vp-c-divider);
  /* 确保字体符合你的全局设置 */
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
  /* 使用你的品牌绿色变量 */
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.2s ease;
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
</style>

---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template>
  <div class="category-list">
    <div
      v-for="[category, postGroup] in sortedCategoryGroups"
      :key="category"
      class="category-block"
    ><h1 :id="category" class="category-title">
        {{ category }}
      </h1><div
        v-for="(post, index) in postGroup"
        :key="post.url"
        class="post-item"
      ><div v-if="index !== 0" class="post-divider"></div>
        <div class="post-row">
          <h2 class="post-title">
         <a :href="post.url">{{ post.title }}</a></h2> 
          <div class="post-date">{{ post.date.string }}</div>
        </div>
      </div>
      <div class="category-divider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { data as posts } from ".vitepress/theme/posts.data.mts";

const sortedCategoryGroups = computed(() => {
  const map = new Map<string, typeof posts>();

  // 1. 分组
  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) map.set(category, []);
    map.get(category)!.push(post);
  });

  // 2. 转换并排序：先按文章日期排组内，再按组内最新文章日期排组间
  return Array.from(map.entries())
    .map(([category, group]) => {
      group.sort((a, b) => b.date.time - a.date.time);
      return [category, group] as const;
    })
    .sort((a, b) => b[1][0].date.time - a[1][0].date.time);
});
</script>

<style lang="scss" scoped>
/* ───────── 分类头部 ───────── */
.category-block {
  margin-bottom: 2rem;
}

.category-title {
  margin: 0 0 1rem !important;
  padding: 0 !important;
  border: none !important;

  font-family: "ChillRoundF", serif;
  font-size: 24px !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

/* ───────── 文章行 (标题 + 日期) ───────── */
.post-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0;
}

@media (max-width: 768px) {
  .post-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}

/* ───────── 文章标题 ───────── */
.post-title {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  line-height: 1.6;

  a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    font-size: 16px !important;
    font-weight: 580 !important;
    text-decoration: none !important;
    color: var(--vp-c-text-2);
    transition: color 0.2s ease;

    &:hover {
      color: var(--vp-c-brand-1); /* 建议使用品牌色作为 hover 反馈 */
    }
  }
}

/* ───────── 日期 ───────── */
.post-date {
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ───────── 分割线 ───────── */
.post-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 8px 0;
  opacity: 0.5;
}

.category-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 24px 0 0;
}
</style>

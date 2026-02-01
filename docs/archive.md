---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="[category, postGroup] in sortedCategoryGroups" :key="category">
  <h2 :id="category" class="post-title">
    <a
      class="header-anchor"
      :href="`#${category}`"
      :aria-label="`Permalink to &quot;${category}&quot;`"
    >​</a>
    <div class="post-year hollow-text source-han-serif">{{ category }}</div>
  </h2><div class="post-container" v-for="post in postGroup" :key="post.url"><a :href="withBase(post.url)">{{ post.title }}</a>
    <span class="post-date">
      {{ post.date.string }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
// 引入你的数据文件
import { data as posts } from "./.vitepress/theme/posts.data.mts";

const sortedCategoryGroups = computed(() => {
  const groups = new Map<string, typeof posts>();

  posts.forEach((post) => {
    // 默认分类处理
    const category = post.category || "Uncategorized";
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)?.push(post);
  });

  // 转化为数组并排序
  const entries = Array.from(groups.entries());

  entries.forEach(([_, group]) => {
    // 分类内部：按时间倒序排列
    group.sort((a, b) => b.date.time - a.date.time);
  });

  // 分类外部：按该分类下最新一篇文章的时间排序（最新的分类排在最前面）
  entries.sort((a, b) => {
    return b[1][0].date.time - a[1][0].date.time;
  });

  return entries;
});
</script>

<style lang="scss" scoped>
.post-title {
  margin-top: 2rem;
  margin-bottom: 10px;
  border-top: 0px;
  position: relative;

  .post-year {
    position: absolute;
    top: 10px;
    left: -8px;
    z-index: -1;
    opacity: 0.12;
    font-family: "ChillRoundF", "Source Han Serif", serif;
    font-size: 36px;
    font-weight: 700;
    white-space: nowrap;
    pointer-events: none;
  }
}

.post-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px dashed var(--vp-c-divider-light);

  &:last-of-type {
    border-bottom: none;
  }

  > a {
    font-weight: 400;
    color: var(--vp-c-text-1);
    transition: color 0.25s;
    text-decoration: none !important;

    &:hover {
      color: var(--vp-c-brand);
    }
  }

  .post-date {
    font-size: 0.9em;
    opacity: 0.6;
    font-variant-numeric: tabular-nums;
  }
}

.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}

/* 移动端适配优化 */
@media (max-width: 640px) {
  .post-year {
    font-size: 28px !important;
  }
}
</style>

---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="[category, postGroup] in sortedCategoryGroups" :key="category">
  <h1 :id="category" class="category-title">
    <a
      class="header-anchor"
      :href="`#${category}`"
      :aria-label="`Permalink to &quot;${category}&quot;`"
    ></a>
    {{ category }}
  </h1>
  <template v-for="(post, index) in postGroup" :key="post.url">
    <!-- 组内非首条，前加分隔线 -->
    <div v-if="index !== 0" class="post-divider"></div>
    <div class="post-item">
      <h2 class="post-title"><a :href="withBase(post.url)">{{ post.title }}</a></h2>
      <span class="post-date">{{ post.date.string }}</span>
    </div>
    <!-- 组内最后一条，后加分隔线 -->
    <div v-if="index === postGroup.length - 1" class="post-divider"></div>
  </template>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { data as posts } from "./.vitepress/theme/posts.data.mts";

const sortedCategoryGroups = computed(() => {
  const groups = new Map<string, typeof posts>();

  posts.forEach((post) => {
    const category = post.category || "Uncategorized";
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)?.push(post);
  });

  const entries = Array.from(groups.entries());

  entries.forEach(([_, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
  });

  entries.sort((a, b) => {
    return b[1][0].date.time - a[1][0].date.time;
  });

  return entries;
});
</script>

<style lang="scss" scoped>
.category-title {
  margin-top: 24px !important;      /* 分类之间间距 */
  margin-bottom: 8px !important;    /* 与列表紧凑衔接 */
  font-family: "Noto Serif SC", "Source Han Serif", serif;
  font-size: 22px;
  
  &:first-of-type {
    margin-top: 0 !important;       /* 第一个标题无顶部间距 */
  }
}

.post-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.post-item {
  padding: 6px 0;                   /* 紧凑行高 */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}

.post-title {
  margin: 0 !important;
  min-width: 0;
  white-space: normal;

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 580 !important;
    font-size: 15px;                /* 稍小字号更紧凑 */
    color: #326891;

    &:hover {
      color: #326891;
      text-decoration: underline !important;
    }
  }
}

.post-date {
  font-size: 13px;                  /* 日期稍小 */
  color: var(--vp-c-text-3);
  font-weight: 400;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 12px;
}

@media (max-width: 768px) {
  .category-title {
    margin-top: 20px !important;
    margin-bottom: 6px !important;
    font-size: 20px;
  }
  
  .post-item {
    padding: 8px 0;
  }

  .post-title > a {
    font-size: 15px;
  }
  
  .post-date {
    font-size: 12px;
  }
}
</style>

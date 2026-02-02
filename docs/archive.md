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
    <div v-if="index !== 0" class="post-divider"></div>
    <div class="post-item">
      <h2 class="post-title"><a :href="withBase(post.url)">{{ post.title }}</a></h2>
      <span class="post-date">{{ post.date.string }}</span>
    </div>
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
  margin-top: 10px !important;      /* 分类之间间距 */
  margin-bottom: 10px !important;    /* 与列表紧凑衔接 */
  font-family: "Noto Serif SC", "Source Han Serif", serif;
  font-size: 22px;
  
  &:first-of-type {
    margin-top: 20px !important; 
  }
}

.post-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.post-item {
  padding: 4px 0;
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
    font-size: 16px;                /* 稍小字号更紧凑 */
    color: #326891;

    &:hover {
      color: #326891;
      text-decoration: underline !important;
    }
  }
}

.post-date {
  font-size: 13.6px;                  /* 日期稍小 */
  color: var(--vp-c-text-3);
  font-weight: 400;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 12px;
}

@media (max-width: 768px) {
  .category-title {
    margin-top: 10px !important;
    margin-bottom: 5px !important;
    font-size: 20px;
  }
  
  .post-item {
    padding: 4px 0;
  }

  .post-title > a {
    font-size: 16px;
  }
  
  .post-date {
    font-size: 13.6px;
  }
}
</style>

---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template>
  <div class="category-list" :key="route.path">
    <div
      v-for="[category, postGroup] in sortedCategoryGroups"
      :key="category"
      class="category-block"
    ><h1 :id="category" class="category-title">{{ category }}</h1><div v-for="(post, index) in postGroup" :key="post.url" class="post-item">
        <div v-if="index !== 0" class="post-divider"></div>
        <div class="post-row">
          <h2 class="post-title">
         <a :href="post.url">{{ post.title }}</a></h2>
          <div class="post-date">{{ post.date?.string }}</div>
        </div>
      </div>
      <div class="category-divider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vitepress";
import { data as posts } from ".vitepress/theme/posts.data.mts";

const route = useRoute();

const sortedCategoryGroups = computed(() => {
  if (!posts) return [];
  
  const map = new Map();
  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) map.set(category, []);
    map.get(category).push(post);
  });

  return Array.from(map.entries())
    .map(([category, group]) => {
      group.sort((a, b) => (b.date?.time || 0) - (a.date?.time || 0));
      return [category, group];
    })
    .sort((a, b) => (b[1][0]?.date?.time || 0) - (a[1][0]?.date?.time || 0));
});
</script>

<style lang="scss" scoped>
/* 此处保留你之前的样式，删除了 .category-count */
.category-title {
  margin: 1.5rem 0 1rem !important;
  font-family: "ChillRoundF", serif;
  font-size: 24px !important;
  font-weight: 700 !important;
  color: var(--vp-c-text-1);
}
.post-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.post-title a {
  font-size: 16px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  &:hover { color: var(--vp-c-brand-1); }
}
.post-date {
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.post-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 10px 0;
  opacity: 0.5;
}
.category-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 20px 0;
}
</style>

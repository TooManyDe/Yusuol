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
    >
      <!-- Category Header -->
      <h2 :id="category" class="category-title">
        {{ category }}
        <span class="category-count">{{ postGroup.length }}</span>
      </h2>
<!-- Posts -->
      <div
        v-for="(post, index) in postGroup"
        :key="post.url"
        class="post-item"
      ><div v-if="index !== 0" class="post-divider"></div>
 <h1 class="post-title">
        <a :href="post.url">{{ post.title }}</a></h1><div class="post-date">
          {{ post.date.string }}
        </div>
      </div><div class="category-divider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { data as posts } from "./.vitepress/theme/posts.data.mts";

const sortedCategoryGroups = computed(() => {
  const map = new Map<string, typeof posts>();

  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) map.set(category, []);
    map.get(category)!.push(post);
  });

  return Array.from(map.entries())
    .map(([category, group]) => {
      group.sort((a, b) => b.date.time - a.date.time);
      return [category, group] as const;
    })
    .sort((a, b) => b[1][0].date.time - a[1][0].date.time);
});
</script>
<style lang="scss" scoped>
/* ───────── Category Header ───────── */
.category-header {
  margin-top: 42px;

  &:first-child {
    margin-top: 0;
  }
}

.category-title {
  margin: 0 0 18px !important;
  padding: 0 !important;
  border: none !important;

  display: flex;
  align-items: baseline;
  gap: 10px;

  font-family: "ChillRoundF", serif;
  font-size: 36px;
  font-weight: 650;
  letter-spacing: 0.09em;
  text-transform: uppercase;

  color: var(--vp-c-text-1);
}

.category-count {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.55;
}

/* ───────── Post Title ───────── */
.post-title {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  line-height: 1.55;

  > a:first-child {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    font-size: 18px;
    font-weight: 580 !important;
    text-decoration: none !important;
    color: var(--vp-c-text-1);

    &:hover {
      opacity: 0.85;
    }
  }
}

/* ───────── Excerpt ───────── */
.post-excerpt {
  margin: 6px 0 2px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--vp-c-text-2);

  :deep(p) {
    margin: 0;
    font-weight: 420 !important;
  }
}

/* ───────── Date ───────── */
.post-date {
  margin-top: 4px;
  margin-bottom: 14px;

  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-3);
  opacity: 0.65;
}

/* ───────── Dividers ───────── */
.post-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  opacity: 0.25;
  margin: 14px 0;
}

.category-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-text-1);
  opacity: 0.18;
  margin: 20px 0 10px;
}
</style>
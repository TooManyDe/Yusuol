---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="[category, postGroup] in sortedCategoryGroups" :key="category">
  <!-- Category Header -->
  <div class="category-header">
    <h2 :id="category" class="category-title">
      <a
        class="header-anchor"
        :href="`#${category}`"
        :aria-label="`Permalink to &quot;${category}&quot;`"
      >​</a>
      <span class="category-label">{{ category }}</span>
      <span class="category-count">{{ postGroup.length }}</span>
    </h2>
  </div>

  <!-- Posts in this category -->
  <template v-for="(post, index) in postGroup" :key="post.url">
    <div v-if="index !== 0" class="post-divider"></div>

    <h3 :id="post.title" class="post-title">
      <a :href="post.url">{{ post.title }}</a>
      <a
        class="header-anchor"
        :href="`#${post.title}`"
        :aria-label="`Permalink to &quot;${post.title}&quot;`"
      ></a>
    </h3>

    <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>

    <div class="post-date">
      {{ post.date.string }}
    </div>
  </template>

  <!-- Category separator -->
  <div class="category-divider"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { data as posts } from "./.vitepress/theme/posts.data.mts";

const sortedCategoryGroups = computed(() => {
  const map = new Map<string, typeof posts>();

  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) {
      map.set(category, []);
    }
    map.get(category)?.push(post);
  });

  const sortedEntries = Array.from(map.entries()).map(([category, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
    return [category, group] as const;
  });

  // Sort categories by their most recent post
  sortedEntries.sort((a, b) => b[1][0].date.time - a[1][0].date.time);

  return sortedEntries;
});
</script>

<style lang="scss" scoped>
/* ── Category Header ── */
.category-header {
  margin-top: 28px;

  &:first-child {
    margin-top: 0;
  }
}

.category-title {
  position: relative;
  margin-bottom: 12px !important;
  border-top: none !important;
  padding-top: 0 !important;
  font-family: "ChillRoundF", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-label {
  letter-spacing: 0.02em;
}

.category-count {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-3);
  background-color: var(--vp-c-gray-light-3);
  padding: 2px 7px;
  border-radius: 10px;
}

/* ── Post Title ── */
.post-title {
  margin-top: 0 !important;
  margin-bottom: 6px !important;
  border-top: none !important;
  padding-top: 0 !important;
  line-height: 1.5;

  > a:first-child {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 580 !important;
    font-size: 20px;
    color: var(--vp-c-text-1);

    &:hover {
      color: var(--vp-c-brand-1);
    }
  }
}

/* ── Post Excerpt ── */
.post-excerpt {
  margin: 0 0 4px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--vp-c-text-1);

  :deep(p) {
    margin: 0;
    font-weight: 400 !important;
  }
}

/* ── Post Date ── */
.post-date {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 400;
  margin-bottom: 10px;
  letter-spacing: 0.01em;
}

/* ── Dividers ── */
.post-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 6px 0;
}

.category-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 18px 0 4px;
  opacity: 0.5;
}
</style>

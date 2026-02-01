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
      v-for="([category, postGroup], gIndex) in sortedCategoryGroups"
      :key="category"
      class="category-block"
    >
      <div v-if="gIndex !== 0" class="category-divider"></div>

      <!-- Category Header -->
      <h1 :id="category" class="category-title">
        {{ category }}
        <span class="category-count">{{ postGroup.length }}</span>
      </h1>

      <!-- Posts -->
      <div
        v-for="(post, index) in postGroup"
        :key="post.url"
        class="post-item"
      >
        <div v-if="index !== 0" class="post-divider"></div>
        <div class="post-row">
          <h2 class="post-title">
            <a :href="post.url">{{ post.title }}</a>
          </h2>
          <div class="post-date">
            {{ post.date.string }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { data as posts } from ".vitepress/theme/posts.data.mts";

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
.category-title {
  margin: 0 0 6px !important;
  padding: 0 !important;
  border: none !important;

  display: flex;
  align-items: baseline;
  gap: 8px;

  font-family: "Noto Serif SC", "Source Han Serif", serif !important;
  font-size: 20px !important;
  font-weight: 580 !important;
  line-height: 1.5;
  color: #326891;
}

.category-count {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

/* ───────── Post Row (Title + Date) ───────── */
.post-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

@media (max-width: 768px) {
  .post-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}

/* ───────── Post Title ───────── */
.post-title {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  line-height: 1.5;

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    font-size: 16px !important;
    font-weight: 580 !important;
    text-decoration: none !important;
    color: var(--vp-c-text-2);

    &:hover {
      color: var(--vp-c-brand-1);
    }

    &:active {
      color: var(--vp-c-brand-1);
    }
  }
}

/* ───────── Date ───────── */
.post-date {
  margin: 0 !important;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .post-date {
    font-size: 12px;
  }
}

/* ───────── Dividers ───────── */
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
  margin: 10px 0;
}
</style>
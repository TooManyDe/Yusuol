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
      >
        <div v-if="index !== 0" class="post-divider"></div>

        <h3 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h3>

        <div
          v-if="post.excerpt"
          class="post-excerpt"
          v-html="post.excerpt"
        ></div>

        <div class="post-date">
          {{ post.date.string }}
        </div>
      </div>

      <div class="category-divider"></div>
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
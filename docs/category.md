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
  </h2>
  <div class="post-container" v-for="post in postGroup" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
    <span class="post-date">
      {{ post.date.string }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { data as posts } from "./.vitepress/theme/posts.data.mts";

// 按分类分组并排序
const sortedCategoryGroups = computed(() => {
  const map = new Map<string, typeof posts>();

  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) {
      map.set(category, []);
    }
    map.get(category)?.push(post);
  });

  // 对每个分类内部按时间倒序排序
  const sortedEntries = Array.from(map.entries()).map(([category, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
    return [category, group];
  });

  // 再根据每个分类中最新文章时间，整体排序
  sortedEntries.sort((a, b) => b[1][0].date.time - a[1][0].date.time);

  return sortedEntries;
});
</script>

<style lang="scss" scoped>
.post-title {
  margin-bottom: 0;
  border-top: 0px;
  position: relative;
  font-family: "ChillRoundF";

  .post-year {
    position: absolute;
    top: 15px;
    left: -10px;
    z-index: -1;
    opacity: .16;
    font-family: "ChillRoundF";
    font-size: 40px;
    font-weight: 600;
  }
}

.post-container {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;

  > a {
    font-weight: 400;
text-decoration: none !important;
  }

  .post-date {
    opacity: .6;
  }
}

.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>

---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="[category, postGroup] in sortedCategoryGroups" :key="category">
  <h2 :id="category" class="category-title">
    <a
      class="header-anchor"
      :href="`#${category}`"
      :aria-label="`Permalink to &quot;${category}&quot;`"
    ></a>
    {{ category }}
  </h2><template v-for="(post, index) in postGroup" :key="post.url">
    <div v-if="index !== 0" class="post-divider"></div>
<div class="post-item">
      <h2 class="post-title"><a :href="withBase(post.url)">{{ post.title }}</a></h2>
      <span class="post-date">{{ post.date.string }}</span>
    </div>
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
  margin-top: 8px !important;
  margin-bottom: 6px !important;
  font-family: "Noto Serif SC", "Source Han Serif", serif;
  font-size: 24px;
}

.post-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 2px 0;
}

.post-item {
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;      /* baseline 对齐，文字底部齐平 */
  gap: 12px;
}

.post-title {
  margin: 0 !important;
  min-width: 0;               /* 允许 flex 子项截断 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;        /* 强制单行，超长时省略号截断 */

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 580 !important;
    font-size: 16px;
    color: #326891;

    &:hover {
      color: #326891;
    }
  }
}

.post-date {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 400;
  white-space: nowrap;
  flex-shrink: 0;             /* 日期不收缩，始终完整显示 */
}

@media (max-width: 768px) {
  .post-item {
    flex-direction: column;
    gap: 2px;
    padding: 4px 0;
  }

  .post-title {
    white-space: normal;      /* 移动端允许换行 */
    overflow: visible;
  }

  .post-title > a {
    font-size: 18px;
  }

  .category-title {
    font-size: 20px;
  }
}
</style>
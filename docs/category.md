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
  <div
    v-for="(post, index) in postGroup"
    :key="post.url"
    class="post-item"
  ><h2 class="post-title"><a :href="withBase(post.url)">{{ post.title }}</a>
    </h2>
    <span class="post-date">{{ post.date.string }}</span>
  </div>
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
  margin: 1.8rem 0 0.6rem !important;
  font-family: "Noto Serif SC", "Source Han Serif", serif;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
  line-height: 1.2;

  &:first-of-type {
    margin-top: 0.6rem !important;
  }
}

.post-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 0;
  gap: 15px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-title {
  flex: 1;
  min-width: 0;
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
  line-height: 1.4;

  > a {
    font-family: "PingFang", "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 500 !important;
    font-size: 1.05rem;
    color: var(--vp-c-text-1) !important;
    transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover,
    &:active {
      color: #000000 !important;
      text-decoration: underline !important;
    }
  }
}

.post-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  white-space: nowrap;
  letter-spacing: -0.2px;
}

@media (max-width: 640px) {
  .post-item {
    padding: 10px 0;
  }

  .post-title > a {
    font-size: 1rem;
  }

  .category-title {
    font-size: 1.15rem;
  }
}
</style>
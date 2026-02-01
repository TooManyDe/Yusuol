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
      <div class="post-content-main">
        <h3 class="post-title"><a :href="withBase(post.url)">{{ post.title }}</a>
        </h3>
        <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>
      </div>
<div class="post-date">
        {{ post.date.string }}
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
// 引入你的数据文件
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
  margin-top: 2.5rem !important;
  margin-bottom: 1rem !important;
  font-family: "Noto Serif SC", "Source Han Serif", serif;
  font-size: 24px;
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-brand);
  display: inline-block;
}

.post-divider {
  width: 100%;
  height: 1px; 
  background-color: var(--vp-c-divider);
  margin: 6px 0; 
}

.post-item {
  padding: 12px 0;
  display: flex;
  flex-direction: row;        /* 默认横向排列 */
  justify-content: space-between; /* 左右两端对齐 */
  align-items: flex-start;    /* 顶部对齐 */
  gap: 20px;                  /* 标题和日期之间的最小间距 */
}

.post-content-main {
  flex: 1;                    /* 占据剩余的所有宽度 */
}

.post-title {
  margin: 0 !important;       /* 移除默认边距以配合 Flex 对齐 */
  line-height: 1.4;

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 580 !important;
    font-size: 20px; 
    color: #326891;
    
    &:hover {
      color: #004488;
    }
  }
}

.post-excerpt {
  margin: 4px 0 0; 
  font-size: 16px;
  line-height: 1.5;
  color: var(--vp-c-text-1);

  :deep(p) {
    margin: 0;
    font-weight: 400 !important;
  }
}

.post-date {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 400;
  white-space: nowrap;        /* 强制日期不换行 */
  margin-top: 6px;            /* 微调使其与第一行标题视觉对齐 */
  letter-spacing: 0.01em;
}

/* 适配移动端 */
@media (max-width: 768px) {
  .post-item {
    flex-direction: column;   /* 移动端改为垂直排列 */
    gap: 8px;
    padding: 10px 0;
  }

  .post-date {
    margin-top: 0;
    margin-bottom: 4px;
  }

  .post-title > a {
    font-size: 18px;
  }

  .category-title {
    font-size: 22px;
  }
}
</style>

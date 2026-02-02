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
  <div class="category-content">
    <template v-for="(post, index) in postGroup" :key="post.url">
      <div class="post-item">
        <h2 class="post-title"><a :href="withBase(post.url)">{{ post.title }}</a></h2>
        <span class="post-date">{{ post.date.string }}</span>
      </div>
    </template>
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
  margin-top: 32px !important;      /* 增加上方间距，与上一个区块分隔 */
  margin-bottom: 16px !important;   /* 增加下方间距，与列表内容分隔 */
  padding-bottom: 8px;              /* 内边距，为下划线留空间 */
  border-bottom: 1px solid var(--vp-c-divider);  /* 用边框代替分隔线，更整洁 */
  font-family: "Noto Serif SC", "Source Han Serif", serif;
  font-size: 24px;
  color: var(--vp-c-text-1);
  
  &:first-of-type {
    margin-top: 8px !important;     /* 第一个标题顶部间距小一些 */
  }
}

.category-content {
  /* 列表容器，统一管理间距 */
  margin-bottom: 24px;              /* 每个分类区块底部间距 */
}

.post-item {
  padding: 10px 0;                  /* 增加上下内边距，让行高更舒适 */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid var(--vp-c-divider-light, rgba(125, 125, 125, 0.2)); /* 细分割线 */
  
  &:last-child {
    border-bottom: none;            /* 最后一个不要下边框 */
  }
}

.post-title {
  margin: 0 !important;
  min-width: 0;
  white-space: normal;
  line-height: 1.5;                 /* 增加行高，多行时更舒适 */

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 580 !important;
    font-size: 16px;
    color: #326891;
    line-height: 1.5;

    &:hover {
      color: #326891;
      text-decoration: underline !important;  /* 悬停加下划线，增强交互感 */
      text-underline-offset: 3px;             /* 下划线与文字间距 */
    }
  }
}

.post-date {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 400;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 16px;                /* 与标题保持一定距离 */
}

@media (max-width: 768px) {
  .category-title {
    margin-top: 24px !important;
    margin-bottom: 12px !important;
    font-size: 22px;
    
    &:first-of-type {
      margin-top: 0 !important;
    }
  }
  
  .category-content {
    margin-bottom: 16px;
  }

  .post-item {
    flex-direction: column;         /* 移动端改为垂直布局 */
    align-items: flex-start;
    gap: 4px;
    padding: 12px 0;
  }

  .post-title {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    width: 100%;
  }

  .post-title > a {
    font-size: 16px;
  }
  
  .post-date {
    margin-left: 0;
    font-size: 13px;
    color: var(--vp-c-text-2);
  }
}
</style>

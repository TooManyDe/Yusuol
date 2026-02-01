---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template>
  <div class="archive-container">
    <template v-for="[category, postGroup] in sortedCategoryGroups" :key="category">
      <h2 :id="category" class="category-title">
        <a
          class="header-anchor"
          :href="`#${category}`"
          :aria-label="`Permalink to &quot;${category}&quot;`"
        ></a>
        {{ category }}
      </h2>
<div v-for="post in postGroup" :key="post.url" class="post-item">
        <div class="post-content-main">
          <h2 class="post-title">
<a :href="withBase(post.url)">{{ post.title }}</a>
          </h2>
        </div>
        <div class="post-date">
          {{ post.date.string }}
        </div>
      </div>
    </template>
  </div>
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

  // 组内按时间排序
  entries.forEach(([_, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
  });

  // 组间按最新一篇文章的时间排序
  entries.sort((a, b) => {
    return b[1][0].date.time - a[1][0].date.time;
  });

  return entries;
});
</script>

<style lang="scss" scoped>
.archive-container {
  margin-top: -20px; /* 抵消掉文章页默认的部分顶部间距 */
}

.category-title {
  margin: 1.5rem 0 0.6rem !important; /* 紧凑的上下边距 */
  font-family: "Noto Serif SC", "Source Han Serif", serif;
  font-size: 1.25rem; /* 约 20px */
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-brand);
  display: inline-block;
  padding-bottom: 2px;
  line-height: 1.2;
}

.post-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline; /* 关键：确保标题与日期底部对齐 */
  padding: 8px 0; /* 控制每一行的紧凑程度 */
  gap: 15px;
  border-bottom: 1px solid var(--vp-c-divider); /* 使用边框代替 divider div */

  &:last-of-type {
    border-bottom: none; /* 该分类下最后一个条目不显示分割线 */
  }
}

.post-content-main {
  flex: 1;
  min-width: 0; /* 防止标题过长撑破布局 */
}

.post-title {
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
  line-height: 1.4;

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 500 !important;
    font-size: 1.05rem; /* 约 16.8px，平衡视觉密度 */
    color: #326891;
    transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }
}

.post-date {
  font-size: 0.85rem; /* 约 13.6px */
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono); /* 等宽数字更整齐 */
  white-space: nowrap;
  letter-spacing: -0.2px;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .post-item {
    padding: 10px 0;
    /* 如果手机端想保持一行，注释掉下面这句；如果想换行，保留。建议紧凑型列表不换行 */
    /* flex-direction: column; */ 
  }

  .post-title > a {
    font-size: 1rem;
  }
  
  .category-title {
    font-size: 1.15rem;
  }
}
</style>

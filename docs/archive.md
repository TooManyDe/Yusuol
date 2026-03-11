---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<script lang="ts" setup>
import { computed } from "vue";
import { data as posts } from "./.vitepress/theme/posts.data.mts";

// 1. 处理分类逻辑：用于顶部的分类索引
const categories = computed(() => {
  const map = new Map<string, number>();
  posts.forEach(post => {
    const cat = post.category || "未分类";
    map.set(cat, (map.get(cat) || 0) + 1);
  });
  return Array.from(map.entries());
});

// 2. 处理归档逻辑：按年份分组
const archiveGroups = computed(() => {
  const groups = new Map<string, typeof posts>();
  posts.forEach((post) => {
    const year = post.date.year;
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)?.push(post);
  });
  // 年份倒序
  return Array.from(groups.entries()).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
});

// 3. 处理分类明细逻辑（你原有的逻辑）
const categoryGroups = computed(() => {
  const map = new Map<string, typeof posts>();
  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) map.set(category, []);
    map.get(category)?.push(post);
  });
  const sortedEntries = Array.from(map.entries()).map(([category, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
    return [category, group] as [string, typeof posts];
  });
  sortedEntries.sort((a, b) => b[1][0].date.time - a[1][0].date.time);
  return sortedEntries;
});
</script>

<template>
  <div class="integrated-page">
    <div class="category-index">
      <div class="index-label">分类索引</div>
      <div class="category-tags">
        <a v-for="[cat, count] in categories" :key="cat" :href="`#${cat}`" class="cat-tag">
          {{ cat }} <span class="count">{{ count }}</span>
        </a>
      </div>
    </div>
    <hr class="divider" />
    <div class="main-content">
      <h1 class="section-title">分类详情</h1>
      <template v-for="[category, postGroup] in categoryGroups" :key="category">
        <h2 :id="category" class="post-title">
          <a class="header-anchor" :href="`#${category}`">​</a>
          <div class="hollow-text big-bg-text">{{ category }}</div>
        </h2>
        <div class="post-container" v-for="post in postGroup" :key="post.url">
          <a :href="post.url" class="link">{{ post.title }}</a>
          <span class="post-date">{{ post.date.string }}</span>
        </div>
      </template>
      <h1 class="section-title archive-title">年度归档</h1>
      <template v-for="[year, postGroup] in archiveGroups" :key="year">
        <h2 :id="year" class="post-title">
          <a class="header-anchor" :href="`#${year}`">​</a>
          <div class="hollow-text big-bg-text">{{ year }}</div>
        </h2>
        <div class="post-container" v-for="post in postGroup" :key="post.url">
          <a :href="post.url" class="link">{{ post.title }}</a>
          <span class="post-date">{{ post.date.monthDay }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.integrated-page {
  padding-top: 20px;
}

/* 分类索引样式 */
.category-index {
  margin-bottom: 2rem;
  .index-label {
    font-size: 0.9rem;
    opacity: 0.5;
    margin-bottom: 1rem;
    font-family: "ChillRoundF";
  }
  .category-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .cat-tag {
    background: var(--vp-c-bg-soft);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.9rem;
    text-decoration: none !important;
    color: var(--vp-c-text-1);
    transition: all 0.2s;
    border: 1px solid transparent;
    &:hover {
      border-color: var(--vp-c-brand-1);
      color: var(--vp-c-brand-1);
      transform: translateY(-2px);
    }
    .count {
      opacity: 0.4;
      font-size: 0.8rem;
      margin-left: 4px;
    }
  }
}

.section-title {
  font-family: "ChillRoundF";
  font-size: 1.5rem;
  margin-top: 4rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  &.archive-title {
    margin-top: 6rem;
    border-top: 1px dashed var(--vp-c-divider);
    padding-top: 2rem;
  }
}

.post-title {
  margin-bottom: 8px;
  margin-top: 40px;
  border-top: 0;
  position: relative;
  
  .big-bg-text {
    position: absolute;
    top: 15px;
    left: -8px;
    z-index: -1;
    opacity: .12;
    font-family: "ChillRoundF";
    font-size: 42px;
    font-weight: 600;
    pointer-events: none;
    white-space: nowrap;
  }
}

.post-container {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 14px 0;
  padding: 0 4px;

  .link {
    font-weight: 400;
    color: var(--vp-c-text-1);
    text-decoration: none !important;
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  .post-date {
    font-size: 0.9rem;
    opacity: .5;
    font-family: var(--vp-font-family-mono);
  }
}

.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}

.divider {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 2rem 0;
}
</style>

---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<script lang="ts" setup>
import { ref, computed } from "vue";
import { data as posts } from "./.vitepress/theme/posts.data.mts";

// 1. 切换逻辑
const activeTab = ref<'archive' | 'category'>('archive');

// 2. 归档逻辑 (按年份分组)
const archiveGroups = computed(() => {
  const groups = new Map<string, typeof posts>();
  posts.forEach((post) => {
    const year = post.date.year;
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)?.push(post);
  });
  return Array.from(groups.entries()).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
});

// 3. 分类逻辑 (按分类分组)
const categoryGroups = computed(() => {
  const map = new Map<string, typeof posts>();
  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) map.set(category, []);
    map.get(category)?.push(post);
  });
  const entries = Array.from(map.entries()).map(([cat, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
    return [cat, group] as [string, typeof posts];
  });
  // 按分类内最新文章时间排序
  return entries.sort((a, b) => b[1][0].date.time - a[1][0].date.time);
});

// 4. 统一当前渲染的数据
const displayGroups = computed(() => {
  return activeTab.value === 'archive' ? archiveGroups.value : categoryGroups.value;
});
</script>

<template>
  <div class="custom-container">
    <div class="tab-switcher">
      <button :class="{ active: activeTab === 'archive' }" @click="activeTab = 'archive'">按时间</button>
      <span class="divider">/</span>
      <button :class="{ active: activeTab === 'category' }" @click="activeTab = 'category'">按分类</button>
    </div>

    <div v-for="[title, group] in displayGroups" :key="title" class="group-section">
      <h2 :id="title" class="post-title">
        <a class="header-anchor" :href="`#${title}`">​</a>
        <div class="hollow-text source-han-serif big-bg-text">{{ title }}</div></h2>
      <div class="post-item" v-for="post in group" :key="post.url">
        <a :href="post.url" class="post-link">{{ post.title }}</a>
        <span class="post-meta">
          {{ activeTab === 'archive' ? post.date.monthDay : post.date.string }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-switcher {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  font-family: "ChillRoundF";
  
  button {
    font-size: 1.1rem;
    color: var(--vp-c-text-2);
    transition: color 0.3s;
    cursor: pointer;

    &.active {
      color: var(--vp-c-text-1);
      font-weight: 600;
    }
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }
  .divider { color: var(--vp-c-divider); }
}

.group-section {
  margin-bottom: 30px;
}

.post-title {
  margin-top: 20px;
  margin-bottom: 10px;
  border-top: 0;
  position: relative;
  height: 60px; 

  .big-bg-text {
    position: absolute;
    top: 10px;
    left: -5px;
    z-index: -1;
    opacity: .16;
    font-family: "ChillRoundF";
    font-size: 45px;
    font-weight: 600;
    line-height: 1;
    pointer-events: none;
  }
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 14px 0;
  padding-left: 5px;

  .post-link {
    font-weight: 400;
    text-decoration: none !important;
    color: var(--vp-c-text-1);
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  .post-meta {
    font-size: 0.9em;
    opacity: .5;
    font-family: var(--vp-font-family-mono);
  }
}

.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>

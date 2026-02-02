---
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="[year, postGroup] in sortedYearGroups" :key="year">
  <h1 :id="year" class="category-title">
    <a
      class="header-anchor"
      :href="`#${year}`"
      :aria-label="`Permalink to &quot;${year}&quot;`"
    ></a>
    {{ year }}
  </h1>
  <div
    v-for="(post, index) in postGroup"
    :key="post.url"
    class="post-item"
  >
    <h2 class="post-title">
      <a :href="withBase(post.url)">{{ post.title }}</a>
    </h2>
    <span class="post-date">{{ formatDate(post.date.time) }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { data as posts } from "../.vitepress/theme/posts-en.data.mts";


const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  // 配置项：英文语言，锁定上海时区
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  // 格式化后的字符串示例: "Feb 02, 10:06"
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  // 拼接后缀
  return `${formattedDate} (UTC+8)`;
  // 最终输出: "Feb 02, 10:06 (UTC+8)"
};


const sortedYearGroups = computed(() => {
  const groups = new Map<string, typeof posts>();

  posts.forEach((post) => {
    // 提取年份作为标题
    const year = post.date.time 
      ? new Date(post.date.time).getFullYear().toString() 
      : "Unknown";
      
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year)?.push(post);
  });

  const entries = Array.from(groups.entries());

  // 同一年份内按时间倒序
  entries.forEach(([_, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
  });

  // 年份按降序排列
  entries.sort((a, b) => parseInt(b[0]) - parseInt(a[0]));

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
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 500 !important;
    font-size: 1.05rem;
    color: #326891;
    transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover,
    &:active {
      color: #1a4a6e;
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
---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<button :class="{ active: viewMode === 'category' }" @click="viewMode = 'category'"
{{ parseInt(year).toString() }}
<div class="post-container" v-for="post in postGroup" :key="post.url">
  <a :href="post.url">{{ post.title }}</a>
  <span class="post-date">{{ post.date.monthDay }}</span>
</div>
{{ category }}
<div class="post-container" v-for="post in postGroup" :key="post.url">
  <a :href="post.url">{{ post.title }}</a>
  <span class="post-date">{{ post.date.string }}</span>
</div>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { data as posts } from "./.vitepress/theme/posts.data.mts";

const viewMode = ref("year");

/* 按年份 */
const yearGroups = computed(() => {
  const groups = new Map<string, typeof posts>();

  posts.forEach((post) => {
    const year = post.date.year;
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year)?.push(post);
  });

  return groups;
});

/* 按分类 */
const sortedCategoryGroups = computed(() => {
  const map = new Map<string, typeof posts>();

  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!map.has(category)) {
      map.set(category, []);
    }
    map.get(category)?.push(post);
  });

  const sortedEntries = Array.from(map.entries()).map(([category, group]) => {
    group.sort((a, b) => b.date.time - a.date.time);
    return [category, group];
  });

  sortedEntries.sort((a, b) => b[1][0].date.time - a[1][0].date.time);

  return sortedEntries;
});
</script>

<style lang="scss" scoped>

.view-switch {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  button {
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid var(--vp-c-divider);
    background: transparent;
    cursor: pointer;

    &.active {
      background: #41b349;
      color: white;
      border-color: #41b349;
    }
  }
}

.post-title {
  margin-bottom: 6px;
  position: relative;

  .post-year {
    position: absolute;
    top: 25px;
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
  margin: 12px 0;

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
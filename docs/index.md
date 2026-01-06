---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="post in curPosts" :key="post.url">
  <h2 :id="post.title" class="post-title">
    <a :href="post.url">{{ post.title }}</a>
    <span class="post-date-inline">{{ post.date.string }}</span>
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
    ></a>
  </h2>
  <div v-if="post.excerpt" v-html="post.excerpt"></div>
</template>

<div class="pagination-container">
  <t-pagination
    v-model="current"
    v-model:pageSize="pageSize"
    :total="total"
    size="small"
    :showPageSize="false"
    :showPageNumber="!isMobile()"
    :showJumper="isMobile()"
    @current-change="onCurrentChange"
  />
</div>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vitepress";
import {
  PaginationProps,
  Pagination as TPagination,
} from "tdesign-vue-next";

import { data as posts } from "./.vitepress/theme/posts.data.mts";
import { isMobile } from "./.vitepress/theme/utils/mobile.ts";

const route = useRoute();

const getPage = () => {
  const search = route.query
  const searchParams = new URLSearchParams(search as any);
  return Number(searchParams.get("page") || "1");
}

const current = ref(getPage())
const pageSize = ref(10);
const total = ref(posts.length);

const router = useRouter();
router.onAfterRouteChange = (to) => {
  current.value = getPage();
}

const curPosts = computed(() => {
  return posts.slice(
    (current.value - 1) * pageSize.value,
    current.value * pageSize.value
  );
});

const onCurrentChange: PaginationProps["onCurrentChange"] = (index) => {
  const url = new URL(window.location as any);
  url.searchParams.set("page", index.toString());
  window.history.replaceState({}, "", url.href);

  window.scrollTo({
    top: 0,
  });
};
</script>

<style lang="scss" scoped>
.pagination-container {
  margin-top: 10px;
  :deep(li) {
    margin-top: 0px;
  }
}

.post-title {
  margin-bottom: 0px;
  margin-top: 60px;
  border-top: 0px;
  display: flex;
  align-items: baseline; 
  flex-wrap: wrap;       
  gap: 12px;             

  > a {
    font-family: "SourceHanSerifCN-Bold" !important;
    text-decoration: none !important;
    
    /* 核心修改：使用更轻的黑色变量 */
    color: var(--vp-c-text-2); 
    font-weight: 600; 
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--vp-c-brand);
    }
  }

  .post-date-inline {
    font-size: 0.85rem;
    font-weight: 400;
    /* 核心修改：日期保持淡灰色，形成对比阶梯 */
    color: var(--vp-c-text-3); 
    font-family: var(--vp-font-family-base);
    opacity: 0.8; /* 增加一点透明感，更显协调 */
  }

  &:first-child {
    margin-top: 20px;
  }
}
</style>

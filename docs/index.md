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
  align-items: baseline; // 确保标题文字和日期底部对齐
  flex-wrap: wrap;       // 手机端如果标题过长，日期可自动换行
  gap: 12px;             // 标题与日期的间距

  > a {
    font-family: "SourceHanSerifCN-Bold" !important;
    text-decoration: none !important;
    color: var(--vp-c-text-1);
    
    &:hover {
      color: var(--vp-c-brand);
    }
  }

  // 修改后的日期样式：浅色、小字、行内显示
  .post-date-inline {
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--vp-c-text-3); // VitePress 默认的浅灰色
    font-family: var(--vp-font-family-base);
  }

  &:first-child {
    margin-top: 20px;
  }
}

// 移除不再需要的 .hollow-text 和旧版 .post-date 样式
</style>

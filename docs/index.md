---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="(post, index) in curPosts" :key="post.url">
  <div v-if="index !== 0" class="post-divider"></div>

  <h1 :id="post.title" class="post-title">
    <a :href="post.url">{{ post.title }}</a>
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
    ></a>
  </h1>

  <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>

  <div class="post-date">
    发表于：{{ formatDate(post.date.time) }}
  </div>
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
  Pagination as TPagination,
  type PaginationProps
} from "tdesign-vue-next";

import { data as posts } from "./.vitepress/theme/posts.data.mts";
import { isMobile } from "./.vitepress/theme/utils/mobile.ts";

const route = useRoute();
const router = useRouter();

const getPage = () => {
  const search = route.query;
  const searchParams = new URLSearchParams(search as any);
  return Number(searchParams.get("page") || "1");
}

const current = ref(getPage());
const pageSize = ref(10);
const total = ref(posts.length);

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
  window.history.replaceState({}, "", url);
  window.scrollTo({ top: 0 });
};
</script>

<style lang="scss" scoped>
/* ─── 分隔线 (变细且间距缩小) ─── */
.post-divider {
  width: 100%;
  height: 1px; 
  background-color: var(--vp-c-divider);
  margin: 12px 0; /* 缩小线前后的外边距 */
}

/* ─── 标题 (紧凑化) ─── */
.post-title {
  margin-top: 0 !important; 
  margin-bottom: 6px !important;
  border-top: none !important;
  padding-top: 0 !important;
  line-height: 1.5;

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 580 !important;
    font-size: 22px; 
    color: var(--vp-c-text-1);
    
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }
}

/* ─── 摘要 ─── */
.post-excerpt {
  margin: 0 0 4px; /* 压缩下方间距 */
  font-size: 16px;
  line-height: 1.5;
  color: var(--vp-c-text-1);

  :deep(p) {
    margin: 0;
    font-weight: 400 !important;
  }
}

/* ─── 发表于 (超紧凑) ─── */
.post-date {
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 400;
  margin-bottom: 10px; 
  letter-spacing: 0.01em;
}

/* 分页容器 */
.pagination-container {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;

  :deep(li) {
    margin-top: 0px !important;
  }
}
</style>

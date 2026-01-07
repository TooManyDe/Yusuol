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
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
    ></a>
  </h2>

  <div class="post-date literary-date">
    {{ post.date.string }}
  </div>

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
  MessagePlugin,
  PaginationProps,
  Pagination as TPagination,
} from "tdesign-vue-next";

import { data as posts } from "./.vitepress/theme/posts.data.mts";
import { isMobile } from "./.vitepress/theme/utils/mobile.ts";

const route = useRoute();

const getPage = () => {
  const search = route.query;
  const searchParams = new URLSearchParams(search as any);
  return Number(searchParams.get("page") || "1");
};

const current = ref(getPage());
const pageSize = ref(10);
const total = ref(posts.length);

const router = useRouter();
router.onAfterRouteChange = () => {
  current.value = getPage();
};

const curPosts = computed(() => {
  return posts.slice(
    (current.value - 1) * pageSize.value,
    current.value * pageSize.value
  );
});

const onCurrentChange: PaginationProps["onCurrentChange"] = (
  index,
  pageInfo
) => {
  const url = new URL(window.location as any);
  url.searchParams.set("page", index.toString());
  window.history.replaceState({}, "", url);

  window.scrollTo({ top: 0 });
};
</script>

<style lang="scss" scoped>
/* 分页区域 */
.pagination-container {
  margin-top: 10px;

  :deep(li) {
    margin-top: 0px;
  }
}

/* 标题 */
.post-title {
  margin-bottom: 0px;
  margin-top: 60px;
  border-top: 0px;

  > a {
    font-family: "SourceHanSerifCN-Bold" !important;
    text-decoration: none !important;
    color: #000; /* 默认黑色 */
    transition: color 0.2s;
  }

  /* 悬停和点击时变绿 */
  > a:hover,
  > a:active {
    color: #41b349;
  }

  &:first-child {
    margin-top: 20px;
  }
}

/* 日期（灰色 + 代码字体） */
.post-date.literary-date {
  margin-top: 4px;
  color: #999;
  font-family: Consolas, Menlo, Monaco, "Courier New", monospace;
  font-size: 13px;
  line-height: 1.4;
}

/* 空心文字（保留原有） */
.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>
---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<!--
之所以将代码写在 md 里面，而非单独封装为 Vue 组件，
因为 aside 不会动态刷新，参考
https://github.com/vuejs/vitepress/issues/2686
-->
<template v-for="post in curPosts" :key="post.url">
  <h2 :id="post.title" class="post-title">
    <a :href="post.url">{{ post.title }}</a>
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
    ></a>
  </h2>

  <!-- 文学灰阶日期 -->
  <div class="post-date literary-date">
    {{ post.date.string }}
  </div>

  <div v-if="post.excerpt" v-html="post.excerpt"></div>
</template>

<!-- <Pagination /> -->
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
  const searchParams = new URLSearchParams(search);
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

const onCurrentChange: PaginationProps["onCurrentChange"] = (index) => {
  const url = new URL(window.location as any);
  url.searchParams.set("page", index.toString());
  window.history.replaceState({}, "", url);

  window.scrollTo({ top: 0 });
};
</script>

<style lang="scss" scoped>
/* pagination 区域 */
.pagination-container {
  margin-top: 10px;

  :deep(li) {
    margin-top: 0;
  }
}

/* 标题 */
.post-title {
  margin-top: 60px;
  margin-bottom: 2px;
  border-top: 0;
  position: relative;

  > a {
    font-family: "SourceHanSerifCN-Bold" !important;
    text-decoration: none !important;
  }

  &:first-child {
    margin-top: 20px;
  }
}

/* 文学灰阶日期 */
.literary-date {
  margin-top: 6px;
  margin-bottom: 14px;

  font-size: 12.5px;
  line-height: 1.4;
  letter-spacing: 0.04em;

  font-family: "mvboli", "SourceHanSerifCN-Regular", serif;
  font-weight: 400;

  color: color-mix(
    in srgb,
    var(--vp-c-text-1) 45%,
    var(--vp-c-bg)
  );

  opacity: 0.9;
  user-select: none;
}

/* 移动端微调 */
@media (max-width: 425px) {
  .literary-date {
    font-size: 12px;
    letter-spacing: 0.03em;
  }
}
</style>
---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="post in curPosts" :key="post.url">
  <div class="post-item">
    <h2 :id="post.title" class="post-title">
      <a :href="post.url">{{ post.title }}</a>
      <a
        class="header-anchor"
        :href="`#${post.title}`"
        :aria-label="`Permalink to &quot;${post.title}&quot;`"
      ></a>
    </h2>
    
    <div class="post-meta">
      <span class="post-date">{{ post.date.string }}</span>
    </div>

    <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
.post-item {
  margin-bottom: 40px;
  padding-bottom: 10px;
}

.post-title {
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  border: none;
  font-size: 26px;
  font-weight: 500;

  > a {
    color: var(--vp-c-text-1);
    text-decoration: none !important;
    /* 使用宋体营造图片中的人文感 */
    font-family: "Source Serif Pro", "Source Han Serif SC", "PT Serif", serif !important;
    
    &:hover {
      color: var(--vp-c-brand);
    }
  }
}

.post-meta {
  margin-bottom: 16px;
  
  .post-date {
    font-size: 14px;
    color: var(--vp-c-text-3); /* 浅灰色 */
    font-family: "Inter", sans-serif;
    letter-spacing: 0.5px;
  }
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.8;
  font-size: 15.5px;
  /* 调整段落间距 */
  :deep(p) {
    margin: 12px 0;
  }
}

.pagination-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--vp-c-divider-light);
  padding-top: 20px;

  :deep(li) {
    margin-top: 0px;
  }
}
</style>

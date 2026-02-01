---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="(post, index) in curPosts" :key="post.url">
  <h1 :id="post.title" class="post-title">
    <a :href="post.url">{{ post.title }}</a>
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
    ></a>
  </h1>

  <div class="post-divider"></div>

  <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>

  <div class="post-date">
    {{ post.date.string }}
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
.post-divider {
  width: 100%;
  height: 2px; 
  background-color: var(--vp-c-text-1);
  margin: 4px 0 14px 0; /* 紧贴上方标题，下方留出间距给摘要 */
}

.post-title {
  margin-top: 28px !important; /* 增加每一项顶部的间距 */
  margin-bottom: 0 !important; 
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

  @media (max-width: 425px) {
    > a {
      font-size: 1.35rem;
    }
  }
}

.post-excerpt {
  margin: 0 0 6px; 
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-1);

  :deep(p) {
    margin: 0;
    font-weight: 400 !important;
  }
}

.post-date {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 400;
  margin-bottom: 12px; 
  letter-spacing: 0.01em;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border-top: 2px solid var(--vp-c-text-1);
  padding-top: 15px;

  :deep(li) {
    margin-top: 0px !important;
  }
}
</style>

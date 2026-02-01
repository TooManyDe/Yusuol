---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="post in curPosts" :key="post.url">
  <div class="post-divider"></div>

  <h2 :id="post.title" class="post-title">
    <a :href="post.url">{{ post.title }}</a>
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
    ></a>
  </h2>

  <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>

  <div class="post-date">
    发表于：{{ post.date.string }}
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

/* ─── 标题 ─── */
.post-title {
  margin-top: 22px !important; 
  margin-bottom: 12px !important;
  border-top: none !important;
  padding-top: 0 !important;
  line-height: 1.3;

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 600 !important; /* 增加字重，更接近原图 */
    font-size: 1.85rem;
    color: var(--vp-c-text-1);
    
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  @media (max-width: 425px) {
    > a {
      font-size: 1.45rem;
    }
  }
}

/* ─── 摘要 ─── */
.post-excerpt {
  margin: 0 0 5px; /* 进一步压缩与时间的间距 */
  font-size: 16px;
  line-height: 1.6;
  color: var(--vp-c-text-1); /* 提高摘要对比度 */

  :deep(p) {
    margin: 0;
    font-weight: 400 !important;
  }
}

/* ─── 发表于 (紧凑型) ─── */
.post-date {
  font-size: 13px;
  color: #888;
  font-weight: 400;
  margin-bottom: 10px; /* 底部预留出与下一道线的空间 */
  letter-spacing: 0.01em;
}

/* 分页容器 */
.pagination-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  border-top: 1.5px solid #333; /* 分页器上方也使用加粗黑线 */
  padding-top: 30px;

  :deep(li) {
    margin-top: 0px !important;
  }
}

.dark .pagination-container {
  border-top-color: var(--vp-c-divider);
}
</style>

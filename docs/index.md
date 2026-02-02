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
  height: 1px; 
  background-color: var(--vp-c-divider);
  /* 增加分割线的上下边距，这是呼吸感的主要来源 */
  margin: 48px 0; 
  opacity: 0.6;
}

.post-title {
  /* 移除强制置顶，给标题上方留一点余地 */
  margin-top: 0 !important; 
  margin-bottom: 16px !important;
  border-top: none !important;
  padding-top: 0 !important;
  line-height: 1.4;

  > a {
    font-family: "Noto Serif SC", "Source Han Serif", serif !important;
    text-decoration: none !important;
    font-weight: 600 !important;
    font-size: 22px; 
    color: var(--vp-c-text-1); /* 使用变量增强适配性 */
    transition: color 0.25s;
    
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  @media (max-width: 425px) {
    > a {
      font-size: 20px;
    }
  }
}

.post-excerpt {
  /* 增加摘要与标题、日期之间的垂直距离 */
  margin: 16px 0 20px; 
  font-size: 16px;
  line-height: 1.8; /* 提高行高，让文字块更通透 */
  color: var(--vp-c-text-2);

  :deep(p) {
    margin: 0;
    font-weight: 400 !important;
  }
}

.post-date {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 400;
  /* 移除底部 margin，由分割线来控制间距 */
  margin-bottom: 0; 
  letter-spacing: 0.02em;
}

.pagination-container {
  /* 显著增加分页符与内容的间距 */
  margin-top: 60px;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;

  :deep(li) {
    margin-top: 0px !important;
  }
}
</style>

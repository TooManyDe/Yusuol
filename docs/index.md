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
      <span class="meta-separator">/</span>
      <span class="post-category">文章</span> </div>

    <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>
    
    <a :href="post.url" class="read-more">READ MORE...</a>
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
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-divider-light);
  
  &:last-child {
    border-bottom: none;
  }
}

.post-title {
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  border: none;
  font-size: 24px;
  font-weight: 500;

  > a {
    color: var(--vp-c-text-1);
    text-decoration: none !important;
    font-family: "Source Serif Pro", "Source Han Serif SC", serif !important;
    transition: color 0.2s;
    
    &:hover {
      color: var(--vp-c-brand);
    }
  }
}

/* 参考图片：元数据样式（日期/分类） */
.post-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #999; // 较浅的灰色
  margin-bottom: 16px;

  .meta-separator {
    color: #eee;
    font-weight: 200;
  }
  
  .post-category {
    color: var(--vp-c-brand); // 分类显示为主题色，参考图片中的绿色
    opacity: 0.8;
  }
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  font-size: 15px;
  margin-bottom: 12px;
}

.read-more {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
}

.pagination-container {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  :deep(li) { margin-top: 0px; }
}
</style>

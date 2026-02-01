---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="post in curPosts" :key="post.url">
  <div class="article-card">
    <h2 :id="post.title" class="article-title">
      <a :href="post.url">{{ post.title }}</a>
      <a
        class="header-anchor"
        :href="`#${post.title}`"
        :aria-label="`Permalink to &quot;${post.title}&quot;`"
      ></a>
    </h2>

    <div v-if="post.excerpt" class="article-excerpt" v-html="post.excerpt"></div>

    <div class="article-footer">
      发表时间：{{ post.date.string }}
    </div>
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
} from "tdesign-vue-next";

import { data as posts } from "./.vitepress/theme/posts.data.mts";
import { isMobile } from "./.vitepress/theme/utils/mobile.ts";

const route = useRoute();
const router = useRouter();

const getPage = () => {
  const search = route.query
  const searchParams = new URLSearchParams(search);
  return Number(searchParams.get("page") || "1");
}

const current = ref(getPage())
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

const onCurrentChange = (index) => {
        const url = new URL(window.location as any);
        url.searchParams.set("page", index.toString());
        window.history.replaceState({}, "", url);
        window.scrollTo({ top: 0, behavior: 'auto' });
};
</script>

<style lang="scss" scoped>
.article-card {
  margin: 3rem 0;
  padding: 1.8rem 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  transition: border-color 0.3s ease;

  &:first-of-type {
    margin-top: 1.5rem;
  }
}

.article-title {
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
  line-height: 1.35;

  a {
    font-family: "Noto Serif SC", serif !important;
    font-size: 28px !important;
    font-weight: 800 !important;
    color: var(--vp-c-text-1) !important;
    text-decoration: none !important;
    
    &:hover {
      color: var(--vp-c-brand-1) !important;
    }
  }
}

.article-excerpt {
  margin-top: 1.2rem;
  font-family: "PingFang", var(--vp-font-family-serif);
  font-size: 17px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  opacity: 0.85;

  :deep(p) {
    margin: 0;
  }
}

.article-footer {
  margin-top: 1.5rem;
  font-family: "PingFang", sans-serif;
  font-size: 14px;
  color: #999;
}

.pagination-container {
  margin-top: 40px;
  display: flex;
  justify-content: center;

  :deep(li) {
    margin-top: 0px !important;
  }
}

@media (max-width: 768px) {
  .article-title a {
    font-size: 22px !important;
  }
  .article-excerpt {
    font-size: 15px;
    line-height: 1.6;
  }
  .article-card {
    margin: 2rem 0;
    padding: 1.2rem 0;
  }
}
</style>

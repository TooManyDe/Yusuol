---
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
      >#</a
    >
  </h2>
  <div class="post-meta">
    <span class="post-date">{{ post.date.string }}</span>
    <span v-for="tag in post.frontmatter.tags" :key="tag" class="post-tag">
      <a :href="`/tags/?tag=${tag}`">#{{ tag }}</a>
    </span>
  </div>
  <div v-if="post.excerpt" v-html="post.excerpt"></div>
  <div class="read-more">
    <a :href="post.url">READ MORE...</a>
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
        MessagePlugin,
        PaginationProps,
        Pagination as TPagination,
} from "tdesign-vue-next";

import { data as posts } from "./.vitepress/theme/posts.data.mts";
import { isMobile } from "./.vitepress/theme/utils/mobile.ts";

const route = useRoute();

const getPage = () => {
  const search = route.query
  const searchParams = new URLSearchParams(search);
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

const onCurrentChange: PaginationProps["onCurrentChange"] = (
        index,
        pageInfo
) => {
        const url = new URL(window.location as any);
        url.searchParams.set("page", index.toString());
        window.history.replaceState({}, "", url);
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

.mr-2 {
  margin-right: 2px;
}

.post-title {
  margin-top: 40px;
  margin-bottom: 0;
}

.post-title a {
  font-weight: bold;
}

.post-meta {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-top: 5px;
  margin-bottom: 15px;
}

.post-tag {
  margin-left: 10px;
}

.post-tag a {
  color: var(--vp-c-brand-1);
}

.read-more {
  margin-top: 10px;
  font-weight: bold;
}

.read-more a {
  color: var(--vp-c-brand-1);
}
</style>

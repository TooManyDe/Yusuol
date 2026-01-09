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
    <div class="post-date hollow-text source-han-serif">{{ post.date.string }}</div>
    
    <a :href="post.url">{{ post.title }}</a>
    <a
      class="header-anchor"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
    ></a>
  </h2>
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
        Pagination as TPagination,
        type PaginationProps,
} from "tdesign-vue-next";

import { data as posts } from "./.vitepress/theme/posts.data.mts";
import { isMobile } from "./.vitepress/theme/utils/mobile.ts";

const route = useRoute();
const router = useRouter();

const getPage = () => {
  const search = route.query
  const searchParams = new URLSearchParams(search as any);
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

const onCurrentChange: PaginationProps["onCurrentChange"] = (index) => {
        const url = new URL(window.location as any);
        url.searchParams.set("page", index.toString());
        window.history.replaceState({}, "", url);
        window.scrollTo({ top: 0 });
};
</script>

<style lang="scss" scoped>
.pagination-container {
        margin-top: 10px;
        :deep(li) { margin-top: 0px; }
}

.post-title {
        margin-bottom: 0px;
        margin-top: 50px; /* 适当调小顶部距离 */
        border-top: 0px;
        display: flex;
        flex-direction: column; /* 纵向排列：日期在上，标题在下 */
        align-items: flex-start;

        > a {
            font-family: "Noto Serif SC" !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            line-height: 1.4;
            margin-top: -10px; /* 让标题往上提一点，靠近日期背景 */
            position: relative;
            z-index: 2;
        }

        .post-date {
                /* 关键：取消绝对定位，使其按文档流排列 */
                position: static; 
                opacity: .16;
                font-family: "mvboli";
                font-size: 44px;
                font-weight: 400;
                line-height: 1;
                margin-left: -8px;
                user-select: none;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 425px) {
                .post-date {
                        font-size: 36px !important;
                }
                margin-top: 30px;
        }

        &:first-child {
                margin-top: 10px;
        }
}

.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>

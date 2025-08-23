---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<!-- 之所以将代码写在 md 里面，而非单独封装为 Vue 组件，因为 aside 不会动态刷新，参考 https://github.com/vuejs/vitepress/issues/2686 -->
<template v-for="post in curPosts" :key="post.url">
  <!-- 在外层包裹一个卡片容器 -->
  <div class="post-card-wrapper">
    <h2 :id="post.title" class="post-title">
      <a :href="post.url">{{ post.title }}</a>
      <a
        class="header-anchor"
        :href="`#${post.title}`"
        :aria-label="`Permalink to &quot;${post.title}&quot;`"
      ></a>
      <div class="post-date hollow-text source-han-serif">{{ post.date.string }}</div>
    </h2>
    <div v-if="post.excerpt" v-html="post.excerpt"></div>
  </div>
</template>

<!-- 分页 -->
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
import { PaginationProps } from "tdesign-vue-next";
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
/* 卡片容器，仅增加阴影和圆角，保留原有布局 */
.post-card-wrapper {
  padding: 1em 1.2em;
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
}

/* 保留原有的标题样式 */
.post-title {
  margin-bottom: 6px;
  margin-top: 60px;
  border-top: 0px;
  position: relative;
  top: 0;
  left: 0;

  > a {
    font-weight: 400;
  }

  .post-date {
    position: absolute;
    top: 15px;
    left: -10px;
    z-index: -1;
    opacity: 0.16;
    font-family: "mvboli";
    font-size: 40px;
    font-weight: 400;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 425px) {
    .post-date {
      font-size: 40px !important;
    }
  }

  &:first-child {
    margin-top: 20px;
  }
}

.hollow-text {
  color: var(--vp-c-bg);
  -webkit-text-stroke: 1px var(--vp-c-text-1);
}

.pagination-container {
  margin-top: 10px;

  :deep(li) {
    margin-top: 0px;
  }
}
</style>
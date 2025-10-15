<template>
  <div class="comments" v-if="!frontmatter.isNoComment">
    <details class="comment-details" :open="loadComments" @toggle="handleToggle">
      <summary class="comment-summary">
        <span class="summary-text">评论 / Comments</span>
        <span class="summary-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </summary>

      <div class="comment-content">
        <Giscus
          v-if="loadComments && showComment"
          :key="`${term}-${lang}-${isDark}`"
          repo="Yusuol/Yusuol"
          repo-id="R_kgDOOmIADw"
          category="Announcements"
          category-id="DIC_kwDOOmIAD84Cp583"
          mapping="title"
          :term="term"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          :theme="isDark ? 'dark' : 'light'"
          :lang="lang"
          loading="lazy"
          crossorigin="anonymous"
        />
      </div>
    </details>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, computed } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus from "@giscus/vue";

const route = useRoute();
const { isDark, frontmatter } = useData();

const term = computed(() =>
  route.path.startsWith("/en") ? route.path.slice(3) : route.path
);
const lang = computed(() =>
  route.path.startsWith("/en") ? "en" : "zh-Hans"
);

const loadComments = ref(false);
const showComment = ref(false);

// 处理 details 的 toggle 事件
const handleToggle = (e: Event) => {
  const isOpen = (e.target as HTMLDetailsElement).open;
  
  if (isOpen) {
    // 展开时加载评论
    loadComments.value = true;
    nextTick(() => {
      showComment.value = true;
    });
  } else {
    // 收起时隐藏评论
    showComment.value = false;
  }
};

// 监听路径/语言/主题变化,重新加载 Giscus
watch(
  () => [route.path, lang.value, isDark.value],
  () => {
    if (loadComments.value && showComment.value) {
      showComment.value = false;
      nextTick(() => {
        showComment.value = true;
      });
    }
  }
);
</script>

<style scoped lang="scss">
.comments {
  margin-top: 24px;
}

.comment-details {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--vp-c-brand-1);
  }

  &[open] {
    padding-bottom: 16px;

    .summary-icon svg {
      transform: rotate(180deg);
    }
  }
}

.comment-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
  list-style: none;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  font-family: 'ChillRoundF', sans-serif;
  transition: color 0.2s ease;

  &::-webkit-details-marker,
  &::marker {
    display: none;
  }

  &:hover {
    color: var(--vp-c-brand-2);

    .summary-icon {
      color: var(--vp-c-brand-2);
    }
  }
}

.summary-text {
  font-size: 16px;
}

.summary-icon {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
  transition: transform 0.3s ease, color 0.2s ease;

  svg {
    transition: transform 0.3s ease;
  }
}

.comment-content {
  padding: 0 16px;
  margin-top: 8px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 暗色模式优化
.dark {
  .comment-details {
    background-color: var(--vp-c-bg-soft);
  }
}
</style>

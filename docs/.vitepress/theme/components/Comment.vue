<template>
  <div class="comments" v-if="!frontmatter.isNoComment">
    <div class="comments-header">
      <span
        class="comment-toggle"
        @click="toggleComments"
      >
        <svg class="comment-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="comment-text">{{ commentText }}</span>
      </span>
    </div>

    <Giscus
      v-if="loadComments && showComment"
      :key="`${term}-${lang}-${isDark}`"
      repo="Yusuol/Yusuol"
      repo-id="R_kgDOOmIADw"
      category="Announcements"
      category-id="DIC_kwDOOmIAD84Cp583"
      mapping="specific"
      :term="term"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      :theme="isDark ? 'dark' : 'light'"
      :lang="lang"
      loading="lazy"
      crossorigin="anonymous"
      class="giscus-wrapper"
    />
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

const commentText = computed(() =>
  lang.value === "en" ? "💬 Comment" : "💬 评论"
);

const loadComments = ref(false);
const showComment = ref(true);

const toggleComments = () => {
  if (loadComments.value) {
    showComment.value = false;
    loadComments.value = false;
  } else {
    loadComments.value = true;
    nextTick(() => {
      showComment.value = true;
    });
  }
};

watch(
  () => [route.path, lang.value, isDark.value],
  () => {
    if (loadComments.value) {
      showComment.value = false;
      nextTick(() => {
        showComment.value = true;
      });
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.comments {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.comments-header {
  margin-bottom: 1.5rem;
}

.comment-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 16px;
  background: linear-gradient(135deg, #09b83e 0%, #08a72f 100%);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Noto Serif SC', serif;
  user-select: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(9, 184, 62, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(9, 184, 62, 0.25);
    background: linear-gradient(135deg, #08a72f 0%, #076b23 100%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(9, 184, 62, 0.15);
  }
}

.comment-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
}

.comment-text {
  letter-spacing: 0.5px;
}
</style>

<style lang="scss">
/* 微信风格的 Giscus 样式 */
.giscus-wrapper {
  .giscus {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    color-scheme: light;
  }

  .giscus-frame {
    background: transparent !important;
    border: none !important;
    border-radius: 8px !important;
  }

  .giscus-frame body {
    background: transparent !important;
    color: #333 !important;
    font-size: 15px;
  }

  /* 评论标题 */
  .giscus-frame h1,
  .giscus-frame h2 {
    color: #333 !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    margin-bottom: 1rem !important;
  }

  /* 输入框容器 */
  .timeline-comment-wrapper {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #e8e8e8;
  }

  /* 输入框 */
  .comment-form-textarea {
    background: #ffffff !important;
    border: 1px solid #ddd !important;
    border-radius: 6px !important;
    padding: 10px 12px !important;
    font-size: 14px !important;
    color: #333 !important;
    font-family: inherit !important;
    resize: vertical !important;
    transition: all 0.2s !important;
  }

  .comment-form-textarea::placeholder {
    color: #999 !important;
  }

  .comment-form-textarea:focus {
    background: #ffffff !important;
    border-color: #09b83e !important;
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(9, 184, 62, 0.1) !important;
  }

  /* 提交按钮 */
  .giscus-frame button[type='submit'] {
    background: #09b83e !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 4px !important;
    padding: 8px 16px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
  }

  .giscus-frame button[type='submit']:hover {
    background: #08a72f !important;
  }

  .giscus-frame button[type='submit']:active {
    background: #076b23 !important;
  }

  /* 评论项 */
  .timeline-comment {
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    padding: 12px;
    margin-bottom: 12px;
    transition: all 0.2s;
  }

  .timeline-comment:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    border-color: #d5d5d5;
  }

  /* 用户头像 */
  .timeline-comment-avatar {
    width: 36px !important;
    height: 36px !important;
    border-radius: 50% !important;
    border: 2px solid #f0f0f0 !important;
  }

  /* 用户名 */
  .timeline-comment .user-select-contain a {
    color: #09b83e !important;
    text-decoration: none !important;
    font-weight: 500;
  }

  .timeline-comment .user-select-contain a:hover {
    color: #08a72f !important;
  }

  /* 时间戳 */
  .timeline-comment-header-text {
    color: #999 !important;
    font-size: 13px !important;
  }

  /* 评论内容 */
  .comment-content {
    color: #333 !important;
    font-size: 14px !important;
    line-height: 1.6 !important;
    word-wrap: break-word;
  }

  .comment-content p {
    margin: 0.5em 0 !important;

    &:first-child {
      margin-top: 0 !important;
    }

    &:last-child {
      margin-bottom: 0 !important;
    }
  }

  /* 代码 */
  .comment-content code {
    background: #f2f2f2 !important;
    color: #d63384 !important;
    padding: 2px 6px !important;
    border-radius: 3px !important;
    font-size: 13px !important;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace !important;
  }

  .comment-content pre {
    background: #f7f7f7 !important;
    border: 1px solid #e8e8e8 !important;
    border-radius: 6px !important;
    padding: 12px !important;
    overflow-x: auto !important;
    font-size: 13px !important;
    margin: 0.5em 0 !important;
  }

  .comment-content pre code {
    background: transparent !important;
    color: #333 !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }

  /* 链接 */
  .comment-content a {
    color: #09b83e !important;
    text-decoration: none !important;
    word-break: break-all;
  }

  .comment-content a:hover {
    text-decoration: underline !important;
  }

  /* 引用 */
  .comment-content blockquote {
    border-left: 3px solid #09b83e !important;
    padding-left: 12px !important;
    margin-left: 0 !important;
    margin-bottom: 0.5em !important;
    color: #666 !important;
    font-style: italic;
  }

  /* 列表 */
  .comment-content ul,
  .comment-content ol {
    margin: 0.5em 0 !important;
    padding-left: 24px !important;
  }

  .comment-content li {
    margin: 4px 0 !important;
  }

  /* 反应按钮 */
  .reaction {
    background: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 4px 8px;
    margin-right: 4px;
    margin-bottom: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
  }

  .reaction:hover {
    background: #efefef;
    border-color: #ccc;
  }

  .reaction.has-reacted {
    background: rgba(9, 184, 62, 0.1);
    border-color: #09b83e;
    color: #09b83e;
  }

  /* 分割线 */
  .timeline-item {
    padding: 0 !important;
  }

  .TimelineItem-body::before {
    background: transparent !important;
  }

  /* 暗黑模式 */
  @media (prefers-color-scheme: dark) {
    .giscus {
      color-scheme: dark;
    }

    .giscus-frame body {
      background: transparent !important;
      color: #e0e0e0 !important;
    }

    .giscus-frame h1,
    .giscus-frame h2 {
      color: #e0e0e0 !important;
    }

    .timeline-comment-wrapper {
      background: #2a2a2a;
      border-color: #404040;
    }

    .comment-form-textarea {
      background: #1e1e1e !important;
      border-color: #404040 !important;
      color: #e0e0e0 !important;
    }

    .comment-form-textarea::placeholder {
      color: #666 !important;
    }

    .timeline-comment {
      background: #2a2a2a;
      border-color: #404040;
    }

    .timeline-comment:hover {
      border-color: #505050;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    }

    .timeline-comment-avatar {
      border-color: #404040 !important;
    }

    .comment-content {
      color: #e0e0e0 !important;
    }

    .comment-content code {
      background: #1e1e1e !important;
      color: #ff7875 !important;
    }

    .comment-content pre {
      background: #1e1e1e !important;
      border-color: #404040 !important;
    }

    .comment-content blockquote {
      color: #999 !important;
    }

    .reaction {
      background: #404040;
      border-color: #505050;
      color: #b0b0b0;
    }

    .reaction:hover {
      background: #505050;
      border-color: #606060;
    }

    .reaction.has-reacted {
      background: rgba(9, 184, 62, 0.15);
      border-color: #09b83e;
      color: #09b83e;
    }

    .timeline-comment-header-text {
      color: #666 !important;
    }
  }

  /* 响应式 */
  @media (max-width: 768px) {
    .timeline-comment {
      padding: 10px;
    }

    .comment-content {
      font-size: 13px !important;
    }

    .comment-form-textarea {
      font-size: 16px !important;
    }
  }
}
</style>
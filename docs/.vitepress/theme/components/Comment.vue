<template>
  <div class="comments" v-if="!frontmatter.isNoComment">
    <span
      class="comment-toggle"
      @click="toggleComments"
      style="color: #41b349; font-family: 'Noto Serif SC'; font-weight: 600;"
    >
      {{ loadComments ? commentText : commentText }}
    </span>

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
  lang.value === "en" ? "Comment" : "评论"
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
  margin-top: 0px;
}

.comment-toggle {
  display: inline-block;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
}
</style>

<style lang="scss">
/* ==================== 微信风格 Giscus 样式 ==================== */

/* 基础容器 */
.giscus {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif !important;
}

.giscus-frame {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
}

/* ==================== 标题区域 ==================== */
.giscus-frame .Box-row {
  padding: 0 !important;
  border-bottom: none !important;
  margin-bottom: 1.5rem !important;
}

.giscus-frame h1 {
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #333 !important;
  margin: 0 !important;
}

/* ==================== 评论输入框 ==================== */
.timeline-comment-wrapper {
  background: #f7f7f7 !important;
  border: 1px solid #e8e8e8 !important;
  border-radius: 8px !important;
  padding: 12px !important;
  margin-bottom: 16px !important;
  margin-top: 0 !important;
}

.comment-form-textarea {
  background: #ffffff !important;
  border: 1px solid #ddd !important;
  border-radius: 6px !important;
  padding: 10px 12px !important;
  font-size: 14px !important;
  color: #333 !important;
  font-family: inherit !important;
  resize: vertical !important;
  transition: all 0.2s ease !important;
  line-height: 1.5 !important;

  &::placeholder {
    color: #999 !important;
  }

  &:focus {
    background: #ffffff !important;
    border-color: #09b83e !important;
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(9, 184, 62, 0.1) !important;
  }
}

/* 登录提示 */
.timeline-comment-wrapper-inline {
  background: transparent !important;
  padding: 0 !important;
}

/* ==================== 提交按钮 ==================== */
.giscus-frame button[type='submit'] {
  background: #09b83e !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 8px 16px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: #08a72f !important;
  }

  &:active {
    background: #076b23 !important;
  }
}

/* ==================== 评论列表 ==================== */
.timeline {
  padding: 0 !important;
}

.timeline-comment {
  background: #ffffff !important;
  border: 1px solid #e8e8e8 !important;
  border-radius: 8px !important;
  padding: 12px !important;
  margin-bottom: 12px !important;
  transition: all 0.2s ease !important;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08) !important;
    border-color: #d5d5d5 !important;
  }
}

/* ==================== 用户信息区 ==================== */
.timeline-comment-header {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 8px !important;
}

/* 用户头像 */
.timeline-comment-avatar {
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  border: 2px solid #f0f0f0 !important;
  flex-shrink: 0 !important;
}

/* 用户名和时间容器 */
.comment-header {
  flex: 1 !important;
}

.timeline-comment .user-select-contain a {
  color: #09b83e !important;
  text-decoration: none !important;
  font-weight: 500 !important;

  &:hover {
    color: #08a72f !important;
  }
}

/* 时间戳 */
.timeline-comment-header-text {
  color: #999 !important;
  font-size: 13px !important;
  margin-left: 0 !important;
}

/* 评论操作按钮 */
.timeline-comment-actions {
  display: flex !important;
  gap: 4px !important;

  button {
    color: #999 !important;
    border: none !important;
    background: transparent !important;
    cursor: pointer !important;
    font-size: 13px !important;
    padding: 4px 8px !important;
    border-radius: 4px !important;
    transition: all 0.2s ease !important;

    &:hover {
      color: #09b83e !important;
      background: rgba(9, 184, 62, 0.05) !important;
    }
  }
}

/* ==================== 评论内容 ==================== */
.comment-content {
  color: #333 !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  word-wrap: break-word !important;

  p {
    margin: 0.5em 0 !important;

    &:first-child {
      margin-top: 0 !important;
    }

    &:last-child {
      margin-bottom: 0 !important;
    }
  }

  /* 代码片段 */
  code {
    background: #f2f2f2 !important;
    color: #d63384 !important;
    padding: 2px 6px !important;
    border-radius: 3px !important;
    font-size: 13px !important;
    font-family: 'SFMono-Regular', 'Monaco', 'Menlo', 'Courier New', monospace !important;
  }

  /* 代码块 */
  pre {
    background: #f7f7f7 !important;
    border: 1px solid #e8e8e8 !important;
    border-radius: 6px !important;
    padding: 12px !important;
    overflow-x: auto !important;
    font-size: 13px !important;
    margin: 0.5em 0 !important;

    code {
      background: transparent !important;
      color: #333 !important;
      padding: 0 !important;
      border-radius: 0 !important;
    }
  }

  /* 链接 */
  a {
    color: #09b83e !important;
    text-decoration: none !important;
    word-break: break-all !important;

    &:hover {
      text-decoration: underline !important;
    }
  }

  /* 引用块 */
  blockquote {
    border-left: 3px solid #09b83e !important;
    padding-left: 12px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-bottom: 0.5em !important;
    color: #666 !important;
    font-style: italic !important;
  }

  /* 列表 */
  ul,
  ol {
    margin: 0.5em 0 !important;
    padding-left: 24px !important;
  }

  li {
    margin: 4px 0 !important;
  }

  /* 表格 */
  table {
    border-collapse: collapse !important;
    width: 100% !important;
    margin: 0.5em 0 !important;

    td,
    th {
      border: 1px solid #ddd !important;
      padding: 8px 12px !important;
    }

    th {
      background: #f7f7f7 !important;
      font-weight: 600 !important;
    }
  }

  /* 图片 */
  img {
    max-width: 100% !important;
    border-radius: 6px !important;
    margin: 0.5em 0 !important;
  }
}

/* ==================== 反应按钮（Reactions） ==================== */
.reaction {
  background: #f7f7f7 !important;
  border: 1px solid #ddd !important;
  border-radius: 12px !important;
  padding: 4px 8px !important;
  margin-right: 4px !important;
  margin-bottom: 4px !important;
  font-size: 12px !important;
  color: #666 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: inline-block !important;

  &:hover {
    background: #efefef !important;
    border-color: #ccc !important;
  }

  &.has-reacted {
    background: rgba(9, 184, 62, 0.1) !important;
    border-color: #09b83e !important;
    color: #09b83e !important;
    font-weight: 500 !important;
  }
}

/* ==================== 其他元素 ==================== */
.timeline {
  padding-left: 0 !important;

  .TimelineItem {
    padding-left: 0 !important;

    .TimelineItem-badge {
      display: none !important;
    }

    .TimelineItem-body {
      padding-left: 0 !important;

      &::before {
        display: none !important;
      }
    }
  }
}

/* 分页 */
.paginate-container {
  margin-top: 1.5rem !important;
  padding-top: 1.5rem !important;
  border-top: 1px solid #e8e8e8 !important;
}

.paginate-container button {
  background: #09b83e !important;
  color: white !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 8px 16px !important;
  cursor: pointer !important;

  &:hover {
    background: #08a72f !important;
  }
}

/* ==================== 暗黑模式 ==================== */
@media (prefers-color-scheme: dark) {
  .giscus-frame {
    background: transparent !important;

    body {
      background: transparent !important;
      color: #e0e0e0 !important;
    }

    h1 {
      color: #e0e0e0 !important;
    }
  }

  .timeline-comment-wrapper {
    background: #2a2a2a !important;
    border-color: #404040 !important;
  }

  .comment-form-textarea {
    background: #1e1e1e !important;
    border-color: #404040 !important;
    color: #e0e0e0 !important;

    &::placeholder {
      color: #666 !important;
    }

    &:focus {
      border-color: #09b83e !important;
      box-shadow: 0 0 0 2px rgba(9, 184, 62, 0.15) !important;
    }
  }

  .timeline-comment {
    background: #2a2a2a !important;
    border-color: #404040 !important;

    &:hover {
      border-color: #505050 !important;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3) !important;
    }
  }

  .timeline-comment-avatar {
    border-color: #404040 !important;
  }

  .comment-content {
    color: #e0e0e0 !important;

    code {
      background: #1e1e1e !important;
      color: #ff7875 !important;
    }

    pre {
      background: #1e1e1e !important;
      border-color: #404040 !important;

      code {
        color: #a0d5f7 !important;
      }
    }

    blockquote {
      color: #999 !important;
      border-left-color: #09b83e !important;
    }

    a {
      color: #09b83e !important;
    }

    table {
      td,
      th {
        border-color: #404040 !important;
      }

      th {
        background: #1e1e1e !important;
      }
    }
  }

  .reaction {
    background: #404040 !important;
    border-color: #505050 !important;
    color: #b0b0b0 !important;

    &:hover {
      background: #505050 !important;
      border-color: #606060 !important;
    }

    &.has-reacted {
      background: rgba(9, 184, 62, 0.15) !important;
      border-color: #09b83e !important;
      color: #09b83e !important;
    }
  }

  .timeline-comment-header-text {
    color: #666 !important;
  }

  .timeline-comment-actions button {
    color: #666 !important;

    &:hover {
      color: #09b83e !important;
      background: rgba(9, 184, 62, 0.1) !important;
    }
  }

  .paginate-container {
    border-top-color: #404040 !important;
  }
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .timeline-comment {
    padding: 10px !important;
  }

  .comment-content {
    font-size: 13px !important;
  }

  .comment-form-textarea {
    font-size: 16px !important;
  }

  .timeline-comment-avatar {
    width: 32px !important;
    height: 32px !important;
  }
}
</style>
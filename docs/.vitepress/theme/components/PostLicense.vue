<script setup lang="ts">
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const site = 'https://ddbx.org'
const author = '的的' // 固定作者名

const isPost = route.path.startsWith('/posts/')

const title = frontmatter.value.title
const date = frontmatter.value.date
const license = frontmatter.value.license || 'CC BY-NC-SA 4.0'

// 拼接完整 URL
const url = site + route.path
</script>

<template>
  <div class="post-license">
    <div class="license-title">
      {{ title }}
    </div>

    <a class="license-url" :href="url" target="_blank">
      {{ url }}
    </a>

    <div class="license-meta">
      <div class="meta-item">
        <div class="meta-label">作者</div>
        <div class="meta-value">{{ author }}</div>
      </div>

      <div class="meta-item">
        <div class="meta-label">发布于</div>
        <div class="meta-value">{{ date }}</div>
      </div>

      <div class="meta-item">
        <div class="meta-label">许可协议</div>
        <div class="meta-value license-type">{{ license }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-license {
  margin-top: 36px;
  padding: 24px 32px;
  border-radius: 16px;
  background: #f6f7f8;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.03);
}

/* 标题样式 */
.license-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

/* 链接样式 */
.license-url {
  display: inline-block;
  font-size: 15px;
  color: #2ea7ad; /* 匹配图中的青绿色 */
  text-decoration: none;
  margin-bottom: 20px;
  word-break: break-all;
  line-height: 1.4;
}

.license-url:hover {
  text-decoration: underline;
}

/* 三列布局 */
.license-meta {
  display: flex;
  gap: 48px; /* 列间距 */
}

.meta-label {
  font-size: 13px;
  color: #999; /* 浅灰色标签 */
  margin-bottom: 4px;
}

.meta-value {
  font-size: 15px;
  color: #444;
  font-weight: 500;
}

/* 协议高亮色 */
.license-type {
  color: #2ea7ad;
}

/* CC 水印背景 */
.post-license::after {
  content: "CC";
  position: absolute;
  /* 调整位置使其像图片中一样居中偏右 */
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 180px;
  font-weight: 800;
  color: #000;
  opacity: 0.03;
  pointer-events: none;
  font-family: sans-serif;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .license-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
</style>

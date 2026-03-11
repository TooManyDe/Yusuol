<script setup lang="ts">
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const site = 'https://ddbx.org'
const author = '的的'

const isPost = route.path.startsWith('/posts/')

const title = frontmatter.value.title
const date = frontmatter.value.date
const license = frontmatter.value.license || 'CC BY-NC-SA 4.0'

const url = site + route.path
</script>

<template>
  <div class="post-license">
    <div class="license-title">{{ title }}</div>

    <a class="license-url" :href="url" target="_blank">{{ url }}</a>

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
  margin-top: 24px;
  padding: 20px 24px;
  border-radius: 12px;
  background: #f4f6f8;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.04);
  max-width: 560px;        /* 限制最大宽度，不撑满整页 */
}

.license-title {
  font-size: 16px;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 6px;
  line-height: 1.4;
}

.license-url {
  display: block;
  font-size: 14px;
  color: #2ea7ad;
  text-decoration: none;
  margin-bottom: 16px;
  word-break: break-all;
  line-height: 1.5;
}

.license-url:hover {
  text-decoration: underline;
}

.license-meta {
  display: flex;
  gap: 36px;
}

.meta-label {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 3px;
}

.meta-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.license-type {
  color: #2ea7ad;
}

/* CC 水印 */
.post-license::after {
  content: "CC";
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 140px;
  font-weight: 900;
  color: #000;
  opacity: 0.04;
  pointer-events: none;
  font-family: sans-serif;
  line-height: 1;
}

@media (max-width: 640px) {
  .post-license {
    max-width: 100%;
    padding: 16px 18px;
  }

  .license-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}
</style>
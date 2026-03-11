<script setup lang="ts">
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const site = 'https://ddbx.org'

const isPost = route.path.startsWith('/posts/')

const title = frontmatter.value.title
const date = frontmatter.value.date
const license = frontmatter.value.license || 'CC BY-NC-ND 4.0'

const url = site + route.path
</script>

<template>
  <div class="post-license">
    <div class="license-title">
      {{ title }}
    </div>

    <a class="license-url" :href="url">
      {{ url }}
    </a>

    <div class="license-meta">
      <div>
        <div class="label">发布于</div>
        <div>{{ date }}</div>
      </div>

      <div>
        <div class="label">许可协议</div>
        <div class="license">{{ license }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-license{
  margin-top:36px;
  padding:20px 24px;
  border-radius:16px;
  background:#f6f7f8;
  position:relative;
  overflow:hidden;
}

/* 标题 */

.license-title{
  font-size:22px;
  font-weight:600;
  margin-bottom:6px;
}

/* 链接 */

.license-url{
  display:block;
  font-size:16px;
  color:#41b349;
  text-decoration:none;
  margin-bottom:18px;
  word-break:break-all;
}

.license-url:hover{
  text-decoration:underline;
}

/* 两列布局 */

.license-meta{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:40px;
}

.meta-label{
  font-size:13px;
  color:#999;
  margin-bottom:4px;
}

.meta-value{
  font-size:16px;
  color:#222;
}

.license{
  color:#41b349;
}

/* CC 水印 */

.post-license::after{
  content:"CC";
  position:absolute;
  right:-40px;
  top:-40px;
  font-size:260px;
  font-weight:700;
  color:#000;
  opacity:0.035;
  pointer-events:none;
}
</style>
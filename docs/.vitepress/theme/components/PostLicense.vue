<script setup lang="ts">
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const site = 'https://ddbx.org'

const isPost = route.path.startsWith('/posts/')

const title = frontmatter.value.title
const author = frontmatter.value.author || '的的'
const date = frontmatter.value.date
const license = frontmatter.value.license || 'CC BY-NC-SA 4.0'

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
        <div class="label">作者</div>
        <div>{{ author }}</div>
      </div>

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
  margin-top:48px;
  padding:28px 32px;
  border-radius:18px;
  background:#f6f7f8;
  position:relative;
  overflow:hidden;
}

/* 标题 */

.license-title{
  font-size:26px;
  font-weight:600;
  margin-bottom:8px;
}

/* 文章链接 */

.license-url{
  display:block;
  font-size:18px;
  color:#41b349;
  text-decoration:none;
  margin-bottom:26px;
  word-break:break-all;
}

.license-url:hover{
  text-decoration:underline;
}

/* 三列布局 */

.license-meta{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:32px;
}

.meta-label{
  font-size:14px;
  color:#999;
  margin-bottom:6px;
}

.meta-value{
  font-size:18px;
  color:#222;
}

/* 协议颜色 */

.license{
  color:#41b349;
  font-weight:500;
}

/* CC 背景水印 */

.post-license::after{
  content:"CC";
  position:absolute;
  right:-20px;
  top:-40px;
  font-size:220px;
  font-weight:700;
  color:#000;
  opacity:0.04;
  pointer-events:none;
}
</style>
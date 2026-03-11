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
  margin-top:40px;
  padding:24px;
  border-radius:16px;
  background:#f6f7f8;
  position:relative;
}

.license-title{
  font-size:22px;
  font-weight:600;
}

.license-url{
  display:block;
  margin-top:8px;
  color:#18a0ae;
  text-decoration:none;
}

.license-meta{
  display:flex;
  gap:40px;
  margin-top:20px;
}

.label{
  font-size:14px;
  color:#888;
}

.license{
  color:#18a0ae;
}

.post-license::after{
  content:"CC";
  position:absolute;
  right:30px;
  top:10px;
  font-size:140px;
  opacity:.05;
  font-weight:700;
}
</style>
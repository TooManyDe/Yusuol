<!-- .vitepress/theme/components/CopyrightCard.vue -->
<template>
  <div class="copyright-card">
    <div class="title">{{ title }}</div>
    <a :href="url" target="_blank">{{ url }}</a>
    <div class="meta">
      <span>作者</span> <strong>{{ author }}</strong>
      <span>发表于</span> <strong>{{ date }}</strong>
      <span>许可协议</span> 
      <a :href="licenseUrl" target="_blank">{{ license }}</a>
    </div>
    <div class="cc-bg">CC</div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  url: String,
  author: String,
  date: String,
  license: String,
  licenseUrl: String
})
</script>

<style scoped>
.copyright-card {
  position: relative;
  margin-top: 2em;
  padding: 1.2em 1.5em;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-size: 14px;
}
.title {
  font-weight: bold;
  font-size: 16px;
}
a {
  color: #3b82f6;
  text-decoration: none;
}
.meta {
  margin-top: 6px;
  color: #555;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.cc-bg {
  position: absolute;
  right: 12px;
  bottom: 8px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(0,0,0,0.05);
  user-select: none;
}
</style>
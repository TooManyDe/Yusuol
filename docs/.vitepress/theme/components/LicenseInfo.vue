<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import { licenseConfig } from "./LicenseConfig";

const { page, frontmatter } = useData();

// 支持在 frontmatter 中单独控制是否显示许可证
const showLicense = computed(() => {
  if (frontmatter.value.license === false) return false;
  return licenseConfig.enable;
});

const pageUrl = computed(() => {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return "";
});

const pageTitle = computed(() => page.value.title);
</script>

<template>
  <div v-if="showLicense" class="license-wrapper">
    <div class="license-card">
      <!-- 左侧图标区 -->
      <div class="license-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5C14.5 10.5 13.9 11.36 13 11.78V13H11V11C11 10.45 11.45 10 12 10C12.55 10 13 9.55 13 9C13 8.45 12.55 8 12 8C11.45 8 11 8.45 11 9H9.5Z"
            fill="currentColor"
          />
          <circle cx="12" cy="15.5" r="1" fill="currentColor" />
        </svg>
      </div>

      <!-- 内容区 -->
      <div class="license-content">
        <p class="license-title">版权声明</p>
        <ul class="license-meta">
          <li>
            <span class="meta-label">本文链接：</span>
            <a :href="pageUrl" class="meta-link" target="_blank" rel="noopener">
              {{ pageUrl }}
            </a>
          </li>
          <li>
            <span class="meta-label">许可协议：</span>
            <a
              :href="licenseConfig.url"
              class="meta-link license-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ licenseConfig.name }}
            </a>
          </li>
        </ul>
        <p class="license-note">
          转载或引用本文时请注明出处，并保留原文链接及作者信息。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.license-wrapper {
  margin: 2.5rem 0 1.5rem;
}

.license-card {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
  padding: 1.1rem 1.4rem;
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.license-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  border-color: var(--vp-c-brand-2);
}

.license-icon {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
  margin-top: 2px;
  opacity: 0.85;
}

.license-content {
  flex: 1;
  min-width: 0;
}

.license-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.7;
}

.license-meta {
  list-style: none;
  padding: 0;
  margin: 0 0 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.license-meta li {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.meta-label {
  flex-shrink: 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.meta-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  transition: color 0.15s;
}

.meta-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.license-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.1em 0.55em;
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.02em;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.license-badge:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
  text-decoration: none;
}

.license-note {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 480px) {
  .license-card {
    flex-direction: column;
    gap: 0.7rem;
  }
  .meta-link {
    white-space: normal;
    word-break: break-all;
  }
}
</style>
https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
�

�
{{ post.title }} 

{{ post.date.string }}


�

�

�
import { ref, computed } from "vue"; import { useRoute, useRouter } from "vitepress"; // 非 Vue 组件需要手动引入 import { MessagePlugin, PaginationProps, Pagination as TPagination, } from "tdesign-vue-next"; import { data as posts } from "./.vitepress/theme/posts.data.mts"; import { isMobile } from "./.vitepress/theme/utils/mobile.ts"; const route = useRoute(); const getPage = () => { const search = route.query const searchParams = new URLSearchParams(search); return Number(searchParams.get("page") || "1"); } const current = ref(getPage()) const pageSize = ref(10); const total = ref(posts.length); // 在首页有page参数时，从NAV跳转到当前页，清空了参数，但没有刷新页面内容的问题，需要手动更新current const router = useRouter(); router.onAfterRouteChange = (to) => { current.value = getPage(); } const curPosts = computed(() => { return posts.slice( (current.value - 1) * pageSize.value, current.value * pageSize.value ); }); const onCurrentChange: PaginationProps["onCurrentChange"] = ( index, pageInfo ) => { // MessagePlugin.success(`转到第${index}页`); const url = new URL(window.location as any); url.searchParams.set("page", index.toString()); window.history.replaceState({}, "", url); window.scrollTo({ top: 0, }); }; 
�
/* 去掉.vp-doc li + li 的 margin-top */ .pagination-container { margin-top: 32px; :deep(li) { margin-top: 0px; } } /* ─── 分隔线 ─── */ .post-divider { width: 100%; height: 1px; background-color: var(--vp-c-divider); margin: 0; } /* ─── 标题 ─── */ .post-title { margin-top: 28px; margin-bottom: 14px; border-top: none !important; padding-top: 0 !important; line-height: 1.3; position: relative; > a { font-family: "Noto Serif SC", "Source Han Serif", serif !important; text-decoration: none !important; font-weight: 700 !important; font-size: 1.75rem; color: var(--vp-c-text-1); transition: color 0.2s; &:hover { color: var(--vp-c-brand-1); } } @media (max-width: 425px) { > a { font-size: 1.4rem; } } } /* ─── 摘要 ─── */ .post-excerpt { margin: 0 0 14px; font-size: 15px; line-height: 1.7; color: var(--vp-c-text-2); :deep(p) { margin: 0; font-size: 15px; color: var(--vp-c-text-2); } } /* ─── 发表时间 ─── */ .post-date { font-size: 13px; color: var(--vp-c-text-3); font-weight: 400; margin-bottom: 24px; letter-spacing: 0.02em; } 
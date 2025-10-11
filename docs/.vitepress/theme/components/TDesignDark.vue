<template></template>

<script setup lang="ts">
import { useData } from "vitepress";
import { nextTick, watch, onMounted } from "vue";

const { isDark } = useData();

// 检查浏览器是否支持 View Transition 动画
const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

// 点击动画核心逻辑
const triggerTransition = async (x: number, y: number) => {
  if (!enableTransitions()) return;

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      fill: "forwards",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`
    }
  );
};

// 监听页面中 TDesign 的主题切换按钮点击事件
onMounted(() => {
  // TDesign 的主题切换按钮通常有类名 .t-switch 或 .t-button
  const possibleSelectors = [".t-switch", ".t-button", ".VPSwitchAppearance"];

  possibleSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("click", (e) => {
        const event = e as MouseEvent;
        triggerTransition(event.clientX, event.clientY);
      });
    });
  });
});

// 同步 TDesign 的暗色模式属性
watch(
  isDark,
  () => {
    if (typeof document !== "undefined") {
      if (isDark.value) {
        document.documentElement.setAttribute("theme-mode", "dark");
      } else {
        document.documentElement.removeAttribute("theme-mode");
      }
    }
  },
  { immediate: true }
);
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>

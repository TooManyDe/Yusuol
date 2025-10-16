// .vitepress/theme/index.ts 或 index.js

import DefaultTheme from 'vitepress/theme'
import type { EnhanceApp, Theme } from 'vitepress'

// --- 样式导入 ---
// 引入 TDesign 全局样式
import 'tdesign-vue-next/es/style/index.css' 
// 引入自定义样式
import './style.css'

// --- 组件导入 ---
import Comment from './components/Comment.vue'
import ImageViewer from './components/ImageViewer.vue'
import CustomLayout from './Layout.vue' // 使用 CustomLayout 避免命名冲突

// --- 增强应用逻辑 (Enhance App) ---
const enhanceApp: EnhanceApp = ({ app }) => {
  // 注册全局组件，可以在 Markdown 文件中直接使用
  app.component('Comment', Comment)
  app.component('ImageViewer', ImageViewer)
  
  // 路由切换逻辑已被移除，主题文件更专注。
}

// --- 导出主题配置 ---
export default {
  // 继承默认主题的所有配置、逻辑和组件
  ...DefaultTheme,
  
  // 覆盖默认布局，使用自定义的 Layout
  Layout: CustomLayout, 

  // 增强应用配置：注册全局组件等
  enhanceApp,

  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  }

} as Theme

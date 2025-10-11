import { type DefaultTheme, defineConfig } from 'vitepress'

// --- Static Constants ---

// RSS SVG Icon Path - Optimized for single-line readability.
const RSS_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>'

// --- Theme Component Definitions ---

// Navigation (Nav)
const nav: DefaultTheme.NavItem[] = [
  // VitePress locale convention usually places links under the locale base path.
  { text: 'Archive', link: '/archive/', activeMatch: '/archive/' },
  { text: 'Category', link: '/category/', activeMatch: '/category/' },
  { text: 'Sponsor', link: '/support-me', activeMatch: '/support-me' },
]

// Social Links
const socialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: { svg: RSS_ICON_SVG },
    link: '/feed-en.xml',
    ariaLabel: 'RSS Feed', // Added for accessibility
  },
]

// Footer
const footer: DefaultTheme.Footer = {
  message:
    '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a> © 2025 <a href="https://skywhisper.org">SkyWhisper</a>',
  copyright: 'Released under the MIT License.', // Added standard copyright field
}

// Search Translations (local)
const search: DefaultTheme.Search = {
  provider: 'local',
  options: {
    locales: {
      root: { // Use 'root' here as the theme config will be applied to the 'en-US' locale base
        translations: {
          button: {
            buttonText: 'Search Documentation', // More descriptive text
            buttonAriaLabel: 'Search Documentation',
          },
          modal: {
            noResultsText: 'No results found',
            resetButtonTitle: 'Clear the query',
            footer: {
              selectText: 'Select',
              navigateText: 'Navigate',
            },
          },
        },
      },
    },
  },
}

// English Theme Configuration (Used inside 'locales' block below)
const enThemeConfig: DefaultTheme.Config = {
  // Structure
  nav,
  footer,
  socialLinks,
  search, // Search is now included here

  // Text/Accessibility
  docFooter: {
    prev: 'Previous',
    next: 'Next',
  },
  outlineTitle: 'On this page',
  lastUpdatedText: 'Last updated',
  returnToTopLabel: 'Return to top',
  sidebarMenuLabel: 'Menu',
  darkModeSwitchLabel: 'Dark mode',
}

// --- Root VitePress Configuration ---

export default defineConfig({
  // 1. Basic Information & Build
  title: 'SkyWhisper',
  description: 'Never Resting Day nor Night',
  lang: 'en-US',
  titleTemplate: ':title - SkyWhisper',
  
  // 2. Build Optimization
  cleanUrls: true,
  lastUpdated: true, // Switched to true: Display the 'Last updated' time.
  
  // 3. SEO Optimization (Head)
  head: [
    ['meta', { name: 'author', content: 'SkyWhisper' }],
    ['meta', { name: 'keywords', content: 'SkyWhisper, blog, technology, sharing, VitePress' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // Added rel="alternate" for RSS discovery
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'SkyWhisper RSS', href: '/feed-en.xml' }],
  ],

  // 4. Locales (Recommended for multi-language setup)
  locales: {
    root: { // The English root locale
      label: 'English',
      lang: 'en-US',
      // The theme configuration is placed inside the locale object.
      themeConfig: enThemeConfig,
    },
    // If you add a Chinese version later:
    // zh: {
    //   label: '简体中文',
    //   lang: 'zh-Hans',
    //   link: '/zh/',
    //   themeConfig: zhThemeConfig,
    // }
  },
})

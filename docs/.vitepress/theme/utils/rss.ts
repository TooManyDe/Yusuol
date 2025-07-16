import path from "node:path";
import { writeFileSync } from "node:fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = "https://yusuol.com";

// 生成中文 RSS 文件
export async function createRssFileZH(config: SiteConfig) {
  const feed = new Feed({
    title: 'Yusuol',
    description: '',
    id: hostname,
    link: hostname,
    language: "zh-Hans",
    image: "https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.png",
    favicon: `https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.ico`,
    copyright: "Copyright© 2025-present Yusuol",
  });

  const posts = await createContentLoader("posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  // 按日期降序排序
  posts.sort((a, b) => Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)));

  for (const { url, excerpt, html, frontmatter } of posts) {
    // 仅保留最近 5 篇文章
    if (feed.items.length >= 5) {
      break;
    }

    // ✅ 确保 date 是 Date 类型，避免 toUTCString 报错
    const date = new Date(frontmatter.date);
    if (isNaN(date.getTime())) continue; // 可选：跳过无效日期

    feed.addItem({
      title: frontmatter.title,
      id: `${hostname}${url}`,
      link: `${hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: "Yusuol",
          link: "https://Yusuol.com",
        },
      ],
      date, // ✅ 使用 Date 类型
    });
  }

  // 输出 RSS 文件
  writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}

// 生成英文 RSS 文件
export async function createRssFileEN(config: SiteConfig) {
  const feed = new Feed({
    title: "Yusuol",
    description:
      "",
    id: hostname,
    link: hostname,
    language: "en-US",
    image: "https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.png",
    favicon: `https://techdaily.oss-cn-shanghai.aliyuncs.com/Yusuol/Yusuol.ico`,
    copyright: "Copyright© 2025-present Yusuol",
  });

  const posts = await createContentLoader("en/posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)));

  for (const { url, excerpt, html, frontmatter } of posts) {
    if (feed.items.length >= 5) {
      break;
    }

    // ✅ 强制转换为 Date 类型，避免 toUTCString 错误
    const date = new Date(frontmatter.date);
    if (isNaN(date.getTime())) continue;

    feed.addItem({
      title: frontmatter.title,
      id: `${hostname}${url}`,
      link: `${hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: "Yusuol",
          link: "https://Yusuol.com",
        },
      ],
      date,
    });
  }

  writeFileSync(path.join(config.outDir, "feed-en.xml"), feed.rss2(), "utf-8");
}

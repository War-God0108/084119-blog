---
title: "这个网站是怎么搭建的：Astro 5 + Cloudflare Pages 零成本部署指南"
description: "从零开始，用 Astro 5 搭建个人博客并部署到 Cloudflare Pages 的完整记录，包括内容集合、暗色模式切换、中文字体优化等细节。"
publishedAt: 2026-05-28
tags: ["技术", "教程", "Astro"]
draft: false
---

## 动机

搭建这个博客时，我做了几个关键决定：

1. **零成本运营**——不花钱在服务器上
2. **Markdown 写作**——最低的心智负担
3. **极快的加载速度**——对读者友好，对 SEO 友好
4. **支持暗色模式**——我自己晚上读东西多

最终选定的方案是 **Astro + Cloudflare Pages**。

## 为什么是 Astro

市面上的静态网站生成器很多，Hugo、Hexo、Jekyll、Next.js……但我选了 Astro，原因是：

**零 JavaScript 默认输出。** Astro 的理念是：默认情况下，生成的页面不包含任何 JavaScript。对于一个以阅读为主的博客来说，你根本不需要 React 或 Vue。页面是纯 HTML 和 CSS，体积极小。

**内容集合。** Astro 的内容集合功能允许你用 Zod 定义内容的 schema，在构建时进行类型检查。所有文章的 frontmatter 都会被验证，不会再出现因为打错字而渲染失败的情况。

**完美的 Markdown 支持。** 内置 Shiki 代码高亮，支持 GFM（GitHub Flavored Markdown），渲染效果很好。

## 技术架构

整个站点极其简单：

```
.
├── src/
│   ├── content.config.ts    # 内容集合的 Zod schema
│   ├── content/blog/        # 所有文章（.md 文件）
│   ├── pages/               # 页面（文件路由）
│   ├── components/          # Astro 组件
│   └── styles/global.css    # 全局样式
└── public/                  # 静态资源
```

没有数据库，没有 API，没有后端。写完 Markdown，`git push`，Cloudflare 自动构建部署。

## 暗色模式实现

暗色模式的实现用了 CSS 自定义属性加少量 vanilla JavaScript：

1. 在 `:root` 和 `[data-theme="dark"]` 中分别定义颜色变量
2. 在 `<head>` 中内联一段脚本，页面加载前检查 `localStorage`，设置 `data-theme` 属性，避免闪烁
3. 给用户一个切换按钮——就是导航栏里那个太阳/月亮图标

核心代码不到 50 行，非常轻量。

## 中文字体处理

中文网站有一个特殊挑战：中文字体文件很大（5-10MB），全部加载不现实。

我的策略是：

- **正文使用系统字体栈**：`PingFang SC, Noto Sans SC, Microsoft YaHei` 这样的顺序，确保每个平台都有好用的中文字体，且不需要额外加载
- **标题使用 Noto Serif SC**：通过 Google Fonts 加载，只加载中文子集和需要的两个字重（600、700），大约 300KB
- **使用 `font-display: swap`**：字体加载期间先用系统字体，加载完再切换，用户不会看到空白

## 部署到 Cloudflare Pages

部署流程非常简单：

1. 把代码推到 GitHub
2. 在 Cloudflare Pages 中连接仓库
3. 设置构建命令 `npm run build`，输出目录 `dist`
4. 绑定自定义域名 `084119.xyz`

每次 `git push` 到 main 分支，Cloudflare 自动构建并部署。整个流程从 push 到上线不到一分钟。

## 成本和性能

- **成本**：0 元/月。Cloudflare Pages 免费层有无限带宽（静态站点）和每月 500 次构建，完全够用
- **性能**：Lighthouse 四项满分（Performance、Accessibility、Best Practices、SEO）
- **首屏加载**：不到 500ms（因为页面几乎没有 JavaScript）

## 你可以怎么做

如果你也想搭建一个类似的博客：

1. 确保电脑上有 Node.js 18+
2. 运行 `npm create astro@latest`
3. 选择 Empty 模板
4. 参考我上面描述的结构开始搭建

或者，你可以直接 fork 我的仓库，修改内容和样式，就能拥有自己的博客。

---

写博客是一件回报周期很长的事情。你可能写了很久也没有多少读者。但每一次写作，都是对自己认知的一次整理和深化。这本身就值得。

如果你也想开始写博客，我的建议是：不要等准备好，现在就开始。

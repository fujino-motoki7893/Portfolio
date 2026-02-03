---
title: Nuxt Contentでブログを構築する（モック）
description: Nuxt Contentモジュールを使ってMarkdownベースのブログを作成する方法
date: 2024-02-02
tags:
  - Nuxt.js
  - Markdown
  - ブログ
---

## Nuxt Contentとは

Nuxt ContentはNuxtの公式モジュールで、Markdownファイルをコンテンツとして扱えるようにします。

## インストール

```bash
pnpm add @nuxt/content
```

## 設定

`nuxt.config.ts`にモジュールを追加します：

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/content']
})
```

## 記事の作成

`content/`ディレクトリにMarkdownファイルを作成するだけで、自動的にコンテンツとして認識されます。

## まとめ

Nuxt Contentを使えば、シンプルにブログを構築できます。

---
title: Vue 3 Composition APIの基本（モック）
description: Vue 3で導入されたComposition APIの基本的な使い方を解説します
date: 2024-02-01
tags:
  - Vue.js
  - TypeScript
  - フロントエンド
---

## はじめに

Vue 3で導入されたComposition APIは、コンポーネントのロジックをより柔軟に整理できる新しい方法です。

## 基本的な使い方

```typescript
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

onMounted(() => {
  console.log('コンポーネントがマウントされました')
})
```

## メリット

- ロジックの再利用性が向上
- TypeScriptとの相性が良い
- 関連するコードをまとめやすい

## まとめ

Composition APIを使うことで、より保守性の高いコードを書くことができます。

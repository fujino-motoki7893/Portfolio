---
title: NuxtでPortfolioを作成する（作成中）
description: 技術選定にて考慮したことを解説します
date: 2026-02-03
tags:
  - Portfolio
  - Nuxt
  - 技術選定
---

## はじめに

本Portfolioを構築するにあたって、どのようにアーキテクチャを選定したか解説していきます。

## 技術選定

### フロントエンド

すべてのプロパティをオプショナルにします。

```typescript
interface User {
  id: number
  name: string
  email: string
}

// すべてのプロパティがオプショナルに
type PartialUser = Partial<User>

// 更新時に一部のプロパティだけ渡せる
function updateUser(id: number, updates: Partial<User>) {
  // ...
}

updateUser(1, { name: '新しい名前' }) // OK
```

### `Pick<T, K>`

指定したプロパティだけを抽出します。

```typescript
interface Article {
  id: number
  title: string
  content: string
  author: string
  createdAt: Date
}

// titleとauthorだけを持つ型
type ArticlePreview = Pick<Article, 'title' | 'author'>

const preview: ArticlePreview = {
  title: 'TypeScript入門',
  author: 'John'
}
```

### `Omit<T, K>`

指定したプロパティを除外します。

```typescript
// idとcreatedAtを除外した型（新規作成時に便利）
type CreateArticleInput = Omit<Article, 'id' | 'createdAt'>

const newArticle: CreateArticleInput = {
  title: '新しい記事',
  content: '本文...',
  author: 'Jane'
}
```

### `Record<K, T>`

キーの型と値の型を指定してオブジェクト型を作成します。

```typescript
type Status = 'pending' | 'approved' | 'rejected'

// 各ステータスに対応するラベルを定義
const statusLabels: Record<Status, string> = {
  pending: '審査中',
  approved: '承認済み',
  rejected: '却下'
}
```

## 実践的な活用例

### APIレスポンスの型定義

```typescript
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// ユーザー一覧のレスポンス
type UsersResponse = ApiResponse<User[]>

// 単一ユーザーのレスポンス
type UserResponse = ApiResponse<User>
```

### フォームの状態管理

```typescript
interface FormData {
  username: string
  email: string
  password: string
}

// フォームの各フィールドにエラーメッセージを持たせる
type FormErrors = Partial<Record<keyof FormData, string>>

const errors: FormErrors = {
  email: 'メールアドレスの形式が不正です'
}
```

## まとめ

ユーティリティ型を使うことで：

- **コードの重複を削減**できる
- **型の意図が明確**になる
- **保守性が向上**する

最初は難しく感じるかもしれませんが、少しずつ使っていくことで自然と身につきます。

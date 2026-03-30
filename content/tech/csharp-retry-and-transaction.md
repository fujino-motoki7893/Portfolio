---
title: 【ASP.NET Core】SQL Server接続のリトライとトランザクションの共存
description: EF CoreのEnableRetryOnFailureとトランザクションを共存させる実装方法を解説します
date: 2024-01-12
tags:
  - ASP.NET Core
  - Entity Framework Core
  - SQL Server
  - C#
---

## はじめに

ASP.NET CoreアプリケーションでSQL Server接続の断続的な500エラーに対処するため、リトライロジックとトランザクションを共存させる方法を解説しています。

本記事の詳細は [cloud-config tech blogの記事](https://tech-blog.cloud-config.jp/2024-01-12-csharp-coexistence-retry-and-transaction) をご覧ください。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | ASP.NET Core |
| ORM | Entity Framework Core |
| データベース | SQL Server |
| 言語 | C# |

## 概要

`EnableRetryOnFailure`によるリトライ設定と、既存のトランザクション処理を組み合わせると、EF Coreが「ユーザー起因のトランザクションはサポートされない」というエラーを発生させます。

### ポイント

- **EnableRetryOnFailure**: 接続リトライの回数や遅延を設定可能な自動リトライ機構
- **ExecutionStrategy**: EF Coreのトランザクション操作をリトライ可能にする仕組み
- **CreateExecutionStrategy()**: トランザクション内でリトライロジックを正しくラップする解決策
- **汎用リポジトリパターン**: リトライ＋トランザクションロジックをカプセル化する実装アプローチ

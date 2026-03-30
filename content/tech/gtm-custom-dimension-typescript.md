---
title: 【GTM】TypeScriptでカスタムディメンションを取得する
description: Google Tag ManagerとGA4を活用し、TypeScript（Nuxt.js）でカスタムディメンションを取得する方法を解説します
date: 2023-07-26
tags:
  - TypeScript
  - Google Tag Manager
  - GA4
  - Nuxt
---

## はじめに

Universal AnalyticsからGA4への移行に伴い、Google Tag Manager（GTM）を活用してタグ管理を一元化し、TypeScriptでカスタムディメンションを取得する方法を解説しています。

本記事の詳細は [cloud-config tech blogの記事](https://tech-blog.cloud-config.jp/2023-07-26-get-custom-dimension-in-typescript) をご覧ください。

## 技術スタック

| 項目 | 内容 |
|------|------|
| 言語 | TypeScript |
| フレームワーク | Nuxt.js |
| タグ管理 | Google Tag Manager（GTM） |
| アナリティクス | Google Analytics 4（GA4） |

## 概要

GTMの導入からカスタムディメンションの設定、データレイヤー連携、APIベースのデータ収集までを実践的に解説しています。

### ポイント

- **GTMの導入・設定**: インストールからタグの設定まで
- **カスタムディメンションの設計**: GA4でのディメンション定義と設定
- **データレイヤー連携**: GTMとアプリケーション間のデータ受け渡し
- **APIによる動的データ収集**: 環境変数を活用した柔軟なデータ取得

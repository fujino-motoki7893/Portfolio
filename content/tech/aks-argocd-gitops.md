---
title: 【Argo CD】AKSにGitOpsを導入する
description: Azure Kubernetes Service（AKS）環境にArgo CDを導入し、GitOpsによるインフラ管理を実現した事例を紹介します
date: 2023-06-14
tags:
  - Argo CD
  - AKS
  - GitOps
  - Kubernetes
---

## はじめに

インフラリポジトリにCI/CDパイプラインがなく、Gitと実環境の乖離が課題となっていたプロジェクトにおいて、Argo CDを導入してGitOpsを実現した事例を紹介しています。

本記事の詳細は [cloud-config tech blogの記事](https://tech-blog.cloud-config.jp/2023-06-14-aks-argocd-to-gitops-introduction) をご覧ください。

## 技術スタック

| 項目 | 内容 |
|------|------|
| CD ツール | Argo CD |
| Kubernetes | Azure Kubernetes Service（AKS） |
| コンテナレジストリ | Azure Container Registry（ACR） |
| CI | GitHub Actions |
| 構成管理 | Kustomize |

## 概要

dev・staging・productionの各環境に対し、Image Updaterによるマニフェスト自動同期とKustomizeによる構成管理を組み合わせたGitOpsワークフローを構築しました。

### ポイント

- **GitOpsの導入**: Gitリポジトリを信頼できる唯一の情報源（Single Source of Truth）として活用
- **Self-Healing**: 環境の差分を自動検知・修復する機能
- **Image Updater**: コンテナイメージ更新時のマニフェスト自動同期
- **Fluxとの比較**: 視覚的なDiff検出やSelf-Healingを理由にArgo CDを選定

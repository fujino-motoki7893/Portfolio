---
title: Google Colabで「自分だけのLLM」をゼロから作ってみた
description: 無料のGoogle Colabで、データ準備からTransformerの実装・学習・テキスト生成まで一気通貫でLLMを構築しました
date: 2026-03-22
tags:
  - LLM
  - PyTorch
  - Transformer
  - Google Colab
---

## はじめに

Google Colabの無料枠（T4 GPU）のみを使い、小規模な言語モデルをゼロから構築しました。データ準備・トークナイズ・モデル実装・学習・テキスト生成までの全工程を一気通貫で行っています。

本記事の詳細は [Qiitaの記事](https://qiita.com/motoki_fujino6290/items/88247df20faacbb7d0af) をご覧ください。

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | PyTorch |
| モデルアーキテクチャ | Transformer（Causal Self-Attention、4層、256次元） |
| トークナイザ | SentencePiece（BPE、語彙数4,000） |
| 実行環境 | Google Colab（T4 GPU） |
| 学習データ | 日本文学3作品（約49万文字） |
| モデルサイズ | 約524万パラメータ |

## 概要

ChatGPTのようなLLMがなぜ動くのかを理解するため、小規模なTransformerモデルをゼロから実装しました。

### ポイント

- **青空文庫の日本文学をデータとして活用**: パブリックドメインの小説3作品からテキストを収集
- **SentencePieceによるトークナイズ**: BPEアルゴリズムで日本語テキストをサブワード分割
- **Transformerの自前実装**: Causal Self-Attentionを含む4層のTransformerを構築
- **Temperature Samplingによるテキスト生成**: 確率的なテキスト生成の仕組みを実装

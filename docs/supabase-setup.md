# RANK機能用 Supabaseセットアップ手順

`/rank` のtier表・spotlight編集機能はSupabaseをバックエンドとして利用します。
このドキュメントの手順で**新規のSupabaseプロジェクト**を作成し、このリポジトリと接続してください。

既存の他サービスと同じプロジェクトを相乗りさせることも技術的には可能ですが、
このリポジトリのRLS設計は「サインアップ無効化 + 管理者ユーザー1人だけ」を前提にしているため、
他サービスで一般ユーザー向けにサインアップを許可している場合は必ず新規プロジェクトを分けてください。
無料プランは1組織あたりアクティブなプロジェクト2つまで無料です。

## 1. プロジェクトを作成する

1. [Supabase](https://supabase.com/) にログイン(未登録ならアカウント作成)
2. ダッシュボードで「New Project」を選択
3. 組織・プロジェクト名(例: `portfolio-rank`)・データベースパスワード・リージョン(例: Tokyo `ap-northeast-1`)を設定して作成
4. プロジェクトの初期化が完了するまで数分待つ

## 2. APIキーとURLを控える

1. プロジェクト画面の左メニュー「Project Settings」→「API」を開く
2. 以下の2つをメモしておく
   - **Project URL**(例: `https://xxxxxxxx.supabase.co`)
   - **anon public key**

## 3. スキーマ(テーブル・RLS・Storage)を作成する

1. 左メニュー「SQL Editor」を開き、「New query」を選択
2. このリポジトリの [`supabase/schema.sql`](../supabase/schema.sql) の中身を全てコピーして貼り付け、実行(Run)する
3. 以下が作成されることを確認する
   - テーブル: `rank_categories` / `rank_tiers` / `rank_items` / `rank_spotlights`
   - 各テーブルのRLSポリシー(閲覧は誰でも可、書き込みはログイン済みユーザーのみ)
   - Storageバケット: `rank-images`(公開読み取り、書き込みはログイン済みユーザーのみ)
   - 初期カテゴリ: 食べ物・アニメ・ゲーム

## 4. 新規サインアップを無効化する

1. 左メニュー「Authentication」→「Providers」→「Email」を開く
2. **「Allow new users to sign up」をオフ**にする

これを行わないと、第三者が自分でアカウントを作ってRANKの内容を編集できてしまいます。

## 5. 管理者(自分専用)ユーザーを作成する

1. 左メニュー「Authentication」→「Users」→「Add user」→「Create new user」
2. 自分専用のメールアドレスとパスワードを設定して作成
   - このメールアドレスが手順6の `NUXT_PUBLIC_RANK_ADMIN_EMAIL` になります
   - このパスワードが `/rank` の編集モードに入る際のパスワードになります

## 6. `.env` に接続情報を設定する

プロジェクト直下の `.env` に、手順2・5で控えた値を設定する。

```env
NUXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=(手順2でメモしたanon public key)
NUXT_PUBLIC_RANK_ADMIN_EMAIL=(手順5で作成したメールアドレス)
```

## 7. GitHub PagesのCIに環境変数を設定する

このサイトはGitHub Actions(`.github/workflows/deploy.yml`)で静的ビルドしてGitHub Pagesにデプロイしています。
`.env` はリポジトリに含まれないため、**CIのビルド時にも同じ環境変数を渡す必要があります**。
(このサイトはSSG/静的生成のため、値はビルド時にHTML/JSへ焼き込まれます)

1. GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」を開く
2. 「New repository secret」で以下の3つを登録する
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NUXT_PUBLIC_RANK_ADMIN_EMAIL`
   - 値は手順6で `.env` に設定したものと同じ
3. `deploy.yml` の `pnpm run build` ステップで、これらのSecretsが環境変数として渡される設定になっていることを確認する

## 8. 動作確認

```bash
pnpm dev
```

1. `http://localhost:3000/rank` にアクセスし、tier表が表示されることを確認(まだtierは空の状態)
2. 右上の「閲覧モード/編集モード」トグルをONにする
3. パスワード入力を求められるので、手順5で設定したパスワードを入力
4. 編集モードでtier・項目・spotlightの追加や、ドラッグ&ドロップでの並び替えが動作することを確認

## 補足: 無料プランの制限

- DB容量500MB / ファイルストレージ1GB / DB・storageのegress各5GB/月
- **1週間データベースへのアクセスがないと自動的に一時停止**される(1年以内ならSupabase Studioから復元可能)
- アクセス頻度の低いポートフォリオサイトの場合、しばらく訪問がないとプロジェクトが一時停止することがある点は留意してください

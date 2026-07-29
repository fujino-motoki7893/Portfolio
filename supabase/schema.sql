-- RANK機能(tier表 + spotlight)用のスキーマ定義
-- Supabaseダッシュボードの SQL Editor でそのまま実行してください。
-- 前提: サインアップは無効化し、管理者用ユーザーを1人だけ作成する運用を想定しています。
--       (RLSは「ログイン済みユーザーなら誰でも書き込み可」としているため、
--        サインアップが有効なままだと誰でも編集アカウントを作れてしまいます)

-- 1. カテゴリ(食べ物・アニメ・ゲームなど)
create table if not exists rank_categories (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 2. tier(カテゴリごとのS/A/B/C...などの段階)
create table if not exists rank_tiers (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references rank_categories (id) on delete cascade,
  label text not null,
  color text not null default '#3b82f6',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 3. tierに属する個別項目(名前・画像)
create table if not exists rank_items (
  id uuid primary key default gen_random_uuid(),
  tier_id uuid not null references rank_tiers (id) on delete cascade,
  name text not null,
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 4. tier表の下に置く「個別にスポットを当てた」画像・タイトル・説明
create table if not exists rank_spotlights (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references rank_categories (id) on delete cascade,
  image_url text,
  title text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- テーブル権限の付与(RLSポリシーだけでは不十分で、anon/authenticatedロールに
-- テーブルレベルの権限がないと "permission denied for table" になる)
grant usage on schema public to anon, authenticated;
grant select on rank_categories, rank_tiers, rank_items, rank_spotlights to anon, authenticated;
grant insert, update, delete on rank_categories, rank_tiers, rank_items, rank_spotlights to authenticated;

-- RLS有効化
alter table rank_categories enable row level security;
alter table rank_tiers enable row level security;
alter table rank_items enable row level security;
alter table rank_spotlights enable row level security;

-- 閲覧は誰でも可
create policy "rank_categories_public_read" on rank_categories for select using (true);
create policy "rank_tiers_public_read" on rank_tiers for select using (true);
create policy "rank_items_public_read" on rank_items for select using (true);
create policy "rank_spotlights_public_read" on rank_spotlights for select using (true);

-- 書き込み(追加・更新・削除)はログイン済みユーザーのみ
create policy "rank_categories_write" on rank_categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "rank_tiers_write" on rank_tiers for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "rank_items_write" on rank_items for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "rank_spotlights_write" on rank_spotlights for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage: 画像アップロード用バケット
insert into storage.buckets (id, name, public)
values ('rank-images', 'rank-images', true)
on conflict (id) do nothing;

create policy "rank_images_public_read" on storage.objects for select
  using (bucket_id = 'rank-images');
create policy "rank_images_write" on storage.objects for insert
  with check (bucket_id = 'rank-images' and auth.role() = 'authenticated');
create policy "rank_images_update" on storage.objects for update
  using (bucket_id = 'rank-images' and auth.role() = 'authenticated');
create policy "rank_images_delete" on storage.objects for delete
  using (bucket_id = 'rank-images' and auth.role() = 'authenticated');

-- 初期カテゴリ(必要に応じて書き換え・追加してください)
insert into rank_categories (key, label, sort_order) values
  ('food', '食べ物', 0),
  ('anime', 'アニメ', 1),
  ('game', 'ゲーム', 2)
on conflict (key) do nothing;

export interface RankCategoryRow {
  id: string
  key: string
  label: string
  sort_order: number
}

export interface RankTierRow {
  id: string
  category_id: string
  label: string
  color: string
  sort_order: number
}

export interface RankItemRow {
  id: string
  tier_id: string
  name: string
  image_url: string | null
  sort_order: number
}

export interface RankSpotlightRow {
  id: string
  category_id: string
  image_url: string | null
  title: string
  description: string | null
  sort_order: number
}

export interface RankTierWithItems extends RankTierRow {
  items: RankItemRow[]
}

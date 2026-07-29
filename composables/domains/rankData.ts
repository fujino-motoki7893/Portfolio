import type {
  RankCategoryRow,
  RankItemRow,
  RankSpotlightRow,
  RankTierRow,
  RankTierWithItems,
} from '~/types/rank'

/** RANK機能全体で共有するエラーメッセージ(操作失敗時にlayouts/rank.vueで表示) */
export const useRankError = () => useState<string | null>('rankError', () => null)

const reportError = (error: { message?: string } | null) => {
  if (!error) return
  useRankError().value = error.message ?? '操作に失敗しました'
}

const persistOrder = async (table: string, ids: string[]) => {
  const supabase = useSupabase()
  if (!supabase) return
  const results = await Promise.all(
    ids.map((id, index) => supabase.from(table).update({ sort_order: index }).eq('id', id)),
  )
  const failed = results.find(result => result.error)
  if (failed) reportError(failed.error)
}

export const uploadRankImage = async (file: File, folder: string): Promise<string> => {
  const supabase = useSupabase()
  if (!supabase) throw new Error('Supabaseクライアントが初期化されていません')

  const ext = file.name.split('.').pop()
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from('rank-images').upload(path, file)
  if (error) throw error

  const { data } = supabase.storage.from('rank-images').getPublicUrl(path)
  return data.publicUrl
}

/** カテゴリ一覧の取得・編集(全ページ共有のstateとして保持) */
export const useRankCategories = () => {
  const supabase = useSupabase()
  const categories = useState<RankCategoryRow[]>('rankCategories', () => [])
  const loaded = useState('rankCategoriesLoaded', () => false)
  const loading = ref(false)

  const fetchCategories = async (force = false) => {
    if (!supabase) return
    if (loaded.value && !force) return
    loading.value = true
    const { data } = await supabase
      .from('rank_categories')
      .select('*')
      .order('sort_order', { ascending: true })
    categories.value = data ?? []
    loaded.value = true
    loading.value = false
  }

  const createCategory = async (label: string, key: string) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_categories').insert({
      label,
      key,
      sort_order: categories.value.length,
    })
    if (error) return reportError(error)
    await fetchCategories(true)
  }

  const updateCategory = async (id: string, label: string) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_categories').update({ label }).eq('id', id)
    if (error) return reportError(error)
    await fetchCategories(true)
  }

  const deleteCategory = async (id: string) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_categories').delete().eq('id', id)
    if (error) return reportError(error)
    await fetchCategories(true)
  }

  const reorderCategories = async (orderedIds: string[]) => {
    categories.value = orderedIds
      .map(id => categories.value.find(c => c.id === id))
      .filter((c): c is RankCategoryRow => !!c)
    await persistOrder('rank_categories', orderedIds)
  }

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
  }
}

/** 指定カテゴリのtier表(tier + 各tierの項目)の取得・編集 */
export const useRankBoard = (categoryId: Ref<string | undefined>) => {
  const supabase = useSupabase()
  const tiers = ref<RankTierWithItems[]>([])
  const loading = ref(false)

  const fetchBoard = async () => {
    if (!supabase || !categoryId.value) return
    loading.value = true

    const [{ data: tierRows }, { data: itemRows }] = await Promise.all([
      supabase
        .from('rank_tiers')
        .select('*')
        .eq('category_id', categoryId.value)
        .order('sort_order', { ascending: true }),
      supabase
        .from('rank_items')
        .select('*, rank_tiers!inner(category_id)')
        .eq('rank_tiers.category_id', categoryId.value)
        .order('sort_order', { ascending: true }),
    ])

    const items = (itemRows ?? []) as RankItemRow[]
    tiers.value = (tierRows ?? []).map((tier: RankTierRow) => ({
      ...tier,
      items: items.filter(item => item.tier_id === tier.id),
    }))

    loading.value = false
  }

  watch(categoryId, fetchBoard, { immediate: true })

  const createTier = async (label: string) => {
    if (!supabase || !categoryId.value) return
    const { error } = await supabase.from('rank_tiers').insert({
      category_id: categoryId.value,
      label,
      sort_order: tiers.value.length,
    })
    if (error) return reportError(error)
    await fetchBoard()
  }

  const updateTier = async (id: string, label: string) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_tiers').update({ label }).eq('id', id)
    if (error) return reportError(error)
    await fetchBoard()
  }

  const deleteTier = async (id: string) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_tiers').delete().eq('id', id)
    if (error) return reportError(error)
    await fetchBoard()
  }

  const reorderTiers = async (orderedIds: string[]) => {
    tiers.value = orderedIds
      .map(id => tiers.value.find(t => t.id === id))
      .filter((t): t is RankTierWithItems => !!t)
    await persistOrder('rank_tiers', orderedIds)
  }

  const createItem = async (tierId: string, name: string, imageUrl: string | null) => {
    if (!supabase) return
    const tier = tiers.value.find(t => t.id === tierId)
    const { error } = await supabase.from('rank_items').insert({
      tier_id: tierId,
      name,
      image_url: imageUrl,
      sort_order: tier?.items.length ?? 0,
    })
    if (error) return reportError(error)
    await fetchBoard()
  }

  const updateItem = async (id: string, name: string, imageUrl: string | null) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_items').update({ name, image_url: imageUrl }).eq('id', id)
    if (error) return reportError(error)
    await fetchBoard()
  }

  const deleteItem = async (id: string) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_items').delete().eq('id', id)
    if (error) return reportError(error)
    await fetchBoard()
  }

  /** 項目をtierをまたいで移動、または同一tier内で並び替え */
  const moveItem = async (itemId: string, targetTierId: string, orderedIdsInTargetTier: string[]) => {
    if (!supabase) return

    const sourceTier = tiers.value.find(t => t.items.some(item => item.id === itemId))
    if (sourceTier && sourceTier.id !== targetTierId) {
      const { error } = await supabase.from('rank_items').update({ tier_id: targetTierId }).eq('id', itemId)
      if (error) return reportError(error)
    }

    await persistOrder('rank_items', orderedIdsInTargetTier)
    await fetchBoard()
  }

  return {
    tiers,
    loading,
    fetchBoard,
    createTier,
    updateTier,
    deleteTier,
    reorderTiers,
    createItem,
    updateItem,
    deleteItem,
    moveItem,
  }
}

/** tier表の下に置くspotlight(個別フィーチャー)の取得・編集 */
export const useRankSpotlights = (categoryId: Ref<string | undefined>) => {
  const supabase = useSupabase()
  const spotlights = ref<RankSpotlightRow[]>([])
  const loading = ref(false)

  const fetchSpotlights = async () => {
    if (!supabase || !categoryId.value) return
    loading.value = true
    const { data } = await supabase
      .from('rank_spotlights')
      .select('*')
      .eq('category_id', categoryId.value)
      .order('sort_order', { ascending: true })
    spotlights.value = data ?? []
    loading.value = false
  }

  watch(categoryId, fetchSpotlights, { immediate: true })

  const createSpotlight = async (title: string, description: string, imageUrl: string | null) => {
    if (!supabase || !categoryId.value) return
    const { error } = await supabase.from('rank_spotlights').insert({
      category_id: categoryId.value,
      title,
      description,
      image_url: imageUrl,
      sort_order: spotlights.value.length,
    })
    if (error) return reportError(error)
    await fetchSpotlights()
  }

  const updateSpotlight = async (
    id: string,
    title: string,
    description: string,
    imageUrl: string | null,
  ) => {
    if (!supabase) return
    const { error } = await supabase
      .from('rank_spotlights')
      .update({ title, description, image_url: imageUrl })
      .eq('id', id)
    if (error) return reportError(error)
    await fetchSpotlights()
  }

  const deleteSpotlight = async (id: string) => {
    if (!supabase) return
    const { error } = await supabase.from('rank_spotlights').delete().eq('id', id)
    if (error) return reportError(error)
    await fetchSpotlights()
  }

  const reorderSpotlights = async (orderedIds: string[]) => {
    spotlights.value = orderedIds
      .map(id => spotlights.value.find(s => s.id === id))
      .filter((s): s is RankSpotlightRow => !!s)
    await persistOrder('rank_spotlights', orderedIds)
  }

  return {
    spotlights,
    loading,
    fetchSpotlights,
    createSpotlight,
    updateSpotlight,
    deleteSpotlight,
    reorderSpotlights,
  }
}

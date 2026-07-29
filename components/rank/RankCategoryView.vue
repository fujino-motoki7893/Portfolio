<template>
  <div
    v-if="loading && categories.length === 0"
    class="text-center py-24 text-gray-400"
  >
    読み込み中...
  </div>
  <div v-else-if="activeCategory">
    <RankBoard :category-id="activeCategory.id" />
    <RankSpotlights
      :category-id="activeCategory.id"
      class="mt-12"
    />
  </div>
  <div
    v-else
    class="text-center py-24"
  >
    <p class="text-gray-500 dark:text-gray-400 font-medium mb-4">
      カテゴリが見つかりませんでした
    </p>
    <NuxtLink
      to="/rank"
      class="text-blue-600 hover:text-blue-700 underline"
    >
      ランキングトップへ戻る
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useRankCategories } from '~/composables/domains/rankData'

const props = defineProps<{
  categoryKey?: string
}>()

const { categories, loading, fetchCategories } = useRankCategories()

onMounted(() => fetchCategories())

const activeCategory = computed(() => {
  if (!categories.value.length) return undefined
  if (!props.categoryKey) return categories.value[0]
  return categories.value.find(c => c.key === props.categoryKey)
})
</script>

<template>
  <RankCategoryView :category-key="categoryKey" />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'rank' })

const route = useRoute()
const categoryKey = computed(() => String(route.params.category))
</script>

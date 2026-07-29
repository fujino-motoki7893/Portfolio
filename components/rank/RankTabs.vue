<template>
  <div
    :class="[
      'flex flex-wrap items-center gap-2 py-4 border-b',
      isDarkMode ? 'border-gray-700' : 'border-gray-200',
    ]"
  >
    <draggable
      v-model="categories"
      item-key="id"
      :disabled="!isEditMode"
      class="flex flex-wrap gap-2"
      tag="div"
      @change="handleReorder"
    >
      <template #item="{ element: category }">
        <div class="relative group">
          <NuxtLink
            :to="`/rank/${category.key}`"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            :class="[
              isActive(category.key)
                ? (isDarkMode
                  ? 'bg-blue-900/50 border-blue-500 text-blue-300'
                  : 'bg-blue-50 border-blue-400 text-blue-700')
                : (isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400'),
              isEditMode ? 'cursor-grab' : '',
            ]"
          >
            {{ category.label }}
          </NuxtLink>
          <button
            v-if="isEditMode"
            type="button"
            class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-500 text-white
            text-[10px] leading-none flex items-center justify-center hover:bg-gray-600"
            @click.prevent="openCategoryForm(category)"
          >
            ✎
          </button>
        </div>
      </template>
    </draggable>

    <button
      v-if="isEditMode"
      type="button"
      class="text-sm text-blue-600 hover:text-blue-700 font-medium px-2"
      @click="openCategoryForm(null)"
    >
      + カテゴリ追加
    </button>

    <RankCategoryFormModal
      v-model="isCategoryFormOpen"
      :category="editingCategory"
      @save="handleCategorySave"
      @delete="handleCategoryDelete"
    />
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import type { RankCategoryRow } from '~/types/rank'
import { useRankCategories } from '~/composables/domains/rankData'
import { useRankAuth } from '~/composables/domains/rankAuth'
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()
const { isEditMode } = useRankAuth()
const route = useRoute()

const {
  categories,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} = useRankCategories()

onMounted(() => fetchCategories())

const isActive = (key: string) => {
  if (route.path === '/rank') return key === categories.value[0]?.key
  return route.path === `/rank/${key}`
}

const handleReorder = () => {
  reorderCategories(categories.value.map(c => c.id))
}

const isCategoryFormOpen = ref(false)
const editingCategory = ref<RankCategoryRow | null>(null)

const openCategoryForm = (category: RankCategoryRow | null) => {
  editingCategory.value = category
  isCategoryFormOpen.value = true
}

const handleCategorySave = (label: string, key: string) => {
  if (editingCategory.value) {
    updateCategory(editingCategory.value.id, label)
  }
  else {
    createCategory(label, key)
  }
}

const handleCategoryDelete = (id: string) => {
  deleteCategory(id)
}
</script>

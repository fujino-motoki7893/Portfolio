<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2
        :class="[
          'text-2xl font-bold',
          isDarkMode ? 'text-white' : 'text-[#1F1F1F]',
        ]"
      >
        スポットライト
      </h2>
      <button
        v-if="isEditMode"
        type="button"
        class="text-sm text-blue-600 hover:text-blue-700 font-medium"
        @click="openSpotlightForm(null)"
      >
        + 追加
      </button>
    </div>

    <draggable
      v-model="spotlights"
      item-key="id"
      :disabled="!isEditMode"
      class="space-y-4"
      @change="handleReorder"
    >
      <template #item="{ element: spotlight }">
        <button
          type="button"
          :class="[
            'w-full text-left flex gap-4 p-4 rounded-xl border transition-colors',
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
            isEditMode ? 'cursor-grab hover:border-blue-400' : 'cursor-default',
          ]"
          @click="handleClick(spotlight)"
        >
          <img
            v-if="spotlight.image_url"
            :src="spotlight.image_url"
            alt=""
            class="w-24 h-24 object-cover rounded-lg shrink-0"
          >
          <div
            v-else
            class="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0"
          />
          <div class="min-w-0">
            <p
              :class="[
                'font-semibold mb-1',
                isDarkMode ? 'text-white' : 'text-[#1F1F1F]',
              ]"
            >
              {{ spotlight.title }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              {{ spotlight.description }}
            </p>
          </div>
        </button>
      </template>
    </draggable>

    <p
      v-if="!loading && spotlights.length === 0"
      class="text-center text-gray-500 dark:text-gray-400 py-12"
    >
      まだスポットライトがありません
    </p>

    <RankSpotlightFormModal
      v-model="isFormOpen"
      :spotlight="editingSpotlight"
      @save="handleSave"
      @delete="handleDelete"
    />
    <RankImageLightbox v-model="lightboxImage" />
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import type { RankSpotlightRow } from '~/types/rank'
import { useRankSpotlights } from '~/composables/domains/rankData'
import { useRankAuth } from '~/composables/domains/rankAuth'
import { injectDarkMode } from '~/composables/domains/darkMode'

const props = defineProps<{
  categoryId: string
}>()

const { isDarkMode } = injectDarkMode()
const { isEditMode } = useRankAuth()

const categoryIdRef = toRef(props, 'categoryId')
const {
  spotlights,
  loading,
  createSpotlight,
  updateSpotlight,
  deleteSpotlight,
  reorderSpotlights,
} = useRankSpotlights(categoryIdRef)

const handleReorder = () => {
  reorderSpotlights(spotlights.value.map(s => s.id))
}

const isFormOpen = ref(false)
const editingSpotlight = ref<RankSpotlightRow | null>(null)

const openSpotlightForm = (spotlight: RankSpotlightRow | null) => {
  editingSpotlight.value = spotlight
  isFormOpen.value = true
}

const handleSave = (title: string, description: string, imageUrl: string | null) => {
  if (editingSpotlight.value) {
    updateSpotlight(editingSpotlight.value.id, title, description, imageUrl)
  }
  else {
    createSpotlight(title, description, imageUrl)
  }
}

const handleDelete = (id: string) => {
  deleteSpotlight(id)
}

const lightboxImage = ref<string | null>(null)

const handleClick = (spotlight: RankSpotlightRow) => {
  if (isEditMode.value) {
    openSpotlightForm(spotlight)
    return
  }
  if (spotlight.image_url) lightboxImage.value = spotlight.image_url
}
</script>

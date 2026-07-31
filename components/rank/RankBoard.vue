<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2
        :class="[
          'text-2xl font-bold',
          isDarkMode ? 'text-white' : 'text-[#1F1F1F]',
        ]"
      >
        Tier表
      </h2>
      <button
        v-if="isEditMode"
        type="button"
        class="text-sm text-blue-600 hover:text-blue-700 font-medium"
        @click="openTierForm(null)"
      >
        + tierを追加
      </button>
    </div>

    <draggable
      v-model="tiers"
      item-key="id"
      handle=".tier-drag-handle"
      :disabled="!isEditMode"
      class="space-y-3"
      @change="handleTierReorder"
    >
      <template #item="{ element: tier, index }">
        <div
          :class="[
            'flex rounded-xl border overflow-hidden',
            isDarkMode ? 'border-gray-700' : 'border-gray-200',
          ]"
        >
          <button
            type="button"
            :class="[
              'shrink-0 w-16 sm:w-20 flex items-center justify-center font-bold text-white',
              isEditMode ? 'tier-drag-handle cursor-grab' : 'cursor-default',
            ]"
            :style="{ backgroundColor: getTierColor(index, tiers.length) }"
            @click="isEditMode && openTierForm(tier)"
          >
            {{ tier.label }}
          </button>

          <draggable
            :model-value="tier.items"
            item-key="id"
            group="rank-items"
            :disabled="!isEditMode"
            class="flex-1 flex flex-wrap gap-2 p-3 min-h-[4.5rem]"
            :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            @update:model-value="value => (tier.items = value)"
            @change="event => handleItemChange(tier, event)"
          >
            <template #item="{ element: item }">
              <button
                type="button"
                :class="[
                  'flex flex-col items-center gap-1 w-20 p-1.5 rounded-lg border transition-colors',
                  isDarkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-200 hover:border-blue-400',
                  isEditMode ? 'cursor-grab' : 'cursor-default',
                ]"
                @click="handleItemClick(tier, item)"
              >
                <img
                  v-if="item.image_url"
                  :src="item.image_url"
                  alt=""
                  class="w-16 h-16 object-cover rounded"
                >
                <div
                  v-else
                  class="w-16 h-16 rounded bg-gray-200 dark:bg-gray-700"
                />
                <span class="text-xs truncate w-full text-center">{{ item.name }}</span>
              </button>
            </template>
          </draggable>

          <button
            v-if="isEditMode"
            type="button"
            class="shrink-0 w-10 flex items-center justify-center text-gray-400 hover:text-blue-600"
            @click="openItemForm(tier, null)"
          >
            <Plus class="w-5 h-5" />
          </button>
        </div>
      </template>
    </draggable>

    <p
      v-if="!loading && tiers.length === 0"
      class="text-center text-gray-500 dark:text-gray-400 py-12"
    >
      まだtierがありません
    </p>

    <RankTierFormModal
      v-model="isTierFormOpen"
      :tier="editingTier"
      @save="handleTierSave"
      @delete="handleTierDelete"
    />
    <RankItemFormModal
      v-model="isItemFormOpen"
      :item="editingItem"
      @save="handleItemSave"
      @delete="handleItemDelete"
    />
    <RankImageLightbox v-model="lightboxImage" />
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { Plus } from 'lucide-vue-next'
import type { RankItemRow, RankTierRow, RankTierWithItems } from '~/types/rank'
import { useRankBoard } from '~/composables/domains/rankData'
import { useRankAuth } from '~/composables/domains/rankAuth'
import { injectDarkMode } from '~/composables/domains/darkMode'
import { getTierColor } from '~/composables/domains/rankTierColor'

const props = defineProps<{
  categoryId: string
}>()

const { isDarkMode } = injectDarkMode()
const { isEditMode } = useRankAuth()

const categoryIdRef = toRef(props, 'categoryId')
const {
  tiers,
  loading,
  reorderTiers,
  createTier,
  updateTier,
  deleteTier,
  createItem,
  updateItem,
  deleteItem,
  moveItem,
} = useRankBoard(categoryIdRef)

const isTierFormOpen = ref(false)
const editingTier = ref<RankTierRow | null>(null)

const openTierForm = (tier: RankTierRow | null) => {
  editingTier.value = tier
  isTierFormOpen.value = true
}

const handleTierSave = (label: string) => {
  if (editingTier.value) {
    updateTier(editingTier.value.id, label)
  }
  else {
    createTier(label)
  }
}

const handleTierDelete = (id: string) => {
  deleteTier(id)
}

const handleTierReorder = () => {
  reorderTiers(tiers.value.map(t => t.id))
}

const isItemFormOpen = ref(false)
const editingItem = ref<RankItemRow | null>(null)
const editingItemTierId = ref<string | null>(null)

const openItemForm = (tier: RankTierWithItems, item: RankItemRow | null) => {
  editingItemTierId.value = tier.id
  editingItem.value = item
  isItemFormOpen.value = true
}

const handleItemSave = (name: string, imageUrl: string | null) => {
  if (editingItem.value) {
    updateItem(editingItem.value.id, name, imageUrl)
  }
  else if (editingItemTierId.value) {
    createItem(editingItemTierId.value, name, imageUrl)
  }
}

const handleItemDelete = (id: string) => {
  deleteItem(id)
}

const lightboxImage = ref<string | null>(null)

const handleItemClick = (tier: RankTierWithItems, item: RankItemRow) => {
  if (isEditMode.value) {
    openItemForm(tier, item)
    return
  }
  if (item.image_url) lightboxImage.value = item.image_url
}

interface DraggableChangeEvent {
  added?: { element: RankItemRow }
  moved?: { element: RankItemRow }
}

const handleItemChange = (tier: RankTierWithItems, event: DraggableChangeEvent) => {
  const movedElement = event.added?.element ?? event.moved?.element
  if (!movedElement) return
  moveItem(movedElement.id, movedElement.tier_id, tier.id, tier.items.map(i => i.id))
}
</script>

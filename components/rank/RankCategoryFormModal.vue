<template>
  <RankFormModal
    v-model="isOpenModel"
    :title="category ? 'カテゴリを編集' : 'カテゴリを追加'"
    :show-delete="!!category"
    @submit="handleSubmit"
    @delete="handleDelete"
  >
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">カテゴリ名</label>
      <input
        v-model="label"
        type="text"
        required
        placeholder="食べ物"
        :class="[
          'w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors',
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400',
        ]"
      >
    </div>
    <div v-if="!category">
      <label class="block text-xs font-medium text-gray-500 mb-1">URL用キー(半角英数字)</label>
      <input
        v-model="key"
        type="text"
        required
        pattern="[a-z0-9-]+"
        placeholder="例: movie(food, anime, gameは使用済み)"
        :class="[
          'w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors',
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400',
        ]"
      >
    </div>
  </RankFormModal>
</template>

<script setup lang="ts">
import type { RankCategoryRow } from '~/types/rank'
import { injectDarkMode } from '~/composables/domains/darkMode'

const props = defineProps<{
  modelValue: boolean
  category?: RankCategoryRow | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', label: string, key: string): void
  (e: 'delete', id: string): void
}>()

const { isDarkMode } = injectDarkMode()

const label = ref('')
const key = ref('')

const isOpenModel = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})

watch(() => props.modelValue, (open) => {
  if (open) {
    label.value = props.category?.label ?? ''
    key.value = props.category?.key ?? ''
  }
})

const handleSubmit = () => {
  emits('save', label.value, key.value)
  isOpenModel.value = false
}

const handleDelete = () => {
  if (props.category) emits('delete', props.category.id)
  isOpenModel.value = false
}
</script>

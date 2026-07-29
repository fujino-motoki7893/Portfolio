<template>
  <RankFormModal
    v-model="isOpenModel"
    :title="spotlight ? 'スポットライトを編集' : 'スポットライトを追加'"
    :show-delete="!!spotlight"
    @submit="handleSubmit"
    @delete="handleDelete"
  >
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">画像</label>
      <RankImageInput
        v-model="imageUrl"
        folder="spotlights"
      />
    </div>
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">タイトル</label>
      <input
        v-model="title"
        type="text"
        required
        :class="[
          'w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors',
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400',
        ]"
      >
    </div>
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">説明</label>
      <textarea
        v-model="description"
        rows="4"
        :class="[
          'w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors resize-none',
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400',
        ]"
      />
    </div>
  </RankFormModal>
</template>

<script setup lang="ts">
import type { RankSpotlightRow } from '~/types/rank'
import { injectDarkMode } from '~/composables/domains/darkMode'

const props = defineProps<{
  modelValue: boolean
  spotlight?: RankSpotlightRow | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', title: string, description: string, imageUrl: string | null): void
  (e: 'delete', id: string): void
}>()

const { isDarkMode } = injectDarkMode()

const title = ref('')
const description = ref('')
const imageUrl = ref<string | null>(null)

const isOpenModel = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})

watch(() => props.modelValue, (open) => {
  if (open) {
    title.value = props.spotlight?.title ?? ''
    description.value = props.spotlight?.description ?? ''
    imageUrl.value = props.spotlight?.image_url ?? null
  }
})

const handleSubmit = () => {
  emits('save', title.value, description.value, imageUrl.value)
  isOpenModel.value = false
}

const handleDelete = () => {
  if (props.spotlight) emits('delete', props.spotlight.id)
  isOpenModel.value = false
}
</script>

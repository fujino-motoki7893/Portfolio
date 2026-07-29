<template>
  <RankFormModal
    v-model="isOpenModel"
    :title="item ? '項目を編集' : '項目を追加'"
    :show-delete="!!item"
    @submit="handleSubmit"
    @delete="handleDelete"
  >
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">名前</label>
      <input
        v-model="name"
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
      <label class="block text-xs font-medium text-gray-500 mb-1">画像</label>
      <RankImageInput
        v-model="imageUrl"
        folder="items"
      />
    </div>
  </RankFormModal>
</template>

<script setup lang="ts">
import type { RankItemRow } from '~/types/rank'
import { injectDarkMode } from '~/composables/domains/darkMode'

const props = defineProps<{
  modelValue: boolean
  item?: RankItemRow | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', name: string, imageUrl: string | null): void
  (e: 'delete', id: string): void
}>()

const { isDarkMode } = injectDarkMode()

const name = ref('')
const imageUrl = ref<string | null>(null)

const isOpenModel = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})

watch(() => props.modelValue, (open) => {
  if (open) {
    name.value = props.item?.name ?? ''
    imageUrl.value = props.item?.image_url ?? null
  }
})

const handleSubmit = () => {
  emits('save', name.value, imageUrl.value)
  isOpenModel.value = false
}

const handleDelete = () => {
  if (props.item) emits('delete', props.item.id)
  isOpenModel.value = false
}
</script>

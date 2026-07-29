<template>
  <RankFormModal
    v-model="isOpenModel"
    :title="tier ? 'tierを編集' : 'tierを追加'"
    :show-delete="!!tier"
    @submit="handleSubmit"
    @delete="handleDelete"
  >
    <div>
      <label class="block text-xs font-medium text-gray-500 mb-1">ラベル</label>
      <input
        v-model="label"
        type="text"
        required
        placeholder="S, A, B..."
        :class="[
          'w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors',
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400',
        ]"
      >
      <p class="text-xs text-gray-400 mt-1">
        カラーはtierの並び順に応じて自動で設定されます
      </p>
    </div>
  </RankFormModal>
</template>

<script setup lang="ts">
import type { RankTierRow } from '~/types/rank'
import { injectDarkMode } from '~/composables/domains/darkMode'

const props = defineProps<{
  modelValue: boolean
  tier?: RankTierRow | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save' | 'delete', value: string): void
}>()

const { isDarkMode } = injectDarkMode()

const label = ref('')

const isOpenModel = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
})

watch(() => props.modelValue, (open) => {
  if (open) {
    label.value = props.tier?.label ?? ''
  }
})

const handleSubmit = () => {
  emits('save', label.value)
  isOpenModel.value = false
}

const handleDelete = () => {
  if (props.tier) emits('delete', props.tier.id)
  isOpenModel.value = false
}
</script>

<template>
  <div>
    <div
      v-if="modelValue"
      class="mb-2"
    >
      <img
        :src="modelValue"
        alt=""
        class="w-24 h-24 object-cover rounded-lg border"
        :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
      >
    </div>
    <input
      type="file"
      accept="image/*"
      :disabled="isUploading"
      :class="[
        'text-sm',
        isDarkMode ? 'text-gray-300' : 'text-gray-600',
      ]"
      @change="handleFileChange"
    >
    <p
      v-if="isUploading"
      class="text-xs text-gray-400 mt-1"
    >
      アップロード中...
    </p>
    <p
      v-if="errorMessage"
      class="text-xs text-red-500 mt-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { uploadRankImage } from '~/composables/domains/rankData'
import { injectDarkMode } from '~/composables/domains/darkMode'

const props = defineProps<{
  modelValue: string | null
  folder: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const { isDarkMode } = injectDarkMode()
const isUploading = ref(false)
const errorMessage = ref<string | null>(null)

const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  isUploading.value = true
  errorMessage.value = null

  try {
    const url = await uploadRankImage(file, props.folder)
    emits('update:modelValue', url)
  }
  catch {
    errorMessage.value = '画像のアップロードに失敗しました'
  }
  finally {
    isUploading.value = false
  }
}
</script>

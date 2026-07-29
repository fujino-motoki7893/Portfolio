<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        class="absolute inset-0 bg-black/50"
        @click="close"
      />
      <div
        :class="[
          'relative rounded-xl shadow-xl max-w-sm w-full p-6 border',
          isDarkMode ? 'bg-[#2D2D2D] border-gray-600 text-white' : 'bg-white border-gray-200',
        ]"
      >
        <p class="font-semibold mb-2">
          RANKページへ移動します
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          ここから先は完全に趣味のランキングページです。よろしいですか？
        </p>
        <div class="flex gap-3">
          <button
            :class="[
              'flex-1 py-2 rounded-lg border text-sm font-medium transition-colors',
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50',
            ]"
            @click="close"
          >
            やめる
          </button>
          <button
            class="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700
            text-white text-sm font-medium transition-colors"
            @click="confirm"
          >
            見てみる
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { injectDarkMode } from '~/composables/domains/darkMode'

defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const { isDarkMode } = injectDarkMode()

const close = () => emits('update:modelValue', false)
const confirm = () => emits('confirm')
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        class="absolute inset-0 bg-black/50"
        @click="emits('update:modelValue', false)"
      />
      <form
        :class="[
          'relative rounded-xl shadow-xl max-w-md w-full p-6 border max-h-[90vh] overflow-y-auto',
          isDarkMode ? 'bg-[#2D2D2D] border-gray-600 text-white' : 'bg-white border-gray-200',
        ]"
        @submit.prevent="emits('submit')"
      >
        <div class="flex items-center justify-between mb-4">
          <p class="font-semibold">
            {{ title }}
          </p>
          <button
            v-if="showDelete"
            type="button"
            class="text-xs text-red-500 hover:text-red-600 underline"
            @click="emits('delete')"
          >
            削除する
          </button>
        </div>

        <div class="space-y-4">
          <slot />
        </div>

        <div class="flex gap-3 mt-6">
          <button
            type="button"
            :class="[
              'flex-1 py-2 rounded-lg border text-sm font-medium transition-colors',
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50',
            ]"
            @click="emits('update:modelValue', false)"
          >
            キャンセル
          </button>
          <button
            type="submit"
            class="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700
            text-white text-sm font-medium transition-colors"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { injectDarkMode } from '~/composables/domains/darkMode'

defineProps<{
  modelValue: boolean
  title: string
  showDelete?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit' | 'delete'): void
}>()

const { isDarkMode } = injectDarkMode()
</script>

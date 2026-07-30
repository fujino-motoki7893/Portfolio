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
          What's this page?
        </p>
        <p
          :class="[
            'text-sm mb-6 whitespace-pre-line leading-relaxed',
            isDarkMode ? 'text-gray-300' : 'text-gray-600',
          ]"
        >
このページは、藤野のこれまで経験してきたものをtierで表現したものです。
当時のことを思い出しながら書いている部分もございますので、情報が正確でない場合もあります。
何らかの箸休めとして、楽しんでいただけたら幸いです。
        </p>
        <button
          class="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700
          text-white text-sm font-medium transition-colors"
          @click="close"
        >
          閉じる
        </button>
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
}>()

const { isDarkMode } = injectDarkMode()

const close = () => emits('update:modelValue', false)
</script>

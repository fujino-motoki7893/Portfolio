<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      @click="close"
    >
      <div class="absolute inset-0 bg-black/80" />
      <button
        type="button"
        class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white z-10"
        aria-label="閉じる"
        @click="close"
      >
        <X class="w-8 h-8" />
      </button>
      <img
        :src="modelValue"
        alt=""
        class="relative max-w-full max-h-full object-contain rounded-lg"
        @click.stop
      >
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  modelValue: string | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const close = () => emits('update:modelValue', null)
</script>

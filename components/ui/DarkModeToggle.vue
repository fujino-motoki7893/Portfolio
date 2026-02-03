<template>
  <div class="flex items-center gap-2">
    <Sun
      :class="[
        'w-5 h-5 transition-colors duration-300',
        modelValue ? 'text-gray-400' : 'text-yellow-500',
      ]"
    />
    <label
      :class="[
        'inline-block relative w-[50px] h-[25px]',
        'rounded-[25px] border-[2px] border-gray-300',
        'box-content cursor-pointer',
        'transition-colors duration-400',
        'has-[:checked]:border-blue-400',
        'after:absolute after:top-1/2 after:left-[2.5px]',
        'after:-translate-y-1/2 after:w-[22.5px] after:h-[22.5px]',
        'after:rounded-full after:bg-gray-300',
        'after:transition-all after:duration-400',
        'has-[:checked]:after:left-[25px] has-[:checked]:after:bg-blue-400',
      ]"
    >
      <input
        type="checkbox"
        class="hidden"
        :checked="modelValue"
        @change="toggleDarkMode()"
      >
    </label>
    <Moon
      :class="[
        'w-5 h-5 transition-colors duration-300',
        modelValue ? 'text-blue-400' : 'text-gray-400',
      ]"
    />
  </div>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { injectDarkMode } from '~/composables/domains/darkMode'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const { toggleDarkMode } = injectDarkMode()

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    type="checkbox"
    class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    :checked="modelValue"
    @change="onChange"
  >
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

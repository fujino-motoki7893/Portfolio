<template>
  <label
    :class="[
      'inline-block relative w-[50px] h-[25px]',
      'rounded-[25px] border-[2px] border-gray-300',
      'box-content cursor-pointer',
      'transition-colors duration-400',
      'has-[:checked]:border-green-400',
      'after:absolute after:top-1/2 after:left-[2.5px]',
      'after:-translate-y-1/2 after:w-[22.5px] after:h-[22.5px]',
      'after:rounded-full after:bg-gray-300',
      'after:transition-all after:duration-400',
      'has-[:checked]:after:left-[25px] has-[:checked]:after:bg-green-400',
    ]"
  >
    <input
      type="checkbox"
      class="hidden"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    >
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

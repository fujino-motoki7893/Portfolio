<template>
  <img
    :src="imageSrc"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    class="rounded-lg"
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()

const imageSrc = computed(() => {
  // 既に絶対パスなら、そのまま使用
  if (props.src.startsWith('/')) {
    return props.src
  }
  // 相対パスなら、/images/をプレフィックスとして追加
  return `/images/${props.src}`
})
</script>

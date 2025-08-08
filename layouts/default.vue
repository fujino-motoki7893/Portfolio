<template>
  <div :class="{ dark: isDarkMode }">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode, initializeDarkMode } = useDarkMode()

onMounted(() => {
  initializeDarkMode()
})
</script>

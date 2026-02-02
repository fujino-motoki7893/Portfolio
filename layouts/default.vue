<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen flex flex-col"
  >
    <Header />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
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

<template>
  <div
    :class="[
      isDarkMode ? 'bg-[#1F1F1F] text-white' : '',
    ]"
  >
    <HomeSlideshow />
    <HomeIntroduction />
    <HomeFrontend />
    <HomeCloud />
  </div>
</template>

<script setup lang="ts">
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()
</script>

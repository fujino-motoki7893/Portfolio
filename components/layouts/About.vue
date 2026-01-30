<template>
  <div
    :class="[
      isDarkMode ? 'bg-[#1F1F1F] text-white' : '',
    ]"
  >
    <AboutProfile />

    <div class="py-8 lg:py-16" />

    <AboutImportant />

    <div class="py-8 lg:py-16" />

    <AboutTechStack />

    <div class="py-8 lg:py-16" />
  </div>
</template>

<script setup lang="ts">
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()
</script>

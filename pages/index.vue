<template>
  <div>
    <Home />
  </div>
</template>

<script setup lang="ts">
import { provideDarkMode } from '~/composables/domains/darkMode'

provideDarkMode()
</script>

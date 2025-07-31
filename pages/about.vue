<!-- pages/about.vue -->
<template>
  <div>
    <div>
      <header>
        <Header />
      </header>
    </div>
    <div>
      <About />
    </div>
    <div>
      <footer>
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provideDarkMode } from '~/composables/domains/darkMode'

provideDarkMode()
</script>

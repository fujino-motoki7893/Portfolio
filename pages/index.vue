<template>
  <div>
    <div>
      <header>
        <Header />
      </header>
    </div>
    <div>
      <Home />
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

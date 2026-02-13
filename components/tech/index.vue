<template>
  <div
    :class="[
      'flex-1',
      isDarkMode ? 'bg-[#1F1F1F] text-white' : 'bg-white',
    ]"
  >
    <div class="container mx-auto px-4 py-12 lg:py-24">
      <div class="text-center mb-12">
        <h1 class="text-3xl lg:text-4xl font-bold mb-4">
          Tech Blog
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          技術に関する学びや知見を共有します
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div
          v-if="articles && articles.length > 0"
          class="space-y-6"
        >
          <TechArticleCard
            v-for="article in articles"
            :key="article.path"
            :article="article"
          />
        </div>
        <div
          v-else
          class="text-center text-gray-500"
        >
          記事がまだありません
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()

const { data: articles } = await useAsyncData('tech-articles', () =>
  queryCollection('tech').order('date', 'DESC').all(),
)
</script>

<template>
  <div
    :class="[
      isDarkMode ? 'bg-[#1F1F1F] text-white' : '',
    ]"
  >
    <div class="container mx-auto px-4 py-12 lg:py-24">
      <div class="max-w-3xl mx-auto">
        <NuxtLink
          to="/tech"
          :class="[
            'inline-flex items-center gap-2 mb-8 transition-colors',
            isDarkMode
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900',
          ]"
        >
          <ArrowLeft class="w-4 h-4" />
          記事一覧に戻る
        </NuxtLink>

        <article v-if="article">
          <header class="mb-8">
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Calendar class="w-4 h-4" />
              <time :datetime="article.date">
                {{ formatDate(article.date) }}
              </time>
            </div>

            <h1 class="text-3xl lg:text-4xl font-bold mb-4">
              {{ article.title }}
            </h1>

            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{ article.description }}
            </p>

            <div
              v-if="article.tags?.length"
              class="flex flex-wrap gap-2 mt-4"
            >
              <span
                v-for="tag in article.tags"
                :key="tag"
                :class="[
                  'px-3 py-1 text-sm rounded-full',
                  isDarkMode
                    ? 'bg-blue-900/50 text-blue-300'
                    : 'bg-blue-100 text-blue-700',
                ]"
              >
                {{ tag }}
              </span>
            </div>
          </header>

          <div
            :class="[
              'prose max-w-none',
              isDarkMode ? 'prose-invert' : '',
            ]"
          >
            <ContentRenderer :value="article" />
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Calendar } from 'lucide-vue-next'
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()
const route = useRoute()

const { data: article } = await useAsyncData('tech-article', () => {
  return queryCollection('tech').path(route.path).first()
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

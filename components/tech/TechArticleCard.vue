<template>
  <NuxtLink
    :to="article.path"
    class="block"
  >
    <article
      ref="cardRef"
      :class="[
        'p-6 rounded-xl border transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        isDarkMode
          ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
          : 'bg-white border-gray-200 hover:border-blue-400',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      ]"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar class="w-4 h-4" />
          <time :datetime="article.date">
            {{ formatDate(article.date) }}
          </time>
        </div>

        <h2 class="text-xl font-semibold">
          {{ article.title }}
        </h2>

        <p class="text-gray-600 dark:text-gray-400 line-clamp-2">
          {{ article.description }}
        </p>

        <div
          v-if="article.tags?.length"
          class="flex flex-wrap gap-2 mt-2"
        >
          <span
            v-for="tag in article.tags"
            :key="tag"
            :class="[
              'px-3 py-1 text-xs rounded-full',
              isDarkMode
                ? 'bg-blue-900/50 text-blue-300'
                : 'bg-blue-100 text-blue-700',
            ]"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { injectDarkMode } from '~/composables/domains/darkMode'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

interface Article {
  path: string
  title: string
  description: string
  date: string
  tags?: string[]
}

defineProps<{
  article: Article
}>()

const { isDarkMode } = injectDarkMode()

const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver([
  { element: cardRef, isVisible },
], { once: true })

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

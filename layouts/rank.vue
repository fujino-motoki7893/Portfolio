<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen flex flex-col"
  >
    <div
      :class="[
        'w-full text-center text-xs sm:text-sm py-2 px-2 border-b',
        isDarkMode
          ? 'bg-gray-800 border-gray-700 text-gray-400'
          : 'bg-gray-50 border-gray-200 text-gray-500',
      ]"
    >
      ※このページは完全に趣味です。異論は認めます（笑）
    </div>

    <header
      :class="[
        'w-full border-b',
        isDarkMode ? 'bg-[#1F1F1F] border-gray-700' : 'bg-white border-gray-200',
      ]"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <NuxtLink
          to="/"
          :class="[
            'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
            isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600',
          ]"
        >
          <ArrowLeft class="w-4 h-4" />
          ポートフォリオへ戻る
        </NuxtLink>
        <h1
          :class="[
            'text-lg sm:text-xl font-bold',
            isDarkMode ? 'text-white' : 'text-[#1F1F1F]',
          ]"
        >
          RANK
        </h1>
        <RankModeToggle />
      </div>
    </header>

    <div
      v-if="rankError"
      class="w-full bg-red-50 border-b border-red-200 text-red-700 text-sm"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        <span>{{ rankError }}</span>
        <button
          type="button"
          class="text-red-500 hover:text-red-700 font-bold"
          @click="rankError = null"
        >
          ✕
        </button>
      </div>
    </div>

    <RankTabs class="max-w-5xl mx-auto w-full px-4 sm:px-6" />

    <main
      :class="[
        'flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8',
        isDarkMode ? 'bg-[#1F1F1F] text-white' : 'bg-white',
      ]"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useDarkMode } from '~/composables/domains/darkMode'
import { useRankError } from '~/composables/domains/rankData'

const { isDarkMode, initializeDarkMode } = useDarkMode()
const rankError = useRankError()

onMounted(() => {
  initializeDarkMode()
})
</script>

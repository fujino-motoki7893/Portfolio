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
        <!-- 検索・フィルタ・ソート -->
        <div class="mb-8 space-y-4">
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- テキスト検索 -->
            <div class="relative flex-1">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="記事を検索..."
                :class="[
                  'w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-colors',
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400',
                ]"
              >
            </div>

            <!-- タグドロップダウン -->
            <div class="relative">
              <button
                :class="[
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-colors whitespace-nowrap',
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white hover:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 hover:border-blue-400',
                  selectedTags.length > 0 ? (isDarkMode ? 'border-blue-500' : 'border-blue-400') : '',
                ]"
                @click="isTagDropdownOpen = !isTagDropdownOpen"
              >
                <Tag class="w-4 h-4" />
                <span>タグ</span>
                <span
                  v-if="selectedTags.length > 0"
                  :class="[
                    'px-1.5 py-0.5 text-xs rounded-full',
                    isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700',
                  ]"
                >
                  {{ selectedTags.length }}
                </span>
                <ChevronDown
                  class="w-4 h-4 transition-transform"
                  :class="isTagDropdownOpen ? 'rotate-180' : ''"
                />
              </button>

              <!-- ドロップダウンメニュー -->
              <div
                v-if="isTagDropdownOpen"
                :class="[
                  'absolute right-0 z-20 mt-2 w-64 max-h-64 overflow-y-auto rounded-lg border shadow-lg',
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
                ]"
              >
                <div class="p-2">
                  <button
                    v-for="tag in allTags"
                    :key="tag"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedTags.includes(tag)
                        ? (isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700')
                        : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'),
                    ]"
                    @click="toggleTag(tag)"
                  >
                    {{ tag }}
                  </button>
                </div>
              </div>

              <!-- 外側クリックで閉じるオーバーレイ -->
              <div
                v-if="isTagDropdownOpen"
                class="fixed inset-0 z-10"
                @click="isTagDropdownOpen = false"
              />
            </div>

            <!-- 日付ソート -->
            <button
              :class="[
                'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-colors whitespace-nowrap',
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white hover:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 hover:border-blue-400',
              ]"
              @click="sortOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC'"
            >
              <ArrowUpDown class="w-4 h-4" />
              <span>{{ sortOrder === 'DESC' ? '新しい順' : '古い順' }}</span>
            </button>
          </div>

          <!-- 選択中タグのチップ表示 -->
          <div
            v-if="selectedTags.length > 0"
            class="flex flex-wrap gap-2"
          >
            <span
              v-for="tag in selectedTags"
              :key="tag"
              :class="[
                'inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full cursor-pointer transition-colors',
                isDarkMode
                  ? 'bg-blue-900/50 text-blue-300 hover:bg-blue-900/70'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
              ]"
              @click="toggleTag(tag)"
            >
              {{ tag }}
              <X class="w-3 h-3" />
            </span>
            <button
              class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
              @click="selectedTags = []"
            >
              すべて解除
            </button>
          </div>
        </div>

        <!-- 記事一覧 -->
        <div
          v-if="filteredArticles.length > 0"
          class="space-y-6"
        >
          <TechArticleCard
            v-for="article in filteredArticles"
            :key="article.path"
            :article="article"
            @tag-click="addTag"
          />
        </div>
        <div
          v-else-if="articles && articles.length > 0"
          class="text-center text-gray-500 py-12"
        >
          条件に一致する記事がありません
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
import { Search, ChevronDown, ArrowUpDown, X, Tag } from 'lucide-vue-next'
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()

const { data: articles } = await useAsyncData('tech-articles', () =>
  queryCollection('tech').order('date', 'DESC').all(),
)

const searchQuery = ref('')
const selectedTags = ref<string[]>([])
const sortOrder = ref<'DESC' | 'ASC'>('DESC')
const isTagDropdownOpen = ref(false)

const allTags = computed(() => {
  if (!articles.value) return []
  const tags = articles.value.flatMap(a => a.tags || [])
  return [...new Set(tags)].sort()
})

const filteredArticles = computed(() => {
  if (!articles.value) return []
  let result = [...articles.value]

  // テキスト検索
  const query = searchQuery.value.toLowerCase().trim()
  if (query) {
    result = result.filter(a =>
      a.title.toLowerCase().includes(query)
      || a.description.toLowerCase().includes(query),
    )
  }

  // タグフィルタ（AND条件）
  if (selectedTags.value.length > 0) {
    result = result.filter(a =>
      selectedTags.value.every(tag => a.tags?.includes(tag)),
    )
  }

  // 日付ソート
  result.sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime()
    return sortOrder.value === 'DESC' ? -diff : diff
  })

  return result
})

const toggleTag = (tag: string) => {
  const idx = selectedTags.value.indexOf(tag)
  if (idx === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(idx, 1)
  }
}

const addTag = (tag: string) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag)
  }
}
</script>

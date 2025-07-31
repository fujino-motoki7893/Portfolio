<template>
  <div
    :class="[
      'w-full h-[72px] shadow flex justify-center',
      isDarkMode ? 'bg-[#1F1F1F] border-b-1 border-white' : '',
    ]"
  >
    <span class="flex items-center">
      <DarkModeToggle
        v-model="isDarkMode"
      />
    </span>
    <div class="flex w-full max-w-[1280px] items-center font-bold justify-between px-4 md:px-6">
      <NuxtLink
        to="/"
        :class="[
          'text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px] truncate',
          isDarkMode ? 'text-white' : 'text-[#1F1F1F]',
        ]"
        @click="isMenuOpen = false"
      >
        motokifujino.com
      </NuxtLink>

      <nav class="flex items-center">
        <div
          class="hidden sm:flex text-[16px] md:text-[18px] lg:text-[20px] text-gray-600
        space-x-4 md:space-x-8 lg:space-x-12 items-center"
        >
          <NuxtLink
            to="/"
            class="hover:text-blue-600 transition-colors whitespace-nowrap"
            :class="{ 'text-blue-600': $route.path === '/' }"
          >
            HOME
          </NuxtLink>
          <div class="w-[1px] h-[20px] md:h-[24px] bg-gray-300" />
          <NuxtLink
            to="/about"
            class="hover:text-blue-600 transition-colors whitespace-nowrap"
            :class="{ 'text-blue-600': $route.path === '/about' }"
          >
            ABOUT ME
          </NuxtLink>
        </div>

        <div class="sm:hidden relative">
          <button
            class="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="メニューを開く"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>

          <div
            v-show="isMenuOpen"
            class="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border z-50"
          >
            <div class="py-2">
              <NuxtLink
                to="/"
                class="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': $route.path === '/' }"
                @click="isMenuOpen = false"
              >
                HOME
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': $route.path === '/about' }"
                @click="isMenuOpen = false"
              >
                ABOUT ME
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>

  <div
    v-show="isMenuOpen"
    class="fixed inset-0 z-40 sm:hidden"
    @click="isMenuOpen = false"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { DarkModeToggle } from '#components'
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()

const isMenuOpen = ref(false)

const handleResize = () => {
  if (window.innerWidth >= 640) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

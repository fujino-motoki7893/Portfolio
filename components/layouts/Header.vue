<template>
  <header
    :class="[
      'w-full h-[72px] shadow',
      isDarkMode ? 'bg-[#1F1F1F] border-b-1 border-white' : 'bg-white',
    ]"
  >
    <div class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 h-full items-center max-w-7xl mx-auto">
      <div class="col-span-6 sm:col-span-4 lg:col-span-3">
        <NuxtLink
          to="/"
          :class="[
            'text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px] font-bold truncate',
            isDarkMode ? 'text-white' : 'text-[#1F1F1F]',
          ]"
          @click="isMenuOpen = false"
        >
          motokifujino.com 
        </NuxtLink>
      </div>

      <div class="col-span-6 sm:col-span-8 lg:col-span-9 flex justify-end">
        <nav class="flex items-center space-x-3 sm:space-x-4">
          <div class="flex items-center">
            <DarkModeToggle
              v-model="isDarkMode"
              class="scale-75 sm:scale-90 md:scale-100"
            />
          </div>

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
            <NuxtLink
              to="/gallery"
              class="hover:text-blue-600 transition-colors whitespace-nowrap"
              :class="{ 'text-blue-600': $route.path === '/gallery' }"
            >
              GALLERY
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

          <!-- モバイルメニュー -->
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
              :class="[
                'absolute right-0 top-full mt-2 w-48 shadow-lg rounded-lg border z-50',
                isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : 'bg-white border-gray-200',
              ]"
            >
              <div class="py-2">
                <NuxtLink
                  to="/"
                  :class="[
                    'block px-4 py-3 transition-colors',
                    isDarkMode
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
                    {
                      'text-blue-400 bg-gray-700': $route.path === '/' && isDarkMode,
                      'text-blue-600 bg-blue-50': $route.path === '/' && !isDarkMode,
                    },
                  ]"
                  @click="isMenuOpen = false"
                >
                  HOME
                </NuxtLink>
                <NuxtLink
                  to="/gallery"
                  :class="[
                    'block px-4 py-3 transition-colors',
                    isDarkMode
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
                    {
                      'text-blue-400 bg-gray-700': $route.path === '/gallery' && isDarkMode,
                      'text-blue-600 bg-blue-50': $route.path === '/gallery' && !isDarkMode,
                    },
                  ]"
                  @click="isMenuOpen = false"
                >
                  GALLERY
                </NuxtLink>
                <NuxtLink
                  to="/about"
                  :class="[
                    'block px-4 py-3 transition-colors',
                    isDarkMode
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
                    {
                      'text-blue-400 bg-gray-700': $route.path === '/about' && isDarkMode,
                      'text-blue-600 bg-blue-50': $route.path === '/about' && !isDarkMode,
                    },
                  ]"
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
  </header>
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

<template>
  <div class="w-full bg-[#595959] text-white font-bold">
    <!-- デスクトップレイアウト -->
    <div class="hidden lg:flex justify-between h-92 p-7.5 py-12.5">
      <div class="flex flex-col py-8 justify-end">
        <span class="text-[36px]">
          motokifujino.com
        </span>
        <p class="text-[20px] pt-6">
          This site is made by
          <a
            href="/"
            class="underline hover:text-gray-300"
          >motoki fujino</a>, Icons by
          <a
            href="https://lucide.dev/  "
            class="underline hover:text-gray-300"
          >Lucide</a>.
        </p>
      </div>
      <div class="flex flex-col py-8">
        <nav class="flex text-[36px] space-x-12 items-end justify-end pr-18">
          <NuxtLink
            to="/"
            class="hover:text-gray-300"
            :class="{ '': $route.path === '/' }"
          >
            HOME
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="hover:text-gray-300"
            :class="{ '': $route.path === '/about' }"
          >
            ABOUT ME
          </NuxtLink>
        </nav>
        <nav class="flex space-x-12 items-end justify-end pr-24 pt-16">
          <a
            href="https://x.com/motoki_f_7893  "
            class="w-18 h-18 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 text-[48px]"
          >
            X
          </a>
          <a
            href="https://github.com/fujino-motoki7893  "
            class="w-18 h-18 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
          >
            <Github
              :size="48"
              color="white"
            />
          </a>
        </nav>
      </div>
    </div>

    <!-- タブレット・モバイルレイアウト -->
    <div class="lg:hidden p-6 md:p-8">
      <!-- サイト名 -->
      <div class="text-center mb-8">
        <span class="text-2xl md:text-3xl">
          motokifujino.com
        </span>
      </div>

      <!-- ナビゲーション -->
      <nav class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
        <NuxtLink
          to="/"
          class="text-xl md:text-2xl hover:text-gray-300"
          :class="{ '': $route.path === '/' }"
        >
          HOME
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-xl md:text-2xl hover:text-gray-300"
          :class="{ '': $route.path === '/about' }"
        >
          ABOUT ME
        </NuxtLink>
      </nav>

      <!-- ソーシャルリンク -->
      <nav class="flex justify-center space-x-6 mb-8">
        <a
          href="https://x.com/motoki_f_7893"
          class="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center
          hover:bg-gray-800 text-2xl md:text-3xl"
        >
          X
        </a>
        <a
          href="https://github.com/fujino-motoki7893"
          class="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
        >
          <Github
            :size="32"
            class="md:w-10 md:h-10"
            color="white"
          />
        </a>
      </nav>

      <!-- クレジット -->
      <div class="text-center">
        <p class="text-sm md:text-base">
          This site is made by
          <a
            href="/"
            class="underline hover:text-gray-300"
          >motoki fujino</a>, Icons by
          <a
            href="https://lucide.dev/"
            class="underline hover:text-gray-300"
          >Lucide</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github } from 'lucide-vue-next'
</script>

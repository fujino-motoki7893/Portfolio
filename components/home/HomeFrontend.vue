<template>
  <div class="w-full">
    <div
      ref="sectionRef"
      class="grid grid-cols-12 gap-4 lg:gap-8 items-center min-h-[400px] opacity-0 transition-all
        duration-1000 ease-out transform"
      :class="{ 'opacity-100 translate-x-0': isVisible }"
    >
      <div class="col-span-12 lg:col-span-4 order-2 lg:order-1">
        <NuxtImg
          src="./town-cut.png"
          alt="モダンフロントエンド技術"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          class="w-full h-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[531px]
            xl:max-w-[600px] object-cover mx-auto lg:mx-0"
        />
      </div>

      <div
        class="col-span-12 lg:col-span-8 order-1 lg:order-2 flex items-center"
      >
        <div class="w-full text-base sm:text-lg lg:text-xl py-8 lg:py-0 px-6 sm:px-8 lg:px-[172px]">
          <div class="flex font-bold text-xl sm:text-2xl lg:text-[32px] justify-center py-8 lg:py-16">
            モダンフロントエンド技術
          </div>
          <p class="pb-6 lg:pb-10">
            現代のWebサービスに不可欠な、高品質なUI/UXと高いメンテナンス性を両立できるフロントエンド開発のエキスパートを目指します。
          </p>
          <p class="pb-6 lg:pb-10">
            UI/UXの構築に純粋な楽しさを感じることが学習の原動力です。その上で、優れたUI/UXは事業の成功に直結すると確信しており、
            TypeScriptによる型安全性やNuxt.jsのようなフレームワークを使いこなす専門性は、エンジニアとして事業に貢献する上で極めて重要だと考えています。
          </p>
          <p class="pb-6 lg:pb-10">
            個人開発においてNuxt.jsとTypeScriptを用いたWebアプリケーションを構築中。今後は、状態管理ライブラリの比較検証や、
            Server Side Renderingにおけるパフォーマンス計測など、より実務に近い課題解決に取り組んでいきます。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver([
  { element: sectionRef, isVisible },
])
</script>

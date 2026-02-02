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
            AIコーディング
          </div>
          <p class="pb-6 lg:pb-10">
            AIを開発プロセスに組み込み、品質と生産性を両立できるエンジニアを目指します。
          </p>
          <p class="pb-6 lg:pb-10">
            AIは単なる効率化ツールではなく、開発の在り方そのものを変える存在だと考えています。
            フロントエンドからバックエンドまで、AIを活用することで領域を問わず開発できる時代になりました。
            だからこそ、AIを適切に導き、本質的な課題解決に集中できるエンジニアでありたいと考えています。
          </p>
          <p class="pb-6 lg:pb-10">
            現在はClaude CodeなどのAIツールを日常的に活用し、開発効率を高めています。
            今後は、AIエージェントの構築やプロンプトエンジニアリングの深化など、
            AI活用の専門性をさらに磨いていきたいと考えています。
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

<template>
  <div class="w-full">
    <div
      ref="sectionRef"
      class="grid grid-cols-12 gap-4 lg:gap-8 items-center min-h-[400px] opacity-0 transition-all
        duration-1000 ease-out transform"
      :class="{ 'opacity-100 translate-x-0': isVisible }"
    >
      <div class="col-span-12 lg:col-span-8 lg:col-start-1 order-1 flex items-center px-6 sm:px-8 lg:px-[172px]">
        <div class="w-full text-base sm:text-lg lg:text-xl py-8 lg:py-0">
          <div class="flex font-bold text-xl sm:text-2xl lg:text-[32px] justify-center py-8 lg:py-16">
            クラウド技術
          </div>
          <p class="pb-6 lg:pb-10">
            プロダクトの品質は、インフラの設計で決まると考えています。
            信頼性・スケーラビリティ・コストを意識した基盤構築ができるエンジニアを目指します。
          </p>
          <p class="pb-6 lg:pb-10">
            AIがコードを書く時代においても、そのコードがどこで、どのように動くかを設計する力は不可欠です。
            クラウドの活用方法がサービスの成否を左右するからこそ、インフラを深く理解し、
            最適な構成を選定できる力を磨いています。
          </p>
          <p class="pb-6 lg:pb-10">
            現在はAWSを中心に、CloudFront, RDS, ECS, Cognitoなどを活用したアーキテクチャの構築・運用に取り組んでいます。
            IaCやCI/CDパイプラインの整備など、運用を見据えた基盤づくりにも注力しています。
          </p>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 2xl:col-end-13 order-2 lg:order-2">
        <div class="flex justify-center lg:justify-end 2xl:justify-end">
          <NuxtImg
            src="./cloud_edit.jpg"
            alt="クラウド技術"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            class="w-full h-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[531px] xl:max-w-[600px] object-cover"
          />
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

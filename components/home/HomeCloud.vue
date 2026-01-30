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
            アプリケーションが稼働するインフラまでを理解し、プロダクト全体の品質（信頼性・スケーラビリティ・コスト）に貢献できるエンジニアを目指します。
          </p>
          <p class="pb-6 lg:pb-10">
            自身が書いたコードが、どのようなインフラ上で、どのように運用されているかを理解することは、アプリケーション開発者の責務だと考えています。
            サービスの信頼性やコストはクラウドの活用方法に大きく左右されるため、インフラを意識した開発は不可欠です。
          </p>
          <p class="pb-6 lg:pb-10">
            個人開発でAWSを利用し、Cloudfront, API Gateway, DynamoDB, S3, Lambdaなどを活用して、サーバーレスなバックエンド構成とインフラストラクチャのコスト感を学習中です。
            今後は、フロントからインフラまでを一貫して構築・運用する経験を積む計画です。
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

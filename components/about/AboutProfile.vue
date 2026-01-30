<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-12 gap-4 lg:gap-8 items-center min-h-[400px] py-8 lg:py-16">
      <div
        ref="imageSection"
        class="col-span-12 lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1
        opacity-0 transition-all duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isImageVisible }"
      >
        <NuxtImg
          src="./fujino_ago.jpg"
          alt="藤野元規"
          loading="lazy"
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 500px"
          class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-125 lg:h-125
          transform transition-all duration-500 hover:scale-105 rounded-full object-cover"
        />
      </div>

      <div
        ref="textSection"
        class="col-span-12 lg:col-span-6 order-1 lg:order-2 opacity-0 transition-all
        duration-1000 ease-out transform"
        :class="{ 'opacity-100 translate-x-0': isTextVisible }"
      >
        <div
          class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl opacity-0
        animate-name-fade text-center lg:text-left mb-6"
        >
          藤野 元規
          <span class="block sm:inline p-2 sm:p-4">
            MOTOKI
          </span>
          <span class="block sm:inline">
            FUJINO
          </span>
        </div>
        <div class="text-sm sm:text-base lg:text-lg xl:text-xl leading-[1.67] tracking-[2px] lg:tracking-[4px]">
          <p class="mb-4">
            幼少期からコンピューターが好きで、将来の夢は「コンピュータープログラマーだ！」と周りに言いふらしていました。
          </p>
          <p class="mb-4">
            中学時代にシステムについて学びたいと考え、広島商船高等専門学校の流通情報工学科に入学。ITの基礎を学びました。
          </p>
          <p class="mb-4">
            そこからクラウドについて開発経験を積むため、2022年に株式会社FIXERへ参画。全国規模のシステム運用・保守や、大規模システムの詳細設計・開発を経て今に至ります。
          </p>
          <p class="mb-4">
            ・・・
          </p>
          <p class="mb-4">
            趣味はゲーム・漫画・アニメなど、オタク文化ならだいたい好きです。本人曰く、「Fate に時間を、SAOに仕事を、化物語に人格を奪われた！ゆるせない！」だそうです。許せないとは、、、？
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

const imageSection = ref<HTMLElement | null>(null)
const textSection = ref<HTMLElement | null>(null)

const isImageVisible = ref(false)
const isTextVisible = ref(false)

useIntersectionObserver(
  [
    { element: imageSection, isVisible: isImageVisible },
    { element: textSection, isVisible: isTextVisible },
  ],
  {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    once: true,
  },
)
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-name-fade {
  animation: fadeInUp 0.8s ease-out 0.3s forwards;
}
</style>

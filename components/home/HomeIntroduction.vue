<template>
  <div class="container w-full py-8 sm:py-12 lg:py-16 mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-12 gap-4 lg:gap-8">
      <div
        ref="sectionRef"
        class="col-span-12 lg:col-span-8 lg:col-start-3 flex justify-center opacity-0 transition-all
          duration-1000 ease-out transform translate-y-8"
        :class="[
          isVisible ? 'opacity-100 translate-y-0' : '',
        ]"
      >
        <div class="text-sm sm:text-base lg:text-lg">
          <p class="pb-4 sm:pb-5">
            はじめまして。藤野 元規と申します。当ポートフォリオをご覧いただき、ありがとうございます。
          </p>
          <p class="pb-4 sm:pb-5">
            私は、単にコードを書くだけのエンジニアで終わりたくありません。技術力でチームを牽引する「一流のエンジニア」になることを目標に、日々スキルを磨いています。
          </p>
          <p class="pb-4 sm:pb-5">
            そのために、現在はモダンなフロントエンド技術を軸に開発経験を積んでいますが、今後は領域を限定せず、
            様々な技術やアーキテクチャに触れていきたいと考えています。幅広い選択肢の中から最適な技術を選定できる
            視野を養い、自身のキャリアの可能性を見極めていきたいです。
          </p>
          <p class="pb-4 sm:pb-5">
            最終的には、
            <span class="font-bold">
              要件定義や設計といった上流工程から、タスク管理、コードレビュー、チームマネジメントまで、
              開発プロセス全体に責任を持てるエンジニア
            </span>
            になることが目標です。プレイヤーとしての実力と、プロジェクト
            を俯瞰する視点を両立させ、事業の成長に根本から貢献できる存在になりたいと考えています。
          </p>
          <p class="pb-4 sm:pb-5">
            私のこれまでの経験とこれからの情熱が、貴社の力になれると信じています。ぜひ一度お話をお聞かせください。
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

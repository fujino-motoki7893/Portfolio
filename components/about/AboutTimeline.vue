<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-12 gap-4 lg:gap-8 items-start min-h-[300px] py-8 lg:py-16">
      <div
        ref="titleSection"
        class="col-span-12 lg:col-span-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold
        text-center lg:text-left mb-6 lg:mb-0 opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isTitleVisible }"
      >
        経歴
      </div>

      <div
        ref="contentSection"
        class="col-span-12 lg:col-span-9 opacity-0 transition-all
        duration-1000 ease-out transform"
        :class="{ 'opacity-100 translate-x-0': isContentVisible }"
      >
        <div class="relative">
          <!-- タイムライン線 -->
          <div
            class="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5
            bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
          />

          <!-- タイムラインアイテム -->
          <div class="space-y-8">
            <div
              v-for="(item, index) in timeline"
              :key="index"
              class="relative pl-12 sm:pl-16"
            >
              <!-- ドット -->
              <div
                class="absolute left-2 sm:left-4 top-1 w-4 h-4 sm:w-5 sm:h-5
                rounded-full border-3 border-white dark:border-gray-800
                shadow-lg"
                :class="item.dotColor"
              />

              <!-- コンテンツ -->
              <div
                class="group p-4 sm:p-5 rounded-xl bg-white/50 dark:bg-gray-800/50
                border border-gray-200 dark:border-gray-700
                hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <span
                    class="px-3 py-1 text-xs sm:text-sm font-bold rounded-full"
                    :class="item.badgeColor"
                  >
                    {{ item.year }}
                  </span>
                  <h3 class="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                    {{ item.title }}
                  </h3>
                </div>
                <p class="text-sm sm:text-base text-gray-800 dark:text-gray-400 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

interface TimelineItem {
  year: string
  title: string
  description: string
  dotColor: string
  badgeColor: string
}

const timeline: TimelineItem[] = [
  {
    year: '2017年4月',
    title: '広島商船高等専門学校 入学',
    description:
      '流通情報工学科にて基礎的なITスキルを習得。プログラミング、データベース、ネットワークなど幅広い分野を学ぶ。',
    dotColor: 'bg-blue-500',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  },
  {
    year: '2022年4月',
    title: '株式会社FIXER 入社',
    description:
      'クラウドインテグレーション事業を展開する企業に入社。クラウド技術を活用したシステム開発の世界へ。',
    dotColor: 'bg-purple-500',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  },
  {
    year: '2022年5月',
    title: '新型コロナウイルス感染症 発生届管理システム 参画',
    description:
      '全国規模の発生届管理システム開発に参画。運用・保守から詳細設計・開発まで幅広く担当。',
    dotColor: 'bg-green-500',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  },
  {
    year: '2024年4月',
    title: '全国標準電子カルテ初期型開発 参画',
    description:
      '官公庁との協業による全国標準電子カルテの初期型の開発に参画。外注検査のシステム設計・チームマネジメントを担当。',
    dotColor: 'bg-indigo-500',
    badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
  },
  {
    year: '2025年5月',
    title: '地域通貨ポイント機能開発 参画',
    description:
      '地域通貨プラットフォームへのポイント機能追加に参画。フロントの画面設計・開発、テストを担当。',
    dotColor: 'bg-amber-500',
    badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  },
  {
    year: '2025年7月',
    title: '生成AI ダルマ生成サービス 参画',
    description:
      '生成AIを活用した本人そっくりのダルマ生成サービスの開発に参画。ウェブ・モバイルアプリ両方を考慮したインフラ設計を担当。',
    dotColor: 'bg-rose-500',
    badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
  },
  {
    year: '2025年12月',
    title: 'オンライン服薬指導システム 参画',
    description:
      'オンライン服薬指導システムの開発に参画。Twilioを活用したSMS/架電のリマインド業務を完全自動化する業務に着手',
    dotColor: 'bg-teal-500',
    badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
  },
]

const titleSection = ref<HTMLElement | null>(null)
const contentSection = ref<HTMLElement | null>(null)

const isTitleVisible = ref(false)
const isContentVisible = ref(false)

useIntersectionObserver(
  [
    { element: titleSection, isVisible: isTitleVisible },
    { element: contentSection, isVisible: isContentVisible },
  ],
  {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    once: true,
  },
)
</script>

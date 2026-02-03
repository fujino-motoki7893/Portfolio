<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-12 gap-4 lg:gap-8 items-start min-h-[400px] py-8 lg:py-16">
      <div
        ref="titleSection"
        class="col-span-12 lg:col-span-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold
        text-center lg:text-left mb-6 lg:mb-0 opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isTitleVisible }"
      >
        たいせつなこと
      </div>

      <div
        ref="contentSection"
        class="col-span-12 lg:col-span-9 opacity-0 transition-all
        duration-1000 ease-out transform"
        :class="{ 'opacity-100 translate-x-0': isContentVisible }"
      >
        <div class="grid gap-6">
          <!-- カード1: 共同 -->
          <div
            class="group relative p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50
            dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800
            hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-500/10
                flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <MessageSquare :size="28" class="text-green-600 dark:text-green-400" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg sm:text-xl font-bold mb-3 text-green-800 dark:text-green-300">
                  1. 共同が生み出す、一人を超えた価値
                </h3>
                <p class="text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-300">
                  多様な視点を持つ仲間と敬意をもって議論を交わし、互いの知見を掛け合わせるプロセスこそ、質の高いプロダクト開発に不可欠だと考えています。私が持つ知識も誰かから教わったものであり、
                  それを次の誰かに繋いでいく。そんな知識の好循環を生み出すことで、チーム全体の力を高めることに貢献します。
                </p>
              </div>
            </div>
          </div>

          <!-- カード2: 当事者意識 -->
          <div
            class="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50
            dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800
            hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10
                flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <UserRound :size="28" class="text-blue-600 dark:text-blue-400" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg sm:text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                  2. 「誰かのため」という実感が生む、当事者意識
                </h3>
                <p class="text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-300">
                  自分が書いたコードが、どのようにユーザーの課題を解決し、事業の成長に貢献しているのか。その繋がりを明確に感じられることに、私は最大のやりがいを感じます。人づてにでも「ありがとう」と感謝される喜びが、
                  私を「もっと良くしたい」という次なる行動へと駆り立てます。常に目的意識と当事者意識を持ち、ユーザーとビジネスに寄り添った本質的な価値提供を追求します。
                </p>
              </div>
            </div>
          </div>

          <!-- カード3: 知的好奇心 -->
          <div
            class="group relative p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50
            dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800
            hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-orange-500/10
                flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <Lightbulb :size="28" class="text-orange-600 dark:text-orange-400" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg sm:text-xl font-bold mb-3 text-orange-800 dark:text-orange-300">
                  3. 知的好奇心が生む、未来への挑戦
                </h3>
                <p class="text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-300">
                  「この技術を使えば、もっとスマートな解決ができるのでは」と考えるプロセスそのものに、大きな喜びを感じます。現在は特にクラウド技術（AWS）に関心があり、
                  スケーラブルで堅牢なシステムアーキテクチャの設計・運用に挑戦することで、プロダクトの価値をさらに高めていきたいと考えています。
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
import {
  MessageSquare,
  UserRound,
  Lightbulb,
} from 'lucide-vue-next'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

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

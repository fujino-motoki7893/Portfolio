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
        class="col-span-12 lg:col-span-9 leading-[1.67] tracking-[2px] lg:tracking-[4px]
        text-base sm:text-lg lg:text-xl opacity-0 transition-all
        duration-1000 ease-out transform"
        :class="{ 'opacity-100 translate-x-0': isContentVisible }"
      >
        <div class="font-bold mb-6">
          <span class="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-xl lg:text-2xl mb-4">
            <span class="mb-2 sm:mb-0">1. 共同が生み出す、一人を超えた価値</span>
            <span class="px-0 sm:px-2">
              <MessageSquare
                :size="32"
                class="sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                color="green"
              />
            </span>
          </span>
          <p class="font-normal">
            多様な視点を持つ仲間と敬意をもって議論を交わし、互いの知見を掛け合わせるプロセスこそ、質の高いプロダクト開発に不可欠だと考えています。私が持つ知識も誰かから教わったものであり、
            それを次の誰かに繋いでいく。そんな知識の好循環を生み出すことで、チーム全体の力を高めることに貢献します。
          </p>
        </div>
        <div class="font-bold mb-6">
          <span class="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-xl lg:text-2xl mb-4">
            <span class="mb-2 sm:mb-0">2. 「誰かのため」という実感が生む、当事者意識</span>
            <span class="px-0 sm:px-2">
              <UserRound
                :size="32"
                class="sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                color="blue"
              />
            </span>
          </span>
          <p class="font-normal">
            自分が書いたコードが、どのようにユーザーの課題を解決し、事業の成長に貢献しているのか。その繋がりを明確に感じられることに、私は最大のやりがいを感じます。人づてにでも「ありがとう」と感謝される喜びが、
            私を「もっと良くしたい」という次なる行動へと駆り立てます。常に目的意識と当事者意識を持ち、ユーザーとビジネスに寄り添った本質的な価値提供を追求します。
          </p>
        </div>
        <div class="font-bold mb-6">
          <span class="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-xl lg:text-2xl mb-4">
            <span class="mb-2 sm:mb-0">3. 知的好奇心が生む、未来への挑戦</span>
            <span class="px-0 sm:px-2">
              <Lightbulb
                :size="32"
                class="sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                color="orange"
              />
            </span>
          </span>
          <p class="font-normal">
            「この技術を使えば、もっとスマートな解決ができるのでは」と考えるプロセスそのものに、大きな喜びを感じます。現在は特にクラウド技術（AWS）に関心があり、
            スケーラブルで堅牢なシステムアーキテクチャの設計・運用に挑戦することで、プロダクトの価値をさらに高めていきたいと考えています。
          </p>
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

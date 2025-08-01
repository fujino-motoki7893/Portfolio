<template>
  <div
    :class="[
      'px-4 sm:px-6 lg:px-8',
      isDarkMode ? 'bg-[#1F1F1F] text-white' : '',
    ]"
  >
    <div class="flex flex-col lg:flex-row min-h-[400px] lg:h-200">
      <div
        ref="profileImageSection"
        class="flex justify-center lg:justify-start px-4 sm:px-8 lg:px-57.5 w-full lg:w-240 items-center
        order-2 lg:order-1 opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isProfileImageVisible }"
      >
        <NuxtImg
          provider="s3"
          src="/images/fujino_ago.jpg"
          alt="藤野元規"
          class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-125 lg:h-125 transform transition-all
          duration-500 hover:scale-105 rounded-full object-cover"
        />
      </div>
      <div
        ref="profileTextSection"
        class="flex flex-col py-8 lg:py-25 w-full lg:w-240 order-1 lg:order-2 opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[30px]"
        :class="{ 'opacity-100 translate-x-0': isProfileTextVisible }"
      >
        <div class="text-2xl sm:text-3xl lg:text-[40px] opacity-0 animate-name-fade text-center lg:text-left">
          藤野 元規
          <span class="block sm:inline p-2 sm:p-4">
            MOTOKI
          </span>
          <span class="block sm:inline">
            FUJINO
          </span>
        </div>
        <div class="text-lg sm:text-xl lg:text-[40px] flex-col py-4 sm:py-6 lg:py-8 pr-0 lg:pr-16">
          <span class="text-sm sm:text-base lg:text-[24px] leading-[1.67] tracking-[2px] lg:tracking-[4px]">
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
            <p class="mb-4">
              座右の銘はメンタリティとお気に入りのプレイリストさえあれば生きていけるです。えへへ ^ ^
            </p>
          </span>
        </div>
      </div>
    </div>

    <div class="p-8 lg:p-16" />

    <div class="flex flex-col lg:flex-row min-h-[400px] lg:h-[566px] py-8 lg:py-0">
      <div
        ref="importantTitleSection"
        class="text-2xl sm:text-3xl lg:text-[40px] w-full lg:w-[418px] flex justify-center font-bold px-4
        sm:px-8 lg:px-16 mb-6 lg:mb-0 opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isImportantTitleVisible }"
      >
        たいせつなこと
      </div>
      <div
        ref="importantContentSection"
        class="flex flex-col w-full lg:w-[1438px] leading-[1.67] tracking-[2px] lg:tracking-[4px] pr-0 lg:pr-16
        text-base sm:text-lg lg:text-[20px] opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isImportantContentVisible }"
      >
        <div class="font-bold mb-6">
          <span class="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-xl lg:text-[24px] mb-4">
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
          <span class="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-xl lg:text-[24px] mb-4">
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
          <span class="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-xl lg:text-[24px] mb-4">
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

    <div class="p-8 lg:p-16" />

    <div class="flex flex-col lg:flex-row py-8 lg:py-0">
      <div
        ref="techTitleSection"
        class="text-2xl sm:text-3xl lg:text-[40px] w-full lg:w-[418px] flex justify-center font-bold px-4 sm:px-8
        lg:px-16 mb-6 lg:mb-0 opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isTechTitleVisible }"
      >
        技術スタック
      </div>
      <div
        ref="techContentSection"
        class="flex flex-col w-full lg:w-[1438px] pr-0 lg:pr-16 pt-0 lg:pt-4 text-base sm:text-lg lg:text-[20px]
        tracking-[1px] lg:tracking-[2px] opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isTechContentVisible }"
      >
        <div class="flex flex-col lg:flex-row mb-6 lg:mb-8">
          <span class="font-bold w-full lg:w-[198px] text-lg sm:text-xl lg:text-[24px] mb-2 lg:mb-0">
            フロントエンド...
          </span>
          <p class="w-full lg:w-[1220px]">
            TypeScript, JavaScript, HTML/CSS, Nuxt.js, Vue.js, pnpm, codegen, Tailwind.css, Figma, 単一責任の原則、
            アトミックデザイン（縛られ過ぎない程度に）
          </p>
        </div>
        <div class="flex flex-col lg:flex-row mb-6 lg:mb-8">
          <span class="font-bold w-full lg:w-[198px] text-lg sm:text-xl lg:text-[24px] mb-2 lg:mb-0">
            バックエンド...
          </span>
          <p class="w-full lg:w-[1220px]">
            C#, ASP.NET Core, GraphQL, REST, Swagger, Nitro, クリーンアーキテクチャ, Repository pattern, Jet Brains Rider
          </p>
        </div>
        <div class="flex flex-col lg:flex-row mb-6 lg:mb-8">
          <span class="font-bold w-full lg:w-[198px] text-lg sm:text-xl lg:text-[24px] mb-2 lg:mb-0">
            データベース・<br class="hidden lg:block">インフラ...
          </span>
          <p class="w-full lg:w-[1220px]">
            GraphQL, PostgreSQL, SQL Server, A5:SQL Mk-2, DBeaver, Azure（DevOps Services, Front Door, SQL Database,
            Virtual Machines, Container Registry, Kubernetes Services, Functions）, AWS（Lambda, Cloud Watch,
            S3, Cloudfront, API Gateway, RDS, DynamoDB）, GitOps, GitHub, Grafana, Google Analytics
          </p>
        </div>
      </div>
    </div>
    <div class="p-8 lg:p-16" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  MessageSquare,
  UserRound,
  Lightbulb,
} from 'lucide-vue-next'
import { injectDarkMode } from '~/composables/domains/darkMode'

const { isDarkMode } = injectDarkMode()

const profileImageSection = ref(null)
const profileTextSection = ref(null)
const importantTitleSection = ref(null)
const importantContentSection = ref(null)
const techTitleSection = ref(null)
const techContentSection = ref(null)

const isProfileImageVisible = ref(false)
const isProfileTextVisible = ref(false)
const isImportantTitleVisible = ref(false)
const isImportantContentVisible = ref(false)
const isTechTitleVisible = ref(false)
const isTechContentVisible = ref(false)

const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px',
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === profileImageSection.value) {
          isProfileImageVisible.value = true
        }
        else if (entry.target === profileTextSection.value) {
          isProfileTextVisible.value = true
        }
        else if (entry.target === importantTitleSection.value) {
          isImportantTitleVisible.value = true
        }
        else if (entry.target === importantContentSection.value) {
          isImportantContentVisible.value = true
        }
        else if (entry.target === techTitleSection.value) {
          isTechTitleVisible.value = true
        }
        else if (entry.target === techContentSection.value) {
          isTechContentVisible.value = true
        }
      }
    })
  }, observerOptions)

  if (profileImageSection.value) observer.observe(profileImageSection.value)
  if (profileTextSection.value) observer.observe(profileTextSection.value)
  if (importantTitleSection.value) observer.observe(importantTitleSection.value)
  if (importantContentSection.value) observer.observe(importantContentSection.value)
  if (techTitleSection.value) observer.observe(techTitleSection.value)
  if (techContentSection.value) observer.observe(techContentSection.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
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

.animate-text-fade-1 {
  animation: fadeInUp 0.6s ease-out 0.6s forwards;
}

.animate-text-fade-2 {
  animation: fadeInUp 0.6s ease-out 0.8s forwards;
}

.animate-text-fade-3 {
  animation: fadeInUp 0.6s ease-out 1.0s forwards;
}

.animate-text-fade-4 {
  animation: fadeInUp 0.6s ease-out 1.2s forwards;
}

.animate-text-fade-5 {
  animation: fadeInUp 0.6s ease-out 1.4s forwards;
}

.animate-text-fade-6 {
  animation: fadeInUp 0.6s ease-out 1.6s forwards;
}

.animate-important-1 {
  animation: fadeInUp 0.6s ease-out 0.3s forwards;
}

.animate-important-2 {
  animation: fadeInUp 0.6s ease-out 0.6s forwards;
}

.animate-important-3 {
  animation: fadeInUp 0.6s ease-out 0.9s forwards;
}

.animate-tech-1 {
  animation: fadeInUp 0.6s ease-out 0.3s forwards;
}

.animate-tech-2 {
  animation: fadeInUp 0.6s ease-out 0.6s forwards;
}

.animate-tech-3 {
  animation: fadeInUp 0.6s ease-out 0.9s forwards;
}
</style>

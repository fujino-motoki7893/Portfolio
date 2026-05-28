<template>
  <div
    :class="[
      'min-h-screen',
      isDarkMode ? 'bg-[#1F1F1F] text-white' : 'bg-white text-gray-900',
    ]"
  >
    <section class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="col-span-12 grid place-items-center">
        <div class="relative w-full max-w-7xl">
          <NuxtImg
            src="./スライド1_調整.PNG"
            alt="技術スタック"
            loading="eager"
            sizes="(max-width: 1280px) 100vw, 1280px"
            class="w-full aspect-[1280/634] object-cover opacity-0 animate-fade-in rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>

    <section
      ref="textSection"
      class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 opacity-0 transition-all
      duration-1000 ease-out transform translate-y-8"
      :class="[
        isTextVisible ? 'opacity-100 translate-y-0' : '',
      ]"
    >
      <div class="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
        <div class="grid gap-6">
          <div class="grid gap-4 text-sm sm:text-base lg:text-lg leading-relaxed">
            <p>
              自分の技術スタックをまとめたものになります。エヴァンゲリオンのコラージュっぽくするとかっこよくないか？と思って作ってみました。見にくかったらABOUT MEの一番下に箇条書きで記載しているので見てみてください～
            </p>
          </div>
          <div class="grid place-items-center">
            <NuxtLink
              to="/about"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105',
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white',
              ]"
            >
              ABOUT MEを見る
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="col-span-12 grid place-items-center">
        <div class="relative w-full max-w-7xl">
          <NuxtImg
            src="./focus-timer-app.png"
            alt="ポモドーロタイマーアプリ"
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1280px"
            class="w-full aspect-[1280/634] object-cover opacity-0 animate-fade-in rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>

    <section
      ref="focusTimerSection"
      class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 opacity-0 transition-all
      duration-1000 ease-out transform translate-y-8"
      :class="[
        isFocusTimerVisible ? 'opacity-100 translate-y-0' : '',
      ]"
    >
      <div class="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
        <div class="grid gap-6">
          <div class="grid gap-4 text-sm sm:text-base lg:text-lg leading-relaxed">
            <p>
              Renderにデプロイしたポモドーロタイマーアプリです。集中・短い休憩・長い休憩のリズムを切り替えながら、今日のセッション数や作業時間を確認できるようにしました。実際のアプリも触ってみてください～
            </p>
          </div>
          <div class="grid place-items-center">
            <NuxtLink
              to="https://focus-timer-app-4ywg.onrender.com"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105',
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white',
              ]"
            >
              アプリを見る
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="col-span-12 grid place-items-center">
        <div class="relative w-full max-w-7xl">
          <NuxtImg
            src="./argo-archi.png"
            alt="Argo CD アーキテクチャ"
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1280px"
            class="w-full aspect-[1280/634] object-cover opacity-0 animate-fade-in rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>

    <section
      ref="archiSection"
      class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 opacity-0 transition-all
      duration-1000 ease-out transform translate-y-8"
      :class="[
        isArchiVisible ? 'opacity-100 translate-y-0' : '',
      ]"
    >
      <div class="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
        <div class="grid gap-6">
          <div class="grid gap-4 text-sm sm:text-base lg:text-lg leading-relaxed">
            <p>
              Argo CDというGitOps をAzure Kubernetes Services 上に導入した時のアーキテクチャ図になります。こちらの導入によりリリース
              時間の短縮や可観測性・管理性が向上しました。詳しくはブログをご覧ください～
            </p>
          </div>
          <div class="grid place-items-center">
            <NuxtLink
              to="https://tech-blog.cloud-config.jp/2023-06-14-aks-argocd-to-gitops-introduction"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105',
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white',
              ]"
            >
              ブログを見る
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="col-span-12 grid place-items-center">
        <div class="relative w-full max-w-7xl">
          <NuxtImg
            src="./アーキ.png"
            alt="インフラ設計図"
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1280px"
            class="w-full aspect-[1280/634] object-cover opacity-0 animate-fade-in rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>

    <section
      ref="thirdSection"
      class="grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 opacity-0 transition-all
      duration-1000 ease-out transform translate-y-8"
      :class="[
        isThirdVisible ? 'opacity-100 translate-y-0' : '',
      ]"
    >
      <div class="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
        <div class="grid gap-6">
          <div class="grid gap-4 text-sm sm:text-base lg:text-lg leading-relaxed">
            <p>
              始めてインフラの設計全般を担当した時の設計図です。ウェブ・モバイル両方のアクセスを考慮する必要があり、とても為になりました。詳細はブログを確認してみください。
            </p>
          </div>
          <div class="grid place-items-center">
            <NuxtLink
              to="https://tech-blog.cloud-config.jp/2025-12-19-web-and-mobile-infrastructure-design"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105',
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white',
              ]"
            >
              ブログを見る
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { injectDarkMode } from '~/composables/domains/darkMode'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

const { isDarkMode } = injectDarkMode()

const textSection = ref<HTMLElement | null>(null)
const focusTimerSection = ref<HTMLElement | null>(null)
const archiSection = ref<HTMLElement | null>(null)
const thirdSection = ref<HTMLElement | null>(null)

const isTextVisible = ref(false)
const isFocusTimerVisible = ref(false)
const isArchiVisible = ref(false)
const isThirdVisible = ref(false)

useIntersectionObserver([
  { element: textSection, isVisible: isTextVisible },
  { element: focusTimerSection, isVisible: isFocusTimerVisible },
  { element: archiSection, isVisible: isArchiVisible },
  { element: thirdSection, isVisible: isThirdVisible },
])
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn 1.2s ease-out forwards;
}
</style>

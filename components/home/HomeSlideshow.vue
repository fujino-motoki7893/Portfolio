<template>
  <div class="w-full">
    <div class="grid grid-cols-12 gap-4 lg:gap-8 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
        <div class="relative overflow-hidden">
          <div
            ref="slideContainer"
            class="flex transition-transform duration-1000 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="min-w-full"
            >
              <NuxtImg
                :src="slide.src"
                :alt="slide.alt"
                :loading="index === 1 ? 'eager' : 'lazy'"
                sizes="(max-width: 1024px) 100vw, 80vw"
                class="w-full aspect-[1280/634] object-cover opacity-0 animate-fade-in"
              />
            </div>
          </div>

          <div
            class="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2
              sm:space-x-3 bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full"
          >
            <div
              v-for="(_, index) in totalSlides"
              :key="index"
              class="relative transition-all duration-300 ease-out cursor-pointer"
              :class="getIndicatorIndex() === index ? 'w-6 sm:w-8 h-2 sm:h-3' : 'w-2 sm:w-3 h-2 sm:h-3'"
              @click="goToSlide(index)"
            >
              <div
                v-if="getIndicatorIndex() === index"
                class="w-full h-full bg-white rounded-full shadow-lg"
              />
              <div
                v-else
                class="w-full h-full bg-white/60 rounded-full hover:bg-white/80 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 実際のスライド3枚 + 前後にクローンを配置して無限ループを実現
// [最後のクローン, スライド1, スライド2, スライド3, 最初のクローン]
const slides = [
  { src: './argo-archi.png', alt: 'Argo CD アーキテクチャ' }, // index 0: 最後のスライドのクローン
  { src: './think_fujino_edit.jpg', alt: 'プロフィール' },    // index 1: 実スライド1
  { src: './スライド1_調整.PNG', alt: '技術スタック' },       // index 2: 実スライド2
  { src: './argo-archi.png', alt: 'Argo CD アーキテクチャ' }, // index 3: 実スライド3
  { src: './think_fujino_edit.jpg', alt: 'プロフィール' },    // index 4: 最初のスライドのクローン
]

const slideContainer = ref<HTMLElement | null>(null)
const currentSlide = ref(1)
const totalSlides = 3
const slideInterval = ref<ReturnType<typeof setInterval> | null>(null)
const isAnimating = ref(false)

const TRANSITION_DURATION = 1000

const goToSlide = (targetIndex: number) => {
  if (isAnimating.value) return

  stopSlideshow()
  isAnimating.value = true
  currentSlide.value = targetIndex + 1

  setTimeout(() => {
    isAnimating.value = false
    startSlideshow()
  }, TRANSITION_DURATION + 100)
}

const getIndicatorIndex = () => {
  if (currentSlide.value === 0) return totalSlides - 1
  if (currentSlide.value === totalSlides + 1) return 0
  return currentSlide.value - 1
}

const nextSlide = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  currentSlide.value++

  // クローンスライド（index 4）に到達したら、アニメーション完了後に実スライド1（index 1）へジャンプ
  if (currentSlide.value === totalSlides + 1) {
    setTimeout(() => {
      if (slideContainer.value) {
        // トランジションを一時的に無効化して瞬時にジャンプ
        slideContainer.value.style.transition = 'none'
        currentSlide.value = 1

        // 次のフレームでトランジションを復元
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (slideContainer.value) {
              slideContainer.value.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`
            }
            isAnimating.value = false
          })
        })
      }
    }, TRANSITION_DURATION)
  } else {
    setTimeout(() => {
      isAnimating.value = false
    }, TRANSITION_DURATION)
  }
}

const startSlideshow = () => {
  slideInterval.value = setInterval(() => {
    nextSlide()
  }, 3000)
}

const stopSlideshow = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
    slideInterval.value = null
  }
}

onMounted(() => {
  startSlideshow()
})

onUnmounted(() => {
  stopSlideshow()
})
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

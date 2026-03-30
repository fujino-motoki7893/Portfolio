<template>
  <div class="w-full overflow-hidden">
    <div class="grid grid-cols-12 gap-4 lg:gap-8 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
        <div class="relative">
          <div
            ref="slideContainer"
            class="flex transition-transform duration-1000 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * slideWidth - sideOffset}%)` }"
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="px-2"
              :class="isJumping ? '' : 'transition-all duration-1000 ease-in-out'"
              :style="{ minWidth: `${slideWidth}%` }"
            >
              <NuxtImg
                :src="slide.src"
                :alt="slide.alt"
                :loading="index <= CLONE_COUNT ? 'eager' : 'lazy'"
                sizes="(max-width: 1024px) 100vw, 80vw"
                class="w-full aspect-[1280/634] object-cover rounded-lg"
                :class="[
                  isJumping ? '' : 'transition-all duration-1000 ease-in-out',
                  index === currentSlide ? 'scale-100 opacity-100' : 'scale-90 opacity-50',
                ]"
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
const slideWidth = 80
const sideOffset = (100 - slideWidth) / 2

// 実際のスライド4枚 + 前後に2枚ずつクローンを配置して無限ループを実現
// 見切れ表示で左右のスライドも見えるため、ジャンプ時に左右が一致するよう2枚ずつ必要
// [クローンS3, クローンS4, S1, S2, S3, S4, クローンS1, クローンS2]
const CLONE_COUNT = 2
const realSlides = [
  { src: './think_fujino_edit.jpg', alt: 'プロフィール' },
  { src: './スライド1_調整.PNG', alt: '技術スタック' },
  { src: './argo-archi.png', alt: 'Argo CD アーキテクチャ' },
  { src: './アーキ.png', alt: 'インフラ設計図' },
]
const slides = [
  ...realSlides.slice(-CLONE_COUNT),
  ...realSlides,
  ...realSlides.slice(0, CLONE_COUNT),
]

const slideContainer = ref<HTMLElement | null>(null)
const currentSlide = ref(CLONE_COUNT)
const totalSlides = realSlides.length
const slideInterval = ref<ReturnType<typeof setInterval> | null>(null)
const isAnimating = ref(false)
const isJumping = ref(false)

const TRANSITION_DURATION = 1000

const goToSlide = (targetIndex: number) => {
  if (isAnimating.value) return

  stopSlideshow()
  isAnimating.value = true
  currentSlide.value = targetIndex + CLONE_COUNT

  setTimeout(() => {
    isAnimating.value = false
    startSlideshow()
  }, TRANSITION_DURATION + 100)
}

const getIndicatorIndex = () => {
  const idx = currentSlide.value - CLONE_COUNT
  if (idx < 0) return totalSlides + idx
  if (idx >= totalSlides) return idx - totalSlides
  return idx
}

const nextSlide = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  currentSlide.value++

  // クローン領域に到達したら、アニメーション完了後に実スライド領域へジャンプ
  if (currentSlide.value === totalSlides + CLONE_COUNT) {
    setTimeout(() => {
      if (slideContainer.value) {
        isJumping.value = true
        slideContainer.value.style.transition = 'none'
        currentSlide.value = CLONE_COUNT

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (slideContainer.value) {
              slideContainer.value.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`
            }
            isJumping.value = false
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

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
const slides = [
  { src: './argo-archi.png', alt: 'Argo CD アーキテクチャ' },
  { src: './think_fujino_edit.jpg', alt: 'プロフィール' },
  { src: './スライド1_調整.PNG', alt: '技術スタック' },
  { src: './argo-archi.png', alt: 'Argo CD アーキテクチャ' },
  { src: './think_fujino_edit.jpg', alt: 'プロフィール' },
]

const slideContainer = ref<HTMLElement | null>(null)
const currentSlide = ref(1)
const totalSlides = 3
const totalSlidesWithClones = 5
const slideInterval = ref<ReturnType<typeof setInterval> | null>(null)
const isTransitioning = ref(false)

const goToSlide = (targetIndex: number) => {
  if (isTransitioning.value) return

  stopSlideshow()

  isTransitioning.value = true
  currentSlide.value = targetIndex + 1

  setTimeout(() => {
    startSlideshow()
  }, 3000)
}

const getIndicatorIndex = () => {
  if (currentSlide.value === 0) return 2
  if (currentSlide.value === 4) return 0
  return currentSlide.value - 1
}

const handleTransitionEnd = () => {
  if (!isTransitioning.value) return

  if (currentSlide.value === totalSlidesWithClones - 1) {
    if (slideContainer.value) {
      slideContainer.value.style.transition = 'none'
      currentSlide.value = 1
      nextTick(() => {
        if (slideContainer.value) {
          slideContainer.value.style.transition = 'transform 1000ms ease-in-out'
        }
      })
    }
  }
  else if (currentSlide.value === 0) {
    if (slideContainer.value) {
      slideContainer.value.style.transition = 'none'
      currentSlide.value = totalSlides
      nextTick(() => {
        if (slideContainer.value) {
          slideContainer.value.style.transition = 'transform 1000ms ease-in-out'
        }
      })
    }
  }

  isTransitioning.value = false
}

const nextSlide = () => {
  if (isTransitioning.value) return

  isTransitioning.value = true
  currentSlide.value++
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
  if (slideContainer.value) {
    slideContainer.value.addEventListener('transitionend', handleTransitionEnd)
  }

  startSlideshow()

  onUnmounted(() => {
    stopSlideshow()
    if (slideContainer.value) {
      slideContainer.value.removeEventListener('transitionend', handleTransitionEnd)
    }
  })
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

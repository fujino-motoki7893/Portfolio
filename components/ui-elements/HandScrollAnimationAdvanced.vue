<!-- components/HandScrollAnimationAdvanced.vue -->
<template>
  <div class="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <!-- 手のひら画像 -->
    <div
      v-if="!isGrabbing"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      :style="{
        transform: `translate(-50%, -50%) scale(${handScale}) rotate(${handRotation}deg)`,
        opacity: handOpacity,
      }"
    >
      <!-- 実際の画像を使用する場合 -->
      <!-- <img src="/images/open-hand.png" alt="Open Hand" class="w-32 h-32 object-contain" /> -->

      <!-- SVGで手を描画 -->
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        class="drop-shadow-lg"
      >
        <!-- 手のひら -->
        <ellipse
          cx="64"
          cy="80"
          rx="25"
          ry="35"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- 親指 -->
        <ellipse
          cx="35"
          cy="65"
          rx="8"
          ry="15"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
          transform="rotate(-30 35 65)"
        />

        <!-- 人差し指 -->
        <ellipse
          cx="50"
          cy="35"
          rx="6"
          ry="20"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- 中指 -->
        <ellipse
          cx="64"
          cy="30"
          rx="6"
          ry="25"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- 薬指 -->
        <ellipse
          cx="78"
          cy="35"
          rx="6"
          ry="20"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- 小指 -->
        <ellipse
          cx="90"
          cy="45"
          rx="5"
          ry="15"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- 手のひらの線 -->
        <path
          d="M 45 70 Q 64 75 75 85"
          stroke="#D2691E"
          stroke-width="1.5"
          fill="none"
        />
        <path
          d="M 50 85 Q 64 88 70 95"
          stroke="#D2691E"
          stroke-width="1"
          fill="none"
        />
      </svg>
    </div>

    <!-- つかんだ手 -->
    <div
      v-if="isGrabbing"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
      :style="{
        transform: `translate(-50%, -50%) scale(${grabbingScale})`,
        opacity: grabbingOpacity,
      }"
    >
      <!-- つかんだ手のSVG -->
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        class="drop-shadow-xl animate-pulse"
      >
        <!-- 握りこぶし -->
        <ellipse
          cx="64"
          cy="70"
          rx="30"
          ry="25"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- 握った指 -->
        <ellipse
          cx="45"
          cy="55"
          rx="12"
          ry="8"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />
        <ellipse
          cx="60"
          cy="50"
          rx="12"
          ry="8"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />
        <ellipse
          cx="75"
          cy="55"
          rx="12"
          ry="8"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />
        <ellipse
          cx="85"
          cy="65"
          rx="10"
          ry="6"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- 親指 -->
        <ellipse
          cx="35"
          cy="70"
          rx="8"
          ry="12"
          fill="#F4A460"
          stroke="#D2691E"
          stroke-width="2"
        />

        <!-- エフェクト -->
        <g class="animate-ping">
          <circle
            cx="64"
            cy="70"
            r="40"
            fill="none"
            stroke="#FFD700"
            stroke-width="2"
            opacity="0.6"
          />
          <circle
            cx="64"
            cy="70"
            r="45"
            fill="none"
            stroke="#FFD700"
            stroke-width="1"
            opacity="0.4"
          />
        </g>
      </svg>
    </div>

    <div
      v-if="isGrabComplete"
      class="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white
      bg-black/70 px-6 py-3 rounded-full animate-bounce"
    >
      アニメーション完了！
    </div>

    <!-- リセットボタン（デバッグ用） -->
    <button
      v-if="isGrabComplete"
      class="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg
      hover:bg-blue-600 transition-colors pointer-events-auto"
      @click="resetAnimation"
    >
      リセット
    </button>

    <!-- スクロール進捗表示 -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
      進捗: {{ Math.round(scrollProgress * 100) }}%
      <span
        v-if="isGrabComplete"
        class="text-green-400"
      >完了</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const scrollY = ref(0)
const windowHeight = ref(0)
const documentHeight = ref(0)
const isGrabComplete = ref(false) // 握りこぶしが完了したかの状態
const maxScrollY = ref(0) // 最大スクロール位置を記録

const handRotation = computed(() => {
  const progress = scrollProgress.value
  return Math.sin(progress * Math.PI * 4) * 5 // 微細な揺れ
})

const scrollProgress = computed(() => {
  if (documentHeight.value <= windowHeight.value) return 0
  const maxScroll = documentHeight.value - windowHeight.value
  return Math.min(scrollY.value / maxScroll, 1)
})

// 手のひらの状態
const handScale = computed(() => {
  const progress = scrollProgress.value
  if (progress < 0.7) {
    // 0から3倍まで段階的に拡大
    return 0.5 + (progress / 0.7) * 2.5
  }
  return 3
})

const handOpacity = computed(() => {
  const progress = scrollProgress.value
  if (progress < 0.1) return 0
  if (progress < 0.7) return Math.min((progress - 0.1) / 0.1, 1)
  if (progress < 0.8) return 1 - ((progress - 0.7) / 0.1)
  return 0
})

// つかむアニメーションの状態
const isGrabbing = computed(() => scrollProgress.value >= 0.8 || isGrabComplete.value)

const grabbingScale = computed(() => {
  const progress = scrollProgress.value
  if (progress < 0.8) return 0
  if (progress < 0.9) {
    // つかむ瞬間の拡大
    return ((progress - 0.8) / 0.1) * 1.5
  }
  return 1.5
})

const grabbingOpacity = computed(() => {
  const progress = scrollProgress.value
  if (progress < 0.8 && !isGrabComplete.value) return 0
  if (progress < 0.85 || isGrabComplete.value) return (progress - 0.8) / 0.05
  if (progress < 0.95) return 1

  // 握りこぶしが完了したら表示を維持
  if (progress >= 0.95) {
    isGrabComplete.value = true
    return 1
  }
  return 1 - ((progress - 0.95) / 0.05)
})

const isAnimating = computed(() => {
  return scrollProgress.value > 0.1 && scrollProgress.value < 0.7
})

// スクロールイベントの処理
const handleScroll = () => {
  const currentScrollY = window.scrollY

  // 握りこぶしが完了している場合、それ以上のスクロールを防ぐ
  if (isGrabComplete.value) {
    if (currentScrollY > maxScrollY.value) {
      window.scrollTo(0, maxScrollY.value)
      return
    }
  }

  scrollY.value = currentScrollY

  // 最大スクロール位置を更新
  if (currentScrollY > maxScrollY.value) {
    maxScrollY.value = currentScrollY
  }

  // 握りこぶしが表示されたら完了状態にする
  if (scrollProgress.value >= 0.95 && !isGrabComplete.value) {
    isGrabComplete.value = true
    maxScrollY.value = currentScrollY

    // スクロールを無効化
    document.body.style.overflow = 'hidden'

    // 一定時間後にリセット（オプション）
    setTimeout(() => {
      resetAnimation()
    }, 3000) // 3秒後にリセット
  }
}

// アニメーションをリセットする関数
const resetAnimation = () => {
  isGrabComplete.value = false
  maxScrollY.value = 0
  document.body.style.overflow = 'auto'
  window.scrollTo(0, 0)
}

const updateDimensions = () => {
  windowHeight.value = window.innerHeight
  documentHeight.value = document.documentElement.scrollHeight
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateDimensions)

  // 初期スクロール位置の設定
  handleScroll()
})

onUnmounted(() => {
  // クリーンアップ
  document.body.style.overflow = 'auto'
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateDimensions)
})

// リセットボタン用の関数をエクスポート（デバッグ用）
defineExpose({
  resetAnimation,
})
</script>

<style scoped>
@keyframes grab {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(-5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.grab-animation {
  animation: grab 0.5s ease-in-out;
}
</style>

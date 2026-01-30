import type { Ref } from 'vue'

export interface IntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  /** true の場合、一度表示されたら visibility を維持する */
  once?: boolean
}

export interface ObserverTarget {
  element: Ref<HTMLElement | null>
  isVisible: Ref<boolean>
}

const defaultOptions: IntersectionObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
  once: false,
}

export const useIntersectionObserver = (
  targets: ObserverTarget[],
  options: IntersectionObserverOptions = {},
) => {
  const mergedOptions = { ...defaultOptions, ...options }
  const observer = ref<IntersectionObserver | null>(null)

  const setupObserver = () => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = targets.find(t => t.element.value === entry.target)
          if (target) {
            if (mergedOptions.once) {
              // 一度表示されたら維持
              if (entry.isIntersecting) {
                target.isVisible.value = true
              }
            }
            else {
              // トグル動作
              target.isVisible.value = entry.isIntersecting
            }
          }
        })
      },
      {
        threshold: mergedOptions.threshold,
        rootMargin: mergedOptions.rootMargin,
      },
    )

    targets.forEach((target) => {
      if (target.element.value) {
        observer.value?.observe(target.element.value)
      }
    })
  }

  const disconnect = () => {
    observer.value?.disconnect()
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    observer,
    disconnect,
  }
}

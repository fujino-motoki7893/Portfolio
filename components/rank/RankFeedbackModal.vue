<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        class="absolute inset-0 bg-black/50"
        @click="close"
      />
      <div
        :class="[
          'relative rounded-xl shadow-xl max-w-sm w-full p-6 border',
          isDarkMode ? 'bg-[#2D2D2D] border-gray-600 text-white' : 'bg-white border-gray-200',
        ]"
      >
        <p class="font-semibold mb-2">
          ご意見箱
        </p>

        <template v-if="sendSuccess">
          <p
            :class="[
              'text-sm mb-6',
              isDarkMode ? 'text-gray-300' : 'text-gray-600',
            ]"
          >
            送信しました。ありがとうございます！
          </p>
          <button
            class="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700
            text-white text-sm font-medium transition-colors"
            @click="close"
          >
            閉じる
          </button>
        </template>

        <template v-else>
          <p
            :class="[
              'text-sm mb-3',
              isDarkMode ? 'text-gray-300' : 'text-gray-600',
            ]"
          >
            tier表について、ご意見・ツッコミがあればこちらからどうぞ。
            返信はできませんが、藤野宛に送信されます。
          </p>

          <textarea
            v-model="message"
            rows="5"
            maxlength="2000"
            placeholder="例: このアニメはもっと上位では？"
            :class="[
              'w-full rounded-lg border p-3 text-sm resize-none mb-2',
              isDarkMode
                ? 'bg-[#1F1F1F] border-gray-600 text-white placeholder:text-gray-500'
                : 'bg-white border-gray-300 text-gray-800 placeholder:text-gray-400',
            ]"
          />

          <!-- honeypot: 人間には見えないbot対策用の入力欄 -->
          <input
            v-model="honeypot"
            type="text"
            tabindex="-1"
            autocomplete="off"
            class="absolute opacity-0 pointer-events-none w-0 h-0"
          >

          <p
            v-if="sendError"
            class="text-sm text-red-500 mb-2"
          >
            {{ sendError }}
          </p>

          <div class="flex gap-3">
            <button
              :class="[
                'flex-1 py-2 rounded-lg border text-sm font-medium transition-colors',
                isDarkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50',
              ]"
              @click="close"
            >
              やめる
            </button>
            <button
              :disabled="isSending"
              class="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700
              text-white text-sm font-medium transition-colors disabled:opacity-50"
              @click="handleSend"
            >
              {{ isSending ? '送信中...' : '送信する' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { injectDarkMode } from '~/composables/domains/darkMode'
import { useRankFeedback } from '~/composables/domains/rankFeedback'

const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { isDarkMode } = injectDarkMode()
const { isSending, sendError, sendSuccess, sendFeedback, resetStatus } = useRankFeedback()

const message = ref('')
const honeypot = ref('')

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    message.value = ''
    honeypot.value = ''
    resetStatus()
  }
})

const close = () => emits('update:modelValue', false)

const handleSend = async () => {
  await sendFeedback(message.value, honeypot.value)
}
</script>

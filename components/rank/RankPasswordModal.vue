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
      <form
        :class="[
          'relative rounded-xl shadow-xl max-w-sm w-full p-6 border',
          isDarkMode ? 'bg-[#2D2D2D] border-gray-600 text-white' : 'bg-white border-gray-200',
        ]"
        @submit.prevent="handleSubmit"
      >
        <p class="font-semibold mb-4">
          編集モードに入るにはパスワードを入力してください
        </p>
        <input
          v-model="password"
          type="password"
          autofocus
          placeholder="パスワード"
          :class="[
            'w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors',
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400',
          ]"
        >
        <p
          v-if="authError"
          class="text-sm text-red-500 mt-2"
        >
          {{ authError }}
        </p>
        <div class="flex gap-3 mt-6">
          <button
            type="button"
            :class="[
              'flex-1 py-2 rounded-lg border text-sm font-medium transition-colors',
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50',
            ]"
            @click="close"
          >
            キャンセル
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700
            text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useRankAuth } from '~/composables/domains/rankAuth'
import { injectDarkMode } from '~/composables/domains/darkMode'

const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { isDarkMode } = injectDarkMode()
const { signIn, authError } = useRankAuth()

const password = ref('')
const isSubmitting = ref(false)

const close = () => {
  emits('update:modelValue', false)
  password.value = ''
  authError.value = null
}

const handleSubmit = async () => {
  isSubmitting.value = true
  const success = await signIn(password.value)
  isSubmitting.value = false
  if (success) {
    password.value = ''
    emits('update:modelValue', false)
  }
}

watch(() => props.modelValue, (open) => {
  if (!open) {
    password.value = ''
    authError.value = null
  }
})
</script>

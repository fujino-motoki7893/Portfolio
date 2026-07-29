<template>
  <div class="flex items-center gap-3">
    <span
      :class="[
        'text-xs font-medium',
        isEditMode ? 'text-blue-600' : 'text-gray-400',
      ]"
    >
      {{ isEditMode ? '編集モード' : '閲覧モード' }}
    </span>

    <button
      type="button"
      role="switch"
      :aria-checked="isEditMode"
      class="relative w-11 h-6 rounded-full transition-colors"
      :class="isEditMode ? 'bg-blue-600' : 'bg-gray-300'"
      @click="handleToggle"
    >
      <span
        class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
        :class="{ 'translate-x-5': isEditMode }"
      />
    </button>

    <button
      v-if="isAuthenticated"
      type="button"
      class="text-xs text-gray-400 hover:text-gray-600 underline"
      @click="signOut"
    >
      ログアウト
    </button>

    <RankPasswordModal v-model="isPasswordModalOpen" />
  </div>
</template>

<script setup lang="ts">
import { useRankAuth } from '~/composables/domains/rankAuth'

const { isEditMode, isAuthenticated, checkSession, enterEditMode, signOut } = useRankAuth()
const isPasswordModalOpen = ref(false)

onMounted(checkSession)

const handleToggle = () => {
  if (isEditMode.value) {
    isEditMode.value = false
    return
  }
  if (!enterEditMode()) {
    isPasswordModalOpen.value = true
  }
}
</script>

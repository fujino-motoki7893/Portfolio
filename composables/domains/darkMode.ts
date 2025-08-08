/**
 * ダークモードの状態管理を行うコンポジション関数
 *
 * @returns ダークモードの状態と操作メソッドを含むオブジェクト
 */
export const useDarkMode = () => {
  const isDarkMode = useState('darkMode', () => false)

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    if (import.meta.client) {
      localStorage.setItem('darkMode', isDarkMode.value.toString())
    }
  }

  const initializeDarkMode = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) {
        isDarkMode.value = saved === 'true'
      }
    }
  }

  return {
    isDarkMode: readonly(isDarkMode),
    toggleDarkMode,
    initializeDarkMode,
  }
}

export const injectDarkMode = () => {
  return useDarkMode()
}

/**
 * ダークモードの状態をprovideする関数
 *
 * @returns useDarkModeState関数の戻り値
 * @example
 * // コンポーネントのsetup内で状態をprovide
 * const darkModeState = provideDarkMode();
 */
export const provideDarkMode = () => {
  const darkMode = useDarkMode()
  provide('darkMode', darkMode)
  return darkMode
}

/**
 * ダークモードの状態管理を行うコンポジション関数
 *
 * @returns ダークモードの状態と操作メソッドを含むオブジェクト
 */
const useDarkModeState = () => {
  const isDarkMode = ref(false)

  return {
    isDarkMode,
  }
}

/** useDarkModeState */
const useDarkModeStateKey: InjectionKey<ReturnType<typeof useDarkModeState>>
  = Symbol('useDarkModeStateKey')

/**
 * ダークモードの状態をprovideする関数
 *
 * @returns useDarkModeState関数の戻り値
 * @example
 * // コンポーネントのsetup内で状態をprovide
 * const darkModeState = provideDarkMode();
 */
export const provideDarkMode = () => {
  const state = useDarkModeState()
  provide(useDarkModeStateKey, state)
  return state
}

/**
 * ダークモードの状態をinjectする関数
 *
 * @returns useDarkModeState関数の戻り値
 * @throws {Error} useDarkModeStateKeyがprovideされていない場合
 * @example
 * // 子コンポーネントのsetup内で状態をinject
 * const { idDarkMode } = injectDarkMode();
 */
export const injectDarkMode = () => {
  const state = inject(useDarkModeStateKey)
  if (!state) throw new Error('No DarkMode Key')
  return state
}

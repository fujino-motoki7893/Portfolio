export const useRankAuth = () => {
  const supabase = useSupabase()
  const config = useRuntimeConfig()

  const isEditMode = useState('rankEditMode', () => false)
  const isAuthenticated = useState('rankAuthenticated', () => false)
  const authError = useState<string | null>('rankAuthError', () => null)

  const checkSession = async () => {
    if (!supabase) return
    const { data } = await supabase.auth.getSession()
    isAuthenticated.value = !!data.session
  }

  const signIn = async (password: string) => {
    if (!supabase) return false
    authError.value = null

    const { error } = await supabase.auth.signInWithPassword({
      email: config.public.rankAdminEmail,
      password,
    })

    if (error) {
      authError.value = 'パスワードが正しくありません'
      return false
    }

    isAuthenticated.value = true
    isEditMode.value = true
    return true
  }

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    isAuthenticated.value = false
    isEditMode.value = false
  }

  const enterEditMode = () => {
    if (isAuthenticated.value) {
      isEditMode.value = true
      return true
    }
    return false
  }

  const exitEditMode = () => {
    isEditMode.value = false
  }

  return {
    isEditMode,
    isAuthenticated,
    authError,
    checkSession,
    signIn,
    signOut,
    enterEditMode,
    exitEditMode,
  }
}

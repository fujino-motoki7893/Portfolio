export const useRankFeedback = () => {
  const supabase = useSupabase()

  const isSending = useState('rankFeedbackSending', () => false)
  const sendError = useState<string | null>('rankFeedbackError', () => null)
  const sendSuccess = useState(() => false)

  const sendFeedback = async (message: string, honeypot = '') => {
    if (!supabase) return false

    sendError.value = null
    sendSuccess.value = false

    const trimmed = message.trim()
    if (!trimmed) {
      sendError.value = 'ご意見を入力してください'
      return false
    }
    if (trimmed.length > 2000) {
      sendError.value = '2000文字以内で入力してください'
      return false
    }

    isSending.value = true
    try {
      const { error } = await supabase.functions.invoke('rank-feedback', {
        body: { message: trimmed, honeypot },
      })

      if (error) {
        sendError.value = '送信に失敗しました。時間をおいて再度お試しください'
        return false
      }

      sendSuccess.value = true
      return true
    }
    catch {
      sendError.value = '送信に失敗しました。時間をおいて再度お試しください'
      return false
    }
    finally {
      isSending.value = false
    }
  }

  const resetStatus = () => {
    sendError.value = null
    sendSuccess.value = false
  }

  return {
    isSending,
    sendError,
    sendSuccess,
    sendFeedback,
    resetStatus,
  }
}

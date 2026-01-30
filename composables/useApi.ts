export const useApi = () => {
  const config = useRuntimeConfig()

  const get = async <T>(
    endpoint: string,
    query?: Record<string, any>,
  ): Promise<T> => {
    try {
      const response = await $fetch<unknown>(endpoint, {
        baseURL: config.public.apiBase,
        method: 'GET',
        query,
        headers: {
          'Content-Type': 'application/json',
        },
        onResponseError({ response }) {
          throw createError({
            statusCode: response.status,
            statusMessage: response._data?.message || 'API Error',
          })
        },
      })

      // ApiResponse形式かどうかを判定
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as { data: T }).data
      }

      // 直接データが返される場合
      return response as T
    }
    catch (error: unknown) {
      console.error('API Error:', error)
      throw error
    }
  }

  return {
    get,
  }
}

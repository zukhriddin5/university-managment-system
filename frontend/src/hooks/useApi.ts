import { useState, useCallback } from 'react'
import { AxiosError } from 'axios'

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: AxiosError) => void
}

export const useApi = <T,>(
  apiCall: () => Promise<T>,
  options?: UseApiOptions
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall()
      setData(response)
      options?.onSuccess?.(response)
      return response
    } catch (err) {
      const axiosError = err as AxiosError
      setError(axiosError)
      options?.onError?.(axiosError)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiCall, options])

  const refetch = useCallback(() => {
    execute()
  }, [execute])

  return { data, loading, error, execute, refetch }
}
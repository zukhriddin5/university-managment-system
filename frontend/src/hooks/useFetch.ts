import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import api from '../lib/api'

interface UseFetchOptions {
  enabled?: boolean
  refetchInterval?: number
  onSuccess?: (data: any) => void
  onError?: (error: AxiosError) => void
}

export const useFetch = <T,>(
  url: string | null,
  options?: UseFetchOptions
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!!url)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    if (!url || options?.enabled === false) return

    let isMounted = true
    let intervalId: NodeJS.Timeout | null = null

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await api.get<T>(url)
        if (isMounted) {
          setData(response.data)
          setError(null)
          options?.onSuccess?.(response.data)
        }
      } catch (err) {
        if (isMounted) {
          const axiosError = err as AxiosError
          setError(axiosError)
          options?.onError?.(axiosError)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    if (options?.refetchInterval) {
      intervalId = setInterval(fetchData, options.refetchInterval)
    }

    return () => {
      isMounted = false
      if (intervalId) clearInterval(intervalId)
    }
  }, [url, options?.enabled, options?.refetchInterval])

  return { data, loading, error }
}
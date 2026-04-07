import { useState, useCallback } from 'react'

interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export const usePagination = (initialPageSize: number = 20) => {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
  })

  const setTotal = useCallback((total: number) => {
    setState((prev) => ({ ...prev, total }))
  }, [])

  const goToPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, page }))
  }, [])

  const nextPage = useCallback(() => {
    setState((prev) => {
      const maxPage = Math.ceil(prev.total / prev.pageSize)
      return { ...prev, page: Math.min(prev.page + 1, maxPage) }
    })
  }, [])

  const previousPage = useCallback(() => {
    setState((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))
  }, [])

  const setPageSize = useCallback((pageSize: number) => {
    setState((prev) => ({ ...prev, pageSize, page: 1 }))
  }, [])

  const reset = useCallback(() => {
    setState({ page: 1, pageSize: initialPageSize, total: 0 })
  }, [initialPageSize])

  const totalPages = Math.ceil(state.total / state.pageSize)
  const hasNextPage = state.page < totalPages
  const hasPreviousPage = state.page > 1

  return {
    ...state,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setTotal,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    reset,
  }
}
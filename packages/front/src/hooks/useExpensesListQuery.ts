import { fetcher } from '@/client/fetcher'
import { Expenses } from '@/model'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useIntersectionObserver } from './useIntersectionObserver'
import { useEffect, useRef } from 'react'

export interface ExpensesListData {
  content: Expenses[]
  currentPage: number
  pageSize: number
  totalCount: number
  totalPage: number
}

export const useExpensesListInfiniteQuery = (userId: string | null) => {
  const { data, fetchNextPage, isLoading } =
    useSuspenseInfiniteQuery<ExpensesListData>({
      queryKey: ['expenses'],
      queryFn: ({ pageParam }) =>
        fetcher(`/api/expenses?userId=${userId}&page=${pageParam}`),
      getNextPageParam: (lastPage) => {
        if (lastPage.totalPage > lastPage.currentPage) {
          return lastPage.currentPage + 1
        }
        return undefined
      },
      initialPageParam: 0,
    })

  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})

  useEffect(() => {
    if (entry) fetchNextPage()
  }, [entry])

  const expenseList = data.pages.flatMap((page) => [...page.content])

  return { expenseList, triggerRef: ref, isLoading }
}

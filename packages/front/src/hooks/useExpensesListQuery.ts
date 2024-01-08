import { fetcher } from '@/client/fetcher'
import { Expenses } from '@/model'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from 'greenbean-pack'
import { useRecoilValue } from 'recoil'
import { EXPENSES } from '@/constants/query'
import { searchState, sortState } from '@/store/filterState'

export interface ExpensesListData {
  content: Expenses[]
  currentPage: number
  pageSize: number
  totalCount: number
  totalPage: number
}

export const useExpensesListInfiniteQuery = () => {
  const searchQuery = useRecoilValue(searchState)
  const sortQuery = useRecoilValue(sortState)
  const { data, fetchNextPage, isLoading, isFetching, isFetchingNextPage } = useSuspenseInfiniteQuery<ExpensesListData>(
    {
      queryKey: [EXPENSES, searchQuery, sortQuery],
      queryFn: ({ pageParam }) =>
        fetcher(`/api/expenses?page=${pageParam}&q=${searchQuery ?? ''}&sort=${sortQuery ?? ''}`),
      getNextPageParam: (lastPage) => {
        if (lastPage.totalPage > lastPage.currentPage) {
          return lastPage.currentPage + 1
        }
        return undefined
      },
      initialPageParam: 0
    }
  )

  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})

  useEffect(() => {
    if (entry) fetchNextPage()
  }, [entry])

  const expenseList = data.pages.flatMap((page) => [...page.content])

  return {
    expenseList,
    triggerRef: ref,
    isFetching,
    isFetchingNextPage,
    isLoading
  }
}

import { fetcher } from '@/client/fetcher'
import { Expenses } from '@/model'
import { useMutation, useSuspenseInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useIntersectionObserver } from './useIntersectionObserver'
import { useEffect, useRef } from 'react'
import { addExpenseApi, deleteExpenseApi, updateExpenseApi } from '@/client/expenses'
import { useSetRecoilState } from 'recoil'
import { expenseAsyncState } from '@/store/expenseFetchingState'

export interface ExpensesListData {
  content: Expenses[]
  currentPage: number
  pageSize: number
  totalCount: number
  totalPage: number
}

export const useExpensesListInfiniteQuery = () => {
  const queryClient = useQueryClient()
  const setIsFetching = useSetRecoilState(expenseAsyncState)
  const { data, fetchNextPage, isLoading, isFetching } = useSuspenseInfiniteQuery<ExpensesListData>({
    queryKey: ['expenses'],
    queryFn: ({ pageParam }) => fetcher(`/api/expenses?page=${pageParam}`),
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPage > lastPage.currentPage) {
        return lastPage.currentPage + 1
      }
      return undefined
    },
    initialPageParam: 0
  })

  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})

  useEffect(() => {
    if (entry) fetchNextPage()
  }, [entry])

  const errorHandler = (error: Error) => {
    process.env.NODE_ENV === 'development' && console.error(error)
    alert(error.message)
  }

  const addExpense = useMutation({
    mutationFn: addExpenseApi,
    onError: errorHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses']
      })
    },
    onSettled: () => {
      setIsFetching(false)
    }
  })

  const updateExpense = useMutation({
    mutationFn: updateExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses']
      })
    },
    onError: errorHandler,
    onSettled: () => {
      setIsFetching(false)
    }
  })

  const deleteExpense = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses']
      })
    },
    onError: errorHandler,
    onSettled: () => {
      setIsFetching(false)
    }
  })

  const expenseList = data.pages.flatMap((page) => [...page.content])

  return {
    expenseList,
    triggerRef: ref,
    isFetching,
    isLoading,
    updateExpenseMutate: updateExpense.mutate,
    deleteExpenseMutate: deleteExpense.mutate,
    addExpenseMutate: addExpense.mutate
  }
}

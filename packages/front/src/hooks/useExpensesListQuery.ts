import { fetcher } from '@/client/fetcher'
import { Expenses } from '@/model'
import { useMutation, useSuspenseInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { addExpenseApi, deleteExpenseApi, updateExpenseApi } from '@/client/expenses'
import { useIntersectionObserver } from 'greenbean-pack'
import { useSetRecoilState } from 'recoil'
import { expenseDeleteQueue, expenseEditQueue } from '@/store/expenseFetchingState'

export interface ExpensesListData {
  content: Expenses[]
  currentPage: number
  pageSize: number
  totalCount: number
  totalPage: number
}

export const useExpensesListInfiniteQuery = () => {
  const queryClient = useQueryClient()
  const setExpenseEditQueue = useSetRecoilState(expenseEditQueue)
  const setExpenseDeleteQueue = useSetRecoilState(expenseDeleteQueue)
  const { data, fetchNextPage, isLoading, isFetching, isFetchingNextPage } = useSuspenseInfiniteQuery<ExpensesListData>(
    {
      queryKey: ['expenses'],
      queryFn: ({ pageParam }) => fetcher(`/api/expenses?page=${pageParam}`),
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
    }
  })

  const updateExpense = useMutation({
    mutationFn: updateExpenseApi,
    onSuccess: (_data, variable) => {
      queryClient.invalidateQueries({
        queryKey: ['expenses']
      })
      setExpenseEditQueue((prev) => prev.filter((id) => id !== variable.id))
    },
    onError: errorHandler
  })

  const deleteExpense = useMutation({
    mutationFn: deleteExpenseApi,
    onMutate: (expenseId) => {
      queryClient.setQueryData(['expenses'], (prev: { pages: ExpensesListData[]; pageParams: number[] }) => {
        const pages = prev.pages.map((page) => ({
          ...page,
          content: page.content.filter((expense) => expense.id !== expenseId)
        }))
        return {
          ...prev,
          pages
        }
      })
    },
    onSuccess: (_data, expenseId) => {
      queryClient.invalidateQueries({
        queryKey: ['expenses']
      })
      setExpenseDeleteQueue((prev) => prev.filter((id) => id !== expenseId))
    },
    onError: errorHandler
  })

  const expenseList = data.pages.flatMap((page) => [...page.content])

  return {
    expenseList,
    triggerRef: ref,
    isFetching,
    isFetchingNextPage,
    isLoading,
    updateExpenseMutate: updateExpense.mutate,
    deleteExpenseMutate: deleteExpense.mutate,
    addExpenseMutate: addExpense.mutate
  }
}

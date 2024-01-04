import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addExpenseApi, deleteExpenseApi, updateExpenseApi } from '@/client/expenses'
import { useSetRecoilState } from 'recoil'
import { expenseAddIsFetchingState } from '@/store/expenseFetchingState'
import { EXPENSES } from '@/constants/query'

export const useExpensesListMutation = () => {
  const queryClient = useQueryClient()
  const setIsFetching = useSetRecoilState(expenseAddIsFetchingState)

  const errorHandler = (res: Response) => {
    if (res.status === 401) alert('접근 권한이 없습니다.')
    else if (res.status === 404) alert('잘못된 접근입니다.')
    process.env.NODE_ENV === 'development' && console.error(res)
  }

  const addExpense = useMutation({
    mutationFn: addExpenseApi,
    onError: errorHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXPENSES]
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
        queryKey: [EXPENSES]
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
        queryKey: [EXPENSES]
      })
    },
    onError: errorHandler,
    onSettled: () => {
      setIsFetching(false)
    }
  })

  return {
    updateExpenseMutate: updateExpense.mutate,
    deleteExpenseMutate: deleteExpense.mutate,
    addExpenseMutate: addExpense.mutate
  }
}

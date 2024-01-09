import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addExpenseApi, deleteExpenseApi, updateExpenseApi } from '@/client/expenses'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { expenseAddIsFetchingState, expenseDeleteQueue, expenseEditQueue } from '@/store/expenseFetchingState'
import { EXPENSES } from '@/constants/query'
import { searchState, sortState } from '@/store/filterState'
import { ExpensesListData } from '../useExpensesListQuery'

/**
 * @note SSRSuspense(components/common에 있는 컴포넌트)로 감싸지 않은 컴포넌트에서 useQuery를 사용할 수 없기 때문에 mutation을 분리합니다.
 */
export const useExpensesListMutation = () => {
  const queryClient = useQueryClient()
  const setExpenseEditQueue = useSetRecoilState(expenseEditQueue)
  const setExpenseDeleteQueue = useSetRecoilState(expenseDeleteQueue)
  const setIsFetching = useSetRecoilState(expenseAddIsFetchingState)

  const searchQuery = useRecoilValue(searchState)
  const sortQuery = useRecoilValue(sortState)

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
        queryKey: [EXPENSES],
        exact: false
      })
    },
    onSettled: () => {
      setIsFetching(false)
    }
  })

  const updateExpense = useMutation({
    mutationFn: updateExpenseApi,
    onSuccess: (_data, variable) => {
      queryClient.invalidateQueries({
        queryKey: [EXPENSES],
        exact: false
      })
      setExpenseEditQueue((prev) => prev.filter((id) => id !== variable.id))
    },
    onError: errorHandler
  })

  const deleteExpense = useMutation({
    mutationFn: deleteExpenseApi,
    onMutate: (expenseId) => {
      queryClient.setQueryData(
        [EXPENSES, searchQuery, sortQuery],
        (prev: { pages: ExpensesListData[]; pageParams: number[] }) => {
          console.log('PREV DATA :', prev)
          const pages = prev.pages.map((page) => ({
            ...page,
            content: page.content.filter((expense) => expense.id !== expenseId)
          }))
          return {
            ...prev,
            pages
          }
        }
      )
    },
    onSuccess: (_data, expenseId) => {
      queryClient.invalidateQueries({
        queryKey: [EXPENSES],
        exact: false
      })
      setExpenseDeleteQueue((prev) => prev.filter((id) => id !== expenseId))
    },
    onError: errorHandler
  })

  return {
    updateExpenseMutate: updateExpense.mutate,
    deleteExpenseMutate: deleteExpense.mutate,
    addExpenseMutate: addExpense.mutate
  }
}

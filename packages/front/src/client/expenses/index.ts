import { Expenses } from '@/model'
import { fetcher } from '../fetcher'

export const updateExpenseApi = (expense: Expenses) => {
  return fetcher(`/api/expenses`, {
    method: 'PUT',
    body: JSON.stringify(expense)
  })
}

export const deleteExpenseApi = (id: string) => {
  return fetcher(`/api/expenses?id=${id}`, { method: 'DELETE' })
}

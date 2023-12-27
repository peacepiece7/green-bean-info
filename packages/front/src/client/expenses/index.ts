import { Expenses } from '@/model'
import { fetcher } from '@/client/fetcher'

export const addExpenseApi = (expense: Omit<Expenses, 'id'>) => {
  return fetcher(`/api/expenses`, {
    method: 'POST',
    body: JSON.stringify(expense)
  })
}

export const updateExpenseApi = (expense: Expenses) => {
  return fetcher(`/api/expenses`, {
    method: 'PUT',
    body: JSON.stringify(expense)
  })
}

export const deleteExpenseApi = (id: string) => {
  return fetcher(`/api/expenses?id=${id}`, { method: 'DELETE' })
}

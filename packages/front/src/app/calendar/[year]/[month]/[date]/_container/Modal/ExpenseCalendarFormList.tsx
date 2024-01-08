'use client'

import { Expenses } from '@/model'
import { useExpensesListMutation } from '@/hooks/mutation/expense'
import List from '@/app/_container/ExpenseList/List'
export function ExpenseCalendarFormList({ expenseList }: { expenseList: Expenses[] }) {
  const { updateExpenseMutate, deleteExpenseMutate } = useExpensesListMutation()

  const handleOnEdit = (expense: Expenses) => {
    updateExpenseMutate(expense)
  }

  const handleOnDelete = (expense: Expenses) => {
    deleteExpenseMutate(expense.id)
  }

  return <List expenses={expenseList} onEdit={handleOnEdit} onDelete={handleOnDelete} />
}

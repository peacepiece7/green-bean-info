'use client'

import { Expenses } from '@/model'
import { useExpensesListInfiniteQuery } from '@/hooks/useExpensesListQuery'
import List from './List'

export default function ExpenseList() {
  const { expenseList, triggerRef, isFetching, updateExpenseMutate, deleteExpenseMutate } =
    useExpensesListInfiniteQuery()

  const handleOnEdit = (expense: Expenses) => {
    updateExpenseMutate(expense)
  }

  const handleOnDelete = (expense: Expenses) => {
    deleteExpenseMutate(expense.id)
  }

  return (
    <>
      <List expenses={expenseList} onEdit={handleOnEdit} onDelete={handleOnDelete} />
      {isFetching && <div>Fetching...</div>}
      <div ref={triggerRef} />
    </>
  )
}

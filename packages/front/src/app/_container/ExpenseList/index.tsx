'use client'

import { Expenses, User } from '@/model'
import { useExpensesListInfiniteQuery } from '@/hooks/useExpensesListQuery'
import List from './List'

interface ExpenseListProps {
  user: User
}
export default function ExpenseList({ user }: ExpenseListProps) {
  const { expenseList, triggerRef, isLoading } = useExpensesListInfiniteQuery(user.id)

  const handleOnEdit = (expense: Expenses) => {
    console.log(expense)
  }
  const handleOnDelete = (id: number) => {
    console.log(id)
  }

  return (
    <>
      <List expenses={expenseList} onEdit={handleOnEdit} onDelete={handleOnDelete} />
      {isLoading && <div>loading...</div>}
      <div ref={triggerRef} />
    </>
  )
}

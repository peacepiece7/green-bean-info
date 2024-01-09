'use client'

import { Expenses } from '@/model'
import { useExpensesListMutation } from '@/hooks/mutation/expense'
import List from '@/app/_container/ExpenseList/List'
import styled from 'styled-components'
import { SPACE, TEXT } from '@/styles/common'
export function ExpenseCalendarFormList({ expenseList }: { expenseList: Expenses[] }) {
  const { updateExpenseMutate, deleteExpenseMutate } = useExpensesListMutation()

  const handleOnEdit = (expense: Expenses) => {
    updateExpenseMutate(expense)
  }

  const handleOnDelete = (expense: Expenses) => {
    deleteExpenseMutate(expense.id)
  }

  return (
    <>
      <Title>일일 소비 내역</Title>
      <List expenses={expenseList} onEdit={handleOnEdit} onDelete={handleOnDelete} />
    </>
  )
}

const Title = styled.h2`
  margin: ${SPACE['8']};
  font-size: ${TEXT.size['2xl']};
`

'use client'

import { Expenses } from '@/model'
import { useExpensesListInfiniteQuery } from '@/hooks/useExpensesListQuery'
import List from './List'
import styled from 'styled-components'
import { TEXT } from '@/styles/common'

export default function ExpenseList() {
  const { expenseList, triggerRef, isFetching, isFetchingNextPage, updateExpenseMutate, deleteExpenseMutate } =
    useExpensesListInfiniteQuery()

  const handleOnEdit = (expense: Expenses) => {
    updateExpenseMutate(expense)
  }

  const handleOnDelete = (expense: Expenses) => {
    deleteExpenseMutate(expense.id)
  }

  return (
    <>
      {isFetching && <Fetching>페이지 정보를 불러오고 있습니다.</Fetching>}
      <List expenses={expenseList} onEdit={handleOnEdit} onDelete={handleOnDelete} />
      {!isFetching && isFetchingNextPage && <Fetching>다음 페이지 정보를 가져오고 있습니다.</Fetching>}
      <div ref={triggerRef} />
    </>
  )
}

const Fetching = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${TEXT.size['3xl']};
`

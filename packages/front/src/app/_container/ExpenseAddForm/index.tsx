'use client'
import dayjs from 'dayjs'
import AutoComplete from './AutoComplete'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useState } from 'react'
import styled from 'styled-components'
import { SPACE } from '@/styles/common'
import { usePersistCategory } from '@/hooks/usePersistCategory'
import { useForm } from 'react-hook-form'
import { dateToISOString } from '@/util'
import { useRecoilState } from 'recoil'
import { expenseAsyncState } from '@/store/expenseFetchingState'
import { useExpensesListMutation } from '@/hooks/mutation/expense'

interface AddExpenseBody {
  date: string
  cost: number
  content: string
}

export default function ExpenseAddForm() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isReset, setIsReset] = useState(false)
  const { data: items, isLoading } = useCategoryQuery(searchQuery)
  const { addExpenseMutate } = useExpensesListMutation()
  const [isFetching, setIsFetching] = useRecoilState(expenseAsyncState)
  const { persistState, setPersist } = usePersistCategory()
  const { register, reset, handleSubmit } = useForm<AddExpenseBody>()

  const onSubmit = (body: AddExpenseBody) => {
    if (isFetching) return
    body.date = dateToISOString(body.date)
    addExpenseMutate({ ...body, category: searchQuery })
    setIsFetching(true)
    setPersist(searchQuery)
    reset()
    setIsReset(true)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <input
        type="date"
        placeholder="날짜"
        defaultValue={dayjs(Date.now()).format('YYYY-MM-DD')}
        required
        {...register('date')}
      />
      <AutoComplete
        items={items}
        recommendStateBeforeChange={persistState}
        isLoading={isLoading}
        onSelect={(e) => {
          setIsReset(false)
          setSearchQuery(e)
        }}
        onEnter={(item) => setSearchQuery(item.value)}
        // onClick
        reset={isReset}
      />
      <input type="number" placeholder="금액" required {...register('cost')} />
      <input placeholder="내용" {...register('content')} />
      <input type="submit" />
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  & > input {
    width: 15rem;
    height: 4rem;
    margin: 0 ${SPACE[4]};
  }
`

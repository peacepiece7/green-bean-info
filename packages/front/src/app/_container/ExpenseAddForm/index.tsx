'use client'
import dayjs from 'dayjs'

import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useState } from 'react'
import styled from 'styled-components'
import { COLOR, SPACE } from '@/styles/common'
import { usePersistCategory } from '@/hooks/usePersistCategory'
import { useForm } from 'react-hook-form'
import { dateToISOString } from '@/util'
import { useRecoilState } from 'recoil'
import { expenseAsyncState } from '@/store/expenseFetchingState'
import { useExpensesListMutation } from '@/hooks/mutation/expense'
import { AutoComplete } from 'greenbean-pack'
import { Spin } from '@/components/Loading/Spin'

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
        reset={isReset}
        renderListIsLoading={() => '데이터를 불러오는 중입니다...'}
        renderListOptions={(item, isSelected) => {
          return <RenderItem $selected={isSelected}>{item.value}</RenderItem>
        }}
        inputStyle={{ width: '15rem', height: '4rem', margin: `0 ${SPACE[4]}` }}
      />
      <input type="number" placeholder="금액" required {...register('cost')} />
      <input placeholder="내용" {...register('content')} />
      <button type="submit">{isFetching ? <Spin /> : '추가'}</button>
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

const RenderItem = styled.div<{ $selected: boolean }>`
  background-color: ${({ $selected }) => ($selected ? `${COLOR.tertiary}` : `${COLOR.white}`)};
  &:hover {
    background-color: ${COLOR.tertiary};
  }
`

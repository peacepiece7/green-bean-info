'use client'
import dayjs from 'dayjs'
import AutoComplete from './AutoComplete'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useState } from 'react'
import styled from 'styled-components'
import { SPACE } from '@/styles/common'
import { usePersistCategory } from '@/hooks/usePersistCategory'
import { useForm } from 'react-hook-form'
import { fetcher } from '@/client/fetcher'
import { dateToISOString } from '@/util'
// import { fetcher } from '@/client/fetcher'

interface AddExpenseBody {
  date: string
  cost: number
  content: string
}

export default function ExpenseAddForm() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: items, isLoading } = useCategoryQuery(searchQuery)
  const { state, setState } = usePersistCategory()
  const { register, handleSubmit } = useForm<AddExpenseBody>()

  const onSubmit = (body: AddExpenseBody) => {
    setState(searchQuery)
    body.date = dateToISOString(body.date)
    // TODO : API로 뺍시다.
    fetcher(`/api/expenses`, {
      method: 'POST',
      body: JSON.stringify({ ...body, category: searchQuery })
    })
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
        onSubmit={(item) => {
          setSearchQuery(item.value)
        }}
        onChange={(e) => setSearchQuery(e)}
        isLoading={isLoading}
        recommendStateBeforeChange={state}
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
  input {
    width: 15rem;
    height: 4rem;
    margin: 0 ${SPACE[4]};
  }
`

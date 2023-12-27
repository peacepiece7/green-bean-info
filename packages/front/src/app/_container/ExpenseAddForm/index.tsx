'use client'
import dayjs from 'dayjs'
import AutoComplete from './AutoComplete'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useState } from 'react'
import { User } from '@/model'
import styled from 'styled-components'
import { SPACE } from '@/styles/common'
import { usePersistCategory } from '@/hooks/usePersistCategory'
import { useForm } from 'react-hook-form'
import { fetcher } from '@/client/fetcher'
// import { fetcher } from '@/client/fetcher'

interface AddExpenseBody {
  date: string
  cost: number
  content: string
}
interface ExpenseAddFormProps {
  user: User
}
export default function ExpenseAddForm({ user }: ExpenseAddFormProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: items, isLoading } = useCategoryQuery(searchQuery, user.id)
  const { state, setState } = usePersistCategory()
  const { register, handleSubmit } = useForm<AddExpenseBody>()

  const onSubmit = (body: AddExpenseBody) => {
    fetcher(`/api/expenses?userId=${user.id}`, {
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
          setState(item.value)
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

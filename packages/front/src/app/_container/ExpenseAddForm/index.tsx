'use client'
import dayjs from 'dayjs'
import AutoComplete from './AutoComplete'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useState } from 'react'
import { User } from '@/model'
import styled from 'styled-components'
import { SPACE } from '@/styles/common'

interface ExpenseAddFormProps {
  user: User
}
export default function ExpenseAddForm({ user }: ExpenseAddFormProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: items, isLoading } = useCategoryQuery(searchQuery, user.id)

  return (
    <FormContainer>
      <DateInput
        type='date'
        placeholder='날짜'
        defaultValue={dayjs(Date.now()).format('YYYY-MM-DD')}
      />
      <AutoComplete
        items={items}
        onSubmit={(item) => console.log(item)}
        onChange={(e) => setSearchQuery(e)}
        isLoading={isLoading}
      />
      <CostInput type='text' placeholder='금액' />
      <TextArea placeholder='내용' rows={2} />
      <SubmitInput type='submit'></SubmitInput>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  input {
    margin: 0 ${SPACE[4]};
  }
`
const DateInput = styled.input`
  width: 15rem;
  height: 4rem;
`

const CostInput = styled.input`
  width: 15rem;
  height: 4rem;
`

const TextArea = styled.textarea`
  width: 15rem;
  height: 4rem;
`
const SubmitInput = styled.input`
  width: 15rem;
`

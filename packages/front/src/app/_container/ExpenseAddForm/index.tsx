'use client'
import dayjs from 'dayjs'

import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useState } from 'react'
import styled from 'styled-components'
import { COLOR, SPACE, TEXT } from '@/styles/common'
import { usePersistCategory } from '@/hooks/usePersistCategory'
import { useForm } from 'react-hook-form'
import { dateToISOString } from '@/util'
import { useRecoilState } from 'recoil'
import { expenseAsyncState } from '@/store/expenseFetchingState'
import { useExpensesListMutation } from '@/hooks/mutation/expense'
import { AutoComplete } from 'greenbean-pack'
import { Spin } from '@/components/Loading/Spin'
import { DATE_FORMAT } from '@/constants'
import { Button } from '@/components/Buttons/Button'
import { UncontrolledInput as Input } from '@/components/Inputs/UncontrolledInput'
import { ChildrenWith } from '@/components/UI/ChildrenWith'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { AddIcon } from '@/components/UI/AddIcon'

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

  const { isMobile } = useMediaQuery()

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
      <Input
        type="date"
        placeholder="날짜"
        $size="large"
        defaultValue={dayjs(Date.now()).format(DATE_FORMAT)}
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
        renderListIsLoading={() => '로딩중...'}
        renderListOptions={(item, isSelected) => {
          return <RenderItem $selected={isSelected}>{item.value}</RenderItem>
        }}
        inputStyle={{
          width: '15rem',
          height: '4.8rem',
          fontSize: '1.6rem',
          borderRadius: '0.5rem',
          border: '1px solid black',
          padding: '1rem'
        }}
      />
      <Input type="number" placeholder="금액" required min={0} {...register('cost')} />
      <Input placeholder="내용" {...register('content')} />
      <Button type="submit" $size="small" title="소비 내역 추가하기">
        <ChildrenWith
          isLoading={isFetching}
          loadingElement={<Spin />}
          isMobile={isMobile}
          mobileElement={<AddIcon />}
          defaultElement={<p>추가</p>}
        />
      </Button>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  input {
    margin: 0 ${SPACE[4]};
  }
  button {
    width: fit-content;
  }
`

const RenderItem = styled.div<{ $selected: boolean }>`
  font-size: ${TEXT.size.base};
  padding: ${SPACE[2]};
  background-color: ${({ $selected }) => ($selected ? `${COLOR.tertiary}` : `${COLOR.white}`)};
  &:hover {
    background-color: ${COLOR.tertiary};
  }
`

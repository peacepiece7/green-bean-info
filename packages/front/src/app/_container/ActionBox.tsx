'use client'
import { Button } from '@/components/Buttons/Button'
import { UncontrolledInput as Input } from '@/components/Inputs/UncontrolledInput'
import { searchState, sortState } from '@/store/filterState'
import { SPACE } from '@/styles/common'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

const sortOptions = [
  { label: '최신순', value: 'asc' },
  { label: '오래된순', value: 'desc' }
]

interface InputValue {
  search: string
  sort: string
}
export default function ActionBox() {
  const [sort, setSort] = useRecoilState(sortState)
  const [search, setSearch] = useRecoilState(searchState)
  const { register, handleSubmit } = useForm<InputValue>()

  const submitForm = (form: InputValue) => {
    setSort((prev) => form.sort as typeof prev)
    setSearch(form.search)
  }

  return (
    <FormWrapper onSubmit={handleSubmit(submitForm)}>
      <Input placeholder="카테고리 또는 내용" $size="auto" {...register('search')} defaultValue={search ?? ''} />
      <Select id="sort" {...register('sort')} defaultValue={sort}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Button type="submit" $size="auto" $variant="primary">
        검색
      </Button>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  display: flex;
  justify-content: flex-end;
  margin: ${SPACE[12]};
  button {
    margin-left: 2rem;
  }
`

const Select = styled.select`
  margin-left: 1rem;
  border-radius: 0.5rem;
  border: 1px solid gray;
  padding: 0 1rem;
  font-size: 1.6rem;
  option {
    margin-top: 1rem;
  }
`

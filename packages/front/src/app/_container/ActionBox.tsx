'use client'
import { Button } from '@/components/Buttons/Button'
import { UncontrolledInput as Input } from '@/components/Inputs/UncontrolledInput'
import { DeleteIcon } from '@/components/UI/DeleteIcon'
import { searchState, sortState } from '@/store/filterState'
import { SPACE, TEXT } from '@/styles/common'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

const sortOptions = [
  { label: '최신순', value: 'desc' },
  { label: '오래된순', value: 'asc' }
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

  const CancelSearchQuery = () => {}

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit(submitForm)}>
        <InputWrapper>
          <Input placeholder="카테고리 또는 내용" $size="auto" {...register('search')} defaultValue={search ?? ''} />
          <Button
            onClick={CancelSearchQuery}
            $size="auto"
            style={{
              position: 'absolute',
              right: '1rem',
              padding: 0,
              border: 0,
              height: '100%',
              backgroundColor: 'transparent'
            }}
          >
            <DeleteIcon />
          </Button>
        </InputWrapper>
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
      {search && (
        <SearchResultWrapper>
          <strong>{search}</strong> 검색 결과
        </SearchResultWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: ${SPACE[12]};
`

const SearchResultWrapper = styled.p`
  font-size: ${TEXT.size.base};
  margin-top: ${SPACE[12]};
  strong {
    font-size: ${TEXT.size.lg};
  }
`

const FormWrapper = styled.form`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 1rem;
  }
`
const InputWrapper = styled.div`
  position: relative;
  height: fit-content;
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

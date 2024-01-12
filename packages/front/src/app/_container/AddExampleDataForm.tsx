'use client'

import { Button } from '@/components/Buttons/Button'
import { useExpensesListMutation } from '@/hooks/mutation/expense'
import { SHADOW, SPACE, TEXT } from '@/styles/common'
import styled from 'styled-components'

export function AddExampleDataForm() {
  const { addMockExpenseMutate } = useExpensesListMutation()
  const handleAddMockData = () => {
    addMockExpenseMutate()
  }
  return (
    <Container>
      <Title>📝 아직 지출 내역이 없습니다!</Title>
      <ButtonWrapper>
        <Button type="button" $size="large" onClick={handleAddMockData}>
          임시 데이터 추가하기
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: ${SPACE[24]};
  margin: ${SPACE[8]};
  margin-top: 0;
  box-shadow: ${SHADOW.base};
  border-radius: 3rem;
  backdrop-filter: blur(2rem);
`
const Title = styled.h2`
  font-size: ${TEXT.size['3xl']};
  font-weight: 400;
  margin-bottom: ${SPACE[24]};
`
const ButtonWrapper = styled.div`
  text-align: end;
`

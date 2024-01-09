import Modal from '@/components/Modal'
import ExpenseAddForm from './index'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Buttons/Button'
import styled from 'styled-components'
import { COLOR, SPACE } from '@/styles/common'
import { useRecoilValue } from 'recoil'
import { expenseAddIsFetchingState } from '@/store/expenseFetchingState'

export default function ExpenseAddFormMobile() {
  const [open, setOpen] = useState(false)
  const isFetching = useRecoilValue(expenseAddIsFetchingState)

  useEffect(() => {
    if (!open) return
    if (!isFetching) setOpen(false)
  }, [isFetching])

  return (
    <Container>
      <Button onClick={() => setOpen(true)} $size="large">
        <Text>소비 내역 추가하기</Text>
      </Button>
      {open && (
        <Modal.Portal>
          <Modal.Form onClose={() => setOpen(false)}>
            <ExpenseFormWrapper>
              <FormTitle>Expense Add Form</FormTitle>
              <div>
                <ExpenseAddForm />
              </div>
            </ExpenseFormWrapper>
          </Modal.Form>
        </Modal.Portal>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${SPACE[8]};
`

const ExpenseFormWrapper = styled.div`
  position: absolute;
  width: 80%;
  height: fit-content;
  inset: 0;
  margin: auto;
  border: 3px solid ${COLOR.secondary};
  border-radius: 0.5rem;
  background-color: ${COLOR.white};
  & > div {
    max-width: 80%;
    margin: 0 auto;
  }
`

const FormTitle = styled.h2`
  margin: ${SPACE[8]};
  font-size: 2rem;
  text-align: center;
`

const Text = styled.p`
  white-space: nowrap;
`

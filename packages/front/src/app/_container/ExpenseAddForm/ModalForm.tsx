'use clinet'

import { Button } from '@/components/Buttons/Button'
import { CloseIcon } from '@/components/UI/CloseIcon'
import styled from 'styled-components'

interface ExpenseAddModalFormProps {
  children: React.ReactNode
  onClose: VoidFunction
}
export function ExpenseAddModalForm({ children, onClose }: ExpenseAddModalFormProps) {
  return (
    <Section
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      {children}
      <Button
        onClick={onClose}
        $size="auto"
        style={{
          position: 'absolute',
          top: '3rem',
          right: '6rem',
          border: 'none'
        }}
      >
        <CloseIcon />
      </Button>
    </Section>
  )
}

const Section = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.8);
`

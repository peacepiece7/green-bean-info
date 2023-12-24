'use client'

import { COLOR, SHADOW, TRANSITION } from '@/styles/common'
import styled from 'styled-components'
import LogoutBtn from '@/components/Buttons/LogoutBtn'

interface DropdownProps {
  open: boolean
  options?: {
    height: number
    width: number
    pos: 'left' | 'right' | 'center'
  }
  children?: React.ReactNode
}

export default function Dropdown({
  open,
  options = { height: 200, width: 200, pos: 'right' },
  children,
}: DropdownProps) {
  const { width, height, pos } = options
  return (
    <Container $open={open} $height={height} $width={width} $pos={pos}>
      <DropdownForm $height={height}>
        {children}
        <LogoutBtn />
      </DropdownForm>
    </Container>
  )
}

interface DowndownProps {
  $open: boolean
  $height: number
  $width: number
  $pos?: 'left' | 'right' | 'center'
}

const Container = styled.div<DowndownProps>`
  position: absolute;
  top: 3rem;
  right: ${({ $pos }) => ($pos === 'right' ? '0' : 'auto')};
  left: ${({ $pos }) => ($pos === 'left' ? '0' : 'auto')};
  margin: ${({ $pos }) => ($pos === 'center' ? '0 auto' : '0')};
  height: ${({ $open, $height }) => ($open ? `${$height + 50}px` : '0')};
  width: ${({ $width }) => `${$width}px`};
  transition: ${TRANSITION.all};
  overflow: hidden;
  padding: 0.5rem;
`
const DropdownForm = styled.div<{ $height: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: ${({ $height }) => `${$height}px`};
  background-color: ${COLOR.white};
  margin-top: 2rem;
  padding: 1rem 0;
  box-shadow: ${SHADOW.sm};
`

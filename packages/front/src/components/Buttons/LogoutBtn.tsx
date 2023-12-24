'use client'
import { BG, COLOR, TEXT, TRANSITION } from '@/styles/common'
import { signOut } from 'next-auth/react'
import styled from 'styled-components'

export default function LogoutBtn() {
  return <Button onClick={() => signOut()}>SignOut</Button>
}

const Button = styled.button`
  background-color: ${BG.color.primary};
  color: ${COLOR.black};
  font-size: ${TEXT.size.base};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: ${TRANSITION.fast};
  &:hover {
    background-color: ${COLOR.gray};
  }
`

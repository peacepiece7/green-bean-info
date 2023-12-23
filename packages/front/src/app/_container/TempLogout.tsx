'use client'
import { BG, COLOR } from '@/styles/common'
import { signOut } from 'next-auth/react'
import styled from 'styled-components'

export default function TempLogout() {
  return <Button onClick={() => signOut()}>SignOut</Button>
}

const Button = styled.button`
  background-color: ${BG.color.primary};
  color: ${COLOR.black};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.gray};
  }
`

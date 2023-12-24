'use client'
import { User } from '@/model'
import styled from 'styled-components'
import GNBProfile from './GNBProfile'
import GNBLogo from './GNBLogo'

interface GNBProps {
  user: User
}
export default function GNB({ user }: GNBProps) {
  return (
    <Container>
      <GNBLogo />
      <GNBProfile user={user} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 8rem;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`

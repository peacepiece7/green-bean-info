'use client'
import { User } from '@/model'
import { TEXT } from '@/styles/common'
import Image from 'next/image'
import styled from 'styled-components'
import GNBDropdown from './GNBDropdown'
import useBeforeLeaveOrEnterMouse from '@/hooks/useBeforeMouseLeave'

interface GNBProfileProps {
  user: User
}
export default function GNBProfile({ user }: GNBProfileProps) {
  const { ref, isEnter } = useBeforeLeaveOrEnterMouse<HTMLDivElement>()

  return (
    <Container ref={ref}>
      <ProfileImage
        src={user.image}
        alt={user.username}
        width={50}
        height={50}
      />
      <p>{`반갑습니다 ${user.username}님`}</p>
      <GNBDropdown open={isEnter} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  p {
    margin-left: 1rem;
    font-size: ${TEXT.size.lg};
  }
`

const ProfileImage = styled(Image)`
  border-radius: 50%;
`

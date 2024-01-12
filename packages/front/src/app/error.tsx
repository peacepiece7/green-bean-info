'use client'

import { Button } from '@/components/Buttons/Button'
import Link from 'next/link'
import styled from 'styled-components'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  if (process.env.NODE_ENV === 'development') console.error(error)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '2rem'
      }}
    >
      <h2>잘못된 접근입니다. 🥲</h2>
      <LinkWrapper>
        <Link href="/">홈으로 돌아가기</Link>
      </LinkWrapper>
      <Button onClick={() => reset()}>다시 시도하기</Button>
    </div>
  )
}

const LinkWrapper = styled.div`
  margin: 2rem;
`

'use client'

import { COLOR, TEXT } from '@/styles/common'
import styled from 'styled-components'

export default function Description() {
  return (
    <Container>
      <p>소비 내역을</p>
      <p>기록하고 싶을 땐</p>
      <p>
        <strong>My Wallet.</strong>
      </p>
      <Caption>소비 내역을 기록하고, 분석하는 애플리케이션입니다.</Caption>
    </Container>
  )
}

const Container = styled.div`
  font-size: ${TEXT.size['5xl']};
  font-weight: 700;
  text-align: end;
  p {
    margin-bottom: 0.5rem;
  }
  strong {
    font-size: ${TEXT.size['7xl']};
    color: ${COLOR.tertiary};
    font-weight: 700;
  }
`

const Caption = styled.p`
  font-size: ${TEXT.size['xs']};
  font-weight: 400;
  text-align: end;
  color: ${COLOR.gray};
  margin-bottom: 0.5rem;
`

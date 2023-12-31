'use client'

import Image from 'next/image'
import styled from 'styled-components'

interface SingInLayoutProps {
  children: React.ReactNode
}

export default function FloatingImage({ children }: SingInLayoutProps) {
  return (
    <FloatingImageWrapper>
      <ImageWrapper>
        <Image src="/png/payment.png" alt="payment" width={720} height={720} priority={true} />
      </ImageWrapper>
      {children}
    </FloatingImageWrapper>
  )
}

const FloatingImageWrapper = styled.main`
  position: relative;
  overflow-x: hidden;
  margin: auto;
`

const ImageWrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 10%;
  z-index: -1;
  img {
    min-width: 500px;
    opacity: 0.4;
    object-fit: cover;
  }
`

'use client'
import { WINDOW } from '@/styles/common'
import Image from 'next/image'
import styled from 'styled-components'

interface SingInLayoutProps {
  children: React.ReactNode
}
export default function layout({ children }: SingInLayoutProps) {
  return (
    <LayoutContainer>
      <FloatingImage>
        <Image
          src='/png/payment.png'
          alt='payment'
          width={720}
          height={720}
          priority={true}
        />
      </FloatingImage>
      {children}
    </LayoutContainer>
  )
}

const LayoutContainer = styled.main`
  position: relative;
  overflow-x: hidden;
  max-width: ${WINDOW.tablet};
  height: 100dvh;
  margin: auto;
`

const FloatingImage = styled.div`
  position: fixed;
  top: 20%;
  left: 10%;
  z-index: -1;
  img {
    min-width: 500px;
    opacity: 0.4;
    /* object-fit: scale-down; */
  }
`

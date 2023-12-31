'use client'
import FloatingImage from '@/components/Layouts/FloatingImage'
import { SPACE, WINDOW } from '@/styles/common'
import styled from 'styled-components'
interface SingInLayoutProps {
  children: React.ReactNode
}
export default function layout({ children }: SingInLayoutProps) {
  return (
    <SignInLayoutWrapper>
      <ContentWrapper>
        <FloatingImage>{children}</FloatingImage>
      </ContentWrapper>
    </SignInLayoutWrapper>
  )
}

const SignInLayoutWrapper = styled.div`
  max-width: ${WINDOW.tablet};
  height: 100dvh;
  margin: auto;
`
const ContentWrapper = styled.div`
  padding: ${SPACE[16]};
`

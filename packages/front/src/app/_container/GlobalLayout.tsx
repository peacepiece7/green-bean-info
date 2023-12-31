'use client'

import styled from 'styled-components'

interface GlobalLayoutProps {
  children: React.ReactNode
}
export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>
}

const LayoutWrapper = styled.div<GlobalLayoutProps>`
  width: 100%;
  margin: 0 auto;
`

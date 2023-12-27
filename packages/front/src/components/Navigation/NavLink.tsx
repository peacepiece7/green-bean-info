import { TEXT, TRANSITION } from '@/styles/common'
import Link from 'next/link'
import styled from 'styled-components'

interface LinkProps {
  children?: React.ReactNode
  to: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  disabled?: boolean
}

export const NavLink = ({ children, to, onClick, disabled = false }: LinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick && onClick(e)
  }
  return (
    <SLink href={to} onClick={handleClick}>
      {children}
    </SLink>
  )
}

const SLink = styled(Link)`
  display: block;
  width: 100%;
  color: ${TEXT.color.primary};
  text-decoration: none;
  transition: ${TRANSITION.all};
  font-size: ${TEXT.size.base};
  &:hover {
    color: ${TEXT.color.secondary};
  }
`

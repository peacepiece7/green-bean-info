import { SPACE } from '@/styles/common'
import styled from 'styled-components'

const Item = styled.li`
  margin: ${SPACE[3]};
  list-style: none;
`

interface NavItemProps {
  children?: React.ReactNode
  disabled?: boolean
}
export const NavItem = ({ children, disabled = false }: NavItemProps) => {
  return <Item role={disabled ? 'presentation' : undefined}>{children}</Item>
}

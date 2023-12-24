import styled from 'styled-components'

const List = styled.ul<NavListProps>`
  display: flex;
  ${(p) => (p.$virtical ? 'flex-direction: column;' : 'flex-direction: row;')}
`

interface NavListProps {
  children?: React.ReactNode
  $virtical?: boolean
}

export const NavList = ({ children, $virtical = false }: NavListProps) => {
  return <List $virtical={$virtical}>{children}</List>
}

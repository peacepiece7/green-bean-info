import styled from 'styled-components'
import { NavList } from './NavList'
import { NavItem } from './NavItem'
import { NavLink } from './NavLink'
import { TRANSITION } from '@/styles/common'

export interface NavigationProps {
  $expanded?: boolean
  children?: React.ReactNode
}

const NavWrapper = styled.nav<NavigationProps>`
  display: block;
  height: fit-content;
  overflow: hidden;
  transition: ${TRANSITION.to('width')};
`

/**
 * @description
 * <Nav.Link> is a styled component that wraps the Next.js <Link> component.
 * @example
 * return (
 *  <Nav>
 *   <Nav.List>
 *    <Nav.Item>
 *      <Nav.Link href="#">Link</Nav.Link>
 *      </Nav.Item>
 *    <Nav.Item>
 *      <Link src="/foo/bar.png" ... />
 *   </Nav.List>
 * </Nav>
 * )
 */
const Nav = ({ children, $expanded = true }: NavigationProps) => {
  return <NavWrapper $expanded={$expanded}>{children}</NavWrapper>
}

Nav.List = NavList
Nav.Item = NavItem
Nav.Link = NavLink

export default Nav

'use client'

import { COLOR, TRANSITION } from '@/styles/common'
import styled from 'styled-components'
import Nav from '@/components/Navigation'
import Dropdown from '@/components/Dropdown'

interface GNBDropdownProps {
  open: boolean
}

export default function GNBDropdown({ open }: GNBDropdownProps) {
  const { Link, Item, List } = Nav

  return (
    <Dropdown open={open}>
      <ItemWrapper>
        <Nav>
          <List $virtical={true}>
            <Item>
              <Link to="/my-page">마이 페이지</Link>
            </Item>
            <Item>
              <Link to="/analyze">소비 현황 분석하기</Link>
            </Item>
            <Item>
              <Link to="/calendar">캘린더 보러가기</Link>
            </Item>
          </List>
        </Nav>
      </ItemWrapper>
    </Dropdown>
  )
}

/**
 * @description css override가 동작하지 않는 문제가 있기때문에 다음과 같이 wrapping 합니다. (5 버전에서는 동작하지만 "$" 식별자를 모두 지워야합니다.)
 * @see https://styled-components.com/releases#v6.0.0%20beta%200
 * @see https://github.com/styled-components/styled-components/issues/1816
 * @example
 *  const Item = styled(Nav.Item)`
 *  border-bottom: 1px solid ${COLOR.gray};
 *  padding: 50px;
 *  && { // 이렇게 해도 안됩니다.
 *  border-bottom: 1px solid ${COLOR.gray};
 *  padding: 50px;
 * }
 * `
 */
const ItemWrapper = styled.div`
  li {
    border-bottom: 1px solid ${COLOR.gray};
    padding: 1rem;
    &:hover {
      background-color: ${COLOR.tertiary};
      transition: ${TRANSITION.fast};
    }
  }
`

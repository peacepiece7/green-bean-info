'use client'

import { Item } from '@/hooks/useAutocomplete'
import { COLOR } from '@/styles/common'
import styled from 'styled-components'

interface AutoCompleteListProps {
  items?: Item[]
  open: boolean
  isLoading: boolean
}
// prettier-ignore
export default function AutoCompleteList({items, open, isLoading} : AutoCompleteListProps) {


  if(isLoading) return (
    <List $open={open}>
      <ListItem $active={false} $open={open}>로딩중...</ListItem>
    </List>
  )

  if(!items || !items.length) return null

  return (
        <List $open={open}>
          {items.map((item) => {
            return (
              <ListItem
                key={item.id}
                value={item.value}
                $active={!!item.selected}
                $open={open}
              >
                {item.value}
              </ListItem>
            )
          })}
        </List>
    )
}

const List = styled.ul<{ $open: boolean }>`
  position: absolute;
  width: 100%;
  top: 4rem;
  left: 0;
  right: 0;
  margin: auto;
  border: ${({ $open }) => ($open ? '1px solid black' : 'none')};
`

const ListItem = styled.li<{ $active: boolean; $open: boolean }>`
  width: 100%;
  background-color: ${({ $active }) => ($active ? COLOR.tertiary : COLOR.white)};
  height: ${({ $open }) => ($open ? '2rem' : '0px')};
  z-index: 1;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
`

'use client'

import { Item } from '@/hooks/useAutocomplete'
import { COLOR } from '@/styles/common'
import styled from 'styled-components'

interface AutoCompleteListProps {
  items: Item[]
  open: boolean
}
// prettier-ignore
export default function AutoCompleteList({items, open} : AutoCompleteListProps) {
    return (
        <List $open={open}>
          {items.map((item) => {
            return (
              <ListItem
                key={item.key}
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
  top: 4rem;
  border: ${({ $open }) => ($open ? '1px solid black' : 'none')};
`

const ListItem = styled.li<{ $active: boolean; $open: boolean }>`
  width: 30rem;
  background-color: ${({ $active }) =>
    $active ? COLOR.tertiary : COLOR.white};
  height: ${({ $open }) => ($open ? '2rem' : '0px')};
  z-index: 1;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
`

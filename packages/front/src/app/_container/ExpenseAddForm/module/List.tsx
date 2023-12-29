import { CSSProperties, forwardRef, ForwardedRef } from 'react'
import { AutoCompleteItem, AutoCompleteProps } from '.'
import styled from 'styled-components'

const ulStyle = (open: boolean): CSSProperties => ({
  border: open ? '1px solid black' : 'none'
})

const listStyle = (open: boolean): CSSProperties => ({
  width: '100%',
  height: open ? 'auto' : '0px',
  zIndex: 1,
  overflow: 'hidden',
  transition: 'height 0.2s ease-in-out'
})

interface ListProps<T extends AutoCompleteItem> {
  items?: T[]
  open: boolean
  isLoading?: boolean
  renderListOptions: AutoCompleteProps<T>['renderListOptions']
  renderListIsLoading?: AutoCompleteProps<T>['renderListIsLoading']
  onMounseDown: (item: T) => void
}

export const ForwardList = forwardRef(function MYList<T extends AutoCompleteItem>(
  { items, open, isLoading, renderListOptions, renderListIsLoading, onMounseDown }: ListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  const handleOnClick = (item: T) => {
    onMounseDown(item)
  }
  if (isLoading)
    return (
      <ul style={ulStyle(open)}>
        <li style={listStyle(open)}>{renderListIsLoading ? renderListIsLoading() : 'Loading...'}</li>
      </ul>
    )

  if (!items || !items.length) return null

  return (
    <List $open={open} ref={ref}>
      {items.map((item) => {
        return (
          <ListItem key={item.id} $open={open} onMouseDown={() => handleOnClick({ ...item, test: false })}>
            {renderListOptions(item, !!item.selected)}
          </ListItem>
        )
      })}
    </List>
  )
})

const List = styled.ul<{ $open: boolean }>`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  border: ${({ $open }) => ($open ? '1px solid black' : 'none')};
`

const ListItem = styled.li<{ $open: boolean }>`
  width: 100%;
  height: ${({ $open }) => ($open ? '2rem' : '0px')};
  z-index: 1;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
`

import styled from 'styled-components'
import { AutoCompleteItem, AutoCompleteProps } from '../AutoComplete'

interface ListProps<T extends AutoCompleteItem> {
  items?: T[]
  open: boolean
  isLoading?: boolean
  renderListOptions: AutoCompleteProps<T>['renderListOptions']
  renderListIsLoading?: AutoCompleteProps<T>['renderListIsLoading']
  onMounseDown: (item: T) => void
}

export function AutoCompleteList<T extends AutoCompleteItem>({
  items,
  open,
  isLoading,
  renderListOptions,
  renderListIsLoading,
  onMounseDown
}: ListProps<T>) {
  const handleOnClick = (item: T) => {
    onMounseDown(item)
  }

  if (isLoading) {
    const value = renderListIsLoading ? renderListIsLoading() : 'Loading...'
    if (typeof value === 'string') {
      const loadingItem = {
        id: 'loading',
        value,
        selected: false
      }
      return (
        <List $open={open}>
          <ListItem $open={open}>{renderListOptions(loadingItem, false)}</ListItem>
        </List>
      )
    } else {
      return (
        <List $open={open}>
          <ListItem $open={open}>{value}</ListItem>
        </List>
      )
    }
  }

  if (!items || !items.length) return null

  return (
    <List $open={open}>
      {items.map((item) => {
        return (
          <ListItem key={item.id} $open={open} onMouseDown={() => handleOnClick({ ...item, test: false })}>
            {renderListOptions(item, !!item.selected)}
          </ListItem>
        )
      })}
    </List>
  )
}

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
  z-index: 1;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
`

'use client'

import useAutoComplete, { Item } from '@/hooks/useAutocomplete'
import { useDebounce } from '@/hooks/useDebounce'
import { RefObject, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import AutoCompleteList from './List'

type InputRef = RefObject<HTMLInputElement>

interface AutoCompleteProps {
  items: Item[]
  onSubmit: (item: Item) => void
  onChange: (item: Item) => void
}
export default function AutoComplete({
  items,
  onSubmit,
  onChange,
}: AutoCompleteProps) {
  const [inputValue, setInputValue] = useState('')

  // * debounce callback을 등록합니다.
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceCb = useDebounce<InputRef>(() => {})
  debounceCb(inputRef)

  const handleKeyDown = useCallback((selectedItem: Item) => {
    onChange(selectedItem)
  }, [])

  const handleSubmit = useCallback((item: Item) => {
    setInputValue(item.value)
    onSubmit(item)
  }, [])

  const { open, setOpen } = useAutoComplete<HTMLInputElement>(
    inputRef,
    items,
    handleKeyDown,
    handleSubmit
  )

  return (
    <Container>
      <Input
        ref={inputRef}
        type='text'
        placeholder='카테고리'
        autoComplete='off'
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <AutoCompleteList items={items} open={open} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
const Input = styled.input`
  width: 30rem;
  height: 4rem;
`

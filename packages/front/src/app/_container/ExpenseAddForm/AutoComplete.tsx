'use client'

import useAutoComplete, { Item } from '@/hooks/useAutocomplete'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AutoCompleteList from './List'

interface AutoCompleteProps {
  items?: Item[]
  onSubmit: (item: Item) => void
  onChange?: (value: string) => void
  isLoading?: boolean
}
export default function AutoComplete({
  items,
  onSubmit,
  onChange: onChageInput,
  isLoading,
}: AutoCompleteProps) {
  const [list, setList] = useState<Item[] | undefined>()
  const [inputValue, setInputValue] = useState('')

  // * debounce callback을 등록합니다.
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setList(items)
  }, [items])

  const handleKeyDown = useCallback((item: Item) => {
    setList(
      (prev) =>
        prev?.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, selected: true }
            : { ...prevItem, selected: false }
        )
    )
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
        onChange={(e) => {
          setInputValue(e.target.value)
          onChageInput && onChageInput(e.target.value)
        }}
        value={inputValue}
      />
      {isLoading ? <div>로딩중...</div> : null}
      <AutoCompleteList items={list} open={open} />
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

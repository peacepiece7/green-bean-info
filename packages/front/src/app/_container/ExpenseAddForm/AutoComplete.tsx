'use client'

import useAutoComplete, { Item } from '@/hooks/useAutocomplete'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AutoCompleteList from './List'

interface AutoCompleteProps {
  items?: Item[]
  onSubmit: (item: Item) => void
  onChange?: (value: string) => void
  isLoading?: boolean
  recommendStateBeforeChange?: string[]
}
export default function AutoComplete({
  items,
  onSubmit,
  onChange: onChageInput,
  isLoading,
  recommendStateBeforeChange: state,
}: AutoCompleteProps) {
  const [list, setList] = useState<Item[] | undefined>()
  const [inputValue, setInputValue] = useState('')
  // * debounce callback을 등록합니다.
  const inputRef = useRef<HTMLInputElement>(null)
  const { open, setOpen } = useAutoComplete<HTMLInputElement>(
    inputRef,
    list,
    handleKeyDown,
    handleSubmit
  )

  function handleKeyDown(item: Item) {
    setList(
      (prev) =>
        prev?.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, selected: true }
            : { ...prevItem, selected: false }
        )
    )
  }

  function handleSubmit(item: Item) {
    setInputValue(item.value)
    onSubmit(item)
  }

  // * Open 상태이고, 인풋 창이 비었을 때, 추천 카테고리를 보여줍니다.
  useEffect(() => {
    if (open && !inputValue) {
      const recommendList = state?.map((item) => ({
        id: item,
        value: item,
        selected: false,
      }))
      setList(recommendList)
    } else {
      setList(items)
    }
  }, [inputValue, open, state, items])

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
        required
      />
      <AutoCompleteList items={list} open={open} isLoading={!!isLoading} />
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

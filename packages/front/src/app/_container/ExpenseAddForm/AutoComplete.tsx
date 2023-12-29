'use client'

import useAutoComplete, { Item } from '@/hooks/useKeyboardEvent'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AutoCompleteList from './List'

interface AutoCompleteProps {
  items?: Item[]
  onEnter: (item: Item) => void
  onSelect?: (value: string) => void
  isLoading?: boolean
  recommendStateBeforeChange?: string[]
  reset: boolean
}
export default function AutoComplete({
  items,
  onEnter,
  onSelect: onSelectList,
  isLoading,
  recommendStateBeforeChange: state,
  reset
}: AutoCompleteProps) {
  const [list, setList] = useState<Item[] | undefined>()
  const [inputValue, setInputValue] = useState('')
  // * debounce callback을 등록합니다.
  const inputRef = useRef<HTMLInputElement>(null)
  const { open, setOpen } = useAutoComplete<HTMLInputElement, Item>(inputRef, list, handleKeyDown, handleSubmit)

  function handleKeyDown(item: Item) {
    setList(
      (prev) =>
        prev?.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, selected: true } : { ...prevItem, selected: false }
        )
    )
  }

  function handleSubmit(item: Item) {
    inputRef.current!.value = ''
    setInputValue(item.value)
    onEnter(item)
  }

  // * Open 상태이고, 인풋 창이 비었을 때, 추천 카테고리를 보여줍니다.
  useEffect(() => {
    if (open && !inputValue) {
      const recommendList = state?.map((item) => ({
        id: item,
        value: item,
        selected: false
      }))
      setList(recommendList)
    } else {
      setList(items)
    }
  }, [inputValue, open, state, items])

  useEffect(() => {
    if (reset) {
      setInputValue('')
    }
  }, [reset])

  return (
    <Container>
      <Input
        ref={inputRef}
        type="text"
        placeholder="카테고리"
        autoComplete="off"
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setInputValue(e.target.value)
          onSelectList && onSelectList(e.target.value)
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
  width: 30rem;
`
const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 4rem;
`

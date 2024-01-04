'use client'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLOR, SPACE, TEXT } from '@/styles/common'
import { usePersistCategory } from '@/hooks/usePersistCategory'
import { AutoComplete } from 'greenbean-pack'
import { useRecoilState } from 'recoil'
import { searchQueryState } from '@/store/expenseFetchingState'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function AutoCompleteInput() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState)
  const [isReset, setIsReset] = useState(false)
  const { data: items, isLoading } = useCategoryQuery(searchQuery)
  const { persistState } = usePersistCategory()
  const { isMobile } = useMediaQuery()

  useEffect(() => {
    if (!searchQuery) setIsReset(true)
    else setIsReset(false)
  }, [searchQuery])

  return (
    <AutoComplete
      items={items}
      recommendStateBeforeChange={persistState}
      isLoading={isLoading}
      onSelect={(e) => {
        setSearchQuery(e)
      }}
      onEnter={(item) => setSearchQuery(item.value)}
      reset={isReset}
      renderListIsLoading={() => '로딩중...'}
      renderListOptions={(item, isSelected) => {
        return <RenderItem $selected={isSelected}>{item.value}</RenderItem>
      }}
      inputStyle={{
        width: isMobile ? '100%' : '15rem',
        fontSize: '1.6rem',
        borderRadius: '0.5rem',
        border: '1px solid black',
        padding: '1rem'
      }}
    />
  )
}

const RenderItem = styled.div<{ $selected: boolean }>`
  font-size: ${TEXT.size.base};
  padding: ${SPACE[2]};
  background-color: ${({ $selected }) => ($selected ? `${COLOR.tertiary}` : `${COLOR.white}`)};
  &:hover {
    background-color: ${COLOR.tertiary};
  }
`

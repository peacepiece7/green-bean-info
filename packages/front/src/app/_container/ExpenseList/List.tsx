'use client'

import { Button } from '@/components/Buttons/Button'
import { Spin } from '@/components/Loading/Spin'
import { DeleteIcon } from '@/components/UI/DeleteIcon'
import { EditIcon } from '@/components/UI/EditIcon'
import { ChildrenWith } from '@/components/UI/ChildrenWith'
import { DATE_FORMAT } from '@/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Expenses } from '@/model'
import { expenseDeleteQueue, expenseEditQueue } from '@/store/expenseFetchingState'
import { SHADOW, SPACE, TEXT } from '@/styles/common'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

interface ListProps {
  expenses: Expenses[]
  onDelete: (expense: Expenses) => void
  onEdit: (expense: Expenses) => void
}
export default function List({ expenses, onEdit, onDelete }: ListProps) {
  const ref = useRef<HTMLUListElement>(null)
  const [editStateQueue, setEditStateQueue] = useRecoilState(expenseEditQueue)
  const [deleteStateQueue, setDeleteStateQueue] = useRecoilState(expenseDeleteQueue)
  const { isMobile } = useMediaQuery()

  const handleOnSubmit = (id: string, cb: (expense: Expenses) => void) => {
    const item = ref.current!.querySelector(`#${id}`)!
    const [category, cost, content, date] = getTextContext(item, '.category', '.cost', '.content', '.date')
    cb({ id, category, cost: Number(cost), content, date })
  }

  return (
    <ul ref={ref}>
      {expenses.map((item) => {
        return (
          <ListItem key={item.id} id={item.id} className={item.id} $isMobile={isMobile}>
            <MobileListItemSeparator $isMobile={isMobile} $line="first">
              <input className="category" type="text" defaultValue={item.category} required />
              <input className="cost" type="number" defaultValue={item.cost} required />
              <input className="date" type="date" defaultValue={dayjs(item.date).format(DATE_FORMAT)} required />
            </MobileListItemSeparator>
            <MobileListItemSeparator $isMobile={isMobile} $line="second">
              <input className="content" type="text" defaultValue={item.content} />
              <ButtonWrapper>
                <Button
                  type="button"
                  $size="small"
                  title="소비 내역 수정하기"
                  onClick={() => {
                    setEditStateQueue((prev) => [...prev, item.id])
                    handleOnSubmit(item.id, onEdit)
                  }}
                  disabled={editStateQueue.includes(item.id)}
                >
                  <ChildrenWith
                    isLoading={editStateQueue.includes(item.id)}
                    loadingElement={<Spin />}
                    isMobile={isMobile}
                    mobileElement={<EditIcon />}
                    defaultElement={<p>수정</p>}
                  />
                </Button>
                <Button
                  type="button"
                  $size="small"
                  $variant="warn"
                  title="소비 내역 삭제하기"
                  onClick={() => {
                    setDeleteStateQueue((prev) => [...prev, item.id])
                    handleOnSubmit(item.id, onDelete)
                  }}
                  disabled={deleteStateQueue.includes(item.id)}
                >
                  <ChildrenWith
                    isLoading={deleteStateQueue.includes(item.id)}
                    loadingElement={<Spin />}
                    isMobile={isMobile}
                    mobileElement={<DeleteIcon />}
                    defaultElement={<p>삭제</p>}
                  />
                </Button>
              </ButtonWrapper>
            </MobileListItemSeparator>
          </ListItem>
        )
      })}
    </ul>
  )
}

const ListItem = styled.li<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  font-size: ${TEXT.size.xs};
  padding: ${SPACE[8]} ${SPACE[4]};
  margin: ${SPACE[4]} ${SPACE[8]};
  box-shadow: ${SHADOW.base};
  border-radius: 1rem;
  backdrop-filter: blur(2rem);
  input,
  button {
    display: block;
    height: 5rem;
    margin: 0 ${SPACE[4]};
  }
  input {
    width: 100%;
    max-width: 55rem;
  }
  button {
    width: fit-content;
    white-space: nowrap;
    cursor: pointer;
  }
`

const MobileListItemSeparator = styled.div<{ $isMobile: boolean; $line: 'first' | 'second' }>`
  display: flex;
  width: 100%;
  margin-top: ${({ $isMobile }) => ($isMobile ? SPACE[8] : 0)};
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

function getTextContext(element: Element, ...selectors: string[]) {
  return selectors.map((s) => (element.querySelector(s) as HTMLInputElement)?.value)
}

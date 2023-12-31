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
          <ListItem key={item.id} id={item.id} className={item.id}>
            <input className="category" type="text" defaultValue={item.category} required />
            <input className="cost" type="number" defaultValue={item.cost} required />
            <input className="content" type="text" defaultValue={item.content} />
            <input className="date" type="date" defaultValue={dayjs(item.date).format(DATE_FORMAT)} required />
            <Button
              type="button"
              $size="small"
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
          </ListItem>
        )
      })}
    </ul>
  )
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  height: 10rem;
  font-size: ${TEXT.size.xl};
  padding: ${SPACE[2]};
  margin: ${SPACE[4]};
  box-shadow: ${SHADOW.base};
  border-radius: 1rem;
  input,
  button {
    display: block;
    height: 5rem;
    margin: 0 ${SPACE[4]};
  }
  input {
    width: 100%;
  }
  button {
    white-space: nowrap;
    cursor: pointer;
  }
`

function getTextContext(element: Element, ...selectors: string[]) {
  return selectors.map((s) => (element.querySelector(s) as HTMLInputElement)?.value)
}

'use client'

import { Spin } from '@/components/Loading/Spin'
import { Expenses } from '@/model'
import { expenseDeleteQueue, expenseEditQueue } from '@/store/expenseFetchingState'
import { SPACE, TEXT } from '@/styles/common'
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
            <input className="date" type="date" defaultValue={dayjs(item.date).format('YYYY-MM-DD')} required />
            <Button
              type="button"
              onClick={() => {
                setEditStateQueue((prev) => [...prev, item.id])
                handleOnSubmit(item.id, onEdit)
              }}
              disabled={editStateQueue.includes(item.id)}
            >
              {editStateQueue.includes(item.id) ? <Spin /> : <p>수정</p>}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setDeleteStateQueue((prev) => [...prev, item.id])
                handleOnSubmit(item.id, onDelete)
              }}
              disabled={deleteStateQueue.includes(item.id)}
            >
              {deleteStateQueue.includes(item.id) ? <Spin /> : <p>삭제</p>}
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
  height: 30rem;
  font-size: ${TEXT.size.xl};
  input,
  button {
    margin: 0 ${SPACE[4]};
    min-height: 7rem;
  }
  button {
    width: 10rem;
    cursor: pointer;
  }
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    white-space: nowrap;
  }
`

function getTextContext(element: Element, ...selectors: string[]) {
  return selectors.map((s) => (element.querySelector(s) as HTMLInputElement)?.value)
}

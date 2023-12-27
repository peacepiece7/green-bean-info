'use client'

import { Expenses } from '@/model'
import { expenseAsyncState } from '@/store/expenseFetchingState'
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
  const [isFetching, setIsFetching] = useRecoilState(expenseAsyncState)
  const ref = useRef<HTMLUListElement>(null)
  const handleOnSubmit = (id: string, cb: (expense: Expenses) => void) => {
    setIsFetching(true)
    const item = ref.current!.querySelector(`#${id}`)!
    const [category, cost, content, date] = //
      getTextContext(item, '.category', '.cost', '.content', '.date')
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
            <button type="button" onClick={() => handleOnSubmit(item.id, onEdit)} disabled={isFetching}>
              수정
            </button>
            <button type="button" onClick={() => handleOnSubmit(item.id, onDelete)} disabled={isFetching}>
              삭제
            </button>
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

function getTextContext(element: Element, ...selectors: string[]) {
  return selectors.map((s) => (element.querySelector(s) as HTMLInputElement)?.value)
}

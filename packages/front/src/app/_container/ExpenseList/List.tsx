'use client'

import { Expenses } from '@/model'
import { SPACE, TEXT } from '@/styles/common'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface ListProps {
  expenses: Expenses[]
  onDelete: (id: number) => void
  onEdit: (expense: Expenses) => void
}
export default function List({ expenses }: ListProps) {
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    console.log(ref.current)
  }, [])

  const handleSubmit = (id: string) => {
    const item = ref.current!.querySelector(`#${id}`)!
    const [category, cost, content, date] = //
      getTextContext(item, 'category', 'cost', 'content', 'date')
    console.log(category, cost, content, date)
  }

  return (
    <ul ref={ref}>
      {expenses.map((item) => {
        return (
          <form
            key={item.id}
            id={item.id}
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(item.id)
            }}
          >
            <ListItem className={item.id}>
              <input className="category" type="text" defaultValue={item.category} required />
              <input className="cost" type="number" defaultValue={item.cost} required />
              <input className="content" type="text" defaultValue={item.content} />
              <input className="date" type="date" defaultValue={item.date} required />
              <input type="submit" value="수정" onClick={() => handleSubmit(item.id)} />
              <input type="submit" value="삭제" onClick={() => handleSubmit(item.id)} />
            </ListItem>
          </form>
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
  textarea {
    margin: 0 ${SPACE[4]};
    min-height: 7rem;
  }
  input[type='submit'] {
    width: 10rem;
    cursor: pointer;
  }
`

function getTextContext(element: Element, ...selectors: string[]) {
  return selectors.map((s) => element.querySelector(s)?.textContent)
}

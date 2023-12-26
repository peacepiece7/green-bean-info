'use client'

import { fetcher } from '@/client/fetcher'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Expenses, User } from '@/model'
import { SPACE, TEXT } from '@/styles/common'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

export interface ExpensesListData {
  content: Expenses[]
  currentPage: number
  pageSize: number
  totalCount: number
  totalPage: number
}

interface ExpenseListProps {
  user: User
}
export default function ExpenseList({ user }: ExpenseListProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { data, fetchNextPage } = useSuspenseInfiniteQuery<ExpensesListData>({
    queryKey: ['expenses'],
    queryFn: ({ pageParam }) =>
      fetcher(`/api/expenses?userId=${user.id}&page=${pageParam}`),
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPage > lastPage.currentPage) {
        return lastPage.currentPage + 1
      }
      return undefined
    },
    initialPageParam: 0,
  })

  const entry = useIntersectionObserver(ref, {})

  useEffect(() => {
    if (entry) fetchNextPage()
  }, [entry])

  const total = data.pages.flatMap((page) => [...page.content])

  if (!data) return null
  return (
    <ul>
      {total.map((item) => {
        return (
          <ListItem key={item.id}>
            <p>{item.category}</p>
            <p>{item.cost}</p>
            <p>{item.content ? item.content : '내용 없음'}</p>
            <p>{item.date}</p>
          </ListItem>
        )
      })}
      {data && <div ref={ref} />}
    </ul>
  )
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  height: 30rem;
  font-size: ${TEXT.size.xl};
  p {
    margin: 0 ${SPACE[4]};
  }
`

'use client'

import { useCalendarQuery } from '@/hooks/useCalendarQuery'
import { ExpenseCalendarFormList } from './ExpenseCalendarFormList'
import styled from 'styled-components'
import { SPACE, TEXT } from '@/styles/common'

interface CalendarModalContentProps {
  year: string
  month: string
  activeDate: string | null
}
export function CalendarModalContent({ year, month, activeDate }: CalendarModalContentProps) {
  const { data } = useCalendarQuery(year, month)
  const activeExpenseDataList = data?.filter((item) => item.date === activeDate)
  return (
    <div>
      <Title>일일 소비 내역 상세보기</Title>
      {activeExpenseDataList && <ExpenseCalendarFormList expenseList={activeExpenseDataList} />}
    </div>
  )
}

const Title = styled.h1`
  font-size: ${TEXT.size['3xl']};
  margin: ${SPACE['8']};
`

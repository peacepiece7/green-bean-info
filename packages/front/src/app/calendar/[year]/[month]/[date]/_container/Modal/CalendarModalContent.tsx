'use client'
import { useCalendarQuery } from '@/hooks/useCalendarQuery'
import { ExpenseCalendarFormList } from './ExpenseCalendarFormList'

interface CalendarModalContentProps {
  year: string
  month: string
  activeDate: string | null
}
export function CalendarModalContent({ year, month, activeDate }: CalendarModalContentProps) {
  const { data } = useCalendarQuery(year, month)
  const activeExpenseDataList = data?.filter((item) => item.date === activeDate)
  return <div>{activeExpenseDataList && <ExpenseCalendarFormList expenseList={activeExpenseDataList} />}</div>
}

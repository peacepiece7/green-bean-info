'use client'

import { fetcher } from '@/client/fetcher'
import { useQuery } from '@tanstack/react-query'

export interface CalendarExpenses {
  id: string
  userId: string
  date: string
  cost: number
  category: string
}

export function useCalendarQuery(year: string, month: string) {
  const { data, isLoading, isFetching } = useQuery<CalendarExpenses[]>({
    queryKey: ['calendar', year, month],
    queryFn: () => fetcher(`/api/expenses/calendar?year=${year}&month=${month}`)
  })

  return {
    data,
    isLoading,
    isFetching
  }
}

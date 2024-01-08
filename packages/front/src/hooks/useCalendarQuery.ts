'use client'

import { fetcher } from '@/client/fetcher'
import { Expenses } from '@/model'
import { useQuery } from '@tanstack/react-query'

export function useCalendarQuery(year: string, month: string) {
  const { data, isLoading, isFetching } = useQuery<Expenses[]>({
    queryKey: ['calendar', year, month],
    queryFn: () => fetcher(`/api/expenses/calendar?year=${year}&month=${month}`)
  })

  return {
    data,
    isLoading,
    isFetching
  }
}

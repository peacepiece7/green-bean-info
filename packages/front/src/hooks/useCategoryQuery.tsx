'use client'
import { useQuery } from '@tanstack/react-query'
import { useThrottle } from './useThrottle'
import { fetcher } from '@/client/fetcher'

interface ResponseItem {
  id: string
  value: string
}

export const useCategoryQuery = (queryParam: string) => {
  const query = useThrottle(queryParam, 1000)
  const res = useQuery<ResponseItem[]>({
    queryKey: ['category', query],
    queryFn: () => fetcher(`/api/categories/${query}`),
    enabled: !!query
  })
  return res
}

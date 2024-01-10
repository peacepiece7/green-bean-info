import { AnnualExpense } from '@/app/analyze/[year]/[month]/_container/Chart/AnnualExpenses'
import { AnalyzePageProps } from '@/app/analyze/[year]/[month]/page'
import { fetcher } from '@/client/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useAnalyzeExpenses({ year, month }: Partial<AnalyzePageProps['params']>) {
  const { data } = useSuspenseQuery<AnnualExpense[]>({
    queryKey: ['analyzeExpenses', year, month],
    queryFn: () => fetcher(`/api/analyze?year=${year ?? ''}&month=${month ?? ''}`)
  })

  return data
}

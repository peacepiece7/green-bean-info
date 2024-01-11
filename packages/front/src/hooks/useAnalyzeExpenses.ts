import { AnnualExpense } from '@/app/analyze/[year]/[month]/_container/Chart/AnnualExpenses'
import { AnalyzePageProps } from '@/app/analyze/[year]/[month]/page'
import { fetcher } from '@/client/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useAnalyzeExpenseQuery({ year, month }: Partial<AnalyzePageProps['params']>) {
  const { data } = useSuspenseQuery<AnnualExpense[]>({
    queryKey: ['analyzeExpense', year, month],
    queryFn: () => fetcher(`/api/analyze?year=${year ?? ''}&month=${month ?? ''}`)
  })

  return data
}

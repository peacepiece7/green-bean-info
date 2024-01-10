// import { fetcher } from '@/client/fetcher'
// import { useSuspenseQuery } from '@tanstack/react-query'
// import { AnalyzePageProps } from '../page'

// type AnnualExpensesProps = AnalyzePageProps['params']
// export function AnnualExpenses({ year, month }: AnnualExpensesProps) {
//   const { data } = useSuspenseQuery({
//     queryKey: ['annualExpenses', year, month],
//     queryFn: () => fetcher(`/api/analyze/annual-expenses?year=${year}&month=${month}`)
//   })
// }

'use client'
import { SSRSuspense } from '@/components/SSRSuspense'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'
import { AnalyzePageProps } from '../page'
import { User } from '@/model'
import GNB from '@/components/GNB/GNB'
import { AnnualExpenses } from './AnnualExpenses'
import { MonthyExpensesCategory } from './MonthyExpenseCategory'
import { DailyExpenses } from './DailyExpenses'

type AnalyzeContainerProps = AnalyzePageProps['params'] & {
  user: User
}
export function AnalyzeContainer({ year, month, user }: AnalyzeContainerProps) {
  return (
    <>
      <GNB user={user} />
      <SSRSuspense fallback={<></>}>
        <AnnualExpenses />
      </SSRSuspense>
      <SSRSuspense>
        <MonthyExpensesCategory />
      </SSRSuspense>
      <SSRSuspense>
        <DailyExpenses year={year} month={month} />
      </SSRSuspense>
    </>
  )
}

// * 차트라이브러리에 사용되는 옵션을 미리 등록합니다.
Chart.register(
  // Common
  Tooltip,
  Legend,
  // Bar
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  // Doughnut
  ArcElement,
  // Line
  PointElement,
  LineElement
)

'use client'
// prettier-ignore
import { Chart, CategoryScale, LinearScale,  BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import { SSRSuspense } from '@/components/SSRSuspense'
import { AnalyzePageProps } from '../page'
import { User } from '@/model'
import GNB from '@/components/GNB/GNB'
import { AnnualExpenses } from './Chart/AnnualExpenses'
import { MonthlyCategortExpensesRate } from './Chart/MonthyCategoryExpenseRate'
import { DailyExpenses } from './Chart/DailyExpenses'
import { useSetRecoilState } from 'recoil'
import { dayState } from '@/store/dayState'
import { useEffect } from 'react'
import styled from 'styled-components'
import { SPACE } from '@/styles/common'
import { MonthyCategoryCountRate } from './Chart/MonthyCategoryCountRate'
import FloatingImage from '@/components/Layouts/FloatingImage'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Loading from '@/app/loading'
import { Navigation } from './Navigation'

// * 차트라이브러리에 사용되는 옵션을 미리 등록합니다.
Chart.register(
  // Common
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  // Bar
  BarElement,
  // Doughnut
  ArcElement,
  // Line
  PointElement,
  LineElement
)

type AnalyzeContainerProps = AnalyzePageProps['params'] & {
  user: User
}
export function AnalyzeContainer({ year, month, user }: AnalyzeContainerProps) {
  const setDay = useSetRecoilState(dayState)
  const { isMobile } = useMediaQuery()

  useEffect(() => {
    setDay((prev) => ({ ...prev, year, month }))
  }, [])

  return (
    <SSRSuspense fallback={<Loading />}>
      <GNB user={user} />
      <Navigation />
      <FloatingImage>
        <ChartWrapper>
          <DoughnutWrapper $isMobile={isMobile}>
            <MonthlyCategortExpensesRate />
            <MonthyCategoryCountRate />
          </DoughnutWrapper>
          <AnnualExpenses />
          <DailyExpenses />
        </ChartWrapper>
      </FloatingImage>
    </SSRSuspense>
  )
}

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${SPACE['12']} auto;
`
const DoughnutWrapper = styled.div<{ $isMobile: boolean }>`
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'flex')};
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  /* margin: ${({ $isMobile }) => ($isMobile ? SPACE['4'] : '0')}; */
`

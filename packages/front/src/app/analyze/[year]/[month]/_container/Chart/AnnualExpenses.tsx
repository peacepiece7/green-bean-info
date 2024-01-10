'use client'
import { useAnalyzeExpenses } from '@/hooks/useAnalyzeExpenses'
import { dayState } from '@/store/dayState'
import { Bar } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
import { ANNUAL_EXPENSES } from '../../_constants'
import { SHADOW, SPACE, TEXT } from '@/styles/common'
import styled from 'styled-components'
export interface AnnualExpense {
  category: string
  cost: number
  date: string
}
export function AnnualExpenses() {
  const { year } = useRecoilValue(dayState)
  const data = useAnalyzeExpenses({ year })

  const chartData = {
    labels: ANNUAL_EXPENSES['labels'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: getMonthlyExpenses(year, data),
        backgroundColor: ANNUAL_EXPENSES['bg']['color'][0]
      }
    ]
  }

  return (
    <Container>
      <Title>{year}년 지출 비용 현황</Title>
      <Bar data={chartData} options={ANNUAL_EXPENSES['options']} />
    </Container>
  )
}

const Container = styled.div`
  margin: ${SPACE['4']};
  padding: ${SPACE['4']};
  box-shadow: ${SHADOW.base};
  border-radius: 1rem;
  backdrop-filter: blur(2rem);
`

const Title = styled.h2`
  font-size: ${TEXT['size']['2xl']};
  padding: ${SPACE['4']};
`

function getMonthlyExpenses(year: string, items: AnnualExpense[]) {
  const annualData = items.filter((item) => item.date.includes(year))
  const monthlyData = Array(12).fill(0)
  annualData.forEach((item) => {
    const month = parseInt(item.date.split('-')[1], 10)
    monthlyData[month - 1] += item.cost
  })
  return monthlyData
}

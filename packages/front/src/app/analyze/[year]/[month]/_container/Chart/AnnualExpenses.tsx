'use client'
import { useAnalyzeExpenseQuery } from '@/hooks/useAnalyzeExpenses'
import { dayState } from '@/store/dayState'
import { Bar } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
import { ANNUAL_EXPENSES } from '../../_constants'
import { SHADOW, SPACE, TEXT } from '@/styles/common'
import styled from 'styled-components'
import Link from 'next/link'
export interface AnnualExpense {
  category: string
  cost: number
  date: string
}
export function AnnualExpenses() {
  const { year } = useRecoilValue(dayState)
  const data = useAnalyzeExpenseQuery({ year })
  const monthlyExpensesData = getMonthlyExpenses(year, data)

  const chartData = {
    labels: ANNUAL_EXPENSES['labels'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyExpensesData,
        backgroundColor: ANNUAL_EXPENSES['bg']['color'][0]
      }
    ]
  }

  if (monthlyExpensesData.every((item) => item === 0))
    return (
      <Container>
        <NoContent>
          <p>데이터가 없습니다.</p>
          <p>소비 내역을 추가해주세요!</p>
          <LinkWrapper href="/">{'📝 소비 내역 작성하러 가기 >'}</LinkWrapper>
        </NoContent>
      </Container>
    )

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

const NoContent = styled.div`
  text-align: center;
  font-size: ${TEXT['size']['2xl']};
  padding: ${SPACE['4']};
`

const LinkWrapper = styled(Link)`
  margin-top: ${SPACE['4']};
  text-decoration: none;
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

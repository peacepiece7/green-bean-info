import dayjs from 'dayjs'
import { Line } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
import { dayState } from '@/store/dayState'
import { useAnalyzeExpenses } from '@/hooks/useAnalyzeExpenses'
import { DAILY_EXPENSES } from '../../_constants'
import { AnnualExpense } from './AnnualExpenses'
import { SHADOW, SPACE, TEXT } from '@/styles/common'
import styled from 'styled-components'

export function DailyExpenses() {
  const { year, month } = useRecoilValue(dayState)
  const data = useAnalyzeExpenses({ year, month })

  const labels = getDailyChartLabels(year, month)
  const values = getDailyChartValues(year, month, data)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Daily Expenses',
        data: values,
        borderColor: DAILY_EXPENSES['border']['color'][0],
        backgroundColor: DAILY_EXPENSES['bg']['color'][0]
      }
    ]
  }

  if (values.every((item) => item === 0)) return null

  return (
    <Container>
      <Title>
        {year}년 {month}월 일별 지출 현황
      </Title>
      <Line data={chartData} options={DAILY_EXPENSES['options']} />
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

function getLastDate(year: string, month: string) {
  return dayjs(`${year}-${month}`).endOf('month').date()
}

function getDailyChartLabels(year: string, month: string) {
  const lastDate = getLastDate(year, month)
  return Array.from({ length: lastDate }, (_, i) => i + 1)
}

function getDailyChartValues(year: string, month: string, items: AnnualExpense[]) {
  const lastDate = getLastDate(year, month)
  const values: number[] = Array.from({ length: lastDate }, () => 0)
  items
    .filter((item) => dayjs(item.date).month() + 1 === Number(month))
    .forEach((item) => {
      const date = dayjs(item.date).date()
      values[date] = values[date] ? values[date] + item.cost : item.cost
    })
  return values
}

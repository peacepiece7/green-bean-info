import { useSuspenseQuery } from '@tanstack/react-query'
import { AnnualExpense } from './AnnualExpenses'
import { fetcher } from '@/client/fetcher'
import dayjs from 'dayjs'
import { Line } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
import { dayState } from '@/store/dayState'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
}

export function DailyExpenses() {
  const { year, month } = useRecoilValue(dayState)
  const { data } = useSuspenseQuery<AnnualExpense[]>({
    queryKey: ['analyze', 'expenses'],
    queryFn: () => fetcher(`/api/analyze/annual-expenses`)
  })

  const lastDate = dayjs(`${year}-${month}`).endOf('month').date()
  const labels = Array.from({ length: lastDate }, (_, i) => i + 1)
  const values: number[] = Array.from({ length: lastDate }, () => 0)
  data
    .filter((item) => dayjs(item.date).month() + 1 === Number(month))
    .forEach((item) => {
      const date = dayjs(item.date).date()
      values[date] = values[date] ? values[date] + item.cost : item.cost
    })

  const chartData = {
    labels,
    datasets: [
      {
        label: '일별 지출',
        data: values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem' }}>{month}월 일별 지출 현황</h2>
      <Line data={chartData} options={options} />
    </div>
  )
}

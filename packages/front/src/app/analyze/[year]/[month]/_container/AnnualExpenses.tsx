'use client'
import { fetcher } from '@/client/fetcher'
import { dayState } from '@/store/dayState'
import { useSuspenseQuery } from '@tanstack/react-query'
// import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
export interface AnnualExpense {
  category: string
  cost: number
  date: string
}

const labels = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'octover',
  'november',
  'december'
]

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
}

export function AnnualExpenses() {
  const { year } = useRecoilValue(dayState)
  const { data } = useSuspenseQuery<AnnualExpense[]>({
    queryKey: ['analyze', 'expenses'],
    queryFn: () => fetcher(`/api/analyze/annual-expenses`)
  })

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: getMonthlyExpenses(year, data),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }

  return (
    <>
      <h2
        style={{
          fontSize: '2.5rem'
        }}
      >
        {year}년 지출 비용
      </h2>
      <Bar data={chartData} options={options} />
    </>
  )
}

function getMonthlyExpenses(year: string, items: AnnualExpense[]) {
  const annualData = items.filter((item) => item.date.includes(year))
  const monthlyData = Array(12).fill(0)
  annualData.forEach((item) => {
    const month = parseInt(item.date.split('-')[1], 10)
    monthlyData[month - 1] += item.cost
  })
  return monthlyData
}

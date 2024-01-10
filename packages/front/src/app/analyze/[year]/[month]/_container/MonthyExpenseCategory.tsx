import { fetcher } from '@/client/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AnnualExpense } from './AnnualExpenses'
import { Doughnut } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
import { dayState } from '@/store/dayState'

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(58, 255, 140, 0.2)'
]

const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(58, 255, 140,1)'
]

export function MonthyExpensesCategory() {
  const { year, month } = useRecoilValue(dayState)
  const { data } = useSuspenseQuery<AnnualExpense[]>({
    queryKey: ['analyze', 'expenses'],
    queryFn: () => fetcher(`/api/analyze/annual-expenses`)
  })

  const categoryData = sliceCategoryData(sortCategoryData(data), 6)

  const labels = categoryData.map((item) => item[0])
  const values = categoryData.map((item) => item[1])

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1
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
        {year}년 {month}월 지출 카테고리 현황
      </h2>
      <Doughnut data={chartData} />
    </>
  )
}

function sortCategoryData(items: AnnualExpense[]) {
  const categoryData: { [key: string]: number } = {}

  for (const item of items) {
    if (categoryData[item.category]) {
      categoryData[item.category] += item.cost
    } else {
      categoryData[item.category] = item.cost
    }
  }
  return Object.entries(categoryData).sort((a, b) => b[1] - a[1])
}

function sliceCategoryData(categoryData: [string, number][], limit: number) {
  if (categoryData.length <= limit) return categoryData
  const etc = categoryData.slice(limit).reduce((acc, cur) => acc + cur[1], 0)
  categoryData.splice(limit, categoryData.length - limit)
  categoryData.push(['etc', etc])
  return categoryData
}

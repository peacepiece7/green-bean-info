'use client'
import { SSRSuspense } from '@/components/SSRSuspense'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { AnalyzePageProps } from '../page'
import { User } from '@/model'
import GNB from '@/components/GNB/GNB'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart'
    }
  }
}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const data1Max = [150, 260, 170, 660, 240, 680, 120]
const data2Max = [170, 300, 220, 660, 340, 280, 320]

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map((item, i) => data1Max[i]),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: labels.map((item, i) => data2Max[i]),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
}

type AnalyzeContainerProps = AnalyzePageProps['params'] & {
  user: User
}
export function AnalyzeContainer({ user }: AnalyzeContainerProps) {
  return (
    <>
      <GNB user={user} />
      <h1>Analyze Page</h1>
      <h2>연간 지출 비용 (Bar chart로 1~12월의 총 지출을 표현합니다.)</h2>
      <h2>월 지출 카테고리 (Doughnut chart로 상위 10개 + etc로 나눕니다)</h2>
      <h2>일일 지출 (Line chart를 사용합니다, 28~31일 까지 라인을 그립니다.)</h2>
      <SSRSuspense fallback={<></>}>{<Bar data={data} options={options} />}</SSRSuspense>
    </>
  )
}

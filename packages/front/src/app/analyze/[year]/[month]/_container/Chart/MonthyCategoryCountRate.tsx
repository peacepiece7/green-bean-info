'use client'
import { AnnualExpense } from './AnnualExpenses'
import { Doughnut } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
import { dayState } from '@/store/dayState'
import { useAnalyzeExpenses } from '@/hooks/useAnalyzeExpenses'
import { MONTHLY_EXPENSES } from '../../_constants'
import styled from 'styled-components'
import { SHADOW, SPACE, TEXT } from '@/styles/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function MonthyCategoryCountRate() {
  const { year, month } = useRecoilValue(dayState)
  const data = useAnalyzeExpenses({ year, month })
  const { isMobile } = useMediaQuery()

  const categoryData = sliceCategoryData(sortCategoryData(data), 6)

  const labels = categoryData.map((item) => item[0])
  const values = categoryData.map((item) => item[1])

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: MONTHLY_EXPENSES['bg']['color'],
        borderColor: MONTHLY_EXPENSES['border']['color'],
        borderWidth: 1
      }
    ]
  }

  if (values.length === 0) return null

  return (
    <Container $isMobile={isMobile}>
      <Title>
        <p>
          {year}년 {month}월
        </p>
        <p>가장 많이 작성한 카테고리 비율</p>
      </Title>
      <Doughnut data={chartData} />
    </Container>
  )
}

const Container = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? 'auto' : '100%')};
  max-width: 56rem;
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

function sortCategoryData(items: AnnualExpense[]) {
  const categoryData: { [key: string]: number } = {}

  for (const item of items) {
    if (categoryData[item.category]) {
      categoryData[item.category] += 1
    } else {
      categoryData[item.category] = 1
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

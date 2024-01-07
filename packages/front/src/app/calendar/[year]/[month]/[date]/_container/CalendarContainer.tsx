'use client'
import { SSRSuspense } from '@/components/SSRSuspense'
import { SSRCalendarSkeleton } from './SSRCalendarSkeleton'
import Calendar from './Calendar'
import { CalendarPageProps } from '../page'
import './Calendar.css'
import { User } from '@/model'
import GNB from '@/components/GNB/GNB'
import styled from 'styled-components'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/client/fetcher'
import { TileArgs } from 'react-calendar'
import { dayManager } from '@/util/dayManager'

interface CalendarExpenses {
  id: string
  userId: string
  date: string
  cost: number
  category: string
}

type CalendarContainerProps = CalendarPageProps['params'] & {
  user: User
}
export default function CalendarContainer({ year, month, date, user }: CalendarContainerProps) {
  const { data } = useSuspenseQuery<CalendarExpenses[]>({
    queryKey: ['calendar', year, month],
    queryFn: () => fetcher(`/api/expenses/calendar?year=${year}&month=${month}`)
  })

  const handleTitleContent = (tile: TileArgs): React.ReactNode => {
    const tileDay = dayManager.dayToDefaultFormat(tile.date)
    const totalCost = data?.reduce(
      (prev, item) => (dayManager.dayToDefaultFormat(item.date) === tileDay ? item.cost + prev : prev),
      0
    )
    console.log(totalCost)

    return (
      <ContentWrapper>
        {/* <p>총 소비량</p>
        <p>5,000</p> */}
      </ContentWrapper>
    )
  }

  return (
    <>
      <GNB user={user} />
      <Title>소비 내역 캘린더</Title>
      <SSRSuspense fallback={<SSRCalendarSkeleton year={year} month={month} date={date} />}>
        <Calendar {...{ date, month, year }} predicateTitleContent={handleTitleContent} />
      </SSRSuspense>
    </>
  )
}

const Title = styled.h1`
  margin-top: 4rem;
`

const ContentWrapper = styled.div`
  height: 3rem;
  max-height: 4rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: start;
  padding-top: 1rem;
`

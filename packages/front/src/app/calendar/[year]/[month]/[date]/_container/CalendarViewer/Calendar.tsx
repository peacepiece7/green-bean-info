'use client'
import { useRouter } from 'next/navigation'
import ReactCalendar, { TileArgs } from 'react-calendar'
import { dayManager } from '@/util/dayManager'
import { CalendarPageProps } from '../../page'
import { useState } from 'react'
import styled from 'styled-components'
import { useCalendarQuery } from '@/hooks/useCalendarQuery'
import './Calendar.css'

type CalendarProps = CalendarPageProps['params'] & {
  onOpen: (date: string) => void
}
export default function Calendar({ date, month, year, onOpen }: CalendarProps) {
  const router = useRouter()
  const [activeDate, setActiveDate] = useState(dayManager.dayToDefaultFormat(`${year}/${month}/${date}`))
  const { data, isLoading } = useCalendarQuery(year, month)

  const handleTitleContent = (tile: TileArgs): React.ReactNode => {
    const tileDay = dayManager.dayToDefaultFormat(tile.date)
    const totalCost = data?.reduce(
      (prev, item) => (dayManager.dayToDefaultFormat(item.date) === tileDay ? item.cost + prev : prev),
      0
    )
    return (
      <ContentWrapper>
        {!isLoading && totalCost ? (
          <>
            <p>총 지출</p>
            <p>{totalCost.toLocaleString()}원</p>
          </>
        ) : null}
      </ContentWrapper>
    )
  }

  return (
    <div>
      <ReactCalendar
        value={dayManager.dayToDateObject(`${year}/${month}/${date}`)}
        onChange={(e) => {
          if (e instanceof Date) {
            const routeFormatDay = dayManager.dayToRouterFormat(e)
            router.push(`/calendar/${routeFormatDay}`)
          }
        }}
        onClickDay={(e) => {
          const clickedDate = dayManager.dayToDefaultFormat(e)
          setActiveDate(clickedDate)
          if (clickedDate === activeDate) onOpen(clickedDate)
        }}
        onActiveStartDateChange={(e) => {
          const routeFormatDay = dayManager.dayToRouterFormat(e.activeStartDate)
          router.push(`/calendar/${routeFormatDay}`)
        }}
        formatDay={(_props, date) => {
          return date.getDate().toString()
        }}
        tileContent={handleTitleContent}
      />
    </div>
  )
}

const ContentWrapper = styled.div`
  height: 3rem;
  max-height: 4rem;
  color: rgba(0, 0, 0, 0.8);
  text-align: start;
  padding-top: 1rem;
  & > p:nth-child(2) {
    margin-top: 1rem;
  }
`

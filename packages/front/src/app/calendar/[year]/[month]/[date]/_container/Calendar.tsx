'use client'
import { useRouter } from 'next/navigation'
import ReactCalendar, { TileArgs } from 'react-calendar'
import { dayManager } from '@/util/dayManager'
import { CalendarPageProps } from '../page'
import React from 'react'
import Link from 'next/link'
import './Calendar.css'

type CalendarProps = CalendarPageProps['params'] & {
  predicateTitleContent?: (args: TileArgs) => React.ReactNode
}
export default function Calendar({ date, month, year, predicateTitleContent }: CalendarProps) {
  const router = useRouter()

  return (
    <div>
      <ReactCalendar
        value={dayManager.dayToDateObject(`${year}/${month}/${date}`)}
        onChange={(e) => {
          // console.log('onChange : ', e)
          if (e instanceof Date) {
            const routeFormatDay = dayManager.dayToRouterFormat(e)
            router.push(`/calendar/${routeFormatDay}`)
          }
        }}
        // onClickMonth={(e) => {
        // console.log('onClickMonth : ', e)
        // }}
        // onViewChange={(e) => {
        // console.log('onViewChange : ', e)
        // }}
        onActiveStartDateChange={(e) => {
          const routeFormatDay = dayManager.dayToRouterFormat(e.activeStartDate)
          router.push(`/calendar/${routeFormatDay}`)
        }}
        formatDay={(_props, date) => {
          return date.getDate().toString()
        }}
        tileContent={(args) => predicateTitleContent && predicateTitleContent(args)}
      />
      <div>
        <button onClick={() => router.push(`/calendar/${year}/${month}/${Number(date) + 1}`)}>Next date</button>
        <button onClick={() => router.push(`/calendar/${year}/${month}/${Number(date) - 1}`)}>Before date</button>
      </div>
      <Link href={'/'}>GO TO HOME</Link>
    </div>
  )
}

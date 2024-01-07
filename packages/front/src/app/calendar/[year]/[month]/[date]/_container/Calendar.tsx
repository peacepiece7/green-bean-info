'use client'
import { useRouter } from 'next/navigation'
import ReactCalendar from 'react-calendar'
import { SSRSuspense } from '@/components/SSRSuspense'
import { dayManager } from '@/util/dayManager'
import './Calendar.css'

export default function Calendar({ date, month, year }: { date: string; month: string; year: string }) {
  const router = useRouter()
  return (
    <div>
      Calendar
      <p>year : {year}</p>
      <p>month : {month}</p>
      <p>date : {date}</p>
      <SSRSuspense fallback={<div>LOADING CALENDAR</div>}>
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
            console.log('onActiveStartDateChange : ')
            const routeFormatDay = dayManager.dayToRouterFormat(e.activeStartDate)
            router.push(`/calendar/${routeFormatDay}`)
          }}
          formatDay={(_props, date) => {
            return date.getDate().toString()
          }}
          // tileContent={(props) => {
          // console.log('tileContent : ', props)
          // return <div>content!</div>
          // }}
        />
      </SSRSuspense>
      <div>
        <button onClick={() => router.push(`/calendar/${year}/${month}/${Number(date) + 1}`)}>Next date</button>
        <button onClick={() => router.push(`/calendar/${year}/${month}/${Number(date) - 1}`)}>Before date</button>
      </div>
    </div>
  )
}

'use client'
import { SSRSuspense } from '@/components/SSRSuspense'
import { SSRCalendarSkeleton } from './SSRCalendarSkeleton'
import Calendar from './Calendar'
import { CalendarPageProps } from '../page'
import './Calendar.css'

export default function CalendarContainer({ year, month, date }: CalendarPageProps['params']) {
  const handleTitleContent = (): React.ReactNode => {
    return (
      <div
        style={{
          paddingTop: '1rem',
          textAlign: 'start',
          color: 'rgba(0,0,0,0.5)',
          maxHeight: '4rem',
          height: '3rem'
        }}
      >
        {/* elipsis 처리합시다 */}
        <p></p>
        <p></p>
      </div>
    )
  }

  return (
    <SSRSuspense fallback={<SSRCalendarSkeleton year={year} month={month} date={date} />}>
      <Calendar {...{ date, month, year }} predicateTitleContent={handleTitleContent}>
        <div>foo</div>
      </Calendar>
    </SSRSuspense>
  )
}

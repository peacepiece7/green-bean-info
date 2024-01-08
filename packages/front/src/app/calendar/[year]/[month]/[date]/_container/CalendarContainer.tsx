'use client'
import { SSRSuspense } from '@/components/SSRSuspense'
import { SSRCalendarSkeleton } from './SSRCalendarSkeleton'
import Calendar from './CalendarViewer/Calendar'
import { CalendarPageProps } from '../page'
import './CalendarViewer/Calendar.css'
import { User } from '@/model'
import GNB from '@/components/GNB/GNB'
import styled from 'styled-components'
import { useState } from 'react'
import Modal from '@/components/Modal'

type CalendarContainerProps = CalendarPageProps['params'] & {
  user: User
}
export default function CalendarContainer({ year, month, date, user }: CalendarContainerProps) {
  const [open, setOpen] = useState(false)
  const [activeDate, setActiveDate] = useState<null | string>(null)

  const handleOpenDateModal = (date: string) => {
    setActiveDate(date)
    setOpen(true)
  }
  return (
    <>
      <GNB user={user} />
      <Title>소비 내역 캘린더</Title>
      <SSRSuspense fallback={<SSRCalendarSkeleton year={year} month={month} />}>
        <Calendar year={year} month={month} date={date} onOpen={handleOpenDateModal} />
      </SSRSuspense>
      {open && (
        <Modal.Portal>
          <Modal.Form onClose={() => setOpen(false)}>
            <div>{activeDate}</div>
          </Modal.Form>
        </Modal.Portal>
      )}
    </>
  )
}

const Title = styled.h1`
  margin-top: 4rem;
`

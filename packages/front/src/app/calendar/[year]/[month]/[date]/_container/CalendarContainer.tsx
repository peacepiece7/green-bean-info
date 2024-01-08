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
import { CalendarModalContent } from './Modal/CalendarModalContent'
import { COLOR, SPACE } from '@/styles/common'

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
            <CalendarFormContentWrapper>
              <CalendarModalContent year={year} month={month} activeDate={activeDate} />
            </CalendarFormContentWrapper>
          </Modal.Form>
        </Modal.Portal>
      )}
    </>
  )
}

const Title = styled.h1`
  margin: ${SPACE['16']};
`

const CalendarFormContentWrapper = styled.div`
  position: absolute;
  width: 90%;
  height: 80%;
  inset: 0;
  margin: auto;
  border: 3px solid ${COLOR.secondary};
  border-radius: 0.5rem;
  background-color: ${COLOR.white};
  overflow-y: scroll;
  & > div {
    max-width: 90%;
    margin: 0 auto;
  }
`

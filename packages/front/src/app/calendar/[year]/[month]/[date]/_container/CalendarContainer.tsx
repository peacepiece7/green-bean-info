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
import { COLOR, SPACE, TEXT } from '@/styles/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRecoilState } from 'recoil'
import { calendarModalState } from '@/store/calendarModalState'
import FloatingImage from '@/components/Layouts/FloatingImage'

type CalendarContainerProps = CalendarPageProps['params'] & {
  user: User
}
export default function CalendarContainer({ year, month, date, user }: CalendarContainerProps) {
  const [open, setOpen] = useRecoilState(calendarModalState)
  const [activeDate, setActiveDate] = useState<null | string>(null)
  const { isMobile } = useMediaQuery()

  const handleOpenDateModal = (date: string) => {
    setActiveDate(date)
    setOpen(true)
  }

  return (
    <>
      <GNB user={user} />
      <FloatingImage>
        <Title>소비 내역 캘린더</Title>
        <SSRSuspense fallback={<SSRCalendarSkeleton year={year} month={month} />}>
          <Calendar year={year} month={month} date={date} onOpen={handleOpenDateModal} />
        </SSRSuspense>
      </FloatingImage>
      {open && (
        <Modal.Portal>
          <Modal.Form onClose={() => setOpen(false)}>
            <CalendarFormContentWrapper $isMobile={isMobile}>
              <CalendarModalContent year={year} month={month} activeDate={activeDate} />
            </CalendarFormContentWrapper>
          </Modal.Form>
        </Modal.Portal>
      )}
    </>
  )
}

const Title = styled.h1`
  margin: ${SPACE['8']};
  margin-bottom: 0;
  font-size: ${TEXT.size['3xl']};
`

const CalendarFormContentWrapper = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '80%')};
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

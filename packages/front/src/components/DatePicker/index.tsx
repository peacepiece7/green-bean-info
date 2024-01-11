import ReactDatePicker from 'react-datepicker'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styled from 'styled-components'
import { SyntheticEvent } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerProps {
  selected: Date | null
  onChange: (date: Date | null, event: SyntheticEvent<unknown, Event> | undefined) => void
}

export function DatePicker({ selected, onChange: onChange }: DatePickerProps) {
  const { isMobile } = useMediaQuery()

  return (
    <DatePickerWrapper $isMobile={isMobile}>
      <ReactDatePicker selected={selected} onChange={onChange} />
    </DatePickerWrapper>
  )
}

const DatePickerWrapper = styled.div<{ $isMobile: boolean }>`
  * {
    font-size: 1.6rem;
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  input {
    height: 100%;
    width: ${({ $isMobile }) => ($isMobile ? '100%' : '15rem')};
  }
  input {
    padding: 1rem;
  }
  .react-datepicker__day,
  .react-datepicker__day-name {
    margin: 0.5rem 1rem;
  }
`

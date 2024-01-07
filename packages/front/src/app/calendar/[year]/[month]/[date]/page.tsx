import Link from 'next/link'
import Calendar from './_container/Calendar'

interface CalendarPageProps {
  params: {
    year: string
    month: string
    date: string
  }
}

export default function CalendarPage(props: CalendarPageProps) {
  const { year, month, date } = props.params
  return (
    <div>
      Calendar Page
      <Calendar {...props.params} />
      <Link href={`/calendar/${year}/${month}/${Number(date) + 1}`}>Next date</Link>
      <div></div>
      <Link href={`/calendar/${year}/${month}/${Number(date) - 1}`}>Before date</Link>
    </div>
  )
}

import CalendarContainer from './_container/CalendarContainer'

export interface CalendarPageProps {
  params: {
    year: string
    month: string
    date: string
  }
}

export default function CalendarPage(props: CalendarPageProps) {
  return (
    <div>
      <h1>Calendar Page</h1>
      <CalendarContainer {...props.params} />
    </div>
  )
}

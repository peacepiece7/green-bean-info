import { getServerSession } from 'next-auth'
import CalendarContainer from './_container/CalendarContainer'
import { authOptions } from '@/service/nextAuth'
import { notFound, redirect } from 'next/navigation'
import { dayManager } from '@/util/dayManager'

export interface CalendarPageProps {
  params: {
    year: string
    month: string
    date: string
  }
}

export default async function CalendarPage(props: CalendarPageProps) {
  const { year, month, date } = props.params
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/auth/signin')
  if (!checkIsValidDate(`${year}-${month}-${date}`)) return notFound()

  return (
    <main>
      <CalendarContainer {...props.params} user={session.user} />
    </main>
  )
}

/**
 * @description YYYY-MM-DD 형식으로 주어진 값이 유효한지 검사합니다.
 * */
function checkIsValidDate(date: string) {
  const validDate = dayManager.dayToDefaultFormat(date)
  if (validDate !== date) return false
  return true
}

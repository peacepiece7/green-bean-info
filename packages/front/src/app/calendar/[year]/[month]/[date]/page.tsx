import { getServerSession } from 'next-auth'
import CalendarContainer from './_container/CalendarContainer'
import { authOptions } from '@/service/nextAuth'
import { redirect } from 'next/navigation'

export interface CalendarPageProps {
  params: {
    year: string
    month: string
    date: string
  }
}

export default async function CalendarPage(props: CalendarPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/auth/signin')

  return (
    <main>
      <CalendarContainer {...props.params} user={session.user} />
    </main>
  )
}

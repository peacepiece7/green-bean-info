import { redirect } from 'next/navigation'
import HomeContainer from './_container/HomeContainer'
import { getServerSessionWithUser } from '@/util/session'

export default async function HomePage() {
  const session = await getServerSessionWithUser()

  if (!session) return redirect('/auth/signin')

  return (
    <main>
      <HomeContainer user={session.user} />
    </main>
  )
}

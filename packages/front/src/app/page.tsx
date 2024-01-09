import { redirect } from 'next/navigation'
import HomeContainer from './_container/HomeContainer'
import { getServerSessionWithUser } from '@/util/session'

export default async function HomePage() {
  const start = Date.now()
  const session = await getServerSessionWithUser()

  if (!session) return redirect('/auth/signin')

  // HACK : 로딩 애니메이션이 보고싶어서 잠시 대기하겠습니다..
  // prettier-ignore
  await new Promise((resolve) => setTimeout(resolve, 2000 - (Date.now() - start)))

  return (
    <main>
      <HomeContainer user={session.user} />
    </main>
  )
}

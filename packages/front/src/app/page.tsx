import { authOptions } from '@/service/sanity'
import { getServerSession } from 'next-auth'
import TempProfile from './_container/TempProfile'
import { redirect } from 'next/navigation'
import TempLogout from './_container/TempLogout'

export default async function HomePage() {
  const start = Date.now()
  const session = await getServerSession(authOptions)

  // HACK : 로딩 애니메이션이 보고싶어서 잠시 대기하겠습니다..
  await new Promise((resolve) =>
    setTimeout(resolve, 2000 - (Date.now() - start))
  )
  if (!session) return redirect('/signIn')

  return (
    <main>
      <TempLogout />
      {session?.user && <TempProfile user={session.user} />}
    </main>
  )
}

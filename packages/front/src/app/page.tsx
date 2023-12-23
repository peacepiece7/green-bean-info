import Temp from './_container/Temp'
import { getProviders } from 'next-auth/react'
import TempSignIn from './_container/TempSignIn'
import { authOptions } from '@/service/sanity'
import { getServerSession } from 'next-auth'
import TempProfile from './_container/TempProfile'
import { redirect } from 'next/navigation'
import TempLogout from './_container/TempLogout'

export default async function HomePage() {
  const providers = await getProviders()
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/signIn')

  return (
    <main>
      <Temp />
      <TempSignIn providers={providers} callbackUrl='/' />
      <TempLogout />
      {session?.user && <TempProfile user={session.user} />}
    </main>
  )
}

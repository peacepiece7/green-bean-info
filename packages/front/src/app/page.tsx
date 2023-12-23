import Temp from './_container/Temp'
import { getProviders } from 'next-auth/react'
import TempSignIn from './_container/TempSignIn'
import { authOptions } from '@/service/sanity'
import { getServerSession } from 'next-auth'
import TempProfile from './_container/TempProfile'

export default async function Home() {
  const providers = await getProviders()
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Temp />
      <TempSignIn providers={providers} callbackUrl='/' />
      {session?.user && <TempProfile user={session.user} />}
    </main>
  )
}

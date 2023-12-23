import { authOptions } from '@/service/sanity'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'
import { redirect } from 'next/navigation'
import SignInContainer from './_container/Container'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')

  const providers = await getProviders()

  return <SignInContainer providers={providers} callbackUrl='/' />
}

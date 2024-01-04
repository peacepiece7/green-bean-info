import { getProviders } from '@/service/nextAuth'
import { redirect } from 'next/navigation'
import SignInContainer from './_container/Container'
import { getServerSessionWithUser } from '@/util/session'

export default async function SignInPage() {
  const session = await getServerSessionWithUser()
  if (session) redirect('/')
  const providers = await getProviders()
  return <SignInContainer providers={providers} callbackUrl="/" />
}

import { redirect } from 'next/navigation'
import { AnalyzeContainer } from './_container/AnalyzeContainer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/service/nextAuth'

export interface AnalyzePageProps {
  params: {
    year: string
    month: string
  }
}
export default async function AnalyzePage({ params }: AnalyzePageProps) {
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/auth/signin')

  return (
    <>
      <AnalyzeContainer {...params} user={session.user} />
    </>
  )
}

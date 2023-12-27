import 'server-only'
import { User } from '@/model'
import { authOptions } from '@/service/sanity'
import { getServerSession } from 'next-auth'

export async function withSessionUser(handler: (user: User) => Promise<Response>): Promise<Response> {
  const session = await getServerSession(authOptions)
  const loggedInUser = session?.user

  if (!loggedInUser) {
    return new Response('Authentication Error', { status: 401 })
  }

  return handler(loggedInUser)
}

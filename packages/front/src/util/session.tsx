import 'server-only'
import { User } from '@/model'
import { authOptions } from '@/service/nextAuth'
import { getServerSession } from 'next-auth'

export async function withSessionUser(handler: (user: User) => Promise<Response>): Promise<Response> {
  try {
    const session = await getServerSession(authOptions)
    const loggedInUser = session?.user

    if (!loggedInUser) {
      return new Response('Authentication Error', { status: 401 })
    }

    return handler(loggedInUser)
  } catch (e) {
    console.log('withSessionUser', e)
    return new Response('Authentication Error', { status: 401 })
  }
}

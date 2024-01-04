import 'server-only'
import { User } from '@/model'
import { authOptions } from '@/service/nextAuth'
import { Session, getServerSession } from 'next-auth'

export async function withSessionUser(handler: (user: User) => Promise<Response>): Promise<Response> {
  try {
    const session = await getServerSessionWithUser()
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

export async function getServerSessionWithUser() {
  if (process.env.TEST !== 'enabled') return await getServerSession(authOptions)

  const mockSession: Session = {
    user: {
      id: process.env.MOCK_ID!,
      email: process.env.MOCK_EMAIL!,
      image: process.env.MOCK_IMAGE!,
      username: process.env.MOCK_USERNAME!
    },
    expires: ''
  }
  return mockSession
}

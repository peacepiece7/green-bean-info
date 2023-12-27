'server-only'
import { SanityClient, createClient } from '@sanity/client'
import { addUser } from '@/service/sanity/transections'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'

class Sanity {
  public client: SanityClient
  constructor() {
    this.client = createClient({
      projectId: process.env.PROJECT_ID,
      dataset: process.env.DATASET,
      apiVersion: process.env.API_VERSION,
      token: process.env.SECRET_TOKEN,
      useCdn: false
    })
  }
}

export const sanity = new Sanity()

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!
    })
  ],
  // TODO : Yup이나 Zod등 유효성 검사
  callbacks: {
    async session({ session, token: jwt }) {
      const user = session?.user
      session.user = {
        ...user,
        username: user?.email?.split('@')[0] || '',
        id: jwt.id as string
      }
      return session
    },
    async signIn(params) {
      const { id, name, email, image } = params.user
      if (!email || !id || !name || !image) {
        return false // TODO 에러 메시지
      }
      addUser({
        id,
        email: email,
        username: name,
        image: image
      })
      return true
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}

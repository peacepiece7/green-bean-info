import { addUser } from '@/service/sanity/transections'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!
    })
  ],
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
        return false
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
    },
    async redirect({ baseUrl }) {
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}

/**
 * @description "next-auth/react"의 getProviders와 같은 기능을 하는 함수입니다.
 * next 14 버전 기준 getProvieders가 undefined로 나오는 이슈가 있어서 새로 만들었습니다.
 */
export async function getProviders() {
  // prettier-ignore
  const baseURL = process.env.NODE_ENV === 'development'  || process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_VERCEL_URL
  const providers = await fetch(`${baseURL}/api/auth/providers`).then((res) => res.json())
  return providers
}

// nextAuth middleware 참고 : https://next-auth.js.org/getting-started/client
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 })
    }

    const { origin, basePath } = req.nextUrl
    const signInUrl = new URL(`${basePath}/auth/signin`, origin)
    // signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

// 로그인을 해야하는 경우만 미들웨어 사용
export const config = {
  matcher: ['/', '/my-page', '/analyze', '/api/categories', '/api/expenses']
}

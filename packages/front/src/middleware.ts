import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

/**
 * 로그인 여부를 검사하는 미들웨어 입니다.
 */
export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  // * 토큰이 있거나, 테스트 환경일 경우 미들웨어를 통과시킵니다.
  if (token || process.env.TEST === 'enabled') {
    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    return new NextResponse('Authentication Error', { status: 401 })
  }

  const { origin, basePath } = req.nextUrl
  const signInUrl = new URL(`${basePath}/auth/signin`, origin)
  // signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`)
  return NextResponse.redirect(signInUrl)
}

// 로그인을 해야하는 경우만 미들웨어 사용
export const config = {
  matcher: ['/', '/my-page', '/analyze', '/api/categories', '/api/expenses']
}

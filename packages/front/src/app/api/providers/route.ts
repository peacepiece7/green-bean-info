import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { basePath } = req.nextUrl
  const providers = {
    google: {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      signinUrl: `${basePath}/api/auth/signin/google`,
      callbackUrl: `${basePath}/api/auth/callback/google`
    }
  }
  return NextResponse.json(providers)
}

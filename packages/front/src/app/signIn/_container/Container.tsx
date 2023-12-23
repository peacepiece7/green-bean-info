'use client'
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import SignInForm from './SignInForm'
import { BuiltInProviderType } from 'next-auth/providers'

interface SignInContainerProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
  callbackUrl: string | null
}
export default function SignInContainer({
  providers,
  callbackUrl,
}: SignInContainerProps) {
  return (
    <>
      <SignInForm providers={providers} callbackUrl={callbackUrl} />
    </>
  )
}

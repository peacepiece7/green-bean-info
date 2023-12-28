'use client'
import { COLOR, SPACE, TEXT } from '@/styles/common'
import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react'
import styled from 'styled-components'

interface TempSignInProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
  callbackUrl: string | null
}
export default function SignInForm({ providers, callbackUrl }: TempSignInProps) {
  if (!providers || !callbackUrl) {
    return null
  }
  return (
    <>
      {Object.values(providers).map(({ id, name }) => {
        return <Button key={id} onClick={() => signIn(id, { callbackUrl })}>{`Sign In with ${name}`}</Button>
      })}
    </>
  )
}

const Button = styled.button`
  background-color: ${COLOR.white};
  color: ${COLOR.black};
  border: 2px solde ${COLOR.gray};
  border-radius: 4px;
  padding: 8px 16px;
  font-size: ${TEXT.size.base};
  margin-top: ${SPACE[10]};
  float: right;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.tertiary};
  }
`

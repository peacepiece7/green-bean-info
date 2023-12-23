"use client";
import { BG, COLOR } from "@/styles/common";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import styled from "styled-components";

interface TempSignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  callbackUrl: string | null;
}
export default function TempSignIn({
  providers,
  callbackUrl,
}: TempSignInProps) {
  if (!providers || !callbackUrl) return null;

  return (
    <>
      {Object.values(providers).map(({ id, name }) => {
        return (
          <Button
            key={id}
            onClick={() => signIn(id, { callbackUrl })}
          >{`Sign In with ${name}`}</Button>
        );
      })}
    </>
  );
}

const Button = styled.button`
  background-color: ${BG.color.primary};
  color: ${COLOR.black};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.gray};
  }
`;

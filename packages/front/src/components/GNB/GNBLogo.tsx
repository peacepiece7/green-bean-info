'use client'

import useBeforeLeaveOrEnterMouse from '@/hooks/useBeforeMouseLeave'
import Image from 'next/image'
import Link from 'next/link'
import Shine from '../UI/Shine'

export default function GNBLogo() {
  const { ref, isEnter } = useBeforeLeaveOrEnterMouse<HTMLAnchorElement>()

  return (
    <Link ref={ref} href='/'>
      <Image
        src='/png/wallet.png'
        alt='my-wallet logo'
        width={150}
        height={150}
      ></Image>
      <>
        {isEnter && (
          <>
            <Shine options={{ top: 1.5, left: 1.5 }} />
            <Shine options={{ top: 7, left: 4 }} />
            <Shine options={{ top: 2.5, left: 17 }} />
          </>
        )}
      </>
    </Link>
  )
}

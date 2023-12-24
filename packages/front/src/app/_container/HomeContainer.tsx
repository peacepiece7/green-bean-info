'use client'

import GNB from '@/components/GNB/GNB'
import { User } from '@/model'

interface HomeContainer {
  user: User
}
export default function HomeContainer({ user }: HomeContainer) {
  return (
    <div>
      <GNB user={user} />
    </div>
  )
}

'use client'

import GNB from '@/components/GNB/GNB'
import { User } from '@/model'
import ExpenseAddForm from './ExpenseAddForm'
import ExpenseList from './ExpenseList'
import Filter from './Filter'
import { Suspense } from 'react'

interface HomeContainer {
  user: User
}
export default function HomeContainer({ user }: HomeContainer) {
  return (
    <div>
      <GNB user={user} />
      <ExpenseAddForm user={user} />
      <Filter />
      {/* TODO : CSR로 동작하게 막아뒀습니다. SSRSuspense같은 이름의 컴포넌트로 변경합시다. */}
      <Suspense fallback={<div>loading...</div>}>
        {typeof window === 'undefined' ? null : <ExpenseList user={user} />}
      </Suspense>
    </div>
  )
}

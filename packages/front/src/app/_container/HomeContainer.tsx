'use client'

import GNB from '@/components/GNB/GNB'
import { User } from '@/model'
import ExpenseAddForm from './ExpenseAddForm'
import ExpenseList from './ExpenseList'
import Filter from './Filter'

interface HomeContainer {
  user: User
}
export default function HomeContainer({ user }: HomeContainer) {
  return (
    <div>
      <GNB user={user} />
      <ExpenseAddForm user={user} />
      <Filter />
      <ExpenseList />
    </div>
  )
}

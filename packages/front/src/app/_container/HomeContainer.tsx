'use client'

import GNB from '@/components/GNB/GNB'
import { User } from '@/model'
import ExpenseAddForm from './ExpenseAddForm'
import ExpenseList from './ExpenseList'
import Filter from './Filter'
import { SSRSuspense } from '@/components/SSRSuspense'
import styled from 'styled-components'

interface HomeContainer {
  user: User
}
export default function HomeContainer({ user }: HomeContainer) {
  return (
    <>
      <GNB user={user} />
      <ContentWrapper>
        <ExpenseAddForm />
        <Filter />
        <SSRSuspense fallback={<></>}>
          <ExpenseList />
        </SSRSuspense>
      </ContentWrapper>
    </>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`

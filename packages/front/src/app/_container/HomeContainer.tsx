'use client'

import GNB from '@/components/GNB/GNB'
import { User } from '@/model'
import ExpenseAddForm from './ExpenseAddForm'
import ExpenseList from './ExpenseList'
import Filter from './Filter'
import { SSRSuspense } from '@/components/SSRSuspense'
import styled from 'styled-components'
import FloatingImage from '@/components/Layouts/FloatingImage'

interface HomeContainer {
  user: User
}
export default function HomeContainer({ user }: HomeContainer) {
  return (
    <>
      <GNB user={user} />
      <ContentWrapper>
        <FloatingImage>
          <ExpenseAddForm />
          <Filter />
          <SSRSuspense fallback={<></>}>
            <ExpenseList />
          </SSRSuspense>
        </FloatingImage>
      </ContentWrapper>
    </>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
`

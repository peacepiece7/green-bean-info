import { addMockExpenseTransection } from '@/service/sanity/transections/addMockExpense'
import { withSessionUser } from '@/util/session'
import { NextResponse } from 'next/server'

export async function POST() {
  return withSessionUser(async (user) => {
    const { id: userId } = user
    const response = await addMockExpenseTransection(userId)

    if (response.code === 0) {
      return NextResponse.json({ message: '임시 소비 내역이 추가되었습니다.' })
    } else {
      return NextResponse.json({ message: response.message }, { status: 400 })
    }
  })
}

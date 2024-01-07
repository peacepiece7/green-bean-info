import { fetchExpensesCalendarTransaction } from '@/service/sanity/transections/getCalendar'
import { withSessionUser } from '@/util/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return withSessionUser(async (user) => {
    const searchParams = req.nextUrl.searchParams
    const { id: userId } = user
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const expensesList = await fetchExpensesCalendarTransaction(userId, year, month)
    return NextResponse.json(expensesList)
  })
}

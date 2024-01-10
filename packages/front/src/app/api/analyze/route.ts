import { fetchAnnualExpensesTransection } from '@/service/sanity/transections/fetchAnnualExpenses'
import { withSessionUser } from '@/util/session'
import { NextResponse } from 'next/server'

export async function GET() {
  return withSessionUser(async (user) => {
    const { id: userId } = user
    // const searchParams = req.nextUrl.searchParams
    // const year = searchParams.get('year')
    // const month = searchParams.get('month')
    const data = await fetchAnnualExpensesTransection(userId)
    return NextResponse.json(data)
  })
}

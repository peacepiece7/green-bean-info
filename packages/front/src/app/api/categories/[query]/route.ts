import { fetchCategoriesTransaction } from '@/service/sanity/transections/fetchCategories'
import { withSessionUser } from '@/util/session'
import { NextRequest, NextResponse } from 'next/server'

interface GetContext {
  params: { query: string }
}
export async function GET(_req: NextRequest, ctx: GetContext) {
  return withSessionUser(async (user) => {
    const { id: userId } = user
    const { query } = ctx.params
    const categoryList = await fetchCategoriesTransaction(userId, query)
    return NextResponse.json(categoryList)
  })
}

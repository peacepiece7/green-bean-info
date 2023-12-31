import { fetchCategoriesTransaction } from '@/service/sanity/transections/fetchCategories'
import { withSessionUser } from '@/util/session'
import { NextResponse } from 'next/server'

export async function GET() {
  return withSessionUser(async (user) => {
    const { id: userId } = user
    const categoryList = fetchCategoriesTransaction(userId)
    return NextResponse.json(categoryList)
  })
}

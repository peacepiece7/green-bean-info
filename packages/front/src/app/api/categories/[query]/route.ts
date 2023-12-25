import { fetchCategoriesTransaction } from '@/service/sanity/transections/fetchCategories'
import { NextRequest, NextResponse } from 'next/server'

interface Context {
  params: { query: string }
}
export async function GET(req: NextRequest, ctx: Context) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')
  const { query } = ctx.params
  const categoryList = await fetchCategoryList(userId, query)
  return NextResponse.json(categoryList)
}

async function fetchCategoryList(userId: string | null, query: string) {
  if (!userId) return null
  return fetchCategoriesTransaction(userId, query)
}

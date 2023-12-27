import { addExpeneseTransaction } from '@/service/sanity/transections/addExpense'
import { getExpensesTransaction } from '@/service/sanity/transections/getExpenese'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')
  const page = searchParams.get('page')
  const response = await getExpenses(userId, page)
  if (response.code === 0) {
    return NextResponse.json(response.data)
  } else {
    return NextResponse.json({ message: response.message }, { status: 400 })
  }
}

async function getExpenses(userId: string | null, page: string | null) {
  return getExpensesTransaction(userId, page)
}

export interface AddExpenseBody {
  date: string
  cost: string
  content: string
  category: string
}
export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')
  const body: AddExpenseBody = await req.json()
  const response = await addExpenses(userId, body)

  if (response.code === 0) {
    return NextResponse.json({ message: 'Expense added successfully' })
  } else {
    return NextResponse.json({ message: response.message }, { status: 400 })
  }
}

async function addExpenses(userId: string | null, body: AddExpenseBody) {
  return addExpeneseTransaction(userId, body)
}

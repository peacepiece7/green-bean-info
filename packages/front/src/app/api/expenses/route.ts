import { Expenses } from '@/model'
import { addExpeneseTransaction } from '@/service/sanity/transections/addExpense'
import { deleteExepnseTransaction } from '@/service/sanity/transections/deleteExpense'
import { getExpensesTransaction } from '@/service/sanity/transections/getExpenese'
import { updateExpenseTransaction } from '@/service/sanity/transections/updateExpense'
import { withSessionUser } from '@/util/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return withSessionUser(async (user) => {
    const searchParams = req.nextUrl.searchParams
    const { id: userId } = user
    const page = searchParams.get('page')
    const query = searchParams.get('q')
    const sort = searchParams.get('sort')
    const response = await getExpensesTransaction(userId, {
      page,
      query,
      sort
    })
    if (response.code === 0) {
      return NextResponse.json(response.data)
    } else {
      return NextResponse.json({ message: response.message }, { status: 400 })
    }
  })
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: userId } = user
    const body: Omit<Expenses, 'id'> = await req.json()
    const response = await addExpeneseTransaction(userId, body)

    if (response.code === 0) {
      return NextResponse.json({ message: 'Expense added successfully' })
    } else {
      return NextResponse.json({ message: response.message }, { status: 400 })
    }
  })
}

export async function PUT(req: NextRequest) {
  return withSessionUser(async () => {
    const body: Expenses = await req.json()
    const response = await updateExpenseTransaction(body)
    if (response.code === 0) {
      return NextResponse.json({ message: 'Expense updated successfully' })
    } else {
      return NextResponse.json({ message: response.message }, { status: 400 })
    }
  })
}

export async function DELETE(req: NextRequest) {
  return withSessionUser(async () => {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ message: 'Id is required' }, { status: 400 })

    const response = await deleteExepnseTransaction(id)
    if (response.code === 0) {
      return NextResponse.json({ message: 'Expense deleted successfully' })
    } else {
      return NextResponse.json({ message: response.message }, { status: 400 })
    }
  })
}

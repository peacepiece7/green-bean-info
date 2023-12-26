import { AddExpenseBody } from '@/app/api/expenses/route'
import { sanity } from '@/service/sanity'

export async function addExpeneseTransaction(
  userId: string | null,
  { content, cost, date, category }: AddExpenseBody
) {
  try {
    if (!cost || !userId || !date || !category) {
      return {
        message: 'Missing required fields',
        code: 22,
      }
    }
    await sanity.client.create({
      _type: 'expenses',
      amount: Number(cost),
      category,
      date,
      content,
      user: {
        _type: 'reference',
        _ref: userId,
      },
    })
    return {
      message: 'Expense added successfully',
      code: 0,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Something went wrong',
      code: 1,
    }
  }
}

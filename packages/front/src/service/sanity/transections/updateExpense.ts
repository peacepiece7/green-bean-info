import { Expenses } from '@/model'
import { sanity } from '@/service/sanity'

export async function updateExpenseTransaction(body: Expenses) {
  try {
    const { id, ...rest } = body
    await sanity.client.patch(id).set(rest).commit()
    return {
      code: 0,
      message: 'Expense updated successfully'
    }
  } catch (error) {
    console.error(error)
    return {
      code: 22,
      message: 'Expense update failed'
    }
  }
}

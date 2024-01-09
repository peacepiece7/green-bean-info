import dayjs from 'dayjs'
import { sanity } from '..'

export async function fetchExpensesCalendarTransaction(userId: string, year: string | null, month: string | null) {
  try {
    const upTo = dayjs(`${year}-${month}-01`).add(1, 'month').format('YYYY-MM-DD')
    const currentDate = dayjs(`${year}-${month}-01`).format('YYYY-MM-DD')
    const query = `*[_type == "expenses" && user._ref == "${userId}" && date >= "${currentDate}" && date < "${upTo}"]{
        "id" : _id,
        "userId" : user->._id,
        date,
        "cost" : amount,
        category
      }`
    const expenseList = await sanity.client.fetch(query)
    return expenseList
  } catch (e) {
    console.error(e)
    return []
  }
}

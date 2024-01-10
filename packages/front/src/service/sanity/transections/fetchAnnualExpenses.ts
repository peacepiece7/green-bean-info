import { AnnualExpense } from '@/app/analyze/[year]/[month]/_container/AnnualExpenses'
import { sanity } from '@/service/sanity'

export async function fetchAnnualExpensesTransection(userId: string) {
  try {
    const data: AnnualExpense[] = await sanity.client.fetch(
      `
          *[_type == "expenses" && user._ref == "${userId}"] {
            date,
            category,
            "cost" : amount
           }
            `
    )
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}

import { AnnualExpense } from '@/app/analyze/[year]/[month]/_container/Chart/AnnualExpenses'
import { sanity } from '@/service/sanity'
import { dayManager } from '@/util/dayManager'

export async function fetchAnnualExpensesTransection(userId: string, year: string | null, month: string | null) {
  try {
    const data: AnnualExpense[] = await sanity.client.fetch(
      `
          *[_type == "expenses" && user._ref == "${userId}" ${getFilterQuery(year, month)}] {
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

function getFilterQuery(year: string | null, month: string | null) {
  if (year && month) {
    const lastDate = dayManager.lastDateOfMonth(`${year}-${month}`)
    const prevDate = dayManager.subtractDateWith(lastDate, 'month').formatDate()
    const nextDate = dayManager.addDateWith(`${year}-${month}-01`, 'month').formatDate()
    return `&& ( date > "${prevDate}" && date < "${nextDate}" )`
  } else if (year) {
    const lastDate = dayManager.lastDateOfMonth(`${year}-12`)
    const prevDate = dayManager.subtractDateWith(lastDate, 'year').formatDate()
    const nextDate = dayManager.addDateWith(`${year}-01-01`, 'year').formatDate()
    return `&& ( date > "${prevDate}" && date < "${nextDate}" )`
  }
}

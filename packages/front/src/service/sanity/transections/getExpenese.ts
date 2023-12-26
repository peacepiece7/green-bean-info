import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { sanity } from '@/service/sanity'

dayjs.extend(weekOfYear)

export async function getExpensesTransaction(
  userId: string | null,
  page: string | null = '1',
  pageSize: string | null = '10'
) {
  try {
    const pageStart = Number(page) * Number(pageSize)
    const pageEnd = pageStart + Number(pageSize)
    const query = `{
        "totalCount" : count(*[_type == "expenses" && user._ref == "${userId}"]),
        "content" : *[_type == "expenses" && user._ref == "${userId}"][${pageStart}...${pageEnd}]  | order(date desc)
        {
            "id" : _id,
            "date" : date,
            "cost" : amount,
            "category" : category,
            "content" : content
        }
      }`
    const response = await sanity.client.fetch(query)
    response.totalPage = Math.ceil(response.totalCount / Number(pageSize))
    response.currentPage = Number(page)
    return {
      code: 0,
      data: response,
      message: 'Successfully fetched expenses',
    }
  } catch (error) {
    return {
      code: 1,
      data: null,
      message: 'Error occured while fetching expenses',
    }
  }
}

// export async function getAllExpensesByCategoryTransaction(
//   category: string,
//   userId: string
// ) {
//   try {
//     // todo : category 조건부 필터를 쿼리에 추가하기
//     // prettier-ignore
//     const query = `*[_type == "${YOLO_USER_EXPENSES_DOC_TYPE}" ${userId ? `&& user._ref == "${userId}"` : ''} ${category ? `&& category == "${category}"` : ''}]{
//         "id" : _id,
//         "userId" : user._ref,
//         "date" : date,
//         "amount" : amount,
//         "category" : category
//       }`
//     return await client.fetch(query)

//     // * TEST CODE
//     // return expenses.map((expense: SanityExpenseResponse) => {
//     //   return {
//     //     id: expense._id,
//     //     userId: expense.user._ref,
//     //     date: expense.date,
//     //     amount: expense.amount,
//     //     category: expense.category
//     //   }
//     // })
//     // ! already filtered by category in query
//     // .filter((expense: Expense) => {
//     //   if (!category) return expense
//     //   return expense.category === category
//     // })
//   } catch (error) {
//     console.error(error)
//     return []
//   }
// }

// type Accumulator = {
//   [key: string]: number
// }
// type ExpenseSummaryResponse = Pick<SanityExpenseResponse, 'amount' | 'date'>
// function getDailyExpenses(expenses: ExpenseSummaryResponse[]) {
//   const obj: Accumulator = {}
//   expenses.forEach((expense) => {
//     obj[expense.date]
//       ? (obj[expense.date] += expense.amount)
//       : (obj[expense.date] = expense.amount)
//   })
//   return Object.entries(obj).map((v) => {
//     return {
//       _id: v[0],
//       totalAmount: v[1],
//     }
//   })
// }

// function getWeeklyExpenses(expenses: ExpenseSummaryResponse[]) {
//   const obj: Accumulator = {}
//   expenses.forEach((expense) => {
//     const date =
//       dayjs(expense.date).format('YYYY') + '-' + dayjs(expense.date).week()
//     obj[date] ? (obj[date] += expense.amount) : (obj[date] = expense.amount)
//   })
//   return Object.entries(obj).map((v) => {
//     return {
//       _id: v[0],
//       totalAmount: v[1],
//     }
//   })
// }

// function getMonthlyExpenses(expenses: ExpenseSummaryResponse[]) {
//   const obj: Accumulator = {}
//   expenses.forEach((expense) => {
//     const date = dayjs(expense.date).format('YYYY-MM')
//     obj[date] ? (obj[date] += expense.amount) : (obj[date] = expense.amount)
//   })
//   return Object.entries(obj).map((v) => {
//     return {
//       _id: v[0],
//       totalAmount: v[1],
//     }
//   })
// }

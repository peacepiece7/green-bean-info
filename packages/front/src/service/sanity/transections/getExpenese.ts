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
        "content" : *[_type == "expenses" && user._ref == "${userId}"] | order(date desc) [${pageStart}...${pageEnd}]
        {
            "id" : _id,
            "date" : date,
            "cost" : amount,
            "category" : category,
            "content" : content,
            ...
        }
      }`
    const response = await sanity.client.fetch(query)
    response.totalPage = Math.ceil(response.totalCount / Number(pageSize))
    response.currentPage = Number(page)
    return {
      code: 0,
      data: response,
      message: 'Successfully fetched expenses'
    }
  } catch (error) {
    return {
      code: 1,
      data: null,
      message: 'Error occured while fetching expenses'
    }
  }
}

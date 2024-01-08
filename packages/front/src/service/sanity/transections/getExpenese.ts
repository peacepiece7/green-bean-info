import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { sanity } from '@/service/sanity'

dayjs.extend(weekOfYear)

// userId: string | null,
// page: string | null = '1',
// pageSize: string | null = '10'

export async function getExpensesTransaction(
  userId: string | null,
  options: {
    page?: string | null
    pageSize?: string | null
    query?: string | null
    sort?: string | null // asc | desc
  }
) {
  try {
    const { page = '1', pageSize = '10', query: q, sort: s } = options
    const pageStart = Number(page) * Number(pageSize)
    const pageEnd = pageStart + Number(pageSize)
    const searchQuery = q ? `&& category match "*${q}*" || content match "*${q}*"` : ''
    const sort = s ? s : 'desc'
    const query = `{
        "totalCount" : count(*[_type == "expenses" && user._ref == "${userId}" ${searchQuery}]),
        "content" : *[_type == "expenses" && user._ref == "${userId}" ${searchQuery}] | order(date ${sort}, _updatedAt desc) [${pageStart}...${pageEnd}]
        {
            "id" : _id,
            "date" : date,
            "cost" : amount,
            "category" : category,
            "content" : content,
            "updatedAt" : _updatedAt
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
    console.error('Error occured while fetching expenses', error)
    return {
      code: 1,
      data: null,
      message: 'Error occured while fetching expenses'
    }
  }
}

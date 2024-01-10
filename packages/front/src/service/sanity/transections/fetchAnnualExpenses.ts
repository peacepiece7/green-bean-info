// import { sanity } from '@/service/sanity'

// export async function fetchAnnualExpensesTransection(id: string, year: string, month: string) {
//   try {
//     const searchQuery = query ? `&& category match "*${query}*" ` : ''
//     const data: Item[] = await sanity.client.fetch(
//       `
//           *[_type == "expenses" && user._ref == "${userId}" ${searchQuery}] {
//             "id" : _id,
//             "value" : category
//            }
//             `
//     )
//     // HACK : GROQU에서 unique(category) 같은 기능이 없어서 클라이언트에서 중복 제거
//     return data.filter((item, i) => data.findIndex((item2) => item2.value === item.value) === i)
//   } catch (e) {
//     console.error(e)
//     return []
//   }
// }

import { EXPENSES } from '@/constants/query'
import { sanity } from '@/service/sanity'
import { dayManager } from '@/util/dayManager'

export async function addMockExpenseTransection(userId: string) {
  try {
    const COUNT = 40
    const startDate = dayManager.subtractDateWith(Date.now(), 'month').formatDate()
    const endDate = dayManager
      .addDateWith(Date.now(), 'month')
      .addDateWith(null, 'month')
      .addDateWith(null, 'month')
      .formatDate()
    const forms = getRandomForms(startDate, endDate, COUNT)

    const transaction = sanity.client.transaction()

    for (let i = 0; i < COUNT; i++) {
      transaction.create({
        _type: EXPENSES,
        amount: forms[i].amount,
        category: forms[i].category,
        date: forms[i].date,
        user: {
          _type: 'reference',
          _ref: userId
        }
      })
    }

    await transaction.commit()

    return {
      message: 'Mock expenses added successfully',
      code: 0
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Something went wrong',
      code: 1
    }
  }
}

const CATEGORIES = [
  'Food',
  'Transportation',
  'Shopping',
  'Health',
  'Education',
  'Entertainment',
  'Salary',
  'Rent',
  'Utilities',
  'Insurance',
  'Tax',
  'Debt',
  'Gift',
  'Investment',
  'Other'
]

const getRandomCategory = (list: string[]) => {
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}

const getRandomCost = (min: number, max: number) => {
  const cost = Math.floor(Math.random() * (max - min + 1)) + min
  return cost - (cost % 1000)
}

const getRandomDate = (start: string, end: string) => {
  const startTime = dayManager.dayToDateObject(start).getTime()
  const endTime = dayManager.dayToDateObject(end).getTime()
  return dayManager.formatDate(new Date(startTime + Math.random() * (endTime - startTime)))
}

const getRandomForms = (startDate: string, endDate: string, count: number) => {
  const forms = []
  for (let i = 0; i < count; i++) {
    forms.push({
      _type: 'expense',
      amount: getRandomCost(1000, 100000),
      category: getRandomCategory(CATEGORIES),
      date: getRandomDate(startDate, endDate)
    })
  }
  return forms
}

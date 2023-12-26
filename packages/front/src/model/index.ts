export interface User {
  id: string
  username: string
  email: string
  image: string
}

export interface Expenses {
  id: string
  category: string
  cost: number
  content: string
  date: string
}

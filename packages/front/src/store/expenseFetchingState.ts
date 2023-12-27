import { atom } from 'recoil'

export const expenseIsFetching = atom({
  key: 'expenseIsFetchingState',
  default: false
})

import { atom } from 'recoil'

export const expenseAsyncState = atom({
  key: 'expenseIsFetchingState',
  default: false
})

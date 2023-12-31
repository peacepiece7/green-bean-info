import { atom } from 'recoil'

export const expenseAsyncState = atom({
  key: 'expenseIsFetchingState',
  default: false
})

export const expenseEditQueue = atom<string[]>({
  key: 'extenseEditQueue',
  default: []
})

export const expenseDeleteQueue = atom<string[]>({
  key: 'expenseDeleteQueue',
  default: []
})

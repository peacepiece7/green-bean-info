import { atom } from 'recoil'

export const expenseAddIsFetchingState = atom({
  key: 'expenseAddIsFetchingState',
  default: false
})

export const expenseEditQueue = atom<string[]>({
  key: 'expenseEditQueue',
  default: []
})

export const expenseDeleteQueue = atom<string[]>({
  key: 'expenseDeleteQueue',
  default: []
})

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: ''
})

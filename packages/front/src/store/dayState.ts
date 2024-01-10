import { atom } from 'recoil'

export const dayState = atom({
  key: 'dayState',
  default: {
    day: '0',
    month: '0',
    year: '0'
  }
})

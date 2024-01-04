import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'recommendCategory',
  storage: typeof window !== 'undefined' ? localStorage : undefined
})

export const recommendCategoryState = atom<string[]>({
  key: 'recommendCategoryState',
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const searchState = atom<string | null>({
  key: 'searchState',
  default: null
})

export const sortState = atom<'asc' | 'desc'>({
  key: 'sortState',
  default: 'desc'
})

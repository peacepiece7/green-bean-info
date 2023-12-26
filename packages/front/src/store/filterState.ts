import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'recommendCategory',
  storage: typeof window !== 'undefined' ? localStorage : undefined,
})

export const filterState = atom({
  key: 'filterState',
  default: 'all',
})

export const recommendCategoryState = atom<string[]>({
  key: 'recommendCategoryState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

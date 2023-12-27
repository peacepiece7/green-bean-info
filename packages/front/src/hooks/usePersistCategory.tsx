import { recommendCategoryState } from '@/store/filterState'
import { useRecoilState } from 'recoil'

export function usePersistCategory() {
  const [state, setState] = useRecoilState(recommendCategoryState)

  const beforeSetState = (newState: string) => {
    const idx = state.findIndex((item) => item === newState)
    const prevState = [...state]
    if (idx >= 0) {
      prevState.splice(idx, 1)
      setState(() => {
        return [newState, ...prevState]
      })
    } else if (state.length >= 5) {
      prevState.pop()
      prevState.unshift(newState)
      setState(prevState)
    } else {
      setState([...state, newState])
    }
  }

  return { persistState: state, setPersist: beforeSetState }
}

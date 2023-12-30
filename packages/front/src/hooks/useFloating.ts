import { useEffect, useRef } from 'react'

// TODO : 이미지가 둥둥 떠다니는 효과를 주는 커스텀 훅
export default function useFloating<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {}, [])

  return ref
}

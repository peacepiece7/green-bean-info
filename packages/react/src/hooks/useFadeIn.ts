import { useEffect, useRef } from 'react'

/**
 * @description 특정 요소를 서서히 나타나게 하는 훅
 * @param {number} duration
 * @param {number} delay
 * @default
 * duration: 1000
 * delay: 100
 */
// prettier-ignore
export function useFadeIn<T extends HTMLElement>(duration: number = 1000, delay: number = 100 ) {
  const ref = useRef<T>(null)

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.opacity = '1'
        ref.current.style.transition = `opacity ${duration}ms ease-in-out`
      }
    }, delay)
  }, [])

  return {
    ref,
    style: { opacity: '0' },
  }
}

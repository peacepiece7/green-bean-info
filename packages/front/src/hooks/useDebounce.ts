import { useCallback, useRef } from 'react'

function useDebounce<A>(cb: (arg: A) => void, delay?: number): (arg: A) => void
function useDebounce<A extends unknown[]>(cb: (...args: A) => void, delay: number = 2000) {
  const argsRef = useRef<A>()
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cleanup = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const debouncedCallback = useCallback((...args: A) => {
    argsRef.current = args
    cleanup()
    timer.current = setTimeout(() => {
      if (argsRef.current) cb(...argsRef.current)
    }, delay)
  }, [])

  return debouncedCallback
}

export { useDebounce }

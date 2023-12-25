import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounceFirst = <T extends object | string>(
  value: T,
  delay: number = 2000,
  onChaged: (value: T) => void = () => {}
) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      onChaged(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [typeof value === 'object' ? JSON.stringify(value) : value, delay])

  return debouncedValue
}

function useDebounce<A>(cb: (arg: A) => void, delay?: number): (arg: A) => void
function useDebounce<A extends unknown[]>(
  cb: (...args: A) => void,
  delay: number = 2000
) {
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

import { useCallback, useEffect, useRef, useState } from 'react'

export default function useBeforeLeaveOrEnterMouse<T extends HTMLElement>() {
  const [isEnter, setIsEnter] = useState(false)
  const ref = useRef<T>(null)

  const handleMouseLeave = useCallback(() => {
    setIsEnter(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsEnter(true)
  }, [])

  useEffect(() => {
    if (!ref.current) return
    ref.current.addEventListener('mouseenter', handleMouseEnter)
    ref.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (!ref.current) return
      ref.current.removeEventListener('mouseenter', handleMouseEnter)
      ref.current.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseEnter, handleMouseLeave])

  return { ref, isEnter }
}

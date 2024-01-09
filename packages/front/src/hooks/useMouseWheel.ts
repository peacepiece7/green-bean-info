import { useEffect, useState } from 'react'

/**
 * @description 휠이 움직이지 않으면 0을 반환합니다.
 * @returns {number} wheel
 */
export function useMouseWheel() {
  const [wheel, setWheel] = useState(0)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => setWheel(e.deltaY)
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])
  return wheel
}

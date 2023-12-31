import { useEffect, useRef, useState } from 'react'

const MOBILE_MEDIA_QUERY = '(max-width: 780px)'

const isBrowser = typeof window !== 'undefined'

export function useMediaQuery() {
  const [matches, setMatches] = useState(() => (isBrowser ? window.matchMedia(MOBILE_MEDIA_QUERY).matches : false))
  const matchMediaRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    if (!isBrowser) return
    const matchMedia = window.matchMedia(MOBILE_MEDIA_QUERY)
    matchMediaRef.current = matchMedia
    function handleChange() {
      setMatches(window.matchMedia(MOBILE_MEDIA_QUERY).matches)
    }
    matchMediaRef.current.addEventListener('change', handleChange)

    return () => {
      if (!isBrowser) return
      matchMediaRef.current?.removeEventListener('change', handleChange)
    }
  }, [])

  return { isMobile: matches }
}

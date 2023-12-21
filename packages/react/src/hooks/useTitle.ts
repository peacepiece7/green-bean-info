import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

export function useTitle(initTitle: string) {
  const [title, setTitle] = useState(initTitle)

  useEffect(() => {
    if (!isBrowser) return
    const el = document.querySelector('title')
    el && el.setAttribute('title', title)
    setTitle(initTitle)
  }, [initTitle, title])

  return { title, setTitle }
}

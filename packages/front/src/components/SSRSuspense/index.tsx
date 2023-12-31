import { ComponentProps, Suspense, useEffect, useState } from 'react'

export function SSRSuspense({ fallback, children }: ComponentProps<typeof Suspense>) {
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isMounted) {
    return <Suspense fallback={fallback}>{children}</Suspense>
  }
  return <>{fallback}</>
}

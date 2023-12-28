'use client'
import LoadingCoin from '@/components/Loading/LoadingCoin'
import { useFadeIn } from 'greenbean-pack'

export default function Loading() {
  const { ref, style } = useFadeIn<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100dvh',
        ...style
      }}
    >
      <LoadingCoin />
    </div>
  )
}

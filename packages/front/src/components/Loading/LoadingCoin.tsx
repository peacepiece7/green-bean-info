import Image from 'next/image'
import { HTMLAttributes } from 'react'

// TODO : SVG + CSS Animation 으로 대체합니다.
interface LoadingCoinProps {
  width?: number
  height?: number
}
// prettier-ignore
export default function LoadingCoin({ width = 250, height = 250 }: LoadingCoinProps) {
  const css: HTMLAttributes<HTMLDivElement>['style'] = {
    position: 'absolute',
    width: '100%',
  }
  return (
    <div style={{ ...css }}>
      <Image
        src='/gif/coin.gif'
        width={width}
        height={height}
        alt='spined coin'
        style={{ margin: 'auto' }}
      />
    </div>
  )
}

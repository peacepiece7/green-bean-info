import { COLOR } from '@/styles/common'
import styled from 'styled-components'

interface SpinProps {
  width?: string
  height?: string
}
export function Spin({ width = '25px', height = '25px' }: SpinProps) {
  return <SpinWrapper $width={width} $height={height} />
}

const SpinWrapper = styled.span<{
  $width: string
  $height: string
}>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  border: 5px solid ${COLOR.gray};
  border-bottom-color: ${COLOR.tertiary};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

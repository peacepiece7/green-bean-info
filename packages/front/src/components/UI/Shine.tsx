'use clinet'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

interface ShineProps {
  width?: number
  height?: number
  disable?: boolean
  options?: {
    top?: number
    left?: number
    right?: number
    bottom?: number
  }
}
export default function Shine({ width = 25, height = 25, disable = false, options }: ShineProps) {
  const optionsAttr = {
    width,
    height,
    disable,
    top: options?.top,
    left: options?.left,
    right: options?.right,
    bottom: options?.bottom
  }

  return (
    <ShineWrapper $options={optionsAttr}>
      <Image src="/svg/shine3.svg" width={width} height={height} alt="shine icon like star"></Image>
    </ShineWrapper>
  )
}

const shineSpin = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`

interface ShineAttr {
  $options: ShineProps['options'] & { disable: boolean }
}

const ShineWrapper = styled.div<ShineAttr>`
  width: fit-content;
  height: fit-content;
  position: absolute;
  animation: ${shineSpin} 4s linear infinite;
  top: ${({ $options: { top } }) => (top ? `${top}rem` : 0)};
  left: ${({ $options: { left } }) => (left ? `${left}rem` : 0)};
  right: ${({ $options: { right } }) => (right ? `${right}rem` : 0)};
  bottom: ${({ $options: { bottom } }) => (bottom ? `${bottom}rem` : 0)};
  opacity: ${({ $options: { disable } }) => (!disable ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  img {
    margin: auto;
  }
`

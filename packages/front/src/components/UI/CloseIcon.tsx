import Image from 'next/image'

interface CloseIconProps {
  width?: number
  height?: number
}

export function CloseIcon({ width = 20, height = 20 }: CloseIconProps) {
  return (
    <Image
      src="/svg/closeIcon.svg"
      alt="close icon"
      width={width}
      height={height}
      style={{
        minWidth: `${width / 10}rem`,
        minHeight: `${height / 10}rem`
      }}
    />
  )
}

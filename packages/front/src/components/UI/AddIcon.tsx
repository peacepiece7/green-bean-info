import Image from 'next/image'

interface AddIconProps {
  width?: number
  height?: number
}

export function AddIcon({ width = 20, height = 20 }: AddIconProps) {
  return (
    <Image
      src="/svg/addIcon.svg"
      alt="add icon"
      width={width}
      height={height}
      style={{
        minWidth: `${width / 10}rem`,
        minHeight: `${height / 10}rem`
      }}
    />
  )
}

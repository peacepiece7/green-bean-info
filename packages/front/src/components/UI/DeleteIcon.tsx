import Image from 'next/image'

interface DeleteProps {
  width?: number
  height?: number
}

export function DeleteIcon({ width = 20, height = 20 }: DeleteProps) {
  return (
    <Image
      src="/svg/deleteIcon.svg"
      alt="delete icon"
      width={width}
      height={height}
      style={{
        minWidth: `${width / 10}rem`,
        minHeight: `${height / 10}rem`
      }}
    />
  )
}

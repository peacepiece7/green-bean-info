import Image from 'next/image'
import { MouseEventHandler } from 'react'

interface DeleteProps {
  width?: number
  height?: number
  onClick?: MouseEventHandler<HTMLImageElement>
}

export function DeleteIcon({ width = 20, height = 20, onClick }: DeleteProps) {
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
      onClick={onClick}
    />
  )
}

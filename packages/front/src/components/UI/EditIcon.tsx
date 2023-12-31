import Image from 'next/image'

interface EditProps {
  width?: number
  height?: number
}
export function EditIcon({ width = 20, height = 20 }: EditProps) {
  return (
    <Image
      src="/svg/editIcon.svg"
      alt="edit icon"
      width={width}
      height={height}
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`
      }}
    />
  )
}

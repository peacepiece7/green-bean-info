import { RefObject, useCallback, useEffect, useState } from 'react'

export interface Item {
  key: string
  value: string
  selected?: boolean
}

export default function useAutoComplete<T extends HTMLElement>(
  ref: RefObject<T>,
  items: Item[],
  cb: (item: Item) => void,
  onSubmit: (item: Item) => void
) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState<number | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      setIdx((prevIdx) => {
        switch (e.key) {
          case 'ArrowDown':
            return prevIdx === null
              ? 0
              : Math.min(prevIdx + 1, items.length - 1)
          case 'ArrowUp':
            return prevIdx === null ? 0 : Math.max(prevIdx - 1, 0)
          case 'Enter':
            if (prevIdx !== null) {
              onSubmit(items[prevIdx])
              ref.current?.blur()
            }
            return prevIdx
          default:
            return prevIdx
        }
      })
    },
    [items, ref, onSubmit]
  )

  useEffect(() => {
    if (ref.current) ref.current.onkeydown = handleKeyDown

    return () => {
      if (ref.current) ref.current.onkeydown = null
    }
  }, [handleKeyDown, ref])

  useEffect(() => {
    if (idx === null) return
    cb(items[idx])
  }, [idx])

  return { open, setOpen }
}

import { RefObject, useCallback, useEffect, useState } from 'react'

export interface Item {
  id: string
  value: string
  selected?: boolean
}

export default function useAutoComplete<T extends HTMLElement>(
  ref: RefObject<T>,
  items: Item[] | undefined,
  onChamnge: (item: Item) => void,
  onSubmit: (item: Item) => void
) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState<number | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!items) {
        setIdx(null)
        return
      }

      if (e.key === 'Enter' && idx !== null) {
        onSubmit(items[idx])
        ref.current?.blur()
      }

      setIdx((prevIdx) => {
        switch (e.key) {
          case 'ArrowDown':
            return prevIdx === null
              ? 0
              : Math.min(prevIdx + 1, items.length - 1)
          case 'ArrowUp':
            return prevIdx === null ? 0 : Math.max(prevIdx - 1, 0)

          default:
            return prevIdx
        }
      })
    },
    [items, ref, onSubmit, idx]
  )

  useEffect(() => {
    if (ref.current) ref.current.onkeydown = handleKeyDown

    return () => {
      if (ref.current) ref.current.onkeydown = null
    }
  }, [handleKeyDown, ref])

  useEffect(() => {
    if (idx === null || !items) return
    onChamnge(items[idx])
  }, [idx])

  return { open, setOpen }
}

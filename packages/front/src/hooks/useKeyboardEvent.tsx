import { AutoCompleteItem } from '@/app/_container/ExpenseAddForm/module'
import { RefObject, useCallback, useEffect, useState } from 'react'

export interface Item {
  id: string
  value: string
  selected?: boolean
}

export default function useKeyboardEvent<T extends HTMLElement, I extends AutoCompleteItem>(
  ref: RefObject<T>,
  items: I[] | undefined,
  onChange: (item: I) => void,
  onSubmit: (item: I) => void
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
        setIdx(null)
        ref.current?.blur()
      }

      setIdx((prevIdx) => {
        switch (e.key) {
          case 'ArrowDown':
            return prevIdx === null ? 0 : Math.min(prevIdx + 1, items.length - 1)
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
    onChange(items[idx])
  }, [idx])

  return { open, setOpen }
}

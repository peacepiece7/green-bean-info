'use client'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
}

export function Modal({ children }: ModalProps) {
  if (typeof window === 'undefined') return null

  const node = document.getElementById('portal') as HTMLDivElement

  return createPortal(children, node)
}

import { ReactNode } from 'react'

interface TextWithProps {
  isLoading: boolean
  loadingElement: ReactNode
  isMobile: boolean
  mobileElement: ReactNode
  defaultElement: string | ReactNode
}
export function ChildrenWith({ isLoading, loadingElement, isMobile, mobileElement, defaultElement }: TextWithProps) {
  if (isLoading) {
    return loadingElement
  } else if (isMobile) {
    return mobileElement
  } else {
    return defaultElement
  }
}

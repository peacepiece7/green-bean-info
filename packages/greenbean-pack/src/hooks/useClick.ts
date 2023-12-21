import { useEffect, useRef } from "react";

// prettier-ignore
export const useClick = (onClick: (ev : HTMLElementEventMap['click'])  => void) => {  
  const element = useRef<HTMLElement>(null)
  useEffect(() => {
    if(element.current) element.current.addEventListener('click', onClick)
    return () => {
        if(element.current) element.current.removeEventListener('click', onClick)
    }
  }, [])

  return element
}

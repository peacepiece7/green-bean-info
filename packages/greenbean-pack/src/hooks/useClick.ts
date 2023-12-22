import { useEffect, useRef } from "react";

/**
 * @description 클릭 이벤트를 감지 후 콜백을 실행합니다.
 */
// prettier-ignore
export const useClick = <T extends HTMLElement>(onClick: (ev : HTMLElementEventMap['click'])  => void) => {  
  const element = useRef<T>(null)
  useEffect(() => {
    if(element.current) element.current.addEventListener('click', onClick)
    return () => {
        if(element.current) element.current.removeEventListener('click', onClick)
    }
  }, [])

  return element
}

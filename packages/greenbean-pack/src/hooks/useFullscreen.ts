import { useCallback, useRef, useState } from "react";

export function useFullscreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isFull, setIsFull] = useState(false);

  const triggerFull = useCallback(() => {
    if (ref.current) {
      ref.current.requestFullscreen();
      setIsFull(true);
      // TODO : 브러우저 호환성 고려하기
      // if (ref.current.webkitReqeustFullscreen) {
      // ref.current.webkitReqeustFullscreen()
      // }
      // if (ref.current.mozReqeustFullscreen) {
      // ref.current.mozReqeustFullscreen()
      // if(ref.current.msReqeustFullscreen) {
      // ref.current.msReqeustFullscreen()
    }
  }, []);

  const exitFull = useCallback(() => {
    document.exitFullscreen();
    setIsFull(false);
  }, []);

  return { ref, triggerFull, exitFull, isFull };
}

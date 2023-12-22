import { useCallback, useEffect, useState } from "react";

/**
 * @description 스크롤 위치를 감지합니다.
 */
export function useScroll() {
  const [state, setState] = useState({ x: 0, y: 0 });

  const onScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    setState({ x: window.scrollX, y: window.scrollY });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

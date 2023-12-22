import { useEffect } from "react";

/**
 * @description 컴포넌트가 언마운트 될 때 함수를 호출합니다.
 */
export function useWillUnmount(callback: () => void) {
  useEffect(() => {
    return callback;
  }, []);
}

/// <reference types="react" />
/**
 * @description 브라우저 전체화면을 사용할 수 있게 합니다.
 * 아직 브라우저 호환성을 고려하지 않았습니다.
 * 테스트 코드가 없습니다.
 */
export declare function useFullscreen<T extends HTMLElement>(): {
  ref: import("react").RefObject<T>;
  triggerFull: () => void;
  exitFull: () => void;
  isFull: boolean;
};

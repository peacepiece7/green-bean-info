/// <reference types="react" />
/**
 * @description 특정 요소를 서서히 나타나게 합니다.
 * @default
 * duration: 1000
 * delay: 100
 */
export declare function useFadeIn<T extends HTMLElement>(
  duration?: number,
  delay?: number,
): {
  ref: import("react").RefObject<T>;
  style: {
    opacity: string;
  };
};

/// <reference types="react" />
export declare function useFullscreen<T extends HTMLElement>(): {
  ref: import("react").RefObject<T>;
  triggerFull: () => void;
  exitFull: () => void;
  isFull: boolean;
};

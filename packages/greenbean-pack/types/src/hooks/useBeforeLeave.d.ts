/// <reference types="react" />
export type BeforeLeaveEvent = WindowEventHandlersEventMap["beforeunload"];
/**
 * @description 뒤로기가나 새로고침 등을 통해 페이지를 떠날 때, 사용자에게 확인을 받습니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
 */
export declare function useLeaveBeforeSave(cb: () => boolean): void;
/**
 * @description 마우스가 브라우저를 벗어날 때, 콜백을 실행합니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event
 */
export declare function useBeforeLeaveMouse(cb: () => void): void;
/**
 * @description 마우스가 특정 요소를 벗어나거나 들어오는 것을 감지합니다.
 */
export declare function useBeforeLeaveOrEnterMouse<T extends HTMLElement>(): {
  ref: import("react").RefObject<T>;
  isEnter: boolean;
};

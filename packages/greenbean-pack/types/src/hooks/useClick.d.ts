/// <reference types="react" />
/**
 * @description 클릭 이벤트를 감지 후 콜백을 실행합니다.
 */
export declare const useClick: <T extends HTMLElement>(onClick: (ev: HTMLElementEventMap['click']) => void) => import("react").RefObject<T>;

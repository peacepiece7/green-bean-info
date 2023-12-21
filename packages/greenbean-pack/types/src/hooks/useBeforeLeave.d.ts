export type BeforeLeaveEvent = WindowEventHandlersEventMap["beforeunload"];
export declare function useLeaveBeforeSave(cb: () => boolean): void;
export declare function useBeforeLeaveMouse(cb: () => void): void;

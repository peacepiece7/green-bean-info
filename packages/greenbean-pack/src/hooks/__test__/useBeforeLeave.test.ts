import { renderHook } from "@testing-library/react";
import { useBeforeLeaveMouse, useLeaveBeforeSave } from "../useBeforeLeave";

describe("useLeaveBeforeSave, useBeforeLeaveMouse", () => {
  it("useLeaveBeforeSave : 뒤로가기 또는 화면이 종료될 때 콜백이 실행됩니다.", () => {
    const mockCb = jest.fn();
    const { unmount } = renderHook(() => useLeaveBeforeSave(mockCb));
    const event = new Event("beforeunload");
    window.dispatchEvent(event);
    expect(mockCb).toHaveBeenCalledTimes(1);
    unmount();
  });

  it("useBeforeLeaveMouse : 마우스가 화면을 벗어날 떄 콜백이 실행됩니다.", () => {
    const mockCb = jest.fn();
    const { unmount } = renderHook(() => useBeforeLeaveMouse(mockCb));
    const event = new MouseEvent("mouseout", { clientX: 0, clientY: 0 });
    window.dispatchEvent(event);
    expect(mockCb).toHaveBeenCalledTimes(1);
    unmount();
  });
});

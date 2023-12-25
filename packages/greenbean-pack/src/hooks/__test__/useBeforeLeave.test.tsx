import {
  renderHook,
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import {
  useBeforeLeaveMouse,
  useBeforeLeaveOrEnterMouse,
  useLeaveBeforeSave,
} from "../useBeforeLeave";
import "@testing-library/jest-dom";

function MockComponent() {
  const { ref, isEnter } = useBeforeLeaveOrEnterMouse<HTMLDivElement>();

  return <div ref={ref}>{isEnter ? "ENTER" : "LEAVE"}</div>;
}

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

  it("useBeforeLeaveOrEnterMouse : 마우스가 화면을 벗어나거나 들어오는 것을 감지합니다.", async () => {
    render(<MockComponent />);

    // 렌더링시 LEAVE 상태입니다.
    expect(screen.getByText("LEAVE")).toBeInTheDocument();

    // 마우스가 들어오면 ENTER 상태입니다.
    await act(() => fireEvent.mouseEnter(screen.getByText("LEAVE")));
    expect(screen.getByText("ENTER")).toBeInTheDocument();

    // 마우스가 나가면 LEAVE 상태입니다.
    await act(() => fireEvent.mouseLeave(screen.getByText("ENTER")));
    expect(screen.getByText("LEAVE")).toBeInTheDocument();
  });
});

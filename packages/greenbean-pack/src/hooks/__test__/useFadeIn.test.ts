import { useFadeIn } from "../useFadeIn";
import { renderHook, waitFor } from "@testing-library/react";

describe("useFadeIn", () => {
  it("회면에 아무것도 없는 상태에서 1초가 지나면 opacity가 1이 되여야합니다.", async () => {
    const { result } = renderHook(() => useFadeIn(1000, 1000));
    const { current } = result;
    const { style } = current;
    expect(style.opacity).toBe("0");
    // 1초 기다리기

    await new Promise((resolve) => setTimeout(resolve, 1000));

    waitFor(() => expect(style.opacity).toBe("1"));
  });
});

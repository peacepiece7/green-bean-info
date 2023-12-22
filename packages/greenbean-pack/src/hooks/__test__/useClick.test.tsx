import { withRouter } from "../../tests/withRouter";
import { Route } from "react-router-dom";
import { useState } from "react";
import { useClick } from "../useClick";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";

function MockComponent() {
  const [state, setState] = useState("foo");
  const ref = useClick<HTMLButtonElement>(() => setState("bar"));
  return <button ref={ref}>{state}</button>;
}

describe("useClick", () => {
  it("click시 컨텐츠가 변경됩니다.", () => {
    render(withRouter(<Route path="/" element={<MockComponent />} />));

    expect(screen.getByText("foo")).toBeInTheDocument();
    act(() => screen.getByText("foo").click());
    expect(screen.getByText("bar")).toBeInTheDocument();
  });
});

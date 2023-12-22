import renderder from "react-test-renderer";
import { withRouter } from "../../tests/withRouter";
import { Route } from "react-router-dom";
import { useWillUnmount } from "../useWillUnmount";

function MockComponent({ onUnmount: cb }: { onUnmount: () => void }) {
  useWillUnmount(cb);
  return <div>FOO</div>;
}

describe("useWillUnmount", () => {
  it("컴포넌트가 unmount되면 콜백이 한 번 호출됩니다.", () => {
    const onUnmountMock = jest.fn();
    const component = renderder.create(
      withRouter(
        <Route
          path="/"
          element={<MockComponent onUnmount={onUnmountMock} />}
        />,
      ),
    );
    expect(onUnmountMock).not.toHaveBeenCalled();
    renderder.act(() => {
      component.unmount();
    });
    expect(onUnmountMock).toHaveBeenCalledTimes(1);
  });
});

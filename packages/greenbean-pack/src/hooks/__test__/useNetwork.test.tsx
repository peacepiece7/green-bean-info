import { screen, render, waitFor } from '@testing-library/react'
import { useNetwork } from '../useNetwork'
import { renderHook, act } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'

// prettier-ignore
function MockComponent({ onChnage: cb }: { onChnage: (isOnline:  Navigator["onLine"]) => void } ) {
  const isOnline = useNetwork(cb)
  return <div>{isOnline ? 'true' : 'false'}</div>
}

describe('useNetwork', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      writable: true,
      value: true
    })
  })

  it('온라인이라면 true를 반환합니다.', () => {
    const onChangeMock = jest.fn()
    const { rerender } = render(<MockComponent onChnage={onChangeMock} />)
    expect(screen.getByText('true')).toBeInTheDocument()
    expect(onChangeMock).not.toHaveBeenCalled()

    rerender(<MockComponent onChnage={onChangeMock} />)
    expect(screen.getByText('true')).toBeInTheDocument()
    expect(onChangeMock).not.toHaveBeenCalled()
  })

  it('오프라인이라면 false를 반환합니다.', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      writable: true,
      value: false
    })

    const onChangeMock = jest.fn()
    const { rerender } = render(<MockComponent onChnage={onChangeMock} />)
    expect(screen.getByText('false')).toBeInTheDocument()
    expect(onChangeMock).not.toHaveBeenCalled()

    rerender(<MockComponent onChnage={onChangeMock} />)
    expect(screen.getByText('false')).toBeInTheDocument()
    expect(onChangeMock).not.toHaveBeenCalled()
  })

  it('온라인/오프라인이 바뀌면 콜백이 호출됩니다.', async () => {
    const onChangeMock = jest.fn()
    const { result, rerender } = renderHook(() => useNetwork(onChangeMock))

    expect(result.current).toBe(true)
    act(() => {
      Object.defineProperty(window.navigator, 'onLine', {
        configurable: true,
        writable: true,
        value: false
      })
      rerender()
    })

    waitFor(() => expect(onChangeMock).toHaveBeenCalledTimes(1))
  })
})

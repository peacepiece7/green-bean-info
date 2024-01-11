import { screen, render, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useMouseWheel } from '../useMouseWheel'

function MockComponent() {
  const wheel = useMouseWheel()
  return <h1 style={{ height: '200dvh' }}>{wheel}</h1>
}

describe('useMouseWheel', () => {
  it('마우스 휠을 움직이면 deltaY 값이 변합니다.', async () => {
    render(<MockComponent />)

    expect(screen.getByText('0')).toBeInTheDocument()

    act(() => {
      fireEvent.wheel(window, { deltaY: 120 })
    })

    expect(screen.getByText('120')).toBeInTheDocument()
  })
})

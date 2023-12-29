import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useThrottle } from '../useThrottle'

const MockComponent = ({ value, delay }: { value: number; delay: number }) => {
  const throttleValue = useThrottle(value, delay)
  return <button>{throttleValue}</button>
}

describe('useThrottle', () => {
  it('버튼이 클릭되면 1초 뒤에 1이 증가한다.', async () => {
    const { rerender } = render(<MockComponent value={1} delay={1000} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    rerender(<MockComponent value={2} delay={1000} />)
    setTimeout(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    }, 1200)
  })
})

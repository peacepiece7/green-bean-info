import { render, screen, fireEvent } from '@testing-library/react'
import { AutoComplete, AutoCompleteItem, AutoCompleteProps } from '..'
import '@testing-library/jest-dom'

const mockItem: AutoCompleteItem[] = [
  {
    id: '1',
    value: 'test',
    selected: false
  },
  {
    id: '2',
    value: 'test2',
    selected: false
  },
  {
    id: '3',
    value: 'test3',
    selected: false
  }
]

const defaultProps: AutoCompleteProps<(typeof mockItem)[0]> = {
  items: mockItem,
  onEnter: jest.fn(),
  onSelect: jest.fn(),
  recommendStateBeforeChange: ['Recommendation 1', 'Recommendation 2'],
  reset: false,
  renderListOptions: (item, isSelected) => (
    <div key={item.id} data-testid={`list-option-${item.id}`}>
      {isSelected ? <strong>SELECTED</strong> : item.value}
    </div>
  ),
  renderListIsLoading: () => <div data-testid="loading">loading</div>
}

function MockComponent({ isLoading = false }: { isLoading?: boolean }) {
  return <AutoComplete {...defaultProps} isLoading={isLoading} />
}

describe('AutoComplete', () => {
  it('렌더시 빈 인풋창이 출력됩니다.', () => {
    render(<MockComponent />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('인풋창이 포커싱되면 추천 리스트가 출력됩니다.', () => {
    render(<MockComponent />)
    fireEvent.focus(screen.getByRole('textbox'))
    expect(screen.getByTestId('list-option-Recommendation 1')).toBeInTheDocument()
    expect(screen.getByTestId('list-option-Recommendation 2')).toBeInTheDocument()
  })

  it('검색중일 경우 로딩이 출력됩니다.', () => {
    render(<MockComponent isLoading={true} />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('인풋창에 글자를 입력하면 검색 리스트가 출력됩니다.', () => {
    render(<MockComponent />)

    // 인풋창을 포커스하고 글자를 입력합니다. 인풋창에 글자를 입력합니다.
    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'test' } })
    fireEvent.focus(screen.getByRole('textbox'))
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('인풋창에 글자를 입력한 뒤 키보드 다운을 누르면 아이템이 선택됩니다.', () => {
    render(<MockComponent />)

    // 인풋창에 글자를 입력합니다. (추천 리스트 -> 검색 리스트로 변경됩니다.)
    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'inputValue' } })
    fireEvent.focus(screen.getByRole('textbox'))

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown', code: 'ArrowDown' })
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown', code: 'ArrowDown' })
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown', code: 'ArrowDown' })

    expect(screen.getByText('SELECTED')).toBeInTheDocument() // 세번째 아이템이 선택됩니다.
  })
})

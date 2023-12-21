import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { withRouter } from '@/tests/utils'
import SearchHeader from '@/components/SearchHeader'

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(withRouter(<Route path="/" element={<SearchHeader />} />))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with keyword correctly', () => {
    render(withRouter(<Route path="/:keyword" element={<SearchHeader />} />, '/bts'))
    expect(screen.getByDisplayValue('bts')).toBeInTheDocument()
  })

  it('navigates to results page on search button click', async () => {
    const fakeSearchKeyword = 'fake keyword'
    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route path={`/videos/${fakeSearchKeyword}`} element={<p>{fakeSearchKeyword}</p>} />
        </>,
        '/home',
      ),
    )

    const searchInput = screen.getByRole('textbox')
    const searchButton = screen.getByRole('button')

    await userEvent.type(searchInput, fakeSearchKeyword)
    await userEvent.click(searchButton)

    expect(screen.queryByText(fakeSearchKeyword)).toBeInTheDocument()
  })
})

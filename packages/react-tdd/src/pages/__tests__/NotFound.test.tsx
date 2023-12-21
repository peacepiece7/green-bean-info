import { render } from '@testing-library/react'
import { Route } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { withRouter } from '@/tests/utils'
import NotFound from '../NotFound'

describe('notFound', () => {
  it('renders correctly', () => {
    render(withRouter(<Route path="/" element={<NotFound />} />))
    const component = renderer.create(withRouter(<Route path="/" element={<NotFound />} />))
    expect(component.toJSON()).toMatchSnapshot()
  })
})

import { render, screen, waitFor } from '@testing-library/react'
import { Route } from 'react-router-dom'
import Youtube from '@/api/youtube'
import { withAllContexts, withRouter } from '@/tests/utils'
import { fakeVideo, fakeVideos } from '@/tests/videos'
import Videos from '../Videos'

describe('Videos Page', () => {
  const fakeYoutube = {
    search: jest.fn(),
  }
  beforeEach(() => {
    fakeYoutube.search.mockImplementation(keyword => {
      return keyword ? [fakeVideo] : fakeVideos
    })
  })
  afterEach(() => {
    fakeYoutube.search.mockReset()
  })

  it('renders all videos when keyword is not specified', async () => {
    render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />
          </>,
          '/',
        ),
        fakeYoutube as unknown as Youtube,
      ),
    )
    // expect(fakeYoutube.search).toHaveBeenCalledWith(undefined)
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    })
  })
  it('when keyword is specified, renders search results', async () => {
    const searchKeyword = 'fake-keyword'
    render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />
          </>,
          `/${searchKeyword}`,
        ),
        fakeYoutube as unknown as Youtube,
      ),
    )

    expect(fakeYoutube.search).toHaveBeenCalledWith(searchKeyword)
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1)
    })
  })

  it('renders loading state when items are being fetched', async () => {
    render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />
          </>,
          '/',
        ),
        fakeYoutube as unknown as Youtube,
      ),
    )
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  // it('renders error state when items are not fetched', async () => {
  //   renderWithPath(() => {
  //     throw new Error('error')
  //   })
  //   expect(screen.getByText(/Error.../i)).toBeInTheDocument()
  // })
})

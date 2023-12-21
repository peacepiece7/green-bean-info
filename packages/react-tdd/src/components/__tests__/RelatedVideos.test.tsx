import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Route } from 'react-router-dom'
import Youtube from '@/api/youtube'
import { withAllContexts, withRouter } from '@/tests/utils'
import { fakeVideos } from '@/tests/videos'
import RelatedVideos from '@/components/RelatedVideos'

describe('RelatedVideos', () => {
  const FAKE_ID = 'fake-id'
  fakeVideos
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  }
  function renderRelatedVideosCallback(cb: VoidFunction) {
    fakeYoutube.relatedVideos.mockImplementation(cb)
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id={FAKE_ID} />} />),
        fakeYoutube as unknown as Youtube,
      ),
    )
  }

  afterEach(() => {
    fakeYoutube.relatedVideos.mockClear()
  })

  it('renders correctly', async () => {
    const { asFragment } = renderRelatedVideosCallback(() => fakeVideos)
    await waitForElementToBeRemoved(screen.queryByText('Loading...'))
    expect(asFragment()).toMatchSnapshot()
  })

  it('render related videos correctly', async () => {
    renderRelatedVideosCallback(() => fakeVideos)
    expect(fakeYoutube.relatedVideos).toHaveBeenNthCalledWith(1, FAKE_ID)
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    })
  })

  it('renders error state', async () => {
    renderRelatedVideosCallback(() => {
      throw new Error('error occured!')
    })

    await waitFor(() => {
      expect(screen.queryByText('Something is wrong 😖')).toBeInTheDocument()
    })
  })
})

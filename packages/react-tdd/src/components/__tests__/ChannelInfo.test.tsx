import { render, screen, waitFor } from '@testing-library/react'
import { Route } from 'react-router-dom'
import Youtube from '@/api/youtube'
import { withRouter, withAllContexts } from '@/tests/utils'
import ChannelInfo from '@/components/ChannelInfo'
/**
 * @description testing library cheat sheet about async
 * @see https://testing-library.com/docs/react-testing-library/cheatsheet#async
 */
describe('Channel Info', () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  }
  const FAKE_NAME = 'name'
  const FAKE_URL = 'https://fake-url.jpg'
  afterEach(() => {
    fakeYoutube.channelImageURL.mockClear()
  })

  function renderChannelInfoCallback(cb: VoidFunction) {
    fakeYoutube.channelImageURL.mockImplementation(cb)
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<ChannelInfo id="1" name={FAKE_NAME} />} />),
        fakeYoutube as unknown as Youtube,
      ),
    )
  }

  it('renders with URL', async () => {
    renderChannelInfoCallback(() => FAKE_URL)
    /**
     * @see https://testing-library.com/docs/react-testing-library/cheatsheet#queries
     */
    await screen.findByRole('img')
  })

  it('renders correctly', async () => {
    const { asFragment } = renderChannelInfoCallback(() => FAKE_URL)
    // * 비동기 호출 (useQuery) 을 기다리지 않고 바로 테스트를 진행하면 테스트가 실패할 수 있음
    await waitFor(() => {
      screen.getByRole('img')
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly without image', async () => {
    renderChannelInfoCallback(() => {
      throw new Error('image not found')
    })
    expect(screen.queryByRole('img')).toBeNull()
  })
})

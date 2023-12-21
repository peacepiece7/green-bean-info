import { Route } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { withRouter } from '@/tests/utils'
import { fakeVideo } from '@/tests/videos'
import VideoDetail from '../VideoDetail'

// jests는 shallow rendering을 지원하지 않으므로, mock을 사용하여 테스트
jest.mock('@/components/ChannelInfo')
jest.mock('@/components/RelatedVideos')

describe('VideoDetail', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<VideoDetail />} />, {
        pathname: '/',
        state: { video: fakeVideo },
        key: 'fake-key',
      }),
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

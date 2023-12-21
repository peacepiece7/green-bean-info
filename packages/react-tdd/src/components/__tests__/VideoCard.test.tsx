import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, useLocation } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { withRouter } from '@/tests/utils'
import { fakeVideo } from '@/tests/videos'
import VideoCard, { VideoCardProps } from '@/components/VideoCard'

// HACK : 타입을 정확하게 매칭하는게 지금은 중요하지 않기 때문에 일부만 매칭시킵니다.
const video = fakeVideo as unknown as VideoCardProps['video']

describe('Video Card', () => {
  it('render grid type correctly', () => {
    const component = renderer.create(withRouter(<Route path="/" element={<VideoCard video={video} />} />))
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('render list type correctly', () => {
    const component = renderer.create(withRouter(<Route path="/" element={<VideoCard video={video} type="list" />} />))
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('navigate to video page when click', async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>
    }
    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route path="/videos/watch/:videoId" element={<LocationStateDisplay />} />
        </>,
      ),
    )
    const card = screen.getByRole('listitem')
    await userEvent.click(card)
    const title = new RegExp(`${video.snippet.title}`, 'i')
    const channelTitle = new RegExp(`${video.snippet.channelTitle}`, 'i')
    expect(screen.queryByText(title)).toBeInTheDocument()
    expect(screen.queryByText(channelTitle)).toBeInTheDocument()
  })
})

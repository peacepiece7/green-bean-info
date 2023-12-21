import { useNavigate } from 'react-router-dom'
import { PopularVideo } from '@/models/popular'
import { SearchVideo } from '@/models/search'
import { formatAgo } from '@/utile/date'

type SearchItem = Omit<SearchVideo['items'][0], 'id'> & { id: string }
export interface VideoCardProps {
  type?: 'list' | 'grid'
  video: PopularVideo['items'][0] | SearchItem
}
export default function VideoCard({ video, type = 'grid' }: VideoCardProps) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet
  const navigate = useNavigate()
  const isList = type === 'list'
  return (
    <li
      className={isList ? 'flex gap-1 m-2' : ''}
      onClick={() => {
        navigate(`/videos/watch/${video.id}`, { state: { video } })
      }}
    >
      <img className={isList ? 'w-60 mr-2' : 'w-full'} src={thumbnails.medium.url} alt={title} />
      <div>
        <p className="font-semibold my-2 line-clamp-2">{title}</p>
        <p className="text-sm opacity-80">{channelTitle}</p>
        <p className="text-sm opacity-80">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  )
}

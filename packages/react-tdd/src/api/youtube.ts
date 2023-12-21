import type { IYoutubeClient } from './youtubeClient'
import { Channel } from '@/models/channel'
import { PopularVideo } from '@/models/popular'
import { SearchVideo } from '@/models/search'

export interface IYoutube {
  search: (keyword: string) => Promise<unknown>
  channelImageURL: (id: string) => Promise<unknown>
  relatedVideos: (id: string) => Promise<unknown>
}
export default class Youtube implements IYoutube {
  private apiClient: IYoutubeClient
  constructor(apiClient: IYoutubeClient) {
    this.apiClient = apiClient
  }

  async search(keyword: string) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular()
  }

  async channelImageURL(id: string) {
    return this.apiClient
      .channels<Channel>({ params: { part: 'snippet', id } })
      .then(res => res.data.items[0].snippet.thumbnails.default.url)
  }

  async relatedVideos(id: string) {
    return this.apiClient
      .search<SearchVideo>({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          relatedToVideoId: id,
        },
      })
      .then(res => res.data.items.map(item => ({ ...item, id: item.id.videoId })))
  }

  async #searchByKeyword(keyword: string) {
    return this.apiClient
      .search<SearchVideo>({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword,
        },
      })
      .then(res => {
        return res.data.items.map(item => ({ ...item, id: item.id.videoId }))
      })
  }

  async #mostPopular() {
    return this.apiClient
      .videos<PopularVideo>({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then(res => {
        return res.data.items.map(item => ({ ...item, id: item.id }))
      })
  }
}

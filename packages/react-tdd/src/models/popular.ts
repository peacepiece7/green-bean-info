export interface PopularVideo {
  kind: string
  etag: string
  items: Item[]
  nextPageToken: string
  pageInfo: PageInfo
}

interface Item {
  kind: string
  etag: string
  id: string
  snippet: Snippet
}

interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  categoryId: string
  liveBroadcastContent: string
  localized: Localized
  defaultAudioLanguage?: string
  tags?: string[]
  defaultLanguage?: string
}

interface Thumbnails {
  default: Default
  medium: Medium
  high: High
  standard?: Standard
  maxres?: Maxres
}

interface Default {
  url: string
  width: number
  height: number
}

interface Medium {
  url: string
  width: number
  height: number
}

interface High {
  url: string
  width: number
  height: number
}

interface Standard {
  url: string
  width: number
  height: number
}

interface Maxres {
  url: string
  width: number
  height: number
}

interface Localized {
  title: string
  description: string
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

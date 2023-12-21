export interface Channel {
  kind: string
  etag: string
  pageInfo: PageInfo
  items: Item[]
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

interface Item {
  kind: string
  etag: string
  id: string
  snippet: Snippet
}

interface Snippet {
  title: string
  description: string
  customUrl: string
  publishedAt: string
  thumbnails: Thumbnails
  localized: Localized
  country: string
}

interface Thumbnails {
  default: Default
  medium: Medium
  high: High
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

interface Localized {
  title: string
  description: string
}

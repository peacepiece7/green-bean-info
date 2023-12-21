import { ReactNode } from 'react'
import Youtube from '@/api/youtube'
import YoutubeClient from '@/api/youtubeClient'
import { YoutubeApiContext } from '@/context/YoutubeApiContext'

const client = new YoutubeClient()
const youtube = new Youtube(client)

interface YoutubeApiProviderProps {
  children: ReactNode
}
export function YoutubeApiProvider({ children }: YoutubeApiProviderProps) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>
}

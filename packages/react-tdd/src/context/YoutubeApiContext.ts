import { createContext, useContext } from 'react'
import Youtube from '@/api/youtube'

// * 테스트시 axios 의존성이 생기지 않도록 Context 따로 분리
export const YoutubeApiContext = createContext({ youtube: {} as Youtube })

export function useYoutubeApi() {
  return useContext(YoutubeApiContext)
}

import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

// HACK : 딱히 중요한 부분이 아니기 때문에 Prarms, Response를 정확하게 작성하진 않습니다.
export interface YoutubeSearchParams {
  params: {
    part: string;
    maxResults: number;
    type: string;
    relatedToVideoId?: string;
    q?: string;
  };
}
export interface YoutubeChennelParams {
  params: {
    part: string; // 'snippet'
    id: string;
    q?: string;
  };
}
export interface YoutubeVideoParams {
  params: {
    part: string; // 'snippet'
    chart?: string; // mostPopular
    maxResults: number;
  };
}

export interface IYoutubeClient {
  search: <T>(params: YoutubeSearchParams) => Promise<AxiosResponse<T>>;
  videos: <T>(params: YoutubeVideoParams) => Promise<AxiosResponse<T>>;
  channels: <T>(params: YoutubeChennelParams) => Promise<AxiosResponse<T>>;
}

export default class YoutubeClient implements IYoutubeClient {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    });
  }

  async search<T>(params: YoutubeSearchParams) {
    const res = this.httpClient.get<T>("search", params);
    return res;
  }

  async videos<T>(params: YoutubeVideoParams) {
    return this.httpClient.get<T>("videos", params);
  }

  async channels<T>(params: YoutubeChennelParams) {
    console.log("params", params);

    return this.httpClient.get<T>("channels", params);
  }
}

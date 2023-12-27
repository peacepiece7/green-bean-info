'use client'
export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  // * 개발, 테스트 환경에서는 localhost:3000 으로 접속합니다!
  // prettier-ignore
  const baseURL = process.env.NODE_ENV === 'development'  || process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : 'https://mywebsite.com'

  return fetch(`${baseURL}${url}`, init).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.json()
  })
}

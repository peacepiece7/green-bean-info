'use client'
export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://mywebsite.com'
  return fetch(`${baseURL}${url}`, init).then((res) => res.json())
}

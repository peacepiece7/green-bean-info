'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 6000,
      retry: 0
    }
  }
})

interface QueryContextProps {
  children: React.ReactNode
}
export default function QueryContext({ children }: QueryContextProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

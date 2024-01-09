'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface QueryContextProps {
  children: React.ReactNode
}
export default function QueryContext({ children }: QueryContextProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        retry: 0
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <div className="my-wallet-prose-text">
          <ReactQueryDevtools initialIsOpen />
        </div>
      )}
    </QueryClientProvider>
  )
}

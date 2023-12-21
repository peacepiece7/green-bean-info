import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { YoutubeApiProvider } from '@/context/youtubeProvider.tsx'
import SearchHeader from '@/components/SearchHeader.tsx'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <SearchHeader />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  )
}

export default App

interface CalendarLayoutProps {
  children: React.ReactNode
  params: {
    year: string
    month: string
    date: string
  }
}

export default function CalendarLayout({ children }: CalendarLayoutProps) {
  return (
    <div
      style={{
        height: '100dvh',
        maxHeight: '100dvh',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  )
}

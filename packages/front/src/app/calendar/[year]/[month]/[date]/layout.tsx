interface CalendarLayoutProps {
  children: React.ReactNode
  params: {
    year: string
    month: string
    date: string
  }
}

export default function CalendarLayout({ children }: CalendarLayoutProps) {
  return children
}

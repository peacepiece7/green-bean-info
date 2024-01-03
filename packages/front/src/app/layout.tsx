import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import AuthContext from '@/context/AuthContext'
import RecoilContext from '@/context/RecoilContext'
import QueryContext from '@/context/QueryContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Wallet',
  description: 'My Wallet is a simple wallet app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="portal" className={inter.className}>
        <StyledComponentsRegistry>
          <AuthContext>
            <QueryContext>
              <RecoilContext>{children}</RecoilContext>
            </QueryContext>
          </AuthContext>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

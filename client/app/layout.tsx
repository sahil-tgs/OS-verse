// app/layout.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { EXIT_MESSAGES } from './constants/exitMessages'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    const isLandingPage = pathname === '/'

    if (!isLandingPage) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        // Only if it's a tab close, not a refresh
        if (!e.currentTarget.performance.navigation.type) {
          const randomMessage = EXIT_MESSAGES[Math.floor(Math.random() * EXIT_MESSAGES.length)]
          // Show browser alert
          alert(randomMessage)
        }
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [pathname])

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
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
        // Get a random exit message
        const randomMessage = EXIT_MESSAGES[Math.floor(Math.random() * EXIT_MESSAGES.length)]
        
        // Standard way to handle beforeunload
        e.preventDefault()
        // Chrome requires returnValue to be set
        e.returnValue = randomMessage
        
        return randomMessage // For older browsers
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
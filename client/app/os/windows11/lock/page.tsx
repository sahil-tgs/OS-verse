// app/os/windows11/lock/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wifi, Battery } from 'lucide-react'
import PageTransition from '@/app/components/transitions/PageTransition'

export default function Windows11Lock() {
  const [time, setTime] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleUnlock()
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(timer)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleUnlock = () => {
    router.push('/os/windows11/login')
  }

  return (
    <PageTransition>
      <div 
        className="relative h-screen w-screen overflow-hidden cursor-default select-none"
        onClick={handleUnlock}
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/windows11-default-login-wall.jpg')",
          }}
        />

        {/* Time and Date */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center text-white">
          <div className="text-8xl font-extralight mb-2">
            {time.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </div>
          <div className="text-2xl font-light">
            {time.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Quick Status */}
        <div className="absolute top-4 right-4 flex items-center gap-4 text-white/80">
          <Wifi className="w-5 h-5" />
          <Battery className="w-5 h-5" />
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-lg">
          Click anywhere to unlock
        </div>
      </div>
    </PageTransition>
  )
}
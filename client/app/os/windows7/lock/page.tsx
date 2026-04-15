'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '@/app/components/transitions/PageTransition'

export default function Windows7Lock() {
  const [time, setTime] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    const handleKeyPress = () => handleUnlock()
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(timer)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleUnlock = () => {
    router.push('/os/windows7/login')
  }

  return (
    <PageTransition>
      <div
        className="relative h-screen w-screen overflow-hidden cursor-default select-none"
        onClick={handleUnlock}
      >
        {/* Windows 7 lock screen - dark blue */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c] via-[#0f2440] to-[#0a1628]" />

        {/* Time and Date */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center text-white">
          <div className="text-8xl font-light mb-2 drop-shadow-lg" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </div>
          <div className="text-xl font-light text-white/80 drop-shadow-md">
            {time.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          Click anywhere or press any key to unlock
        </div>
      </div>
    </PageTransition>
  )
}

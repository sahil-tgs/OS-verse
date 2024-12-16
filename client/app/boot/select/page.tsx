// client/app/boot/select/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const availableOS = [
  {
    id: 'windows11',
    name: 'Windows 11',
    version: '11.0.22H2',
  },
  {
    id: 'windows10',
    name: 'Windows 10',
    version: '10.0.19045',
  },
  {
    id: 'windows8',
    name: 'Windows 8.1',
    version: '6.3.9600',
  },
  {
    id: 'windows7',
    name: 'Windows 7',
    version: '6.1.7601',
  }
]

export default function OSSelector() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [countdown, setCountdown] = useState(4)
  const [userInteracted, setUserInteracted] = useState(false)
  const [shouldBoot, setShouldBoot] = useState<string | null>(null)
  const router = useRouter()

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp':
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
          setUserInteracted(true)
          break
        case 'ArrowDown':
          setSelectedIndex(prev => (prev < availableOS.length - 1 ? prev + 1 : prev))
          setUserInteracted(true)
          break
        case 'Enter':
          setShouldBoot(availableOS[selectedIndex].id)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedIndex])

  // Countdown timer - only runs if user hasn't interacted
  useEffect(() => {
    if (userInteracted) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setShouldBoot(availableOS[0].id)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [userInteracted])

  // Handle boot navigation
  useEffect(() => {
    if (shouldBoot) {
      router.push(`/os/${shouldBoot}`)
    }
  }, [shouldBoot, router])

  // const handleBoot = (osId: string) => {
  //   setShouldBoot(osId)
  // }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white font-mono cursor-none select-none"
    >
      <div className="p-4 pt-20">
        {/* Title */}
        <div className="mb-8 text-gray-400">
          OS-verse Boot Manager
        </div>

        {/* OS List */}
        <div className="space-y-0.5">
          {availableOS.map((os, index) => (
            <div
              key={os.id}
              className={`px-4 py-0.5 font-mono ${
                index === selectedIndex ? 'bg-white text-black' : 'text-gray-300'
              }`}
            >
              {os.name} {index === selectedIndex && '>'} 
              <span className="text-xs ml-2 opacity-75">
                {os.version}
              </span>
            </div>
          ))}
        </div>

        {/* System Options */}
        <div className="mt-6 space-y-0.5 text-gray-400">
          <div>Advanced options</div>
          <div>System setup</div>
        </div>

        {/* Bottom Instructions */}
        <div className="fixed bottom-8 left-0 right-0 text-gray-400">
          {!userInteracted && (
            <div className="text-center">
              Boot in {countdown} sec.
            </div>
          )}
          <div className="text-sm text-center mt-2 text-gray-500">
            Use ↑ and ↓ keys to select. Press ENTER to boot.
          </div>
        </div>
      </div>
    </motion.div>
  )
}
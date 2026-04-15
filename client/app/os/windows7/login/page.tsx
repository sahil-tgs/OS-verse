'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Power, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/app/components/transitions/PageTransition'

export default function Windows7Login() {
  const [isPowerMenuOpen, setPowerMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push('/os/windows7/desktop')
  }

  const handleShutdown = () => {
    router.push('/os/windows7/shutdown')
  }

  const handleRestart = () => {
    router.push('/os/windows7/restart')
  }

  const handleSleep = () => {
    router.push('/os/windows7/lock')
  }

  useEffect(() => {
    const handleClickOutside = () => setPowerMenuOpen(false)
    if (isPowerMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isPowerMenuOpen])

  return (
    <PageTransition>
      <div className="relative h-screen w-screen overflow-hidden cursor-default select-none">
        {/* Windows 7 login background - dark blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c] via-[#0f2440] to-[#0a1628]" />

        {/* Subtle light overlay at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-1/3" />

        {/* User tile - centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {/* User avatar - classic Win7 style */}
          <div className="w-[140px] h-[140px] mx-auto mb-4 rounded-sm border-2 border-white/30 overflow-hidden bg-[#4a8abd] shadow-lg shadow-black/30">
            <svg
              className="w-full h-full text-white/70 p-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z" />
            </svg>
          </div>

          {/* Username */}
          <h1 className="text-white text-xl font-normal mb-6 drop-shadow-md">John Doe</h1>

          {/* Password field or loading */}
          {isLoading ? (
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/80 text-sm"
              >
                Welcome
              </motion.div>
              <div className="mt-4 w-6 h-6 border-2 border-t-white/80 border-white/20 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="Password"
                className="px-3 py-1.5 bg-white/90 border border-white/50 rounded-sm text-black text-sm w-48 outline-none focus:ring-2 focus:ring-[#4a8abd]/50 placeholder:text-gray-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
              />
              <button
                onClick={handleSignIn}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 border border-white/30 rounded-sm text-white text-sm transition-colors"
              >
                &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/30 backdrop-blur-sm flex items-center justify-between px-6">
          {/* Ease of Access */}
          <button className="text-white/60 hover:text-white/90 text-sm transition-colors">
            Ease of access
          </button>

          {/* Power button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPowerMenuOpen(!isPowerMenuOpen)
              }}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Power className="w-4 h-4" />
              <span className="text-sm">Shut down</span>
              <span className="text-xs border-l border-white/30 pl-2 ml-1">&#9660;</span>
            </button>

            <AnimatePresence>
              {isPowerMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-10 right-0 bg-[#1a3a5c]/95 backdrop-blur border border-white/20 rounded-sm overflow-hidden w-44 shadow-xl"
                >
                  <button
                    onClick={handleSleep}
                    className="w-full flex items-center px-4 py-2 text-white/80 hover:bg-white/10 gap-3 text-sm"
                  >
                    <Moon size={14} />
                    Sleep
                  </button>
                  <button
                    onClick={handleShutdown}
                    className="w-full flex items-center px-4 py-2 text-white/80 hover:bg-white/10 gap-3 text-sm"
                  >
                    <Power size={14} />
                    Shut down
                  </button>
                  <button
                    onClick={handleRestart}
                    className="w-full flex items-center px-4 py-2 text-white/80 hover:bg-white/10 gap-3 text-sm"
                  >
                    <Power size={14} className="rotate-45" />
                    Restart
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

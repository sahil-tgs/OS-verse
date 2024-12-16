'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Monitor, Wifi, Power, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/app/components/transitions/PageTransition'

export default function Windows11Login() {
  const [isPowerMenuOpen, setPowerMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push('/os/windows11/desktop')
  }

  const handleShutdown = () => {
    router.push('/os/windows11/shutdown')
  }

  const handleRestart = () => {
    router.push('/os/windows11/restart')
  }

  const handleSleep = () => {
    router.push('/os/windows11/lock')
  }

  // Close power menu when clicking outside
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
        {/* Background Wallpaper */}
        <div 
          className="absolute inset-0 bg-[url('/windows11-default-login-wall.jpg')] bg-cover bg-center bg-no-repeat"
          role="img"
          aria-label="Windows 11 login background"
        />

        {/* User Profile and Sign In */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {/* User Avatar */}
          <div 
            className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center"
            role="img"
            aria-label="User avatar"
          >
            <svg 
              className="w-20 h-20 text-gray-600" 
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z" />
            </svg>
          </div>
          
          {/* Username */}
          <h1 className="text-white text-2xl mb-4">John Doe</h1>

          {/* Sign In Button or Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center" role="status" aria-label="Signing in">
              <div className="w-8 h-8 border-2 border-t-white/80 border-white/20 rounded-full animate-spin mb-2" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/80 text-sm"
              >
                Welcome
              </motion.div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-8 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-sm transition-colors cursor-pointer"
              aria-label="Sign in"
            >
              Sign in
            </button>
          )}
        </div>

        {/* Bottom System Icons */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <button 
            className="p-2 rounded-sm transition-colors cursor-pointer hover:bg-white/10"
            aria-label="Display settings"
          >
            <Monitor className="w-5 h-5 text-white/80 hover:text-white" aria-hidden="true" />
          </button>
          <button 
            className="p-2 rounded-sm transition-colors cursor-pointer hover:bg-white/10"
            aria-label="Network settings"
          >
            <Wifi className="w-5 h-5 text-white/80 hover:text-white" aria-hidden="true" />
          </button>
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setPowerMenuOpen(!isPowerMenuOpen)
              }}
              className="p-2 rounded-sm transition-colors cursor-pointer hover:bg-white/10"
              aria-label="Power options"
              aria-controls="power-menu"
              aria-expanded={isPowerMenuOpen}
              aria-haspopup="menu"
            >
              <Power className="w-5 h-5 text-white/80 hover:text-white" aria-hidden="true" />
            </button>
            
            {/* Power Menu Dropdown */}
            <AnimatePresence>
              {isPowerMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-12 right-0 bg-black/70 backdrop-blur-lg rounded-md overflow-hidden w-48"
                  role="menu"
                  id="power-menu"
                  aria-label="Power options menu"
                >
                  <div className="py-1">
                    <button
                      onClick={handleSleep}
                      className="w-full flex items-center px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white gap-3"
                      role="menuitem"
                    >
                      <Moon size={16} aria-hidden="true" />
                      Sleep
                    </button>
                    <button
                      onClick={handleShutdown}
                      className="w-full flex items-center px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white gap-3"
                      role="menuitem"
                    >
                      <Power size={16} aria-hidden="true" />
                      Shut down
                    </button>
                    <button
                      onClick={handleRestart}
                      className="w-full flex items-center px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white gap-3"
                      role="menuitem"
                    >
                      <Power size={16} className="rotate-45" aria-hidden="true" />
                      Restart
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
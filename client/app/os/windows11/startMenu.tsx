'use client'

import { useState } from 'react'
import { Search, Power, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

const ICONS = {
  MAIL: "https://img.icons8.com/fluency/48/mail--v1.png",
  STORE: "https://img.icons8.com/fluency/48/microsoft-store.png",
  PHOTOS: "https://img.icons8.com/fluency/48/photos.png",
  SETTINGS: "https://img.icons8.com/fluency/48/settings.png"
}

const pinnedApps = [
  { name: 'Mail', icon: ICONS.MAIL },
  { name: 'Microsoft Store', icon: ICONS.STORE },
  { name: 'Photos', icon: ICONS.PHOTOS },
  { name: 'Settings', icon: ICONS.SETTINGS }
]

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const [isPowerMenuOpen, setPowerMenuOpen] = useState(false)
  const router = useRouter()

  const handleShutdown = () => {
    onClose() // Close start menu first
    router.push('/os/windows11/shutdown')
  }

  const handleRestart = () => {
    onClose() // Close start menu first
    router.push('/os/windows11/restart')
  }

  const handleSleep = () => {
    onClose() // Close start menu first
    router.push('/os/windows11/lock')
  }

  if (!isOpen) return null

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[600px] h-[650px] bg-white/80 backdrop-blur-2xl rounded-xl shadow-2xl z-50 overflow-hidden border border-white/20">
      <div className="p-6">
        {/* Search Bar */}
        <div className="flex items-center bg-black/5 hover:bg-black/10 rounded-md p-3 mb-6 border border-black/5">
          <Search className="w-5 h-5 text-black/50 mr-2" />
          <input 
            type="text" 
            placeholder="Type here to search"
            className="bg-transparent outline-none flex-1 text-black/70 placeholder:text-black/50"
          />
        </div>

        {/* Pinned Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-black/70 font-medium">Pinned</span>
            <button className="px-2 py-1 text-sm text-black/70 hover:bg-black/5 rounded transition-colors">
              All apps &gt;
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {pinnedApps.map((app) => (
              <div 
                key={app.name} 
                className="flex flex-col items-center p-2 hover:bg-black/5 rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-8 h-8 mb-1"
                />
                <span className="text-xs text-black/70">{app.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-black/70 font-medium">Recommended</span>
            <button className="px-2 py-1 text-sm text-black/70 hover:bg-black/5 rounded transition-colors">
              More &gt;
            </button>
          </div>
          <div className="h-[200px]" /> {/* Empty space for recommended items */}
        </div>
      </div>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-sm border-t border-white/20 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
          <span className="text-sm text-black/70">John Doe</span>
          <div className="relative ml-auto">
            <button 
              onClick={() => setPowerMenuOpen(!isPowerMenuOpen)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <Power className="w-4 h-4 text-black/70" />
            </button>

            {/* Power Menu Dropdown */}
            <AnimatePresence>
              {isPowerMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-12 right-0 bg-white/90 backdrop-blur-lg rounded-md overflow-hidden w-48 shadow-lg border border-black/5"
                >
                  <div className="py-1">
                    <button
                      onClick={handleSleep}
                      className="w-full flex items-center px-4 py-2 text-black/70 hover:bg-black/5 gap-3"
                    >
                      <Moon size={16} />
                      Sleep
                    </button>
                    <button
                      onClick={handleShutdown}
                      className="w-full flex items-center px-4 py-2 text-black/70 hover:bg-black/5 gap-3"
                    >
                      <Power size={16} />
                      Shut down
                    </button>
                    <button
                      onClick={handleRestart}
                      className="w-full flex items-center px-4 py-2 text-black/70 hover:bg-black/5 gap-3"
                    >
                      <Power size={16} className="rotate-45" />
                      Restart
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
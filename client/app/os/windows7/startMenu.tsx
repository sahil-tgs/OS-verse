'use client'

import { useState } from 'react'
import { Power, Moon, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

const pinnedApps = [
  { name: 'Internet Explorer', icon: '🌐' },
  { name: 'Windows Media Player', icon: '🎵' },
  { name: 'Calculator', icon: '🔢' },
  { name: 'Notepad', icon: '📝' },
  { name: 'Paint', icon: '🎨' },
  { name: 'Snipping Tool', icon: '✂️' },
]

const rightMenuItems = [
  'Documents',
  'Pictures',
  'Music',
  'Computer',
  'Control Panel',
  'Devices and Printers',
  'Default Programs',
  'Help and Support',
]

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const [isPowerMenuOpen, setPowerMenuOpen] = useState(false)
  const router = useRouter()

  const handleShutdown = () => {
    onClose()
    router.push('/os/windows7/shutdown')
  }

  const handleRestart = () => {
    onClose()
    router.push('/os/windows7/restart')
  }

  const handleSleep = () => {
    onClose()
    router.push('/os/windows7/lock')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.15 }}
        className="absolute bottom-[40px] left-0 z-50"
        style={{ fontFamily: 'Segoe UI, sans-serif' }}
      >
        <div className="w-[410px] bg-gradient-to-b from-[#dce8f5]/95 to-[#c0d0e4]/95 backdrop-blur-md rounded-t-lg border border-white/40 shadow-2xl overflow-hidden">
          {/* User section at top */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#3a7abf]/20 to-transparent">
            <div className="w-[48px] h-[48px] rounded-sm border-2 border-white/50 overflow-hidden bg-[#4a8abd] flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z" />
              </svg>
            </div>
            <span className="text-[#1a3a5c] font-semibold text-sm drop-shadow-sm">John Doe</span>
          </div>

          {/* Main content - two panels */}
          <div className="flex">
            {/* Left panel - Programs */}
            <div className="w-[220px] bg-white/80 border-r border-[#b0c0d0]/50">
              <div className="py-1">
                {pinnedApps.map((app) => (
                  <div
                    key={app.name}
                    className="flex items-center gap-3 px-4 py-1.5 hover:bg-[#3399ff] hover:text-white text-[13px] text-black/80 cursor-default transition-colors"
                  >
                    <span className="text-base">{app.icon}</span>
                    <span>{app.name}</span>
                  </div>
                ))}

                <div className="mx-3 my-1 border-t border-gray-300" />

                <div className="px-4 py-1.5 text-[13px] text-black/60 hover:bg-[#3399ff] hover:text-white cursor-default">
                  All Programs &rsaquo;
                </div>
              </div>

              {/* Search bar */}
              <div className="px-3 py-2 border-t border-[#b0c0d0]/50">
                <div className="flex items-center bg-white border border-[#a0b0c0] rounded-sm px-2 py-1">
                  <input
                    type="text"
                    placeholder="Search programs and files"
                    className="bg-transparent outline-none flex-1 text-[12px] text-black/70 placeholder:text-black/40"
                  />
                  <Search className="w-3.5 h-3.5 text-black/40" />
                </div>
              </div>
            </div>

            {/* Right panel - System links */}
            <div className="w-[190px] bg-[#d3e1f0]/90 py-1">
              {rightMenuItems.map((item) => (
                <div
                  key={item}
                  className="px-4 py-1.5 text-[13px] text-[#1a3a5c] hover:bg-[#3399ff] hover:text-white cursor-default transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar - Shutdown */}
          <div className="flex items-center justify-end bg-gradient-to-r from-[#c0d0e4]/90 to-[#a8bcd4]/90 border-t border-white/30 px-3 py-1.5">
            <div className="relative flex items-center">
              <button
                onClick={handleShutdown}
                className="flex items-center gap-2 bg-gradient-to-b from-[#e8e8e8] to-[#c8c8c8] hover:from-[#f0f0f0] hover:to-[#d8d8d8] border border-[#888] rounded-l-sm px-4 py-1 text-[13px] text-black/80 shadow-sm transition-colors"
              >
                Shut down
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPowerMenuOpen(!isPowerMenuOpen)
                }}
                className="bg-gradient-to-b from-[#e8e8e8] to-[#c8c8c8] hover:from-[#f0f0f0] hover:to-[#d8d8d8] border border-l-0 border-[#888] rounded-r-sm px-1.5 py-1 text-[11px] text-black/60 shadow-sm transition-colors"
              >
                &#9660;
              </button>

              <AnimatePresence>
                {isPowerMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-8 right-0 bg-[#f0f0f0] border border-[#868686] shadow-lg rounded-sm overflow-hidden w-40"
                  >
                    <button
                      onClick={handleSleep}
                      className="w-full flex items-center px-4 py-1.5 text-[13px] text-black/80 hover:bg-[#3399ff] hover:text-white gap-2"
                    >
                      <Moon size={13} />
                      Sleep
                    </button>
                    <button
                      onClick={handleShutdown}
                      className="w-full flex items-center px-4 py-1.5 text-[13px] text-black/80 hover:bg-[#3399ff] hover:text-white gap-2"
                    >
                      <Power size={13} />
                      Shut down
                    </button>
                    <button
                      onClick={handleRestart}
                      className="w-full flex items-center px-4 py-1.5 text-[13px] text-black/80 hover:bg-[#3399ff] hover:text-white gap-2"
                    >
                      <Power size={13} className="rotate-45" />
                      Restart
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

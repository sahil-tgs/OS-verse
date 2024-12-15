// app/os/windows11/desktop/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, Wifi, Volume2, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'
import StartMenu from '../startMenu'
import ContextMenu from '../ContextMenu'

// First, configure these as constants at the top of the file
const ICONS = {
  THIS_PC: "https://img.icons8.com/fluency/48/monitor--v1.png",
  RECYCLE_BIN: "https://img.icons8.com/fluency/48/bin-windows.png",
  EDGE: "https://img.icons8.com/fluency/48/ms-edge-new.png",
}

export default function Windows11Desktop() {
  const [time, setTime] = useState(new Date())
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      
      // Calculate position, ensuring menu stays within viewport
      const x = Math.min(e.clientX, window.innerWidth - 160)
      const y = Math.min(e.clientY, window.innerHeight - 200)
      
      setContextMenu({ x, y })
    }

    const handleClick = () => {
      setContextMenu(null)
    }

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const handleStartClick = () => {
    setStartMenuOpen(!startMenuOpen)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 150)
  }

  const iconAnimation = {
    initial: { opacity: 1 },
    refreshing: { opacity: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative h-screen w-screen overflow-hidden"
    >
      {/* Wallpaper */}
      <div className="absolute inset-0">
        <Image
          src="/windows-11-default-desktop-wallpaer.jpg"
          alt="Windows 11 Desktop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* Desktop Icons */}
      <motion.div 
        className="grid grid-cols-1 gap-6 p-4 relative z-10"
        animate={isRefreshing ? "refreshing" : "initial"}
        variants={iconAnimation}
        transition={{ duration: 0.3 }}
      >
        {/* This PC */}
        <div className="w-20 text-center group cursor-pointer select-none">
          <div className="flex flex-col items-center p-2 rounded-sm hover:bg-white/10 transition-colors">
            <img
              src={ICONS.THIS_PC}
              alt="This PC"
              className="w-10 h-10 mb-1"
            />
            <span className="text-white text-sm mt-1 drop-shadow-md">This PC</span>
          </div>
        </div>

        {/* Recycle Bin */}
        <div className="w-20 text-center group cursor-pointer select-none">
          <div className="flex flex-col items-center p-2 rounded-sm hover:bg-white/10 transition-colors">
            <img
              src={ICONS.RECYCLE_BIN}
              alt="Recycle Bin"
              className="w-10 h-10 mb-1"
            />
            <span className="text-white text-sm mt-1 drop-shadow-md">Recycle Bin</span>
          </div>
        </div>

        {/* Edge */}
        <div className="w-20 text-center group cursor-pointer select-none">
          <div className="flex flex-col items-center p-2 rounded-sm hover:bg-white/10 transition-colors">
            <img
              src={ICONS.EDGE}
              alt="Microsoft Edge"
              className="w-10 h-10 mb-1"
            />
            <span className="text-white text-sm mt-1 drop-shadow-md">Edge</span>
          </div>
        </div>
      </motion.div>

      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen} 
        onClose={() => setStartMenuOpen(false)}
      />

      {/* Context Menu */}
      <ContextMenu 
        position={contextMenu}
        onClose={() => setContextMenu(null)}
        onRefresh={handleRefresh}
      />

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/70 backdrop-blur-lg flex items-center justify-center px-3 z-40">
        {/* Center Icons */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleStartClick}
            className="p-2 hover:bg-white/10 rounded-sm transition-colors"
          >
            <Image
              src="/windows-11-logo.svg"
              alt="Start"
              width={24}
              height={24}
              priority
            />
          </button>

          <button className="p-2 hover:bg-white/10 rounded-sm transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>

          <button className="p-2 hover:bg-white/10 rounded-sm transition-colors">
            <img
              src={ICONS.EDGE}
              alt="Edge"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* System Tray */}
        <div className="absolute right-0 flex items-center h-full">
          <button className="p-2 hover:bg-white/10 rounded-sm transition-colors">
            <ChevronUp className="w-4 h-4 text-white" />
          </button>

          <div className="flex items-center space-x-1 px-2">
            <Wifi className="w-4 h-4 text-white" />
            <Volume2 className="w-4 h-4 text-white" />
          </div>

          <div className="flex items-center text-white text-sm">
            <div className="px-3 py-2 hover:bg-white/10 rounded-sm transition-colors">
              ENG
            </div>
            <div className="px-3 py-2 hover:bg-white/10 rounded-sm transition-colors">
              {time.toLocaleTimeString('en-US', { 
                hour: '2-digit',
                minute: '2-digit',
                hour12: true 
              })}
            </div>
          </div>

          {/* Show Desktop Button */}
          <div className="w-px h-6 mx-2 bg-white/20" />
          <button className="w-2 hover:bg-white/10 h-full transition-colors" />
        </div>
      </div>
    </motion.div>
  )
}
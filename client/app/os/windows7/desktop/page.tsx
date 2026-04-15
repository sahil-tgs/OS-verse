'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Wifi, Volume2 } from 'lucide-react'
import { motion } from 'framer-motion'
import StartMenu from '../startMenu'
import ContextMenu from '../ContextMenu'

const ICONS = {
  THIS_PC: 'https://img.icons8.com/color/48/monitor--v1.png',
  RECYCLE_BIN: 'https://img.icons8.com/color/48/bin-windows.png',
  IE: 'https://img.icons8.com/color/48/internet-explorer.png',
}

export default function Windows7Desktop() {
  const [time, setTime] = useState(new Date())
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      const x = Math.min(e.clientX, window.innerWidth - 230)
      const y = Math.min(e.clientY, window.innerHeight - 300)
      setContextMenu({ x, y })
    }

    const handleClick = () => setContextMenu(null)

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
    setTimeout(() => setIsRefreshing(false), 150)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="relative h-screen w-screen overflow-hidden"
    >
      {/* Windows 7 Wallpaper */}
      <div className="absolute inset-0">
        <Image
          src="/windows-7-desktop-wallpaper.jpg"
          alt="Windows 7 Desktop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* Desktop Icons */}
      <motion.div
        className="grid grid-cols-1 gap-2 p-3 relative z-10"
        animate={{ opacity: isRefreshing ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        {/* Computer */}
        <div className="w-[76px] text-center group cursor-pointer select-none">
          <div className="flex flex-col items-center p-1.5 rounded-sm hover:bg-white/15 hover:border hover:border-white/25 transition-colors border border-transparent">
            <Image src={ICONS.THIS_PC} alt="Computer" width={40} height={40} className="mb-0.5" />
            <span className="text-white text-[11px] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Computer</span>
          </div>
        </div>

        {/* Recycle Bin */}
        <div className="w-[76px] text-center group cursor-pointer select-none">
          <div className="flex flex-col items-center p-1.5 rounded-sm hover:bg-white/15 hover:border hover:border-white/25 transition-colors border border-transparent">
            <Image src={ICONS.RECYCLE_BIN} alt="Recycle Bin" width={40} height={40} className="mb-0.5" />
            <span className="text-white text-[11px] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Recycle Bin</span>
          </div>
        </div>

        {/* Internet Explorer */}
        <div className="w-[76px] text-center group cursor-pointer select-none">
          <div className="flex flex-col items-center p-1.5 rounded-sm hover:bg-white/15 hover:border hover:border-white/25 transition-colors border border-transparent">
            <Image src={ICONS.IE} alt="Internet Explorer" width={40} height={40} className="mb-0.5" />
            <span className="text-white text-[11px] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Internet Explorer</span>
          </div>
        </div>
      </motion.div>

      {/* Start Menu */}
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />

      {/* Context Menu */}
      <ContextMenu position={contextMenu} onClose={() => setContextMenu(null)} onRefresh={handleRefresh} />

      {/* Windows 7 Aero Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40px] flex items-center z-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(60, 120, 180, 0.85), rgba(30, 80, 140, 0.9))',
          borderTop: '1px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Start Button */}
        <button
          onClick={handleStartClick}
          className="relative -mt-2 ml-0 w-[50px] h-[50px] flex items-center justify-center rounded-full z-50 hover:brightness-110 transition-all"
          style={{
            background: 'radial-gradient(circle at 50% 30%, #6cb5f5, #2a6cb8 60%, #1a4a8a)',
            border: '2px solid rgba(255,255,255,0.4)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
          }}
        >
          <Image src="/windows-7-logo.svg" alt="Start" width={22} height={22} priority />
        </button>

        {/* Taskbar items area */}
        <div className="flex-1" />

        {/* System Tray */}
        <div className="flex items-center h-full">
          <button className="px-1 h-full hover:bg-white/10 transition-colors">
            <span className="text-white/80 text-[10px]">&#9650;</span>
          </button>

          <div className="flex items-center gap-1.5 px-2 h-full border-l border-white/15">
            <Wifi className="w-4 h-4 text-white/80" />
            <Volume2 className="w-4 h-4 text-white/80" />
          </div>

          <div className="flex items-center h-full px-2 border-l border-white/15 hover:bg-white/10 transition-colors cursor-default">
            <div className="text-white text-[11px] text-right leading-tight">
              <div>
                {time.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </div>
              <div className="text-white/70 text-[10px]">
                {time.toLocaleDateString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Show Desktop */}
          <div className="w-[10px] h-full border-l border-white/20 hover:bg-white/15 transition-colors cursor-pointer" />
        </div>
      </div>
    </motion.div>
  )
}

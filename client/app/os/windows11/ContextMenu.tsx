'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Grid, 
  ArrowDownUp, 
  RotateCcw, 
  History, 
  Plus, 
  Monitor, 
  Palette,
  Terminal,
  MoreHorizontal,
} from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface ContextMenuProps {
  position: Position | null
  onClose: () => void
  onRefresh: () => void
}

interface MenuItem {
  icon: React.ReactNode
  label: string
  shortcut?: string
  hasSubmenu?: boolean
  onClick?: () => void
}

export default function ContextMenu({ position, onClose, onRefresh }: ContextMenuProps) {
  const [mounted, setMounted] = useState(false)

  const menuItems: MenuItem[] = [
    { icon: <Grid size={16} />, label: 'View', hasSubmenu: true },
    { icon: <ArrowDownUp size={16} />, label: 'Sort by', hasSubmenu: true },
    { 
      icon: <RotateCcw size={16} />, 
      label: 'Refresh',
      onClick: () => {
        onRefresh()
        onClose()
      }
    },
    { icon: <History size={16} />, label: 'Undo Rename', shortcut: 'Ctrl+Z' },
    { icon: <Plus size={16} />, label: 'New', hasSubmenu: true },
    { icon: <Monitor size={16} />, label: 'Display settings' },
    { icon: <Palette size={16} />, label: 'Personalize' },
    { icon: <Terminal size={16} />, label: 'Open in Terminal' },
    { icon: <MoreHorizontal size={16} />, label: 'Show more options', shortcut: 'Shift+F10' },
  ]

  useEffect(() => {
    setMounted(true)
    
    const handleClick = () => onClose()
    window.addEventListener('click', handleClick)
    
    return () => window.removeEventListener('click', handleClick)
  }, [onClose])

  if (!mounted || !position) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="fixed z-50"
        style={{
          top: position.y,
          left: position.x,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/20 py-2 w-64">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="px-3 py-1.5 hover:bg-black/5 flex items-center justify-between cursor-default"
              onClick={item.onClick}
            >
              <div className="flex items-center gap-3">
                <div className="text-black/70">
                  {item.icon}
                </div>
                <span className="text-sm text-black/70">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {item.shortcut && (
                  <span className="text-xs text-black/50">
                    {item.shortcut}
                  </span>
                )}
                {item.hasSubmenu && (
                  <span className="text-black/50">›</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
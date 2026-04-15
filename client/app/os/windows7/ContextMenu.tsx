'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  label: string
  shortcut?: string
  hasSubmenu?: boolean
  onClick?: () => void
  divider?: boolean
}

export default function ContextMenu({ position, onClose, onRefresh }: ContextMenuProps) {
  const [mounted, setMounted] = useState(false)

  const menuItems: MenuItem[] = [
    { label: 'View', hasSubmenu: true },
    { label: 'Sort by', hasSubmenu: true },
    {
      label: 'Refresh',
      onClick: () => {
        onRefresh()
        onClose()
      },
    },
    { label: '', divider: true },
    { label: 'Paste', shortcut: 'Ctrl+V' },
    { label: 'Paste shortcut' },
    { label: 'Undo Rename', shortcut: 'Ctrl+Z' },
    { label: '', divider: true },
    { label: 'Screen resolution' },
    { label: 'Gadgets' },
    { label: 'Personalize' },
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.08 }}
        className="fixed z-50"
        style={{ top: position.y, left: position.x }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#f0f0f0] border border-[#868686] shadow-md py-0.5 w-56" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
          {menuItems.map((item, index) =>
            item.divider ? (
              <div key={index} className="mx-1 my-0.5 border-t border-[#d0d0d0]" />
            ) : (
              <div
                key={item.label}
                className="px-6 py-1 hover:bg-[#3399ff] hover:text-white text-[13px] text-black/80 cursor-default flex justify-between items-center group"
                onClick={item.onClick}
              >
                <span>{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.shortcut && (
                    <span className="text-[11px] text-black/40 group-hover:text-white/70">
                      {item.shortcut}
                    </span>
                  )}
                  {item.hasSubmenu && (
                    <span className="text-black/50 group-hover:text-white/70 text-xs">&rsaquo;</span>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

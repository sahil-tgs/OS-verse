// app/components/transitions/LockTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LockTransitionProps {
  children: React.ReactNode
  className?: string
}

export default function LockTransition({ children, className = '' }: LockTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{
          type: "tween",
          ease: [0.32, 0, 0.67, 0], // Custom easing for smoother motion
          duration: 0.4
        }}
        className={`${className} relative`}
        style={{ 
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
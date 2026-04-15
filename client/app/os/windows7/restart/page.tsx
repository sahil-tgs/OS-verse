'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Windows7Restart() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/boot/sequence')
    }, 4000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-8 h-8 border-2 border-t-[#4a8abd] border-[#4a8abd]/20 rounded-full animate-spin" />
        <div className="text-white/80 text-lg tracking-wide">
          Restarting...
        </div>
      </motion.div>
    </div>
  )
}

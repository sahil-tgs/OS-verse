'use client'

import { motion } from 'framer-motion'
import { Power, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleBoot = () => {
    router.push('/boot/sequence')  // Changed this path
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-zinc-900 text-white flex items-center justify-center"
    >
      <div className="bg-black/50 p-8 rounded-lg backdrop-blur-sm border border-white/10">
        <h1 className="text-2xl font-light mb-8 text-center">Virtual System Control</h1>
        
        <div className="space-y-4">
          <button
            onClick={handleBoot}
            className="w-full flex items-center justify-center gap-3 bg-green-600/20 hover:bg-green-600/30 text-green-500 p-3 rounded-md transition-colors"
          >
            <Power size={20} />
            Boot System
          </button>

          <button
            className="w-full flex items-center justify-center gap-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-500 p-3 rounded-md transition-colors"
          >
            <Settings size={20} />
            System Settings
          </button>
        </div>

        <div className="mt-8 text-sm text-center text-white/50">
          OS-verse Virtual System
        </div>
      </div>
    </motion.div>
  )
}
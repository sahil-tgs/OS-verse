// client/app/os/windows11/page.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Windows11Boot() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/os/windows11/login')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-screen w-screen"
    >
      <div className="h-full w-full bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-16">
          {/* Windows Logo */}
          <Image
            src="/windows-11-logo.svg"
            alt="Windows 11"
            width={100}
            height={100}
            priority
            className="text-[#0078d4]" // Windows blue color
          />
          
          {/* Loading Circle */}
          <div className="w-8 h-8 border-2 border-t-white/80 border-white/20 rounded-full animate-spin" />
        </div>
      </div>
    </motion.div>
  )
}
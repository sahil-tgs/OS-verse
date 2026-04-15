'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Windows7Boot() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/os/windows7/login')
    }, 6000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="h-screen w-screen bg-black flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-12">
        {/* Windows 7 Logo */}
        <Image
          src="/windows-7-logo.svg"
          alt="Windows 7"
          width={80}
          height={80}
          priority
        />

        {/* Windows 7 animated loading dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/80"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <p className="text-white/60 text-sm tracking-widest">
          Starting Windows
        </p>
      </div>
    </motion.div>
  )
}

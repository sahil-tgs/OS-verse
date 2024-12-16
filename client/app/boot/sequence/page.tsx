'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BootMessage } from '@/app/lib/types'

const bootMessages: BootMessage[] = [
  { id: 1, text: "[ OK ] Started System Initialization", type: 'success', delay: 100 },
  { id: 2, text: "[ OK ] Started File System Check", type: 'success', delay: 300 },
  { id: 3, text: "[ OK ] Started User Interface Manager", type: 'success', delay: 200 },
  { id: 4, text: "[ OK ] Reached System Boot Target", type: 'success', delay: 400 },
  { id: 5, text: "Loading OS-verse...", type: 'info', delay: 500 }
]

export default function BootSequence() {
  const [displayedMessages, setDisplayedMessages] = useState<BootMessage[]>([])
  const router = useRouter()

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    let currentDelay = 0

    bootMessages.forEach((message, index) => {
      const timeout = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, message])
        
        // If this is the last message, wait a bit then navigate to OS selector
        if (index === bootMessages.length - 1) {
          setTimeout(() => {
            router.push('/boot/select')
          }, 1000)
        }
      }, currentDelay)
      
      timeouts.push(timeout)
      currentDelay += message.delay
    })

    // Cleanup timeouts on unmount
    return () => timeouts.forEach(timeout => clearTimeout(timeout))
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="font-mono text-sm space-y-1 p-4">
        {displayedMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`
              ${msg.type === 'success' ? 'text-green-500' : ''}
              ${msg.type === 'info' ? 'text-blue-500' : ''}
              ${msg.type === 'warning' ? 'text-yellow-500' : ''}
              ${msg.type === 'error' ? 'text-red-500' : ''}
            `}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  )
}
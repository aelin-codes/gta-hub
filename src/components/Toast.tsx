'use client'

import { useEffect } from 'react'

export interface ToastProps {
  text: string
  onClose: () => void
}

export default function Toast({ text, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex items-center bg-deep-teal border border-palm-teal text-off-white px-5 py-3 rounded-2xl shadow-2xl animate-fade-in-up"
      role="status"
      aria-live="polite"
    >
      <span className="text-xs font-mono font-bold uppercase tracking-wider">{text}</span>
    </div>
  )
}

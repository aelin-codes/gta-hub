'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="flex-grow flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

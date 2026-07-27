'use client'

import { useEffect, useRef, useState } from 'react'

export default function Header({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // mount once — ref keeps lastScrollY stable

  return (
    <header
      className={`sticky top-0 z-50 bg-midnight-teal/85 backdrop-blur-md border-b border-deep-teal transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {children}
    </header>
  )
}

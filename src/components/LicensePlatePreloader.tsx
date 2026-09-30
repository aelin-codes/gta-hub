'use client'

import { useEffect, useState } from 'react'

export default function LicensePlatePreloader() {
  const [visible, setVisible] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)

  useEffect(() => {
    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Show only once per browser session
    try {
      const hasShown = sessionStorage.getItem('gta_preloader_shown')
      if (hasShown) return
      sessionStorage.setItem('gta_preloader_shown', 'true')
    } catch {
      // If sessionStorage is restricted, skip
      return
    }

    setVisible(true)

    // Trigger animate-out after 750ms
    const timerOut = setTimeout(() => {
      setAnimatingOut(true)
    }, 750)

    // Fully unmount after 1100ms
    const timerDone = setTimeout(() => {
      setVisible(false)
    }, 1100)

    return () => {
      clearTimeout(timerOut)
      clearTimeout(timerDone)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-label="Loading Grand Theft Auto VI Hub"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-midnight-teal/95 backdrop-blur-md transition-opacity duration-300 pointer-events-none select-none ${
        animatingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Embossed Leonida License Plate */}
        <div className="relative w-72 sm:w-80 h-36 sm:h-40 rounded-2xl bg-gradient-to-b from-stone-100 to-stone-200 border-4 border-stone-400/80 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(255,61,129,0.3)] p-3 flex flex-col justify-between overflow-hidden transform animate-in fade-in zoom-in-95 duration-500">
          {/* Bolt holes */}
          <span className="absolute top-2 left-3 w-2.5 h-2.5 rounded-full bg-stone-700/60 border border-stone-300 shadow-inner" />
          <span className="absolute top-2 right-3 w-2.5 h-2.5 rounded-full bg-stone-700/60 border border-stone-300 shadow-inner" />
          <span className="absolute bottom-2 left-3 w-2.5 h-2.5 rounded-full bg-stone-700/60 border border-stone-300 shadow-inner" />
          <span className="absolute bottom-2 right-3 w-2.5 h-2.5 rounded-full bg-stone-700/60 border border-stone-300 shadow-inner" />

          {/* Top State Header */}
          <div className="text-center pt-0.5">
            <span className="text-xs sm:text-sm font-black font-sans tracking-[0.3em] uppercase text-emerald-800 drop-shadow-sm">
              LEONIDA
            </span>
          </div>

          {/* Stamped Plate Digits */}
          <div className="text-center my-auto flex items-center justify-center gap-2">
            <span className="text-4xl sm:text-5xl font-display font-black tracking-widest text-emerald-950 drop-shadow-[0_2px_1px_rgba(255,255,255,0.8)] filter">
              VIC3 C1TY
            </span>
          </div>

          {/* Bottom Decal & County */}
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-600 px-2 pb-0.5">
            <span className="px-1.5 py-0.5 rounded bg-sunset-orange/20 text-sunset-orange border border-sunset-orange/40 text-[9px]">
              2026
            </span>
            <span className="tracking-wider uppercase text-emerald-900/80">
              VICE-DALE
            </span>
            <span className="px-1.5 py-0.5 rounded bg-neon-flamingo/20 text-neon-flamingo border border-neon-flamingo/40 text-[9px]">
              HUB
            </span>
          </div>
        </div>

        {/* Pulse loading indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-off-white/70">
          <span className="w-2 h-2 rounded-full bg-neon-flamingo animate-ping" />
          <span>INITIALIZING VICE CITY SATELLITE RADAR...</span>
        </div>
      </div>
    </div>
  )
}

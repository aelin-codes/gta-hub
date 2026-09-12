'use client'

import { useEffect, useState } from 'react'
import { soundFx } from './GtaSoundEffects'

export default function ScrollProgressSpeedometer() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [speedMph, setSpeedMph] = useState(35)
  const [turbo, setTurbo] = useState(false)

  useEffect(() => {
    let lastY = 0
    let lastTime = Date.now()

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      setScrollPercent(percent)

      // Calculate scrolling speed for dynamic MPH
      const now = Date.now()
      const deltaY = Math.abs(scrollTop - lastY)
      const deltaTime = Math.max(1, now - lastTime)
      const calculatedSpeed = Math.min(195, Math.floor(35 + (deltaY / deltaTime) * 120))

      setSpeedMph(calculatedSpeed)
      lastY = scrollTop
      lastTime = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const triggerTurbo = () => {
    soundFx.playCash()
    setTurbo(true)
    setSpeedMph(240)
    setTimeout(() => {
      setTurbo(false)
      setSpeedMph(55)
    }, 1200)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] pointer-events-none">
      {/* Top Neon Track */}
      <div className="h-1.5 w-full bg-midnight-teal/80 backdrop-blur-sm relative overflow-visible border-b border-deep-teal/40">
        <div
          className={`h-full bg-gradient-to-r from-palm-teal via-sunset-orange to-neon-flamingo transition-all duration-75 ${
            turbo ? 'shadow-[0_0_20px_#ff3d81]' : 'shadow-[0_0_10px_#ff7a45]'
          }`}
          style={{ width: `${scrollPercent}%` }}
        />

        {/* Speeding Car Icon tracking scroll position */}
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-transform duration-75 flex items-center"
          style={{
            left: `calc(${Math.min(97, Math.max(1, scrollPercent))}% - 14px)`,
          }}
          onClick={triggerTurbo}
          title="Click for TURBO BOOST!"
        >
          <span className={`text-base sm:text-lg select-none filter drop-shadow-[0_2px_8px_rgba(255,61,129,0.8)] ${turbo ? 'scale-150 animate-bounce' : 'hover:scale-125'}`}>
            🏎️
          </span>
        </div>
      </div>

      {/* Floating Speedometer Pill (Top Right, Desktop) */}
      <div
        onClick={triggerTurbo}
        className={`pointer-events-auto absolute top-3 right-4 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-teal/90 border backdrop-blur-md shadow-xl cursor-pointer select-none transition-all duration-200 ${
          turbo
            ? 'border-neon-flamingo shadow-[0_0_20px_rgba(255,61,129,0.6)] scale-105'
            : 'border-deep-teal hover:border-palm-teal/50'
        }`}
        title="Tap to engage Cheetah Turbo"
      >
        <span className="w-2 h-2 rounded-full bg-palm-teal animate-pulse" />
        <span className="text-[10px] font-mono uppercase text-off-white/50 tracking-wider">
          LEONIDA GPS
        </span>
        <span className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
          {speedMph} MPH
        </span>
        <span className="text-[10px] font-mono text-palm-teal">
          [{Math.round(scrollPercent)}%]
        </span>
      </div>
    </div>
  )
}

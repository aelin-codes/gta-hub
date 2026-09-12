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
      const calculatedSpeed = Math.min(195, Math.floor(35 + (deltaY / deltaTime) * 130))

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

  // Calculate distance in miles based on scroll
  const miles = (scrollPercent * 0.08).toFixed(1)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[70] pointer-events-none">
        {/* Top Neon Track */}
        <div className="h-1.5 sm:h-2 w-full bg-midnight-teal/90 backdrop-blur-sm relative overflow-visible border-b border-deep-teal/40">
          <div
            className={`h-full bg-gradient-to-r from-palm-teal via-sunset-orange to-neon-flamingo transition-all duration-75 ${
              turbo ? 'shadow-[0_0_25px_#ff3d81]' : 'shadow-[0_0_12px_#ff7a45]'
            }`}
            style={{ width: `${scrollPercent}%` }}
          />

          {/* Speeding Car Icon tracking scroll position */}
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-transform duration-75 flex items-center"
            style={{
              left: `calc(${Math.min(96, Math.max(1, scrollPercent))}% - 14px)`,
            }}
            onClick={triggerTurbo}
            title="Click for CHEETAH TURBO BOOST!"
          >
            <div className="relative flex items-center">
              {/* Flame exhaust when speeding */}
              {speedMph > 80 && (
                <span className="absolute -left-3 text-xs animate-ping">🔥</span>
              )}
              <span
                className={`text-base sm:text-xl select-none filter drop-shadow-[0_2px_10px_rgba(255,61,129,0.9)] ${
                  turbo ? 'scale-150 animate-bounce' : speedMph > 100 ? 'scale-125' : 'hover:scale-125'
                } transition-transform`}
              >
                🏎️
              </span>
            </div>
          </div>
        </div>

        {/* Floating Speedometer Pill (Top Right, Desktop & Tablet) */}
        <div
          onClick={triggerTurbo}
          className={`pointer-events-auto absolute top-3 right-4 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-teal/95 border backdrop-blur-md shadow-xl cursor-pointer select-none transition-all duration-200 ${
            turbo
              ? 'border-neon-flamingo shadow-[0_0_20px_rgba(255,61,129,0.6)] scale-105'
              : 'border-deep-teal hover:border-palm-teal/50'
          }`}
          title="Tap to engage Cheetah Turbo (+240 MPH)"
        >
          <span className={`w-2 h-2 rounded-full ${speedMph > 90 ? 'bg-neon-flamingo animate-ping' : 'bg-palm-teal animate-pulse'}`} />
          <span className="text-[10px] font-mono uppercase text-off-white/50 tracking-wider">
            SPEED
          </span>
          <span className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
            {speedMph} MPH
          </span>
          <span className="text-[10px] font-mono text-palm-teal border-l border-deep-teal pl-2">
            {miles} mi
          </span>
        </div>
      </div>
    </>
  )
}

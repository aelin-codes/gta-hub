'use client'

import { useEffect, useState } from 'react'
import { Gauge, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { soundFx } from './GtaSoundEffects'

export default function ScrollProgressSpeedometer() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [speedMph, setSpeedMph] = useState(35)
  const [turbo, setTurbo] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    let lastY = 0
    let lastTime = Date.now()

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      setScrollPercent(percent)

      // Dynamic speedometer calculation from scroll delta
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
    }, 1400)
  }

  // Calculate distance in miles based on scroll
  const miles = (scrollPercent * 0.08).toFixed(1)

  return (
    <>
      {/* Top Neon Scroll Progress Track (Purely visual, zero pointer events so header clicks are NEVER blocked) */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none select-none">
        <div className="h-1.5 sm:h-2 w-full bg-midnight-teal/80 backdrop-blur-sm relative overflow-visible border-b border-deep-teal/40">
          <div
            className={`h-full bg-gradient-to-r from-palm-teal via-sunset-orange to-neon-flamingo transition-all duration-75 ${
              turbo ? 'shadow-[0_0_25px_#ff3d81]' : 'shadow-[0_0_10px_#ff7a45]'
            }`}
            style={{ width: `${scrollPercent}%` }}
          />

          {/* Gliding Car Indicator — Strictly pointer-events-none so it never intercepts navbar clicks */}
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75 flex items-center"
            style={{
              left: `calc(${Math.min(97, Math.max(1, scrollPercent))}% - 12px)`,
            }}
          >
            <div className="relative flex items-center">
              {speedMph > 85 && (
                <span className="absolute -left-3 text-xs animate-ping">🔥</span>
              )}
              <span
                className={`text-sm sm:text-base filter drop-shadow-[0_2px_8px_rgba(255,61,129,0.9)] ${
                  turbo ? 'scale-125 animate-bounce' : speedMph > 100 ? 'scale-110' : ''
                } transition-transform`}
              >
                🏎️
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower-Left HUD Telemetry Gauge:
          - Docked safely at bottom-20 left-4 sm:left-6
          - Placed above the cheat console (bottom-6 left-6)
          - Completely isolated from header navigation (top-0 h-20)
          - Completely isolated from radio console (bottom-6 right-6)
          - Outer container is pointer-events-none so nothing around it is blocked
          - Only the compact badge is interactive (pointer-events-auto) */}
      <div className="fixed bottom-20 left-4 sm:left-6 z-30 pointer-events-none select-none">
        {isMinimized ? (
          <button
            onClick={() => {
              soundFx.playClick()
              setIsMinimized(false)
            }}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight-teal/95 border border-deep-teal hover:border-palm-teal text-off-white/80 hover:text-white backdrop-blur-md shadow-xl transition-all duration-200 text-[10px] font-mono"
            title="Open Vice City Telemetry Speedometer"
          >
            <Gauge className="w-3 h-3 text-palm-teal" />
            <span className="font-bold text-neon-flamingo">{speedMph} MPH</span>
            <ChevronUp className="w-3 h-3 text-off-white/40" />
          </button>
        ) : (
          <div
            className={`pointer-events-auto rounded-2xl bg-[#090F16]/95 border backdrop-blur-xl shadow-2xl transition-all duration-300 p-2.5 space-y-1.5 min-w-[155px] ${
              turbo
                ? 'border-neon-flamingo shadow-[0_0_25px_rgba(255,61,129,0.5)] scale-105'
                : 'border-deep-teal/80 hover:border-palm-teal/60'
            }`}
          >
            {/* Header: Title & Minimize */}
            <div className="flex items-center justify-between text-[9px] font-mono border-b border-deep-teal/50 pb-1">
              <span className="text-off-white/50 tracking-wider flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${speedMph > 90 ? 'bg-neon-flamingo animate-ping' : 'bg-palm-teal'}`} />
                TELEMETRY
              </span>
              <button
                onClick={() => {
                  soundFx.playClick()
                  setIsMinimized(true)
                }}
                className="text-off-white/40 hover:text-white p-0.5 rounded transition"
                title="Minimize speedometer gauge"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Speed Display */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-display uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal leading-none">
                  {speedMph}
                </span>
                <span className="text-[10px] font-mono font-bold text-off-white/60">MPH</span>
              </div>

              {/* Turbo Trigger Button */}
              <button
                onClick={triggerTurbo}
                className="px-2 py-0.5 rounded-md bg-gradient-to-r from-neon-flamingo/80 to-sunset-orange/80 hover:from-neon-flamingo hover:to-sunset-orange text-white text-[9px] font-mono font-bold tracking-wider transition shadow flex items-center gap-0.5 active:scale-95"
                title="Trigger Cheetah Turbo Boost (+240 MPH)"
              >
                <Zap className="w-2.5 h-2.5 fill-current" />
                <span>TURBO</span>
              </button>
            </div>

            {/* Dynamic Speed RPM Bar */}
            <div className="w-full bg-midnight-teal rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-palm-teal via-sunset-orange to-neon-flamingo transition-all duration-100"
                style={{ width: `${Math.min(100, (speedMph / 195) * 100)}%` }}
              />
            </div>

            {/* Odometer Distance & Scroll Indicator */}
            <div className="flex items-center justify-between text-[9px] font-mono text-off-white/40 pt-0.5">
              <span>TRIP: <strong className="text-palm-teal">{miles} mi</strong></span>
              <span>PAGE: <strong className="text-off-white/70">{Math.round(scrollPercent)}%</strong></span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

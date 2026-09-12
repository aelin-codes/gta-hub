'use client'

import { useState, useEffect } from 'react'
import { soundFx } from './GtaSoundEffects'
import { Tv } from 'lucide-react'

export default function GtaRetroFilter() {
  const [crtEnabled, setCrtEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('gta_retro_crt')
    if (stored === 'true') {
      setCrtEnabled(true)
    }
  }, [])

  const toggleCrt = () => {
    soundFx.playClick()
    const next = !crtEnabled
    setCrtEnabled(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('gta_retro_crt', String(next))
    }
  }

  return (
    <>
      {/* Subtle floating toggle button right next to radio / speedometer */}
      <div className="fixed bottom-6 right-36 sm:right-40 z-50 select-none">
        <button
          onClick={toggleCrt}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-mono backdrop-blur-md shadow-xl transition duration-200 ${
            crtEnabled
              ? 'bg-neon-flamingo/20 border-neon-flamingo text-neon-flamingo shadow-[0_0_15px_rgba(255,61,129,0.5)]'
              : 'bg-midnight-teal/90 border-deep-teal text-off-white/70 hover:text-off-white hover:border-palm-teal/50'
          }`}
          title="Toggle 80s CRT Scanlines / Arcade Mode"
        >
          <Tv className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-bold">CRT {crtEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* CRT Scanline Overlay when enabled */}
      {crtEnabled && (
        <div
          className="fixed inset-0 pointer-events-none z-[9999] opacity-40 mix-blend-overlay"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.4) 0px,
              rgba(0, 0, 0, 0.4) 1px,
              transparent 1px,
              transparent 2px
            )`,
          }}
        />
      )}
    </>
  )
}

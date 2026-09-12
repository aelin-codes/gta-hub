'use client'

import { useState, useEffect, useRef } from 'react'
import { soundFx } from './GtaSoundEffects'
import GtaHackingPuzzle from './GtaHackingPuzzle'
import { ShieldAlert, Terminal } from 'lucide-react'

export default function GtaWantedLevel() {
  const [stars, setStars] = useState(1)
  const [isFlashing, setIsFlashing] = useState(false)
  const [respraying, setRespraying] = useState(false)
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [hasTriggered5StarLockdown, setHasTriggered5StarLockdown] = useState(false)
  const coolDownTimerRef = useRef<NodeJS.Timeout | null>(null)

  // As user scrolls, wanted level naturally increases SILENTLY (no audio)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      let newStars = 1
      if (scrollY > 600) newStars = 2
      if (scrollY > 1500) newStars = 3
      if (scrollY > 2800) newStars = 4
      if (scrollY > 4200) newStars = 5

      setStars((prev) => {
        // If transitioning to 5 stars, trigger lockdown event
        if (newStars === 5 && prev < 5 && !hasTriggered5StarLockdown) {
          setHasTriggered5StarLockdown(true)
          setShowPuzzle(true)
          setIsFlashing(true)
        }
        return Math.max(prev, newStars)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const handleClearEvent = () => {
      handleGradualClear()
    }
    window.addEventListener('gta_clear_wanted', handleClearEvent)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('gta_clear_wanted', handleClearEvent)
      if (coolDownTimerRef.current) clearInterval(coolDownTimerRef.current)
    }
  }, [hasTriggered5StarLockdown])

  // Gradual star reduction: removes stars one by one over time
  const handleGradualClear = () => {
    soundFx.playSpray()
    setRespraying(true)
    if (coolDownTimerRef.current) clearInterval(coolDownTimerRef.current)

    coolDownTimerRef.current = setInterval(() => {
      setStars((prev) => {
        if (prev <= 1) {
          if (coolDownTimerRef.current) clearInterval(coolDownTimerRef.current)
          setRespraying(false)
          setHasTriggered5StarLockdown(false)
          return 0
        }
        return prev - 1
      })
    }, 1200) // 1.2s per star
  }

  // Reduce single star (called when solving each puzzle stage)
  const handleReduceSingleStar = () => {
    setStars((prev) => {
      const next = Math.max(0, prev - 1)
      if (next === 0) {
        setHasTriggered5StarLockdown(false)
      }
      return next
    })
  }

  const is5StarMaxHeat = stars === 5

  return (
    <>
      {/* 5-STAR FULLSCREEN GLITCH & 'SURRENDER NOW !!' EMERGENCY OVERLAY */}
      {is5StarMaxHeat && (
        <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
          {/* Flashing Police Red/Blue Vignette */}
          <div className="absolute inset-0 animate-pulse bg-gradient-to-t from-red-600/25 via-transparent to-blue-600/25 mix-blend-color-dodge" />
          
          {/* CRT Glitch Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />

          {/* Surrender Now Alert Banner */}
          <div className="pointer-events-auto absolute top-20 left-1/2 -translate-x-1/2 z-[95] px-6 py-3 rounded-2xl bg-[#07080E]/95 border-2 border-neon-flamingo shadow-[0_0_50px_rgba(255,42,133,0.8)] flex items-center gap-4 animate-bounce">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <div className="text-center">
              <h3 className="text-lg sm:text-2xl font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-rose-500 to-amber-400">
                SURRENDER NOW !!
              </h3>
              <p className="text-[10px] font-mono text-off-white/80 uppercase">
                VCPD MAXIMUM HEAT • ALL SATELLITE &amp; AIR UNITS DEPLOYED
              </p>
            </div>
            <button
              onClick={() => {
                soundFx.playClick()
                setShowPuzzle(true)
              }}
              className="px-3 py-1.5 rounded-xl bg-neon-flamingo hover:bg-neon-flamingo/80 text-white font-mono text-xs font-bold uppercase transition flex items-center gap-1.5 shadow-lg"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>HACK FREQUENCY</span>
            </button>
          </div>
        </div>
      )}

      {/* Wanted Level Badge on Navbar */}
      <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-midnight-teal/90 border border-deep-teal shadow-xl backdrop-blur-md">
        {/* Wanted Stars Row */}
        <div
          onClick={() => {
            soundFx.playClick()
            if (stars === 5 || stars > 0) {
              setShowPuzzle(true)
            }
          }}
          className="flex items-center gap-1 cursor-pointer group"
          title="Wanted Level! Click to launch Police Radio Decryptor Puzzle"
        >
          {[1, 2, 3, 4, 5].map((s) => {
            const active = s <= stars
            return (
              <span
                key={s}
                className={`text-sm sm:text-base transition-all duration-300 select-none ${
                  active
                    ? stars === 5
                      ? 'text-neon-flamingo scale-125 filter drop-shadow-[0_0_12px_#ff2a85] animate-pulse'
                      : 'text-sunset-orange filter drop-shadow-[0_0_8px_#ff7a45]'
                    : 'text-off-white/20'
                }`}
              >
                ★
              </span>
            )
          })}
        </div>

        {/* Respray / Puzzle Button */}
        {stars > 0 ? (
          <button
            onClick={() => setShowPuzzle(true)}
            className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-lg bg-deep-teal hover:bg-palm-teal/20 text-palm-teal hover:text-white border border-palm-teal/30 transition whitespace-nowrap flex items-center gap-1"
            title="Solve Cipher to drop stars"
          >
            <span>{respraying ? 'Evading...' : stars === 5 ? 'SURRENDER!!' : 'Decipher'}</span>
          </button>
        ) : (
          <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">
            Clean Record
          </span>
        )}
      </div>

      {/* Interactive Hacking & Decryption Puzzle Modal */}
      {showPuzzle && (
        <GtaHackingPuzzle
          currentStars={stars}
          onReduceStar={handleReduceSingleStar}
          onClose={() => setShowPuzzle(false)}
        />
      )}
    </>
  )
}

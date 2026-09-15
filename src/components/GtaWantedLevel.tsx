'use client'

import { useState, useEffect, useRef } from 'react'
import { soundFx } from './GtaSoundEffects'
import GtaHackingPuzzle from './GtaHackingPuzzle'
import { Terminal, X, ShieldCheck } from 'lucide-react'

export default function GtaWantedLevel() {
  const [stars, setStars] = useState(0)
  const [isFlashing, setIsFlashing] = useState(false)
  const [respraying, setRespraying] = useState(false)
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [show5StarAlert, setShow5StarAlert] = useState(false)
  const coolDownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const alertDismissTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Start natural star decay (cool down heat when lying low)
  const startNaturalCooldown = () => {
    if (coolDownTimerRef.current) clearInterval(coolDownTimerRef.current)
    coolDownTimerRef.current = setInterval(() => {
      setStars((prev) => {
        if (prev <= 1) {
          if (coolDownTimerRef.current) clearInterval(coolDownTimerRef.current)
          setShow5StarAlert(false)
          setIsFlashing(false)
          return 0
        }
        return prev - 1
      })
    }, 1200)
  }

  // As user scrolls, wanted level responds sensitively:
  // - Decreases when scrolling back up
  // - Naturally cools down when idle (user stops scrolling to read/watch)
  useEffect(() => {
    const handleScroll = () => {
      if (coolDownTimerRef.current) {
        clearInterval(coolDownTimerRef.current)
        coolDownTimerRef.current = null
      }
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
        idleTimerRef.current = null
      }

      const scrollY = window.scrollY
      let newStars = 0
      if (scrollY > 1500) newStars = 1
      if (scrollY > 3500) newStars = 2
      if (scrollY > 6500) newStars = 3
      if (scrollY > 10000) newStars = 4
      if (scrollY > 15000) newStars = 5

      setStars((prev) => {
        if (newStars === 5 && prev < 5) {
          setShow5StarAlert(true)
          setIsFlashing(true)
          if (alertDismissTimerRef.current) clearTimeout(alertDismissTimerRef.current)
          // Auto-dismiss alert banner after 4s so it never disturbs reading
          alertDismissTimerRef.current = setTimeout(() => {
            setShow5StarAlert(false)
            setIsFlashing(false)
          }, 4000)
        }
        return newStars
      })

      // After 2.5s of no scrolling (lying low), stars sensitively cool down
      idleTimerRef.current = setTimeout(() => {
        startNaturalCooldown()
      }, 2500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const handleClearEvent = () => {
      handleInstantClear()
    }
    window.addEventListener('gta_clear_wanted', handleClearEvent)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('gta_clear_wanted', handleClearEvent)
      if (coolDownTimerRef.current) clearInterval(coolDownTimerRef.current)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      if (alertDismissTimerRef.current) clearTimeout(alertDismissTimerRef.current)
    }
  }, [])

  // 1-Click Pay 'n' Spray instant evasion
  const handleInstantClear = () => {
    soundFx.playSpray()
    setRespraying(true)
    setShow5StarAlert(false)
    setIsFlashing(false)
    if (coolDownTimerRef.current) clearInterval(coolDownTimerRef.current)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    setTimeout(() => {
      setStars(0)
      setRespraying(false)
    }, 400)
  }

  // Reduce single star (called when solving each puzzle stage)
  const handleReduceSingleStar = () => {
    setStars((prev) => {
      const next = Math.max(0, prev - 1)
      if (next === 0) {
        setShow5StarAlert(false)
      }
      return next
    })
  }

  const is5StarMaxHeat = stars === 5 && show5StarAlert

  return (
    <>
      {/* 5-STAR NON-INTRUSIVE ALERT (AUTO-DISMISSES & DISMISSIBLE WITH ✕) */}
      {is5StarMaxHeat && (
        <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden transition-opacity duration-500">
          {/* Subtle Police Vignette (Non-blinding, pointer-events-none) */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-red-600/30 via-transparent to-blue-600/30 mix-blend-color-dodge" />

          {/* Quick Dismissible Alert Pill */}
          <div className="pointer-events-auto absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-[95] px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-[#07080E]/95 border-2 border-neon-flamingo shadow-[0_0_30px_rgba(255,42,133,0.6)] flex items-center gap-3 backdrop-blur-md animate-fade-in-up">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
            <div className="text-left">
              <h3 className="text-xs sm:text-sm font-display uppercase tracking-widest text-neon-flamingo">
                VCPD Heat Max
              </h3>
              <p className="text-[9px] font-mono text-off-white/70 uppercase">
                Lie low or evade to clear heat
              </p>
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => {
                  soundFx.playClick()
                  setShowPuzzle(true)
                  setShow5StarAlert(false)
                }}
                className="px-2.5 py-1 rounded-lg bg-deep-teal hover:bg-palm-teal/20 text-palm-teal font-mono text-[10px] font-bold uppercase transition flex items-center gap-1 border border-palm-teal/30"
                title="Launch Cipher Mini-Game"
              >
                <Terminal className="w-3 h-3" />
                <span>Hack</span>
              </button>
              <button
                onClick={handleInstantClear}
                className="px-2.5 py-1 rounded-lg bg-neon-flamingo hover:bg-sunset-orange text-white font-mono text-[10px] font-bold uppercase transition"
                title="Evade Police Heat"
              >
                Evade
              </button>
              <button
                onClick={() => setShow5StarAlert(false)}
                className="p-1 text-off-white/60 hover:text-white transition"
                aria-label="Dismiss alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wanted Level Badge on Navbar */}
      <div className="relative inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-xl bg-midnight-teal/90 border border-white/10 hover:border-palm-teal/50 shadow-md backdrop-blur-md shrink-0 select-none transition-colors">
        {/* Wanted Stars Row (Clicking immediately initiates Pay 'n' Spray evasion) */}
        <div
          onClick={handleInstantClear}
          className="flex items-center gap-0.5 cursor-pointer group"
          title={stars > 0 ? "Click to clear heat (Pay 'n' Spray)!" : "Clean Record - zero heat"}
        >
          {[1, 2, 3, 4, 5].map((s) => {
            const active = s <= stars
            return (
              <span
                key={s}
                className={`text-xs sm:text-sm transition-all duration-300 select-none ${
                  active
                    ? stars === 5
                      ? 'text-neon-flamingo scale-110 filter drop-shadow-[0_0_8px_#ff2a85] animate-pulse'
                      : 'text-sunset-orange filter drop-shadow-[0_0_6px_#ff7a45]'
                    : 'text-off-white/20'
                }`}
              >
                ★
              </span>
            )
          })}
        </div>

        {/* Action Controls */}
        {stars > 0 ? (
          <div className="flex items-center gap-1">
            <button
              onClick={handleInstantClear}
              className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-deep-teal hover:bg-palm-teal/20 text-palm-teal hover:text-white border border-palm-teal/30 transition whitespace-nowrap"
              title="Instant Pay 'n' Spray clear"
            >
              {respraying ? 'Evading...' : 'Evade'}
            </button>
            <button
              onClick={() => setShowPuzzle(true)}
              className="text-[9px] font-mono text-off-white/50 hover:text-palm-teal p-0.5 transition"
              title="Launch Decryptor Puzzle"
            >
              <Terminal className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold flex items-center gap-0.5">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">Clean</span>
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


'use client'

import { useState, useEffect } from 'react'
import { soundFx } from './GtaSoundEffects'

export default function GtaWantedLevel() {
  const [stars, setStars] = useState(1)
  const [isFlashing, setIsFlashing] = useState(false)
  const [respraying, setRespraying] = useState(false)

  // As user scrolls, wanted level naturally increases
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      let newStars = 1
      if (scrollY > 600) newStars = 2
      if (scrollY > 1500) newStars = 3
      if (scrollY > 2800) newStars = 4
      if (scrollY > 4200) newStars = 5

      setStars((prev) => {
        if (newStars > prev) {
          soundFx.playWantedStar()
          setIsFlashing(true)
          setTimeout(() => setIsFlashing(false), 1200)
        }
        return newStars
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const handleClearEvent = () => {
      soundFx.playSpray()
      setStars(0)
    }
    window.addEventListener('gta_clear_wanted', handleClearEvent)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('gta_clear_wanted', handleClearEvent)
    }
  }, [])

  const handleClearWanted = () => {
    soundFx.playSpray()
    setRespraying(true)
    setTimeout(() => {
      setStars(0)
      setRespraying(false)
    }, 900)
  }

  const handleBribe = () => {
    soundFx.playCash()
    setStars((prev) => Math.max(0, prev - 1))
  }

  return (
    <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-midnight-teal/90 border border-deep-teal shadow-xl backdrop-blur-md">
      {/* Wanted Stars Row */}
      <div
        onClick={handleClearWanted}
        className="flex items-center gap-1 cursor-pointer group"
        title="Wanted Level! Click to visit Pay 'n' Spray to clear heat"
      >
        {[1, 2, 3, 4, 5].map((s) => {
          const active = s <= stars
          return (
            <span
              key={s}
              className={`text-sm sm:text-base transition-all duration-300 select-none ${
                active
                  ? isFlashing
                    ? 'text-neon-flamingo scale-125 filter drop-shadow-[0_0_12px_#ff3d81] animate-ping'
                    : 'text-sunset-orange filter drop-shadow-[0_0_8px_#ff7a45]'
                  : 'text-off-white/20'
              }`}
            >
              ★
            </span>
          )
        })}
      </div>

      {/* Pay 'n' Spray Button / Badge */}
      {stars > 0 ? (
        <button
          onClick={handleClearWanted}
          className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-lg bg-deep-teal hover:bg-palm-teal/20 text-palm-teal hover:text-white border border-palm-teal/30 transition whitespace-nowrap"
          title="Clear wanted level"
        >
          {respraying ? 'Respraying...' : 'Respray'}
        </button>
      ) : (
        <span className="text-[9px] font-mono text-emerald-400 uppercase">
          Clean Record
        </span>
      )}
    </div>
  )
}

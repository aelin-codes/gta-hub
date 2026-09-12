'use client'

import { useState, useEffect } from 'react'
import { soundFx } from './GtaSoundEffects'
import { Award, Sparkles, X } from 'lucide-react'

export default function EasterEggHunt() {
  const [foundCount, setFoundCount] = useState(0)
  const [latestFound, setLatestFound] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const updateFromStorage = () => {
      const stored = localStorage.getItem('gta_hidden_packages')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) setFoundCount(parsed.length)
        } catch {}
      }
    }

    updateFromStorage()

    const handlePackageFound = (e: Event) => {
      const custom = e as CustomEvent<string>
      setLatestFound(custom.detail || 'Secret Stash')
      updateFromStorage()
    }

    window.addEventListener('gta_package_found', handlePackageFound)
    return () => window.removeEventListener('gta_package_found', handlePackageFound)
  }, [])

  return (
    <>
      {/* Toast popup when a package is discovered */}
      {latestFound && (
        <div className="fixed top-20 right-6 z-[80] animate-bounce">
          <div className="bg-gradient-to-r from-neon-flamingo to-sunset-orange p-1 rounded-2xl shadow-[0_0_30px_rgba(255,61,129,0.8)]">
            <div className="bg-midnight-teal rounded-xl p-4 flex items-center gap-3 text-off-white">
              <span className="text-3xl">🗿</span>
              <div>
                <h5 className="font-display uppercase tracking-wider text-sm text-sunset-orange">
                  HIDDEN PACKAGE FOUND!
                </h5>
                <p className="text-xs font-mono text-off-white/80">
                  {latestFound} • Total: {foundCount}/5 Found
                </p>
                <p className="text-[10px] font-mono text-palm-teal font-bold mt-1">
                  RESPECT +100 • +$10,000 BONUS
                </p>
              </div>
              <button
                onClick={() => setLatestFound(null)}
                aria-label="Dismiss"
                className="p-1 text-off-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

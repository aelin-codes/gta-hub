'use client'

import { useState, useEffect } from 'react'
import { soundFx } from './GtaSoundEffects'
import { Award, Sparkles, X, Compass, CheckCircle2 } from 'lucide-react'

interface PackageClue {
  id: string
  name: string
  location: string
  hint: string
}

const ALL_PACKAGES: PackageClue[] = [
  {
    id: 'Radar Satellite Cache',
    name: 'Radar Satellite Cache',
    location: 'Home Page',
    hint: 'Scan the Live Leonida Telemetry Radar terminal at the bottom of the home briefing.',
  },
  {
    id: 'Ocean Beach Floral Tiki',
    name: 'Ocean Beach Floral Tiki',
    location: 'Characters Page',
    hint: 'Search around the Character Registry header next to the Tommy Vercetti archives.',
  },
  {
    id: 'Starfish Island Cartel Vault',
    name: 'Starfish Island Cartel Vault',
    location: 'Wiki & Interactive Map',
    hint: 'Inspect the tactical satellite map controls above the Leonida territory grid.',
  },
  {
    id: 'Weazel News Classified Safe',
    name: 'Weazel News Classified Safe',
    location: 'News & Articles',
    hint: 'Look closely near the top editorial badge of the news archives.',
  },
  {
    id: 'Leaf Links Palm Secret',
    name: 'Leaf Links Palm Secret',
    location: 'Global Footer',
    hint: 'Scroll to the very bottom of any page near the legal disclaimer palm trees.',
  },
]

export default function EasterEggHunt() {
  const [foundPackages, setFoundPackages] = useState<string[]>([])
  const [latestFound, setLatestFound] = useState<string | null>(null)
  const [showLedger, setShowLedger] = useState(false)

  const updateFromStorage = () => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('gta_hidden_packages')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setFoundPackages(parsed)
      } catch {}
    }
  }

  useEffect(() => {
    updateFromStorage()

    const handlePackageFound = (e: Event) => {
      const custom = e as CustomEvent<string>
      const name = custom.detail || 'Secret Stash'
      setLatestFound(name)
      updateFromStorage()

      // If all 5 collected, trigger Mission Passed victory!
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('gta_hidden_packages') || '[]')
        if (stored.length >= 5) {
          soundFx.playMissionPassed()
        }
      }, 300)
    }

    window.addEventListener('gta_package_found', handlePackageFound)
    return () => window.removeEventListener('gta_package_found', handlePackageFound)
  }, [])

  const foundCount = foundPackages.length
  const isAllFound = foundCount >= 5

  return (
    <>
      {/* Toast popup when a package is discovered */}
      {latestFound && (
        <div className="fixed top-20 right-6 z-[90] animate-bounce">
          <div className="bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal p-1 rounded-2xl shadow-[0_0_35px_rgba(255,61,129,0.9)]">
            <div className="bg-midnight-teal rounded-xl p-4 flex items-center gap-3 text-off-white">
              <span className="text-3xl select-none">🗿</span>
              <div>
                <h5 className="font-display uppercase tracking-wider text-sm text-sunset-orange">
                  HIDDEN PACKAGE FOUND!
                </h5>
                <p className="text-xs font-mono text-off-white/90">
                  {latestFound}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono font-bold text-palm-teal bg-palm-teal/10 px-2 py-0.5 rounded border border-palm-teal/30">
                    {foundCount}/5 PACKAGES ({Math.round((foundCount / 5) * 100)}%)
                  </span>
                  <button
                    onClick={() => {
                      soundFx.playClick()
                      setShowLedger(true)
                      setLatestFound(null)
                    }}
                    className="text-[10px] font-mono text-sunset-orange hover:underline"
                  >
                    View Checklist →
                  </button>
                </div>
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

      {/* Persistent Collectibles Tracker Pill (Top Left / Right) */}
      <div className="fixed bottom-6 right-72 hidden xl:block z-50 select-none">
        <button
          onClick={() => {
            soundFx.playClick()
            setShowLedger(true)
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-mono backdrop-blur-md shadow-xl transition-all hover:scale-105 ${
            isAllFound
              ? 'bg-sunset-orange/20 border-sunset-orange text-sunset-orange shadow-[0_0_20px_rgba(255,122,69,0.6)]'
              : 'bg-midnight-teal/90 border-deep-teal text-off-white/80 hover:border-palm-teal/50'
          }`}
          title="Hidden Packages Checklist & Clues"
        >
          <span className="text-sm">🗿</span>
          <span className="font-bold">
            {foundCount}/5 Packages
          </span>
        </button>
      </div>

      {/* Collectibles Modal / Ledger */}
      {showLedger && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-midnight-teal border border-deep-teal rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-deep-teal pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗿</span>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal">
                    HIDDEN PACKAGES
                  </h3>
                  <p className="text-[10px] font-mono text-off-white/50">
                    Vice City Collectible Stash Registry
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick()
                  setShowLedger(false)
                }}
                className="p-1 rounded-full text-off-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-off-white/70">Collection Status</span>
                <span className="text-palm-teal font-bold">{foundCount} of 5 Found</span>
              </div>
              <div className="h-2 w-full bg-deep-teal rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-flamingo to-sunset-orange transition-all duration-500"
                  style={{ width: `${(foundCount / 5) * 100}%` }}
                />
              </div>
            </div>

            {isAllFound && (
              <div className="p-3 rounded-2xl bg-sunset-orange/15 border border-sunset-orange/40 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-sunset-orange font-bold text-xs font-mono">
                  <Award className="w-4 h-4" />
                  <span>100% VICE CITY COMPLETION</span>
                </div>
                <p className="text-[11px] font-mono text-off-white/80">
                  You discovered every secret stash on the website. Infinite Respect Unlocked!
                </p>
              </div>
            )}

            {/* Package Items Checklist */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {ALL_PACKAGES.map((pkg, i) => {
                const isFound = foundPackages.includes(pkg.id)
                return (
                  <div
                    key={pkg.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isFound
                        ? 'bg-deep-teal/40 border-palm-teal/50'
                        : 'bg-black/30 border-deep-teal/60 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isFound ? (
                          <CheckCircle2 className="w-4 h-4 text-palm-teal shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-off-white/30 flex items-center justify-center text-[9px] font-mono text-off-white/40 shrink-0">
                            {i + 1}
                          </span>
                        )}
                        <span className={`text-xs font-bold font-mono ${isFound ? 'text-palm-teal line-through' : 'text-off-white'}`}>
                          {pkg.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-sunset-orange px-2 py-0.5 rounded bg-deep-teal">
                        {pkg.location}
                      </span>
                    </div>
                    {!isFound && (
                      <p className="text-[11px] font-mono text-off-white/60 mt-1.5 pl-6">
                        💡 Hint: {pkg.hint}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  soundFx.playClick()
                  setShowLedger(false)
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition"
              >
                Close Stash Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

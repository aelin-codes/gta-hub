'use client'

import { useState, useEffect } from 'react'
import { soundFx } from './GtaSoundEffects'
import { Sparkles, Terminal, X, Zap } from 'lucide-react'

interface CheatDef {
  code: string
  title: string
  effect: string
  bonusCash?: number
}

const CHEATS: CheatDef[] = [
  { code: 'ASPIRINE', title: 'FULL HEALTH', effect: 'Restores 100% Health + Adrenaline Rush', bonusCash: 5000 },
  { code: 'PRECIOUSPROTECTION', title: 'FULL ARMOR', effect: 'Kevlar Body Armor Deployed (100%)', bonusCash: 2500 },
  { code: 'PANZER', title: 'RHINO TANK', effect: 'Spawns 60-Ton Military Tank with Cannon Blast', bonusCash: 10000 },
  { code: 'LEAVEMEALONE', title: 'CLEAR WANTED LEVEL', effect: 'Police Radios Stand Down • Heat 0★' },
  { code: 'NUTTERTOOLS', title: 'HEAVY WEAPONS', effect: 'Minigun, Rocket Launcher, Grenades & Sniper', bonusCash: 15000 },
  { code: 'THUGSTOOLS', title: 'THUG WEAPONS', effect: 'Baseball Bat, Pistol, Molotovs & Mac-10' },
  { code: 'PROFESSIONALTOOLS', title: 'PROFESSIONAL ARSENAL', effect: 'Katana, Combat Shotgun, MP5 & M4' },
  { code: 'SEAWAYS', title: 'SEAWAYS', effect: 'Amphibious Vehicles — Drive Across Vice Waters' },
  { code: 'BIGBANG', title: 'BIG BANG', effect: 'Detonates all vehicles in a 5-mile blast radius' },
  { code: 'VICE', title: 'VICE CITY OVERDRIVE', effect: 'Max Neon Boost & Miami Synth Vibes', bonusCash: 20000 },
]

export default function GtaCheatCodes() {
  const [activeCheat, setActiveCheat] = useState<{ title: string; effect: string } | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let keyBuffer = ''

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in text inputs or textareas
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        keyBuffer = (keyBuffer + e.key.toUpperCase()).slice(-25)

        for (const cheat of CHEATS) {
          if (keyBuffer.endsWith(cheat.code)) {
            triggerCheat(cheat)
            keyBuffer = ''
            break
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerCheat = (cheat: CheatDef) => {
    soundFx.playCheatActivated()

    if (cheat.bonusCash) {
      setTimeout(() => soundFx.playCash(), 250)
    }

    // Special effects
    if (cheat.code === 'LEAVEMEALONE') {
      window.dispatchEvent(new CustomEvent('gta_clear_wanted'))
    }

    if (cheat.code === 'PANZER' || cheat.code === 'BIGBANG') {
      // Screen rumble
      if (document.body) {
        document.body.classList.add('animate-pulse')
        setTimeout(() => document.body.classList.remove('animate-pulse'), 800)
      }
    }

    setActiveCheat({ title: cheat.title, effect: cheat.effect })

    // Auto dismiss
    setTimeout(() => {
      setActiveCheat(null)
    }, 4000)
  }

  return (
    <>
      {/* GTA CHEAT ACTIVATED HUD BANNER */}
      {activeCheat && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] pointer-events-none animate-bounce">
          <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal p-0.5 shadow-[0_0_40px_rgba(255,61,129,0.9)]">
            <div className="bg-midnight-teal px-6 py-3 rounded-2xl text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-sunset-orange animate-spin" />
                <h4 className="text-base sm:text-xl font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
                  CHEAT ACTIVATED: {activeCheat.title}
                </h4>
                <Sparkles className="w-4 h-4 text-neon-flamingo animate-spin" />
              </div>
              <p className="text-xs font-mono text-palm-teal font-semibold">
                {activeCheat.effect}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mini Cheat Book Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50 select-none">
        {isOpen ? (
          <div className="w-72 sm:w-80 rounded-3xl bg-midnight-teal/95 border border-deep-teal shadow-2xl backdrop-blur-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-deep-teal pb-2">
              <div className="flex items-center gap-2 text-sunset-orange">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  GTA CHEAT CONSOLE
                </span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick()
                  setIsOpen(false)
                }}
                className="p-1 rounded-full text-off-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] font-mono text-off-white/60">
              Type these words anywhere on your keyboard, or tap to activate instantly:
            </p>

            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 text-xs font-mono">
              {CHEATS.map((c) => (
                <button
                  key={c.code}
                  onClick={() => triggerCheat(c)}
                  className="w-full text-left p-2 rounded-xl bg-deep-teal/40 hover:bg-deep-teal/90 border border-deep-teal hover:border-palm-teal/50 transition flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-neon-flamingo group-hover:text-sunset-orange transition">
                      {c.code}
                    </span>
                    <p className="text-[10px] text-off-white/50 truncate max-w-[180px]">
                      {c.title}
                    </p>
                  </div>
                  <Zap className="w-3.5 h-3.5 text-palm-teal group-hover:scale-125 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              soundFx.playClick()
              setIsOpen(true)
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-midnight-teal/90 border border-deep-teal hover:border-sunset-orange/50 shadow-xl backdrop-blur-md text-off-white hover:text-sunset-orange text-xs font-mono transition"
            title="Open Vice City Cheat Codes"
          >
            <Terminal className="w-3.5 h-3.5 text-sunset-orange" />
            <span className="font-bold">Cheats</span>
          </button>
        )}
      </div>
    </>
  )
}

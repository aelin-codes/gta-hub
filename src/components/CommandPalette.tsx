'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  ArrowRight,
  X
} from 'lucide-react'
import { CHEATS } from '@/data/cheats'
import { CHARACTERS } from '@/data/characters'
import { VEHICLES } from '@/data/vehicles'
import { WEAPONS } from '@/data/weapons'
import { soundFx } from '@/components/GtaSoundEffects'

interface SearchItem {
  id: string
  title: string
  subtitle: string
  category: 'Cheats' | 'Characters' | 'Vehicles' | 'Weapons' | 'Navigation'
  url: string
  badge?: string
}

export default function CommandPalette({ locale = 'en' }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Base navigation pages
  const navItems: SearchItem[] = useMemo(() => [
    { id: 'nav-home', title: 'Home & Skyline Radar', subtitle: 'Countdown, live Leonida sensors, latest guides', category: 'Navigation', url: `/${locale}` },
    { id: 'nav-cheats', title: 'Cheats & Phone Dial Codes', subtitle: 'All 1-999 cell codes for vehicles, weapons, weather', category: 'Navigation', url: `/${locale}/cheats`, badge: 'POPULAR' },
    { id: 'nav-database', title: 'Vehicles & Weapons Database', subtitle: 'Telemetry stats, speeds, calibers, spawn locations', category: 'Navigation', url: `/${locale}/database`, badge: 'NEW' },
    { id: 'nav-characters', title: 'Character Vault & Dossiers', subtitle: 'Lucia, Jason, and 10 detailed noir crime profiles', category: 'Navigation', url: `/${locale}/characters` },
    { id: 'nav-wiki', title: 'Leonida Atlas & Tactical Map', subtitle: 'Interactive GPS coordinates, sawgrass swamps, Vice Beach', category: 'Navigation', url: `/${locale}/wiki` },
    { id: 'nav-library', title: 'Surveillance Video Library', subtitle: '4K trailer breakdowns, heist walk-throughs, leaks', category: 'Navigation', url: `/${locale}/library` },
    { id: 'nav-articles', title: 'Editorial Lore Articles', subtitle: 'Deep dive leaks, RAGE 9 engine breakdown, 1986 vs 2026', category: 'Navigation', url: `/${locale}/articles` },
  ], [locale])

  // Open/close keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => {
          if (!prev) soundFx.playClick()
          return !prev
        })
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const handleCustomOpen = () => {
      soundFx.playClick()
      setIsOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('gta_open_palette', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('gta_open_palette', handleCustomOpen)
    }
  }, [])

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Search results aggregation
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return navItems
    }

    const items: SearchItem[] = []

    // 1. Cheats
    CHEATS.forEach((cheat) => {
      if (
        cheat.name.toLowerCase().includes(q) ||
        cheat.code.includes(q) ||
        cheat.description.toLowerCase().includes(q) ||
        cheat.effect.toLowerCase().includes(q)
      ) {
        items.push({
          id: `cheat-${cheat.id}`,
          title: `${cheat.name} (${cheat.code})`,
          subtitle: cheat.effect,
          category: 'Cheats',
          url: `/${locale}/cheats`,
          badge: cheat.category,
        })
      }
    })

    // 2. Characters
    CHARACTERS.forEach((char) => {
      if (
        char.name.toLowerCase().includes(q) ||
        char.profile.fullName.toLowerCase().includes(q) ||
        char.profile.occupation.toLowerCase().includes(q) ||
        char.nickname.toLowerCase().includes(q)
      ) {
        items.push({
          id: `char-${char.id}`,
          title: `${char.name} — "${char.nickname}"`,
          subtitle: `${char.profile.occupation} • ${char.roleCategory}`,
          category: 'Characters',
          url: `/${locale}/characters`,
          badge: char.roleCategory,
        })
      }
    })

    // 3. Vehicles
    VEHICLES.forEach((v) => {
      if (
        v.name.toLowerCase().includes(q) ||
        v.manufacturer.toLowerCase().includes(q) ||
        v.realWorldAnalog.toLowerCase().includes(q)
      ) {
        items.push({
          id: `veh-${v.id}`,
          title: `${v.name} (${v.manufacturer})`,
          subtitle: `Analog: ${v.realWorldAnalog} • ${v.location}`,
          category: 'Vehicles',
          url: `/${locale}/database`,
          badge: v.vehicleClass,
        })
      }
    })

    // 4. Weapons
    WEAPONS.forEach((w) => {
      if (
        w.name.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.realWorldAnalog.toLowerCase().includes(q)
      ) {
        items.push({
          id: `wep-${w.id}`,
          title: w.name,
          subtitle: `${w.category} • Modeled on ${w.realWorldAnalog}`,
          category: 'Weapons',
          url: `/${locale}/database`,
          badge: w.category,
        })
      }
    })

    // 5. Navigation Items
    navItems.forEach((nav) => {
      if (
        nav.title.toLowerCase().includes(q) ||
        nav.subtitle.toLowerCase().includes(q)
      ) {
        items.push(nav)
      }
    })

    return items.slice(0, 12)
  }, [query, navItems, locale])

  // Key navigation for results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = results[selectedIndex]
      if (selected) {
        soundFx.playClick()
        setIsOpen(false)
        router.push(selected.url)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-[#0B121D] border border-palm-teal/40 rounded-3xl shadow-[0_0_50px_rgba(0,229,255,0.25)] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-deep-teal bg-[#07090E]/80">
          <Search className="w-5 h-5 text-palm-teal shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type command or query (e.g. Cheetah, Lucia, 1-999, Weapons, Atlas)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#F1F5F4] placeholder:text-[#F1F5F4]/30 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-off-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-deep-teal text-off-white/60 border border-deep-teal">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="text-center py-12 text-[#F1F5F4]/40 font-mono text-xs">
              No tactical intel found matching &quot;{query}&quot;.
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setIsOpen(false)
                    router.push(item.url)
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between gap-3 transition ${
                    isSelected
                      ? 'bg-gradient-to-r from-neon-flamingo/20 via-deep-teal to-palm-teal/10 border border-palm-teal/40'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#F1F5F4] truncate">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-deep-teal text-palm-teal border border-palm-teal/30 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#F1F5F4]/50 truncate font-sans">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-off-white/40 uppercase hidden sm:inline">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition ${isSelected ? 'text-palm-teal translate-x-0.5' : 'text-off-white/20'}`} />
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer Keys Helper */}
        <div className="px-5 py-2.5 bg-[#07090E] border-t border-deep-teal flex items-center justify-between text-[11px] font-mono text-off-white/40">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-palm-teal">GTA VI Tactical Search</span>
        </div>

      </div>
    </div>
  )
}

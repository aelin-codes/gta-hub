'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Copy,
  Check,
  PhoneCall,
  ShieldAlert,
  Star,
  Sparkles,
  Zap,
  Flame,
  CloudRain,
  Car,
  Swords,
  HeartPulse,
  Eye,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react'
import { CHEATS, CHEAT_CATEGORIES, type Cheat, type CheatCategory } from '@/data/cheats'
import { soundFx } from '@/components/GtaSoundEffects'

const CATEGORY_ICONS: Record<CheatCategory, typeof Sparkles> = {
  'Health & Armor': HeartPulse,
  'Weapons': Swords,
  'Wanted Level': Flame,
  'Vehicles': Car,
  'Weather': CloudRain,
  'Player Effects': Zap,
  'World Effects': Eye,
  'Fun & Misc': Sparkles,
}

export default function CheatsClientPage({}: { locale?: string }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CheatCategory | 'All'>('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [dialedCode, setDialedCode] = useState<string | null>(null)

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gta6_favorite_cheats')
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    } catch {
      // safe fallback
    }
  }, [])

  const toggleFavorite = (id: string) => {
    soundFx.playClick()
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      try {
        localStorage.setItem('gta6_favorite_cheats', JSON.stringify(updated))
      } catch {
        // safe fallback
      }
      return updated
    })
  }

  const handleCopy = (cheat: Cheat) => {
    soundFx.playClick()
    navigator.clipboard.writeText(cheat.code)
    setCopiedId(cheat.id)
    setTimeout(() => {
      setCopiedId((curr) => (curr === cheat.id ? null : curr))
    }, 2000)
  }

  const handleDial = (cheat: Cheat) => {
    soundFx.playCash()
    setDialedCode(cheat.code)
    // Dispatch custom event to trigger in-game cheat HUD / Easter egg hunt
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('gta_cheat_executed', {
          detail: { code: cheat.code, name: cheat.name, effect: cheat.effect }
        })
      )
    }
    setTimeout(() => setDialedCode(null), 2500)
  }

  const filteredCheats = useMemo(() => {
    return CHEATS.filter((cheat) => {
      const matchesCategory = selectedCategory === 'All' || cheat.category === selectedCategory
      const matchesSearch =
        cheat.name.toLowerCase().includes(search.toLowerCase()) ||
        cheat.code.includes(search) ||
        cheat.description.toLowerCase().includes(search.toLowerCase()) ||
        cheat.effect.toLowerCase().includes(search.toLowerCase())
      const matchesFavorite = !showOnlyFavorites || favorites.includes(cheat.id)
      return matchesCategory && matchesSearch && matchesFavorite
    })
  }, [search, selectedCategory, showOnlyFavorites, favorites])

  return (
    <div className="bg-[#07090E] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-flamingo/15 border border-neon-flamingo/30 text-neon-flamingo text-xs font-mono uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>Leonida Cell Phone Dial Codes &amp; Console Inputs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-widest text-[#F1F5F4] leading-tight">
            GTA 6 <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal">CHEATS VAULT</span>
          </h1>

          <p className="text-sm text-[#F1F5F4]/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Direct cellular dialing codes for the in-game iFruit 15 smartphone. Tap copy to grab the number, or test the live transmitter. Save favorites for quick tactical recall.
          </p>

          {/* Achievement Warning Banner */}
          <div className="p-3.5 rounded-2xl bg-sunset-orange/10 border border-sunset-orange/30 text-sunset-orange text-xs flex items-center justify-center gap-2.5 max-w-xl mx-auto">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              <strong>Warning:</strong> Activating weapon, invincibility, or explosive cheats will disable trophies and achievements for your active session.
            </span>
          </div>
        </div>

        {/* Dialed Flash Toast */}
        {dialedCode && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0E1A2B] border-2 border-palm-teal text-palm-teal px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center gap-3 animate-bounce">
            <PhoneCall className="w-5 h-5 animate-pulse" />
            <span className="font-mono text-sm uppercase tracking-wider font-bold">
              Transmitting Dial Signal: {dialedCode}
            </span>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="space-y-4 bg-[#101724]/70 border border-[#101724] rounded-3xl p-5 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#F1F5F4]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cheat by name, phone number, effect (e.g. Cheetah, 1-999, Weather)..."
                className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-deep-teal rounded-2xl text-xs sm:text-sm text-[#F1F5F4] placeholder:text-[#F1F5F4]/30 focus:outline-none focus:border-palm-teal transition"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#F1F5F4]/50 hover:text-[#F1F5F4]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Favorite Filter Toggle */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                setShowOnlyFavorites((prev) => !prev)
              }}
              className={`px-4 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border transition shrink-0 ${
                showOnlyFavorites
                  ? 'bg-sunset-orange text-black font-bold border-sunset-orange shadow-[0_0_15px_rgba(255,117,57,0.3)]'
                  : 'bg-[#07090E] text-[#F1F5F4]/70 border-deep-teal hover:border-sunset-orange/50 hover:text-[#F1F5F4]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs font-mono uppercase tracking-wider">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                setSelectedCategory('All')
              }}
              className={`px-3.5 py-2 rounded-xl transition shrink-0 border ${
                selectedCategory === 'All'
                  ? 'bg-palm-teal text-black font-bold border-palm-teal shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                  : 'bg-[#07090E] text-[#F1F5F4]/60 border-deep-teal hover:text-white hover:border-palm-teal/40'
              }`}
            >
              All Cheats ({CHEATS.length})
            </button>
            {CHEAT_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat]
              const isSelected = selectedCategory === cat
              const count = CHEATS.filter((c) => c.category === cat).length
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setSelectedCategory(cat)
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 border ${
                    isSelected
                      ? 'bg-neon-flamingo text-white font-bold border-neon-flamingo shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                      : 'bg-[#07090E] text-[#F1F5F4]/60 border-deep-teal hover:text-white hover:border-neon-flamingo/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                  <span className="opacity-60 text-[10px]">({count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#F1F5F4]/50">
          <span>Displaying {filteredCheats.length} tactical codes</span>
          <span>Platform: PS5 • Xbox Series X|S • PC</span>
        </div>

        {/* Cheats Grid */}
        {filteredCheats.length === 0 ? (
          <div className="text-center py-20 bg-[#101724]/40 border border-deep-teal rounded-3xl space-y-3">
            <SlidersHorizontal className="w-8 h-8 text-[#F1F5F4]/30 mx-auto" />
            <h3 className="text-lg font-bold uppercase text-[#F1F5F4]">No cheat codes matched</h3>
            <p className="text-xs text-[#F1F5F4]/50 max-w-sm mx-auto">
              Try searching for a different keyword or switch the category filter to &quot;All&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCheats.map((cheat) => {
              const Icon = CATEGORY_ICONS[cheat.category] || Sparkles
              const isCopied = copiedId === cheat.id
              const isFav = favorites.includes(cheat.id)

              return (
                <div
                  key={cheat.id}
                  className="group relative bg-[#101724]/50 hover:bg-[#101724]/80 border border-deep-teal hover:border-palm-teal/50 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg hover:shadow-[0_0_25px_rgba(0,229,255,0.1)]"
                >
                  <div className="space-y-3">
                    {/* Card Header: Category & Favorite Button */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-deep-teal text-palm-teal text-[10px] font-mono uppercase tracking-wider border border-palm-teal/20">
                        <Icon className="w-3 h-3" />
                        <span>{cheat.category}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(cheat.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          isFav
                            ? 'bg-sunset-orange/20 text-sunset-orange border-sunset-orange/40'
                            : 'text-[#F1F5F4]/40 border-transparent hover:text-sunset-orange hover:bg-white/5'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                        aria-label={`Favorite ${cheat.name}`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Cheat Name & Description */}
                    <div>
                      <h3 className="text-lg font-display uppercase tracking-wider text-[#F1F5F4] group-hover:text-palm-teal transition">
                        {cheat.name}
                      </h3>
                      <p className="text-xs text-[#F1F5F4]/70 mt-1 leading-relaxed">
                        {cheat.description}
                      </p>
                    </div>

                    {/* Effect Badge */}
                    <div className="text-[11px] font-mono text-off-white/80 bg-[#07090E] p-2 rounded-xl border border-deep-teal/60">
                      <span className="text-neon-flamingo font-bold">Effect: </span>
                      {cheat.effect}
                    </div>

                    {cheat.note && (
                      <p className="text-[10px] font-sans text-sunset-orange/80 italic leading-snug">
                        ⚠️ {cheat.note}
                      </p>
                    )}
                  </div>

                  {/* Cell Code Dialer Area */}
                  <div className="pt-3 border-t border-deep-teal/60 flex items-center justify-between gap-2">
                    <div className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#F1F5F4] bg-[#07090E] px-3 py-1.5 rounded-xl border border-deep-teal select-all">
                      {cheat.code}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Copy Code */}
                      <button
                        type="button"
                        onClick={() => handleCopy(cheat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-bold tracking-wider flex items-center gap-1.5 border transition ${
                          isCopied
                            ? 'bg-emerald-500 text-black border-emerald-400'
                            : 'bg-deep-teal text-[#F1F5F4] border-deep-teal hover:border-palm-teal hover:text-palm-teal'
                        }`}
                        title="Copy phone dial code"
                        aria-label={`Copy code for ${cheat.name}`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Transmit / Dial */}
                      <button
                        type="button"
                        onClick={() => handleDial(cheat)}
                        className="p-2 rounded-xl bg-neon-flamingo/20 hover:bg-neon-flamingo text-neon-flamingo hover:text-white border border-neon-flamingo/40 transition"
                        title="Simulate dial to in-game phone"
                        aria-label={`Dial ${cheat.name}`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pro Tips Section */}
        <section className="bg-gradient-to-br from-[#101724]/80 to-[#07090E] border border-deep-teal rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-display uppercase tracking-widest text-[#F1F5F4] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-palm-teal" />
            <span>HOW TO ENTER CELL PHONE CHEATS IN GTA 6</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#F1F5F4]/70 leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#07090E]/60 border border-deep-teal space-y-1.5">
              <span className="font-mono text-neon-flamingo font-bold uppercase block text-sm">Step 1 — Open Phone</span>
              <p>Press Up on the D-Pad (or scroll click on PC) while controlling either Lucia or Jason to reveal your smartphone.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090E]/60 border border-deep-teal space-y-1.5">
              <span className="font-mono text-palm-teal font-bold uppercase block text-sm">Step 2 — Open Dial Pad</span>
              <p>Navigate to Contacts and press Square (PS5) or X (Xbox) to switch to the keypad entry dialer.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#07090E]/60 border border-deep-teal space-y-1.5">
              <span className="font-mono text-sunset-orange font-bold uppercase block text-sm">Step 3 — Enter &amp; Dial</span>
              <p>Type the 1-999 number and hit Call. Once confirmed, you can repeat the cheat instantly via the phone call log.</p>
            </div>
          </div>
        </section>

        {/* Verbatim Legal Disclaimer at bottom */}
        <div className="border-t border-deep-teal/40 pt-6 text-center text-[10px] text-off-white/40 leading-relaxed">
          GTA 6 Hub is an unofficial fan site and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. All trademarks belong to their respective owners. All videos remain the property of their original creators and are embedded via official platform players.
        </div>

      </div>
    </div>
  )
}

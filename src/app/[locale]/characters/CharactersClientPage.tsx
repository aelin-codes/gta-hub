'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  X,
  Users,
  Shield,
  Briefcase,
  Activity,
  Flame,
  Swords,
  Quote,
  Shirt,
  MapPin,
  ChevronRight
} from 'lucide-react'
import { CHARACTERS, type Character } from '@/data/characters'
import { soundFx } from '@/components/GtaSoundEffects'

export default function CharactersClientPage({ locale }: { locale: string }) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [selectedChar, setSelectedChar] = useState<Character | null>(null)
  const [modalTab, setModalTab] = useState<'overview' | 'stats' | 'relationships' | 'quotes' | 'outfits' | 'missions'>('overview')
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }))
  }

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter((c) => {
      if (roleFilter !== 'all' && c.roleCategory !== roleFilter) return false
      if (!search.trim()) return true

      const query = search.toLowerCase()
      const inName = c.name.toLowerCase().includes(query)
      const inNick = c.nickname.toLowerCase().includes(query)
      const inRole = c.roleCategory.toLowerCase().includes(query)
      const inOcc = c.profile.occupation.toLowerCase().includes(query)
      const inVoice = c.profile.voiceActor ? c.profile.voiceActor.toLowerCase().includes(query) : false
      const inAffil = c.profile.affiliations.some((a) => a.toLowerCase().includes(query))
      const inQuotes = c.profile.memorableQuotes.some((q) => q.toLowerCase().includes(query))

      return inName || inNick || inRole || inOcc || inVoice || inAffil || inQuotes
    })
  }, [search, roleFilter])

  const getStatColor = (val: number) => {
    if (val >= 90) return 'from-neon-flamingo to-sunset-orange'
    if (val >= 75) return 'from-palm-teal to-emerald-400'
    if (val >= 60) return 'from-sky-400 to-blue-500'
    return 'from-slate-500 to-slate-400'
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* 1. Header & Title */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-neon-flamingo/20 to-sunset-orange/20 text-neon-flamingo px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border border-neon-flamingo/30">
            <Users className="w-4 h-4" />
            <span>GTA VI Leonida Intelligence Registry</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-wider text-off-white">
            CHARACTER INTELLIGENCE
          </h1>
          <p className="text-sm sm:text-base text-off-white/70 max-w-2xl mx-auto">
            The definitive biometric dossiers and combat analytics for the modern outlaws, cartel bosses, associates, and law enforcement figures shaping Grand Theft Auto VI across Vice City and the State of Leonida.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-4 py-2 rounded-xl bg-deep-teal/40 border border-deep-teal flex items-center space-x-2 text-xs font-mono text-off-white">
              <span className="w-2 h-2 rounded-full bg-neon-flamingo animate-pulse" />
              <span>{CHARACTERS.length} Verified GTA VI Profiles</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-deep-teal/40 border border-deep-teal flex items-center space-x-2 text-xs font-mono text-off-white">
              <span className="text-sunset-orange font-bold">100%</span>
              <span>Leonida Authenticated</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-deep-teal/40 border border-deep-teal flex items-center space-x-2 text-xs font-mono text-off-white">
              <span className="text-palm-teal font-bold">RADAR</span>
              <span>Combat Analytics Calibrated</span>
            </div>
            {/* Hidden Collectible Tiki Package */}
            <button
              onClick={() => {
                soundFx.playCash()
                if (typeof window !== 'undefined') {
                  const stored = JSON.parse(localStorage.getItem('gta_hidden_packages') || '[]')
                  if (!stored.includes('Ocean Beach Floral Tiki')) {
                    stored.push('Ocean Beach Floral Tiki')
                    localStorage.setItem('gta_hidden_packages', JSON.stringify(stored))
                  }
                  window.dispatchEvent(new CustomEvent('gta_package_found', { detail: 'Ocean Beach Floral Tiki' }))
                }
              }}
              className="px-3 py-2 rounded-xl bg-deep-teal/40 border border-deep-teal hover:border-sunset-orange/50 hover:scale-110 transition-transform cursor-pointer group"
              title="Secret Collectible Tiki Package! Tap to collect"
              aria-label="Collect secret package"
            >
              <span className="text-sm select-none group-hover:animate-bounce">🗿</span>
            </button>
          </div>
        </div>

        {/* 2. Search & Controls */}
        <div className="bg-deep-teal/30 p-6 rounded-3xl border border-deep-teal/60 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, alias, occupation, voice actor, quotes..."
                className="w-full bg-midnight-teal/80 border border-deep-teal rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-neon-flamingo transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-off-white/40 hover:text-off-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Role Classification Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-midnight-teal/80 border border-deep-teal rounded-2xl w-full md:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Roster (10)' },
                { id: 'Protagonist', label: 'Protagonists' },
                { id: 'Major', label: 'Major Figures' },
                { id: 'Supporting', label: 'Contacts & Allies' },
                { id: 'Antagonist', label: 'Cartel & Law' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRoleFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition whitespace-nowrap ${
                    roleFilter === tab.id
                      ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-bold shadow'
                      : 'text-off-white/60 hover:text-off-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((char) => {
            const hasImgError = imgErrors[char.id]
            const isGTA6 = char.game === 'GTA 6'

            return (
              <div
                key={char.id}
                onClick={() => {
                  soundFx.playClick()
                  setSelectedChar(char)
                  setModalTab('overview')
                }}
                className="group bg-deep-teal/25 hover:bg-deep-teal/45 border border-deep-teal/70 hover:border-neon-flamingo/50 rounded-3xl p-5 space-y-4 transition duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,61,129,0.15)]"
              >
                <div className="space-y-4">
                  {/* Portrait & Badges */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-midnight-teal border border-deep-teal/60 flex items-center justify-center">
                    {!hasImgError && char.imageUrl ? (
                      <img
                        src={char.imageUrl}
                        alt={char.name}
                        onError={() => handleImgError(char.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F2E33] to-[#0B1E23] p-4 text-center">
                        <span className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
                          {char.name.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-off-white/40 mt-1 uppercase">
                          {char.name}
                        </span>
                      </div>
                    )}

                    {/* Game badge */}
                    <div className="absolute top-2 left-2">
                      <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-md shadow-md bg-neon-flamingo text-white">
                        GTA VI
                      </span>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                          char.profile.status === 'Alive'
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : char.profile.status === 'Deceased'
                            ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                            : 'bg-slate-500/20 border-slate-500/40 text-slate-300'
                        }`}
                      >
                        {char.profile.status}
                      </span>
                    </div>
                  </div>

                  {/* Names & Role */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display uppercase text-lg text-off-white group-hover:text-neon-flamingo transition truncate">
                        {char.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase text-palm-teal font-semibold px-2 py-0.5 bg-palm-teal/10 rounded-md border border-palm-teal/20 shrink-0">
                        {char.roleCategory}
                      </span>
                    </div>
                    {char.nickname && (
                      <p className="text-xs text-sunset-orange font-mono">
                        &quot;{char.nickname}&quot;
                      </p>
                    )}
                  </div>

                  {/* Occupation */}
                  <p className="text-xs text-off-white/60 line-clamp-2 leading-relaxed">
                    {char.profile.occupation}
                  </p>

                  {/* Key Stats Bar Preview */}
                  {char.profile.statistics && (
                    <div className="space-y-1.5 pt-2 border-t border-deep-teal/40 text-[10px] font-mono">
                      <div>
                        <div className="flex justify-between text-off-white/50 mb-0.5">
                          <span>Combat</span>
                          <span>{char.profile.statistics.combatSkills}/100</span>
                        </div>
                        <div className="w-full bg-midnight-teal rounded-full h-1">
                          <div
                            className="bg-neon-flamingo h-1 rounded-full"
                            style={{ width: `${char.profile.statistics.combatSkills}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-off-white/50 mb-0.5">
                          <span>Driving</span>
                          <span>{char.profile.statistics.drivingSkills}/100</span>
                        </div>
                        <div className="w-full bg-midnight-teal rounded-full h-1">
                          <div
                            className="bg-palm-teal h-1 rounded-full"
                            style={{ width: `${char.profile.statistics.drivingSkills}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Inspect Link */}
                <div className="pt-3 border-t border-deep-teal/40 flex items-center justify-between text-xs font-mono uppercase text-off-white/50 group-hover:text-sunset-orange transition">
                  <span>View Dossier</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredCharacters.length === 0 && (
          <div className="text-center py-16 space-y-3 bg-deep-teal/20 rounded-3xl border border-deep-teal">
            <Users className="w-12 h-12 text-off-white/30 mx-auto" />
            <h3 className="text-lg font-bold text-off-white">No Profiles Found</h3>
            <p className="text-xs text-off-white/50 max-w-sm mx-auto">
              No character matches &quot;{search}&quot;. Try adjusting your keywords or clearing active filters.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setRoleFilter('all')
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-neon-flamingo text-white text-xs font-mono uppercase font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* 4. Interactive Character Detail Modal */}
      {selectedChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedChar(null)}
          />

          {/* Modal Card */}
          <div className="relative bg-midnight-teal border border-deep-teal/90 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl space-y-6 p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedChar(null)}
              aria-label="Close dossier"
              className="absolute top-6 right-6 p-2 rounded-full bg-deep-teal/40 hover:bg-deep-teal text-off-white/70 hover:text-off-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-deep-teal border border-deep-teal/80 shrink-0 flex items-center justify-center">
                {!imgErrors[selectedChar.id] && selectedChar.imageUrl ? (
                  <img
                    src={selectedChar.imageUrl}
                    alt={selectedChar.name}
                    onError={() => handleImgError(selectedChar.id)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F2E33] to-[#0B1E23] text-center p-2">
                    <span className="text-3xl font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
                      {selectedChar.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-md bg-neon-flamingo text-white">
                    GTA VI
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md bg-deep-teal border border-deep-teal/80 text-palm-teal font-semibold">
                    {selectedChar.roleCategory}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      selectedChar.profile.status === 'Alive'
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : selectedChar.profile.status === 'Deceased'
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                        : 'bg-slate-500/20 border-slate-500/40 text-slate-300'
                    }`}
                  >
                    {selectedChar.profile.status}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wider text-off-white">
                  {selectedChar.name}
                </h2>
                {selectedChar.nickname && (
                  <p className="text-sm text-sunset-orange font-mono">
                    Alias: &quot;{selectedChar.nickname}&quot;
                  </p>
                )}
                <p className="text-xs sm:text-sm text-off-white/70">
                  {selectedChar.profile.occupation}
                </p>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-deep-teal/70 pb-3 overflow-x-auto text-xs font-mono uppercase">
              {[
                { id: 'overview', label: 'Overview', icon: Briefcase },
                { id: 'stats', label: 'Combat Analytics', icon: Activity },
                { id: 'relationships', label: 'Relationships', icon: Swords },
                { id: 'quotes', label: 'Quotes', icon: Quote },
                { id: 'outfits', label: 'Wardrobe', icon: Shirt },
                { id: 'missions', label: 'Missions', icon: MapPin },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick()
                      setModalTab(tab.id as typeof modalTab)
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition whitespace-nowrap ${
                      modalTab === tab.id
                        ? 'bg-neon-flamingo/20 border border-neon-flamingo/40 text-neon-flamingo font-bold'
                        : 'text-off-white/50 hover:text-off-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Modal Body Content */}
            <div className="min-h-[220px]">
              {/* TAB 1: OVERVIEW */}
              {modalTab === 'overview' && (
                <div className="space-y-6">
                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-deep-teal/20 border border-deep-teal/60 text-xs">
                    <div>
                      <span className="text-off-white/40 block text-[10px] font-mono uppercase">Full Legal Name</span>
                      <span className="text-off-white font-medium">{selectedChar.profile.fullName || selectedChar.name}</span>
                    </div>
                    <div>
                      <span className="text-off-white/40 block text-[10px] font-mono uppercase">Age / Era</span>
                      <span className="text-off-white font-medium">{selectedChar.profile.age}</span>
                    </div>
                    <div>
                      <span className="text-off-white/40 block text-[10px] font-mono uppercase">Voice Actor</span>
                      <span className="text-palm-teal font-medium">{selectedChar.profile.voiceActor}</span>
                    </div>
                    <div>
                      <span className="text-off-white/40 block text-[10px] font-mono uppercase">Residence</span>
                      <span className="text-off-white font-medium">{selectedChar.profile.residence}</span>
                    </div>
                  </div>

                  {/* Affiliations */}
                  {selectedChar.profile.affiliations?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-off-white/50 tracking-wider mb-2">
                        Criminal Factions &amp; Affiliations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedChar.profile.affiliations.map((affil) => (
                          <span
                            key={affil}
                            className="px-2.5 py-1 rounded-lg bg-deep-teal border border-palm-teal/30 text-palm-teal text-xs font-mono"
                          >
                            {affil}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tactical Assessment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-deep-teal/20 border border-deep-teal/40 space-y-2">
                      <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> Strengths
                      </h4>
                      <ul className="text-xs text-off-white/70 space-y-1 list-disc list-inside">
                        {selectedChar.profile.strengths?.map((s) => (
                          <li key={s}>{s}</li>
                        )) || <li>Classified combat expertise.</li>}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-deep-teal/20 border border-deep-teal/40 space-y-2">
                      <h4 className="text-xs font-mono uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" /> Tactical Vulnerabilities
                      </h4>
                      <ul className="text-xs text-off-white/70 space-y-1 list-disc list-inside">
                        {selectedChar.profile.weaknesses?.map((w) => (
                          <li key={w}>{w}</li>
                        )) || <li>No notable vulnerabilities on record.</li>}
                      </ul>
                    </div>
                  </div>

                  {/* Behavioral Profile */}
                  <div className="space-y-2 text-xs text-off-white/70 leading-relaxed">
                    <h4 className="text-xs font-mono uppercase text-off-white/50 tracking-wider">
                      Psychological &amp; Operational Summary
                    </h4>
                    <p><strong>Leadership:</strong> {selectedChar.profile.leadership}</p>
                    <p><strong>Intelligence:</strong> {selectedChar.profile.intelligence}</p>
                    {selectedChar.profile.clothing && (
                      <p><strong>Signature Attire:</strong> {selectedChar.profile.clothing}</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: COMBAT ANALYTICS */}
              {modalTab === 'stats' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(selectedChar.profile.statistics || {}).map(([key, val]) => {
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
                      return (
                        <div
                          key={key}
                          className="p-3 rounded-2xl bg-deep-teal/20 border border-deep-teal/50 space-y-1.5"
                        >
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-off-white/70">{label}</span>
                            <span className="text-off-white font-bold">{val}/100</span>
                          </div>
                          <div className="w-full bg-midnight-teal rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${getStatColor(val as number)}`}
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: RELATIONSHIPS */}
              {modalTab === 'relationships' && (
                <div className="space-y-3">
                  {selectedChar.profile.relationships?.length ? (
                    selectedChar.profile.relationships.map((rel, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-deep-teal/25 border border-deep-teal/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <strong className="text-off-white text-sm">{rel.targetName}</strong>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sunset-orange/20 border border-sunset-orange/30 text-sunset-orange">
                              {rel.relationshipType}
                            </span>
                          </div>
                          <p className="text-off-white/60">{rel.details}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-off-white/50 text-center py-8">
                      No documented interpersonal records in dossier.
                    </p>
                  )}
                </div>
              )}

              {/* TAB 4: MEMORABLE QUOTES */}
              {modalTab === 'quotes' && (
                <div className="space-y-3">
                  {selectedChar.profile.memorableQuotes?.length ? (
                    selectedChar.profile.memorableQuotes.map((q, idx) => (
                      <blockquote
                        key={idx}
                        className="p-4 rounded-2xl bg-deep-teal/25 border-l-4 border-l-neon-flamingo border border-deep-teal/60 text-xs sm:text-sm text-off-white/90 italic flex gap-3"
                      >
                        <Quote className="w-5 h-5 text-neon-flamingo shrink-0" />
                        <span>{q}</span>
                      </blockquote>
                    ))
                  ) : (
                    <p className="text-xs text-off-white/50 text-center py-8">
                      No recorded audio quotes for this operative.
                    </p>
                  )}
                </div>
              )}

              {/* TAB 5: SPECIAL OUTFITS */}
              {modalTab === 'outfits' && (
                <div className="space-y-4">
                  {selectedChar.profile.specialOutfits?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedChar.profile.specialOutfits.map((outfit) => (
                        <div
                          key={outfit.id}
                          className="p-4 rounded-2xl bg-deep-teal/25 border border-deep-teal/70 space-y-3 flex flex-col justify-between"
                        >
                          <div className="flex gap-3 items-center">
                            {outfit.imageUrl && (
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-midnight-teal shrink-0 border border-deep-teal">
                                <img
                                  src={outfit.imageUrl}
                                  alt={outfit.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <h5 className="font-bold text-off-white text-xs sm:text-sm">
                                {outfit.name}
                              </h5>
                              <p className="text-[10px] font-mono text-palm-teal">
                                {outfit.situation}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-off-white/60 leading-relaxed">
                            {outfit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-off-white/50 text-center py-8">
                      No special wardrobe variants cataloged for this operative.
                    </p>
                  )}
                </div>
              )}

              {/* TAB 6: MISSIONS & APPEARANCES */}
              {modalTab === 'missions' && (
                <div className="space-y-4">
                  {selectedChar.profile.missions?.length ? (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-off-white/50 tracking-wider mb-2">
                        Key Campaign Operations &amp; Missions
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedChar.profile.missions.map((m) => (
                          <div
                            key={m}
                            className="px-3 py-2 rounded-xl bg-deep-teal/20 border border-deep-teal text-xs text-off-white font-mono flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sunset-orange" />
                            <span className="truncate">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-off-white/50 text-center py-8">
                      Classified mission log.
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

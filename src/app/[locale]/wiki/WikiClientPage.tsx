'use client'

import { useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Map, Users, Car, Zap } from 'lucide-react'
import Link from 'next/link'

type POIType = 'landmark' | 'mission' | 'easter-egg'

interface POI {
  name: string
  x: number
  y: number
  type: POIType
  region: string
  description: string
  coordinates: string
  icon: string
}

const POIS: POI[] = [
  {
    name: 'Vice City International Airport',
    x: 22,
    y: 78,
    type: 'landmark',
    region: 'Vice City',
    description:
      'Primary airport serving the Vice City metro. High-security hangar access and tarmac heist missions.',
    coordinates: 'VC-8012-AP',
    icon: '✈️',
  },
  {
    name: 'Sunken Submarine Wreck',
    x: 55,
    y: 91,
    type: 'easter-egg',
    region: 'Ocean',
    description:
      'Old sub resting at the ocean bed - loot caches, rusty skeletons, and an encrypted radio signal.',
    coordinates: 'OC-4412-SUB',
    icon: '🌊',
  },
  {
    name: 'Jason & Lucia Safehouse',
    x: 42,
    y: 55,
    type: 'landmark',
    region: 'Leonida',
    description:
      'Main hideout early in the campaign. Weapon lockers, planning boards, and a stolen car stash.',
    coordinates: 'SH-3109-VC',
    icon: '🏠',
  },
  {
    name: 'Grassrivers Swamp',
    x: 78,
    y: 35,
    type: 'mission',
    region: 'Grassrivers',
    description:
      'Alligator-infested swampland. Airboat chases, hidden drug caches, side missions off the beaten path.',
    coordinates: 'GL-1244-SW',
    icon: '🐊',
  },
  {
    name: 'Leonida Keys Lighthouse',
    x: 88,
    y: 82,
    type: 'easter-egg',
    region: 'Leonida Keys',
    description:
      'Historic lighthouse with a cryptic riddle on the interior wall. Rare weapon spawn at dusk.',
    coordinates: 'LK-0012-LH',
    icon: '🔭',
  },
  {
    name: 'Vice City Beach Strip',
    x: 18,
    y: 62,
    type: 'landmark',
    region: 'Vice City',
    description:
      'Iconic neon-lit beachfront. Nightclubs, street races, open-air concerts confirmed in trailer footage.',
    coordinates: 'VC-0031-BS',
    icon: '🌴',
  },
  {
    name: 'Port Gellhorn Docks',
    x: 35,
    y: 45,
    type: 'mission',
    region: 'Port Gellhorn',
    description:
      'Industrial docks. Smuggling operations, warehouse heists, container-ship mission area.',
    coordinates: 'PG-0991-DK',
    icon: '⚓',
  },
  {
    name: 'Mount Kalaga Summit',
    x: 65,
    y: 20,
    type: 'landmark',
    region: 'Mount Kalaga',
    description:
      'Highest elevation in Leonida. Paraglider spawn, scenic vista, hidden cave on eastern face.',
    coordinates: 'MK-0001-SM',
    icon: '⛰️',
  },
  {
    name: 'Ambrosia Suburbs',
    x: 50,
    y: 40,
    type: 'mission',
    region: 'Ambrosia',
    description:
      'Wealthy gated neighbourhood. Mansion heist planning, social-engineering missions.',
    coordinates: 'AM-2201-SB',
    icon: '🏡',
  },
  {
    name: 'Leonida Grand Prix Circuit',
    x: 30,
    y: 65,
    type: 'easter-egg',
    region: 'Vice City',
    description:
      'Abandoned F1-style circuit used for illegal street racing. Hidden trophy in the old pit lane.',
    coordinates: 'VC-7788-GP',
    icon: '🏎️',
  },
]

const CHARACTERS = [
  {
    name: 'Lucia',
    role: 'Protagonist',
    pronouns: 'She/Her',
    status: 'Confirmed' as const,
    background:
      'A street-smart criminal from Leonida making a fresh start. Deeply loyal and dangerously resourceful. Confirmed as the first female GTA protagonist - first seen in a prison uniform in Trailer 1.',
    actor: 'Manni L. Perez',
    traits: ['Adaptable', 'Street-smart', 'Loyal', 'Fearless'],
    gradientFrom: '#FF3D81',
    gradientTo: '#FF7A45',
    initials: 'LU',
  },
  {
    name: 'Jason',
    role: 'Protagonist',
    pronouns: 'He/Him',
    status: 'Confirmed' as const,
    background:
      "A pragmatic wheelman and career criminal. Quiet, calculated, fiercely protective. Shown working as a duo with Lucia in every trailer - a Bonnie-and-Clyde dynamic at the story's center.",
    actor: 'Anthony Starr (Rumored)',
    traits: ['Calculated', 'Loyal', 'Experienced', 'Resourceful'],
    gradientFrom: '#1FA9A0',
    gradientTo: '#0F2E33',
    initials: 'JA',
  },
  {
    name: 'Cartel Boss',
    role: 'Antagonist',
    pronouns: 'Unknown',
    status: 'Unconfirmed' as const,
    background:
      'Shadowy criminal kingpin believed to control narcotics across the Leonida Keys and Port Gellhorn docks. Referenced indirectly in trailer dialogue - full reveal expected at launch.',
    actor: 'TBA',
    traits: ['Ruthless', 'Powerful', 'Influential'],
    gradientFrom: '#FF7A45',
    gradientTo: '#FF3D81',
    initials: '??',
  },
  {
    name: 'Pegorino Link',
    role: 'Supporting Villain',
    pronouns: 'Unknown',
    status: 'Speculated' as const,
    background:
      "Community speculation links a Pegorino family member expanding New Liberty City mob operations into Vice City's nightclub and smuggling circuits. No official confirmation yet.",
    actor: 'TBA',
    traits: ['Mob-connected', 'Expansionist'],
    gradientFrom: '#0F2E33',
    gradientTo: '#0B1E23',
    initials: 'PG',
  },
]

const VEHICLES = [
  {
    name: 'Grotti Cheetah',
    class: 'Super',
    speed: 9.8,
    handling: 9.2,
    location: 'Downtown Vice City',
    desc: 'Mid-engine Italian exotic. Confirmed in Trailer 2 chase leaving Vice City Marina.',
    icon: '🏎️',
  },
  {
    name: 'Pegassi Infernus',
    class: 'Super',
    speed: 9.6,
    handling: 8.9,
    location: 'Leonida Keys Resort',
    desc: 'Lamborghini-inspired speedster. Spotted in golden-hour footage near the Keys bridge.',
    icon: '🚗',
  },
  {
    name: 'Bravado Banshee',
    class: 'Sports',
    speed: 8.5,
    handling: 8.2,
    location: 'Airport Drag Strip',
    desc: 'American muscle meets German engineering. Drift variant seen at the port.',
    icon: '🚘',
  },
  {
    name: 'Dinka Double-T',
    class: 'Motorcycle',
    speed: 8.8,
    handling: 9.5,
    location: 'Vice Beach Strip',
    desc: 'Sport bike confirmed in beach-strip scene. Overhauled cornering vs. GTA V.',
    icon: '🏍️',
  },
  {
    name: 'Declasse Tampa',
    class: 'Muscle',
    speed: 7.9,
    handling: 7.5,
    location: 'Ambrosia Suburbs',
    desc: 'Classic American muscle. Retro styling spotted in suburban neighbourhood sequence.',
    icon: '🚙',
  },
  {
    name: 'Buckingham Luxor',
    class: 'Aircraft',
    speed: 6.5,
    handling: 7.0,
    location: 'Vice City Airport',
    desc: 'Luxury jet seen taxiing. Likely usable for inter-map fast travel or heist getaways.',
    icon: '✈️',
  },
]

const FEATURE_GROUPS = [
  {
    category: 'Gameplay',
    icon: '🎮',
    features: [
      {
        title: 'Dual Protagonist Swap',
        status: 'Confirmed',
        desc: "Switch between Jason and Lucia in real-time, like GTA V's Michael/Trevor mechanic.",
      },
      {
        title: 'Advanced NPC AI',
        status: 'Confirmed',
        desc: 'NPCs react to weather, time of day, crime history, and player reputation dynamically.',
      },
      {
        title: 'Tactical Police Response',
        status: 'Confirmed',
        desc: 'Law enforcement uses tactical cordons, spike strips, and air support at higher wanted levels.',
      },
      {
        title: 'In-game Social Media',
        status: 'Confirmed',
        desc: 'A mock social platform tracks in-world events and community reputation.',
      },
      {
        title: 'Property Ownership',
        status: 'Rumoured',
        desc: 'Safehouse and business purchase mechanic expanded significantly from GTA V.',
      },
    ],
  },
  {
    category: 'World',
    icon: '🌎',
    features: [
      {
        title: 'Day/Night + Dynamic Weather',
        status: 'Confirmed',
        desc: 'Hurricanes, tropical storms, flooding in swamp regions - full weather simulation.',
      },
      {
        title: 'Wildlife Ecosystem',
        status: 'Confirmed',
        desc: 'Alligators, panthers, marine life - all reacting to the player and environment.',
      },
      {
        title: 'Dynamic Radio Network',
        status: 'Confirmed',
        desc: 'Radio stations reference in-game events and evolve with story progress.',
      },
      {
        title: 'Destructible Environments',
        status: 'Rumoured',
        desc: 'Enhanced physics may allow partial building/prop destruction beyond GTA V.',
      },
      {
        title: 'Underwater World',
        status: 'Confirmed',
        desc: 'Expansive ocean floor with wrecks, marine life, and hidden collectibles.',
      },
    ],
  },
  {
    category: 'Regions',
    icon: '🗺️',
    features: [
      {
        title: 'Vice City',
        status: 'Confirmed',
        desc: 'Miami-inspired coastal metropolis - the central hub of Leonida.',
      },
      {
        title: 'Port Gellhorn',
        status: 'Confirmed',
        desc: 'Industrial docklands on the western coast. Smuggling and heist territory.',
      },
      {
        title: 'Leonida Keys',
        status: 'Confirmed',
        desc: 'Chain of tropical islands south of the main landmass. Boat-heavy travel.',
      },
      {
        title: 'Grassrivers',
        status: 'Confirmed',
        desc: 'Everglades-like swampland region, north of Vice City.',
      },
      {
        title: 'Mount Kalaga',
        status: 'Confirmed',
        desc: 'Mountainous national park. Highest point in Leonida.',
      },
    ],
  },
]

type Tab = 'map' | 'characters' | 'vehicles' | 'features'
type FilterType = 'all' | 'landmark' | 'mission' | 'easter-egg'

export default function WikiClientPage({ locale }: { locale: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('map')
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(POIS[0])
  const [filter, setFilter] = useState<FilterType>('all')
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const filteredPOIS = POIS.filter((poi) => filter === 'all' || poi.type === filter)

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    setScale((prev) => Math.min(3, Math.max(0.5, prev - event.deltaY * 0.001)))
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    dragStart.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart.current) return

    setPan({
      x: dragStart.current.panX + (event.clientX - dragStart.current.x),
      y: dragStart.current.panY + (event.clientY - dragStart.current.y),
    })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    dragStart.current = null
  }

  const resetView = () => {
    setPan({ x: 0, y: 0 })
    setScale(1)
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-5xl sm:text-7xl font-display uppercase tracking-widest bg-gradient-to-r from-neon-flamingo to-sunset-orange bg-clip-text text-transparent">
            WIKI & DATABASE
          </h1>
          <p className="text-sm text-off-white/60 max-w-xl mx-auto">
            Community-compiled intel on Leonida - characters, locations, vehicles, and confirmed features.
          </p>
          <div className="h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-palm-teal/40 to-transparent" />
        </div>

        <div
          role="tablist"
          aria-label="Wiki sections"
          className="flex flex-wrap items-center justify-center gap-2 bg-deep-teal/40 p-1.5 rounded-2xl border border-deep-teal max-w-lg mx-auto"
        >
          {[
            { id: 'map' as const, label: 'Interactive Map', icon: <Map className="w-4 h-4" /> },
            { id: 'characters' as const, label: 'Characters', icon: <Users className="w-4 h-4" /> },
            { id: 'vehicles' as const, label: 'Vehicles', icon: <Car className="w-4 h-4" /> },
            { id: 'features' as const, label: 'Features', icon: <Zap className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white shadow-lg scale-105'
                  : 'text-off-white/50 hover:text-off-white'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-deep-teal/20 rounded-3xl p-6 sm:p-8 border border-deep-teal/80 shadow-xl min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'map' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => setScale((value) => Math.min(3, value + 0.25))}
                        className="px-3 py-1 bg-deep-teal border border-deep-teal/60 text-off-white rounded-lg text-sm hover:bg-palm-teal/20 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setScale((value) => Math.max(0.5, value - 0.25))}
                        className="px-3 py-1 bg-deep-teal border border-deep-teal/60 text-off-white rounded-lg text-sm hover:bg-palm-teal/20 transition"
                      >
                        -
                      </button>
                      <button
                        onClick={resetView}
                        className="px-3 py-1 bg-deep-teal border border-deep-teal/60 text-off-white rounded-lg text-sm hover:bg-palm-teal/20 transition"
                      >
                        Reset
                      </button>
                      <span className="text-xs font-mono text-off-white/40 ml-auto">
                        {Math.round(scale * 100)}%
                      </span>
                    </div>

                    <div
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-palm-teal/20 shadow-2xl select-none touch-none ${
                        isDragging ? 'cursor-grabbing' : 'cursor-grab'
                      }`}
                      onWheel={handleWheel}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                          transformOrigin: 'center center',
                          transition: isDragging ? 'none' : 'transform 0.1s',
                        }}
                      >
                        <div
                          role="img"
                          aria-label="Leonida Community Map (fan-made, not official)"
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: "url('https://i.imgur.com/DbsSI4V.jpeg')" }}
                        />
                        <div className="absolute inset-0 bg-midnight-teal bg-[radial-gradient(#1fa9a0_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

                        {filteredPOIS.map((poi) => (
                          <button
                            key={poi.name}
                            aria-label={poi.name}
                            onClick={(event) => {
                              event.stopPropagation()
                              setSelectedPOI(poi)
                            }}
                            style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-200 shadow-lg group/pin z-10 ${
                              poi.type === 'landmark'
                                ? 'bg-palm-teal/80 border-palm-teal'
                                : poi.type === 'easter-egg'
                                  ? 'bg-neon-flamingo/80 border-neon-flamingo'
                                  : 'bg-sunset-orange/80 border-sunset-orange'
                            } ${
                              selectedPOI?.name === poi.name
                                ? 'scale-125 ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                : 'hover:scale-110'
                            }`}
                          >
                            {poi.icon}
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-midnight-teal border border-deep-teal text-off-white text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover/pin:opacity-100 transition-opacity z-20">
                              {poi.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      <span className="absolute bottom-2 left-2 text-[9px] font-mono text-off-white/40 bg-black/50 px-2 py-0.5 rounded z-10 pointer-events-none">
                        Fan-made map - not official Rockstar content
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      {(['all', 'landmark', 'mission', 'easter-egg'] as const).map((filterType) => (
                        <button
                          key={filterType}
                          onClick={() => setFilter(filterType)}
                          className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all ${
                            filter === filterType
                              ? filterType === 'all'
                                ? 'bg-off-white/10 border-off-white/30 text-off-white'
                                : filterType === 'landmark'
                                  ? 'bg-palm-teal/20 border-palm-teal text-palm-teal'
                                  : filterType === 'mission'
                                    ? 'bg-sunset-orange/20 border-sunset-orange text-sunset-orange'
                                    : 'bg-neon-flamingo/20 border-neon-flamingo text-neon-flamingo'
                              : 'border-deep-teal text-off-white/40 hover:text-off-white/70'
                          }`}
                        >
                          {filterType === 'all'
                            ? 'All'
                            : filterType === 'easter-egg'
                              ? 'Easter Eggs'
                              : `${filterType.charAt(0).toUpperCase()}${filterType.slice(1)}s`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 flex flex-col">
                    {selectedPOI && (
                      <div className="bg-midnight-teal/60 border border-deep-teal rounded-2xl p-5 space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                              selectedPOI.type === 'landmark'
                                ? 'bg-palm-teal/20 border-palm-teal/40 text-palm-teal'
                                : selectedPOI.type === 'easter-egg'
                                  ? 'bg-neon-flamingo/20 border-neon-flamingo/40 text-neon-flamingo'
                                  : 'bg-sunset-orange/20 border-sunset-orange/40 text-sunset-orange'
                            }`}
                          >
                            {selectedPOI.type}
                          </span>
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border border-deep-teal text-off-white/40">
                            {selectedPOI.region}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{selectedPOI.icon}</span>
                          <h3 className="text-lg font-bold uppercase text-off-white leading-tight">
                            {selectedPOI.name}
                          </h3>
                        </div>
                        <p className="text-[10px] font-mono text-sunset-orange">
                          COORD: {selectedPOI.coordinates}
                        </p>
                        <p className="text-xs text-off-white/70 leading-relaxed">
                          {selectedPOI.description}
                        </p>
                        <Link
                          href={`/${locale}/library?q=${encodeURIComponent(selectedPOI.name)}`}
                          className="block text-center py-2 px-4 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition"
                        >
                          Find Videos -&gt;
                        </Link>
                      </div>
                    )}

                    <div className="flex-1 overflow-y-auto space-y-1 max-h-64 pr-1">
                      {filteredPOIS.map((poi) => (
                        <button
                          key={poi.name}
                          onClick={() => setSelectedPOI(poi)}
                          className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                            selectedPOI?.name === poi.name
                              ? 'bg-palm-teal/20 border border-palm-teal/40 text-off-white'
                              : 'text-off-white/50 hover:text-off-white hover:bg-deep-teal/40'
                          }`}
                        >
                          <span>{poi.icon}</span>
                          <span className="truncate">{poi.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'characters' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CHARACTERS.map((character) => (
                    <div
                      key={character.name}
                      className="bg-midnight-teal/50 border border-deep-teal hover:border-palm-teal/30 rounded-2xl p-5 space-y-4 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(31,169,160,0.15)] transition-all duration-300"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-display text-xl mx-auto"
                        style={{
                          background: `linear-gradient(135deg, ${character.gradientFrom}, ${character.gradientTo})`,
                        }}
                      >
                        {character.initials}
                      </div>
                      <div className="text-center">
                        <span
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                            character.status === 'Confirmed'
                              ? 'bg-green-500/10 border-green-500/30 text-green-400'
                              : character.status === 'Unconfirmed'
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                          }`}
                        >
                          {character.status}
                        </span>
                      </div>
                      <div className="text-center">
                        <h3 className="font-display uppercase text-off-white text-lg tracking-wide">
                          {character.name}
                        </h3>
                        <p className="text-[10px] font-mono text-off-white/50 uppercase">
                          {character.role}
                        </p>
                        <p className="text-[10px] font-mono text-off-white/30">
                          {character.pronouns}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {character.traits.map((trait) => (
                          <span
                            key={trait}
                            className="bg-deep-teal border border-palm-teal/30 text-palm-teal text-[9px] font-mono px-2 py-0.5 rounded-full"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-off-white/60 leading-relaxed">
                        {character.background}
                      </p>
                      <div className="border-t border-deep-teal/40 pt-3 text-[10px] font-mono text-off-white/30 uppercase">
                        Voice: <strong className="text-off-white/50">{character.actor}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'vehicles' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {VEHICLES.map((vehicle) => (
                    <div
                      key={vehicle.name}
                      className="bg-deep-teal/40 border border-deep-teal hover:border-palm-teal/40 rounded-2xl p-5 space-y-4 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-4xl">{vehicle.icon}</span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-palm-teal/20 border border-palm-teal/30 text-palm-teal rounded-full">
                          {vehicle.class}
                        </span>
                      </div>
                      <h3 className="font-display uppercase text-off-white text-xl tracking-wide">
                        {vehicle.name}
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[10px] font-mono text-off-white/50 mb-1">
                            <span>Speed</span>
                            <span>{vehicle.speed}/10</span>
                          </div>
                          <div className="w-full bg-midnight-teal rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-palm-teal to-neon-flamingo h-1.5 rounded-full"
                              style={{ width: `${vehicle.speed * 10}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] font-mono text-off-white/50 mb-1">
                            <span>Handling</span>
                            <span>{vehicle.handling}/10</span>
                          </div>
                          <div className="w-full bg-midnight-teal rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-palm-teal to-sunset-orange h-1.5 rounded-full"
                              style={{ width: `${vehicle.handling * 10}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-off-white/40">{vehicle.location}</p>
                      <p className="text-xs text-off-white/60 leading-relaxed">{vehicle.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FEATURE_GROUPS.map((group) => (
                    <div
                      key={group.category}
                      className="bg-deep-teal/30 rounded-2xl p-6 border border-deep-teal space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{group.icon}</span>
                        <h3 className="font-display uppercase text-off-white tracking-wider">
                          {group.category}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {group.features.map((feature) => (
                          <div key={feature.title} className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-off-white">{feature.title}</span>
                              <span
                                className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                                  feature.status === 'Confirmed'
                                    ? 'bg-palm-teal/20 border-palm-teal/40 text-palm-teal'
                                    : 'bg-sunset-orange/20 border-sunset-orange/40 text-sunset-orange'
                                }`}
                              >
                                {feature.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-off-white/50 leading-relaxed">
                              {feature.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

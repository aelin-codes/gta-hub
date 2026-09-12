'use client'

import { useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Map, Users, Car, Zap, Crosshair, ArrowRight, ExternalLink, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { CHARACTERS } from '@/data/characters'
import { soundFx } from '@/components/GtaSoundEffects'

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
      'Primary airport serving the Vice City metro. High-security commercial tarmac, private executive hangars, and cargo smuggling routes.',
    coordinates: 'VC-8012-AP',
    icon: '✈️',
  },
  {
    name: 'Sunken Cargo Freighter Wreck',
    x: 55,
    y: 91,
    type: 'easter-egg',
    region: 'Ocean Reefs',
    description:
      'Old narcotics cargo ship resting on the coral bed — underwater loot containers, speargun diving spot, and encrypted radio transmission beacon.',
    coordinates: 'OC-4412-SUB',
    icon: '🌊',
  },
  {
    name: 'Jason & Lucia Safehouse Motel',
    x: 42,
    y: 55,
    type: 'landmark',
    region: 'Leonida Border',
    description:
      'Main hideout early in the campaign. Weapon lockers, trunk planning boards, stolen cash stacks, and getaway vehicle parking.',
    coordinates: 'SH-3109-VC',
    icon: '🏠',
  },
  {
    name: 'Grassrivers Sawgrass Swamp',
    x: 78,
    y: 35,
    type: 'mission',
    region: 'Grassrivers',
    description:
      'Alligator-infested swampland. High-speed airboat pursuits, hidden drug laboratories, and off-grid poacher cabins off the radar.',
    coordinates: 'GL-1244-SW',
    icon: '🐊',
  },
  {
    name: 'Leonida Keys Historic Lighthouse',
    x: 88,
    y: 82,
    type: 'easter-egg',
    region: 'Leonida Keys',
    description:
      'Historic 19th-century lighthouse with cryptic maritime markings. Rare heavy marksman weapon spawn on the lantern gallery at sunset.',
    coordinates: 'LK-0012-LH',
    icon: '🔭',
  },
  {
    name: 'Vice Beach Strip & Ocean Drive',
    x: 18,
    y: 62,
    type: 'landmark',
    region: 'Vice City',
    description:
      'Iconic neon-lit Art Deco boulevard. Vibrant nightlife, street racing takeovers, outdoor fitness parks, and luxury supercar showrooms.',
    coordinates: 'VC-0031-BS',
    icon: '🌴',
  },
  {
    name: 'Port Gellhorn Container Docks',
    x: 35,
    y: 45,
    type: 'mission',
    region: 'Port Gellhorn',
    description:
      'Industrial deep-water port. High-stakes container smuggling, freight train heists, warehouse shootouts, and dockworker union territory.',
    coordinates: 'PG-0991-DK',
    icon: '⚓',
  },
  {
    name: 'Mount Kalaga Peak',
    x: 65,
    y: 20,
    type: 'landmark',
    region: 'Mount Kalaga',
    description:
      'Highest topographical point in Leonida. Mountain bike trails, paraglider launches, radio relay towers, and hidden cave cache on the eastern cliff face.',
    coordinates: 'MK-0001-SM',
    icon: '⛰️',
  },
  {
    name: 'Ambrosia Gated Country Estates',
    x: 50,
    y: 40,
    type: 'mission',
    region: 'Ambrosia',
    description:
      'Ultra-wealthy suburban enclave. Luxury mansion robbery targets, equestrian stables, private security patrols, and high-society infiltration scores.',
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
      'Repurposed speedway utilized for midnight underground drift meets. Collectible racing trophy hidden inside the abandoned pit telemetry tower.',
    coordinates: 'VC-7788-GP',
    icon: '🏎️',
  },
  {
    name: 'Starfish Island Luxury Enclave',
    x: 24,
    y: 60,
    type: 'landmark',
    region: 'Vice City',
    description:
      'Historical billionaire compound district once dominated by the Diaz and Vercetti syndicates. Gated waterway estates with private helipads.',
    coordinates: 'SI-5501-EST',
    icon: '🏰',
  },
  {
    name: 'Kelly County Mudfest Bog',
    x: 72,
    y: 42,
    type: 'mission',
    region: 'Grassrivers',
    description:
      'Off-road arena for monster trucks, lifted 4x4 pickups, and mud boggers. High-energy festival crowds, illegal bets, and brawl side-missions.',
    coordinates: 'KC-9092-MF',
    icon: '🛻',
  },
  {
    name: 'Downtown Vice Financial District',
    x: 20,
    y: 70,
    type: 'landmark',
    region: 'Vice City',
    description:
      'Towering modern corporate skyline. Commercial bank headquarters, rooftop helipads, luxury penthouse suites, and city hall.',
    coordinates: 'DF-4401-FD',
    icon: '🏙️',
  },
  {
    name: 'Hamlet Fishing Marina',
    x: 82,
    y: 75,
    type: 'landmark',
    region: 'Leonida Keys',
    description:
      'Quaint subtropical fishing community. Sport-fishing boat charters, bait shacks, seafood taverns, and illicit offshore drops.',
    coordinates: 'HM-3320-MR',
    icon: '🎣',
  },
  {
    name: 'Redhill Pine Nature Reserve',
    x: 60,
    y: 15,
    type: 'easter-egg',
    region: 'Mount Kalaga',
    description:
      'Dense wilderness home to rare Florida panthers, elusive black bears, and a secluded off-grid survivalist compound with heavy weapon spawns.',
    coordinates: 'RH-1102-FR',
    icon: '🌲',
  },
  {
    name: 'San Chian Cartel Superyacht Anchorage',
    x: 48,
    y: 88,
    type: 'mission',
    region: 'Ocean Reefs',
    description:
      'Heavily guarded 250-foot luxury superyacht anchored offshore. Private military guards, vault safes, and helicopter getaway landing deck.',
    coordinates: 'SY-9900-SY',
    icon: '🛥️',
  }
]

const VEHICLES = [
  {
    name: 'Grotti Cheetah',
    class: 'Super',
    speed: 9.8,
    handling: 9.2,
    armor: 6.5,
    location: 'Downtown Vice City Showroom',
    desc: 'Mid-engine Italian exotic. Confirmed in Trailer 1 high-speed chase cutting through Vice Beach Marina.',
    icon: '🏎️',
  },
  {
    name: 'Pegassi Infernus',
    class: 'Super',
    speed: 9.6,
    handling: 8.9,
    armor: 6.2,
    location: 'Starfish Island Compounds',
    desc: 'V12 Italian supercar heritage. Spotted in golden-hour footage crossing the Leonida Keys Overseas Bridge.',
    icon: '🚗',
  },
  {
    name: 'Bravado Banshee',
    class: 'Sports',
    speed: 8.8,
    handling: 8.4,
    armor: 7.0,
    location: 'Vice Beach Drag Strip',
    desc: 'American V10 muscle-sports legend. Widebody drift tuning kit spotted tearing through industrial dockyards.',
    icon: '🚘',
  },
  {
    name: 'Pfister Comet S2 Cabrio',
    class: 'Sports',
    speed: 9.1,
    handling: 9.4,
    armor: 6.8,
    location: 'Ocean Drive Promenade',
    desc: 'Rear-engine German convertible. The vehicle of choice for Vice City socialites and high-roller getaway drivers.',
    icon: '🏎️',
  },
  {
    name: 'Bravado Gauntlet Hellfire',
    class: 'Muscle',
    speed: 9.0,
    handling: 7.6,
    armor: 7.5,
    location: 'Port Gellhorn Industrial Strip',
    desc: 'Supercharged 800+ HP American muscle car. Unmatched straight-line highway acceleration and tire-smoking burnouts.',
    icon: '💨',
  },
  {
    name: 'Declasse Tampa Classic',
    class: 'Muscle',
    speed: 8.0,
    handling: 7.5,
    armor: 7.8,
    location: 'Ambrosia Suburbs',
    desc: 'Retro 1970s American muscle cruiser. Heavy steel construction provides high ramming resistance against cruisers.',
    icon: '🚙',
  },
  {
    name: 'Vapid Dominator GT',
    class: 'Muscle',
    speed: 8.6,
    handling: 8.0,
    armor: 7.2,
    location: 'Little Haiti Alleys',
    desc: 'Modern aggressive pony car. Agile cornering and customizable trunk storage for long-range tactical heists.',
    icon: '🏎️',
  },
  {
    name: 'Albany Cavalcade Gen V',
    class: 'SUV',
    speed: 7.5,
    handling: 7.8,
    armor: 8.8,
    location: 'Vice Financial District',
    desc: 'Executive full-size luxury SUV. Tinted bullet-resistant glass options and massive four-person crew capacity.',
    icon: '🚙',
  },
  {
    name: 'Bravado Bison Crew 4x4',
    class: 'Truck',
    speed: 7.2,
    handling: 7.4,
    armor: 9.0,
    location: 'Kelly County Mud Tracks',
    desc: 'Lifted heavy-duty turbodiesel pickup. Deep water-fording snorkel and off-road winch for swamp navigations.',
    icon: '🛻',
  },
  {
    name: 'Karin Sultan RS Custom',
    class: 'Tuner',
    speed: 8.9,
    handling: 9.2,
    armor: 6.8,
    location: 'Port Gellhorn Underground Car Meet',
    desc: 'All-wheel drive rally-inspired tuner. Rapid acceleration on wet asphalt and dirt backroads alike.',
    icon: '🏎️',
  },
  {
    name: 'Dinka Double-T',
    class: 'Motorcycle',
    speed: 9.2,
    handling: 9.5,
    armor: 4.5,
    location: 'Vice Beach Boardwalk',
    desc: 'Inline-4 Japanese sport bike with blistering acceleration. Weaves effortlessly through gridlock police cordons.',
    icon: '🏍️',
  },
  {
    name: 'Shitzu Hakuchou Drag',
    class: 'Motorcycle',
    speed: 9.7,
    handling: 8.6,
    armor: 4.2,
    location: 'Airport Dragstrip',
    desc: 'Extended swingarm drag motorcycle. Top-tier top speed across uninterrupted straight highway spans.',
    icon: '🏍️',
  },
  {
    name: 'Everglades Spec Airboat',
    class: 'Boat',
    speed: 8.4,
    handling: 9.0,
    armor: 7.0,
    location: 'Grassrivers Boat Launch',
    desc: 'Propeller-driven flat-bottom watercraft. Glides effortlessly over mud, sawgrass marshes, and shallow waters.',
    icon: '🚤',
  },
  {
    name: 'Nagasaki Dinghy Police Interceptor',
    class: 'Boat',
    speed: 8.7,
    handling: 8.8,
    armor: 8.2,
    location: 'Vice City Harbor Marina',
    desc: 'Twin outboard tactical rigid-inflatable boat. High stability in ocean swells and pursuit ramming capabilities.',
    icon: '🛥️',
  },
  {
    name: 'Nagasaki SeaSparrow',
    class: 'Aircraft',
    speed: 8.5,
    handling: 9.0,
    armor: 6.0,
    location: 'Leonida Keys Water Helipad',
    desc: 'Agile utility helicopter fitted with nautical flotation pontoons. Can touch down directly on ocean bays.',
    icon: '🚁',
  },
  {
    name: 'Buckingham Luxor Deluxe',
    class: 'Aircraft',
    speed: 9.4,
    handling: 7.5,
    armor: 6.5,
    location: 'Vice City International Airport',
    desc: 'Twin-engine executive private jet. High-altitude long-distance getaway craft with champagne interior lounge.',
    icon: '✈️',
  }
]

const WEAPONS = [
  {
    name: 'Service Pistol (9mm)',
    category: 'Handgun',
    damage: 65,
    fireRate: 75,
    accuracy: 85,
    range: 60,
    capacity: '15 / 30 Extended',
    desc: 'Standard-issue law enforcement polymer pistol. Highly concealable inside waistbands without raising police suspicion.',
    icon: '🔫',
  },
  {
    name: 'Tactical Carabine 5.56',
    category: 'Rifle',
    damage: 82,
    fireRate: 80,
    accuracy: 88,
    range: 85,
    capacity: '30 / 60 Drum',
    desc: 'Versatile military-grade assault rifle. Slings over shoulder; customizable with holographic optic and suppressor.',
    icon: '🎯',
  },
  {
    name: 'Pump-Action Shotgun',
    category: 'Shotgun',
    damage: 95,
    fireRate: 40,
    accuracy: 50,
    range: 45,
    capacity: '8 Shells',
    desc: 'Devastating 12-gauge kinetic stopping power for door breaching, armored vehicle stops, and tight corridor assaults.',
    icon: '💥',
  },
  {
    name: 'Micro SMG Machine Pistol',
    category: 'Submachine Gun',
    damage: 68,
    fireRate: 95,
    accuracy: 62,
    range: 55,
    capacity: '32 Rounds',
    desc: 'Blistering cyclic rate ideal for drive-by shootings from car windows and suppressing pursuers during getaways.',
    icon: '⚡',
  },
  {
    name: 'Heavy .50 Marksman Sniper',
    category: 'Sniper Rifle',
    damage: 100,
    fireRate: 25,
    accuracy: 98,
    range: 100,
    capacity: '5 Mag',
    desc: 'Anti-materiel rifle capable of disabling vehicle engine blocks and picking off targets across wide bay waters.',
    icon: '🔭',
  },
  {
    name: 'Tactical Stun Gun / Taser',
    category: 'Non-Lethal',
    damage: 30,
    fireRate: 20,
    accuracy: 80,
    range: 30,
    capacity: '1 Dart Recharge',
    desc: 'High-voltage electronic neuromuscular weapon. Silently subdues security guards without alerting 911 dispatch.',
    icon: '⚡',
  },
  {
    name: 'Pneumatic Speargun',
    category: 'Specialty',
    damage: 88,
    fireRate: 30,
    accuracy: 75,
    range: 40,
    capacity: '1 Spear Tether',
    desc: 'Designed for underwater defense against aggressive bull sharks and patrolling scuba security in reef heists.',
    icon: '🔱',
  },
  {
    name: 'Heavy Breaching Crowbar',
    category: 'Melee',
    damage: 70,
    fireRate: 60,
    accuracy: 90,
    range: 15,
    capacity: 'N/A',
    desc: 'Multi-purpose entry tool. Used for silent window prying, cash register jemmying, and devastating blunt strikes.',
    icon: '🔨',
  },
  {
    name: 'Molotov Cocktail',
    category: 'Thrown',
    damage: 90,
    fireRate: 25,
    accuracy: 70,
    range: 35,
    capacity: 'Carried in Bags',
    desc: 'Improvised incendiary weapon that creates expanding walls of fire, blocking narrow highway chokepoints from police.',
    icon: '🔥',
  },
  {
    name: 'Tactical Zip Ties & Loot Duffel',
    category: 'Equipment',
    damage: 0,
    fireRate: 0,
    accuracy: 100,
    range: 10,
    capacity: '50 Bundles Cash',
    desc: 'Essential robbery kit. Restrains store witnesses to buy time before police dispatch and packs vault loot securely.',
    icon: '🎒',
  }
]

const FEATURE_GROUPS = [
  {
    category: 'Dual Protagonist Dynamic',
    icon: '👥',
    features: [
      {
        title: 'Seamless Real-Time Swap',
        status: 'Confirmed',
        desc: 'Switch between Lucia and Jason on the fly during free-roam and coordinated tactical robbery sequences.',
      },
      {
        title: 'Contextual Tactical Commands',
        status: 'Confirmed',
        desc: 'Issue dynamic orders to your partner to intimidate store clerks, hotwire vehicles, or lay down suppressive fire.',
      },
      {
        title: 'Shared Duffel & Vehicle Trunk Armory',
        status: 'Confirmed',
        desc: 'RDR2-style inventory system: long weapons and heist cash must be physically stored in car trunks or duffel bags.',
      },
      {
        title: 'Parole Ankle-Monitor System',
        status: 'Confirmed',
        desc: 'Lucia wears an electronic monitoring bracelet early in the story, restricting travel sectors until disabled.',
      },
    ],
  },
  {
    category: 'World & Climate Engine',
    icon: '🌪️',
    features: [
      {
        title: 'Dynamic Tropical Storms & Hurricanes',
        status: 'Confirmed',
        desc: 'Realistic low-pressure systems with gale-force winds that physically bend foliage, rip debris, and cause coastal flooding.',
      },
      {
        title: 'Living Ecosystem & Apex Predators',
        status: 'Confirmed',
        desc: 'American alligators, Florida panthers, hammerhead sharks, dolphins, and wild boars with dynamic food chain AI.',
      },
      {
        title: 'Over 60% Enterable Commercial Storefronts',
        status: 'Confirmed',
        desc: 'Supermarkets, pawn shops, diners, clubs, and laundromats with interactive interiors for seamless robberies.',
      },
      {
        title: 'Volumetric Water & Fluid Dynamics',
        status: 'Confirmed',
        desc: 'RAGE 9 computational fluid physics with realistic boat wake displacement and deformable tidal sand beaches.',
      },
    ],
  },
  {
    category: 'Law Enforcement & Underworld',
    icon: '🚨',
    features: [
      {
        title: 'Tactical Bridge Cordons & Spike Strips',
        status: 'Confirmed',
        desc: 'VCPD establishes tactical bottlenecks, road spikes, and coordinated PIT maneuvers on expressway bridges.',
      },
      {
        title: 'K9 Tracking & FLIR Thermal Helicopters',
        status: 'Confirmed',
        desc: 'Police dogs hunt players through sawgrass while thermal searchlights penetrate foliage during night pursuits.',
      },
      {
        title: 'Delayed 911 Calls & Witness Elimination',
        status: 'Confirmed',
        desc: 'Crimes in remote areas only report when witnesses reach a phone, giving players time to eliminate surveillance.',
      },
      {
        title: 'In-Engine Parody Social Media Feed',
        status: 'Confirmed',
        desc: 'An active vertical video platform where bystanders record player stunts, shootouts, and bizarre viral events.',
      },
    ],
  },
]

type Tab = 'map' | 'characters' | 'vehicles' | 'weapons' | 'features'
type FilterType = 'all' | 'landmark' | 'mission' | 'easter-egg'

export default function WikiClientPage({ locale }: { locale: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('map')
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(POIS[0])
  const [filter, setFilter] = useState<FilterType>('all')
  const [charEra, setCharEra] = useState<'all' | 'GTA 6' | 'GTA Vice City'>('all')
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
    if (event.button !== 0) return
    setIsDragging(true)
    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart.current) return
    const dx = event.clientX - dragStart.current.x
    const dy = event.clientY - dragStart.current.y
    setPan({
      x: dragStart.current.panX + dx,
      y: dragStart.current.panY + dy,
    })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    dragStart.current = null
  }

  const wikiCharacters = CHARACTERS.filter((c) => {
    if (charEra === 'all') return true
    return c.game === charEra
  }).slice(0, 12)

  return (
    <div className="bg-midnight-teal min-h-screen text-off-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Page Title & Navigation Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-palm-teal/20 text-palm-teal px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border border-palm-teal/30">
            <Map className="w-4 h-4" />
            <span>Leonida Encyclopedic Atlas</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-wider text-off-white">
            WIKI &amp; INTEL CODEX
          </h1>
          <p className="text-sm sm:text-base text-off-white/70 max-w-2xl mx-auto">
            Interactive tactical cartography, confirmed Leonida vehicles, military-grade armory, and underworld intelligence spanning Grand Theft Auto VI and historical Vice City lore.
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center pt-4">
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-deep-teal/40 border border-deep-teal/70 rounded-2xl">
              {[
                { id: 'map', label: 'Interactive Map', icon: Map },
                { id: 'characters', label: 'Characters', icon: Users },
                { id: 'vehicles', label: 'Vehicles', icon: Car },
                { id: 'weapons', label: 'Armory & Gear', icon: Crosshair },
                { id: 'features', label: 'Engine & Mechanics', icon: Zap },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick()
                      setActiveTab(tab.id as Tab)
                    }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-bold shadow-lg'
                        : 'text-off-white/60 hover:text-off-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}

              {/* Secret Collectible Tiki Package */}
              <button
                onClick={() => {
                  soundFx.playCash()
                  if (typeof window !== 'undefined') {
                    const stored = JSON.parse(localStorage.getItem('gta_hidden_packages') || '[]')
                    if (!stored.includes('Starfish Island Cartel Vault')) {
                      stored.push('Starfish Island Cartel Vault')
                      localStorage.setItem('gta_hidden_packages', JSON.stringify(stored))
                    }
                    window.dispatchEvent(new CustomEvent('gta_package_found', { detail: 'Starfish Island Cartel Vault' }))
                  }
                }}
                className="p-2 rounded-xl bg-deep-teal/60 border border-deep-teal hover:border-sunset-orange/50 hover:scale-110 transition-transform cursor-pointer group"
                title="Starfish Island Secret Stash! Tap to collect"
                aria-label="Collect secret package"
              >
                <span className="text-sm select-none group-hover:animate-bounce">🗿</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB CONTENTS */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* TAB 1: INTERACTIVE MAP */}
              {activeTab === 'map' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left 2 Cols: The Interactive Canvas */}
                  <div className="lg:col-span-2 space-y-4">
                    <div
                      onWheel={handleWheel}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-deep-teal bg-black shadow-2xl cursor-grab active:cursor-grabbing select-none"
                    >
                      {/* Zoom controls */}
                      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                        <button
                          onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                          aria-label="Zoom in"
                          className="w-8 h-8 rounded-lg bg-midnight-teal/80 border border-deep-teal text-off-white hover:text-neon-flamingo flex items-center justify-center text-sm font-bold backdrop-blur transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                          aria-label="Zoom out"
                          className="w-8 h-8 rounded-lg bg-midnight-teal/80 border border-deep-teal text-off-white hover:text-neon-flamingo flex items-center justify-center text-sm font-bold backdrop-blur transition"
                        >
                          -
                        </button>
                        <button
                          onClick={() => {
                            setScale(1)
                            setPan({ x: 0, y: 0 })
                          }}
                          aria-label="Reset zoom"
                          className="px-2 py-1 rounded-lg bg-midnight-teal/80 border border-deep-teal text-[10px] font-mono text-off-white/70 hover:text-off-white backdrop-blur transition"
                        >
                          Reset
                        </button>
                      </div>

                      {/* Transform Container */}
                      <div
                        className="w-full h-full relative"
                        style={{
                          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                          transformOrigin: 'center center',
                          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                        }}
                      >
                        {/* Map Background image */}
                        <div
                          role="img"
                          aria-label="Leonida Community Map (fan-made cartography)"
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: "url('https://i.imgur.com/DbsSI4V.jpeg')" }}
                        />
                        {/* Blueprint grid overlay */}
                        <div className="absolute inset-0 bg-midnight-teal bg-[radial-gradient(#1fa9a0_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

                        {/* POI Markers */}
                        {filteredPOIS.map((poi) => (
                          <button
                            key={poi.name}
                            aria-label={poi.name}
                            onClick={(e) => {
                              e.stopPropagation()
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

                      <span className="absolute bottom-2 left-2 text-[9px] font-mono text-off-white/40 bg-black/60 px-2.5 py-1 rounded-lg z-10 pointer-events-none">
                        Leonida Cartography Engine • {filteredPOIS.length} Locations Marked
                      </span>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      {(['all', 'landmark', 'mission', 'easter-egg'] as const).map((filterType) => (
                        <button
                          key={filterType}
                          onClick={() => setFilter(filterType)}
                          className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                            filter === filterType
                              ? filterType === 'all'
                                ? 'bg-off-white/10 border-off-white/30 text-off-white font-bold'
                                : filterType === 'landmark'
                                ? 'bg-palm-teal/20 border-palm-teal text-palm-teal font-bold'
                                : filterType === 'mission'
                                ? 'bg-sunset-orange/20 border-sunset-orange text-sunset-orange font-bold'
                                : 'bg-neon-flamingo/20 border-neon-flamingo text-neon-flamingo font-bold'
                              : 'border-deep-teal text-off-white/40 hover:text-off-white/70'
                          }`}
                        >
                          {filterType === 'all'
                            ? 'All Locations'
                            : filterType === 'easter-egg'
                            ? 'Easter Eggs'
                            : `${filterType.charAt(0).toUpperCase()}${filterType.slice(1)}s`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Col: Selected POI Details & List */}
                  <div className="space-y-4 flex flex-col">
                    {selectedPOI && (
                      <div className="bg-deep-teal/30 border border-deep-teal/80 rounded-3xl p-6 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-md border font-semibold ${
                              selectedPOI.type === 'landmark'
                                ? 'bg-palm-teal/20 border-palm-teal/40 text-palm-teal'
                                : selectedPOI.type === 'easter-egg'
                                ? 'bg-neon-flamingo/20 border-neon-flamingo/40 text-neon-flamingo'
                                : 'bg-sunset-orange/20 border-sunset-orange/40 text-sunset-orange'
                            }`}
                          >
                            {selectedPOI.type}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md bg-midnight-teal border border-deep-teal text-off-white/60">
                            {selectedPOI.region}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{selectedPOI.icon}</span>
                          <div>
                            <h3 className="text-lg sm:text-xl font-display uppercase text-off-white leading-tight">
                              {selectedPOI.name}
                            </h3>
                            <p className="text-[10px] font-mono text-sunset-orange">
                              GPS: {selectedPOI.coordinates}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed">
                          {selectedPOI.description}
                        </p>

                        <Link
                          href={`/${locale}/library?q=${encodeURIComponent(selectedPOI.name)}`}
                          className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider rounded-xl hover:opacity-95 transition shadow"
                        >
                          <span>Explore Video Intel</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}

                    {/* Scrollable POI Quick List */}
                    <div className="bg-deep-teal/20 border border-deep-teal/60 rounded-3xl p-4 space-y-2 max-h-80 overflow-y-auto">
                      <div className="text-[10px] font-mono uppercase text-off-white/40 px-2 pb-1 border-b border-deep-teal/40">
                        Points of Interest ({filteredPOIS.length})
                      </div>
                      {filteredPOIS.map((poi) => (
                        <button
                          key={poi.name}
                          onClick={() => setSelectedPOI(poi)}
                          className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                            selectedPOI?.name === poi.name
                              ? 'bg-palm-teal/20 border border-palm-teal/40 text-off-white font-semibold'
                              : 'text-off-white/60 hover:text-off-white hover:bg-deep-teal/40'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span>{poi.icon}</span>
                            <span className="truncate">{poi.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-off-white/30 shrink-0 ml-2">
                            {poi.region}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CHARACTERS QUICK SPOTLIGHT */}
              {activeTab === 'characters' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-deep-teal/30 p-5 rounded-3xl border border-deep-teal/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-off-white/50 mr-2">Filter Era:</span>
                      {(['all', 'GTA 6', 'GTA Vice City'] as const).map((era) => (
                        <button
                          key={era}
                          onClick={() => setCharEra(era)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition ${
                            charEra === era
                              ? 'bg-neon-flamingo text-white font-bold'
                              : 'bg-midnight-teal/60 text-off-white/60 hover:text-off-white'
                          }`}
                        >
                          {era === 'all' ? 'All Characters' : era}
                        </button>
                      ))}
                    </div>

                    <Link
                      href={`/${locale}/characters`}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider hover:opacity-95 transition shadow"
                    >
                      <span>Open Full Database ({CHARACTERS.length} Profiles)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wikiCharacters.map((char) => (
                      <Link
                        key={char.id}
                        href={`/${locale}/characters`}
                        className="group bg-deep-teal/25 hover:bg-deep-teal/40 border border-deep-teal hover:border-palm-teal/40 rounded-3xl p-5 space-y-4 transition duration-300 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-midnight-teal border border-deep-teal/60 flex items-center justify-center">
                            {char.imageUrl ? (
                              <img
                                src={char.imageUrl}
                                alt={char.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F2E33] to-[#0B1E23]">
                                <span className="text-3xl font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
                                  {char.name.slice(0, 2).toUpperCase()}
                                </span>
                              </div>
                            )}

                            <span
                              className={`absolute top-2 left-2 text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-md ${
                                char.game === 'GTA 6'
                                  ? 'bg-neon-flamingo text-white'
                                  : 'bg-palm-teal text-midnight-teal'
                              }`}
                            >
                              {char.game}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-display uppercase text-lg text-off-white group-hover:text-neon-flamingo transition truncate">
                              {char.name}
                            </h4>
                            <p className="text-[10px] font-mono text-sunset-orange uppercase">
                              {char.roleCategory}
                            </p>
                          </div>

                          <p className="text-xs text-off-white/60 line-clamp-2 leading-relaxed">
                            {char.profile.occupation}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-deep-teal/40 text-[10px] font-mono text-palm-teal flex items-center justify-between">
                          <span>Dossier Available</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: VEHICLES */}
              {activeTab === 'vehicles' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {VEHICLES.map((vehicle) => (
                    <div
                      key={vehicle.name}
                      className="bg-deep-teal/25 border border-deep-teal/70 hover:border-palm-teal/40 rounded-3xl p-5 space-y-4 transition duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{vehicle.icon}</span>
                          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 bg-palm-teal/20 border border-palm-teal/30 text-palm-teal rounded-md font-semibold">
                            {vehicle.class}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-display uppercase text-lg text-off-white tracking-wide">
                            {vehicle.name}
                          </h4>
                          <p className="text-[10px] font-mono text-off-white/40">
                            {vehicle.location}
                          </p>
                        </div>

                        {/* Performance Bars */}
                        <div className="space-y-1.5 text-[10px] font-mono pt-2 border-t border-deep-teal/40">
                          <div>
                            <div className="flex justify-between text-off-white/50 mb-0.5">
                              <span>Top Speed</span>
                              <span>{vehicle.speed}/10</span>
                            </div>
                            <div className="w-full bg-midnight-teal rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-neon-flamingo to-sunset-orange h-1.5 rounded-full"
                                style={{ width: `${vehicle.speed * 10}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-off-white/50 mb-0.5">
                              <span>Handling</span>
                              <span>{vehicle.handling}/10</span>
                            </div>
                            <div className="w-full bg-midnight-teal rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-palm-teal to-cyan-400 h-1.5 rounded-full"
                                style={{ width: `${vehicle.handling * 10}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-off-white/60 leading-relaxed pt-1">
                          {vehicle.desc}
                        </p>
                      </div>

                      <Link
                        href={`/${locale}/library?q=${encodeURIComponent(vehicle.name)}`}
                        className="text-[10px] font-mono uppercase text-sunset-orange hover:text-neon-flamingo flex items-center gap-1 transition pt-2"
                      >
                        <span>Search Video Footage</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: WEAPONS & ARMORY */}
              {activeTab === 'weapons' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {WEAPONS.map((wpn) => (
                    <div
                      key={wpn.name}
                      className="bg-deep-teal/25 border border-deep-teal/70 hover:border-neon-flamingo/40 rounded-3xl p-5 space-y-4 transition duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{wpn.icon}</span>
                          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 bg-neon-flamingo/20 border border-neon-flamingo/30 text-neon-flamingo rounded-md font-semibold">
                            {wpn.category}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-display uppercase text-lg text-off-white tracking-wide">
                            {wpn.name}
                          </h4>
                          <p className="text-[10px] font-mono text-off-white/40">
                            Cap: {wpn.capacity}
                          </p>
                        </div>

                        {/* Weapon Stat Bars */}
                        <div className="space-y-1.5 text-[10px] font-mono pt-2 border-t border-deep-teal/40">
                          <div>
                            <div className="flex justify-between text-off-white/50 mb-0.5">
                              <span>Damage</span>
                              <span>{wpn.damage}/100</span>
                            </div>
                            <div className="w-full bg-midnight-teal rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-rose-500 to-neon-flamingo h-1.5 rounded-full"
                                style={{ width: `${wpn.damage}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-off-white/50 mb-0.5">
                              <span>Accuracy</span>
                              <span>{wpn.accuracy}/100</span>
                            </div>
                            <div className="w-full bg-midnight-teal rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-palm-teal to-emerald-400 h-1.5 rounded-full"
                                style={{ width: `${wpn.accuracy}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-off-white/60 leading-relaxed pt-1">
                          {wpn.desc}
                        </p>
                      </div>

                      <Link
                        href={`/${locale}/library?q=${encodeURIComponent(wpn.name)}`}
                        className="text-[10px] font-mono uppercase text-palm-teal hover:text-white flex items-center gap-1 transition pt-2"
                      >
                        <span>Armory Loadouts</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: ENGINE & MECHANICS */}
              {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FEATURE_GROUPS.map((group) => (
                    <div
                      key={group.category}
                      className="bg-deep-teal/25 rounded-3xl p-6 border border-deep-teal/70 space-y-5 shadow-xl"
                    >
                      <div className="flex items-center gap-2.5 pb-2 border-b border-deep-teal/50">
                        <span className="text-2xl">{group.icon}</span>
                        <h4 className="font-display uppercase text-lg text-off-white tracking-wider">
                          {group.category}
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {group.features.map((feature) => (
                          <div key={feature.title} className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-off-white">{feature.title}</span>
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-palm-teal/20 border border-palm-teal/30 text-palm-teal">
                                {feature.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-off-white/60 leading-relaxed">
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

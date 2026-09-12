'use client'

import { useEffect, useState, useRef } from 'react'
import { Play, ShieldAlert, Award, Clock, Users, Map, Crosshair, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import VideoCard, { type Video } from '@/components/VideoCard'
import AgeBypassPlayer from '@/components/AgeBypassPlayer'
import { createClient } from '@/utils/supabase/client'
import { soundFx } from '@/components/GtaSoundEffects'

const SkylineHero = dynamic(() => import('@/components/SkylineHero'), {
  ssr: false,
  loading: () => (
    <div className="relative h-[95vh] w-full bg-gradient-to-b from-[#0F2E33] to-[#0B1E23] flex items-center justify-center">
      <div className="text-off-white/40 font-mono text-xs uppercase tracking-widest animate-pulse">
        Initializing 3D Skyline...
      </div>
    </div>
  )
})

interface CountdownData {
  targetDate: string
  windowName: string
  statusLabel: string
  confidence: string
  platforms: string[]
  lastChecked: string
  source: string
  newsSnippet: string
}

const DEFAULT_TARGET_DATE = '2026-05-26T00:00:00.000Z'

export default function HomeClientPage({ locale }: { locale: string }) {
  const router = useRouter()
  const [countdownData, setCountdownData] = useState<CountdownData | null>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [heroInView, setHeroInView] = useState(false)
  const [recentVideos, setRecentVideos] = useState<Video[]>([])
  const [activeSensor, setActiveSensor] = useState<'leonida' | 'vice_city'>('leonida')
  const heroContainerRef = useRef<HTMLDivElement>(null)

  // Fetch real-time countdown details from internet verification API
  useEffect(() => {
    async function loadCountdown() {
      try {
        const res = await fetch('/api/countdown')
        if (res.ok) {
          const data = await res.json()
          setCountdownData(data)
        }
      } catch (err) {
        console.warn('Countdown API fetch failed, using official fallback:', err)
      }
    }
    loadCountdown()
    const syncInterval = setInterval(loadCountdown, 300000) // Sync every 5 minutes
    return () => clearInterval(syncInterval)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(countdownData?.targetDate || DEFAULT_TARGET_DATE)
      const difference = +target - +new Date()
      let timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0 }

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      setTimeLeft(timeLeftData)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [countdownData])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (heroContainerRef.current) {
      observer.observe(heroContainerRef.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const supabaseClient = createClient()
    
    async function loadRecentVideos() {
      const getVideos = async (days: number) => {
        const dateStr = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
        const { data } = await supabaseClient
          .from('videos')
          .select('*, video_timestamps(*)')
          .gte('published_at', dateStr)
          .eq('excluded', false)
          .order('published_at', { ascending: false })
        return data || []
      }

      try {
        let recent = await getVideos(7)
        if (recent.length < 4) {
          recent = await getVideos(14)
        }
        if (recent.length >= 4) {
          setRecentVideos(recent as Video[])
        } else {
          setRecentVideos([]) // hide section
        }
      } catch (err) {
        console.error('Failed to load recent videos:', err)
      }
    }

    loadRecentVideos()
  }, [])

  return (
    <div className="flex flex-col bg-midnight-teal min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'GTA 6 Hub',
            alternateName: 'GTA VI Hub',
            url: 'https://gta6hub.com',
            description: 'The premier unofficial fan portal for GTA 6. Browse categorized walkthroughs, Easter eggs, leaks, and guides.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://gta6hub.com/en/library?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      
      {/* 1. 3D Parallax Skyline Hero (Lazy Loaded) */}
      <div ref={heroContainerRef} className="min-h-[95vh] w-full bg-[#07090E]">
        {heroInView ? (
          <SkylineHero />
        ) : (
          <div className="relative h-[95vh] w-full flex items-center justify-center bg-[#07090E]">
            <div className="text-off-white/40 font-mono text-xs uppercase tracking-widest animate-pulse">
              Initializing 3D Skyline...
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24">
        
        {/* Unofficial Portal Legal Disclaimer (Section 9 / Legal shit.txt) */}
        <div className="bg-sunset-orange/15 border border-sunset-orange/30 rounded-2xl p-4 text-xs text-center text-sunset-orange font-semibold">
          GTA VI HUB IS AN UNOFFICIAL FAN PORTAL. IT IS NOT AFFILIATED WITH, SPONSORED BY, OR ENDORSED BY ROCKSTAR GAMES OR TAKE-TWO INTERACTIVE.
        </div>

        {/* Countdown Timer Component with Live Internet Sync */}
        <section className="relative overflow-hidden bg-deep-teal/40 rounded-3xl p-8 md:p-12 border border-deep-teal/80 shadow-xl text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neon-flamingo/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palm-teal/15 border border-palm-teal/30 text-palm-teal text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{countdownData?.statusLabel || 'SYNCHRONIZED WITH TAKE-TWO / ROCKSTAR GUIDANCE'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-widest text-off-white mb-2">
            COUNTDOWN TO LEONIDA
          </h2>
          <p className="text-xs uppercase font-mono tracking-widest text-palm-teal mb-8">
            {countdownData?.windowName || 'OFFICIAL 2025 - 2026 ROCKSTAR LAUNCH WINDOW'} • Confidence: {countdownData?.confidence || '99.4% (Take-Two SEC 10-K)'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-midnight-teal/80 border border-deep-teal p-5 rounded-2xl flex flex-col items-center">
                <span className="text-4xl sm:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-b from-neon-flamingo to-sunset-orange filter drop-shadow-[0_2px_8px_rgba(255,61,129,0.3)]">
                  {value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-off-white/50 mt-2">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          {countdownData?.newsSnippet && (
            <p className="mt-6 text-xs text-off-white/50 max-w-2xl mx-auto font-mono">
              🛰️ Live Intel: {countdownData.newsSnippet}
            </p>
          )}
        </section>

        {/* 2.5 New This Week Section (Phase 4.2) */}
        {recentVideos.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-deep-teal pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-widest text-off-white">
                  NEW THIS WEEK
                </h2>
                <p className="text-xs text-off-white/60">
                  Latest guides, leaks, and gameplay analyses added in the last 7 to 14 days.
                </p>
              </div>
              <Link
                href={`/${locale}/library`}
                className="text-xs uppercase font-bold text-sunset-orange hover:text-neon-flamingo transition hover:underline"
              >
                View Library
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentVideos.map((vid: Video) => (
                <VideoCard
                  key={vid.id}
                  video={{
                    id: vid.id,
                    platform: vid.platform,
                    external_id: vid.external_id,
                    title: vid.title,
                    description: vid.description,
                    channel_name: vid.channel_name,
                    channel_url: vid.channel_url,
                    thumbnail_url: vid.thumbnail_url || `https://img.youtube.com/vi/${vid.external_id}/maxresdefault.jpg`,
                    published_at: vid.published_at,
                    video_timestamps: vid.video_timestamps || []
                  }}
                  isFavorited={false}
                  isPremium={true}
                  onToggleFavorite={() => {}}
                  onOpenVideo={() => router.push(`/${locale}/library/${vid.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* 3. Trailer & Details Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-neon-flamingo/15 text-neon-flamingo px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-neon-flamingo/30 mb-4">
              <span>PlayStation 5 • Xbox Series X|S</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-widest text-off-white mb-6 leading-tight">
              WELCOME TO THE NEXT GENERATION
            </h2>
            <p className="text-off-white/70 leading-relaxed mb-6">
              Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond. Experience the biggest evolution in open-world history: dual protagonists Lucia and Jason, an enterable commercial economy, and a living, breathing simulated Florida ecosystem.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href={`/${locale}/characters`} 
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-95 transition shadow-lg text-xs sm:text-sm font-mono"
              >
                <Users className="w-4 h-4" />
                <span>Character Vault</span>
              </Link>
              <Link 
                href={`/${locale}/wiki`} 
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-deep-teal hover:bg-palm-teal/20 text-off-white border border-deep-teal hover:border-palm-teal/40 font-bold uppercase tracking-wider rounded-xl transition text-xs sm:text-sm font-mono"
              >
                <Map className="w-4 h-4" />
                <span>Interactive Wiki</span>
              </Link>
              <Link 
                href={`/${locale}/library`} 
                className="flex items-center justify-center space-x-2 px-5 py-3.5 bg-deep-teal/60 hover:bg-white/10 text-off-white/80 border border-deep-teal font-bold uppercase tracking-wider rounded-xl transition text-xs sm:text-sm font-mono"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Video Guides</span>
              </Link>
            </div>
          </div>

          {/* Official Trailer Video Embed */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-deep-teal/80 bg-black">
            <AgeBypassPlayer
              videoId="QdBZY2fkU-0"
              title="Grand Theft Auto VI Trailer 1"
              autoplay={false}
            />
          </div>
        </section>

        {/* 3.5 Exploration & Intelligence Hubs */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-palm-teal/15 text-palm-teal px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-palm-teal/30">
              <Crosshair className="w-3.5 h-3.5" />
              <span>Field Intel Dossiers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-widest text-off-white">
              DISCOVER THE LORE OF LEONIDA
            </h2>
            <p className="text-xs sm:text-sm text-off-white/60">
              Explore our categorized databases covering criminal dossiers, tactical maps, vehicles, and investigative articles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Characters */}
            <Link
              href={`/${locale}/characters`}
              className="group bg-deep-teal/25 hover:bg-deep-teal/45 border border-deep-teal/70 hover:border-neon-flamingo/50 rounded-3xl p-6 space-y-4 transition duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-neon-flamingo/10 border border-neon-flamingo/30 text-neon-flamingo flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display uppercase tracking-wider text-off-white group-hover:text-neon-flamingo transition">
                  Character Vault
                </h3>
                <p className="text-xs text-off-white/60 leading-relaxed">
                  56 profiles cataloged. Lucia Caminos, Jason Duval, and 40 years of Vice City legends with full combat stats, quotes, and wardrobe variants.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-neon-flamingo pt-2 border-t border-deep-teal/40">
                <span>Access Dossiers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Interactive Map */}
            <Link
              href={`/${locale}/wiki`}
              className="group bg-deep-teal/25 hover:bg-deep-teal/45 border border-deep-teal/70 hover:border-palm-teal/50 rounded-3xl p-6 space-y-4 transition duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-palm-teal/10 border border-palm-teal/30 text-palm-teal flex items-center justify-center">
                  <Map className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display uppercase tracking-wider text-off-white group-hover:text-palm-teal transition">
                  Leonida Atlas
                </h3>
                <p className="text-xs text-off-white/60 leading-relaxed">
                  Interactive tactical map with 20+ GPS coordinates spanning Vice Beach, Port Gellhorn, Starfish Island, and alligator sawgrass swamps.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-palm-teal pt-2 border-t border-deep-teal/40">
                <span>Launch Atlas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Weapons & Armory */}
            <Link
              href={`/${locale}/wiki`}
              className="group bg-deep-teal/25 hover:bg-deep-teal/45 border border-deep-teal/70 hover:border-sunset-orange/50 rounded-3xl p-6 space-y-4 transition duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sunset-orange/10 border border-sunset-orange/30 text-sunset-orange flex items-center justify-center">
                  <Crosshair className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display uppercase tracking-wider text-off-white group-hover:text-sunset-orange transition">
                  Vehicles & Armory
                </h3>
                <p className="text-xs text-off-white/60 leading-relaxed">
                  18 confirmed sports cars, supercars, airboats, and aircraft, alongside tactical firearm specs and car trunk inventory logistics.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-sunset-orange pt-2 border-t border-deep-teal/40">
                <span>Inspect Gear</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 4: Editorial Articles */}
            <Link
              href={`/${locale}/articles`}
              className="group bg-deep-teal/25 hover:bg-deep-teal/45 border border-deep-teal/70 hover:border-palm-teal/50 rounded-3xl p-6 space-y-4 transition duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-palm-teal/10 border border-palm-teal/30 text-palm-teal flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display uppercase tracking-wider text-off-white group-hover:text-palm-teal transition">
                  Lore Deep Dives
                </h3>
                <p className="text-xs text-off-white/60 leading-relaxed">
                  In-depth leak investigations: 1986 vs 2026 Vice City comparison, RAGE 9 weather simulation, wildlife food chains, and heist tactics.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-palm-teal pt-2 border-t border-deep-teal/40">
                <span>Read Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* 3.6 Dual GTA 6 Leonida & Vice City Metro Live Telemetry Sensors */}
        <section className="bg-gradient-to-br from-deep-teal/40 via-midnight-teal/90 to-deep-teal/20 rounded-3xl p-6 sm:p-8 border border-deep-teal shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-palm-teal/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Dual Sensor Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-deep-teal/70 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-palm-teal font-bold">
                DUAL TACTICAL TELEMETRY • REAL-TIME RADAR GRID
              </span>
            </div>

            <div className="flex items-center gap-2 p-1 bg-midnight-teal/90 rounded-2xl border border-deep-teal">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  setActiveSensor('leonida')
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition ${
                  activeSensor === 'leonida'
                    ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-bold shadow-lg'
                    : 'text-off-white/60 hover:text-off-white'
                }`}
              >
                🌴 GTA 6 Leonida Sensor
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  setActiveSensor('vice_city')
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition ${
                  activeSensor === 'vice_city'
                    ? 'bg-gradient-to-r from-palm-teal to-cyan-400 text-white font-bold shadow-lg'
                    : 'text-off-white/60 hover:text-off-white'
                }`}
              >
                🏙️ Vice City Metro Sensor
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between relative z-10">
            {/* Left: Active Sensor Telemetry Data */}
            <div className="space-y-4 max-w-xl w-full">
              {activeSensor === 'leonida' ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-off-white">
                      LEONIDA REGIONAL BIOME TELEMETRY
                    </h3>
                    <span className="text-[10px] font-mono text-palm-teal px-2 py-0.5 rounded bg-palm-teal/10 border border-palm-teal/30">
                      GPS: 25°46&apos;N 80°11&apos;W
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">GRASSRIVERS SWAMP</span>
                      <span className="text-base font-bold text-neon-flamingo">94% Humidity</span>
                      <span className="text-[9px] text-rose-400 block mt-0.5">Water Level: 4.2 ft</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">ALLIGATOR THREAT</span>
                      <span className="text-base font-bold text-sunset-orange">CRITICAL</span>
                      <span className="text-[9px] text-yellow-400 block mt-0.5">Apex Feeds Active</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">BAROMETRIC SYSTEM</span>
                      <span className="text-base font-bold text-palm-teal">998 hPa</span>
                      <span className="text-[9px] text-cyan-400 block mt-0.5">Tropical Low Cell</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">MUD BOG TRACTION</span>
                      <span className="text-base font-bold text-off-white">38% Slip</span>
                      <span className="text-[9px] text-amber-400 block mt-0.5">Slurry Mire Alert</span>
                    </div>
                  </div>

                  {/* Leonida Regional Satellite Dispatch Ticker */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-deep-teal/70 flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-palm-teal/20 text-palm-teal font-mono text-[9px] uppercase font-bold tracking-wider animate-pulse">
                      LEONIDA SAT-4
                    </span>
                    <p className="text-xs font-mono text-off-white/70 truncate animate-pulse">
                      &quot;Satellite sweep: Poacher airboat movement tracked in Sector 7 sawgrass wetlands...&quot;
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-off-white">
                      VICE CITY METROPOLITAN GRID SENSOR
                    </h3>
                    <span className="text-[10px] font-mono text-neon-flamingo px-2 py-0.5 rounded bg-neon-flamingo/10 border border-neon-flamingo/30">
                      TAC: 460.125 MHz
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">VICE BEACH STRIP</span>
                      <span className="text-base font-bold text-sunset-orange">86°F / 30°C</span>
                      <span className="text-[9px] text-palm-teal block mt-0.5">Swell: 4.5 ft Surf</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">CAUSEWAY BOTTLENECK</span>
                      <span className="text-base font-bold text-rose-500">84% Stalled</span>
                      <span className="text-[9px] text-rose-400 block mt-0.5">Pursuits Diverted</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">STARFISH ISLAND</span>
                      <span className="text-base font-bold text-amber-400">LOCKED</span>
                      <span className="text-[9px] text-off-white/60 block mt-0.5">Cartel Gate Patrol</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
                      <span className="text-[10px] text-off-white/40 block">NEON POWER GRID</span>
                      <span className="text-base font-bold text-cyan-400">92% Saturation</span>
                      <span className="text-[9px] text-emerald-400 block mt-0.5">Peak Night Draw</span>
                    </div>
                  </div>

                  {/* Live Police Scanner Radio Ticker */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-deep-teal/70 flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[9px] uppercase font-bold tracking-wider animate-pulse">
                      VCPD TAC-1
                    </span>
                    <p className="text-xs font-mono text-off-white/70 truncate animate-pulse">
                      &quot;10-4 Dispatch, Air-1 tracking Cheetah at 145 MPH crossing Ocean Beach expressway...&quot;
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Right: Interactive Scanner Graphic & Hidden Package Easter Egg */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-palm-teal/40 bg-midnight-teal/90 shadow-[0_0_40px_rgba(31,169,160,0.2)] flex items-center justify-center shrink-0">
              {/* Radar sweep line */}
              <div className="absolute inset-0 rounded-full border border-palm-teal/20 animate-spin [animation-duration:6s]">
                <div className={`w-1/2 h-full bg-gradient-to-r from-transparent ${activeSensor === 'leonida' ? 'to-emerald-400/20' : 'to-neon-flamingo/20'} origin-right`} />
              </div>

              {/* Concentric distance circles */}
              <div className="w-3/4 h-3/4 rounded-full border border-palm-teal/30 flex items-center justify-center">
                <div className="w-1/2 h-1/2 rounded-full border border-palm-teal/40" />
              </div>

              {/* Center blip */}
              <div className={`w-3 h-3 rounded-full ${activeSensor === 'leonida' ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-neon-flamingo shadow-[0_0_10px_#ff3d81]'} animate-ping`} />

              {/* Peripheral radar blips */}
              <div className="absolute top-10 left-12 w-2 h-2 rounded-full bg-sunset-orange animate-pulse" />
              <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              {/* Hidden Package Collectible Easter Egg! */}
              <button
                onClick={() => {
                  soundFx.playCash()
                  if (typeof window !== 'undefined') {
                    const stored = JSON.parse(localStorage.getItem('gta_hidden_packages') || '[]')
                    if (!stored.includes('Radar Satellite Cache')) {
                      stored.push('Radar Satellite Cache')
                      localStorage.setItem('gta_hidden_packages', JSON.stringify(stored))
                    }
                    window.dispatchEvent(new CustomEvent('gta_package_found', { detail: 'Radar Satellite Cache' }))
                  }
                }}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-midnight-teal border border-sunset-orange hover:scale-125 transition-transform group"
                title="Hidden Easter Egg Package! Tap to collect"
              >
                <span className="text-base select-none group-hover:animate-bounce">🗿</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. Trending Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-deep-teal/30 p-8 rounded-2xl border border-deep-teal/60">
            <div className="w-12 h-12 bg-neon-flamingo/10 text-neon-flamingo rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider text-off-white mb-3">Timestamp Navigation</h3>
            <p className="text-xs text-off-white/60 leading-relaxed">
              Skip directly to secret weapon caches or unmarked map easter eggs inside guides with deep-linked video timestamps.
            </p>
          </div>

          <div className="bg-deep-teal/30 p-8 rounded-2xl border border-deep-teal/60">
            <div className="w-12 h-12 bg-sunset-orange/10 text-sunset-orange rounded-xl flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider text-off-white mb-3">AI Tagging & Sorting</h3>
            <p className="text-xs text-off-white/60 leading-relaxed">
              We parse and analyze community guides with Gemini, sorting everything into clean categories so you don&apos;t scroll through hundreds of duplicates.
            </p>
          </div>

          <div className="bg-deep-teal/30 p-8 rounded-2xl border border-deep-teal/60">
            <div className="w-12 h-12 bg-palm-teal/10 text-palm-teal rounded-xl flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider text-off-white mb-3">Unofficial Fan Site</h3>
            <p className="text-xs text-off-white/60 leading-relaxed">
              This is a community-owned portal. All creator credits are preserved, and embeds links back directly to channels.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}

'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { 
  Search, 
  Sparkles, 
  X, 
  SlidersHorizontal, 
  Play, 
  Clock, 
  Film, 
  Map, 
  Compass, 
  Car, 
  ShieldAlert, 
  Cpu, 
  ArrowRight,
  UserCheck,
  Check,
  UserPlus,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import VideoCard from '@/components/VideoCard'
import VideoSkeleton from '@/components/VideoSkeleton'
import Toast from '@/components/Toast'
import AdInterstitial from '@/components/AdInterstitial'
import ScrollReveal from '@/components/ScrollReveal'
import { createClient } from '@/utils/supabase/client'
import { PAYMENTS_ENABLED, BANNER_EVERY_N_VIDEOS, INTERSTITIAL_EVERY_N_VIDEOS } from '@/config'
import AdBanner from '@/components/AdBanner'
import AffiliateBanner from '@/components/AffiliateBanner'
import { CURATED_VIDEOS } from '@/data/curatedVideos'
import { soundFx } from '@/components/GtaSoundEffects'

interface Timestamp {
  label: string;
  seconds: number;
}

interface Video {
  id: string;
  platform: 'youtube' | 'twitch';
  external_id: string;
  title: string;
  description: string;
  channel_name: string;
  channel_url: string;
  thumbnail_url: string;
  published_at: string;
  category?: string;
  secondary_categories?: string[];
  schematicMatch?: {
    score: number;
    matchedConcepts: string[];
    insight: string;
  };
  video_timestamps?: Timestamp[];
}

interface DbUser {
  id: string;
  email?: string;
}

const CATEGORIES = [
  "All Intel",
  "News & Trailers",
  "Map & Exploration",
  "Easter Eggs & Secrets",
  "Missions & Story",
  "Theories & Comparisons",
  "Characters",
  "Vehicles",
  "Weapons & Combat",
]

const SCHEMATIC_PRESETS = [
  { label: '🗺️ 2.5x Los Santos Map Scale', query: 'Compare the full map of Leonida to GTA 5 scale' },
  { label: '🏎️ RAGE 9 Vehicle Dynamics', query: 'Next-gen vehicle physics and trunk storage weapons' },
  { label: '🐊 Sawgrass Wildlife & Swamps', query: 'Everglades sawgrass alligators and wildlife ecosystem' },
  { label: '💰 Lucia & Jason Heist Protocol', query: 'Lucia and Jason Bonnie and Clyde store robberies' },
  { label: '🚨 Tactical VCPD Intercept AI', query: 'Police PIT maneuver AI and tactical pursuit response' },
  { label: '🌆 Ray-Traced Vice Beach Lighting', query: 'Nightclub interiors volumetric lighting and water physics' },
  { label: '🏝️ Vice City 1986 vs 2026', query: 'Iconic landmark comparison between 1986 and 2026' },
]

export default function LibraryClientPage({ locale }: { locale: string }) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState<'keyword' | 'schematic'>('keyword')
  const [selectedCategory, setSelectedCategory] = useState<string>('All Intel')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [sortBy, setSortBy] = useState<'newest' | 'relevance' | 'schematic'>('newest')
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null)
  
  // Auth and Subscription State
  const [user, setUser] = useState<DbUser | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [followedCreators, setFollowedCreators] = useState<string[]>([])
  const [followedCategories, setFollowedCategories] = useState<string[]>([])
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [toast, setToast] = useState<string | null>(null)

  // Ad State (Section 7)
  const [videoOpensThisSession, setVideoOpensThisSession] = useState(0)
  const [lastAdDismissed, setLastAdDismissed] = useState<number>(0)
  const [isAdOpen, setIsAdOpen] = useState(false)
  const [pendingPlayCallback, setPendingPlayCallback] = useState<{ videoId: string; timestamp?: number } | null>(null)
  const [activePlayId, setActivePlayId] = useState<string | null>(null)
  const [activeTimestamp, setActiveTimestamp] = useState<number | undefined>(undefined)

  const [targetedIntelVideo, setTargetedIntelVideo] = useState<string | null>(null)

  // Read URL search params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const q = params.get('q')
      const cat = params.get('category')
      const mode = params.get('mode')
      const videoParam = params.get('video')
      const creatorParam = params.get('creator')

      if (videoParam) {
        setTargetedIntelVideo(videoParam)
        const match = CURATED_VIDEOS.find(v => v.id === videoParam || v.external_id === videoParam)
        if (match) {
          setVideos([match as Video, ...CURATED_VIDEOS.filter(v => v.id !== match.id) as Video[]])
          // Automatically spotlight and open requested POI intel video
          setActivePlayId(match.id)
        }
      }

      if (creatorParam) {
        setSearchQuery(creatorParam)
        setDebouncedSearchQuery(creatorParam)
      } else if (q) {
        setSearchQuery(q)
        setDebouncedSearchQuery(q)
      }
      if (cat) setSelectedCategory(cat)
      if (mode === 'schematic' || mode === 'semantic') setSearchMode('schematic')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCount = sessionStorage.getItem('video_opens_count')
      if (storedCount) setVideoOpensThisSession(parseInt(storedCount, 10))
      const storedDismissed = sessionStorage.getItem('last_ad_dismissed_time')
      if (storedDismissed) setLastAdDismissed(parseInt(storedDismissed, 10))
    }
  }, [])

  const supabase = createClient()

  // Load User & Category Counts
  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email })
        const { data: profile } = await supabase
          .from('users')
          .select('is_premium')
          .eq('id', session.user.id)
          .single()
        
        setIsPremium(!!profile?.is_premium)

        const { data: favs } = await supabase
          .from('favorites')
          .select('video_id')
          .eq('user_id', session.user.id)
        
        if (favs) setFavorites((favs as { video_id: string }[]).map((f) => f.video_id))

        const { data: fols } = await supabase
          .from('follows')
          .select('*')
          .eq('user_id', session.user.id)
        
        if (fols) {
          setFollowedCreators(fols.filter((f: any) => f.target_type === 'creator').map((f: any) => f.target_id))
          setFollowedCategories(fols.filter((f: any) => f.target_type === 'category').map((f: any) => f.target_id))
        }
      }
    }

    // Category counts tally
    const counts: Record<string, number> = { 'All Intel': CURATED_VIDEOS.length }
    CURATED_VIDEOS.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1
      v.secondary_categories?.forEach((sc) => {
        counts[sc] = (counts[sc] || 0) + 1
      })
    })
    setCategoryCounts(counts)

    loadSession()
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDebouncedSearchQuery(searchQuery)
  }

  const handleToggleFavorite = async (videoId: string, videoUUID: string) => {
    if (!user) {
      alert("Please log in to save favorites.")
      return
    }

    const isFav = favorites.includes(videoUUID) || favorites.includes(videoId)
    if (isFav) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('video_id', videoUUID)

      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('video_id', videoId)

      setFavorites(favorites.filter(id => id !== videoUUID && id !== videoId))
      setToast('Removed from favorites!')
    } else {
      const vidObj = videos.find(v => v.id === videoUUID || v.external_id === videoId) || CURATED_VIDEOS.find(v => v.id === videoUUID || v.external_id === videoId)
      await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          video_id: videoUUID,
          external_id: videoId,
          title: vidObj?.title || '',
          channel_name: vidObj?.channel_name || '',
          thumbnail_url: vidObj?.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        })

      setFavorites([...favorites, videoUUID])
      setToast('Added to favorites!')
    }
  }

  const handleToggleFollowCreator = async (creatorName: string) => {
    if (!user) {
      alert("Please log in to follow creators.")
      return
    }
    const isFollowing = followedCreators.includes(creatorName)
    if (isFollowing) {
      await supabase
        .from('follows')
        .delete()
        .eq('user_id', user.id)
        .eq('target_type', 'creator')
        .eq('target_id', creatorName)
      setFollowedCreators(prev => prev.filter(c => c !== creatorName))
      setToast(`Unfollowed ${creatorName}`)
    } else {
      await supabase
        .from('follows')
        .insert({
          user_id: user.id,
          target_type: 'creator',
          target_id: creatorName
        })
      setFollowedCreators(prev => [...prev, creatorName])
      setToast(`Following ${creatorName}`)
    }
  }

  const handleToggleFollowCategory = async (categoryName: string) => {
    if (!user) {
      alert("Please log in to follow categories.")
      return
    }
    const isFollowing = followedCategories.includes(categoryName)
    if (isFollowing) {
      await supabase
        .from('follows')
        .delete()
        .eq('user_id', user.id)
        .eq('target_type', 'category')
        .eq('target_id', categoryName)
      setFollowedCategories(prev => prev.filter(c => c !== categoryName))
      setToast(`Unfollowed category ${categoryName}`)
    } else {
      await supabase
        .from('follows')
        .insert({
          user_id: user.id,
          target_type: 'category',
          target_id: categoryName
        })
      setFollowedCategories(prev => [...prev, categoryName])
      setToast(`Following category ${categoryName}`)
    }
  }

  // Fetch Videos
  const fetchVideos = useCallback(async () => {
    setLoading(true)
    try {
      const q = debouncedSearchQuery
      const params = new URLSearchParams({ q, mode: searchMode, lang: selectedLanguage })
      if (targetedIntelVideo) params.set('video', targetedIntelVideo)
      if (selectedCategory && selectedCategory !== 'All Intel') {
        params.set('category', selectedCategory)
      }
      if (selectedPlatform) params.set('platform', selectedPlatform)

      const res = await fetch(`/api/search?${params}`)
      const data = await res.json()
      let filtered = (data.videos || []) as Video[]

      if (sortBy === 'schematic') {
        filtered.sort((a, b) => (b.schematicMatch?.score || 0) - (a.schematicMatch?.score || 0))
      } else {
        // Enforce strict order by date: newest video on top, followed by older according to upload date
        filtered.sort((a, b) => new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime())
      }

      setVideos(filtered)
    } catch (err) {
      console.error('Failed to fetch videos', err)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearchQuery, searchMode, selectedCategory, selectedPlatform, selectedLanguage, sortBy, targetedIntelVideo])

  // Live Sync Engine for real-time YouTube & Twitch uploads
  const syncLiveFeeds = useCallback(async (isManual = false) => {
    setIsSyncing(true)
    try {
      const res = await fetch('/api/videos/sync')
      if (res.ok) {
        const data = await res.json()
        setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        if (data.newVideosCount > 0) {
          setToast(`⚡ Live Radar: ${data.newVideosCount} new upload(s) synced to library!`)
          fetchVideos()
        } else if (isManual) {
          setToast('✓ Live Radar: YouTube & Twitch feeds are already up to date.')
        }
      }
    } catch (err) {
      console.warn('Live sync error:', err)
    } finally {
      setIsSyncing(false)
    }
  }, [fetchVideos])

  // Periodic 60-second live radar check
  useEffect(() => {
    syncLiveFeeds(false)
    const interval = setInterval(() => {
      syncLiveFeeds(false)
    }, 60000)
    return () => clearInterval(interval)
  }, [syncLiveFeeds])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 280)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    fetchVideos()
  }, [selectedCategory, selectedPlatform, selectedLanguage, sortBy, debouncedSearchQuery, targetedIntelVideo, fetchVideos])



  const handleOpenVideo = (videoUUID: string, timestamp?: number) => {
    if (isPremium) {
      setActivePlayId(videoUUID)
      setActiveTimestamp(timestamp)
    } else {
      const nextCount = videoOpensThisSession + 1
      setVideoOpensThisSession(nextCount)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('video_opens_count', nextCount.toString())
      }

      const now = Date.now()
      const cooldownActive = now - lastAdDismissed < 5 * 60 * 1000

      if (nextCount % INTERSTITIAL_EVERY_N_VIDEOS === 0 && !cooldownActive) {
        setPendingPlayCallback({ videoId: videoUUID, timestamp })
        setIsAdOpen(true)
      } else {
        setActivePlayId(videoUUID)
        setActiveTimestamp(timestamp)
      }
    }
  }

  const handleCloseAd = () => {
    setIsAdOpen(false)
    const now = Date.now()
    setLastAdDismissed(now)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('last_ad_dismissed_time', now.toString())
    }
    if (pendingPlayCallback) {
      setActivePlayId(pendingPlayCallback.videoId)
      setActiveTimestamp(pendingPlayCallback.timestamp)
      setPendingPlayCallback(null)
    }
  }

  // Spotlight featured video (First video in current result set or official trailer)
  const featuredVideo = useMemo(() => {
    if (videos.length === 0) return null
    return videos[0]
  }, [videos])

  return (
    <div className="bg-[#07090E] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-off-white">
      
      {/* Ad Interstitial wrapper */}
      <AdInterstitial 
        isOpen={isAdOpen} 
        onClose={handleCloseAd} 
        isPremium={isPremium} 
      />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 1. Header & Quick Metrics */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-deep-teal/70 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101724] border border-neon-flamingo/40 text-neon-flamingo text-xs font-mono uppercase tracking-widest">
              <Film className="w-3.5 h-3.5" />
              <span>Leonida Tactical Video Archive</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-wider text-off-white">
              INTEL &amp; VIDEO VAULT
            </h1>
            <p className="text-xs sm:text-sm text-off-white/60">
              Verified 4K game trailers, cartography analyses, RAGE 9 physics deep dives, and mission breakdowns for Grand Theft Auto VI.
            </p>
          </div>

          {/* Quick Metrics & Live Radar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Radar Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0E1624] border border-palm-teal/40 text-xs font-mono shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-palm-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-palm-teal"></span>
              </span>
              <span className="text-off-white/80 font-bold uppercase tracking-wider text-[11px]">Live Radar</span>
              <button
                onClick={() => syncLiveFeeds(true)}
                disabled={isSyncing}
                title="Sync newest YouTube & Twitch uploads now"
                className="ml-1 px-2 py-0.5 rounded-lg bg-deep-teal hover:bg-palm-teal/20 text-[10px] text-palm-teal hover:text-white border border-palm-teal/30 flex items-center gap-1 transition"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-deep-teal/40 border border-deep-teal/80 text-xs font-mono">
              <span className="text-sunset-orange font-bold mr-1.5">{videos.length}</span>
              <span className="text-off-white/60">Reels Indexed</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-deep-teal/40 border border-deep-teal/80 text-xs font-mono">
              <span className="text-palm-teal font-bold mr-1.5">100%</span>
              <span className="text-off-white/60">Verified 4K</span>
            </div>
          </div>
        </div>

        {/* 2. DUAL-MODE SEARCH SUITE (BIG DIFFERENCE BETWEEN KEYWORD & SCHEMATIC) */}
        <div className="space-y-4">
          {/* High-Contrast Mode Toggle Switch */}
          <div className="flex items-center justify-center">
            <div className="p-1.5 bg-[#0A0E17] border border-deep-teal rounded-2xl flex items-center gap-2 shadow-2xl">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  setSearchMode('keyword')
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 ${
                  searchMode === 'keyword'
                    ? 'bg-gradient-to-r from-deep-teal to-[#162235] text-palm-teal border border-palm-teal/40 shadow-lg'
                    : 'text-off-white/50 hover:text-off-white hover:bg-white/5'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>🔍 Standard Keyword Search</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  setSearchMode('schematic')
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 ${
                  searchMode === 'schematic'
                    ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white shadow-[0_0_25px_rgba(255,42,133,0.45)] border border-white/20'
                    : 'text-off-white/50 hover:text-neon-flamingo hover:bg-white/5'
                }`}
              >
                <Cpu className="w-4 h-4 animate-pulse" />
                <span>🧠 AI Schematic Vector Search</span>
              </button>
            </div>
          </div>

          {/* MODE A: STANDARD KEYWORD SEARCH BAR */}
          {searchMode === 'keyword' && (
            <div className="p-5 rounded-3xl bg-[#0C121D]/90 border border-deep-teal/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-off-white/50 px-1">
                <span className="flex items-center gap-1.5 text-palm-teal uppercase tracking-widest font-bold">
                  <Search className="w-3.5 h-3.5" />
                  Literal String &amp; Title Engine
                </span>
                <span>Fast Direct Search</span>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by video title, creator, or topic (e.g., 'trailer', 'infernus', 'physics')..."
                    className="w-full bg-[#07090E] border border-deep-teal/90 rounded-2xl pl-11 pr-10 py-3.5 text-xs sm:text-sm text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-palm-teal transition shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-off-white/40 hover:text-off-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-deep-teal hover:bg-deep-teal/80 text-palm-teal border border-palm-teal/40 font-mono text-xs uppercase font-bold tracking-wider rounded-2xl transition shadow hover:text-white"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {/* MODE B: ADVANCED AI SCHEMATIC TERMINAL */}
          {searchMode === 'schematic' && (
            <div className="p-6 rounded-3xl bg-[#090D15]/95 border-2 border-neon-flamingo/70 shadow-[0_0_35px_rgba(255,42,133,0.2)] space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-neon-flamingo/15 via-transparent to-transparent pointer-events-none" />
              
              {/* Terminal Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-deep-teal/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-flamingo animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
                    NEURAL SCHEMATIC VECTOR ENGINE • ACTIVE
                  </span>
                </div>
                <div className="text-[10px] font-mono text-palm-teal uppercase">
                  Semantic Concept Vectorization • High Precision
                </div>
              </div>

              {/* Schematic Query Input */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-3">
                <div className="relative flex-grow">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-flamingo animate-pulse" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Input conceptual schematic query (e.g. 'How does Leonida map scale compare to GTA 5?')..."
                    className="w-full bg-[#05070B] border border-neon-flamingo/50 rounded-2xl pl-11 pr-10 py-4 text-xs sm:text-sm text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-sunset-orange focus:ring-1 focus:ring-sunset-orange transition font-mono shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-off-white/40 hover:text-off-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-7 py-4 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-mono text-xs uppercase font-bold tracking-wider rounded-2xl transition shadow-[0_0_20px_rgba(255,42,133,0.4)] hover:scale-105"
                >
                  Execute Scan
                </button>
              </form>

              {/* Clickable Schematic Vector Preset Nodes */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono uppercase text-off-white/40 tracking-wider">
                  Interactive Schematic Vector Nodes (Tap to Scan):
                </div>
                <div className="flex flex-wrap gap-2">
                  {SCHEMATIC_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        soundFx.playClick()
                        setSearchQuery(preset.query)
                        setDebouncedSearchQuery(preset.query)
                      }}
                      className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-deep-teal/40 border border-deep-teal hover:border-sunset-orange/60 hover:text-sunset-orange text-off-white/70 transition shadow-sm hover:scale-105 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. NEAT HORIZONTAL CATEGORY NAVIGATION BAR */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase text-off-white/50 tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-palm-teal" />
                <span>Category Filtering</span>
              </span>
              {selectedCategory !== 'All Intel' && (
                <button
                  type="button"
                  onClick={() => handleToggleFollowCategory(selectedCategory)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center space-x-1.5 ${
                    followedCategories.includes(selectedCategory)
                      ? 'bg-palm-teal/20 text-palm-teal border border-palm-teal/40 font-bold'
                      : 'bg-[#0E1522] hover:bg-palm-teal/20 text-off-white/70 hover:text-palm-teal border border-deep-teal/70'
                  }`}
                >
                  {followedCategories.includes(selectedCategory) ? (
                    <>
                      <Check className="w-3 h-3 text-palm-teal" />
                      <span>Following {selectedCategory}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3" />
                      <span>Follow {selectedCategory}</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Platform Filter Buttons */}
              <div className="flex items-center gap-1 bg-[#0A0F1A] p-1 rounded-xl border border-deep-teal/80">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform(null)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                    selectedPlatform === null ? 'bg-deep-teal text-white font-bold shadow' : 'text-off-white/60 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('youtube')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition flex items-center gap-1 ${
                    selectedPlatform === 'youtube' ? 'bg-red-950/90 text-red-300 border border-red-700/50 font-bold shadow' : 'text-off-white/60 hover:text-white'
                  }`}
                >
                  🔴 YouTube
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('twitch')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition flex items-center gap-1 ${
                    selectedPlatform === 'twitch' ? 'bg-purple-950/90 text-purple-300 border border-purple-700/50 font-bold shadow' : 'text-off-white/60 hover:text-white'
                  }`}
                >
                  🟣 Twitch
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-off-white/40">Lang:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    soundFx.playClick()
                    setSelectedLanguage(e.target.value)
                  }}
                  className="px-2.5 py-1.5 bg-[#0C121D] border border-deep-teal/80 text-xs font-mono text-off-white rounded-xl outline-none focus:border-palm-teal cursor-pointer"
                >
                  <option value="en">🇬🇧 English (Default)</option>
                  <option value="hi">🇮🇳 हिन्दी</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="pt">🇧🇷 Português</option>
                  <option value="ru">🇷🇺 Русский</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="de">🇩🇪 Deutsch</option>
                  <option value="it">🇮🇹 Italiano</option>
                  <option value="all">🌐 All Languages</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-off-white/40">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-2.5 py-1.5 bg-[#0C121D] border border-deep-teal/80 text-xs font-mono text-off-white rounded-xl outline-none focus:border-palm-teal cursor-pointer"
                >
                  <option value="newest">📅 Latest / Upload Date (Default)</option>
                  <option value="relevance">🔥 Relevance</option>
                  <option value="schematic">⚡ Highest Match</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clean Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              const count = categoryCounts[cat] || (cat === 'All Intel' ? CURATED_VIDEOS.length : 0)
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playClick()
                    setSelectedCategory(cat)
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-mono uppercase tracking-wider transition whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-bold shadow-md'
                      : 'bg-[#0E1522] border border-deep-teal/70 text-off-white/60 hover:text-off-white hover:border-palm-teal/50'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-midnight-teal text-off-white/40'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3.5 TACTICAL POI INTEL LINKED BANNER */}
        {targetedIntelVideo && (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-neon-flamingo/20 via-deep-teal/40 to-palm-teal/20 border border-neon-flamingo/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neon-flamingo/25 text-neon-flamingo flex items-center justify-center border border-neon-flamingo/50 shrink-0 shadow-lg">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-neon-flamingo text-white font-bold tracking-wider">
                    📍 Tactical POI Intel Linked
                  </span>
                  <span className="text-xs text-palm-teal font-mono font-semibold">Surveillance result ready</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  {videos[0]?.title || searchQuery || 'Selected Location Intel Video'}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
              {videos[0] && (
                <button
                  onClick={() => handleOpenVideo(videos[0].id)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider hover:opacity-95 transition shadow-lg flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Intel</span>
                </button>
              )}
              <button
                onClick={() => {
                  setTargetedIntelVideo(null)
                  setSearchQuery('')
                  setDebouncedSearchQuery('')
                  if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href)
                    url.searchParams.delete('video')
                    url.searchParams.delete('q')
                    window.history.replaceState({}, '', url.toString())
                  }
                }}
                className="px-3 py-2.5 rounded-xl bg-black/60 hover:bg-black/90 border border-deep-teal text-off-white/70 hover:text-white text-xs font-mono uppercase font-bold transition flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All Intel</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. FEATURED INTEL SPOTLIGHT (NEATER TOP SHOWCASE) */}
        {!searchQuery && selectedCategory === 'All Intel' && featuredVideo && (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C131F] via-[#101928] to-[#0A0F1A] border border-deep-teal/90 shadow-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Spotlight Thumbnail */}
              <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden group bg-black shadow-xl">
                <img
                  src={featuredVideo.thumbnail_url}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                <Link
                  href={`/${locale}/library/${featuredVideo.id}`}
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,42,133,0.5)]">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </Link>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/80 text-[10px] font-mono text-palm-teal">
                  FEATURED 4K INTELLIGENCE
                </div>
              </div>

              {/* Spotlight Meta */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-flamingo/15 border border-neon-flamingo/30 text-neon-flamingo text-[10px] font-mono uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  <span>Verified Anchor Intel</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-off-white leading-tight">
                  {featuredVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-off-white/70 line-clamp-3 leading-relaxed">
                  {featuredVideo.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-off-white/50 pt-2">
                  <span>{featuredVideo.channel_name}</span>
                  <span>•</span>
                  <span>{featuredVideo.category}</span>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/${locale}/library/${featuredVideo.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider shadow-lg hover:scale-105 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Full Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AFFILIATE REVENUE BANNERS — shown to free users only (premium sees less noise) */}
        {!isPremium && !searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AffiliateBanner variant="preorder" />
            <AffiliateBanner variant="gaming-gear" />
          </div>
        )}

        {/* 5. ORGANIZED VIDEO GRID */}
        <div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {[...Array(12)].map((_, i) => (
                <VideoSkeleton key={i} />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-off-white/40 space-y-4 bg-deep-teal/10 rounded-3xl border border-deep-teal/30 p-12 text-center">
              <X className="w-12 h-12 text-neon-flamingo" />
              <h3 className="text-xl font-bold text-off-white font-display uppercase">No Intelligence Matches</h3>
              <p className="text-xs max-w-sm text-off-white/60">
                No videos match &quot;{searchQuery}&quot;. Try selecting an active schematic node or resetting your category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setDebouncedSearchQuery('')
                  setSelectedCategory('All Intel')
                  setSelectedPlatform(null)
                  setToast('Filters reset')
                }}
                className="mt-2 px-5 py-2.5 text-xs bg-neon-flamingo text-white font-bold font-mono uppercase rounded-xl shadow transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {videos.map((vid: Video, idx: number) => {
                const showAd = !isPremium && ((idx + 1) % BANNER_EVERY_N_VIDEOS === 0)
                return (
                  <div key={vid.id} className="contents">
                    <ScrollReveal className="h-full">
                      <div className="flex flex-col h-full space-y-2">
                        {/* Schematic Mode Intelligence Badge */}
                        {searchMode === 'schematic' && vid.schematicMatch && vid.schematicMatch.score > 0 && (
                          <div className="p-3 rounded-2xl bg-gradient-to-r from-neon-flamingo/20 via-[#101724] to-deep-teal/40 border border-neon-flamingo/50 space-y-1.5 shadow-md">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-neon-flamingo font-bold flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                {vid.schematicMatch.score}% Schematic Match
                              </span>
                              <span className="text-palm-teal text-[10px]">VERIFIED</span>
                            </div>
                            <p className="text-[11px] font-mono text-off-white/80 leading-snug">
                              {vid.schematicMatch.insight}
                            </p>
                            {vid.schematicMatch.matchedConcepts?.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {vid.schematicMatch.matchedConcepts.map((c) => (
                                  <span key={c} className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/40 text-sunset-orange border border-sunset-orange/30">
                                    #{c}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <VideoCard
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
                          isFavorited={favorites.includes(vid.id) || favorites.includes(vid.external_id)}
                          isPremium={isPremium}
                          isFollowingCreator={followedCreators.includes(vid.channel_name)}
                          onToggleFollowCreator={() => handleToggleFollowCreator(vid.channel_name)}
                          onToggleFavorite={() => handleToggleFavorite(vid.external_id, vid.id)}
                          onOpenVideo={(seconds) => handleOpenVideo(vid.id, seconds)}
                          priority={idx < 3}
                          activePlayId={activePlayId}
                          activeTimestamp={activeTimestamp}
                        />
                      </div>
                    </ScrollReveal>

                    {showAd && (
                      <ScrollReveal>
                        <div className="bg-deep-teal/40 border border-deep-teal/80 rounded-2xl overflow-hidden p-6 flex flex-col items-center justify-center min-h-[300px] text-center space-y-4 shadow-lg">
                          <span className="text-[10px] font-mono text-off-white/40 uppercase tracking-widest">Sponsored Intel</span>
                          <AdBanner slot={`grid-ad-${idx}`} format="rectangle" className="w-full h-full" />
                        </div>
                      </ScrollReveal>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
      {toast && <Toast text={toast} onClose={() => setToast(null)} />}
    </div>
  )
}

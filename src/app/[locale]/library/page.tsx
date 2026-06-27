'use client'

import { useEffect, useState } from 'react'
import { Search, Sparkles, Filter, RefreshCw, X, SlidersHorizontal, UserCheck } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import AdInterstitial from '@/components/AdInterstitial'
import { createClient } from '@/utils/supabase/client'

// Categories from Section 5
const CATEGORIES = [
  "Easter Eggs & Secrets",
  "Missions & Story",
  "Map & Exploration",
  "Characters",
  "Vehicles",
  "Weapons & Combat",
  "Money & Economy",
  "Online & Multiplayer",
  "Glitches & Bugs",
  "Speedruns & Challenges",
  "Customization & Style",
  "News & Trailers",
  "Mods & PC",
  "Soundtrack & World",
  "Theories & Comparisons",
  "Funny & Highlight Moments"
]

export default function LibraryPage({ params: { locale } }: { params: { locale: string } }) {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState<'keyword' | 'semantic'>('keyword')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  
  // Auth and Subscription State
  const [user, setUser] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([]) // Array of video_ids

  // Ad State (Section 7)
  const [videoOpensThisSession, setVideoOpensThisSession] = useState(0)
  const [isAdOpen, setIsAdOpen] = useState(false)
  const [pendingPlayCallback, setPendingPlayCallback] = useState<{ videoId: string; timestamp?: number } | null>(null)
  const [activePlayId, setActivePlayId] = useState<string | null>(null)
  const [activeTimestamp, setActiveTimestamp] = useState<number | undefined>(undefined)

  const supabase = createClient()

  // Load User, Favorites, and initial Videos
  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        // Fetch user premium status and role from db
        const { data: profile } = await supabase
          .from('users')
          .select('is_premium')
          .eq('id', session.user.id)
          .single()
        
        if (profile) {
          setIsPremium(profile.is_premium)
        }

        // Fetch favorites
        const { data: favs } = await supabase
          .from('favorites')
          .select('video_id')
          .eq('user_id', session.user.id)
        
        if (favs) {
          setFavorites(favs.map((f: any) => f.video_id))
        }
      }
    }
    loadSession()
    fetchVideos()
  }, [])

  // Refetch videos when sorting, filtering, or searching changes
  useEffect(() => {
    fetchVideos()
  }, [selectedCategory, selectedPlatform, sortBy])

  const fetchVideos = async (qOverride?: string) => {
    setLoading(true)
    try {
      const q = qOverride !== undefined ? qOverride : searchQuery
      // Call our search endpoint
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&mode=${searchMode}`)
      const data = await res.json()
      
      let filtered = data.videos || []

      // Client-side categorization & platform filtering if needed
      if (selectedCategory) {
        // Link to categories filter
        // In database structure we have video_categories, but in this search we mock/join the search.
        // For standard local development filter matching:
        filtered = filtered.filter((v: any) => {
          if (!v.categories && !v.tags) return true // Show all if categories missing
          // Fallback matching
          return true
        })
      }

      if (selectedPlatform) {
        filtered = filtered.filter((v: any) => v.platform === selectedPlatform)
      }

      // Sort
      if (sortBy === 'newest') {
        filtered.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      }

      setVideos(filtered)
    } catch (err) {
      console.error("Failed to fetch videos", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchVideos()
  }

  const handleToggleFavorite = async (videoId: string, videoUUID: string) => {
    if (!user) {
      alert("Please log in to save favorites.")
      return
    }

    const isFav = favorites.includes(videoUUID)
    if (isFav) {
      // Delete favorite
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('video_id', videoUUID)
      
      if (!error) {
        setFavorites(favorites.filter(id => id !== videoUUID))
      }
    } else {
      // Add favorite
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, video_id: videoUUID })
      
      if (!error) {
        setFavorites([...favorites, videoUUID])
      }
    }
  }

  // Handle opening video & triggering Interstitial (Section 7)
  const handleOpenVideo = (videoUUID: string, timestamp?: number) => {
    if (isPremium) {
      // Premium users: bypass ads completely
      setActivePlayId(videoUUID)
      setActiveTimestamp(timestamp)
    } else {
      // Free users: increment opens count
      const nextCount = videoOpensThisSession + 1
      setVideoOpensThisSession(nextCount)

      // Frequency check: open interstitial before the 1st view, then skip 2, then repeat
      if (nextCount % 3 === 1) {
        setPendingPlayCallback({ videoId: videoUUID, timestamp })
        setIsAdOpen(true)
      } else {
        // Go straight to video
        setActivePlayId(videoUUID)
        setActiveTimestamp(timestamp)
      }
    }
  }

  const handleCloseAd = () => {
    setIsAdOpen(false)
    if (pendingPlayCallback) {
      setActivePlayId(pendingPlayCallback.videoId)
      setActiveTimestamp(pendingPlayCallback.timestamp)
      setPendingPlayCallback(null)
    }
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Ad Interstitial wrapper component */}
      <AdInterstitial 
        isOpen={isAdOpen} 
        onClose={handleCloseAd} 
        isPremium={isPremium} 
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-wider text-off-white">
              Video Library
            </h1>
            <p className="text-xs sm:text-sm text-off-white/60">
              Auto-indexing GTA 6 guides, easter eggs, glitches, and mission walkthroughs.
            </p>
          </div>

          {/* Premium Status Banner */}
          {user && (
            <div className="flex items-center space-x-2 bg-deep-teal/80 border border-palm-teal/30 px-4 py-2 rounded-xl text-xs">
              <UserCheck className="w-4 h-4 text-palm-teal" />
              <span>Logged in as: <strong className="text-off-white">{user.email}</strong></span>
              {isPremium ? (
                <span className="bg-neon-flamingo text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded">Premium</span>
              ) : (
                <span className="bg-off-white/10 text-off-white/60 text-[9px] uppercase px-2 py-0.5 rounded">Free Tier</span>
              )}
            </div>
          )}
        </div>

        {/* 2. Search Controls */}
        <form onSubmit={handleSearchSubmit} className="relative w-full bg-deep-teal rounded-2xl p-4 border border-deep-teal/60 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative flex-grow w-full">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-off-white/40">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchMode === 'semantic' ? "Ask: 'Where is the hidden vehicle in the keys?'" : "Search easter eggs, missions..."}
                className="w-full pl-12 pr-4 py-3.5 bg-midnight-teal border border-deep-teal/80 hover:border-palm-teal/40 focus:border-palm-teal focus:ring-1 focus:ring-palm-teal rounded-xl text-sm text-off-white placeholder-off-white/40 transition outline-none"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-bold uppercase tracking-wider rounded-xl transition duration-200 shadow-md hover:scale-[1.02]"
            >
              Search
            </button>
          </div>

          {/* Search Modes Toggle */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span className="text-off-white/40 uppercase font-mono text-[10px] tracking-wider">Search mode:</span>
            
            {/* Keyword Search Option */}
            <button
              type="button"
              onClick={() => setSearchMode('keyword')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                searchMode === 'keyword'
                  ? 'bg-midnight-teal border-palm-teal/50 text-palm-teal'
                  : 'bg-transparent border-transparent text-off-white/60 hover:text-off-white'
              }`}
            >
              Keyword Match
            </button>

            {/* Semantic Search Option (Premium Highlight) */}
            <button
              type="button"
              onClick={() => {
                if (!isPremium) {
                  alert("AI Natural Language Semantic Search is a Premium Feature. Upgrade on the Pricing page to unlock it!")
                } else {
                  setSearchMode('semantic')
                }
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition ${
                searchMode === 'semantic'
                  ? 'bg-midnight-teal border-neon-flamingo/50 text-neon-flamingo'
                  : 'bg-transparent border-transparent text-off-white/60 hover:text-neon-flamingo'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Semantic Search</span>
              {!isPremium && <span className="bg-neon-flamingo/20 text-neon-flamingo text-[8px] px-1.5 py-0.5 rounded">Pro</span>}
            </button>
          </div>
        </form>

        {/* 3. Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Collapsible Sidebar Filter Panel */}
          <aside className="lg:col-span-1 bg-deep-teal/40 border border-deep-teal/80 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-midnight-teal/40 pb-4">
              <span className="font-display uppercase text-lg text-off-white flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-palm-teal" />
                <span>Filters</span>
              </span>
              {(selectedCategory || selectedPlatform) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedPlatform(null)
                  }}
                  className="text-[10px] text-neon-flamingo uppercase font-bold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Sorting Select */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-off-white/40 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-midnight-teal border border-deep-teal/80 text-sm text-off-white rounded-lg outline-none focus:ring-1 focus:ring-palm-teal"
              >
                <option value="newest">Newest Uploads</option>
                <option value="relevance">Relevance</option>
                <option value="discussed">Most Discussed</option>
              </select>
            </div>

            {/* Platform Select */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-off-white/40 block">Platform</label>
              <div className="flex gap-2">
                {['youtube', 'twitch'].map(plat => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setSelectedPlatform(selectedPlatform === plat ? null : plat)}
                    className={`flex-1 py-1.5 border text-xs capitalize font-bold rounded-lg transition ${
                      selectedPlatform === plat
                        ? 'bg-palm-teal text-white border-palm-teal'
                        : 'bg-midnight-teal border-deep-teal text-off-white/70 hover:text-off-white'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>

            {/* Collapsible categories list */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-off-white/40 block">Category Taxonomy</label>
              <div className="max-h-[300px] overflow-y-auto space-y-1.5 pr-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-palm-teal/20 text-palm-teal font-semibold'
                        : 'hover:bg-midnight-teal/40 text-off-white/75 hover:text-off-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Videos Grid */}
          <section className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-off-white/60 space-y-4">
                <RefreshCw className="w-8 h-8 animate-spin text-palm-teal" />
                <span className="text-sm font-mono uppercase tracking-wider">Syncing database...</span>
              </div>
            ) : videos.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-off-white/40 space-y-4 bg-deep-teal/10 rounded-2xl border border-deep-teal/30 p-8 text-center">
                <X className="w-12 h-12 text-neon-flamingo" />
                <h3 className="text-lg font-bold text-off-white">No results found</h3>
                <p className="text-xs max-w-sm">
                  Try searching another term, or verify that the simulated database cron ingest has been run.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                    setSelectedPlatform(null)
                    fetchVideos('')
                  }}
                  className="mt-2 px-4 py-2 text-xs bg-deep-teal text-off-white hover:text-palm-teal font-bold uppercase rounded border border-deep-teal transition"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((vid: any, idx: number) => (
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
                    isFavorited={favorites.includes(vid.id)}
                    isPremium={isPremium}
                    onToggleFavorite={() => handleToggleFavorite(vid.external_id, vid.id)}
                    onOpenVideo={(seconds) => handleOpenVideo(vid.id, seconds)}
                    priority={idx < 2}
                  />
                ))}
              </div>
            )}
          </section>

        </div>

      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Play, Clock, ArrowLeft, ExternalLink, Calendar } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'
import AdBanner from '@/components/AdBanner'

interface Timestamp {
  label: string
  seconds: number
}

interface Video {
  id: string
  platform: 'youtube' | 'twitch'
  external_id: string
  title: string
  description: string
  channel_name: string
  channel_url: string
  thumbnail_url: string
  published_at: string
  video_timestamps?: Timestamp[]
}

interface UserProfile {
  id: string
  email?: string
}

export default function VideoDetailClient({ video, locale }: { video: Video; locale: string }) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    async function checkFavoriteAndSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email })

          // Check if favorited
          const { data: fav } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('video_id', video.id)
            .maybeSingle()
          
          setIsFavorited(!!fav)

          // Fetch is_premium status
          const { data: profile } = await supabase
            .from('users')
            .select('is_premium')
            .eq('id', session.user.id)
            .maybeSingle()
          
          if (profile) {
            setIsPremium(!!profile.is_premium)
          }
        }
      } catch (err) {
        console.error('Error fetching favorite status:', err)
      }
    }

    checkFavoriteAndSession()
  }, [video.id])

  const handleToggleFavorite = async () => {
    if (!user) {
      alert('Please log in to save favorites.')
      return
    }

    const supabase = createClient()

    if (isFavorited) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('video_id', video.id)

      if (!error) setIsFavorited(false)
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, video_id: video.id })

      if (!error) setIsFavorited(true)
    }
  }

  const handlePlayClick = (seconds?: number) => {
    setIsPlaying(true)
    if (seconds !== undefined) {
      setActiveTimestamp(seconds)
    }
  }

  const embedUrl = video.platform === 'youtube'
    ? `https://www.youtube.com/embed/${video.external_id}?autoplay=1&start=${activeTimestamp || 0}`
    : `https://player.twitch.tv/?video=${video.external_id}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true&time=${activeTimestamp ? `${activeTimestamp}s` : '0s'}`

  return (
    <div className="bg-midnight-teal min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push(`/${locale}/library`)}
            className="flex items-center space-x-2 px-4 py-2 bg-deep-teal/40 hover:bg-palm-teal/20 text-off-white hover:text-palm-teal rounded-xl border border-deep-teal/60 transition text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Library</span>
          </button>

          <button
            onClick={handleToggleFavorite}
            className="flex items-center space-x-2 px-4 py-2 bg-deep-teal/40 hover:bg-neon-flamingo/10 text-off-white hover:text-neon-flamingo rounded-xl border border-deep-teal/60 transition text-xs font-bold uppercase tracking-wider"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'text-neon-flamingo fill-current' : 'text-off-white/80'}`} />
            <span>{isFavorited ? 'Saved to Favorites' : 'Add to Favorites'}</span>
          </button>
        </div>

        {/* Two Column Layout: Video Player + Details & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Embedded Player */}
            <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-deep-teal/60">
              {isPlaying ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="relative w-full h-full group flex items-center justify-center">
                  <div className="relative w-full h-full aspect-video">
                    <Image
                      src={video.thumbnail_url || `https://img.youtube.com/vi/${video.external_id}/maxresdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300" />
                  
                  <button
                    onClick={() => handlePlayClick()}
                    className="absolute z-10 p-5 bg-neon-flamingo hover:bg-sunset-orange text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Video Meta info */}
            <div className="bg-deep-teal/20 border border-deep-teal/60 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-midnight-teal/40 pb-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-off-white leading-snug">
                    {video.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-xs font-mono uppercase tracking-wider text-palm-teal mt-3">
                    <a
                      href={video.channel_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center space-x-1 hover:text-sunset-orange"
                    >
                      <span>{video.channel_name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(video.published_at).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-widest text-off-white/40">
                  Video Description & Context
                </h3>
                <p className="text-sm text-off-white/75 leading-relaxed whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>

              {/* Deep Link Timestamps */}
              {video.video_timestamps && video.video_timestamps.length > 0 && (
                <div className="pt-6 border-t border-midnight-teal/30">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-off-white/40 mb-4 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-palm-teal" />
                    <span>Deep-Link Secret Timestamps</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {video.video_timestamps.map((ts: Timestamp, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handlePlayClick(ts.seconds)}
                        className="flex items-center justify-between px-4 py-3 bg-midnight-teal hover:bg-palm-teal/20 text-off-white hover:text-palm-teal rounded-xl border border-deep-teal/80 hover:border-palm-teal/40 transition text-left text-xs"
                      >
                        <span className="font-semibold truncate max-w-[180px]">{ts.label}</span>
                        <span className="font-mono bg-deep-teal/40 px-2 py-0.5 rounded text-off-white/60">
                          {Math.floor(ts.seconds / 60)}:{(ts.seconds % 60).toString().padStart(2, '0')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar Section */}
          <aside className="space-y-6">
            <div className="bg-deep-teal/40 border border-deep-teal/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-off-white/40">
                Information
              </h3>
              <p className="text-xs text-off-white/60 leading-relaxed">
                All video content is parsed, aggregated, and embedded from official video platforms. Support the creators by visiting their channels directly.
              </p>
            </div>

            {!isPremium && (
              <div className="space-y-2">
                <h3 className="text-xs uppercase font-mono tracking-widest text-off-white/40">
                  Sponsored Advertisement
                </h3>
                <AdBanner slot="sidebar-detail" format="rectangle" />
              </div>
            )}
          </aside>

        </div>

      </div>
    </div>
  )
}

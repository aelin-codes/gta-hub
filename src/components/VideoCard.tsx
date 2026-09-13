'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, Play, ExternalLink, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { formatExactDate, formatRelativeDate } from '@/utils/date'

import AgeBypassPlayer from '@/components/AgeBypassPlayer'

interface Timestamp {
  label: string
  seconds: number
}

export interface Video {
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

interface VideoCardProps {
  video: Video
  isFavorited: boolean
  isPremium: boolean
  isFollowingCreator?: boolean
  onToggleFollowCreator?: () => void
  onToggleFavorite: () => void
  onOpenVideo: (seconds?: number) => void // Trigger open video / interstitial
  priority?: boolean
  activePlayId?: string | null
  activeTimestamp?: number
}

export default function VideoCard({
  video,
  isFavorited,
  isPremium,
  isFollowingCreator = false,
  onToggleFollowCreator,
  onToggleFavorite,
  onOpenVideo,
  priority = false,
  activePlayId = null,
  activeTimestamp: activeTimestampProp
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  useEffect(() => {
    if (activePlayId === video.id) {
      setIsPlaying(true)
      if (activeTimestampProp !== undefined) {
        setActiveTimestamp(activeTimestampProp)
      }
    }
  }, [activePlayId, video.id, activeTimestampProp])

  // Motion values for 3D card tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for tilt stiffness
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 15 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 15 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (reducedMotion || isPlaying) return
    const el = cardRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left - width / 2
    const mouseY = event.clientY - rect.top - height / 2

    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handlePlayClick = (seconds?: number) => {
    // When playing, we render the embedded iframe directly (lazy load)
    if (isPremium) {
      setIsPlaying(true)
      if (seconds !== undefined) {
        setActiveTimestamp(seconds)
      }
    } else {
      // Trigger callback (which handles interstitial logic for free users)
      onOpenVideo(seconds)
    }
  }

  const embedUrl = video.platform === 'youtube'
    ? `https://www.youtube.com/embed/${video.external_id}?autoplay=1&start=${activeTimestamp || 0}`
    : `https://player.twitch.tv/?video=${video.external_id}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true&time=${activeTimestamp ? `${activeTimestamp}s` : '0s'}`
  const exactUploadDate = formatExactDate(video.published_at)
  const relativeUploadDate = formatRelativeDate(video.published_at)

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative flex flex-col bg-deep-teal rounded-xl overflow-hidden border border-deep-teal/40 hover:border-palm-teal/50 shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      
      {/* 1. Thumbnail / Embedded Player */}
      <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
        {isPlaying ? (
          <AgeBypassPlayer
            videoId={video.external_id}
            title={video.title}
            timestamp={activeTimestamp || 0}
            platform={video.platform}
            autoplay={true}
          />
        ) : (
          <>
            {/* Lazy Preview */}
            <Image
              src={video.thumbnail_url || 'https://img.youtube.com/vi/mock/maxresdefault.jpg'}
              alt={video.title}
              width={480}
              height={270}
              priority={priority}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading={priority ? undefined : "lazy"}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />
            
            {/* Play Button Overlay */}
            <button
              onClick={() => handlePlayClick()}
              aria-label="Play video"
              className="absolute z-10 p-4 bg-neon-flamingo hover:bg-sunset-orange text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-palm-teal focus:ring-offset-2 focus:ring-offset-deep-teal"
            >
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </button>
          </>
        )}

        {/* Platform & Recency Pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
            video.platform === 'twitch'
              ? 'bg-purple-950/80 text-purple-300 border border-purple-500/50'
              : 'bg-red-950/80 text-red-300 border border-red-500/50'
          }`}>
            {video.platform === 'twitch' ? '🟣 Twitch' : '🔴 YouTube'}
          </span>
          {video.published_at && (Date.now() - new Date(video.published_at).getTime() < 72 * 3600000) && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-neon-flamingo/90 text-white border border-white/40 shadow-[0_0_10px_rgba(255,42,133,0.6)] animate-pulse">
              ⚡ NEW
            </span>
          )}
        </div>

        {/* Favorite heart toggle */}
        <button
          onClick={onToggleFavorite}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 z-10 p-2 bg-midnight-teal/80 hover:bg-midnight-teal text-white rounded-full transition hover:scale-105 border border-deep-teal/60 focus:outline-none focus:ring-2 focus:ring-neon-flamingo"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'text-neon-flamingo fill-current' : 'text-off-white/80'}`} />
        </button>
      </div>

      {/* 2. Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Creator Attribution */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-palm-teal mb-2">
            <div className="flex items-center space-x-2 truncate">
              <a 
                href={video.channel_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline flex items-center space-x-1 hover:text-sunset-orange truncate"
              >
                <span className="truncate">{video.channel_name}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
              {onToggleFollowCreator && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onToggleFollowCreator()
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider transition ${
                    isFollowingCreator
                      ? 'bg-palm-teal/20 text-palm-teal border border-palm-teal/40 font-bold'
                      : 'bg-deep-teal/60 hover:bg-palm-teal/20 text-off-white/70 hover:text-palm-teal border border-deep-teal/80'
                  }`}
                  title={isFollowingCreator ? `Unfollow ${video.channel_name}` : `Follow ${video.channel_name}`}
                >
                  {isFollowingCreator ? '✓ Following' : '+ Follow'}
                </button>
              )}
            </div>
            <span title={exactUploadDate} className="flex-shrink-0 ml-2 text-off-white/70 flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-sunset-orange/80" />
              <span>{relativeUploadDate}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-md font-bold text-off-white leading-snug line-clamp-2 group-hover:text-sunset-orange transition-colors duration-200">
            <Link href={`/${locale}/library/${video.id}`}>
              {video.title}
            </Link>
          </h3>

          {/* Summary / Description */}
          <p className="text-xs text-off-white/60 mt-2 line-clamp-2">
            {video.description}
          </p>
        </div>

        {/* 3. Deep-Link Timestamps (Section 6) */}
        {video.video_timestamps && video.video_timestamps.length > 0 && (
          <div className="mt-4 pt-4 border-t border-midnight-teal/30">
            <span className="text-[10px] uppercase font-mono tracking-wider text-off-white/40 block mb-2">
              Deep Links / Secrets
            </span>
            <div className="flex flex-wrap gap-2">
              {video.video_timestamps.map((ts, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlayClick(ts.seconds)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 text-xs bg-midnight-teal hover:bg-palm-teal/20 text-off-white hover:text-palm-teal rounded border border-deep-teal/80 hover:border-palm-teal/40 transition duration-150 focus:outline-none focus:ring-1 focus:ring-palm-teal"
                >
                  <Clock className="w-3 h-3" />
                  <span className="truncate max-w-[120px]">{ts.label}</span>
                  <span className="text-[10px] font-mono opacity-60">
                    {Math.floor(ts.seconds / 60)}:{(ts.seconds % 60).toString().padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  )
}

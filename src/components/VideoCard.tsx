'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, Play, ExternalLink, Clock } from 'lucide-react'
import Link from 'next/link'

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

interface VideoCardProps {
  video: Video
  isFavorited: boolean
  isPremium: boolean
  onToggleFavorite: () => void
  onOpenVideo: (seconds?: number) => void // Trigger open video / interstitial
}

export default function VideoCard({
  video,
  isFavorited,
  isPremium,
  onToggleFavorite,
  onOpenVideo
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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
          <iframe
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <>
            {/* Lazy Preview */}
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
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
            <a 
              href={video.channel_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:underline flex items-center space-x-1 hover:text-sunset-orange"
            >
              <span>{video.channel_name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>{new Date(video.published_at).toLocaleDateString()}</span>
          </div>

          {/* Title */}
          <h3 className="text-md font-bold text-off-white leading-snug line-clamp-2 group-hover:text-sunset-orange transition-colors duration-200">
            {video.title}
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

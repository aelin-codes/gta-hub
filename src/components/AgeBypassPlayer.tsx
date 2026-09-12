'use client'

import { useState } from 'react'
import { Unlock, ExternalLink, RefreshCw, Film } from 'lucide-react'

interface AgeBypassPlayerProps {
  videoId: string
  title: string
  timestamp?: number
  platform?: string
  autoplay?: boolean
  className?: string
}

const BYPASS_SERVERS = [
  { name: 'Invidious Fast', url: (id: string, ts: number) => `https://yewtu.be/embed/${id}?autoplay=1&t=${ts}` },
  { name: 'Invidious Direct', url: (id: string, ts: number) => `https://invidious.nerdvpn.de/embed/${id}?autoplay=1&t=${ts}` },
  { name: 'Piped Stream', url: (id: string) => `https://piped.video/embed/${id}?autoplay=1` },
]

export default function AgeBypassPlayer({
  videoId,
  title,
  timestamp = 0,
  platform = 'youtube',
  autoplay = true,
  className = 'w-full h-full'
}: AgeBypassPlayerProps) {
  const [engine, setEngine] = useState<'standard' | 'bypass'>('standard')
  const [serverIndex, setServerIndex] = useState(0)

  // Standard YouTube Embed URL
  const standardUrl = platform === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&start=${timestamp}&rel=0&modestbranding=1`
    : `https://player.twitch.tv/?video=${videoId}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true&time=${timestamp ? `${timestamp}s` : '0s'}`

  // Bypass Embed URL
  const bypassServer = BYPASS_SERVERS[serverIndex % BYPASS_SERVERS.length]
  const bypassUrl = platform === 'youtube'
    ? bypassServer.url(videoId, timestamp)
    : standardUrl

  const currentEmbedUrl = engine === 'bypass' ? bypassUrl : standardUrl

  const handlePopout = () => {
    const url = platform === 'youtube'
      ? `https://www.youtube.com/watch?v=${videoId}${timestamp ? `&t=${timestamp}s` : ''}`
      : `https://www.twitch.tv/videos/${videoId}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const cycleServer = () => {
    setServerIndex((prev) => (prev + 1) % BYPASS_SERVERS.length)
  }

  return (
    <div className="flex flex-col w-full h-full bg-black rounded-xl overflow-hidden relative group">
      {/* 1. Embedded Player Frame */}
      <div className="relative flex-grow w-full aspect-video">
        <iframe
          key={`${engine}-${serverIndex}-${videoId}`}
          src={currentEmbedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={className}
        />
      </div>

      {/* 2. Age Restriction Bypass & Mode Toolbar */}
      <div className="bg-midnight-teal/95 border-t border-deep-teal/60 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          {engine === 'bypass' ? (
            <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-neon-flamingo/20 border border-neon-flamingo/40 text-neon-flamingo font-mono text-[10px] font-bold uppercase tracking-wider animate-pulse">
              <Unlock className="w-3 h-3" />
              <span>🔞 16+/18+ Bypass Active ({bypassServer.name})</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-deep-teal/60 text-off-white/70 font-mono text-[10px]">
              <Film className="w-3 h-3 text-palm-teal" />
              <span>Official Player</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {platform === 'youtube' && (
            <>
              {engine === 'standard' ? (
                <button
                  type="button"
                  onClick={() => setEngine('bypass')}
                  className="px-2.5 py-1 bg-neon-flamingo/20 hover:bg-neon-flamingo/30 text-neon-flamingo border border-neon-flamingo/50 rounded text-[11px] font-bold tracking-wide flex items-center space-x-1 transition shadow-sm"
                  title="Bypass YouTube 16+/18+ age restriction sign-in prompt without logging into Google"
                >
                  <Unlock className="w-3 h-3" />
                  <span>Bypass 16+ Age Gate</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={cycleServer}
                    className="px-2 py-1 bg-deep-teal hover:bg-deep-teal/80 text-palm-teal rounded text-[10px] font-mono flex items-center space-x-1 transition"
                    title="Switch bypass server if video is loading slow"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Switch Server</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngine('standard')}
                    className="px-2 py-1 bg-deep-teal/50 hover:bg-deep-teal text-off-white/80 rounded text-[11px] transition"
                  >
                    Standard Player
                  </button>
                </>
              )}
            </>
          )}

          <button
            type="button"
            onClick={handlePopout}
            className="px-2 py-1 bg-deep-teal/40 hover:bg-deep-teal text-off-white/80 hover:text-off-white rounded text-[11px] flex items-center space-x-1 transition"
            title="Open video directly in a new window"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">Popout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

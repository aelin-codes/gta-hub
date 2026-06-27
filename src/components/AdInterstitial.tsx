'use client'

import { useEffect, useState } from 'react'
import { X, PlayCircle, ShieldCheck } from 'lucide-react'

interface AdInterstitialProps {
  isOpen: boolean
  onClose: () => void
  isPremium: boolean
}

export default function AdInterstitial({
  isOpen,
  onClose,
  isPremium
}: AdInterstitialProps) {
  const [secondsLeft, setSecondsLeft] = useState(5)
  const [canSkip, setCanSkip] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    setSecondsLeft(5)
    setCanSkip(false)

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanSkip(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  if (!isOpen || isPremium) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight-teal/95 backdrop-blur-md p-4 animate-fade-in">
      
      {/* Ad Card Container */}
      <div className="relative max-w-lg w-full bg-deep-teal border border-neon-flamingo/30 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
        
        {/* Ad Badge */}
        <div className="absolute top-4 left-4 bg-midnight-teal px-3 py-1 rounded text-[10px] font-mono text-off-white/40 uppercase tracking-widest border border-deep-teal">
          Sponsored Ad
        </div>

        {/* Premium Upgrade Prompt */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 text-xs font-semibold text-palm-teal bg-palm-teal/10 px-3 py-1 rounded-full border border-palm-teal/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ad-Free with Premium</span>
        </div>

        {/* Main Ad Content / Banner Mockup */}
        <div className="w-full mt-10 p-8 rounded-xl bg-midnight-teal border border-deep-teal flex flex-col items-center justify-center min-h-[220px]">
          {/* Ad creative illustration */}
          <div className="w-16 h-16 rounded-full bg-neon-flamingo/10 flex items-center justify-center text-neon-flamingo mb-4 animate-pulse">
            <PlayCircle className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-off-white">Unlock Full Leonida Maps</h4>
          <p className="text-xs text-off-white/60 mt-2 max-w-xs leading-relaxed">
            Get the coordinates of all 100+ collectables instantly. Save checklists and track 100% completion in real-time.
          </p>
          <button className="mt-4 px-5 py-2 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white rounded-lg shadow-lg hover:opacity-90 transition">
            Learn More
          </button>
        </div>

        {/* AdSense Compliance Google Vignette Banner placeholder */}
        <div className="text-[10px] text-off-white/30 font-mono mt-3">
          Ad via Google AdSense Interstitial Unit #4912
        </div>

        {/* Skip controls */}
        <div className="mt-6 w-full flex flex-col items-center">
          {canSkip ? (
            <button
              onClick={onClose}
              className="w-full py-3 bg-neon-flamingo hover:bg-sunset-orange text-white text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-palm-teal"
            >
              Continue to Video
            </button>
          ) : (
            <button
              disabled
              className="w-full py-3 bg-midnight-teal text-off-white/40 text-sm font-bold uppercase tracking-widest rounded-xl border border-deep-teal/60 cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Wait {secondsLeft}s to skip</span>
            </button>
          )}

          <p className="text-[10px] text-off-white/40 mt-3 leading-relaxed">
            Frequency-capped: Interstitials appear once every 3 video views to keep the fan community ad experience fair.
          </p>
        </div>

      </div>
    </div>
  )
}

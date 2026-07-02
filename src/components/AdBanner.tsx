'use client'

import { useEffect, useRef, useState } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  responsive?: 'true' | 'false'
  style?: React.CSSProperties
  className?: string
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = 'true',
  style,
  className = ''
}: AdBannerProps) {
  const [adFailed, setAdFailed] = useState(false)
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    // Check if cookie consent was accepted
    const consent = typeof window !== 'undefined' ? localStorage.getItem('gta_cookie_consent') : null
    if (consent !== 'accepted') {
      return
    }

    try {
      const win = window as Window & { adsbygoogle?: unknown[] }
      // Check if adsbygoogle script is loaded on the page
      if (typeof window !== 'undefined' && win.adsbygoogle) {
        win.adsbygoogle.push({})
      } else {
        // If not loaded, check after a short delay
        const timer = setTimeout(() => {
          if (typeof window !== 'undefined' && win.adsbygoogle) {
            win.adsbygoogle.push({})
          } else {
            setAdFailed(true)
          }
        }, 2000)
        return () => clearTimeout(timer)
      }
    } catch (err) {
      console.warn('AdSense push failed:', err)
      setAdFailed(true)
    }
  }, [])

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'pub-mock'

  // If cookie consent is not accepted, we render a placeholder with reserved space
  // so the layout does not shift later when the user accepts.
  // If the ad failed to load or adblocker blocked it, we render empty reserved space.
  return (
    <div 
      className={`relative w-full mx-auto overflow-hidden bg-deep-teal/10 border border-deep-teal/20 rounded-2xl flex flex-col items-center justify-center transition duration-300 ${className}`}
      style={{ 
        minHeight: '250px',
        maxHeight: '300px',
        ...style 
      }}
    >
      {!adFailed ? (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%', 
            minHeight: '250px',
            ...style 
          }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      ) : (
        // Premium fallback/placeholder (non-intrusive empty reserved space)
        <div className="flex flex-col items-center justify-center p-6 text-center text-off-white/20 font-mono text-[10px] tracking-widest uppercase">
          <span>Advertisement</span>
        </div>
      )}
    </div>
  )
}

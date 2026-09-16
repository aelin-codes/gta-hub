'use client'

import { useEffect, useRef, useState } from 'react'
import { MONETIZATION_CONFIG } from '@/config/monetization'
import AffiliateBanner from './AffiliateBanner'

interface AdBannerProps {
  slot?: string
  format?: 'auto' | 'fluid' | 'rectangle'
  responsive?: 'true' | 'false'
  style?: React.CSSProperties
  className?: string
}

export default function AdBanner({
  slot = 'default-slot',
  format = 'auto',
  responsive = 'true',
  style,
  className = ''
}: AdBannerProps) {
  const [adFailed, setAdFailed] = useState(false)
  const adRef = useRef<HTMLModElement>(null)

  const aadsUnitId = MONETIZATION_CONFIG.aads.unitId
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  useEffect(() => {
    // If A-Ads unit is provided, no AdSense script needed
    if (aadsUnitId) return

    // If AdSense is not configured, fail over to affiliate banner fallback
    if (!publisherId || publisherId.includes('REPLACE_WITH')) {
      setAdFailed(true)
      return
    }

    try {
      const win = window as Window & { adsbygoogle?: unknown[] }
      if (typeof window !== 'undefined' && win.adsbygoogle) {
        win.adsbygoogle.push({})
      } else {
        const timer = setTimeout(() => {
          if (typeof window !== 'undefined' && win.adsbygoogle) {
            win.adsbygoogle.push({})
          } else {
            setAdFailed(true)
          }
        }, 2000)
        return () => clearTimeout(timer)
      }
    } catch {
      setAdFailed(true)
    }
  }, [aadsUnitId, publisherId])

  // Case 1: A-Ads (Zero KYC Bitcoin ad network) configured
  if (aadsUnitId) {
    return (
      <div 
        className={`relative w-full mx-auto overflow-hidden bg-deep-teal/10 border border-deep-teal/30 rounded-2xl flex flex-col items-center justify-center transition duration-300 ${className}`}
        style={{ minHeight: '120px', ...style }}
      >
        <div className="w-full h-full min-h-[100px] flex items-center justify-center p-2">
          <iframe
            data-aa={aadsUnitId}
            src={`https://acceptable.a-ads.com/${aadsUnitId}`}
            style={{
              border: 0,
              padding: 0,
              width: '100%',
              height: '100%',
              minHeight: '100px',
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}
            title="Advertisement"
          />
        </div>
      </div>
    )
  }

  // Case 2: AdSense failed or not configured yet -> fallback to high converting Affiliate Banner
  if (adFailed) {
    return <AffiliateBanner variant="gaming-gear" className={className} />
  }

  // Case 3: Google AdSense unit
  return (
    <div 
      className={`relative w-full mx-auto overflow-hidden bg-deep-teal/10 border border-deep-teal/20 rounded-2xl flex flex-col items-center justify-center transition duration-300 ${className}`}
      style={{ 
        minHeight: '250px',
        maxHeight: '300px',
        ...style 
      }}
    >
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
        data-ad-client={publisherId || 'pub-mock'}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}


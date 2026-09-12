'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { Cookie, X } from 'lucide-react'

export function ThirdPartyScripts() {
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gta_cookie_consent')
      setConsent(stored)
    }
  }, [])

  if (consent !== 'accepted') return null

  const adsensePubId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'pub-mock'

  return (
    <>
      <Script
        id="adsense-init"
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePubId}`}
        crossOrigin="anonymous"
      />
    </>
  )
}

export function CookieConsentBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gta_cookie_consent')
      if (!stored) {
        setShow(true)
      }
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('gta_cookie_consent', 'accepted')
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('gta_cookie_consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-40 max-w-sm sm:max-w-md bg-[#091519]/95 border border-palm-teal/40 rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-md animate-fade-in-up">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-palm-teal/20 text-palm-teal">
            <Cookie className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-off-white font-mono">
            Cookies & Privacy Notice
          </span>
        </div>
        <button
          onClick={handleDecline}
          className="p-1 text-off-white/40 hover:text-off-white rounded-lg transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs text-[#F1F5F4]/75 leading-relaxed space-y-1 mt-1">
        <p>
          GTA 6 Hub uses minimal cookies to personalize intel, cache local favorites, and support the project via non-intrusive ads. 
          Learn more in our <a href="/en/privacy" className="underline hover:text-palm-teal text-palm-teal">Privacy Policy</a>.
        </p>
      </div>

      <div className="flex items-center justify-end space-x-2 mt-4 pt-2 border-t border-deep-teal/40">
        <button
          onClick={handleDecline}
          className="px-3.5 py-1.5 border border-deep-teal/80 hover:border-neon-flamingo/50 text-[11px] font-mono uppercase font-bold rounded-xl text-[#F1F5F4]/60 hover:text-[#F1F5F4] transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-[11px] font-mono uppercase font-bold rounded-xl hover:opacity-95 transition shadow-lg"
        >
          Accept All
        </button>
      </div>
    </div>
  )
}

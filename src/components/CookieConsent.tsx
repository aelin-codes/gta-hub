'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

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
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  const handleDecline = () => {
    localStorage.setItem('gta_cookie_consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0F2E33] border-t border-[#1FA9A0]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto md:rounded-t-2xl md:border-x">
      <div className="text-xs text-[#F1F5F4]/80 leading-relaxed max-w-3xl">
        <p className="font-bold text-[#F1F5F4] mb-1">We respect your privacy</p>
        GTA 6 Hub uses cookies to personalize content, analyze traffic, and support monetization via non-intrusive Vignette ads (Google AdSense). 
        You can read more in our <a href="/en/privacy" className="underline hover:text-[#1FA9A0]">Privacy Policy</a>. 
        By clicking &quot;Accept All&quot;, you consent to our use of non-essential cookies.
      </div>
      <div className="flex space-x-3 shrink-0">
        <button
          onClick={handleDecline}
          className="px-4 py-2 border border-[#0F2E33] hover:border-[#FF3D81] text-xs font-bold uppercase rounded-lg text-[#F1F5F4]/60 hover:text-[#F1F5F4] transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2 bg-gradient-to-r from-[#FF3D81] to-[#FF7A45] text-white text-xs font-bold uppercase rounded-lg hover:opacity-90 transition shadow-lg"
        >
          Accept All
        </button>
      </div>
    </div>
  )
}

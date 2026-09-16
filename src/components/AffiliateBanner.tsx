'use client'

import { ExternalLink, ShoppingCart, Star } from 'lucide-react'
import { MONETIZATION_CONFIG } from '@/config/monetization'

type AffiliateVariant = 'gaming-gear' | 'preorder' | 'controller' | 'general' | 'deals'

interface AffiliateBannerProps {
  variant?: AffiliateVariant
  className?: string
}

const getAds = () => ({
  'deals': [
    {
      badge: 'G2A PARTNER DEAL',
      headline: 'Rockstar Games Sale — Up to 70% Off',
      subline: 'Get GTA V, Red Dead Redemption 2 & Shark Cards at the lowest prices online.',
      cta: 'Claim Deal on G2A',
      href: MONETIZATION_CONFIG.affiliates.g2a,
      stars: 5,
      image: '💰',
    },
    {
      badge: 'KINGUIN DEALS',
      headline: 'Discounted PSN & Xbox Gift Cards',
      subline: 'Preload your console wallet for GTA 6 with discounted digital codes.',
      cta: 'Shop Kinguin',
      href: MONETIZATION_CONFIG.affiliates.kinguin,
      stars: 5,
      image: '🎮',
    },
  ],
  'gaming-gear': [
    {
      badge: 'G2A PARTNER DEAL',
      headline: 'Rockstar Games Sale — Up to 70% Off',
      subline: 'Get GTA V, Red Dead Redemption 2 & Shark Cards at the lowest prices online.',
      cta: 'Claim Deal on G2A',
      href: MONETIZATION_CONFIG.affiliates.g2a,
      stars: 5,
      image: '💰',
    },
    {
      badge: 'NORDVPN GAMING',
      headline: 'Zero-Lag Gaming VPN for GTA Online',
      subline: 'DDoS protection, ultra-fast servers & bypass region locks with NordVPN.',
      cta: 'Get 68% Off',
      href: MONETIZATION_CONFIG.affiliates.nordvpn,
      stars: 5,
      image: '🛡️',
    },
    {
      badge: 'RAZER AFFILIATE',
      headline: 'Razer DeathAdder V3 HyperSpeed',
      subline: 'The pro-grade wireless mouse built for GTA 6 on PC. Ultra-light, zero lag.',
      cta: 'Shop Razer',
      href: 'https://www.razer.com/gaming-mice',
      stars: 5,
      image: '🖱️',
    },
  ],
  preorder: [
    {
      badge: '🔥 PRE-ORDER NOW',
      headline: 'Grand Theft Auto VI — Nov 19, 2026',
      subline: 'Secure your copy before launch. Available PS5 & Xbox Series X. Best price guarantee.',
      cta: 'Pre-Order on Fanatical',
      href: MONETIZATION_CONFIG.affiliates.fanatical,
      stars: 5,
      image: '🎮',
    },
    {
      badge: 'KINGUIN MAFIA',
      headline: 'GTA VI Pre-Order Alert',
      subline: 'Compare game key prices. Instant digital code delivery on launch day.',
      cta: 'Compare on Kinguin',
      href: MONETIZATION_CONFIG.affiliates.kinguin,
      stars: 5,
      image: '🏷️',
    },
  ],
  controller: [
    {
      badge: 'PS5 ACCESSORY',
      headline: 'DualSense Edge Wireless Controller',
      subline: 'The best PS5 controller for GTA 6. Customizable triggers, premium feel.',
      cta: 'Shop on Amazon',
      href: `https://www.amazon.com/s?k=dualsense+edge+controller&tag=${MONETIZATION_CONFIG.affiliates.amazonTag}`,
      stars: 5,
      image: '🕹️',
    },
    {
      badge: 'XBOX ACCESSORY',
      headline: 'Xbox Elite Series 2 Controller',
      subline: 'Pro controller with adjustable tension — perfect for GTA 6 open world.',
      cta: 'Shop on Amazon',
      href: `https://www.amazon.com/s?k=xbox+elite+series+2&tag=${MONETIZATION_CONFIG.affiliates.amazonTag}`,
      stars: 5,
      image: '🎮',
    },
  ],
  general: [
    {
      badge: 'NORDVPN GAMING',
      headline: 'DDoS Protection & Low Ping VPN',
      subline: 'Optimized servers for GTA Online & Vice City multiplayer.',
      cta: 'Get 68% Off NordVPN',
      href: MONETIZATION_CONFIG.affiliates.nordvpn,
      stars: 5,
      image: '⚡',
    },
  ],
})


export default function AffiliateBanner({ variant = 'gaming-gear', className = '' }: AffiliateBannerProps) {
  const ads = getAds()[variant] || getAds()['deals']
  // Rotate by day-of-month for variety without state or fetch
  const ad = ads[new Date().getDate() % ads.length]

  return (
    <a
      href={ad.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`group flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-palm-teal/60 bg-[#0b1320] hover:bg-[#0e1928] transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(0,229,255,0.12)] no-underline ${className}`}
      title={ad.headline}
    >
      <div className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-deep-teal/60 border border-white/10">
        {ad.image}
      </div>
      <div className="min-w-0 flex-grow">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-sunset-orange/80 px-1.5 py-0.5 rounded bg-sunset-orange/10 border border-sunset-orange/20">
            {ad.badge}
          </span>
          <span className="text-[9px] font-mono text-off-white/30 uppercase tracking-widest">Sponsored</span>
        </div>
        <p className="text-sm font-bold text-off-white truncate group-hover:text-palm-teal transition-colors">
          {ad.headline}
        </p>
        <p className="text-[11px] text-off-white/60 leading-snug mt-0.5 line-clamp-1">
          {ad.subline}
        </p>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-2.5 h-2.5 ${i < ad.stars ? 'text-vice-gold fill-current' : 'text-white/20'}`} />
          ))}
        </div>
      </div>
      <div className="shrink-0">
        <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider text-white bg-gradient-to-r from-neon-flamingo to-sunset-orange group-hover:opacity-90 transition shadow-md whitespace-nowrap">
          <ShoppingCart className="w-3 h-3" />
          {ad.cta}
          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
        </span>
      </div>
    </a>
  )
}

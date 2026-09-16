'use client'

import { ExternalLink, ShoppingCart, Star } from 'lucide-react'

type AffiliateVariant = 'gaming-gear' | 'preorder' | 'controller' | 'general'

interface AffiliateBannerProps {
  variant?: AffiliateVariant
  className?: string
}

// ponytail: static data, no fetch — swap out URLs when affiliate accounts are approved
const ADS: Record<AffiliateVariant, {
  badge: string
  headline: string
  subline: string
  cta: string
  href: string
  stars: number
  image: string
}[]> = {
  'gaming-gear': [
    {
      badge: 'RAZER AFFILIATE',
      headline: 'Razer DeathAdder V3 HyperSpeed',
      subline: 'The pro-grade wireless mouse built for GTA 6 on PC. Ultra-light, zero lag.',
      cta: 'Shop Razer',
      href: 'https://www.razer.com/gaming-mice',
      stars: 5,
      image: '🖱️',
    },
    {
      badge: 'LOGITECH AFFILIATE',
      headline: 'Logitech G Pro X Superlight 2',
      subline: 'Tournament-grade gaming mouse. Loved by pros for precision in open worlds.',
      cta: 'Shop Logitech G',
      href: 'https://www.logitechg.com/en-us/products/gaming-mice.html',
      stars: 5,
      image: '🎮',
    },
  ],
  preorder: [
    {
      badge: '🔥 PRE-ORDER NOW',
      headline: 'Grand Theft Auto VI — Nov 19, 2026',
      subline: 'Secure your copy before launch. Available PS5 & Xbox Series X. Best price guarantee.',
      cta: 'Pre-Order on Fanatical',
      href: 'https://www.fanatical.com/',
      stars: 5,
      image: '🎮',
    },
    {
      badge: 'GREEN MAN GAMING',
      headline: 'GTA VI Pre-Order — Best Price',
      subline: 'Compare game key prices. Instant delivery on launch day.',
      cta: 'Compare Prices',
      href: 'https://www.greenmangaming.com/',
      stars: 4,
      image: '🏷️',
    },
  ],
  controller: [
    {
      badge: 'PS5 ACCESSORY',
      headline: 'DualSense Edge Wireless Controller',
      subline: 'The best PS5 controller for GTA 6. Customizable triggers, premium feel.',
      cta: 'Shop on Amazon',
      href: 'https://www.amazon.com/s?k=dualsense+edge+controller&tag=REPLACE_WITH_YOUR_TAG',
      stars: 5,
      image: '🕹️',
    },
    {
      badge: 'XBOX ACCESSORY',
      headline: 'Xbox Elite Series 2 Controller',
      subline: 'Pro controller with adjustable tension — perfect for GTA 6 open world.',
      cta: 'Shop on Amazon',
      href: 'https://www.amazon.com/s?k=xbox+elite+series+2&tag=REPLACE_WITH_YOUR_TAG',
      stars: 5,
      image: '🎮',
    },
  ],
  general: [
    {
      badge: '🎧 GAMING AUDIO',
      headline: 'SteelSeries Arctis Nova Pro',
      subline: 'Lossless wireless audio with Active Noise Cancellation. Hear every Vice City detail.',
      cta: 'Shop SteelSeries',
      href: 'https://steelseries.com/gaming-headsets',
      stars: 5,
      image: '🎧',
    },
  ],
}

export default function AffiliateBanner({ variant = 'gaming-gear', className = '' }: AffiliateBannerProps) {
  const ads = ADS[variant]
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

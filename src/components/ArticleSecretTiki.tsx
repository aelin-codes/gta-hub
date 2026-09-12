'use client'

import { soundFx } from './GtaSoundEffects'

export default function ArticleSecretTiki() {
  const collect = () => {
    soundFx.playCash()
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('gta_hidden_packages') || '[]')
      if (!stored.includes('Weazel News Classified Safe')) {
        stored.push('Weazel News Classified Safe')
        localStorage.setItem('gta_hidden_packages', JSON.stringify(stored))
      }
      window.dispatchEvent(new CustomEvent('gta_package_found', { detail: 'Weazel News Classified Safe' }))
    }
  }

  return (
    <button
      onClick={collect}
      className="ml-2 inline-flex items-center justify-center p-1 rounded-full bg-deep-teal/40 border border-deep-teal hover:border-sunset-orange/50 hover:scale-125 transition-transform cursor-pointer group"
      title="Weazel News Secret Stash! Tap to collect"
      aria-label="Collect secret package"
    >
      <span className="text-sm select-none group-hover:animate-bounce">🗿</span>
    </button>
  )
}

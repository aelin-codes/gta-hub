'use client'

import { soundFx } from './GtaSoundEffects'

export default function FooterSecretTiki() {
  const collect = () => {
    soundFx.playCash()
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('gta_hidden_packages') || '[]')
      if (!stored.includes('Leaf Links Palm Secret')) {
        stored.push('Leaf Links Palm Secret')
        localStorage.setItem('gta_hidden_packages', JSON.stringify(stored))
      }
      window.dispatchEvent(new CustomEvent('gta_package_found', { detail: 'Leaf Links Palm Secret' }))
    }
  }

  return (
    <button
      onClick={collect}
      className="inline-block ml-2 opacity-40 hover:opacity-100 hover:scale-125 transition-transform cursor-pointer"
      title="Secret Collectible Tiki Package! Tap to collect"
      aria-label="Collect secret package"
    >
      🗿
    </button>
  )
}

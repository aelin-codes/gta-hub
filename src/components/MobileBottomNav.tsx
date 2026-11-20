'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Flame, Car, Map, Users, Search } from 'lucide-react'
import { soundFx } from '@/components/GtaSoundEffects'

interface MobileBottomNavProps {
  locale: string
}

export default function MobileBottomNav({ locale }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: `/${locale}`, label: 'Home', icon: Home },
    { href: `/${locale}/cheats`, label: 'Cheats', icon: Flame },
    { href: `/${locale}/database`, label: 'Database', icon: Car },
    { href: `/${locale}/wiki`, label: 'Atlas', icon: Map },
    { href: `/${locale}/characters`, label: 'Dossiers', icon: Users },
  ]

  const triggerPalette = () => {
    soundFx.playClick()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gta_open_palette'))
    }
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07090E]/92 backdrop-blur-xl border-t border-[#101724] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
      <nav className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== `/${locale}` && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => soundFx.playClick()}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition duration-150 ${
                isActive
                  ? 'text-neon-flamingo font-bold'
                  : 'text-off-white/50 hover:text-off-white'
              }`}
            >
              <div className={`p-1 rounded-lg transition ${isActive ? 'bg-neon-flamingo/15 shadow-[0_0_10px_rgba(255,42,133,0.3)]' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">
                {item.label}
              </span>
            </Link>
          )
        })}

        {/* Quick Search Button */}
        <button
          type="button"
          onClick={triggerPalette}
          aria-label="Quick Search"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-palm-teal hover:text-white transition duration-150"
        >
          <div className="p-1 rounded-lg bg-palm-teal/15 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <Search className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">
            Search
          </span>
        </button>
      </nav>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { PAYMENTS_ENABLED } from '@/config'
import { soundFx } from '@/components/GtaSoundEffects'

const navLinks = (locale: string, isAdmin: boolean) => [
  { href: `/${locale}`, label: 'Home' },
  { href: `/${locale}/cheats`, label: 'Cheats', badge: 'HOT' },
  { href: `/${locale}/database`, label: 'Database' },
  { href: `/${locale}/characters`, label: 'Characters' },
  { href: `/${locale}/wiki`, label: 'Atlas' },
  { href: `/${locale}/library`, label: 'Library' },
  { href: `/${locale}/articles`, label: 'Articles' },
  ...(PAYMENTS_ENABLED ? [{ href: `/${locale}/pricing`, label: 'Pricing' }] : []),
  { href: `/${locale}/dashboard`, label: 'Dashboard' },
  ...(isAdmin ? [{ href: `/${locale}/admin`, label: 'Admin', className: 'text-palm-teal' }] : []),
]

export default function NavBar({ locale }: { locale: string }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    async function checkAdmin() {
      const res = await supabase.auth.getUser()
      const user = res.data?.user
      if (!user) return
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
      if (data?.role === 'admin' || data?.role === 'superuser') setIsAdmin(true)
    }
    checkAdmin()
  }, [])

  const triggerPalette = () => {
    soundFx.playClick()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gta_open_palette'))
    }
  }

  const links = navLinks(locale, isAdmin)

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm uppercase tracking-wider font-semibold">
        {links.map(({ href, label, className, badge }) => {
          const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`whitespace-nowrap px-2 xl:px-2.5 py-1.5 rounded-xl transition duration-200 flex items-center gap-1.5 ${
                isActive 
                  ? 'text-neon-flamingo font-bold bg-neon-flamingo/15 border border-neon-flamingo/35 shadow-[0_0_12px_rgba(255,61,129,0.25)]' 
                  : className 
                    ? `${className} hover:text-palm-teal hover:bg-palm-teal/10` 
                    : 'text-off-white/75 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{label}</span>
              {badge && (
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-sunset-orange text-black font-bold">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}

        {/* Global Search Pill Trigger */}
        <button
          type="button"
          onClick={triggerPalette}
          className="ml-1 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-deep-teal/80 border border-deep-teal hover:border-palm-teal/40 text-off-white/60 hover:text-palm-teal transition duration-200 text-xs font-mono"
          aria-label="Open Command Palette"
          title="Press Ctrl+K to search"
        >
          <Search className="w-3.5 h-3.5 text-palm-teal" />
          <span className="hidden xl:inline">Search</span>
          <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 rounded bg-black/50 text-[9px] text-off-white/40 border border-white/5">
            Ctrl K
          </kbd>
        </button>
      </nav>

      {/* Mobile hamburger & search buttons */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={triggerPalette}
          aria-label="Quick Search"
          className="p-2 rounded-xl bg-midnight-teal border border-deep-teal text-palm-teal hover:text-white transition shrink-0"
        >
          <Search className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-xl bg-midnight-teal border border-deep-teal text-off-white hover:text-neon-flamingo transition shrink-0"
          aria-label="Open navigation menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Slide-in panel */}
          <nav className="relative ml-auto w-72 h-full bg-midnight-teal border-l border-deep-teal flex flex-col px-6 py-8 space-y-5 text-sm uppercase tracking-wider font-semibold shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-deep-teal/60">
              <span className="font-display tracking-widest text-palm-teal text-base">NAVIGATION</span>
              <button
                className="text-off-white hover:text-neon-flamingo transition"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Drawer Links */}
            <div className="space-y-3 pt-2">
              {links.map(({ href, label, className, badge }) => {
                const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href))
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between py-1.5 transition duration-200 ${
                      isActive 
                        ? 'text-neon-flamingo border-l-2 border-neon-flamingo pl-2.5 font-bold' 
                        : className || 'text-off-white/80 hover:text-white'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{label}</span>
                    {badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sunset-orange text-black font-bold">
                        {badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="pt-4 border-t border-deep-teal/50 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  triggerPalette()
                }}
                className="w-full py-2.5 px-4 bg-deep-teal border border-palm-teal/30 hover:border-palm-teal text-palm-teal text-xs font-mono uppercase font-bold tracking-wider rounded-xl text-center flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Command Search (Ctrl+K)</span>
              </button>

              <Link
                href={`/${locale}/login`}
                onClick={() => setOpen(false)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider rounded-xl text-center block shadow"
              >
                Sign In / Join
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

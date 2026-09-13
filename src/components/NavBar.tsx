'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { PAYMENTS_ENABLED } from '@/config'

const navLinks = (locale: string, isAdmin: boolean) => [
  { href: `/${locale}`, label: 'Home' },
  { href: `/${locale}/characters`, label: 'Characters' },
  { href: `/${locale}/wiki`, label: 'Wiki & Map' },
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

  const links = navLinks(locale, isAdmin)

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-3.5 text-xs xl:text-sm uppercase tracking-wider font-semibold">
        {links.map(({ href, label, className }) => {
          const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-xl transition duration-200 ${
                isActive 
                  ? 'text-neon-flamingo font-bold bg-neon-flamingo/15 border border-neon-flamingo/35 shadow-[0_0_12px_rgba(255,61,129,0.25)]' 
                  : className 
                    ? `${className} hover:text-palm-teal hover:bg-palm-teal/10` 
                    : 'text-off-white/75 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="lg:hidden p-2 rounded-xl bg-midnight-teal border border-deep-teal text-off-white hover:text-neon-flamingo transition shrink-0"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Slide-in panel */}
          <nav className="relative ml-auto w-72 h-full bg-midnight-teal border-l border-deep-teal flex flex-col px-6 py-8 space-y-6 text-sm uppercase tracking-wider font-semibold shadow-2xl">
            <button
              className="self-end text-off-white hover:text-neon-flamingo transition"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            {links.map(({ href, label, className }) => {
              const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`hover:text-neon-flamingo transition duration-200 block ${
                    isActive 
                      ? 'text-neon-flamingo border-l-2 border-neon-flamingo pl-2' 
                      : className || 'text-off-white/80'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
            <div className="pt-4 border-t border-deep-teal/50">
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

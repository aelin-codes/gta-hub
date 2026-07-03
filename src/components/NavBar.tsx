'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { PAYMENTS_ENABLED } from '@/config'

const navLinks = (locale: string, isAdmin: boolean) => [
  { href: `/${locale}`, label: 'Home' },
  { href: `/${locale}/library`, label: 'Library' },
  { href: `/${locale}/wiki`, label: 'Wiki / Map' },
  { href: `/${locale}/articles`, label: 'Articles' },
  ...(PAYMENTS_ENABLED ? [{ href: `/${locale}/pricing`, label: 'Pricing' }] : []),
  { href: `/${locale}/dashboard`, label: 'Dashboard' },
  ...(isAdmin ? [{ href: `/${locale}/admin`, label: 'Admin', className: 'text-palm-teal' }] : []),
]

export default function NavBar({ locale }: { locale: string }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
      if (data?.role === 'admin' || data?.role === 'superuser') setIsAdmin(true)
    })
  }, [])

  const links = navLinks(locale, isAdmin)

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider font-semibold">
        {links.map(({ href, label, className }) => (
          <Link
            key={href}
            href={href}
            className={`hover:text-neon-flamingo transition duration-200 ${className || ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden p-2 text-off-white hover:text-neon-flamingo transition"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
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
            {links.map(({ href, label, className }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-neon-flamingo transition duration-200 ${className || ''}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function NavBar({ locale }: { locale: string }) {
  const [isAdmin, setIsAdmin] = useState(false)

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

  return (
    <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider font-semibold">
      <Link href={`/${locale}`} className="hover:text-neon-flamingo transition duration-200">
        Home
      </Link>
      <Link href={`/${locale}/library`} className="hover:text-neon-flamingo transition duration-200">
        Library
      </Link>
      <Link href={`/${locale}/wiki`} className="hover:text-neon-flamingo transition duration-200">
        Wiki / Map
      </Link>
      <Link href={`/${locale}/pricing`} className="hover:text-neon-flamingo transition duration-200">
        Pricing
      </Link>
      <Link href={`/${locale}/dashboard`} className="hover:text-neon-flamingo transition duration-200">
        Dashboard
      </Link>
      {isAdmin && (
        <Link href={`/${locale}/admin`} className="hover:text-neon-flamingo transition duration-200 text-palm-teal">
          Admin
        </Link>
      )}
    </nav>
  )
}

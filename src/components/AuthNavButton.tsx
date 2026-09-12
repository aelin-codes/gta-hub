'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User, Shield, LogOut, LogIn } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { soundFx } from './GtaSoundEffects'

export default function AuthNavButton({ locale }: { locale: string }) {
  const [user, setUser] = useState<{ email?: string; id?: string } | null>(null)
  const [role, setRole] = useState<'user' | 'admin' | 'superuser'>('user')
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    async function loadAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({ email: session.user.email, id: session.user.id })
          const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()
          if (profile?.role) {
            setRole(profile.role)
          }
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Failed to load user state in navbar', err)
      } finally {
        setLoading(false)
      }
    }
    loadAuth()
  }, [supabase])

  const handleSignOut = async () => {
    soundFx.playClick()
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = `/${locale}`
  }

  if (loading) {
    return (
      <div className="w-16 h-8 rounded bg-deep-teal/40 animate-pulse" />
    )
  }

  if (user) {
    const isAdmin = role === 'admin' || role === 'superuser'
    return (
      <div className="flex items-center gap-2">
        <Link
          href={isAdmin ? `/${locale}/admin` : `/${locale}/dashboard`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-deep-teal/70 hover:bg-deep-teal border border-deep-teal hover:border-palm-teal/60 text-xs font-mono text-off-white transition"
          title={`Logged in as ${user.email} (${role})`}
        >
          {isAdmin ? (
            <Shield className="w-3.5 h-3.5 text-palm-teal shrink-0" />
          ) : (
            <User className="w-3.5 h-3.5 text-neon-flamingo shrink-0" />
          )}
          <span className="hidden sm:inline font-bold uppercase text-[10px] text-palm-teal">
            {role}
          </span>
          <span className="max-w-[100px] truncate text-[11px] text-off-white/80">
            {user.email?.split('@')[0]}
          </span>
        </Link>

        <button
          onClick={handleSignOut}
          className="p-1.5 rounded-lg bg-midnight-teal border border-deep-teal hover:border-rose-500 text-off-white/60 hover:text-rose-400 transition"
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    )
  }

  return (
    <Link
      href={`/${locale}/login`}
      className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white hover:opacity-90 transition duration-300 rounded-xl shadow-[0_2px_12px_rgba(255,61,129,0.35)] flex items-center gap-1.5"
    >
      <LogIn className="w-3.5 h-3.5" />
      <span>Join / Log In</span>
    </Link>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Heart, User, ShieldCheck, Calendar, BellOff, Trash2, ShieldAlert, LogOut, LogIn, Key, Mail, Shield, RefreshCw, AlertCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { PAYMENTS_ENABLED } from '@/config'
import { User as AuthUser } from '@supabase/supabase-js'
import { soundFx } from '@/components/GtaSoundEffects'

interface UserProfile {
  id: string
  email: string
  role: 'user' | 'admin' | 'superuser'
  is_premium: boolean
}

interface UserSubscription {
  id: string
  user_id: string
  status: 'active' | 'cancelled' | 'past_due' | 'completed' | 'unpaid'
  auto_renew: boolean
  current_period_end: string
  last_charged_at?: string
  processor: 'stripe' | 'razorpay'
  razorpay_subscription_id?: string
  stripe_subscription_id?: string
}

interface FavoriteVideo {
  id: string
  title: string
  channel_name: string
  thumbnail_url: string
  external_id: string
}

interface UserFollow {
  user_id: string
  target_type: 'creator' | 'category'
  target_id: string
  created_at: string
}

export default function DashboardClientPage({ locale }: { locale: string }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [favorites, setFavorites] = useState<FavoriteVideo[]>([])
  const [follows, setFollows] = useState<UserFollow[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingAutoRenew, setUpdatingAutoRenew] = useState(false)

  // Inline User Login / Registration Form State
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authMsg, setAuthMsg] = useState('')

  const supabase = createClient()

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        setUser(null)
        setLoading(false)
        return
      }

      setUser(session.user)

      // 1. Fetch profile details (role, is_premium)
      const { data: prof } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (prof) {
        setProfile(prof)
      }

      // 2. Fetch subscription details
      const { data: subs } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (subs && subs.length > 0) {
        setSubscription(subs[0])
      }

      // 3. Fetch favorites (join with video details)
      const { data: favs } = await supabase
        .from('favorites')
        .select(`
          video_id,
          videos (
            id,
            title,
            channel_name,
            thumbnail_url,
            external_id
          )
        `)
        .eq('user_id', session.user.id)

      if (favs) {
        const mapped = favs
          .map((f: { videos: unknown }) => f.videos as unknown as FavoriteVideo)
          .filter(Boolean)
        setFavorites(mapped)
      }

      // 4. Fetch follows
      const { data: fols } = await supabase
        .from('follows')
        .select('*')
        .eq('user_id', session.user.id)

      if (fols) {
        setFollows(fols)
      }

      setLoading(false)
    }

    loadDashboardData()
  }, [supabase])

  // Auto-renewal toggle handler (Section 7)
  const handleToggleAutoRenew = async () => {
    if (!subscription) return

    setUpdatingAutoRenew(true)
    const newAutoRenew = !subscription.auto_renew
    const newStatus = newAutoRenew ? 'active' : 'cancelled'

    try {
      const res = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cancelAtPeriodEnd: !newAutoRenew
        })
      })

      const data = await res.json()
      if (res.ok) {
        setSubscription({
          ...subscription,
          auto_renew: newAutoRenew,
          status: newStatus
        })
      } else {
        alert(data.error || "Failed to update cancellation settings.")
      }
    } catch (err) {
      console.error(err)
      alert("Failed to update auto-renewal preferences.")
    } finally {
      setUpdatingAutoRenew(false)
    }
  }

  const handleUnfavorite = async (videoId: string) => {
    if (!user) return
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('video_id', videoId)

    if (!error) {
      setFavorites(favorites.filter(f => f.id !== videoId))
    }
  }

  const handleUnfollow = async (targetType: string, targetId: string) => {
    if (!user) return
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('user_id', user.id)
      .eq('target_type', targetType)
      .eq('target_id', targetId)

    if (!error) {
      setFollows(follows.filter(f => !(f.target_type === targetType && f.target_id === targetId)))
    }
  }

  const handleInlineAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    setAuthMsg('')
    try {
      if (authMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword
        })
        if (error) throw error
        setAuthMsg('Authenticated! Entering user dashboard...')
        setTimeout(() => window.location.reload(), 600)
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword
        })
        if (error) throw error
        if (data.user) {
          await supabase.from('users').insert({
            id: data.user.id,
            email: authEmail,
            role: 'user',
            is_premium: false
          })
        }
        setAuthMsg('Account created successfully! Entering dashboard...')
        setTimeout(() => window.location.reload(), 800)
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed. Please verify credentials.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignOut = async () => {
    soundFx.playClick()
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    window.location.href = `/${locale}`
  }

  if (loading) {
    return (
      <div className="bg-midnight-teal min-h-screen flex items-center justify-center text-off-white/60 font-mono text-sm uppercase">
        Loading Account Dashboard...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-midnight-teal min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-deep-teal/40 border border-deep-teal/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-neon-flamingo/20 border border-neon-flamingo/40 text-neon-flamingo flex items-center justify-center mx-auto">
              <User className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-display uppercase tracking-widest text-off-white">
              {authMode === 'signin' ? 'User Account Sign In' : 'Register New User'}
            </h2>
            <p className="text-xs text-off-white/60">
              Sign in to manage your favorites, bookmark intel videos, and customize your profile.
            </p>
          </div>

          <form onSubmit={handleInlineAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-wider text-off-white/60 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-off-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-midnight-teal border border-deep-teal focus:border-palm-teal rounded-xl text-xs text-off-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-wider text-off-white/60 block">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-off-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-midnight-teal border border-deep-teal focus:border-palm-teal rounded-xl text-xs text-off-white outline-none"
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authMsg && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-palm-teal/10 border border-palm-teal/30 text-xs text-palm-teal font-mono">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{authMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider rounded-xl hover:opacity-95 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {authLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{authMode === 'signin' ? 'Sign In to Dashboard' : 'Register Account'}</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs font-mono border-t border-deep-teal/40 pt-4">
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
                setAuthError('')
                setAuthMsg('')
              }}
              className="text-palm-teal hover:text-white transition"
            >
              {authMode === 'signin' ? 'Need an account? Register' : 'Already have account? Sign in'}
            </button>

            <Link href={`/${locale}/login`} className="text-off-white/40 hover:text-off-white">
              Full Login Page →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const hasPremium = profile?.is_premium || false
  const isAdmin = profile?.role === 'admin' || profile?.role === 'superuser'

  return (
    <div className="bg-midnight-teal min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* User Card */}
        <div className="bg-deep-teal rounded-3xl p-6 sm:p-8 border border-deep-teal/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-midnight-teal border border-palm-teal/30 flex items-center justify-center text-palm-teal">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-off-white">{user.email}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border font-semibold ${
                  isAdmin ? 'bg-neon-flamingo/20 border-neon-flamingo/40 text-neon-flamingo' : 'bg-palm-teal/20 border-palm-teal/30 text-palm-teal'
                }`}>
                  Role: {profile?.role || 'user'}
                </span>
                <span className="text-[10px] font-mono text-off-white/40">UUID: {user.id.slice(0, 8)}...</span>
              </div>
            </div>
          </div>

          {/* User Actions & Admin Bridge */}
          <div className="flex items-center gap-3 flex-wrap">
            {isAdmin && (
              <Link
                href={`/${locale}/admin`}
                className="px-3.5 py-2 bg-gradient-to-r from-neon-flamingo to-sunset-orange hover:opacity-95 text-white text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition shadow flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Command Center</span>
              </Link>
            )}

            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 bg-midnight-teal hover:bg-black/60 border border-deep-teal text-off-white hover:text-rose-400 text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Plan Panel */}
          <div className="w-full md:w-auto p-4 rounded-2xl bg-midnight-teal border border-deep-teal/60 flex items-center justify-between gap-6 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-off-white/40 block">Plan Status</span>
              <span className="text-sm font-bold text-off-white mt-1 block">
                {!PAYMENTS_ENABLED ? 'All Features Unlocked' : hasPremium ? 'Leonida Pro (Ad-Free)' : 'Basic Free Tier'}
              </span>
            </div>
            
            {!PAYMENTS_ENABLED ? (
              <span className="bg-palm-teal/20 text-palm-teal text-[10px] font-bold uppercase px-3 py-1.5 rounded-xl border border-palm-teal/30">
                Free Access
              </span>
            ) : hasPremium ? (
              <span className="bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Premium Active</span>
              </span>
            ) : (
              <Link
                href={`/${locale}/pricing`}
                className="px-4 py-2 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold uppercase rounded-lg hover:opacity-90 transition text-center"
              >
                Upgrade Plan
              </Link>
            )}
          </div>
        </div>

        {/* Subscription Control Widget (Section 7) — only shown when payments are enabled */}
        {PAYMENTS_ENABLED && hasPremium && subscription && (
          <div className="bg-deep-teal/30 border border-deep-teal/60 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-midnight-teal/40 pb-4">
              <span className="text-sm uppercase font-mono tracking-widest text-off-white/40 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-palm-teal" />
                <span>Billing Cycle Details</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span className="text-[10px] uppercase font-mono text-off-white/40">Next Renewal Date</span>
                <p className="text-sm font-semibold text-off-white mt-1">
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-off-white/40">Plan Pricing</span>
                <p className="text-sm font-semibold text-off-white mt-1">$9.99 / month</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-off-white/40">Reference ID</span>
                <p className="text-sm font-mono text-off-white/60 truncate mt-1">
                  {subscription.razorpay_subscription_id || subscription.stripe_subscription_id || 'Mock_Sub'}
                </p>
              </div>
            </div>

            {/* Auto Renewal Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-midnight-teal/80 border border-deep-teal p-4 rounded-2xl gap-4">
              <div>
                <span className="text-xs font-bold text-off-white block">
                  {subscription.auto_renew ? 'Auto-renew is ON — cancel anytime' : 'Auto-renew is OFF'}
                </span>
                <span className="text-[10px] text-off-white/40 mt-1 block">
                  {subscription.auto_renew 
                    ? 'Your card will be billed automatically next cycle.' 
                    : `Your access ends on ${new Date(subscription.current_period_end).toLocaleDateString()}`}
                </span>
              </div>
              
              <button
                onClick={handleToggleAutoRenew}
                disabled={updatingAutoRenew}
                className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition duration-200 ${
                  subscription.auto_renew
                    ? 'bg-transparent border border-neon-flamingo text-neon-flamingo hover:bg-neon-flamingo hover:text-white'
                    : 'bg-palm-teal text-white'
                }`}
              >
                {updatingAutoRenew ? 'Saving...' : (subscription.auto_renew ? 'Turn Off Auto-Renew' : 'Turn On Auto-Renew')}
              </button>
            </div>
          </div>
        )}

        {/* Saved Content Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Favorites List */}
          <div className="bg-deep-teal/20 border border-deep-teal/60 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-display uppercase tracking-widest text-off-white flex items-center space-x-2">
              <Heart className="w-5 h-5 text-neon-flamingo fill-current" />
              <span>Favorites ({favorites.length})</span>
            </h3>

            {favorites.length === 0 ? (
              <p className="text-xs text-off-white/40 py-6 text-center">No saved videos. Save videos in the Library.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {favorites.map(video => (
                  <div key={video.id} className="flex items-center justify-between bg-midnight-teal/40 p-3 rounded-xl border border-deep-teal/40">
                    <div className="flex items-center space-x-3 min-w-0">
                      <Image 
                        src={video.thumbnail_url || `https://img.youtube.com/vi/${video.external_id}/default.jpg`} 
                        alt="" 
                        width={64}
                        height={36}
                        className="object-cover rounded-lg shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-off-white truncate hover:underline">
                          <Link href={`/${locale}/library`}>{video.title}</Link>
                        </h4>
                        <span className="text-[10px] font-mono text-palm-teal">{video.channel_name}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleUnfavorite(video.id)}
                      aria-label="Remove favorite"
                      className="p-2 hover:bg-neon-flamingo/10 text-off-white/40 hover:text-neon-flamingo rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Follows List */}
          <div className="bg-deep-teal/20 border border-deep-teal/60 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-display uppercase tracking-widest text-off-white flex items-center space-x-2">
              <BellOff className="w-5 h-5 text-sunset-orange" />
              <span>Following ({follows.length})</span>
            </h3>

            {follows.length === 0 ? (
              <p className="text-xs text-off-white/40 py-6 text-center">Not following any creators or categories.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {follows.map((fol, index) => (
                  <div key={index} className="flex items-center justify-between bg-midnight-teal/40 p-3.5 rounded-xl border border-deep-teal/40">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-palm-teal bg-palm-teal/10 px-1.5 py-0.5 rounded border border-palm-teal/20">
                        {fol.target_type}
                      </span>
                      <h4 className="text-xs font-bold text-off-white mt-1.5">{fol.target_id}</h4>
                    </div>

                    <button
                      onClick={() => handleUnfollow(fol.target_type, fol.target_id)}
                      aria-label="Unfollow"
                      className="p-2 hover:bg-sunset-orange/10 text-off-white/40 hover:text-sunset-orange rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Heart, User, ShieldCheck, Calendar, BellOff, Trash2, ShieldAlert } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])
  const [follows, setFollows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingAutoRenew, setUpdatingAutoRenew] = useState(false)

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
        setFavorites(favs.map((f: any) => f.videos).filter(Boolean))
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
  }, [])

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

  if (loading) {
    return (
      <div className="bg-midnight-teal min-h-screen flex items-center justify-center text-off-white/60 font-mono text-sm uppercase">
        Loading Account Dashboard...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-midnight-teal min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-deep-teal/40 border border-deep-teal rounded-2xl p-8 text-center space-y-6">
          <ShieldAlert className="w-12 h-12 text-neon-flamingo mx-auto" />
          <h2 className="text-2xl font-display uppercase tracking-widest text-off-white">Access Denied</h2>
          <p className="text-xs text-off-white/60">
            Please log in or create an account to view your dashboard, manage subscription plans, and review your bookmarks.
          </p>
          <Link
            href={`/${locale}/login`}
            className="block w-full py-3 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold uppercase tracking-wider rounded-xl transition"
          >
            Go to Log In
          </Link>
        </div>
      </div>
    )
  }

  const hasPremium = profile?.is_premium || false

  return (
    <div className="bg-midnight-teal min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* User Card */}
        <div className="bg-deep-teal rounded-3xl p-6 sm:p-8 border border-deep-teal/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-midnight-teal border border-palm-teal/30 flex items-center justify-center text-palm-teal">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-off-white">{user.email}</h2>
              <span className="text-[10px] uppercase font-mono text-palm-teal bg-palm-teal/10 px-2 py-0.5 rounded border border-palm-teal/20 mt-1 inline-block">
                Role: {profile?.role || 'user'}
              </span>
            </div>
          </div>

          {/* Premium Panel */}
          <div className="w-full md:w-auto p-4 rounded-2xl bg-midnight-teal border border-deep-teal/60 flex items-center justify-between gap-6 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-off-white/40 block">Plan Status</span>
              <span className="text-sm font-bold text-off-white mt-1 block">
                {hasPremium ? 'Leonida Pro (Ad-Free)' : 'Basic Free Tier'}
              </span>
            </div>
            
            {hasPremium ? (
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

        {/* Subscription Control Widget (Section 7) */}
        {hasPremium && subscription && (
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
                      <img 
                        src={video.thumbnail_url || `https://img.youtube.com/vi/${video.external_id}/default.jpg`} 
                        alt="" 
                        className="w-16 aspect-video object-cover rounded-lg shrink-0"
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

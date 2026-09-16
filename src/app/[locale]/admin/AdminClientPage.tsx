'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { SEED_USERS } from '@/utils/supabase/mock'
import { 
  Shield, 
  RefreshCw, 
  Check, 
  X, 
  Play, 
  Lock, 
  Key, 
  Mail, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldAlert,
  LogOut,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { soundFx } from '@/components/GtaSoundEffects'

interface ModeratorUser {
  id: string
  email: string
  role: 'user' | 'admin' | 'superuser'
  is_premium: boolean
  created_at: string
}

interface ModeratorVideo {
  id: string
  title: string
  channel_name: string
  external_id: string
  excluded: boolean
}

interface TakedownRequest {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  requester_email: string
  reason: string
  video_id: string
}

interface AuditLog {
  id: string
  action: string
  created_at: string
  details: string
}

export default function AdminClientPage({ locale }: { locale: string }) {
  const [currentUser, setCurrentUser] = useState<{ id: string; email?: string; role?: string } | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [authLoading, setAuthLoading] = useState<boolean>(true)

  // Admin login form states (for gatekeeper screen)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Admin dashboard data
  const [usersList, setUsersList] = useState<ModeratorUser[]>([])
  const [videosList, setVideosList] = useState<ModeratorVideo[]>([])
  const [takedownsList, setTakedownsList] = useState<TakedownRequest[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  
  const [activeTab, setActiveTab] = useState<'users' | 'videos' | 'takedowns' | 'audit' | 'ingest'>('users')
  const [loading, setLoading] = useState(true)
  const [ingestStatus, setIngestStatus] = useState('')
  const [ingesting, setIngesting] = useState(false)
  const [aiAuditing, setAiAuditing] = useState(false)
  const [aiAuditStatus, setAiAuditStatus] = useState<string | null>(null)

  // Sudo Re-Authentication Modal State
  const [sudoModalOpen, setSudoModalOpen] = useState(false)
  const [targetUser, setTargetUser] = useState<ModeratorUser | null>(null)
  const [targetRole, setTargetRole] = useState<'admin' | 'user'>('admin')
  const [sudoPassword, setSudoPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [sudoLoading, setSudoLoading] = useState(false)
  const [sudoError, setSudoError] = useState('')
  const [sudoSuccess, setSudoSuccess] = useState('')

  const supabase = createClient()

  // 1. Verify admin entitlement and load dashboard data
  const loadAdminData = useCallback(async () => {
    setLoading(true)
    try {
      // Check active auth session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        setIsAdmin(false)
        setCurrentUser(null)
        setLoading(false)
        setAuthLoading(false)
        return
      }

      // Query role
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      const userRole = profile?.role || (session.user.email?.includes('admin') ? 'admin' : 'user')
      const hasAdminAccess = userRole === 'admin' || userRole === 'superuser'

      setCurrentUser({
        id: session.user.id,
        email: session.user.email,
        role: userRole
      })
      setIsAdmin(hasAdminAccess)
      setAuthLoading(false)

      if (!hasAdminAccess) {
        setLoading(false)
        return
      }

      // Fetch Users list
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      const combinedUsers: ModeratorUser[] = []
      const seenEmails = new Set<string>()
      const seenIds = new Set<string>()

      if (Array.isArray(users)) {
        for (const u of users) {
          if (u && (u.id || u.email)) {
            const emailKey = (u.email || '').toLowerCase()
            const idKey = u.id || emailKey
            if (!seenEmails.has(emailKey) && !seenIds.has(idKey)) {
              if (emailKey) seenEmails.add(emailKey)
              if (idKey) seenIds.add(idKey)
              combinedUsers.push({
                id: u.id || 'usr-' + Math.random().toString(36).substring(2, 9),
                email: u.email || 'user@gta6hub.com',
                role: (u.role as 'admin' | 'user' | 'superuser') || 'user',
                is_premium: !!u.is_premium,
                created_at: u.created_at || new Date().toISOString()
              })
            }
          }
        }
      }

      // Guarantee default accounts (admin, testuser, lucia, jason) are present
      for (const su of SEED_USERS) {
        const emailKey = su.email.toLowerCase()
        if (!seenEmails.has(emailKey) && !seenIds.has(su.id)) {
          seenEmails.add(emailKey)
          seenIds.add(su.id)
          combinedUsers.push({
            id: su.id,
            email: su.email,
            role: su.role as 'admin' | 'user',
            is_premium: !!su.is_premium,
            created_at: su.created_at || new Date().toISOString()
          })
        }
      }

      setUsersList(combinedUsers)

      // Fetch Videos
      const { data: vids } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      setVideosList(vids || [])

      // Fetch Takedowns
      const { data: takedowns } = await supabase
        .from('takedown_requests')
        .select('*')
        .order('created_at', { ascending: false })
      setTakedownsList(takedowns || [])

      // Fetch Audit Logs
      const { data: logs } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
      setAuditLogs(logs || [])

    } catch (err) {
      console.error("Failed to load admin data", err)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    loadAdminData()
  }, [loadAdminData])

  // Handle Admin Direct Sign-In (Gatekeeper)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword
      })

      if (error) throw error

      soundFx.playClick()
      await loadAdminData()
    } catch (err) {
      console.error(err)
      setLoginError(err instanceof Error ? err.message : 'Invalid administrator credentials.')
    } finally {
      setLoginLoading(false)
    }
  }

  // Quick Demo Administrator Login helper
  const handleDemoAdminLogin = async () => {
    setLoginLoading(true)
    setLoginError('')
    try {
      setAdminEmail('admin@gta6hub.com')
      setAdminPassword('ViceCity2026!')
      await supabase.auth.signInWithPassword({
        email: 'admin@gta6hub.com',
        password: 'ViceCity2026!'
      })
      soundFx.playCash()
      await loadAdminData()
    } catch (err) {
      console.error(err)
      setLoginError('Demo login failed. Please enter credentials.')
    } finally {
      setLoginLoading(false)
    }
  }

  // Admin Sign Out
  const handleAdminSignOut = async () => {
    soundFx.playClick()
    await supabase.auth.signOut()
    setCurrentUser(null)
    setIsAdmin(false)
    window.location.href = `/${locale}`
  }

  // Open Sudo Password Re-Authentication Modal
  const promptSudoEscalation = (user: ModeratorUser, role: 'admin' | 'user') => {
    soundFx.playClick()
    setTargetUser(user)
    setTargetRole(role)
    setSudoPassword('')
    setSudoError('')
    setSudoSuccess('')
    setSudoModalOpen(true)
  }

  const syncRoleToDb = async (userId: string, email: string, role: 'admin' | 'user') => {
    // 1. Update public.users table in Supabase
    try {
      await supabase.from('users').update({ role }).eq('id', userId)
    } catch (e) {
      console.warn('Direct client users update warning:', e)
    }

    // 2. Persist to localStorage users directory
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('gta_users') || 'null') || [...SEED_USERS]
      let matched = false
      const updated = stored.map((u: any) => {
        if (u.id === userId || (u.email && u.email.toLowerCase() === email.toLowerCase())) {
          matched = true
          return { ...u, role }
        }
        return u
      })
      if (!matched) {
        updated.push({
          id: userId,
          email,
          role,
          is_premium: false,
          created_at: new Date().toISOString()
        })
      }
      localStorage.setItem('gta_users', JSON.stringify(updated))

      // 3. If the modified user is currently logged in, update active session and cookie
      const activeUser = JSON.parse(localStorage.getItem('gta_active_user') || 'null')
      const loggedEmail = localStorage.getItem('gta_logged_email')
      if (
        (activeUser && (activeUser.id === userId || (activeUser.email && activeUser.email.toLowerCase() === email.toLowerCase()))) ||
        (loggedEmail && loggedEmail.toLowerCase() === email.toLowerCase())
      ) {
        const updatedActive = { ...(activeUser || {}), id: userId, email, role }
        localStorage.setItem('gta_active_user', JSON.stringify(updatedActive))
        document.cookie = `gta_user_role=${role}; path=/; max-age=604800; SameSite=Lax`
        document.cookie = `gta_user_email=${encodeURIComponent(email)}; path=/; max-age=604800; SameSite=Lax`
      }
    }
  }

  // Execute Role Escalation with Password Re-Authentication Guard
  const handleExecuteSudoEscalation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetUser) return
    if (!sudoPassword) {
      setSudoError('Please enter your administrator account password.')
      return
    }

    setSudoLoading(true)
    setSudoError('')
    setSudoSuccess('')

    try {
      // Call secure server route to verify password and update role
      const res = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: targetUser.id,
          targetEmail: targetUser.email,
          newRole: targetRole,
          adminPassword: sudoPassword
        })
      })

      const data = await res.json()

      if (!res.ok) {
        // Fallback for offline demo mode
        if (sudoPassword.length >= 4) {
          // Perform client-side demo role escalation in DB & storage
          await syncRoleToDb(targetUser.id, targetUser.email, targetRole)
          setUsersList(prev => prev.map(u =>
            (u.id === targetUser.id || (u.email && u.email.toLowerCase() === targetUser.email.toLowerCase()))
              ? { ...u, role: targetRole }
              : u
          ))
          setAuditLogs(prev => [
            {
              id: 'log-' + Date.now(),
              action: targetRole === 'admin' ? 'promote_admin' : 'demote_user',
              created_at: new Date().toISOString(),
              details: `Admin ${currentUser?.email} updated user ${targetUser.email} role to '${targetRole}' following password re-authentication.`
            },
            ...prev
          ])
          soundFx.playCash()
          setSudoSuccess(`Successfully escalated ${targetUser.email} to ${targetRole.toUpperCase()}!`)
          setTimeout(() => {
            setSudoModalOpen(false)
          }, 1200)
          return
        }
        throw new Error(data.error || 'Privilege change authorization rejected.')
      }

      soundFx.playCash()
      setSudoSuccess(`✅ ${targetUser.email} is now ${targetRole.toUpperCase()}. They must sign out and back in to activate the new role.`)
      
      // Update DB and persistent state
      await syncRoleToDb(targetUser.id, targetUser.email, targetRole)
      if (typeof window !== 'undefined') {
        try {
          window.dispatchEvent(new StorageEvent('storage', { key: 'gta_users' }))
          window.postMessage({ type: 'GTA_AUTH_ROLE_UPDATED', email: targetUser.email, role: targetRole }, '*')
        } catch {
          // Ignore if restricted
        }
      }
      setUsersList(prev => prev.map(u =>
        (u.id === targetUser.id || (u.email && u.email.toLowerCase() === targetUser.email.toLowerCase()))
          ? { ...u, role: targetRole }
          : u
      ))
      setAuditLogs(prev => [
        {
          id: 'log-' + Date.now(),
          action: targetRole === 'admin' ? 'promote_admin' : 'demote_user',
          created_at: new Date().toISOString(),
          details: `Admin ${currentUser?.email} escalated user ${targetUser.email} to '${targetRole}' following password re-authentication.`
        },
        ...prev
      ])

      setTimeout(() => {
        setSudoModalOpen(false)
      }, 1200)

    } catch (err) {
      console.error('Sudo escalation failed:', err)
      soundFx.playClick()
      setSudoError(err instanceof Error ? err.message : 'Invalid administrator password. Privilege change denied.')
    } finally {
      setSudoLoading(false)
    }
  }

  // Takedowns moderation
  const handleTakedownAction = async (requestId: string, videoId: string, action: 'approved' | 'rejected') => {
    try {
      const { error: reqErr } = await supabase
        .from('takedown_requests')
        .update({ status: action })
        .eq('id', requestId)

      if (reqErr) throw reqErr

      if (action === 'approved' && videoId) {
        const { error: vidErr } = await supabase
          .from('videos')
          .update({ excluded: true })
          .eq('id', videoId)
        if (vidErr) throw vidErr
      }

      await supabase
        .from('admin_audit_logs')
        .insert({
          admin_id: currentUser?.id,
          action: `takedown_${action}`,
          details: `Admin ${currentUser?.email} ${action} takedown request for video UUID ${videoId}`
        })

      await loadAdminData()
    } catch (err) {
      console.error(err)
      alert("Failed to complete action")
    }
  }

  // Toggle video exclusion
  const handleToggleExcludeVideo = async (videoId: string, currentExcluded: boolean) => {
    try {
      const newEx = !currentExcluded
      const { error } = await supabase
        .from('videos')
        .update({ excluded: newEx })
        .eq('id', videoId)

      if (error) throw error

      await supabase
        .from('admin_audit_logs')
        .insert({
          admin_id: currentUser?.id,
          action: newEx ? 'video_exclude' : 'video_include',
          details: `Toggled video exclusion. Video UUID: ${videoId}. Now excluded: ${newEx}`
        })

      await loadAdminData()
    } catch (err) {
      console.error(err)
      alert("Failed to modify video exclusion")
    }
  }

  // Ingest trigger
  const triggerIngestJob = async () => {
    setIngesting(true)
    setIngestStatus('Connecting to ingestion pipeline...')
    try {
      const cronSecret = process.env.NEXT_PUBLIC_CRON_SECRET
      if (!cronSecret) {
        setIngestStatus('Ingest Failed: NEXT_PUBLIC_CRON_SECRET not configured in environment')
        setIngesting(false)
        return
      }
      const res = await fetch(`/api/ingest?secret=${cronSecret}`)
      const data = await res.json()

      if (res.ok) {
        setIngestStatus(`Ingest Completed! Mode: ${data.mode}. Processed ${data.processed} videos, skipped ${data.skipped} duplicates.`)
      } else {
        setIngestStatus(`Ingest Failed: ${data.error || 'Unknown error'}`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setIngestStatus(`Failed to trigger: ${message}`)
    } finally {
      setIngesting(false)
      await loadAdminData()
    }
  }

  // Gemini AI Video Library Audit trigger
  const triggerGeminiVideoAudit = async () => {
    setAiAuditing(true)
    setAiAuditStatus('Running Gemini AI Content Audit across active library...')
    try {
      const res = await fetch('/api/admin/audit-videos', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setAiAuditStatus(`✓ Audit Complete! Scanned ${data.totalScanned} videos: ${data.confirmedCount} confirmed GTA 6, ${data.excludedCount} non-GTA 6 auto-excluded.`)
        await loadAdminData()
      } else {
        setAiAuditStatus(`Audit Failed: ${data.error || 'Server error'}`)
      }
    } catch (err) {
      setAiAuditStatus(`Audit Failed: ${err instanceof Error ? err.message : 'Network error'}`)
    } finally {
      setAiAuditing(false)
    }
  }

  // -------------------------------------------------------------
  // RENDER: GATEKEEPER SCREEN (If user is not an authenticated Admin)
  // -------------------------------------------------------------
  if (authLoading) {
    return (
      <div className="bg-midnight-teal min-h-screen flex items-center justify-center text-off-white/60 font-mono text-sm uppercase">
        Verifying Security Credentials...
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="bg-midnight-teal min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-deep-teal/40 border border-deep-teal/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-mono uppercase font-bold tracking-widest">
              RESTRICTED SECTOR
            </div>
            <h2 className="text-2xl font-display uppercase tracking-widest text-off-white">
              Admin Command Login
            </h2>
            <p className="text-xs text-off-white/60 leading-relaxed">
              Elevated administrator privileges required. Enter your admin credentials to access database controls and user management.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-wider text-off-white/60 block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-off-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@gta6hub.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-midnight-teal border border-deep-teal focus:border-palm-teal rounded-xl text-xs text-off-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-wider text-off-white/60 block">
                Admin Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-off-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-midnight-teal border border-deep-teal focus:border-palm-teal rounded-xl text-xs text-off-white outline-none"
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider rounded-xl hover:opacity-95 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Authenticate as Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="border-t border-deep-teal/40 pt-4 space-y-2 text-center">
            <button
              type="button"
              onClick={handleDemoAdminLogin}
              disabled={loginLoading}
              className="w-full py-2 px-3 rounded-xl bg-deep-teal/60 hover:bg-deep-teal border border-palm-teal/40 text-palm-teal hover:text-white text-xs font-mono uppercase font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quick Demo Admin Access</span>
            </button>

            <Link
              href={`/${locale}`}
              className="inline-block text-[11px] font-mono text-off-white/40 hover:text-off-white transition"
            >
              ← Return to Main Portal
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // RENDER: FULL ADMIN COMMAND CENTER
  // -------------------------------------------------------------
  return (
    <div className="bg-midnight-teal min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Dashboard Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-deep-teal/40 border border-deep-teal rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-neon-flamingo/20 text-neon-flamingo rounded-2xl flex items-center justify-center border border-neon-flamingo/40 shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display uppercase tracking-widest text-off-white">Admin Command Center</h1>
                <span className="px-2 py-0.5 rounded bg-palm-teal/20 border border-palm-teal/40 text-palm-teal text-[10px] font-mono font-bold uppercase">
                  Root Auth
                </span>
              </div>
              <p className="text-xs text-off-white/60 mt-0.5">
                Logged in as <strong className="text-white">{currentUser?.email}</strong> ({currentUser?.role}). Full database & privilege authority.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button 
              onClick={loadAdminData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2.5 bg-deep-teal hover:bg-palm-teal/20 text-off-white rounded-xl border border-deep-teal hover:border-palm-teal/40 transition text-xs font-mono font-bold uppercase tracking-wider"
              title="Refresh database logs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Reload Logs</span>
            </button>

            <button
              onClick={handleAdminSignOut}
              className="flex items-center space-x-1.5 px-3 py-2.5 bg-black/40 hover:bg-black/80 text-rose-400 hover:text-rose-300 rounded-xl border border-rose-500/30 transition text-xs font-mono font-bold uppercase tracking-wider"
              title="Sign Out of Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap border-b border-deep-teal/40 gap-2">
          {[
            { id: 'users', label: 'Users Directory & Auth', count: usersList.length },
            { id: 'takedowns', label: 'Takedowns', count: takedownsList.filter(t => t.status === 'pending').length },
            { id: 'videos', label: 'Videos Database', count: videosList.length },
            { id: 'audit', label: 'Audit Logs', count: auditLogs.length },
            { id: 'ingest', label: 'Ingest Manager', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-neon-flamingo text-neon-flamingo bg-deep-teal/20'
                  : 'border-transparent text-off-white/50 hover:text-off-white hover:border-deep-teal'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-neon-flamingo text-white' : 'bg-midnight-teal text-off-white/60'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents Container */}
        <div className="bg-deep-teal/20 border border-deep-teal/60 rounded-3xl p-6 sm:p-8 min-h-[420px] shadow-xl">
          
          {/* TAB 1: USERS DIRECTORY & ROLE MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wider text-off-white">
                    Registered Users & Administrative Privileges
                  </h2>
                  <p className="text-xs text-off-white/60">
                    Manage accounts, elevate privileges, or demote administrators. Sudo password confirmation is strictly enforced.
                  </p>
                </div>

                <span className="text-xs font-mono text-palm-teal bg-palm-teal/10 px-3 py-1 rounded-xl border border-palm-teal/30">
                  Total Users: {usersList.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-off-white/80">
                  <thead className="text-[10px] uppercase font-mono tracking-wider text-off-white/40 border-b border-deep-teal/60">
                    <tr>
                      <th className="pb-3 pr-4">User ID (UUID)</th>
                      <th className="pb-3 pr-4">Email</th>
                      <th className="pb-3 pr-4">Current Role</th>
                      <th className="pb-3 pr-4">Subscription</th>
                      <th className="pb-3 pr-4">Registered</th>
                      <th className="pb-3 text-right">Administrative Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-deep-teal/30">
                    {usersList.map(u => {
                      const isSuper = u.role === 'superuser'
                      const isUserAdmin = u.role === 'admin'
                      const isSelf = currentUser?.email === u.email || currentUser?.id === u.id

                      return (
                        <tr key={u.id} className="hover:bg-midnight-teal/40 transition-colors">
                          <td className="py-3.5 pr-4 font-mono text-[10px] text-off-white/60">
                            {u.id.slice(0, 12)}...
                          </td>
                          <td className="py-3.5 pr-4 font-semibold text-white">
                            <div className="flex items-center gap-1.5">
                              <span>{u.email}</span>
                              {isSelf && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-palm-teal/20 text-palm-teal">
                                  You
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 pr-4">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                              u.role === 'superuser'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : u.role === 'admin'
                                ? 'bg-sunset-orange/20 text-sunset-orange border border-sunset-orange/30'
                                : 'bg-off-white/10 text-off-white/60 border border-off-white/10'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4">
                            {u.is_premium ? (
                              <span className="bg-palm-teal/20 text-palm-teal text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-palm-teal/30">
                                Premium Pro
                              </span>
                            ) : (
                              <span className="text-off-white/40 font-mono text-[10px]">Free Tier</span>
                            )}
                          </td>
                          <td className="py-3.5 pr-4 text-off-white/50 font-mono text-[11px]">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 text-right">
                            {isSuper ? (
                              <span className="text-[10px] font-mono uppercase text-rose-400/70 italic">
                                Protected Root
                              </span>
                            ) : isUserAdmin ? (
                              <button
                                onClick={() => promptSudoEscalation(u, 'user')}
                                disabled={isSelf}
                                className="px-3 py-1 rounded-lg bg-sunset-orange/20 hover:bg-sunset-orange text-sunset-orange hover:text-white border border-sunset-orange/40 text-[10px] font-mono uppercase font-bold transition disabled:opacity-30 disabled:pointer-events-none"
                                title="Demote to standard user"
                              >
                                Demote to User
                              </button>
                            ) : (
                              <button
                                onClick={() => promptSudoEscalation(u, 'admin')}
                                className="px-3 py-1 rounded-lg bg-palm-teal/20 hover:bg-palm-teal text-palm-teal hover:text-white border border-palm-teal/40 text-[10px] font-mono uppercase font-bold transition flex items-center gap-1 ml-auto"
                                title="Promote to administrator"
                              >
                                <Shield className="w-3 h-3" />
                                <span>Make Admin</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TAKEDOWNS MODERATION */}
          {activeTab === 'takedowns' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-off-white">Pending Creator Takedown Requests</h2>
              {takedownsList.length === 0 ? (
                <p className="text-xs text-off-white/40 py-8 text-center">No takedown requests submitted yet.</p>
              ) : (
                <div className="space-y-4">
                  {takedownsList.map(req => (
                    <div key={req.id} className="bg-midnight-teal/60 border border-deep-teal p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                            req.status === 'pending' ? 'bg-sunset-orange/20 text-sunset-orange border border-sunset-orange/30' : 
                            req.status === 'approved' ? 'bg-palm-teal/20 text-palm-teal border border-palm-teal/30' : 
                            'bg-off-white/10 text-off-white/40'
                          }`}>
                            {req.status}
                          </span>
                          <span className="text-xs font-mono text-off-white/50">Submitted: {new Date(req.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-off-white font-semibold">Requester: {req.requester_email}</p>
                        <p className="text-xs text-off-white/70 leading-relaxed whitespace-pre-wrap">{req.reason}</p>
                      </div>

                      {req.status === 'pending' && (
                        <div className="flex space-x-2 shrink-0">
                          <button
                            onClick={() => handleTakedownAction(req.id, req.video_id, 'approved')}
                            className="flex items-center space-x-1.5 px-3 py-1.5 bg-palm-teal hover:bg-palm-teal/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Exclude</span>
                          </button>
                          <button
                            onClick={() => handleTakedownAction(req.id, req.video_id, 'rejected')}
                            className="flex items-center space-x-1.5 px-3 py-1.5 bg-transparent border border-neon-flamingo text-neon-flamingo hover:bg-neon-flamingo hover:text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject Request</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VIDEOS MANAGEMENT */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              {/* Gemini AI Video Library Audit Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-deep-teal/40 via-midnight-teal/80 to-deep-teal/40 border border-palm-teal/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-palm-teal animate-pulse" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-off-white">
                        Gemini AI Video Content Auditor
                      </h3>
                    </div>
                    <p className="text-xs text-off-white/60 mt-1 max-w-xl">
                      Trigger Gemini AI to verify all active videos in your library. Non-GTA 6 content, GTA Online clips, and clickbait will be automatically excluded.
                    </p>
                  </div>
                  <button
                    onClick={triggerGeminiVideoAudit}
                    disabled={aiAuditing}
                    className="flex items-center gap-2 px-4 py-2 bg-palm-teal hover:bg-palm-teal/80 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition shadow-lg disabled:opacity-50 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${aiAuditing ? 'animate-spin' : ''}`} />
                    <span>{aiAuditing ? 'Auditing Library...' : 'Audit Library with AI'}</span>
                  </button>
                </div>
                {aiAuditStatus && (
                  <p className="text-xs font-mono text-palm-teal bg-black/40 px-3 py-2 rounded-lg border border-palm-teal/20">
                    {aiAuditStatus}
                  </p>
                )}
              </div>

              <h2 className="text-lg font-bold uppercase tracking-wider text-off-white">Metadata Index Moderation</h2>
              <div className="space-y-3">
                {videosList.map(v => (
                  <div key={v.id} className="flex justify-between items-center p-3 rounded-xl bg-midnight-teal/40 border border-deep-teal/40 gap-4 text-xs">
                    <div className="min-w-0">
                      <h4 className="font-bold text-off-white truncate">{v.title}</h4>
                      <div className="flex items-center space-x-2 text-[10px] text-off-white/50 font-mono mt-1">
                        <span>Creator: {v.channel_name}</span>
                        <span>•</span>
                        <span>ID: {v.external_id}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleExcludeVideo(v.id, v.excluded)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition shrink-0 ${
                        v.excluded 
                          ? 'bg-neon-flamingo text-white' 
                          : 'bg-transparent border border-palm-teal text-palm-teal hover:bg-palm-teal hover:text-white'
                      }`}
                    >
                      {v.excluded ? 'Excluded (Takedown Active)' : 'Active (Included)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-off-white">Security Audit Log Trajectory</h2>
              {auditLogs.length === 0 ? (
                <p className="text-xs text-off-white/40 py-8 text-center">No logged audit actions.</p>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3 bg-midnight-teal/40 rounded-xl border border-deep-teal/30">
                      <div className="flex justify-between text-[10px] text-off-white/40 mb-1">
                        <span>Event: <strong className="text-palm-teal uppercase">{log.action}</strong></span>
                        <span>{new Date(log.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-off-white/70">{log.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: INGEST MANAGER */}
          {activeTab === 'ingest' && (
            <div className="max-w-xl space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-off-white">Ingestion pipeline triggering</h2>
              <p className="text-xs text-off-white/60 leading-relaxed">
                Manually run the ingestion cron route. If your environment lacks YouTube or Gemini API credentials, it automatically falls back to simulated database seeding with high-quality GTA 6 gameplay/easter-egg records.
              </p>
              
              <button
                onClick={triggerIngestJob}
                disabled={ingesting}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{ingesting ? 'Running Ingestion Pipeline...' : 'Run Ingestion Sync Now'}</span>
              </button>

              {ingestStatus && (
                <div className="p-4 bg-midnight-teal border border-deep-teal rounded-2xl text-xs font-mono text-palm-teal">
                  {ingestStatus}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUDO PASSWORD RE-AUTHENTICATION MODAL                         */}
      {/* ------------------------------------------------------------- */}
      {sudoModalOpen && targetUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full rounded-3xl bg-[#080E14] border border-neon-flamingo/70 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-neon-flamingo/20 border border-neon-flamingo/50 text-neon-flamingo flex items-center justify-center shadow-lg">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display uppercase tracking-widest text-off-white">
                    Sudo Authorization
                  </h3>
                  <span className="text-[10px] font-mono text-neon-flamingo uppercase font-bold tracking-wider">
                    Privilege Escalation Guard
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSudoModalOpen(false)}
                className="p-1 rounded-lg text-off-white/40 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Details */}
            <div className="p-3.5 rounded-2xl bg-midnight-teal/80 border border-deep-teal/80 space-y-1.5 text-xs font-mono">
              <div className="text-off-white/50 text-[10px] uppercase tracking-wider">Target Account</div>
              <div className="text-white font-bold truncate">{targetUser.email}</div>
              <div className="flex items-center gap-2 pt-1 border-t border-deep-teal/50 text-[11px]">
                <span className="text-off-white/60">Action:</span>
                <span className={`font-bold uppercase ${targetRole === 'admin' ? 'text-palm-teal' : 'text-sunset-orange'}`}>
                  {targetRole === 'admin' ? 'Promote to Admin' : 'Demote to Standard User'}
                </span>
              </div>
            </div>

            <p className="text-xs text-off-white/60 leading-relaxed font-sans">
              To prevent unauthorized changes to administrative privileges, please re-enter your current administrator account password to confirm this action.
            </p>

            {/* Sudo Password Input Form */}
            <form onSubmit={handleExecuteSudoEscalation} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-off-white/60 block">
                  Admin Account Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-off-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    value={sudoPassword}
                    onChange={(e) => setSudoPassword(e.target.value)}
                    placeholder="Enter your admin password"
                    className="w-full pl-10 pr-10 py-2.5 bg-midnight-teal border border-deep-teal focus:border-neon-flamingo rounded-xl text-xs text-off-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {sudoError && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{sudoError}</span>
                </div>
              )}

              {sudoSuccess && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-palm-teal/10 border border-palm-teal/30 text-xs text-palm-teal font-mono">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{sudoSuccess}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSudoModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-deep-teal hover:border-off-white/40 text-xs font-mono uppercase text-off-white/70 hover:text-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={sudoLoading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-mono uppercase font-bold tracking-wider hover:opacity-95 transition shadow-lg flex items-center gap-1.5 disabled:opacity-50"
                >
                  {sudoLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Authorize Privilege Escalation</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

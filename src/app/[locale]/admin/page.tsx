'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Shield, Users, Video, AlertCircle, RefreshCw, Layers, Check, X, FileText, Play } from 'lucide-react'

export default function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  const [usersList, setUsersList] = useState<any[]>([])
  const [videosList, setVideosList] = useState<any[]>([])
  const [takedownsList, setTakedownsList] = useState<any[]>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [categoriesList, setCategoriesList] = useState<any[]>([])
  
  const [activeTab, setActiveTab] = useState<'users' | 'videos' | 'takedowns' | 'audit' | 'ingest'>('takedowns')
  const [loading, setLoading] = useState(true)
  const [ingestStatus, setIngestStatus] = useState('')
  const [ingesting, setIngesting] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    loadAdminData()
  }, [])

  async function loadAdminData() {
    setLoading(true)
    try {
      // 1. Fetch Users
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      setUsersList(users || [])

      // 2. Fetch Videos
      const { data: vids } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      setVideosList(vids || [])

      // 3. Fetch Takedowns
      const { data: takedowns } = await supabase
        .from('takedown_requests')
        .select('*')
        .order('created_at', { ascending: false })
      setTakedownsList(takedowns || [])

      // 4. Fetch Categories
      const { data: cats } = await supabase
        .from('categories')
        .select('*')
      setCategoriesList(cats || [])

      // 5. Fetch Audit Logs
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
  }

  // Takedown Actions (Section 11)
  const handleTakedownAction = async (requestId: string, videoId: string, action: 'approved' | 'rejected') => {
    try {
      // Begin update transaction
      // 1. Update takedown request status
      const { error: reqErr } = await supabase
        .from('takedown_requests')
        .update({ status: action })
        .eq('id', requestId)

      if (reqErr) throw reqErr

      // 2. If approved, exclude the video
      if (action === 'approved' && videoId) {
        const { error: vidErr } = await supabase
          .from('videos')
          .update({ excluded: true })
          .eq('id', videoId)
        if (vidErr) throw vidErr
      }

      // 3. Log admin action
      const { data: session } = await supabase.auth.getSession()
      const adminEmail = session?.session?.user?.email || 'admin'
      await supabase
        .from('admin_audit_logs')
        .insert({
          admin_id: session?.session?.user?.id,
          action: `takedown_${action}`,
          details: `Admin ${adminEmail} ${action} takedown request for video UUID ${videoId}`
        })

      // Refetch
      await loadAdminData()
    } catch (err) {
      console.error(err)
      alert("Failed to complete action")
    }
  }

  // Toggle Video Exclusion State (Section 11)
  const handleToggleExcludeVideo = async (videoId: string, currentExcluded: boolean) => {
    try {
      const newEx = !currentExcluded
      const { error } = await supabase
        .from('videos')
        .update({ excluded: newEx })
        .eq('id', videoId)

      if (error) throw error

      // Log action
      const { data: session } = await supabase.auth.getSession()
      await supabase
        .from('admin_audit_logs')
        .insert({
          admin_id: session?.session?.user?.id,
          action: newEx ? 'video_exclude' : 'video_include',
          details: `Toggled video exclusion. Video UUID: ${videoId}. Now excluded: ${newEx}`
        })

      await loadAdminData()
    } catch (err) {
      console.error(err)
      alert("Failed to modify video exclusion")
    }
  }

  // Ingestion Trigger (Section 11)
  const triggerIngestJob = async () => {
    setIngesting(true)
    setIngestStatus('Connecting to ingestion pipeline...')
    try {
      // In local/production we hit our API route
      // We pass the secret parameter (configured via CRON_SECRET)
      const res = await fetch(`/api/ingest?secret=${process.env.NEXT_PUBLIC_CRON_SECRET || 'secret'}`)
      const data = await res.json()

      if (res.ok) {
        setIngestStatus(`Ingest Completed! Mode: ${data.mode}. Processed ${data.processed} videos, skipped ${data.skipped} duplicates.`)
      } else {
        setIngestStatus(`Ingest Failed: ${data.error || 'Unknown error'}`)
      }
    } catch (err: any) {
      setIngestStatus(`Failed to trigger: ${err.message}`)
    } finally {
      setIngesting(false)
      await loadAdminData()
    }
  }

  if (loading) {
    return (
      <div className="bg-midnight-teal min-h-screen flex items-center justify-center text-off-white/60 font-mono text-sm uppercase">
        Loading Secure Admin Dashboard...
      </div>
    )
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Dashboard Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-deep-teal/40 border border-deep-teal rounded-3xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-neon-flamingo/10 text-neon-flamingo rounded-2xl flex items-center justify-center border border-neon-flamingo/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-display uppercase tracking-widest text-off-white">Admin Command Center</h1>
              <p className="text-xs text-off-white/50">Secure site controls, moderator review logs, and database sync status.</p>
            </div>
          </div>
          <button 
            onClick={loadAdminData}
            className="flex items-center space-x-2 px-4 py-2 bg-deep-teal hover:bg-palm-teal/20 text-off-white rounded-xl border border-deep-teal hover:border-palm-teal/40 transition text-xs font-bold uppercase tracking-wider"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Logs</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap border-b border-deep-teal/40 gap-2">
          {[
            { id: 'takedowns', label: 'Takedowns', count: takedownsList.filter(t => t.status === 'pending').length },
            { id: 'users', label: 'Users', count: usersList.length },
            { id: 'videos', label: 'Videos Database', count: videosList.length },
            { id: 'audit', label: 'Audit Logs', count: auditLogs.length },
            { id: 'ingest', label: 'Ingest Manager', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-neon-flamingo text-neon-flamingo bg-deep-teal/10'
                  : 'border-transparent text-off-white/50 hover:text-off-white'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="ml-2 bg-midnight-teal/80 text-[10px] px-2 py-0.5 rounded-full text-off-white/60">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="bg-deep-teal/20 border border-deep-teal/60 rounded-3xl p-6 sm:p-8 min-h-[400px]">
          
          {/* TAB 1: TAKEDOWNS MODERATION */}
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

          {/* TAB 2: USERS DIRECTORY */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-off-white">Registered Users & Entitlements</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-off-white/80">
                  <thead className="text-[10px] uppercase font-mono tracking-wider text-off-white/40 border-b border-midnight-teal/40">
                    <tr>
                      <th className="pb-3 pr-4">User ID (UUID)</th>
                      <th className="pb-3 pr-4">Email</th>
                      <th className="pb-3 pr-4">Role Role</th>
                      <th className="pb-3 pr-4">Subscription Plan</th>
                      <th className="pb-3">Registered At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-midnight-teal/20">
                    {usersList.map(u => (
                      <tr key={u.id} className="hover:bg-midnight-teal/20 transition-colors">
                        <td className="py-3.5 pr-4 font-mono text-[10px] text-off-white/60">{u.id}</td>
                        <td className="py-3.5 pr-4 font-semibold text-off-white">{u.email}</td>
                        <td className="py-3.5 pr-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                            u.role === 'superuser' ? 'bg-neon-flamingo/20 text-neon-flamingo border border-neon-flamingo/30' : 
                            u.role === 'admin' ? 'bg-sunset-orange/20 text-sunset-orange border border-sunset-orange/30' : 
                            'bg-off-white/10 text-off-white/60'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4">
                          {u.is_premium ? (
                            <span className="bg-palm-teal/20 text-palm-teal text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-palm-teal/30">
                              Premium (Ad-Free)
                            </span>
                          ) : (
                            <span className="text-off-white/40">Free (Ad-Supported)</span>
                          )}
                        </td>
                        <td className="py-3.5 text-off-white/50">{new Date(u.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: VIDEOS MANAGEMENT */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
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
    </div>
  )
}

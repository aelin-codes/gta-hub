import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { auditVideoWithGemini } from '@/utils/geminiAuditor'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const adminClient = createAdminClient()

    // 1. Authorize admin user or CRON_SECRET bearer
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'gtavihub_cron_2026_secrets'
    const isCron = authHeader === `Bearer ${cronSecret}`

    let adminEmail = 'system_cron'
    if (!isCron) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized: Authentication required.' }, { status: 401 })
      }
      const { data: profile } = await adminClient
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.role !== 'admin' && profile?.role !== 'superuser') {
        return NextResponse.json({ error: 'Forbidden: Admin clearance required.' }, { status: 403 })
      }
      adminEmail = user.email || user.id
    }

    // 2. Fetch all active videos
    const { data: videos, error: fetchErr } = await adminClient
      .from('videos')
      .select('id, title, description, channel_name, platform')
      .eq('excluded', false)
      .order('created_at', { ascending: false })

    if (fetchErr) {
      return NextResponse.json({ error: 'Failed to fetch videos from database' }, { status: 500 })
    }

    const totalScanned = videos?.length || 0
    let excludedCount = 0
    let confirmedCount = 0
    const excludedList: Array<{ id: string; title: string; reason: string }> = []

    // 3. Audit each video with Gemini AI
    for (const v of videos || []) {
      const audit = await auditVideoWithGemini(v.title, v.description || '')
      if (!audit.isGta6) {
        excludedCount++
        await adminClient
          .from('videos')
          .update({ excluded: true })
          .eq('id', v.id)

        excludedList.push({ id: v.id, title: v.title, reason: audit.reason })
      } else {
        confirmedCount++
      }
    }

    // 4. Log the audit in admin_audit_logs
    try {
      await adminClient
        .from('admin_audit_logs')
        .insert({
          admin_id: isCron ? null : (await supabase.auth.getUser()).data.user?.id,
          action: 'gemini_ai_video_audit',
          details: `Gemini AI audited ${totalScanned} videos. Kept ${confirmedCount}, auto-excluded ${excludedCount} non-GTA 6 videos. Triggered by ${adminEmail}.`
        })
    } catch (logErr) {
      console.warn('Failed to insert audit log:', logErr)
    }

    return NextResponse.json({
      success: true,
      totalScanned,
      confirmedCount,
      excludedCount,
      excludedList,
      message: `Gemini AI audit complete. ${confirmedCount} confirmed GTA 6, ${excludedCount} excluded.`
    })
  } catch (err) {
    console.error('Audit API error:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown audit error' }, { status: 500 })
  }
}

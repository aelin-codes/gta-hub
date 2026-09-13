import { NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')
    const authHeader = req.headers.get('authorization')

    // Verify CRON_SECRET for security
    const isCronAuthorized =
      !process.env.CRON_SECRET ||
      secret === process.env.CRON_SECRET ||
      authHeader === `Bearer ${process.env.CRON_SECRET}`

    if (!isCronAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()

    // Ping the categories table to maintain DB active status and prevent pause
    const startTime = Date.now()
    const { count, error } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })

    const latencyMs = Date.now() - startTime

    if (error) {
      console.warn('Keep-alive ping returned database warning:', error.message)
      return NextResponse.json({
        alive: false,
        warning: error.message,
        latencyMs,
        timestamp: new Date().toISOString()
      }, { status: 200 })
    }

    return NextResponse.json({
      alive: true,
      categoryCount: count ?? 0,
      latencyMs,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Keep-alive ping failed:', message)
    return NextResponse.json({
      alive: false,
      error: message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

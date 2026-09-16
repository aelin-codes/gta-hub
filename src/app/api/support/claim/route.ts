import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const { method, email, codeOrTx, plan } = await req.json()

    if (!email || !codeOrTx) {
      return NextResponse.json({ error: 'Email and transaction/gift code are required.' }, { status: 400 })
    }

    // Try server-side Supabase client if configured
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // Attempt recording into supporter_claims table if it exists
      await supabase.from('supporter_claims').insert({
        user_id: user?.id || null,
        email,
        payment_method: method || 'crypto',
        claim_data: codeOrTx,
        plan: plan || 'supporter',
        status: 'pending',
        created_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      // Table may not exist yet in Supabase — log for admin review
      console.log('[SUPPORTER CLAIM RECEIVED]:', { method, email, codeOrTx, plan })
    }

    return NextResponse.json({
      success: true,
      message: 'Claim received! Your VIP status will be activated within 2-4 hours after manual blockchain/code verification.'
    })
  } catch (err) {
    console.error('Support claim API error:', err)
    return NextResponse.json({ error: 'Failed to process claim.' }, { status: 500 })
  }
}

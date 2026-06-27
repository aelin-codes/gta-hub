import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (!secret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not set')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    // Verify HMAC SHA256 signature
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(rawBody)
    const generatedSignature = hmac.digest('hex')

    if (generatedSignature !== signature) {
      console.warn('Invalid signature detected in Razorpay webhook')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const payload = JSON.parse(rawBody)
    const event = payload.event
    const data = payload.payload

    console.log(`Processing Razorpay event: ${event}`)

    const supabase = createAdminClient()

    // 1. subscription.activated
    if (event === 'subscription.activated') {
      const subObj = data.subscription.entity
      const razorpaySubId = subObj.id
      const razorpayCustId = subObj.customer_id
      const currentPeriodEnd = new Date(subObj.current_end * 1000).toISOString()

      // Look up user using subscription notes or customer metadata.
      // Razorpay allows adding notes to subscriptions. We assume notes contain user_id.
      const userId = subObj.notes?.user_id

      if (!userId) {
        console.error('No user_id found in subscription notes')
        return NextResponse.json({ error: 'user_id missing' }, { status: 400 })
      }

      // Upsert user fields safely (Admin bypasses RLS)
      await supabase
        .from('users')
        .update({
          razorpay_customer_id: razorpayCustId,
          is_premium: true
        })
        .eq('id', userId)

      // Upsert subscription
      const { error: subErr } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          razorpay_subscription_id: razorpaySubId,
          status: 'active',
          auto_renew: true,
          current_period_end: currentPeriodEnd,
          last_charged_at: new Date().toISOString()
        }, { onConflict: 'razorpay_subscription_id' })

      if (subErr) {
        console.error('Error inserting subscription details', subErr)
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }
    } 
    
    // 2. subscription.charged (fires on renewals)
    else if (event === 'subscription.charged') {
      const paymentObj = data.payment.entity
      const subObj = data.subscription.entity
      const razorpaySubId = subObj.id
      const currentPeriodEnd = new Date(subObj.current_end * 1000).toISOString()

      // Find subscription in our db
      const { data: localSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('razorpay_subscription_id', razorpaySubId)
        .single()

      if (!localSub) {
        console.error(`Subscription ${razorpaySubId} not found in database`)
        return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
      }

      // Update user is_premium = true
      await supabase
        .from('users')
        .update({ is_premium: true })
        .eq('id', localSub.user_id)

      // Update subscription dates
      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          current_period_end: currentPeriodEnd,
          last_charged_at: new Date().toISOString()
        })
        .eq('razorpay_subscription_id', razorpaySubId)
    }

    // 3. payment.failed
    else if (event === 'payment.failed') {
      const subObj = data.subscription.entity
      const razorpaySubId = subObj.id

      const { data: localSub } = await supabase
        .from('subscriptions')
        .select('user_id, current_period_end')
        .eq('razorpay_subscription_id', razorpaySubId)
        .single()

      if (localSub) {
        // Keep active through grace period (e.g. current_period_end + 3 days)
        // If current date exceeds current_period_end + 3 days, set status past_due and is_premium false
        const graceEnd = new Date(localSub.current_period_end)
        graceEnd.setDate(graceEnd.getDate() + 3)

        const now = new Date()
        const isPastGrace = now > graceEnd

        await supabase
          .from('subscriptions')
          .update({
            status: isPastGrace ? 'past_due' : 'active'
          })
          .eq('razorpay_subscription_id', razorpaySubId)

        if (isPastGrace) {
          await supabase
            .from('users')
            .update({ is_premium: false })
            .eq('id', localSub.user_id)
        }
      }
    }

    // 4. subscription.cancelled / completed
    else if (event === 'subscription.cancelled' || event === 'subscription.completed') {
      const subObj = data.subscription.entity
      const razorpaySubId = subObj.id
      const currentPeriodEnd = new Date(subObj.current_end * 1000)

      const { data: localSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('razorpay_subscription_id', razorpaySubId)
        .single()

      if (localSub) {
        // Mark subscription cancelled
        await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            auto_renew: false
          })
          .eq('razorpay_subscription_id', razorpaySubId)

        // Downgrade only if current date is PAST currentPeriodEnd
        const now = new Date()
        if (now > currentPeriodEnd) {
          await supabase
            .from('users')
            .update({ is_premium: false })
            .eq('id', localSub.user_id)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

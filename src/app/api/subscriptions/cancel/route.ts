import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient, createAdminClient } from '@/utils/supabase/server'

const getStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY || 'mock_key', {
    apiVersion: '2023-10-16' as any,
  })
}

export async function POST(req: Request) {
  try {
    const { cancelAtPeriodEnd } = await req.json()

    // 1. Authenticate user
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminClient = createAdminClient()

    // 2. Fetch active subscription
    const { data: subscription, error: subErr } = await adminClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    if (subErr || !subscription) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 })
    }

    const processor = subscription.processor || 'stripe'
    const stripeKey = process.env.STRIPE_SECRET_KEY
    const razorpayKey = process.env.RAZORPAY_KEY_ID

    if (processor === 'stripe') {
      if (!stripeKey || !subscription.stripe_subscription_id) {
        // Mock execution when Stripe credentials are not present
        await adminClient
          .from('subscriptions')
          .update({
            auto_renew: !cancelAtPeriodEnd,
            status: cancelAtPeriodEnd ? 'cancelled' : 'active'
          })
          .eq('id', subscription.id)

        return NextResponse.json({ success: true, simulated: true })
      }

      const stripe = getStripe()
      // Cancel Stripe subscription at period end
      await stripe.subscriptions.update(subscription.stripe_subscription_id, {
        cancel_at_period_end: cancelAtPeriodEnd,
      })

      // Sync local DB immediately (webhook will also update)
      await adminClient
        .from('subscriptions')
        .update({
          auto_renew: !cancelAtPeriodEnd
        })
        .eq('id', subscription.id)

      return NextResponse.json({ success: true })
    } else {
      // Razorpay cancellation
      if (!razorpayKey || !subscription.razorpay_subscription_id) {
        // Mock Razorpay cancellation
        await adminClient
          .from('subscriptions')
          .update({
            auto_renew: !cancelAtPeriodEnd,
            status: cancelAtPeriodEnd ? 'cancelled' : 'active'
          })
          .eq('id', subscription.id)

        return NextResponse.json({ success: true, simulated: true })
      }

      if (cancelAtPeriodEnd) {
        // Call Razorpay subscription cancel API
        const subId = subscription.razorpay_subscription_id
        const authHeader = 'Basic ' + Buffer.from(process.env.RAZORPAY_KEY_ID + ':' + process.env.RAZORPAY_KEY_SECRET).toString('base64')
        
        const rzRes = await fetch(`https://api.razorpay.com/v1/subscriptions/${subId}/cancel`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },
          body: JSON.stringify({
            cancel_at_cycle_end: 1
          })
        })

        if (!rzRes.ok) {
          const errorText = await rzRes.text()
          console.error('Razorpay subscription cancellation failed:', errorText)
          return NextResponse.json({ error: 'Razorpay cancel failed' }, { status: 400 })
        }
      }

      // Sync local DB immediately
      await adminClient
        .from('subscriptions')
        .update({
          auto_renew: !cancelAtPeriodEnd,
          status: cancelAtPeriodEnd ? 'cancelled' : 'active'
        })
        .eq('id', subscription.id)

      return NextResponse.json({ success: true })
    }
  } catch (err: any) {
    console.error('Cancellation handler error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

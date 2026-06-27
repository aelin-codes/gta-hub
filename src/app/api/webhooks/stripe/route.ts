import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/utils/supabase/server'

const getStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY || 'mock_key', {
    apiVersion: '2023-10-16' as any,
  })
}

export async function POST(req: Request) {
  const stripe = getStripe()
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not set')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
    } catch (err: any) {
      console.warn(`Invalid signature detected in Stripe webhook: ${err.message}`)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const supabase = createAdminClient()
    console.log(`Processing Stripe event: ${event.type}`)

    // 1. checkout.session.completed (Initial subscription activation)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const stripeSubId = session.subscription as string
      const customerId = session.customer as string
      const userId = session.metadata?.user_id

      if (!userId) {
        console.error('Missing user_id in checkout metadata')
        return NextResponse.json({ error: 'user_id missing' }, { status: 400 })
      }

      // Fetch actual subscription details from Stripe to get period end
      const subscription = await stripe.subscriptions.retrieve(stripeSubId)
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString()

      // Update user details
      await supabase
        .from('users')
        .update({
          stripe_customer_id: customerId,
          is_premium: true
        })
        .eq('id', userId)

      // Upsert subscription details
      const { error: subErr } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          stripe_subscription_id: stripeSubId,
          status: 'active',
          auto_renew: true,
          current_period_end: currentPeriodEnd,
          last_charged_at: new Date().toISOString()
        }, { onConflict: 'stripe_subscription_id' })

      if (subErr) {
        console.error('Error inserting Stripe subscription', subErr)
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }
    } 
    
    // 2. invoice.payment_succeeded (Charged / renewed)
    else if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice
      const stripeSubId = invoice.subscription as string

      if (stripeSubId) {
        const subscription = await stripe.subscriptions.retrieve(stripeSubId)
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString()

        const { data: localSub } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', stripeSubId)
          .single()

        if (localSub) {
          // Grant/extend premium
          await supabase
            .from('users')
            .update({ is_premium: true })
            .eq('id', localSub.user_id)

          // Update subscription details
          await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              current_period_end: currentPeriodEnd,
              last_charged_at: new Date().toISOString()
            })
            .eq('stripe_subscription_id', stripeSubId)
        }
      }
    }

    // 3. invoice.payment_failed (Grace period / dunning logic)
    else if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice
      const stripeSubId = invoice.subscription as string

      if (stripeSubId) {
        const { data: localSub } = await supabase
          .from('subscriptions')
          .select('user_id, current_period_end')
          .eq('stripe_subscription_id', stripeSubId)
          .single()

        if (localSub) {
          // Grace period check (currentPeriodEnd + 3 days)
          const graceEnd = new Date(localSub.current_period_end)
          graceEnd.setDate(graceEnd.getDate() + 3)

          const now = new Date()
          const isPastGrace = now > graceEnd

          await supabase
            .from('subscriptions')
            .update({
              status: isPastGrace ? 'past_due' : 'active'
            })
            .eq('stripe_subscription_id', stripeSubId)

          if (isPastGrace) {
            await supabase
              .from('users')
              .update({ is_premium: false })
              .eq('id', localSub.user_id)
          }
        }
      }
    }

    // 4. customer.subscription.deleted / customer.subscription.updated (Cancel)
    else if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
      const stripeSub = event.data.object as Stripe.Subscription
      const stripeSubId = stripeSub.id
      const status = stripeSub.status
      const cancelAtPeriodEnd = stripeSub.cancel_at_period_end
      const currentPeriodEnd = new Date(stripeSub.current_period_end * 1000)

      const { data: localSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', stripeSubId)
        .single()

      if (localSub) {
        let localStatus = 'active'
        if (status === 'canceled' || status === 'unpaid') {
          localStatus = 'cancelled'
        } else if (status === 'past_due') {
          localStatus = 'past_due'
        }

        await supabase
          .from('subscriptions')
          .update({
            status: localStatus,
            auto_renew: !cancelAtPeriodEnd
          })
          .eq('stripe_subscription_id', stripeSubId)

        // Downgrade only if status is canceled and date passed
        const now = new Date()
        if ((status === 'canceled' || status === 'unpaid') && now > currentPeriodEnd) {
          await supabase
            .from('users')
            .update({ is_premium: false })
            .eq('id', localSub.user_id)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

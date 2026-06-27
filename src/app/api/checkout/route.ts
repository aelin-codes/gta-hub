import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const getStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY || 'mock_key', {
    apiVersion: '2023-10-16' as any,
  })
}

export async function POST(req: Request) {
  try {
    const { processor, country, currency } = await req.json()

    // 1. Authenticate user server-side
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY
    const razorpayKey = process.env.RAZORPAY_KEY_ID

    const origin = req.headers.get('origin') || 'http://localhost:3001'

    if (processor === 'stripe') {
      if (!stripeKey) {
        // Return simulated Stripe checkout URL with mock query parameters
        const mockUrl = `${origin}/dashboard?session_id=mock_stripe_session`
        return NextResponse.json({ url: mockUrl, simulated: true })
      }

      const stripe = getStripe()
      const stripePriceId = process.env.STRIPE_PRICE_ID || 'price_123'

      // Create Stripe checkout session in subscription mode with tax enabled
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: stripePriceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        customer_email: user.email,
        metadata: {
          user_id: user.id,
          billing_country: country,
          billing_currency: currency,
          processor: 'stripe',
        },
        automatic_tax: {
          enabled: true, // Stripe Tax configuration
        },
      })

      return NextResponse.json({ url: session.url })
    } else {
      // Razorpay subscription creation
      if (!razorpayKey) {
        // Return simulated Razorpay checkout URL
        const mockUrl = `${origin}/dashboard?razorpay_payment_id=mock_razorpay_sub`
        return NextResponse.json({ url: mockUrl, simulated: true })
      }

      const planId = process.env.RAZORPAY_PLAN_ID || 'plan_123'
      const authHeader = 'Basic ' + Buffer.from(process.env.RAZORPAY_KEY_ID + ':' + process.env.RAZORPAY_KEY_SECRET).toString('base64')
      
      const rzRes = await fetch('https://api.razorpay.com/v1/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          plan_id: planId,
          customer_notify: 1,
          total_count: 12,
          notes: {
            user_id: user.id,
            billing_country: country,
            billing_currency: currency,
            processor: 'razorpay'
          }
        })
      })

      if (!rzRes.ok) {
        const errorText = await rzRes.text()
        console.error('Razorpay subscription creation failed:', errorText)
        return NextResponse.json({ error: 'Razorpay creation failed' }, { status: 400 })
      }

      const subscription = await rzRes.json()
      return NextResponse.json({ url: subscription.short_url || `${origin}/dashboard` })
    }
  } catch (err: any) {
    console.error('Checkout API failure:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

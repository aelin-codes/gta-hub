'use client'

import { useState, useEffect } from 'react'
import { Check, ShieldCheck, Sparkles, AlertCircle, HelpCircle, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

// Simulated forex rates relative to USD (base price: 9.99 USD)
const MOCK_FOREX = {
  USD: 9.99,
  EUR: 9.20,
  GBP: 7.80,
}

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  const [user, setUser] = useState<any>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    getUser()
  }, [])

  const getPriceDisplay = () => {
    if (selectedCurrency === 'USD') return `$${MOCK_FOREX.USD.toFixed(2)}`
    if (selectedCurrency === 'EUR') return `€${MOCK_FOREX.EUR.toFixed(2)}`
    return `£${MOCK_FOREX.GBP.toFixed(2)}`
  }

  const handleSubscribe = async () => {
    if (!user) {
      alert("Please log in or create an account before subscribing.")
      window.location.href = `/${locale}/login`
      return
    }

    setLoading(true)
    // Simulate redirection to Stripe hosted checkout
    setTimeout(() => {
      setLoading(false)
      alert(`Redirecting to Stripe Global Billing hosted checkout...\nYour subscription will be tied to account ID: ${user.id}`)
    }, 1500)
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-widest text-off-white">
            CHOOSE YOUR PLAN
          </h1>
          <p className="text-sm sm:text-md text-off-white/60">
            Support the fan project and unlock premium features. No ad-interstitials, advanced AI semantic database query engine.
          </p>

          {/* Currency Selector (Section 10) */}
          <div className="inline-flex items-center space-x-2 bg-deep-teal p-1 rounded-xl border border-deep-teal/80 mt-6">
            {(['USD', 'EUR', 'GBP'] as const).map(curr => (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCurrency === curr
                    ? 'bg-palm-teal text-white'
                    : 'text-off-white/60 hover:text-off-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Free Tier */}
          <div className="bg-deep-teal/20 rounded-3xl p-8 border border-deep-teal/60 flex flex-col justify-between relative">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-off-white/40 block mb-2">Basic Access</span>
              <h3 className="text-2xl font-bold uppercase text-off-white">Community</h3>
              
              <div className="my-6">
                <span className="text-4xl font-display text-off-white">Free</span>
                <span className="text-xs text-off-white/50 block mt-1">With interstitial ads support</span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-off-white/80 border-t border-midnight-teal/30 pt-6">
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-palm-teal shrink-0" />
                  <span>Access all gameplay videos & guide embeds</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-palm-teal shrink-0" />
                  <span>Standard search & keyword filtering</span>
                </li>
                <li className="flex items-center space-x-3 opacity-40">
                  <X className="w-4 h-4 text-neon-flamingo shrink-0" />
                  <span className="line-through">Ad-free viewings (interstitial ads trigger every 3 opens)</span>
                </li>
                <li className="flex items-center space-x-3 opacity-40">
                  <X className="w-4 h-4 text-neon-flamingo shrink-0" />
                  <span className="line-through">AI Natural-language semantic search engine</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full mt-8 py-3 bg-midnight-teal border border-deep-teal text-xs font-bold uppercase tracking-widest rounded-xl text-off-white/50 cursor-not-allowed"
            >
              Current Active Tier
            </button>
          </div>

          {/* Premium Tier */}
          <div className="bg-deep-teal rounded-3xl p-8 border border-neon-flamingo/40 flex flex-col justify-between relative shadow-[0_0_30px_rgba(255,61,129,0.15)]">
            <div className="absolute -top-3.5 right-6 bg-neon-flamingo px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold text-white shadow-lg">
              Most Popular
            </div>
            
            <div>
              <div className="flex items-center space-x-1.5 text-xs uppercase font-mono tracking-widest text-neon-flamingo mb-2">
                <Sparkles className="w-4.5 h-4.5" />
                <span>Premium Access</span>
              </div>
              <h3 className="text-2xl font-bold uppercase text-off-white">Leonida Pro</h3>
              
              <div className="my-6">
                <span className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange neon-glow-flamingo">
                  {getPriceDisplay()}
                </span>
                <span className="text-xs text-off-white/50 block mt-1">
                  Monthly subscription (Auto-renews at $9.99/month or equivalent)
                </span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-off-white/80 border-t border-midnight-teal/30 pt-6">
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-palm-teal shrink-0" />
                  <span className="font-semibold text-off-white">Ad-free viewings (All interstitials removed)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-palm-teal shrink-0" />
                  <span className="font-semibold text-off-white">AI Natural-language semantic search engine</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-palm-teal shrink-0" />
                  <span>Favorite lists and bookmark tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-palm-teal shrink-0" />
                  <span>Direct deep-link bookmarks checklist</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 mt-8">
              {/* Consolidated Checkout via Stripe (Section 10) */}
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Subscribe via Stripe Billing</span>
              </button>
            </div>
          </div>

        </div>

        {/* FTC Click-to-Cancel Disclosure Requirements (Legal shit.txt & Section 7/10) */}
        <div className="max-w-3xl mx-auto bg-deep-teal/20 border border-deep-teal/40 rounded-2xl p-6 text-xs text-off-white/60 space-y-3">
          <div className="flex items-center space-x-2 text-neon-flamingo font-semibold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Subscription & Cancellation Policy Disclosure</span>
          </div>
          <p className="leading-relaxed">
            Subscriptions automatically renew on a monthly basis until cancelled. You will be charged $9.99/month (or equivalent currency conversion at checkout) on each billing date. 
          </p>
          <p className="leading-relaxed font-semibold text-off-white/80">
            Easy Cancellation: You can toggle off auto-renewal at any time with a single click from your Account Dashboard. 
            Toggling off auto-renew cancels future billing cycles immediately; your Premium features will remain active and fully usable until the current billing cycle expires.
          </p>
        </div>

      </div>
    </div>
  )
}

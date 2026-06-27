'use client'

import { useState, useEffect } from 'react'
import { Check, Sparkles, AlertCircle, X, MapPin } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

// Presentment currencies for non-Indian Stripe transactions (Section 10)
const STRIPE_CURRENCIES = {
  USD: { symbol: '$', rate: 9.99 },
  EUR: { symbol: '€', rate: 9.20 },
  GBP: { symbol: '£', rate: 7.80 }
}

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  const [user, setUser] = useState<any>(null)
  const [country, setCountry] = useState('US')
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD')
  const [showOverride, setShowOverride] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    getUser()

    // Read NEXT_COUNTRY cookie to determine billing region (geo-routed in middleware)
    const match = document.cookie.match(/(^| )NEXT_COUNTRY=([^;]+)/)
    const detectedCountry = match ? match[2] : 'US'
    setCountry(detectedCountry)
  }, [])

  const handleCountryOverride = (newCountry: string) => {
    document.cookie = `NEXT_COUNTRY=${newCountry}; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax`
    setCountry(newCountry)
    setShowOverride(false)
  }

  const getPriceDisplay = () => {
    if (country === 'IN') {
      return '₹1,000 / mo'
    }
    const curr = STRIPE_CURRENCIES[selectedCurrency] || STRIPE_CURRENCIES.USD
    return `${curr.symbol}${curr.rate.toFixed(2)} / mo`
  }

  const handleSubscribe = async () => {
    if (!user) {
      alert("Please log in or create an account before subscribing.")
      window.location.href = `/${locale}/login`
      return
    }

    setLoading(true)
    const processor = country === 'IN' ? 'razorpay' : 'stripe'

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          processor,
          country,
          currency: country === 'IN' ? 'INR' : selectedCurrency
        })
      })

      const data = await res.json()
      if (res.ok && data.url) {
        if (data.simulated) {
          alert(`Simulating redirection to ${processor === 'razorpay' ? 'Razorpay' : 'Stripe'} checkout...\nBilling country: ${country}`)
        }
        window.location.href = data.url
      } else {
        alert(data.error || "Failed to initialize checkout.")
      }
    } catch (err) {
      console.error(err)
      alert("Checkout redirection error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative">
      
      {/* 0. TAKE-TWO / ROCKSTAR LEGAL DISCLAIMER (Section 9 & Legal shit.txt) */}
      <div className="max-w-4xl mx-auto mb-10 bg-sunset-orange/15 border border-sunset-orange/30 rounded-2xl p-4 text-xs text-center text-sunset-orange font-semibold">
        GTA VI HUB IS AN UNOFFICIAL FAN PORTAL. IT IS NOT AFFILIATED WITH, SPONSORED BY, OR ENDORSED BY ROCKSTAR GAMES OR TAKE-TWO INTERACTIVE.
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-widest text-off-white">
            CHOOSE YOUR PLAN
          </h1>
          <p className="text-sm sm:text-md text-off-white/60">
            Support the fan project and unlock premium features. No ad-interstitials, advanced AI semantic database query engine.
          </p>

          {/* Billing currency selection for international users */}
          {country !== 'IN' && (
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
          )}
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
              
              <div className="my-6 text-center md:text-left">
                <span className="text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange neon-glow-flamingo">
                  {getPriceDisplay()}
                </span>
                
                {/* Auto-Renewal Disclosure FTC compliance (Section 7) */}
                <span className="text-[10px] text-off-white/50 block mt-1 leading-relaxed">
                  Monthly subscription (Auto-renews at {country === 'IN' ? '₹1,000/month' : '$9.99/month'} or equivalent). Cancel anytime.
                </span>

                {/* Country override display option (Section 10 escape hatch) */}
                <div className="mt-3 flex items-center justify-center md:justify-start space-x-2 text-[10px] text-off-white/40">
                  <MapPin className="w-3.5 h-3.5 text-palm-teal" />
                  <span>Detected region: <strong>{country}</strong></span>
                  <button 
                    onClick={() => setShowOverride(!showOverride)} 
                    className="text-palm-teal hover:underline font-bold"
                  >
                    Change?
                  </button>
                </div>

                {showOverride && (
                  <div className="mt-3 p-3 bg-midnight-teal/80 border border-deep-teal/60 rounded-xl space-y-1.5 text-left">
                    <label className="text-[9px] uppercase font-mono tracking-wider text-off-white/50 block">Override billing region</label>
                    <select
                      value={country}
                      onChange={(e) => handleCountryOverride(e.target.value)}
                      className="w-full bg-deep-teal border border-deep-teal/80 text-xs text-off-white px-2 py-1 rounded"
                    >
                      <option value="US">United States (Stripe USD)</option>
                      <option value="IN">India (Razorpay INR)</option>
                      <option value="GB">United Kingdom (Stripe GBP)</option>
                      <option value="DE">Germany/Europe (Stripe EUR)</option>
                      <option value="CA">Canada (Stripe CAD)</option>
                      <option value="AU">Australia (Stripe AUD)</option>
                    </select>
                  </div>
                )}
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
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Processing...' : `Subscribe via ${country === 'IN' ? 'Razorpay' : 'Stripe'}`}</span>
              </button>
            </div>
          </div>

        </div>

        {/* FTC Click-to-Cancel Disclosure & SaaS Policies (Legal shit.txt & Section 7/10) */}
        <div className="max-w-3xl mx-auto bg-deep-teal/20 border border-deep-teal/40 rounded-2xl p-6 text-xs text-off-white/60 space-y-4">
          <div className="flex items-center space-x-2 text-neon-flamingo font-semibold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Subscription & Cancellation Policy Disclosure</span>
          </div>
          <p className="leading-relaxed">
            Subscriptions automatically renew on a monthly basis until cancelled. You will be charged {country === 'IN' ? '₹1,000/month' : '$9.99/month (or equivalent currency conversion at checkout)'} on each billing date. 
            Stripe Tax handles regional digital VAT/GST compliance.
          </p>
          <p className="leading-relaxed font-semibold text-off-white/80">
            Easy Cancellation: You can toggle off auto-renewal at any time with a single click from your Account Dashboard. 
            Toggling off auto-renew cancels future billing cycles immediately; your Premium features will remain active and fully usable until the current billing cycle expires.
          </p>
          <div className="border-t border-midnight-teal/30 pt-4 flex space-x-4">
            <Link href={`/${locale}/terms`} className="hover:text-sunset-orange underline">Terms of Service</Link>
            <Link href={`/${locale}/privacy`} className="hover:text-sunset-orange underline">Privacy Policy</Link>
            <Link href={`/${locale}/refunds`} className="hover:text-sunset-orange underline">Refund & Cancellation Policy</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

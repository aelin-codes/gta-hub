import { ShieldAlert } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="bg-[#0B1E23] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Warning Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start space-x-3 text-amber-500 text-xs">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-wider">Draft Version — Pending Legal Review</p>
            <p className="mt-1 opacity-80">This document is currently a draft representation for compliance purposes. It must undergo formal legal audit before the production release.</p>
          </div>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-4xl font-display uppercase tracking-widest text-[#F1F5F4]">
            Terms of Service
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#1FA9A0] mt-2">
            Last Updated: June 27, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#0F2E33]/30 border border-[#0F2E33]/80 rounded-3xl p-8 space-y-6 text-[#F1F5F4]/80 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">1. Agreement to Terms</h2>
            <p>
              By accessing and using GTA 6 Hub (&quot;the Website&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must immediately discontinue your use of our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">2. Unofficial Fan Content Disclaimer</h2>
            <p className="font-semibold text-sunset-orange">
              GTA 6 Hub is an unofficial, independent fan-created portal. We are not affiliated with, endorsed by, sponsored by, or associated with Rockstar Games, Take-Two Interactive, or any of their parent or subsidiary entities. 
            </p>
            <p>
              All game media, characters, logos, titles, and trademarks are the exclusive property of their respective owners. Embedded media files are streamed directly via official APIs (YouTube and Twitch) and belong to their respective creators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">3. Premium Subscriptions</h2>
            <p>
              We offer &quot;Leonida Pro&quot; premium membership tiers to support the development and hosting of this fan platform. Subscriptions are billed on a recurring monthly basis. By subscribing, you authorize us to charge your payment method (processed via Stripe or Razorpay) for the specified monthly fee.
            </p>
            <p>
              Auto-Renewal: Subscriptions automatically renew at the end of each billing cycle unless you disable auto-renewal prior to your billing date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">4. Prohibited Activities</h2>
            <p>
              You agree not to use the Website to distribute, upload, or index any modification menus, cheat software, cracks, private servers, online multiplayer exploit tools, or any software violating the end-user license agreements (EULA) of Rockstar Games.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">5. Limitation of Liability</h2>
            <p>
              The Website and its services are provided on an &quot;as-is&quot; basis. We make no representations or warranties of any kind regarding completeness, security, or uptime.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

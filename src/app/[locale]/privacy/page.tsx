import { ShieldAlert } from 'lucide-react'

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#1FA9A0] mt-2">
            Last Updated: June 27, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#0F2E33]/30 border border-[#0F2E33]/80 rounded-3xl p-8 space-y-6 text-[#F1F5F4]/80 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">1. Information We Collect</h2>
            <p>
              We collect information that you directly provide to us, such as when you create an account, complete subscription payments, or contact us. This may include your email address, billing country, subscription preferences, and payment information handled securely by Stripe or Razorpay.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">2. How We Use Information</h2>
            <p>
              We use the collected data to authenticate your account, unlock your premium features, process transactions, target geo-routed payments, and personalize your experience on the Website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">3. Third-Party Integrations & Cookies</h2>
            <p>
              We implement Google AdSense and analytics tools to support the operations of this unofficial platform. These third-party services use cookies to track traffic patterns and deliver relevant ad units. 
            </p>
            <p className="font-semibold">
              Cookie Consent: These third-party scripts are completely blocked and will not initialize until you explicitly click &quot;Accept All&quot; on our Cookie Consent Banner.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">4. GDPR and CCPA Rights</h2>
            <p>
              Depending on your location, you may have rights to access, rectify, or delete the personal data we hold about you. You can submit deletion requests by sending a query using our takedown or customer support routes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">5. Security</h2>
            <p>
              We implement industry-standard security measures, including secure SSL links and Supabase backend Row-Level Security (RLS) policies, to protect your accounts and subscription details from unauthorized modifications.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

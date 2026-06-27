import { ShieldAlert } from 'lucide-react'

export default function RefundsPage() {
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
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#1FA9A0] mt-2">
            Last Updated: June 27, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#0F2E33]/30 border border-[#0F2E33]/80 rounded-3xl p-8 space-y-6 text-[#F1F5F4]/80 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">1. Cancellation Terms</h2>
            <p>
              You can cancel your Leonida Pro recurring subscription at any time. To cancel, go to your Account Dashboard and toggle off the auto-renewal switch.
            </p>
            <p className="font-semibold text-[#1FA9A0]">
              Once auto-renewal is toggled off, you will not be charged for subsequent billing periods. Your premium features will remain fully unlocked and functional until the current monthly period expires.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">2. Refund Eligibility</h2>
            <p>
              Due to the digital nature of the services provided, we generally do not offer refunds once premium features are activated on an account. 
            </p>
            <p>
              If you experience technical issues or if there has been an error in billing, you may contact our support team. Refunds are granted at our sole discretion on a case-by-case basis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">3. Policy Changes</h2>
            <p>
              We reserve the right to modify these cancellation and refund policies. Any adjustments will be reflected immediately on this page and disclosed to active subscribers prior to subsequent renewals.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

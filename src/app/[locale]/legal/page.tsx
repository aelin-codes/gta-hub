import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldAlert, ExternalLink } from 'lucide-react'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const canonicalUrl = `https://gta6hub.com/${locale}/legal`
  return {
    title: 'Legal & Trademark Notices',
    description:
      'Legal notices, trademark disclaimers, DMCA safe-harbor information, and intellectual property disclosures for GTA 6 Hub.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: 'Legal & Trademark Notices',
      description:
        'Fan site disclaimer, trademark ownership, DMCA contact, and legal disclosures for GTA 6 Hub.',
      url: canonicalUrl,
      siteName: 'GTA 6 Hub',
    },
  }
}

// Verbatim trademark text — must not be modified (gate-before-deploy requirement)
const TRADEMARK_DISCLAIMER =
  'GTA 6 Hub is an unofficial fan site and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. All trademarks belong to their respective owners. All videos remain the property of their original creators and are embedded via official platform players.'

export default function LegalPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <div className="bg-[#0B1E23] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-display uppercase tracking-widest text-[#F1F5F4]">
            Legal & Trademark Notices
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#1FA9A0] mt-2">
            Last Updated: September 27, 2026
          </p>
        </div>

        {/* Section 1: Trademark Disclaimer — Verbatim Required */}
        <div className="bg-[#0F2E33]/30 border border-[#0F2E33]/80 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-5 h-5 text-[#FF3D81] shrink-0" />
            <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">
              1. Fan Site Disclaimer & Trademark Notice
            </h2>
          </div>
          <p className="text-[#F1F5F4]/90 text-sm leading-relaxed font-medium border-l-2 border-[#FF3D81]/60 pl-4">
            {TRADEMARK_DISCLAIMER}
          </p>
          <p className="text-[#F1F5F4]/60 text-sm leading-relaxed">
            GTA, Grand Theft Auto, Vice City, Leonida, Rockstar Games, and all associated marks,
            logos, and trade dress are registered trademarks of Take-Two Interactive Software, Inc.
            and/or its affiliates. Use of these marks on this fan site is purely nominative and
            does not imply sponsorship, endorsement, or official affiliation of any kind.
          </p>
        </div>

        {/* Section 2: DMCA Safe Harbor */}
        <div className="bg-[#0F2E33]/30 border border-[#0F2E33]/80 rounded-3xl p-8 space-y-4 text-[#F1F5F4]/80 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">
            2. DMCA Safe Harbor & Copyright
          </h2>
          <p>
            GTA 6 Hub embeds video content exclusively through official platform APIs — YouTube
            (YouTube Data API v3) and Twitch (Twitch API) — and does not host, store, or serve
            video files directly. All embedded content remains the property of the original
            uploaders and is displayed subject to the respective platform terms of service.
          </p>
          <p>
            If you are a rights-holder and believe that content indexed on this site infringes
            your copyright, please submit a formal takedown request. We respond promptly and
            will remove or delist infringing content as required by the Digital Millennium
            Copyright Act (DMCA) safe harbor provisions (17 U.S.C. § 512(c)).
          </p>
          <Link
            href={`/${locale}/takedown`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF3D81]/10 border border-[#FF3D81]/30 text-[#FF3D81] text-xs font-bold uppercase tracking-wider hover:bg-[#FF3D81]/20 transition"
          >
            Submit Takedown Request
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Section 3: YouTube API Compliance */}
        <div className="bg-[#0F2E33]/30 border border-[#0F2E33]/80 rounded-3xl p-8 space-y-4 text-[#F1F5F4]/80 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">
            3. YouTube API Services Compliance
          </h2>
          <p>
            This application uses the YouTube API Services. By using this site, you agree to be
            bound by the{' '}
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1FA9A0] underline hover:text-[#F1F5F4] transition"
            >
              YouTube Terms of Service
            </a>
            . Creator attribution is preserved on all indexed content. Video data is not cached
            beyond the period permitted by YouTube API policies.
          </p>
        </div>

        {/* Section 4: Additional Policies */}
        <div className="bg-[#0F2E33]/30 border border-[#0F2E33]/80 rounded-3xl p-8 space-y-4 text-[#F1F5F4]/80 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-[#F1F5F4] uppercase tracking-wide">
            4. Related Policies
          </h2>
          <ul className="space-y-2">
            {[
              { href: `/${locale}/privacy`, label: 'Privacy Policy' },
              { href: `/${locale}/terms`, label: 'Terms of Service' },
              { href: `/${locale}/refunds`, label: 'Refund & Cancellation Policy' },
              { href: `/${locale}/takedown`, label: 'Takedown Request Form' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[#1FA9A0] hover:text-[#F1F5F4] transition underline text-sm"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5: Repeat verbatim trademark at page bottom — gate requirement */}
        <p className="text-center text-[10px] text-[#F1F5F4]/30 leading-relaxed px-4 pb-4">
          {TRADEMARK_DISCLAIMER}
        </p>
      </div>
    </div>
  )
}

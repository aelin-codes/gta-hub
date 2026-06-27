import { Inter, Bebas_Neue } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

export const revalidate = 60;
import { CookieConsentBanner, ThirdPartyScripts } from '@/components/CookieConsent'
import { locales } from '@/i18n'
import Link from 'next/link'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata = {
  title: 'GTA 6 Hub — Fan Site & Video Archive',
  description: 'The premium unofficial guide to GTA 6 secrets, walkthroughs, map POIs, and video walkthroughs.',
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound()

  let messages
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans bg-midnight-teal text-off-white flex flex-col min-h-screen selection:bg-neon-flamingo selection:text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThirdPartyScripts />
          
          {/* Header Navigation */}
          <header className="sticky top-0 z-50 bg-midnight-teal/85 backdrop-blur-md border-b border-deep-teal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              
              {/* Logo */}
              <Link href={`/${locale}`} className="flex items-center space-x-2">
                <span className="text-3xl font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal neon-glow-flamingo animate-flicker">
                  GTA VI HUB
                </span>
                <span className="bg-palm-teal/20 text-palm-teal text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-palm-teal/30">
                  Fan Portal
                </span>
              </Link>

              {/* Navigation Items */}
              <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider font-semibold">
                <Link href={`/${locale}`} className="hover:text-neon-flamingo transition duration-200">
                  Home
                </Link>
                <Link href={`/${locale}/library`} className="hover:text-neon-flamingo transition duration-200">
                  Library
                </Link>
                <Link href={`/${locale}/wiki`} className="hover:text-neon-flamingo transition duration-200">
                  Wiki / Map
                </Link>
                <Link href={`/${locale}/pricing`} className="hover:text-neon-flamingo transition duration-200">
                  Pricing
                </Link>
                <Link href={`/${locale}/dashboard`} className="hover:text-neon-flamingo transition duration-200">
                  Dashboard
                </Link>
                <Link href={`/${locale}/admin`} className="hover:text-neon-flamingo transition duration-200 text-palm-teal">
                  Admin
                </Link>
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Link 
                  href={`/${locale}/pricing`} 
                  className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest border border-neon-flamingo text-neon-flamingo hover:bg-neon-flamingo hover:text-white transition duration-300 rounded shadow-[0_0_10px_rgba(255,61,129,0.2)]"
                >
                  Go Premium
                </Link>
                <Link 
                  href={`/${locale}/login`} 
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white hover:opacity-90 transition duration-300 rounded shadow-[0_4px_15px_rgba(255,61,129,0.4)]"
                >
                  Join
                </Link>
              </div>

            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex flex-col">
            {children}
          </main>

          {/* Footer Section */}
          <footer className="bg-deep-teal border-t border-midnight-teal py-12 px-4 sm:px-6 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="mb-6 md:mb-0">
                <span className="text-2xl font-display tracking-widest text-off-white">
                  GTA VI <span className="text-neon-flamingo">HUB</span>
                </span>
                <p className="text-xs text-off-white/50 mt-2 max-w-md">
                  Organizing Vice City & Leonida secrets. Search videos, map locations, and easter eggs instantly.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center space-x-6 text-xs uppercase tracking-wider mb-6 md:mb-0">
                <Link href={`/${locale}/takedown`} className="hover:text-sunset-orange transition">
                  Takedown Request
                </Link>
                <Link href={`/${locale}/privacy`} className="hover:text-sunset-orange transition">
                  Privacy Policy
                </Link>
                <Link href={`/${locale}/terms`} className="hover:text-sunset-orange transition">
                  Terms of Service
                </Link>
                <Link href={`/${locale}/refunds`} className="hover:text-sunset-orange transition">
                  Refund Policy
                </Link>
              </div>
            </div>

            {/* Legal Disclaimer Requirement (Section 9) */}
            <div className="max-w-7xl mx-auto border-t border-midnight-teal/30 pt-8 mt-8 text-center text-[10px] text-off-white/40 leading-relaxed">
              GTA 6 Hub is an unofficial fan site and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. 
              All trademarks belong to their respective owners. All videos remain the property of their original creators and are embedded via official platform players.
            </div>
          </footer>
          <CookieConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

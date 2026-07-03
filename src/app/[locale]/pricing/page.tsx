import { Metadata } from 'next'
import PricingClientPage from './PricingClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'Pricing Plans | GTA 6 Hub'
  const description = 'Unlock Leonida Pro for ad-free experience, natural-language AI semantic search, and save guides and easter eggs. Check local pricing conversions.'
  const canonicalUrl = `https://gta6hub.com/${locale}/pricing`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'GTA 6 Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}

export default async function PricingPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <PricingClientPage locale={locale} />
}

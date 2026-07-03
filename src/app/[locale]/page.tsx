import { Metadata } from 'next'
import HomeClientPage from './HomeClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'GTA 6 Hub — Fan Site & Video Archive'
  const description = 'The premium unofficial guide to GTA 6 secrets, walkthroughs, map POIs, and video walkthroughs.'
  const canonicalUrl = `https://gta6hub.com/${locale}`

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

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <HomeClientPage locale={locale} />
}

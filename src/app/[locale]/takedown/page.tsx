import { Metadata } from 'next'
import TakedownClientPage from './TakedownClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'Content Takedown Request | GTA 6 Hub'
  const description = 'Creator exclusion request. If you are a content creator and would like your video metadata removed from GTA 6 Hub, submit your request here.'
  const canonicalUrl = `https://gta6hub.com/${locale}/takedown`

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

export default async function TakedownRequestPage() {
  return <TakedownClientPage />
}

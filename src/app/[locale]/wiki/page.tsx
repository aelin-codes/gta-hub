import { Metadata } from 'next'
import WikiClientPage from './WikiClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'Wiki & Interactive Database'
  const description = 'Explore the interactive map of Leonida, character bios for Jason and Lucia, vehicle spawn locations, and confirmed features for GTA 6.'
  const canonicalUrl = `https://gta6hub.com/${locale}/wiki`

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

export default async function WikiPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <WikiClientPage locale={locale} />
}

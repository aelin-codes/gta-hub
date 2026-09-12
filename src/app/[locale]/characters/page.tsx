import { Metadata } from 'next'
import CharactersClientPage from './CharactersClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'Character Database & Lore Vault | GTA 6 & Vice City'
  const description = 'Complete character dossier for GTA 6 (Leonida) and GTA Vice City: stats, voice cast, outfits, quotes, and criminal affiliations.'
  const canonicalUrl = `https://gta6hub.com/${locale}/characters`

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

export default function CharactersPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <CharactersClientPage locale={locale} />
}

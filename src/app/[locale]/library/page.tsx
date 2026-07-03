import { Metadata } from 'next'
import LibraryClientPage from './LibraryClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'Video Library | GTA 6 Hub'
  const description = 'Browse community-curated GTA 6 guides, easter eggs, glitches, and mission walkthroughs. Filter by category, tags, or search using AI semantic search.'
  const canonicalUrl = `https://gta6hub.com/${locale}/library`

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

export default async function LibraryPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <LibraryClientPage locale={locale} />
}

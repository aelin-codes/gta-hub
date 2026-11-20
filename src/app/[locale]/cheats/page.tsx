import { Metadata } from 'next'
import CheatsClientPage from './CheatsClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const canonicalUrl = `https://gta6hub.com/${locale}/cheats`
  return {
    title: 'GTA 6 Cheats & Dial Codes Database (Leonida & Vice City)',
    description:
      'Complete list of Grand Theft Auto VI cell phone dial cheats, button combinations, and secret console commands. Instant copy, category filters, and achievement warnings.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: 'GTA 6 Cheats & Secret Codes — Vice City & Leonida',
      description:
        'Full tactical cheat list for GTA 6. Spawn supercars, max out health & armor, lower wanted levels, or manipulate tropical weather.',
      url: canonicalUrl,
      siteName: 'GTA 6 Hub',
    },
  }
}

export default function CheatsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <CheatsClientPage locale={locale} />
}

import { Metadata } from 'next'
import DatabaseClientPage from './DatabaseClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const canonicalUrl = `https://gta6hub.com/${locale}/database`
  return {
    title: 'GTA 6 Vehicles & Weapons Database (Leonida Armory & Garage)',
    description:
      'Search and compare confirmed Grand Theft Auto VI vehicles and firearms. Top speeds, handling metrics, ammo types, unlock locations, and real-world analogs.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: 'GTA 6 Vehicles & Weapons Database — Complete Armory & Garage',
      description:
        'Interactive database of all confirmed cars, supercars, boats, aircraft, and tactical firearms in GTA 6. Real-time stats and spawn locations.',
      url: canonicalUrl,
      siteName: 'GTA 6 Hub',
    },
  }
}

export default function DatabasePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <DatabaseClientPage locale={locale} />
}

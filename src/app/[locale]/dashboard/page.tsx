import { Metadata } from 'next'
import DashboardClientPage from './DashboardClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'User Dashboard'
  const description = 'Manage your GTA 6 Hub account, subscription status, auto-renewal preferences, and view your saved favorites and followed creators.'
  const canonicalUrl = `https://gta6hub.com/${locale}/dashboard`

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

export default async function DashboardPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <DashboardClientPage locale={locale} />
}

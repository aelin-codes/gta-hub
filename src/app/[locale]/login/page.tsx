import { Metadata } from 'next'
import LoginClientPage from './LoginClientPage'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const title = 'Log In / Register'
  const description = 'Log in or sign up to your GTA 6 Hub account to save video bookmarks, follow creators, and manage premium features.'
  const canonicalUrl = `https://gta6hub.com/${locale}/login`

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

export default async function LoginPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <LoginClientPage locale={locale} />
}

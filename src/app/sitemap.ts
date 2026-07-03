import { MetadataRoute } from 'next'
import { createAdminClient } from '@/utils/supabase/server'
import { ARTICLES } from '@/data/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://gta6hub.com'
  const locales = ['en']

  const staticRoutes = [
    '',
    '/library',
    '/wiki',
    '/articles',
    '/privacy',
    '/terms',
    '/takedown',
    '/refunds',
  ]

  const entries: MetadataRoute.Sitemap = []

  // Add static routes
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.7,
      })
    }
  }

  // Fetch dynamic videos from database
  try {
    const adminClient = createAdminClient()
    const { data: videos } = await adminClient
      .from('videos')
      .select('id, published_at')
      .eq('excluded', false)

    if (videos) {
      for (const vid of videos) {
        for (const locale of locales) {
          entries.push({
            url: `${base}/${locale}/library/${vid.id}`,
            lastModified: new Date(vid.published_at || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.6,
          })
        }
      }
    }
  } catch (err) {
    console.error('Failed to fetch videos for sitemap:', err)
  }

  // Add dynamic articles
  for (const article of ARTICLES) {
    for (const locale of locales) {
      entries.push({
        url: `${base}/${locale}/articles/${article.slug}`,
        lastModified: new Date(article.published_at),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return entries
}

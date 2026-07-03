import { MetadataRoute } from 'next'

// ponytail: static sitemap — good enough for launch, replace with dynamic DB query when video count grows
export default function sitemap(): MetadataRoute.Sitemap {
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

  return entries
}

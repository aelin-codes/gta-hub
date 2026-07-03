import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createAdminClient } from '@/utils/supabase/server'
import VideoDetailClient from './VideoDetailClient'

interface Timestamp {
  label: string
  seconds: number
}

interface Video {
  id: string
  platform: 'youtube' | 'twitch'
  external_id: string
  title: string
  description: string
  channel_name: string
  channel_url: string
  thumbnail_url: string
  published_at: string
  video_timestamps?: Timestamp[]
}

async function getVideo(id: string): Promise<Video | null> {
  try {
    const adminClient = createAdminClient()
    const { data: video } = await adminClient
      .from('videos')
      .select('*, video_timestamps(*)')
      .eq('id', id)
      .eq('excluded', false)
      .single()

    return video as Video | null
  } catch (err) {
    console.error('Error loading video on server:', err)
    return null
  }
}

export async function generateMetadata({
  params: { locale, id }
}: {
  params: { locale: string; id: string }
}): Promise<Metadata> {
  const video = await getVideo(id)
  if (!video) {
    return {
      title: 'Video Not Found | GTA 6 Hub',
      description: 'The requested GTA 6 walkthrough or guide could not be found.',
    }
  }

  const title = `${video.title} | GTA 6 Guide`
  const description = video.description
    ? video.description.slice(0, 155) + '...'
    : `Watch this GTA 6 walkthrough: ${video.title} by ${video.channel_name}.`

  const canonicalUrl = `https://gta6hub.com/${locale}/library/${id}`
  const ogImage = video.thumbnail_url || `https://img.youtube.com/vi/${video.external_id}/maxresdefault.jpg`

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
      type: 'video.other',
      images: [
        {
          url: ogImage,
          alt: video.title,
        }
      ],
      siteName: 'GTA 6 Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  }
}

export default async function VideoDetailPage({
  params: { locale, id }
}: {
  params: { locale: string; id: string }
}) {
  const video = await getVideo(id)

  if (!video) {
    return (
      <div className="bg-midnight-teal min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-display text-off-white mb-4">Video Not Found</h2>
        <Link
          href={`/${locale}/library`}
          className="flex items-center space-x-2 px-6 py-3 bg-deep-teal text-off-white hover:text-palm-teal rounded-xl border border-deep-teal transition font-bold uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
    )
  }

  // Schema.org VideoObject JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description || `GTA 6 Guide: ${video.title}`,
    thumbnailUrl: [
      video.thumbnail_url || `https://img.youtube.com/vi/${video.external_id}/maxresdefault.jpg`
    ],
    uploadDate: video.published_at,
    embedUrl: video.platform === 'youtube'
      ? `https://www.youtube.com/embed/${video.external_id}`
      : `https://player.twitch.tv/?video=${video.external_id}`,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideoDetailClient video={video} locale={locale} />
    </>
  )
}

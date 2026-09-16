import { NextResponse } from 'next/server'
import { createAdminClient, mockServerClient } from '@/utils/supabase/server'
import { auditVideoWithGemini } from '@/utils/geminiAuditor'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    let supabase: any = createAdminClient()

    // Test connectivity
    const { error: pingError } = await supabase
      .from('categories')
      .select('count', { count: 'exact', head: true })

    if (pingError) {
      supabase = mockServerClient
    }

    const youtubeKey = process.env.YOUTUBE_API_KEY
    let newVideosCount = 0

    // 1. Fetch freshest uploads from YouTube (order=date)
    if (youtubeKey) {
      try {
        const ytQueries = ["GTA 6", "GTA 6 gameplay", "GTA 6 trailer"]
        for (const q of ytQueries) {
          const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(q)}&type=video&order=date&key=${youtubeKey}`
          const ytRes = await fetch(ytUrl)
          if (ytRes.ok) {
            const ytData = await ytRes.json()
            const items = ytData.items || []

            for (const item of items) {
              const videoId = item.id.videoId
              const snippet = item.snippet
              if (!videoId || !snippet) continue

              const audit = await auditVideoWithGemini(snippet.title, snippet.description || '')
              if (!audit.isGta6) continue

              const { data: existing } = await supabase
                .from('videos')
                .select('id')
                .eq('external_id', videoId)
                .maybeSingle()

              if (!existing) {
                const { data: inserted } = await supabase
                  .from('videos')
                  .insert({
                    platform: 'youtube',
                    external_id: videoId,
                    title: snippet.title,
                    description: snippet.description || 'Grand Theft Auto VI Intel Reel',
                    channel_name: snippet.channelTitle || 'GTA Content Creator',
                    channel_url: `https://www.youtube.com/channel/${snippet.channelId}`,
                    thumbnail_url: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                    published_at: snippet.publishedAt || new Date().toISOString(),
                    excluded: false
                  })
                  .select('id')
                  .maybeSingle()

                if (inserted) {
                  newVideosCount++
                  await supabase
                    .from('video_timestamps')
                    .insert({
                      video_id: inserted.id,
                      label: 'Full Intel Reel',
                      seconds: 0
                    })
                }
              }
            }
          }
        }
      } catch (ytErr) {
        console.warn('YouTube live sync warning:', ytErr)
      }
    }

    // 2. Fetch freshest broadcasts & VODs from Twitch
    try {
      const twitchGql = {
        query: `query {
          searchFor(userQuery: "GTA 6", platform: "web") {
            videos {
              items {
                id
                title
                publishedAt
                creator {
                  displayName
                  login
                }
                previewThumbnailURL(width: 640, height: 360)
              }
            }
          }
        }`
      }

      const twitchRes = await fetch('https://gql.twitch.tv/gql', {
        method: 'POST',
        headers: {
          'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(twitchGql)
      })

      if (twitchRes.ok) {
        const twitchJson = await twitchRes.json()
        const items = twitchJson?.data?.searchFor?.videos?.items || []

        for (const item of items) {
          if (!item || !item.id || !item.title) continue

          const audit = await auditVideoWithGemini(item.title, '')
          if (!audit.isGta6) continue

          const { data: existing } = await supabase
            .from('videos')
            .select('id')
            .eq('external_id', item.id)
            .maybeSingle()

          if (!existing) {
            const channelName = item.creator?.displayName || item.creator?.login || 'Twitch Streamer'
            const { data: inserted } = await supabase
              .from('videos')
              .insert({
                platform: 'twitch',
                external_id: item.id,
                title: item.title,
                description: `Live GTA 6 broadcast and gameplay stream by ${channelName} on Twitch.`,
                channel_name: channelName,
                channel_url: `https://twitch.tv/${item.creator?.login || channelName}`,
                thumbnail_url: item.previewThumbnailURL || 'https://static-cdn.jtvnw.net/ttv-boxart/GTA-640x360.jpg',
                published_at: item.publishedAt || new Date().toISOString(),
                excluded: false
              })
              .select('id')
              .maybeSingle()

            if (inserted) {
              newVideosCount++
              await supabase
                .from('video_timestamps')
                .insert({
                  video_id: inserted.id,
                  label: 'Stream Highlights',
                  seconds: 0
                })
            }
          }
        }
      }
    } catch (twitchErr) {
      console.warn('Twitch live sync warning:', twitchErr)
    }

    return NextResponse.json({
      success: true,
      newVideosCount,
      timestamp: new Date().toISOString(),
      message: newVideosCount > 0 ? `Synced ${newVideosCount} new live videos from YouTube and Twitch` : 'Live feeds already up to date'
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

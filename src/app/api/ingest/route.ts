import { NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Config lists
const SEARCH_QUERIES = ["GTA 6 secrets", "GTA 6 gameplay"]
const CREATOR_ALLOWLIST = ["GTA Series Videos", "LegacyKillaHD", "MrBossFTW", "TGG", "Broughy1322"]

// Curated list of mock video data to ingest if API keys are missing/simulated
const MOCK_VIDEOS = [
  {
    videoId: "sub-location-01",
    title: "GTA 6 - Hidden Submarine Easter Egg Location (Leonida Map)",
    description: "Detailed guide to finding the hidden submarine at the bottom of the Leonida Keys. Make sure to bring scuba gear!",
    channel_name: "GTA Series Videos",
    channel_url: "https://youtube.com/c/gtaseriesvideos",
    published_at: new Date(Date.now() - 3 * 3600000).toISOString(),
    transcript: "Hey everyone, today we are showing you how to find the submarine wreck in GTA 6. Head over to the southern portion of the map near the keys...",
    categories: ["Easter Eggs & Secrets", "Map & Exploration"],
    tags: ["submarine", "hidden area", "Leonida Keys", "ocean exploration"],
    summary: "A video guide showing how to find the hidden submarine wreck at the southern Leonida Keys.",
    timestamps: [
      { label: "Submarine Location on Map", seconds: 45 },
      { label: "Entering the Water", seconds: 120 },
      { label: "Wreck Walkthrough & Loot", seconds: 245 }
    ]
  },
  {
    videoId: "mission-guide-02",
    title: "GTA 6 Main Story Walkthrough - Mission #12: Neon Escape",
    description: "Lucia and Jason pull off a high-stakes robbery in Vice City downtown. Full mission walkthrough with gold medal tips.",
    channel_name: "TGG",
    channel_url: "https://youtube.com/c/tgg",
    published_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    transcript: "Welcome back. Today we are doing mission 12, Neon Escape. The main objective is to lose the 4-star cops after robbing the nightclub. Here is the best escape route...",
    categories: ["Missions & Story", "Money & Economy"],
    tags: ["Lucia", "Jason", "heist", "escapes", "robbery"],
    summary: "Gold medal guide for Main Story Mission #12: Neon Escape involving Jason and Lucia.",
    timestamps: [
      { label: "Heist Execution", seconds: 15 },
      { label: "Best Cop Escape Route", seconds: 180 },
      { label: "Gold Medal Requirements", seconds: 320 }
    ]
  },
  {
    videoId: "car-spotlight-03",
    title: "GTA 6 - Confirmed Vehicle Customization & Cheetah Location",
    description: "Finding the Grotti Cheetah in Leonida and showing off the new advanced car tuning mechanics.",
    channel_name: "Broughy1322",
    channel_url: "https://youtube.com/c/broughy",
    published_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    transcript: "Hello! We are looking at the Grotti Cheetah, a returning classic. Customization options are now deeper, with interior customization and engine tuning...",
    categories: ["Vehicles", "Customization & Style"],
    tags: ["Cheetah", "Grotti", "car tuning", "vehicle locations"],
    summary: "Detailed overview of custom vehicle options and Grotti Cheetah showcase in GTA 6.",
    timestamps: [
      { label: "Where to find the Cheetah", seconds: 30 },
      { label: "Customization Garage Overview", seconds: 110 },
      { label: "High-speed Performance Test", seconds: 290 }
    ]
  },
  {
    videoId: "funny-moments-04",
    title: "GTA 6 Streamer Fails & Funny Moments compilation",
    description: "Hilarious clips from streamer gameplay, physics bugs, and hilarious police chases in GTA 6.",
    channel_name: "Funny Moments Gaming",
    channel_url: "https://youtube.com/c/funnymoments",
    published_at: new Date(Date.now() - 48 * 3600000).toISOString(),
    transcript: "Oh my god did you see that car fly! Classic GTA physics. Check out these crazy clips...",
    categories: ["Funny & Highlight Moments", "Glitches & Bugs"],
    tags: ["fails", "streamer reactions", "compilation", "funny clips"],
    summary: "Compilation of funny physics bugs, failures, and streamer reactions.",
    timestamps: [
      { label: "Flying Gator Glitch", seconds: 10 },
      { label: "Stunt Jump Fail", seconds: 95 },
      { label: "Cop Chase Blooper", seconds: 175 }
    ]
  }
]

export async function GET(req: Request) {
  try {
    // 1. Authorization check for Cron header or CRON_SECRET parameter
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')
    
    // We enforce security check for webhook/cron triggers
    if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()
    
    // Keep-alive health check to prevent Supabase auto-pausing
    const { data: pingData, error: pingError } = await supabase
      .from('categories')
      .select('count', { count: 'exact', head: true })
    
    console.log(`Keep-alive ping completed. Categories count active. Error status:`, pingError)

    const youtubeKey = process.env.YOUTUBE_API_KEY
    const geminiKey = process.env.GEMINI_API_KEY
    
    let processedCount = 0
    let skippedCount = 0

    // Mode A: Active Ingestion (if keys exist)
    if (youtubeKey && geminiKey) {
      console.log("Active Ingestion running using YouTube and Gemini APIs...")
      
      const genAI = new GoogleGenerativeAI(geminiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      for (const query of SEARCH_QUERIES) {
        // Fetch from YouTube Data API
        const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${encodeURIComponent(query)}&type=video&key=${youtubeKey}`
        const ytRes = await fetch(ytUrl)
        if (!ytRes.ok) {
          console.error(`YouTube API returned error for query: ${query}`)
          continue
        }
        
        const ytData = await ytRes.json()
        const items = ytData.items || []
        
        for (const item of items) {
          const videoId = item.id.videoId
          const snippet = item.snippet
          
          // Deduplicate check
          const { data: existing } = await supabase
            .from('videos')
            .select('id')
            .eq('external_id', videoId)
            .single()
            
          if (existing) {
            skippedCount++
            continue
          }

          // Use Gemini for classification
          const geminiPrompt = `
You are classifying a GTA 6 video for a fan indexing site.
Analyze this video metadata:
Title: "${snippet.title}"
Description: "${snippet.description}"

Categorize this video. Choose one or more parent categories from:
[Easter Eggs & Secrets, Missions & Story, Map & Exploration, Characters, Vehicles, Weapons & Combat, Money & Economy, Online & Multiplayer, Glitches & Bugs, Speedruns & Challenges, Customization & Style, News & Trailers, Mods & PC, Soundtrack & World, Theories & Comparisons, Funny & Highlight Moments].

IMPORTANT SECURITY RULE: Check if this video showcases, distributes, or promotes online multiplayer cheat menus, hacks, client exploits, or mod cheat tools that violate Rockstar Games multiplayer terms. If it does, set the "excluded" property below to true. Otherwise, set it to false.

Provide tags, a brief one-sentence summary, and detect any potential chapters/timestamps (with labels and seconds offsets) mentioned in the description.

Return ONLY a strict JSON block without markdown formatting or code blocks:
{
  "categories": ["Category 1", "Category 2"],
  "tags": ["tag1", "tag2"],
  "summary": "a short summary",
  "timestamps": [{"label": "Timestamp label", "seconds": 120}],
  "excluded": false
}
`
          let classification = { categories: ["General"], tags: [], summary: snippet.description || "", timestamps: [], excluded: false }
          try {
            const result = await model.generateContent(geminiPrompt)
            const textResponse = result.response.text().trim()
            // Clean markdown indicators if any
            const cleanedText = textResponse.replace(/```json/g, '').replace(/```/g, '').trim()
            classification = JSON.parse(cleanedText)
          } catch (geminiErr) {
            console.error(`Gemini classification failed for ${videoId}:`, geminiErr)
          }

          // Insert video
          const { data: insertedVideo, error: videoInsertErr } = await supabase
            .from('videos')
            .insert({
              platform: 'youtube',
              external_id: videoId,
              title: snippet.title,
              description: snippet.description,
              channel_name: snippet.channelTitle,
              channel_url: `https://youtube.com/channel/${snippet.channelId}`,
              thumbnail_url: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
              published_at: snippet.publishedAt,
              transcript: "",
              excluded: classification.excluded === true
            })
            .select('id')
            .single()

          if (videoInsertErr || !insertedVideo) {
            console.error(`Failed to insert video ${videoId}:`, videoInsertErr)
            continue
          }

          // Link categories
          if (classification.categories) {
            for (const catName of classification.categories) {
              const { data: catRow } = await supabase
                .from('categories')
                .select('id')
                .eq('name', catName)
                .single()
              
              if (catRow) {
                await supabase
                  .from('video_categories')
                  .insert({ video_id: insertedVideo.id, category_id: catRow.id })
              }
            }
          }

          // Insert timestamps
          if (classification.timestamps) {
            for (const ts of classification.timestamps) {
              await supabase
                .from('video_timestamps')
                .insert({
                  video_id: insertedVideo.id,
                  label: ts.label,
                  seconds: ts.seconds
                })
            }
          }
          processedCount++
        }
      }
    } 
    // Mode B: Simulated Ingestion (keys missing)
    else {
      console.log("Simulating Ingestion pipeline with mock GTA 6 video dataset...")
      for (const v of MOCK_VIDEOS) {
        // Deduplicate check
        const { data: existing } = await supabase
          .from('videos')
          .select('id')
          .eq('external_id', v.videoId)
          .single()
          
        if (existing) {
          skippedCount++
          continue
        }

        // Insert video
        const { data: insertedVideo, error: videoInsertErr } = await supabase
          .from('videos')
          .insert({
            platform: 'youtube',
            external_id: v.videoId,
            title: v.title,
            description: v.description,
            channel_name: v.channel_name,
            channel_url: v.channel_url,
            thumbnail_url: `https://img.youtube.com/vi/mock/maxresdefault.jpg`, // Placeholder
            published_at: v.published_at,
            transcript: v.transcript
          })
          .select('id')
          .single()

        if (videoInsertErr || !insertedVideo) {
          console.error(`Failed to insert simulated video ${v.videoId}:`, videoInsertErr)
          continue
        }

        // Link categories
        for (const catName of v.categories) {
          const { data: catRow } = await supabase
            .from('categories')
            .select('id')
            .eq('name', catName)
            .single()
          
          if (catRow) {
            await supabase
              .from('video_categories')
              .insert({ video_id: insertedVideo.id, category_id: catRow.id })
          }
        }

        // Insert timestamps
        for (const ts of v.timestamps) {
          await supabase
            .from('video_timestamps')
            .insert({
              video_id: insertedVideo.id,
              label: ts.label,
              seconds: ts.seconds
            })
        }
        processedCount++
      }
    }

    // Insert admin audit log for the ingestion execution
    await supabase
      .from('admin_audit_logs')
      .insert({
        action: 'ingest_run',
        details: `Ingestion cron job run. Mode: ${youtubeKey ? 'API' : 'SIMULATED'}. Processed: ${processedCount}. Skipped duplicate: ${skippedCount}.`
      })

    return NextResponse.json({
      success: true,
      mode: youtubeKey ? 'API' : 'SIMULATED',
      processed: processedCount,
      skipped: skippedCount,
      keepAlive: pingError ? 'error' : 'success'
    })
  } catch (err: any) {
    console.error('Ingestion cron error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

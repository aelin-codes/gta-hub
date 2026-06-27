import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { unstable_cache } from 'next/cache'

const getCachedVideos = unstable_cache(
  async () => {
    const adminClient = createAdminClient()
    const { data } = await adminClient
      .from('videos')
      .select('*, video_timestamps(*)')
      .eq('excluded', false)
    return data || []
  },
  ['all-videos-list'],
  { revalidate: 60 }
)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''
    const mode = searchParams.get('mode') || 'keyword' // 'keyword' | 'semantic'
    const category = searchParams.get('category') || ''
    const platform = searchParams.get('platform') || ''

    // Single adminClient for all DB reads in this request
    const supabase = createClient()
    const adminClient = createAdminClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isPremium = false
    let userId = null

    if (user) {
      userId = user.id
      // RE-CHECK ENTITLEMENT SERVER-SIDE (Section 12 security hard rule)
      const { data: dbUser } = await adminClient
        .from('users')
        .select('is_premium')
        .eq('id', user.id)
        .single()
      if (dbUser) isPremium = dbUser.is_premium
    }

    // Force keyword mode if user is not premium (security constraint)
    const activeMode = (mode === 'semantic' && isPremium) ? 'semantic' : 'keyword'

    let results: any[] = []

    if (!query.trim()) {
      results = await getCachedVideos()
    } else if (activeMode === 'semantic') {
      const geminiKey = process.env.GEMINI_API_KEY
      if (geminiKey) {
        try {
          const genAI = new GoogleGenerativeAI(geminiKey)
          // Generate query embedding
          // We can use text-embedding-004 model
          const model = genAI.getGenerativeModel({ model: "text-embedding-004" })
          const embedRes = await model.embedContent(query)
          const embedding = embedRes.embedding.values

          // Search using pgvector cosine similarity via rpc (stored procedure)
          // We can use a custom function 'match_videos' if deployed:
          // SELECT * FROM match_videos(query_embedding, match_threshold, match_count)
          const { data: matchedVideos, error: rpcErr } = await adminClient.rpc('match_videos', {
            query_embedding: embedding,
            match_threshold: 0.3,
            match_count: 10
          })

          if (!rpcErr && matchedVideos) {
            results = matchedVideos
          } else {
            console.warn('RPC match_videos failed, falling back to full-text:', rpcErr)
            // Fallback to text search if RPC is missing
            const { data } = await adminClient
              .from('videos')
              .select('*')
              .textSearch('title', query, { config: 'english' })
              .eq('excluded', false)
            results = data || []
          }
        } catch (err) {
          console.error('Semantic search embedding failure:', err)
          // Fallback to standard text search
          const { data } = await adminClient
            .from('videos')
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
            .eq('excluded', false)
          results = data || []
        }
      } else {
        // No Gemini key - simulate semantic search by simple query expansion & database scan
        console.log("Simulating semantic search (no Gemini Key)...")
        const { data } = await adminClient
          .from('videos')
          .select('*')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%,transcript.ilike.%${query}%`)
          .eq('excluded', false)
        results = data || []
      }
    } else {
      // Standard keyword search
      const { data, error } = await adminClient
        .from('videos')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('excluded', false)
      
      if (error) {
        console.error('Keyword search error:', error)
      }
      results = data || []
    }

    // Apply platform filter
    if (platform) {
      results = results.filter((v: any) => v.platform === platform)
    }

    // Apply category filter — match against video_categories join if present, else tags array
    if (category) {
      const { data: catVideos } = await adminClient
        .from('video_categories')
        .select('video_id, categories!inner(name)')
        .eq('categories.name', category)
      const catVideoIds = new Set((catVideos || []).map((r: any) => r.video_id))
      if (catVideoIds.size > 0) {
        results = results.filter((v: any) => catVideoIds.has(v.id))
      } else {
        // Fallback: match category name against tags or title text
        const lc = category.toLowerCase()
        results = results.filter((v: any) =>
          (v.tags && v.tags.some((t: string) => t.toLowerCase().includes(lc))) ||
          v.title?.toLowerCase().includes(lc) ||
          v.description?.toLowerCase().includes(lc)
        )
      }
    }

    return NextResponse.json({
      mode: activeMode,
      requestedMode: mode,
      isPremium,
      videos: results
    })
  } catch (err: any) {
    console.error('Search API failure:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

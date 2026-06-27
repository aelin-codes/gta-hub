import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''
    const mode = searchParams.get('mode') || 'keyword' // 'keyword' | 'semantic'

    if (!query.trim()) {
      return NextResponse.json({ videos: [] })
    }

    // Initialize regular client to identify the current session
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isPremium = false
    let userId = null

    if (user) {
      userId = user.id
      // RE-CHECK ENTITLEMENT SERVER-SIDE on the DB directly (Section 12 security hard rule)
      const adminClient = createAdminClient()
      const { data: dbUser } = await adminClient
        .from('users')
        .select('is_premium')
        .eq('id', user.id)
        .single()
      
      if (dbUser) {
        isPremium = dbUser.is_premium
      }
    }

    // Force keyword mode if user is not premium but requests semantic search (security constraint)
    const activeMode = (mode === 'semantic' && isPremium) ? 'semantic' : 'keyword'

    // We will query using the adminClient to ensure RLS doesn't block reading when querying embeddings
    const adminClient = createAdminClient()

    let results: any[] = []

    if (activeMode === 'semantic') {
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

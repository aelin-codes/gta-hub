import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { unstable_cache } from 'next/cache'
import { PAYMENTS_ENABLED } from '@/config'
import { CURATED_VIDEOS } from '@/data/curatedVideos'

export const dynamic = 'force-dynamic'

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

    if (user) {
      // RE-CHECK ENTITLEMENT SERVER-SIDE (Section 12 security hard rule)
      const { data: dbUser } = await adminClient
        .from('users')
        .select('is_premium')
        .eq('id', user.id)
        .single()
      if (dbUser) isPremium = dbUser.is_premium
    }

    // Force keyword mode if user is not premium (security constraint)
    // Bypass when payments are disabled — everyone gets all features
    // Force keyword mode if user is not premium (security constraint)
    // Bypass when payments are disabled — everyone gets all features
    const activeMode = (!PAYMENTS_ENABLED || (mode === 'semantic' && isPremium)) ? (mode === 'semantic' ? 'semantic' : 'keyword') : 'keyword'

    let results: unknown[] = []
    let categoryVideoIds: string[] | null = null

    // Try Supabase lookup if configured
    try {
      if (category) {
        const { data: catRow } = await adminClient
          .from('categories')
          .select('id')
          .ilike('name', `%${category}%`)
          .limit(1)
          .maybeSingle()

        if (catRow?.id) {
          const { data: junctionRows } = await adminClient
            .from('video_categories')
            .select('video_id')
            .eq('category_id', catRow.id)

          if (junctionRows && junctionRows.length > 0) {
            categoryVideoIds = junctionRows.map((r: { video_id: string }) => r.video_id)
          }
        }
      }

      if (!query) {
        if (categoryVideoIds && categoryVideoIds.length > 0) {
          const { data } = await adminClient
            .from('videos')
            .select('*, video_timestamps(*)')
            .in('id', categoryVideoIds)
            .eq('excluded', false)
          results = data || []
        } else if (!category) {
          results = await getCachedVideos()
        }
      } else if (activeMode === 'semantic') {
        const geminiKey = process.env.GEMINI_API_KEY
        if (geminiKey) {
          try {
            const genAI = new GoogleGenerativeAI(geminiKey)
            const model = genAI.getGenerativeModel({ model: "text-embedding-004" })
            const embedRes = await model.embedContent(query)
            const embedding = embedRes.embedding.values

            const { data: matchedVideos } = await adminClient.rpc('match_videos', {
              query_embedding: embedding,
              match_threshold: 0.3,
              match_count: 10
            })
            if (matchedVideos && matchedVideos.length > 0) {
              results = matchedVideos
            }
          } catch (e) {
            console.warn('Gemini embedding search failed:', e)
          }
        }
      } else {
        let qb = adminClient
          .from('videos')
          .select('*, video_timestamps(*)')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .eq('excluded', false)

        if (categoryVideoIds && categoryVideoIds.length > 0) {
          qb = qb.in('id', categoryVideoIds)
        }

        const { data } = await qb
        results = data || []
      }
    } catch (dbErr) {
      console.warn('Supabase search query error, falling back to curated library:', dbErr)
    }

    // --- Curated Fallback with AI Semantic Schematic Engine ---
    if (!results || (Array.isArray(results) && results.length === 0)) {
      let list = [...CURATED_VIDEOS]

      // Category matching across primary, secondary, and conceptual aliases
      if (category) {
        const cLower = category.toLowerCase().trim()
        list = list.filter((v) => {
          if (v.category.toLowerCase() === cLower) return true
          if (v.secondary_categories?.some((sc) => sc.toLowerCase() === cLower)) return true
          if (cLower.includes('trailer') && v.category.toLowerCase().includes('trailer')) return true
          if (cLower.includes('map') && (v.category.toLowerCase().includes('map') || v.secondary_categories?.some((sc) => sc.toLowerCase().includes('map')))) return true
          if (cLower.includes('easter') && (v.category.toLowerCase().includes('easter') || v.secondary_categories?.some((sc) => sc.toLowerCase().includes('easter')))) return true
          if (cLower.includes('character') && (v.category.toLowerCase().includes('character') || v.secondary_categories?.some((sc) => sc.toLowerCase().includes('character')))) return true
          if (cLower.includes('mission') && (v.category.toLowerCase().includes('mission') || v.secondary_categories?.some((sc) => sc.toLowerCase().includes('mission')))) return true
          if (cLower.includes('theor') && (v.category.toLowerCase().includes('theor') || v.secondary_categories?.some((sc) => sc.toLowerCase().includes('theor')))) return true
          if (cLower.includes('vehicle') && (v.secondary_categories?.some((sc) => sc.toLowerCase().includes('vehicle')) || v.schematic_concepts?.some((sc) => /car|vehicle|boat|drift|speed/i.test(sc)))) return true
          if (cLower.includes('weapon') && (v.secondary_categories?.some((sc) => sc.toLowerCase().includes('weapon')) || v.schematic_concepts?.some((sc) => /weapon|gun|holster/i.test(sc)))) return true
          if (cLower.includes('mod') && (v.secondary_categories?.some((sc) => sc.toLowerCase().includes('mod')) || v.title.toLowerCase().includes('graphics') || v.title.toLowerCase().includes('physics'))) return true
          if (cLower.includes('soundtrack') && (v.secondary_categories?.some((sc) => sc.toLowerCase().includes('soundtrack')) || v.title.toLowerCase().includes('nightclub'))) return true
          if (cLower.includes('online') && (v.secondary_categories?.some((sc) => sc.toLowerCase().includes('online')) || v.title.toLowerCase().includes('multiplayer') || v.description.toLowerCase().includes('safehouse'))) return true
          if (cLower.includes('money') && (v.secondary_categories?.some((sc) => sc.toLowerCase().includes('money')) || v.schematic_concepts?.some((sc) => /robbery|pawn|heist|loot/i.test(sc)))) return true
          return false
        })
      }

      if (!query) {
        results = list
      } else {
        const qLower = query.toLowerCase().trim()
        const qTerms = qLower.split(/\s+/).filter(Boolean)
        const isSemantic = activeMode === 'semantic'

        const scored = list.map((v) => {
          let score = 0
          const matchedConcepts: string[] = []

          // Title & Description keyword matches
          if (v.title.toLowerCase().includes(qLower)) score += 45
          if (v.description.toLowerCase().includes(qLower)) score += 25
          if (v.category.toLowerCase().includes(qLower)) score += 20

          // Term-by-term scoring
          for (const t of qTerms) {
            if (v.title.toLowerCase().includes(t)) score += 15
            if (v.description.toLowerCase().includes(t)) score += 8
          }

          // Schematic concepts match
          if (v.schematic_concepts) {
            for (const concept of v.schematic_concepts) {
              const cLower = concept.toLowerCase()
              if (qTerms.some((t) => cLower.includes(t)) || cLower.includes(qLower)) {
                score += 30
                matchedConcepts.push(concept)
              }
            }
          }

          // Timestamps match
          if (v.video_timestamps) {
            for (const ts of v.video_timestamps) {
              const lLower = ts.label.toLowerCase()
              if (qTerms.some((t) => lLower.includes(t)) || lLower.includes(qLower)) {
                score += 15
                if (!matchedConcepts.includes(ts.label)) {
                  matchedConcepts.push(ts.label)
                }
              }
            }
          }

          // GTA 6 Domain Schematics
          const domainSchematics: Record<string, string[]> = {
            alligator: ['Everglades', 'Sawgrass', 'Wildlife', 'Swamp'],
            gator: ['Everglades', 'Sawgrass', 'Wildlife', 'Swamp'],
            swamp: ['Everglades', 'Sawgrass', 'Mud', 'Poacher'],
            heist: ['Robbery', 'Store', 'Locker', 'Vault', 'Jason & Lucia'],
            robbery: ['Convenience Store', 'Heist', 'Safehouse'],
            police: ['VCPD', 'Pursuit', 'PIT Maneuver', 'Spike Strips'],
            cop: ['VCPD', 'Pursuit', 'Tactical', 'Patrol'],
            chase: ['Pursuit', 'Speedboat', 'Highway', 'PIT Maneuver'],
            car: ['Supercar', 'Cheetah', 'Infernus', 'Banshee', 'Speedboat'],
            drift: ['Banshee', 'Supercar', 'Racing'],
            graphics: ['RAGE 9', 'Ray-Traced', 'Reflections', 'Lighting', 'Water'],
            physics: ['RAGE 9', 'Deformation', 'Water Displacement', 'Cloth'],
            map: ['Leonida', 'Vice City', 'Port Gellhorn', 'Keys', 'Scale'],
            lucia: ['Parole', 'Prison', 'Corrections', 'Bonnie-and-Clyde'],
            jason: ['Protagonist', 'Heist', 'Duo', 'Getaway'],
            keys: ['Seven Mile Bridge', 'Overseas Highway', 'Lighthouse'],
            port: ['Port Gellhorn', 'Industrial Docks', 'Smuggler']
          }

          for (const [key, related] of Object.entries(domainSchematics)) {
            if (qLower.includes(key)) {
              for (const rel of related) {
                const rLower = rel.toLowerCase()
                if (
                  v.title.toLowerCase().includes(rLower) ||
                  v.description.toLowerCase().includes(rLower) ||
                  v.schematic_concepts?.some((c) => c.toLowerCase().includes(rLower))
                ) {
                  score += 25
                  if (!matchedConcepts.includes(rel)) matchedConcepts.push(rel)
                }
              }
            }
          }

          const clampedScore = Math.min(99, Math.max(isSemantic && score > 0 ? 55 : score, 0))
          return {
            ...v,
            schematicMatch: {
              score: clampedScore,
              matchedConcepts: matchedConcepts.slice(0, 4),
              insight:
                matchedConcepts.length > 0
                  ? `AI Schematic: ${matchedConcepts.slice(0, 2).join(' & ')}`
                  : 'Semantic relevance match'
            }
          }
        })

        if (isSemantic) {
          results = scored
            .filter((v) => v.schematicMatch.score > 0)
            .sort((a, b) => b.schematicMatch.score - a.schematicMatch.score)
          if (results.length === 0) results = scored.slice(0, 4)
        } else {
          results = scored.filter(
            (v) =>
              v.title.toLowerCase().includes(qLower) ||
              v.description.toLowerCase().includes(qLower) ||
              v.schematicMatch.score >= 20
          )
        }
      }
    }

    if (platform) {
      results = results.filter((v: unknown) => (v as { platform: string }).platform === platform)
    }

    return NextResponse.json({
      mode: activeMode,
      requestedMode: mode,
      isPremium,
      category: category || null,
      query: query || null,
      count: results.length,
      videos: results
    })
  } catch (err) {
    console.error('Search API failure:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

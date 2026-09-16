import { GoogleGenerativeAI } from '@google/generative-ai'
import { createAdminClient } from '@/utils/supabase/server'

// Obvious non-GTA 6 phrases to reject immediately without wasting API calls
const OBVIOUS_NON_GTA6_PATTERNS = [
  /\bgta online\b/i,
  /\bgta 5\b/i,
  /\bgta v\b/i,
  /\bfivem\b/i,
  /\bsan andreas\b/i,
  /\bgta iv\b/i,
  /\bgta 4\b/i,
  /\bgta iii\b/i,
  /\bgta 3\b/i,
  /\bminecraft\b/i,
  /\bfortnite\b/i,
  /\bmadden\b/i,
  /\broblox\b/i,
  /\bfree gta 6 disc/i,
  /\bspiderman jump/i,
  /\bwater ragdolls/i,
  /\ball gta 100%/i,
  /\bcompleting every gta\b/i
]

export function isObviousNonGta6(title: string, description: string = ''): boolean {
  const text = `${title} ${description}`
  return OBVIOUS_NON_GTA6_PATTERNS.some(regex => regex.test(text))
}

export async function auditVideoWithGemini(
  title: string,
  description: string = ''
): Promise<{ isGta6: boolean; reason: string }> {
  // Fast pre-filter
  if (isObviousNonGta6(title, description)) {
    return {
      isGta6: false,
      reason: 'Matched known non-GTA 6 or clickbait pattern (GTA Online, GTA 5, San Andreas, etc.)'
    }
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    // If no API key configured, pass videos that cleared heuristic
    return { isGta6: true, reason: 'Passed heuristic pre-filter (Gemini key not set)' }
  }

  const models = ['gemini-3.6-flash', 'gemini-2.5-flash']
  const prompt = `You are a strict content auditor for an official Grand Theft Auto VI (GTA 6 / GTA VI) website.
Determine whether this video is TRULY and EXCLUSIVELY about GTA 6 (Grand Theft Auto VI, Leonida, Vice City, Lucia & Jason, official trailers, verified leaks, analyses, next-gen physics).

Mark is_gta6 = FALSE if the video is:
- GTA 5 / GTA V gameplay, stunts, or fails
- GTA Online guides (heists, making millions, Cayo Perico, businesses)
- GTA San Andreas, GTA IV, GTA III, or older GTA games
- FiveM roleplay
- Clickbait playing another game or showing fake unreleased gameplay
- Other games entirely

Mark is_gta6 = TRUE if genuinely focused on GTA 6.

Return ONLY a JSON object: {"is_gta6": boolean, "reason": "brief explanation"}

Video Title: "${title.replace(/"/g, "'")}"
Description: "${description.substring(0, 150).replace(/"/g, "'")}"`

  for (const modelName of models) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: 'application/json' }
      })
      const result = await model.generateContent(prompt)
      const parsed = JSON.parse(result.response.text())
      return {
        isGta6: parsed.is_gta6 === true,
        reason: parsed.reason || 'Gemini classification'
      }
    } catch {
      // Try next model if transient error
      continue
    }
  }

  // Safe fallback if API transiently unavailable: trust heuristic
  return {
    isGta6: true,
    reason: 'Cleared heuristic pre-filter (Gemini transiently unavailable)'
  }
}

/**
 * Gatekeeper: checks a video and auto-excludes it in Supabase if not GTA 6.
 * Returns true if valid GTA 6 video, false if rejected.
 */
export async function verifyAndGateVideo(video: {
  id?: string
  title: string
  description?: string
}): Promise<boolean> {
  const audit = await auditVideoWithGemini(video.title, video.description || '')
  if (!audit.isGta6 && video.id) {
    try {
      const supabase = createAdminClient()
      await supabase
        .from('videos')
        .update({ excluded: true })
        .eq('id', video.id)
    } catch (err) {
      console.warn('Failed to flag excluded video in Supabase:', err)
    }
  }
  return audit.isGta6
}

# SYSTEM PROMPT: Complete Fix Master Plan for GTA 6 Hub

Copy and paste the entire prompt below into GPT 5.5 / AI Assistant to automatically fix all bugs in the codebase.

---

```markdown
# TASK: Fix All 6 Audited Bugs in GTA 6 Hub Codebase

You are an expert Next.js 14 (App Router), TypeScript, and Supabase developer.
Please execute the following precise fixes across the specified files in the `gta6-hub` repository. Follow the exact instructions and code changes below.

---

### FIX 1: Fix 404 Video Not Found on Detail Page for Mock IDs
**Target File:** `src/app/[locale]/library/[id]/page.tsx`
**Problem:** `getVideo(id)` queries live Supabase via `createAdminClient()`. When using mock video IDs (such as `sub-uuid-1`, `mission-guide-02`, etc.), live Supabase returns null, displaying a "Video Not Found" screen.
**Action:** Update `getVideo(id)` in `src/app/[locale]/library/[id]/page.tsx` to fallback to `MOCK_VIDEOS` when live Supabase query yields null.

```typescript
// Add import at the top:
import { MOCK_VIDEOS } from '@/utils/supabase/mock'

// Replace getVideo function with:
async function getVideo(id: string): Promise<Video | null> {
  try {
    const adminClient = createAdminClient()
    const { data: video } = await adminClient
      .from('videos')
      .select('*, video_timestamps(*)')
      .eq('id', id)
      .eq('excluded', false)
      .single()

    if (video) return video as Video
  } catch (err) {
    console.error('Error loading video on server:', err)
  }

  // Fallback to mock videos array for demo/mock IDs
  const mockMatch = MOCK_VIDEOS.find(
    (v) => v.id === id || v.external_id === id
  )
  if (mockMatch) {
    return mockMatch as unknown as Video
  }

  return null
}
```

---

### FIX 2: Fix Gemini API Multimodal `fileUri` Error in Ingestion Pipeline
**Target File:** `src/app/api/ingest/route.ts`
**Problem:** Line 156 passes `{ fileData: { mimeType: 'video/*', fileUri: 'https://www.youtube.com/watch?v=...' } }` to Gemini API. Gemini API does NOT accept external YouTube web URLs in `fileUri`, throwing a runtime error and breaking multimodal classification.
**Action:** Replace the direct `fileData` call with text-based analysis passing video title and description to `model.generateContent()`.

```typescript
// Replace lines 155-174 in src/app/api/ingest/route.ts with:
let classification: { categories: string[], tags: string[], summary: string, timestamps: {label: string, seconds: number}[], excluded: boolean } = { categories: ['General'], tags: [], summary: snippet.description || '', timestamps: [], excluded: false }
try {
  const result = await model.generateContent(
    `${classifyPrompt}\n\nVideo Title: "${snippet.title}"\nDescription: "${snippet.description}"`
  )
  const cleaned = result.response.text().trim().replace(/```json|```/g, '').trim()
  classification = JSON.parse(cleaned)
} catch (geminiErr) {
  console.warn(`Gemini video analysis failed for ${videoId}:`, geminiErr)
}
```

---

### FIX 3: Fix Admin Panel Ingestion 401 Unauthorized Error
**Target Files:** `.env.local` and `src/app/[locale]/admin/AdminClientPage.tsx`
**Problem:** `AdminClientPage.tsx` attempts to read `process.env.NEXT_PUBLIC_CRON_SECRET`. In `.env.local`, only `CRON_SECRET` is defined, so `process.env.NEXT_PUBLIC_CRON_SECRET` evaluates to `undefined`, passing `secret=secret` and causing `/api/ingest` to reject with 401.
**Action 1:** In `.env.local`, add `NEXT_PUBLIC_CRON_SECRET`:
```env
NEXT_PUBLIC_CRON_SECRET=gtavihub_cron_2026_secrets
```

**Action 2:** In `src/app/[locale]/admin/AdminClientPage.tsx`, update line 160:
```typescript
const triggerIngestJob = async () => {
  setIngesting(true)
  setIngestStatus('Connecting to ingestion pipeline...')
  try {
    const cronSecret = process.env.NEXT_PUBLIC_CRON_SECRET || 'gtavihub_cron_2026_secrets'
    const res = await fetch(`/api/ingest?secret=${cronSecret}`)
    const data = await res.json()
...
```

---

### FIX 4: Fix Duplicate Brand Names in HTML Title Metadata
**Target Files:** Metadata definitions across child pages:
- `src/app/[locale]/library/page.tsx`
- `src/app/[locale]/wiki/page.tsx`
- `src/app/[locale]/articles/page.tsx`
- `src/app/[locale]/pricing/page.tsx`
- `src/app/[locale]/login/page.tsx`
- `src/app/[locale]/dashboard/page.tsx`
- `src/app/[locale]/admin/page.tsx`

**Problem:** `layout.tsx` specifies `template: '%s | GTA 6 Hub'`. Child pages pass titles like `'Video Library | GTA 6 Hub'`, producing duplicated `<title>` tags like `Video Library | GTA 6 Hub | GTA 6 Hub`.
**Action:** Remove `| GTA 6 Hub` from child page metadata titles:
- In `src/app/[locale]/library/page.tsx`: Change `title: 'Video Library | GTA 6 Hub'` → `title: 'Video Library'`
- In `src/app/[locale]/wiki/page.tsx`: Change `title: 'Wiki & Interactive Database | GTA 6 Hub'` → `title: 'Wiki & Interactive Database'`
- In `src/app/[locale]/articles/page.tsx`: Change `title: 'News & Articles | GTA 6 Hub'` → `title: 'News & Articles'`
- In `src/app/[locale]/pricing/page.tsx`: Change `title: 'Pricing Plans | GTA 6 Hub'` → `title: 'Pricing Plans'`
- In `src/app/[locale]/login/page.tsx`: Change `title: 'Log In / Register | GTA 6 Hub'` → `title: 'Log In / Register'`
- In `src/app/[locale]/dashboard/page.tsx`: Change `title: 'User Dashboard | GTA 6 Hub'` → `title: 'User Dashboard'`
- In `src/app/[locale]/admin/page.tsx`: Change `title: 'Admin Command Center | GTA 6 Hub'` → `title: 'Admin Command Center'`

---

### FIX 5: Enhance `MockQueryBuilder` Filtering & Mock Client LocalStorage Sync
**Target Files:** `src/utils/supabase/mock.ts` and `src/utils/supabase/client.ts`
**Problem:** In mock/offline mode, `MockQueryBuilder.eq()` doesn't filter records, and mock `favorites` / `follows` do not persist to `localStorage`.
**Action 1:** In `src/utils/supabase/mock.ts`, update `MockQueryBuilder` to support basic `.eq()` filtering:

```typescript
export class MockQueryBuilder {
  private filters: Array<{ col: string; val: unknown }> = []

  constructor(private tableName: string) {}

  select(c?: string) { void c; return this }
  eq(c: string, v: unknown) {
    this.filters.push({ col: c, val: v })
    return this
  }
  neq(c: string, v: unknown) { void c; void v; return this }
  or(v: string) { void v; return this }
  order(c: string, o?: unknown) { void c; void o; return this }
  limit(n: number) { void n; return this }
  textSearch(c: string, q: string, o?: unknown) { void c; void q; void o; return this }

  async single() {
    const data = this.getFilteredData()
    return { data: Array.isArray(data) ? (data[0] || null) : data, error: null }
  }

  async insert(payload: unknown) {
    return { data: Array.isArray(payload) ? payload[0] : payload, error: null }
  }

  async update(payload: unknown) { return { data: payload, error: null } }
  async upsert(payload: unknown, onConflict?: unknown) { void onConflict; return { data: payload, error: null } }
  async delete() { return { error: null } }

  async then(resolve: (v: { data: unknown; error: null }) => void) {
    resolve({ data: this.getFilteredData(), error: null })
  }

  private getFilteredData(): unknown {
    let data: unknown[] = []
    if (this.tableName === 'videos') data = MOCK_VIDEOS
    else if (this.tableName === 'categories') data = MOCK_CATEGORIES
    else if (this.tableName === 'users') return MOCK_ADMIN_USER
    else return []

    if (this.filters.length > 0 && Array.isArray(data)) {
      return data.filter((item: Record<string, unknown>) =>
        this.filters.every((f) => item[f.col] === f.val)
      )
    }
    return data
  }
}
```

**Action 2:** In `src/utils/supabase/client.ts`, add `favorites` and `follows` persistence in `mockClient.from()`:

```typescript
if (tableName === 'favorites' || tableName === 'follows') {
  const original = builder as MockQueryBuilder & Record<string, unknown>
  original.then = async (resolve: (v: { data: unknown; error: null }) => void) => {
    const stored = JSON.parse(localStorage.getItem(`gta_${tableName}`) || '[]')
    resolve({ data: stored, error: null })
  }
}
```

---

### Verification:
After making these changes, run:
1. `npx tsc --noEmit` to verify 0 type errors.
2. `npm run lint` to verify 0 lint errors.
3. `npm run dev` and test navigating to `/library/sub-uuid-1` to confirm video detail page renders correctly without 404.
```

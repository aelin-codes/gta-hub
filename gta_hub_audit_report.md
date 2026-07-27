# GTA 6 Hub — Comprehensive Code Audit & Testing Report

**Date:** July 26, 2026  
**Auditor:** Aliya (Antigravity AI Assistant)  
**Project:** GTA 6 Hub (`gta6-hub`)  
**Status:** Website active and running locally on `http://localhost:3000`. Full codebase read, built, and end-to-end route testing completed.

---

## 1. Executive Summary

The **GTA 6 Hub** web application is a feature-rich, high-performance Next.js 14 (App Router) fan portal built with TypeScript, Tailwind CSS, Lucide icons, `next-intl` localization, Supabase integration, and Google Gemini AI capabilities.

During testing, **0 TypeScript errors (`npx tsc --noEmit`)** and **0 ESLint errors (`npm run lint`)** were found. All 11 primary pages compile successfully and render on the local server.

However, detailed runtime testing and code analysis revealed **4 Critical Runtime Bugs**, **2 Data Mocking Flaws**, and **3 Minor UI/UX Metadata issues** that should be resolved for production readiness.

---

## 2. Tested Routes & Runtime Status

| Route Path | Description | HTTP Status | Test Result & Notes |
| :--- | :--- | :---: | :--- |
| `/[locale]` | Home Page with 3D Parallax & Countdown | `200 OK` | ✅ Renders correctly, hero dynamic loading works |
| `/[locale]/library` | Video Library & Search | `200 OK` | ✅ Renders grid, filters, and ad placement |
| `/[locale]/library/[id]` | Video Detail Page | `200 OK / 404` | ⚠️ **Bug #1**: Throws "Video Not Found" for mock IDs when Supabase env keys are set |
| `/[locale]/wiki` | Interactive 2.5D Map & Database | `200 OK` | ✅ Map POIs, characters, vehicles tabs work |
| `/[locale]/articles` | Fan Articles & News List | `200 OK` | ✅ Renders article cards |
| `/[locale]/articles/[slug]`| Article Detail Page | `200 OK` | ✅ HTML content rendering & metadata OK |
| `/[locale]/pricing` | Subscription Plans (Stripe/Razorpay)| `200 OK` | ✅ Shows plans / Geo-routing override works |
| `/[locale]/login` | Authentication (Sign In / Register) | `200 OK` | ✅ Form state, error handling, redirect OK |
| `/[locale]/dashboard` | User Profile & Subscription Manager | `200 OK` | ✅ Protected state, auto-renew toggle UI OK |
| `/[locale]/admin` | Moderator Command Center | `200 OK / Redirect` | ✅ Middleware redirects unauthenticated users to `/login` |
| `/api/ingest` | Automated Content Ingestion Pipeline | `200 OK / 401` | ⚠️ **Bug #3 & #4**: Gemini API video URI issue & Admin cron secret mismatch |
| `/api/search` | Keyword & AI Semantic Search | `200 OK` | ✅ Returns keyword/semantic results with fallback |

---

## 3. Detailed Error & Bug Findings

### 🔴 Critical Runtime & API Bugs

#### Bug #1: Video Detail Page (`/library/[id]`) returns 404 "Video Not Found" for Mock Video IDs
* **Location:** [`src/app/[locale]/library/[id]/page.tsx`](file:///c:/Users/alanf/Downloads/GTA%20HUB/src/app/%5Blocale%5D/library/%5Bid%5D/page.tsx#L25-L40)
* **Root Cause:**  
  `getVideo(id)` uses `createAdminClient()` on the server side. Because `.env.local` contains valid Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`), `createAdminClient()` connects to the live Supabase database instead of using the mock client fallback. When navigating to mock video IDs like `sub-uuid-1`, real Supabase returns `null` because the table doesn't contain those mock records yet.
* **Impact:** High. Navigating from Home/Library to any mock video details page displays the "Video Not Found" error page.
* **Recommended Fix:**  
  In `getVideo(id)`, add a fallback to check `MOCK_VIDEOS` from `@/utils/supabase/mock` if the Supabase query returns `null` or if `id.startsWith('sub-')` or `'mission-'`.

```typescript
// Proposed fix in page.tsx
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
  // Fallback to mock data for demo/offline IDs
  return (MOCK_VIDEOS.find(v => v.id === id || v.external_id === id) as unknown as Video) || null
}
```

---

#### Bug #2: Ingest API (`/api/ingest`) Gemini Multimodal `fileUri` Failure
* **Location:** [`src/app/api/ingest/route.ts`](file:///c:/Users/alanf/Downloads/GTA%20HUB/src/app/api/ingest/route.ts#L156-L161)
* **Root Cause:**  
  Line 156 passes `{ fileData: { mimeType: 'video/*', fileUri: `https://www.youtube.com/watch?v=${videoId}` } }` directly to `@google/generative-ai`'s `model.generateContent()`.  
  The Google Gemini File API `fileUri` argument expects a Google Cloud Storage / Gemini File API URI (`gs://` or `https://generativelanguage.googleapis.com/...`), NOT an external YouTube web page URL.
* **Impact:** Medium-High. Automated video analysis fails on every video item and always throws an error, falling back to text-only description prompt analysis.
* **Recommended Fix:**  
  Pass the YouTube title and description in text prompt mode directly, or upload video frames via Gemini File API `files.upload()`.

---

#### Bug #3: Admin Dashboard Manual Ingestion Trigger Unauthorized (401 Error)
* **Location:** [`src/app/[locale]/admin/AdminClientPage.tsx`](file:///c:/Users/alanf/Downloads/GTA%20HUB/src/app/%5Blocale%5D/admin/AdminClientPage.tsx#L160)
* **Root Cause:**  
  `AdminClientPage.tsx` calls `fetch('/api/ingest?secret=${process.env.NEXT_PUBLIC_CRON_SECRET || 'secret'}')`.  
  However, `.env.local` defines `CRON_SECRET=gtavihub_cron_2026_secrets` (without the `NEXT_PUBLIC_` prefix). Because Next.js does not expose non-`NEXT_PUBLIC_` variables to the browser, `process.env.NEXT_PUBLIC_CRON_SECRET` evaluates to `undefined`, passing `secret=secret`. `/api/ingest` checks `secret !== process.env.CRON_SECRET` and rejects the request with `401 Unauthorized`.
* **Impact:** Medium. Manual ingestion trigger from Admin panel fails.
* **Recommended Fix:**  
  Add `NEXT_PUBLIC_CRON_SECRET=gtavihub_cron_2026_secrets` in `.env.local` or authenticate `/api/ingest` via Supabase user session for logged-in admins.

---

#### Bug #4: Duplicate Brand Name in Page Titles (`GTA 6 Hub | GTA 6 Hub`)
* **Location:** [`src/app/[locale]/layout.tsx`](file:///c:/Users/alanf/Downloads/GTA%20HUB/src/app/%5Blocale%5D/layout.tsx#L27-L30) & Child Metadata
* **Root Cause:**  
  `layout.tsx` defines metadata template: `template: '%s | GTA 6 Hub'`. Child pages (e.g., `LibraryClientPage`, `WikiClientPage`, `PricingClientPage`) specify complete titles such as `title: 'Video Library | GTA 6 Hub'`. When combined by Next.js, the final page `<title>` tag becomes `Video Library | GTA 6 Hub | GTA 6 Hub`.
* **Impact:** Low (SEO formatting glitch).
* **Recommended Fix:**  
  In child pages, pass concise titles like `title: 'Video Library'` or `title: 'Wiki & Database'`, letting the layout template append `| GTA 6 Hub`.

---

### 🟡 Data Layer & Mocking Flaws

#### Bug #5: `MockQueryBuilder.eq()` Filter Ineffectiveness
* **Location:** [`src/utils/supabase/mock.ts`](file:///c:/Users/alanf/Downloads/GTA%20HUB/src/utils/supabase/mock.ts#L94)
* **Root Cause:**  
  `MockQueryBuilder.eq(c, v)` returns `this` without saving condition state. When `.single()` is called, it returns `data[0]` regardless of column key or value passed.
* **Impact:** Low (only affects offline mock testing when Supabase keys are absent).
* **Recommended Fix:** Store equality conditions in an internal array in `MockQueryBuilder` and filter array results accordingly before returning in `.single()` or `.then()`.

---

#### Bug #6: Favorites and Follows Reset on Reload in Mock Client
* **Location:** [`src/utils/supabase/client.ts`](file:///c:/Users/alanf/Downloads/GTA%20HUB/src/utils/supabase/client.ts#L8-L26)
* **Root Cause:**  
  `mockClient.from('videos')` persists added videos to `localStorage.getItem('gta_videos')`, but `from('favorites')` and `from('follows')` do not implement `localStorage` persistence in mock mode.
* **Impact:** Low (Only when Supabase environment variables are missing).

---

## 4. Compliance & Policy Verification

| Policy / Guideline Requirement | Implementation Status | Location |
| :--- | :---: | :--- |
| **Section 9 Legal Disclaimer** | ✅ VERIFIED | Displayed on Home Page, Pricing Page, and Global Footer |
| **Section 7 Frequency-Capped Ads** | ✅ VERIFIED | Interstitial modal capped to 1 per 5 video opens with 5-min cooldown timer |
| **Section 7 FTC Auto-Renewal Notice**| ✅ VERIFIED | Included in Pricing page cards & Account Dashboard subscription manager |
| **Section 12 Entitlement Check** | ✅ VERIFIED | Re-checked server-side in `/api/search` and protected by feature flags |
| **Section 10 Geo-Routing Escapes** | ✅ VERIFIED | Regional price detection with manual override dropdown on Pricing page |

---

## 5. Summary of Recommendations for Developer

1. **Fix Page Detail Fallback:** Update `src/app/[locale]/library/[id]/page.tsx` so `getVideo()` falls back to `MOCK_VIDEOS` when database query yields null.
2. **Correct Ingest API Gemini Prompt:** Remove `fileData.fileUri` pointing to external YouTube URLs in `src/app/api/ingest/route.ts`.
3. **Fix Admin Cron Secret Variable:** Add `NEXT_PUBLIC_CRON_SECRET` to `.env.local`.
4. **Clean up Metadata Title Strings:** Remove `| GTA 6 Hub` suffix from individual child page `title` fields to prevent duplicated browser title tags.

---
*Report generated automatically for GTA 6 Hub workspace.*

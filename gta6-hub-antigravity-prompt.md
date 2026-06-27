# Build Prompt — Paste into Antigravity (Gemini 3.5 Flash)

You are an expert full-stack engineer and frontend designer. Build a complete, production-ready website called **"GTA 6 Hub"** — a fan site that organizes everything about GTA 6, with a video library that auto-collects content from YouTube/Twitch and sorts it by topic (easter eggs, missions, map exploration, etc.) so players can find what they need without scrolling through hundreds of videos.

This is an unofficial fan project — not affiliated with Rockstar Games or Take-Two. Add a clear disclaimer in the footer of every page.

This should look like a **premium, designed product** — not a templated AI-generated layout. No generic "cream background + serif hero" or "black background + one neon accent" defaults. Read the Design Direction section below carefully and follow it.

## 1. Tech Stack
- Frontend: Next.js 14 (App Router) + TypeScript + TailwindCSS
- Motion/3D: React Three Fiber + drei (3D scenes), GSAP + ScrollTrigger (scroll-driven animation), Framer Motion (UI transitions), Lenis (smooth scroll)
- Backend: Next.js API routes + a scheduled job runner (cron via Vercel Cron or a Node worker)
- Database: PostgreSQL (Supabase) — use Supabase for auth too
- Video data: YouTube Data API v3 (official, free quota) + Twitch Helix API for Twitch VODs/clips
- Categorization engine: Gemini API (text model) used server-side to classify each video
- Search: Postgres full-text search (free tier) + pgvector embeddings (Gemini embeddings) for the premium "smart search"
- Payments: Razorpay Subscriptions (handles Indian customers + most international cards) + Stripe Billing as a secondary rail for regions Razorpay settles poorly (see Section 10)
- Ads: Google AdSense / Google Ad Manager, using the interstitial pattern in Section 7
- i18n: next-intl for language/locale routing; a forex-rate API for displaying localized price estimates
- Security: Supabase Row-Level Security (RLS) on every table, Supabase Auth with MFA (TOTP) enforced for admin roles, Upstash/Vercel Edge rate limiting on auth and webhook routes, Sentry for error/security-event logging
- Hosting: Vercel (global edge network — gives low latency worldwide without extra config)

**On "free" database hosting:** Supabase's free tier (as of 2026) gives a real Postgres instance with 500MB database storage, 1GB file storage, 5GB bandwidth/month, and 50,000 monthly active users — genuinely enough to run this site at MVP/early-growth scale at $0. Two things to design around from day one:
- **Auto-pause:** free Supabase projects pause automatically after 7 days with no API traffic. The scheduled ingestion job from Section 4 already runs every few hours, which conveniently keeps the project active as a side effect — but add an explicit lightweight health-check ping in that same cron job as a deliberate keep-alive, not an accidental one.
- **No automated backups on free tier.** Add a simple scheduled `pg_dump` (via GitHub Actions, since GitHub is free for public/small private repos) that exports the database to a free storage location (e.g. a private GitHub repo or Supabase Storage itself) on a daily basis, so a mistake doesn't mean losing all user accounts/favorites with no way back.

When real subscriber/account numbers grow past free-tier comfort (a few thousand active users, or 500MB of data), moving to Supabase's Pro plan (~$25/month) is the natural next step — budget for that as a future cost, not a day-one one.

## 2. Design Direction (read before building any UI)

Ground every visual choice in the actual subject: GTA 6's setting (Leonida / Vice City-style sun-belt aesthetic — neon signage, palm trees, dusk-to-night skylines, retro-future typography). Do not default to generic SaaS-landing-page styling.

**Token system:**
- Color palette (use exactly these as the base, derive tints/shades from them):
  - `#0B1E23` — Midnight Teal (primary background)
  - `#0F2E33` — Deep Teal (secondary surface)
  - `#FF3D81` — Neon Flamingo (primary accent, used sparingly — CTAs, active states)
  - `#FF7A45` — Sunset Orange (secondary accent — highlights, hover states)
  - `#1FA9A0` — Palm Teal (tertiary accent — tags, category chips)
  - `#F1F5F4` — Off-White (primary text on dark surfaces)
- Typography: a bold, condensed display face with retro-signage character (e.g. Anton, Bebas Neue, or similar) for headlines and section titles, used with restraint and generous letter-spacing — paired with a clean, highly-legible body sans (e.g. Inter or General Sans) for everything else. A monospace/utility face for timestamps, video metadata, and counters.
- Layout signature: the homepage hero is a **3D parallax skyline** of a fictional Leonida-style city silhouette that scroll-transitions from day → dusk → night as the user scrolls past the first viewport, with neon signage elements that flicker on as it darkens. This is the one bold, memorable moment of the page — keep everything else (typography, spacing, card design) disciplined and quiet around it.
- Video cards get a subtle **3D tilt-on-hover** (perspective transform following cursor position), reinforcing the "collectible card" feel of hunting easter eggs — but this is a small, restrained micro-interaction, not a second signature moment.

**Copy:** write from the player's point of view — name things by what they're trying to do ("Find a hidden vehicle," not "Browse Easter Egg Database"). Plain, active verbs. Buttons say exactly what happens when clicked. Respect `prefers-reduced-motion` everywhere — disable parallax/3D-tilt and fall back to simple fades for users who request it, and on low-power mobile devices for performance.

## 3. CRITICAL — How video content must be handled
**Never download, store, or re-host any creator's video file.** Doing so violates YouTube/Twitch Terms of Service and copyright law, and will get the site DMCA'd or banned from the API.

Instead, the ingestion pipeline only fetches and stores **metadata**:
- `videoId` / Twitch VOD ID
- Title, description, channel name, channel ID, thumbnail URL, publish date
- Available captions/transcript (via YouTube's caption track, when public)
- Chapter timestamps if present in the description

Videos are always displayed via the **official embed players**:
- YouTube: `<iframe src="https://www.youtube.com/embed/{videoId}?start={timestamp}">`
- Twitch: official Twitch embed player

This keeps the creator's view count, ad revenue, and channel link intact, and keeps the site fully compliant. Every video card must show the creator's name/channel and link out to the original video/channel.

## 4. Ingestion Pipeline (scheduled job, runs every few hours)
1. Maintain a config table of:
   - Search queries (e.g. "GTA 6 easter eggs", "GTA 6 map", "GTA 6 walkthrough")
   - A curated allow-list of streamer/creator channel IDs to pull from
2. Call YouTube `search.list` and `playlistItems.list` for new uploads matching the queries/channels (respect daily quota — cache aggressively, don't re-fetch unchanged data).
3. For each new video, fetch description + caption track if available.
4. Send the title + description + transcript snippet to the Gemini API with a classification prompt, asking it to return strict JSON:
   ```json
   {
     "categories": ["Easter Eggs", "Map Exploration"],
     "tags": ["submarine", "hidden weapon", "Vice City"],
     "summary": "one-sentence summary",
     "timestamps": [{"label": "Hidden submarine location", "seconds": 412}]
   }
   ```
5. Store the video + classification in the `videos` table. Deduplicate by videoId.
6. If a creator requests removal, mark the row `excluded = true` (build a simple `/takedown-request` contact form for this).

## 5. Category Taxonomy
Group into parent categories with sub-tags, so the filter sidebar can be collapsible:

- **Easter Eggs & Secrets** — Hidden Locations, Unmarked Buildings, Cryptic Clues/ARG Tie-ins, References to Past GTA Games
- **Missions & Story** — Main Story Walkthroughs, Side Missions, Mission Tips & Strategies, Story Theories & Lore
- **Map & Exploration** — Region Guides, Points of Interest, Hidden Areas, Map Comparisons (vs. real-world/past games)
- **Characters** — Character Profiles, Voice Cast & Performance, Relationships/Story Arcs
- **Vehicles** — Car Spotlights, Customization Guides, Vehicle Locations, Planes/Boats/Bikes
- **Weapons & Combat** — Weapon Showcases, Combat Tips, Loadout Guides
- **Money & Economy** — Money-Making Guides, Property/Business Investments, Economy Breakdown
- **Online & Multiplayer** — Heists, Co-op Missions, PvP/Competitive, Online Customization, Online Events
- **Glitches & Bugs** — Sequence Breaks, Visual Glitches, Patch Notes Impact
- **Speedruns & Challenges** — Speedrun Routes, Self-Imposed Challenges, 100% Completion Guides
- **Customization & Style** — Character Customization, Property Decoration, Outfits/Fashion
- **News & Trailers** — Official Trailers, Release Updates, Rockstar Announcements
- **Mods & PC** — Mod Showcases (PC-only, clearly labeled, no cheating/online-exploit content), Performance/Settings Guides
- **Soundtrack & World** — Radio Stations, Soundtrack Breakdown, Ambient World Details
- **Theories & Comparisons** — Fan Theories, Comparisons to GTA 5/Vice City, Dev Interview Breakdowns
- **Funny & Highlight Moments** — Streamer Reactions, Funny Clips, Best Moments Compilations

This is a many-to-many relation — one video can carry multiple category and sub-tag labels.

## 6. Pages
- **Home** — 3D parallax skyline hero, release news, countdown timer, trailer embed, trending videos
- **Video Library** (core feature) — grid of video cards with 3D tilt-on-hover, filter sidebar (category/sub-tag, platform, date, creator), sort by relevance/newest/most-discussed. Each card shows thumbnail, title, creator, category chips, a heart/favorite toggle, and "Jump to [Easter Egg name]" buttons that deep-link the embed to that timestamp. Creator names and category chips are themselves clickable to follow that creator or category.
- **Wiki/Database** — map, characters, vehicles, confirmed features (editable content, not video-based); the map page can use a lightweight interactive 3D/2.5D map model as its own signature moment
- **Search** — free tier: keyword search. Premium tier: natural-language semantic search ("how do I get the hidden plane in the swamp") via embeddings.
- **Pricing** — explains free vs Premium
- **Account/Dashboard** — manage subscription: shows next billing date, plan price, and an auto-renew on/off toggle (see Section 7); also shows the user's **Favorites** (saved videos) and **Following** (followed creators/categories) tabs, each just listing the joined rows from the `favorites`/`follows` tables with an "unfollow"/"unfavorite" action
- **Takedown Request** — simple form for creators who want their content excluded

## 7. Monetization — Interstitial Ads with Frequency Capping (free tier only)

Instead of static ad banners sitting next to content, ads appear as a brief interstitial **between video opens**, on a capped schedule so it doesn't feel punishing:

- Track `videoOpensThisSession` in client state.
- Pattern: show an interstitial **before the 1st video open**, then **skip ads for the next 2 video opens**, then repeat the cycle (i.e. `(videoOpensThisSession % 3 === 1)` triggers the interstitial).
- The interstitial must have an obvious, easy-to-tap "Skip"/"Continue" control (auto-enable after ~5 seconds) — never trap the user.
- Premium users (`isPremium === true`) never see this; their click goes straight to the embed every time.
- **Compliance note:** build this using Google's own sanctioned formats — **AdSense Auto ads "Vignette" interstitials** or a **Google Ad Manager interstitial ad unit** — rather than a fully custom popup. Google explicitly designed these formats for "between navigation" moments like this one, and using them keeps the site within AdSense policy (custom-built popups that imitate this behavior risk being flagged as deceptive/disruptive ads and can get an AdSense account suspended).

- **Premium tier — ₹1,000/month, recurring subscription with auto-renewal on by default**:
  - No ads anywhere, including no interstitials
  - Semantic/natural-language search instead of plain keyword match
  - (Optional nice-to-have) saved easter-egg checklists, "mark as found" tracking

- **Subscription flow (Razorpay Subscriptions API, not one-off Checkout):**
  1. Create a Razorpay Plan (₹1,000, monthly interval) once at setup time.
  2. When a user subscribes, create a Razorpay Subscription tied to that plan and the user's ID, and redirect to Razorpay's hosted checkout for the first authorization.
  3. Listen for these webhook events and update the `subscriptions` table accordingly:
     - `subscription.activated` → set `status = 'active'`, `is_premium = true`, store `current_period_end`
     - `subscription.charged` (fires every renewal) → extend `current_period_end`, log the payment
     - `payment.failed` → keep premium active through a short grace period (e.g. 3 days) and notify the user by email to update their payment method before downgrading
     - `subscription.cancelled` / `subscription.completed` → set `status = 'cancelled'`, downgrade `is_premium = false` only once `current_period_end` has actually passed (so a cancelled-but-still-paid-for month still gets premium access)
  4. **Auto-renewal control:** on the Account/Dashboard page, show the next billing date and an explicit toggle: "Auto-renew is ON — cancel anytime" / "Auto-renew is OFF — Premium ends on {date}". Toggling it off calls Razorpay's "cancel at cycle end" endpoint (keeps current period active, just stops the next charge) rather than cancelling immediately. Toggling it back on re-subscribes for the next cycle.
  5. Middleware checks `users.is_premium` to skip the interstitial logic and unlock semantic search — same as before, just now driven by subscription status instead of a one-time flag.

## 8. Database Schema (Postgres)
```sql
videos (
  id uuid primary key,
  platform text, -- 'youtube' | 'twitch'
  external_id text unique,
  title text,
  description text,
  channel_name text,
  channel_url text,
  thumbnail_url text,
  published_at timestamptz,
  transcript text,
  excluded boolean default false,
  created_at timestamptz default now()
);

categories (
  id uuid primary key,
  name text unique,
  parent_id uuid references categories(id) -- null for top-level categories
);

video_categories (
  video_id uuid references videos(id),
  category_id uuid references categories(id)
);

video_timestamps (
  id uuid primary key,
  video_id uuid references videos(id),
  label text,
  seconds int
);

users (
  id uuid primary key, -- from Supabase auth
  email text,
  role text default 'user', -- 'user' | 'admin' | 'superuser'
  is_premium boolean default false,
  razorpay_customer_id text,
  stripe_customer_id text
);

subscriptions (
  id uuid primary key,
  user_id uuid references users(id),
  razorpay_subscription_id text unique,
  status text, -- 'active' | 'cancelled' | 'past_due' | 'completed'
  auto_renew boolean default true,
  current_period_end timestamptz,
  last_charged_at timestamptz,
  created_at timestamptz default now()
);

favorites (
  user_id uuid references users(id),
  video_id uuid references videos(id),
  created_at timestamptz default now(),
  primary key (user_id, video_id)
);

follows (
  user_id uuid references users(id),
  target_type text, -- 'creator' | 'category'
  target_id text, -- channel_id for creators, category id for categories
  created_at timestamptz default now(),
  primary key (user_id, target_type, target_id)
);

takedown_requests (
  id uuid primary key,
  video_id uuid,
  requester_email text,
  reason text,
  status text default 'pending',
  created_at timestamptz default now()
);
```

## 9. Non-functional requirements
- Fully responsive, mobile-first; 3D/parallax effects must degrade gracefully to simple fades on mobile/low-power devices and when `prefers-reduced-motion` is set
- SEO: server-rendered video library pages, structured data (VideoObject schema.org) for each video card so search engines can index it properly
- Cache YouTube/Twitch API responses aggressively (these APIs have daily quotas) — use ISR or a Redis/Supabase cache layer, refresh on the scheduled job, not on every page load
- Lazy-load video embeds (don't auto-play iframes on the listing page; load the player on click to save bandwidth and avoid unnecessary API hits)
- Visible keyboard focus states throughout, even with the 3D/motion-heavy design
- Footer disclaimer: "GTA 6 Hub is an unofficial fan site and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. All trademarks belong to their respective owners. All videos remain the property of their original creators and are embedded via official platform players."

## 10. Global Accessibility

The site should work for subscribers anywhere, not just India:

- **Payments:** Razorpay Subscriptions does accept most international cards, but as an India-registered aggregator, settlement and certain compliance flows (e.g. RBI e-mandate rules) are built around Indian regulations. Before launch, verify with Razorpay/your payment compliance advisor whether their international acceptance covers your expected customer geographies. If a meaningful share of subscribers will be outside India, build a **second billing path with Stripe Billing** for non-Indian customers (Stripe handles global tax — VAT/GST — and currency localization natively) and route new signups to Razorpay or Stripe based on detected billing country. Both write into the same `subscriptions` table shape so the rest of the app (premium gating, the dashboard) doesn't need to know which processor was used.
- **Pricing display:** show ₹1,000/month as the base price, but display a converted estimate in the visitor's local currency (using a forex API, refreshed daily) purely for clarity — the actual charge amount and currency is whatever the selected payment processor settles in.
- **i18n:** route-based locale support (`/en`, `/es`, etc. — start with English only, but structure the app so adding a locale is just adding translation files, not restructuring routes).
- **Performance:** Vercel's edge network already serves static/cached pages close to the user globally; make sure the video metadata API routes are cached/ISR'd rather than hitting the database on every request, so latency stays low for users far from your primary database region.

## 11. Admin / Superuser Role & Access

- Add a `role` column to `users`: `'user' | 'admin' | 'superuser'`. Superuser is for the site owner only — capable of managing admins; regular `admin` accounts can moderate content/users but can't grant other admins.
- **Admin dashboard** (separate route, e.g. `/admin`, gated by role check on every request server-side — never just hidden in the UI):
  - Review/action takedown requests
  - View and search all users + their subscription status (read-only on payment details — never display full card numbers; Razorpay/Stripe only ever give you tokenized references anyway)
  - Manually flag/remove videos or override their category tags
  - View ingestion job run history and errors
  - Manage the category taxonomy and the channel/search-query allow-list
  - Audit log of every admin action (who did what, when) — this matters both for security and so you can see if an admin account is misbehaving
- **Bootstrapping your own superuser account:** don't hardcode an admin email/password anywhere in the codebase or commit it to git. Instead, build a one-time seed script that reads the superuser email and a temporary password from environment variables (set only in your local `.env`, never committed) and creates the account with `role = 'superuser'` and MFA enrollment required on first login. Delete/rotate that temporary password immediately after your first successful login + MFA setup.

## 12. Security Hardening — Preventing Payment/Premium Bypass

The most common ways sites like this actually get exploited are not exotic — they're "the frontend hides the ad-free button but the backend never checks," or "the webhook endpoint trusts whatever it's sent." Build against those specifically:

- **Never trust the client for entitlement.** Every route or API call that grants a premium feature (no-ads flag, semantic search) must re-check `is_premium`/subscription status **server-side**, on every request, by querying the database — not by reading a flag from a cookie, JWT claim that isn't re-validated, or client-side state. A user editing their own browser's local state must not be able to grant themselves premium.
- **Lock down who can write to billing fields.** In Supabase, set Row-Level Security so that `users.is_premium`, `subscriptions.*`, and `role` can **only** be written by your backend's service-role key — never by the authenticated user's own client-side session, even though they can read their own row. This stops a user from issuing a direct API call to Supabase to set their own `is_premium = true`. For the lower-stakes `favorites`/`follows` tables, RLS can be looser — a user may freely insert/delete their own rows (`user_id = auth.uid()`), since favoriting a video has no security implication, but should still never be able to write rows under someone else's `user_id`.
- **Verify every webhook signature.** Razorpay and Stripe both sign webhook payloads with an HMAC secret — verify that signature on every incoming webhook request using their official SDK helper before trusting any event. Reject anything that doesn't verify, log the attempt, and alert on repeated failures (a flood of invalid signatures is someone probing your webhook endpoint).
- **Don't trust IDs inside the payload blindly.** When a webhook says "subscription X is now active," look up subscription X in your own database and confirm it matches a subscription you actually created for a real user, rather than creating/upgrading a user record purely from data in the webhook body.
- **Make webhook handling idempotent.** Processors can and do resend the same event; design the handler so processing the same event twice doesn't double-grant anything or duplicate billing records.
- **Rate-limit and protect auth + webhook routes** at the edge (Upstash/Vercel rate limiting) to blunt brute-force and endpoint-probing attempts.
- **Admin-specific:** require MFA for every `admin`/`superuser` account (no exceptions), use short-lived sessions for admin routes, and log every admin action with who/what/when.
- **Standard platform hardening:** enforce HTTPS everywhere (default on Vercel), HTTP-only + `Secure` + `SameSite` cookies for session tokens, a Content-Security-Policy header, and CSRF protection on any state-changing form submission.

## 13. Deployment — Make It Actually Live (Cloud-Hosted, Not Local)

This is not optional scaffolding — actually provision and deploy the cloud infrastructure so the site is reachable from any device, at any time, without my computer needing to be on or running anything.

**Hard rule:** nothing about this app may depend on the local machine for storage or uptime. No SQLite files, no local JSON storage, no "works on my machine" state. Every piece of persisted data (users, videos, favorites, follows, subscriptions) lives in the cloud-hosted Supabase Postgres instance from Section 8, accessed only over the network — the app's state must be identical whether it's opened from my laptop, my phone, or someone else's computer on the other side of the world.

Walk through these steps yourself rather than just writing instructions for me to run later:

1. **Source control:** initialize a git repo and push it to a new GitHub repository (create one if needed) — this is the source of truth the rest of deployment builds from, not my local folder.
2. **Cloud database:** create a real Supabase project (the actual cloud project, not a local `supabase start` instance) and run the schema migrations from Section 8 against it. This will require me to authenticate once via browser when prompted (Supabase login is interactive) — walk me through that step rather than getting stuck on it.
3. **Cloud hosting:** deploy the Next.js app to Vercel, either via the Vercel CLI or by connecting the GitHub repo directly in the Vercel dashboard. Prefer connecting the GitHub repo — that gives automatic redeploys on every future push, so updates ship without anyone running a deploy command from a local machine ever again.
4. **Secrets live in the cloud too:** set every API key (Supabase URL/keys, Razorpay keys + Plan ID, Stripe keys, Gemini API key, YouTube Data API key, Twitch credentials, AdSense/Ad Manager IDs) as encrypted Environment Variables in the Vercel project settings — never only in a local `.env` file, and never committed to the repo.
5. **Scheduled jobs run in the cloud:** the ingestion pipeline from Section 4 runs as a Vercel Cron Job (or equivalent hosted scheduler) hitting an API route — not a script someone has to remember to run locally.
6. **Domain:** the site is reachable at the free `*.vercel.app` URL by default; if I want a custom domain, walk me through pointing its DNS at Vercel (also cloud-side configuration, not local).
7. **Verify it's actually live, not just deployed:** after deployment, confirm the live URL responds, confirm a request through it successfully reads/writes the cloud Supabase database (e.g. hit a health-check route), and report back the final live URL and the GitHub repo URL.

## 14. Deliverables
Do everything above end-to-end: write the full Next.js project with the pages, 3D hero, and tilt-card components; the Supabase schema as a migration file (including the `role` column and RLS policies from Section 12) applied to a real cloud project; the admin dashboard at `/admin` with audit logging; the superuser bootstrap seed script (reads credentials from env vars, never hardcoded); the ingestion/classification job running as a hosted cron job; the Razorpay Subscriptions integration (plan creation, signature-verified webhook handlers, grace-period/dunning logic, and the auto-renew toggle UI) with the Stripe Billing fallback path for international customers; and the AdSense Vignette/Ad Manager interstitial integration with the frequency-capping logic. Then actually carry out Section 13's deployment steps and hand back a live URL — don't stop at "here's the code, you deploy it."

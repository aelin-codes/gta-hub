// One-shot recategorization script for existing videos
// Assigns video_categories rows based on title keyword matching
// Run: node supabase/recategorize.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Title-based category hints for the 5 ingested videos
// Map: partial external_id or title substring → category names (must match categories table exactly)
const VIDEO_CATEGORY_HINTS = [
  { titleContains: 'Easter Egg', categories: ['Easter Eggs & Secrets'] },
  { titleContains: 'Secrets', categories: ['Easter Eggs & Secrets'] },
  { titleContains: 'Vice City', categories: ['Easter Eggs & Secrets', 'Map & Exploration'] },
  { titleContains: 'Gameplay', categories: ['News & Trailers'] },
  { titleContains: 'Mission', categories: ['Missions & Story'] },
  { titleContains: 'Story', categories: ['Missions & Story'] },
  { titleContains: 'NPC AI', categories: ['News & Trailers'] },
  { titleContains: 'Trailer', categories: ['News & Trailers'] },
];

async function main() {
  console.log('Fetching all videos...');
  const { data: videos, error: vErr } = await supabase.from('videos').select('id, title, external_id');
  if (vErr) { console.error('Failed to fetch videos:', vErr); process.exit(1); }
  console.log(`Found ${videos.length} videos`);

  console.log('Fetching all categories...');
  const { data: categories, error: cErr } = await supabase.from('categories').select('id, name').is('parent_id', null);
  if (cErr) { console.error('Failed to fetch categories:', cErr); process.exit(1); }
  console.log(`Found ${categories.length} parent categories`);

  const catMap = Object.fromEntries(categories.map(c => [c.name, c.id]));

  for (const video of videos) {
    console.log(`\nProcessing: "${video.title}"`);
    const matchedCats = new Set();

    for (const hint of VIDEO_CATEGORY_HINTS) {
      if (video.title.includes(hint.titleContains)) {
        for (const catName of hint.categories) {
          if (catMap[catName]) matchedCats.add(catName);
        }
      }
    }

    if (matchedCats.size === 0) {
      console.log('  No category match — defaulting to News & Trailers');
      matchedCats.add('News & Trailers');
    }

    for (const catName of matchedCats) {
      const catId = catMap[catName];
      // Upsert to avoid duplicates
      const { error } = await supabase
        .from('video_categories')
        .upsert({ video_id: video.id, category_id: catId }, { onConflict: 'video_id,category_id' });
      if (error) {
        console.error(`  Failed to link "${catName}":`, error.message);
      } else {
        console.log(`  ✓ Linked to "${catName}"`);
      }
    }
  }

  console.log('\nRecategorization complete!');
}

main().catch(err => { console.error(err); process.exit(1); });

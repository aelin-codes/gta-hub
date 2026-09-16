const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !serviceKey || !geminiKey) {
  console.error('Missing configuration in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);
const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-3.6-flash',
  generationConfig: { responseMimeType: 'application/json' }
});

async function run() {
  console.log('Fetching active videos from Supabase...');
  const { data: videos, error } = await supabase
    .from('videos')
    .select('id, title, description')
    .eq('excluded', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
    process.exit(1);
  }

  console.log(`Found ${videos.length} active videos to classify.`);
  const counts = {};
  const BATCH_SIZE = 10;

  for (let i = 0; i < videos.length; i += BATCH_SIZE) {
    const batch = videos.slice(i, i + BATCH_SIZE);
    const promptData = batch.map(v => ({
      id: v.id,
      title: v.title,
      description: (v.description || '').slice(0, 100)
    }));

    const prompt = `Classify the primary language of each video from its title and description.
Return a JSON array of objects: [{"id": "...", "language": "2-letter ISO code like en, es, pt, ru, fr, de, it, ja, ko, zh, hi, ar"}]

Videos:
${JSON.stringify(promptData, null, 2)}`;

    let classifications = [];
    try {
      const res = await model.generateContent(prompt);
      classifications = JSON.parse(res.response.text().trim());
    } catch (e) {
      console.warn(`Batch ${i / BATCH_SIZE + 1} Gemini note:`, e.message);
      classifications = batch.map(v => ({ id: v.id, language: 'en' }));
    }

    for (const item of classifications) {
      const lang = typeof item.language === 'string' && item.language.length === 2 ? item.language.toLowerCase() : 'en';
      counts[lang] = (counts[lang] || 0) + 1;

      await supabase
        .from('videos')
        .update({ language: lang })
        .eq('id', item.id);
    }

    const processed = Math.min(i + BATCH_SIZE, videos.length);
    console.log(`Classified ${processed}/${videos.length} videos...`);
  }

  console.log('\n=======================================');
  console.log('       LANGUAGE BACKFILL COMPLETE');
  console.log('=======================================');
  console.log('Breakdown by language:');
  console.table(counts);
}

run();

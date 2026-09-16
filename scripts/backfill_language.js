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

async function detectLanguage(title, description) {
  const prompt = `You are a language detection engine. Determine the primary language of this video based on its title and description.
Return ONLY valid JSON: {"language": "2-letter ISO 639-1 code like en, es, pt, ru, fr, de, it, ja, ko, zh, hi, ar"}

Video Title: "${(title || '').replace(/"/g, "'")}"
Description: "${(description || '').substring(0, 150).replace(/"/g, "'")}"`;

  try {
    const result = await model.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());
    if (typeof parsed.language === 'string' && parsed.language.length === 2) {
      return parsed.language.toLowerCase();
    }
  } catch (err) {
    console.warn('Language detection note for:', title, err.message);
  }
  return 'en';
}

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

  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    const lang = await detectLanguage(v.title, v.description);
    counts[lang] = (counts[lang] || 0) + 1;

    const { error: updateErr } = await supabase
      .from('videos')
      .update({ language: lang })
      .eq('id', v.id);

    if (updateErr) {
      console.error(`Failed to update video ${v.id}:`, updateErr.message);
    } else {
      console.log(`[${i + 1}/${videos.length}] (${lang.toUpperCase()}) "${(v.title || '').slice(0, 60)}..."`);
    }
  }

  console.log('\n--- Backfill Summary ---');
  console.log('Language Breakdown:', counts);
  console.log('Done!');
}

run();

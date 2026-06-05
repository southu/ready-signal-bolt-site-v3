import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const XAI_API_KEY = Deno.env.get('XAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Grok TTS voices: ara, eve, leo, rex, sal. Map legacy OpenAI voice names so
// previously-stored audio_voice values (and any stale UI selection) still resolve.
const GROK_VOICES = new Set(['ara', 'eve', 'leo', 'rex', 'sal']);
const OPENAI_TO_GROK_VOICE: Record<string, string> = {
  nova: 'eve',
  shimmer: 'ara',
  alloy: 'sal',
  echo: 'leo',
  onyx: 'rex',
  fable: 'leo',
};
function resolveGrokVoice(voice: string): string {
  if (GROK_VOICES.has(voice)) return voice;
  return OPENAI_TO_GROK_VOICE[voice] || 'eve';
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const AUDIO_SCRIPT_SYSTEM_PROMPT = `You are a podcast script writer for Ready Signal, a data analytics and forecasting platform. Transform blog articles into natural, conversational audio scripts optimized for text-to-speech narration.

Rules:
- Start with: "Welcome to Ready Signal. Today we're exploring [brief topic description]."
- Replace any tables with a brief verbal summary of the key highlights and takeaways — do NOT read tables row by row.
- Convert bullet point lists into flowing, natural prose.
- Remove or verbalize any URLs — say the source name instead of reading a URL.
- Remove citation brackets, footnote markers, and source reference numbers.
- Keep all the substance and key insights, but make it sound natural when spoken aloud.
- Use short sentences. Avoid parenthetical asides.
- End with: "Thanks for listening. Visit readysignal.com to learn more about how external data can improve your forecasts."
- Output plain text only. No markdown, no HTML, no formatting.
- Keep the script concise — aim for roughly 60-70% of the original article length.`;

// ============ TEXT PROCESSING ============

function stripHtmlToText(html: string): string {
  let text = html;
  // Remove script and style blocks
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Convert block elements to newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<\/h[1-6]>/gi, '\n\n');
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<li[^>]*>/gi, '- ');
  text = text.replace(/<\/tr>/gi, '\n');
  text = text.replace(/<\/div>/gi, '\n');
  // Strip all remaining tags
  text = text.replace(/<[^>]+>/g, '');
  // Decode common HTML entities
  text = text.replace(/&nbsp;/gi, ' ');
  text = text.replace(/&amp;/gi, '&');
  text = text.replace(/&lt;/gi, '<');
  text = text.replace(/&gt;/gi, '>');
  text = text.replace(/&quot;/gi, '"');
  text = text.replace(/&#39;/gi, "'");
  text = text.replace(/&rsquo;/gi, "'");
  text = text.replace(/&lsquo;/gi, "'");
  text = text.replace(/&rdquo;/gi, '"');
  text = text.replace(/&ldquo;/gi, '"');
  text = text.replace(/&mdash;/gi, ' — ');
  text = text.replace(/&ndash;/gi, ' – ');
  text = text.replace(/&hellip;/gi, '...');
  // Clean up whitespace
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.replace(/[ \t]+/g, ' ');
  return text.trim();
}

function chunkText(text: string, maxChunkSize = 3800): string[] {
  if (text.length <= maxChunkSize) {
    return [text];
  }

  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length + 2 <= maxChunkSize) {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    } else if (paragraph.length > maxChunkSize) {
      // Paragraph itself is too long — split on sentences
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = '';
      }
      const sentences = paragraph.match(/[^.!?]+[.!?]+\s*/g) || [paragraph];
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length <= maxChunkSize) {
          currentChunk += sentence;
        } else {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = sentence;
        }
      }
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = paragraph;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks.filter(c => c.length > 0);
}

function concatUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

// ============ API CALLS ============

async function createAudioScript(title: string, plainText: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: AUDIO_SCRIPT_SYSTEM_PROMPT },
        { role: 'user', content: `Article title: "${title}"\n\nArticle content:\n${plainText}` }
      ],
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI script generation error:', response.status, errorText);
    throw new Error(`Failed to create audio script: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No audio script returned from AI');
  }

  return content.trim();
}

async function generateTTSChunk(text: string, voice: string): Promise<Uint8Array> {
  // Grok TTS (xAI). The endpoint takes text/voice_id/language (no model field) and
  // returns raw MP3 bytes — not JSON — which we read directly into a byte buffer.
  const response = await fetch('https://api.x.ai/v1/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      voice_id: voice,
      language: 'en',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Grok TTS error:', response.status, errorText);
    throw new Error(`Grok TTS API error: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

// ============ MAIN HANDLER ============

Deno.serve(async (req: Request) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    const { article_id, voice = 'nova' } = await req.json();

    if (!article_id) {
      return new Response(
        JSON.stringify({ error: 'Missing article_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    if (!XAI_API_KEY) {
      throw new Error('XAI_API_KEY not configured');
    }
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase environment variables not configured');
    }

    // Map incoming voice (may be a legacy OpenAI name) to a valid Grok TTS voice
    const grokVoice = resolveGrokVoice(voice);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });

    // Set status to generating
    await supabase
      .from('blog_articles')
      .update({ audio_status: 'generating', audio_voice: grokVoice })
      .eq('id', article_id);

    // Fetch article
    const { data: article, error: fetchError } = await supabase
      .from('blog_articles')
      .select('title, content, slug')
      .eq('id', article_id)
      .single();

    if (fetchError || !article) {
      throw new Error(`Article not found: ${fetchError?.message || 'no data'}`);
    }

    console.log(`Generating audio for "${article.title}" with Grok voice "${grokVoice}" (requested "${voice}")`);

    // Step 1: Strip HTML to plain text
    const plainText = stripHtmlToText(article.content);
    console.log(`Stripped text length: ${plainText.length} chars`);

    // Step 2: Create listenable audio script via GPT
    console.log('Creating audio script...');
    const audioScript = await createAudioScript(article.title, plainText);
    console.log(`Audio script length: ${audioScript.length} chars`);

    // Step 3: Chunk the script for TTS
    const chunks = chunkText(audioScript);
    console.log(`Split into ${chunks.length} chunks`);

    // Step 4: Generate TTS for each chunk
    const audioBuffers: Uint8Array[] = [];
    for (let i = 0; i < chunks.length; i++) {
      console.log(`Generating TTS chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
      const buffer = await generateTTSChunk(chunks[i], grokVoice);
      audioBuffers.push(buffer);
    }

    // Step 5: Concatenate MP3 buffers
    const fullAudio = concatUint8Arrays(audioBuffers);
    console.log(`Total audio size: ${fullAudio.length} bytes`);

    // Step 6: Upload to Supabase Storage
    const timestamp = Date.now();
    const filename = `${article.slug}-${timestamp}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from('audio')
      .upload(filename, fullAudio, {
        contentType: 'audio/mpeg',
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', JSON.stringify(uploadError));
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('audio')
      .getPublicUrl(filename);

    const audioUrl = publicUrlData.publicUrl;
    console.log('Audio uploaded:', audioUrl);

    // Step 7: Estimate duration (Grok TTS returns 128kbps MP3)
    const durationSeconds = Math.round((fullAudio.length * 8) / (128 * 1000));

    // Step 8: Update article with audio info
    const { error: updateError } = await supabase
      .from('blog_articles')
      .update({
        audio_url: audioUrl,
        audio_voice: grokVoice,
        audio_status: 'completed',
        audio_duration_seconds: durationSeconds,
      })
      .eq('id', article_id);

    if (updateError) {
      console.error('Article update error:', JSON.stringify(updateError));
      throw new Error(`Failed to update article: ${updateError.message}`);
    }

    console.log(`Audio generation complete. Duration: ~${durationSeconds}s`);

    return new Response(
      JSON.stringify({
        success: true,
        audio_url: audioUrl,
        duration_seconds: durationSeconds,
        voice: grokVoice,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Audio generation error:', err);

    // Try to set failed status
    try {
      const { article_id } = await req.clone().json();
      if (article_id && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: { persistSession: false }
        });
        await supabase
          .from('blog_articles')
          .update({ audio_status: 'failed' })
          .eq('id', article_id);
      }
    } catch (_) {
      // Best effort
    }

    return new Response(
      JSON.stringify({ error: err.message || 'Audio generation failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

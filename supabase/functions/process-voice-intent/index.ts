import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { audio_base64, placement_id } = await req.json()

    if (!audio_base64 || !placement_id) {
      return new Response(
        JSON.stringify({ error: 'Missing audio_base64 or placement_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // --- Step 1: Send audio to Gemini for transcription + intent extraction ---
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'You are a retail intent analyzer. The user has spoken a need at a retail shelf. Transcribe the audio and extract their product intent as a short, clear phrase. Return a JSON object with two fields: "transcript" (verbatim words) and "processed_intent" (the core need, e.g. "looking for lactose-free whole milk").',
                },
                {
                  inline_data: {
                    mime_type: 'audio/webm',
                    data: audio_base64,
                  },
                },
              ],
            },
          ],
          generationConfig: { response_mime_type: 'application/json' },
        }),
      }
    )

    const geminiData = await geminiRes.json()
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
    let parsed: { transcript?: string; processed_intent?: string } = {}
    try {
      parsed = JSON.parse(rawText)
    } catch {
      parsed = { transcript: rawText, processed_intent: rawText }
    }

    const transcript = parsed.transcript || ''
    const processedIntent = parsed.processed_intent || ''

    // --- Step 2: Save to Supabase ---
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data, error } = await supabase
      .from('intent_logs')
      .insert([
        {
          placement_id,
          raw_transcript: transcript,
          processed_intent: processedIntent,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, transcript, processed_intent: processedIntent, id: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

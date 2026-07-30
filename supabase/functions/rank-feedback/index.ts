// Supabase Edge Function: RANKページの意見を一方向でメール送信する
// デプロイ: supabase functions deploy rank-feedback
// 必要なSecrets: RESEND_API_KEY, FEEDBACK_TO_EMAIL, ALLOWED_ORIGIN

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FEEDBACK_TO_EMAIL = Deno.env.get('FEEDBACK_TO_EMAIL')
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') ?? '*'

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method not allowed' }, 405)
  }

  if (!RESEND_API_KEY || !FEEDBACK_TO_EMAIL) {
    console.error('Missing RESEND_API_KEY or FEEDBACK_TO_EMAIL secret')
    return jsonResponse({ error: 'server not configured' }, 500)
  }

  let body: { message?: unknown, honeypot?: unknown }
  try {
    body = await req.json()
  }
  catch {
    return jsonResponse({ error: 'invalid json' }, 400)
  }

  // honeypot: botがこのフィールドを埋めた場合は黙って成功扱いにする
  if (typeof body.honeypot === 'string' && body.honeypot.length > 0) {
    return jsonResponse({ ok: true })
  }

  const message = body.message
  if (typeof message !== 'string' || message.trim().length === 0 || message.length > 2000) {
    return jsonResponse({ error: 'invalid message' }, 400)
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'RANK Feedback <onboarding@resend.dev>',
      to: [FEEDBACK_TO_EMAIL],
      subject: 'RANKページへのご意見',
      text: message,
    }),
  })

  if (!res.ok) {
    console.error('resend error', await res.text())
    return jsonResponse({ error: 'send failed' }, 502)
  }

  return jsonResponse({ ok: true })
})

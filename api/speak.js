// AI voice endpoint for the EZCommTETHER app.
//
// The iPhone's built-in voices are grown men or robots. Evan is sixteen — his
// voice should sound like a teenage boy. This endpoint turns tapped phrases
// into speech using an ElevenLabs voice the family picks (or designs), and the
// app plays the audio instead of the device voice. If this endpoint isn't
// configured or the phone is offline, the app falls back to the device voice,
// so Evan is never left silent.
//
// A phrase costs ElevenLabs ONCE, EVER (Frank, 7 Sep 2026: "ElevenLabs is
// using up all my credits every time Evan uses his device"). Every clip the
// server makes is kept in the Family Sync store under the voice and the exact
// words; the next request for the same words, from any phone, any day, is
// served from there and ElevenLabs is never called. The phone's own cache
// (long-lived cache headers, service worker) is the second layer. A "dub"
// action speaks a whole list of phrases into the store ahead of time so daily
// use costs nothing new; see dub.html.
//
// Required env vars (Vercel -> Project -> Settings -> Environment Variables):
//   ELEVENLABS_API_KEY    From elevenlabs.io -> profile -> API Keys
//   ELEVENLABS_VOICE_ID   The chosen voice's ID (Voice Library or Voice Design)
// Optional:
//   ELEVENLABS_MODEL      Default "eleven_multilingual_v2" (best quality).
//                         Use "eleven_flash_v2_5" for lower latency/cost.
//   ALLOWED_ORIGIN        Your deployed site origin, e.g. https://ez-comm-tether.vercel.app
//   KV_REST_API_URL / KV_REST_API_TOKEN   the Family Sync store; without it the
//                         server keeps nothing and every phrase costs each time
//   FAMILY_SYNC_PASSWORD  guards the dub action


function allowBrowser(req) {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  const env = process.env.ALLOWED_ORIGIN || '';
  const hosts = new Set(['ez-comm-tether.vercel.app', 'ezvoxa.com', 'www.ezvoxa.com', 'myezvoice.com']);
  if (req.headers.host) hosts.add(String(req.headers.host).split(':')[0].toLowerCase());
  if (env) {
    try { hosts.add(new URL(env).host.toLowerCase()); } catch (e) {}
  }
  const ok = (u) => {
    if (!u) return false;
    try { return hosts.has(new URL(u).host.toLowerCase()); } catch (e) { return false; }
  };
  return ok(origin) || ok(referer);
}

const MAX_CHARS = 400; // AAC phrases are short; this is a safety valve, not a feature.

const crypto = require('crypto');

// Speaking speed. 1.0 is the voice's natural pace; lower is slower/clearer.
// Tune with the ELEVENLABS_SPEED env var (clamped 0.7–1.2), no code change.
const speed = () => {
  const v = parseFloat(process.env.ELEVENLABS_SPEED || '0.92');
  return Math.min(1.2, Math.max(0.7, isNaN(v) ? 0.92 : v));
};

// Short fingerprint of the configured voice + speed. The app appends it to
// every audio URL, so cached phrases re-fetch automatically whenever the
// voice or its pace changes in Vercel.
const voiceTag = () =>
  crypto.createHash('sha1').update(String(process.env.ELEVENLABS_VOICE_ID || '') + ':' + speed()).digest('hex').slice(0, 8);

// ---- the server's memory of every clip ----
function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}
async function kv(cmd) {
  const env = kvEnv();
  if (!env) return null;
  const r = await fetch(env.url, { method: 'POST', headers: { Authorization: `Bearer ${env.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  return r.json();
}
// Same voice, same pace, same words: same key. The words are hashed, so the
// key is short and no phrase is readable from the key list.
const clipKey = (text) => 'tts:' + voiceTag() + ':' + crypto.createHash('sha1').update(text).digest('hex');
async function storedClip(text) {
  try { const j = await kv(['GET', clipKey(text)]); return j && j.result ? Buffer.from(j.result, 'base64') : null; } catch (e) { return null; }
}
async function storeClip(text, audio) {
  try { await kv(['SET', clipKey(text), audio.toString('base64')]); return true; } catch (e) { return false; }
}
async function hasClip(text) {
  try { const j = await kv(['EXISTS', clipKey(text)]); return !!(j && j.result); } catch (e) { return false; }
}

async function synthesize(text) {
  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.ELEVENLABS_VOICE_ID;
  const model = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
  const r = await fetch(
    'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(voice) + '?output_format=mp3_44100_64',
    {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model_id: model, voice_settings: { stability: 0.5, similarity_boost: 0.75, speed: speed() } }),
    }
  );
  if (!r.ok) {
    let detail = '';
    try { detail = ((await r.json()).detail || {}).message || ''; } catch (e) {}
    const err = new Error('tts_failed'); err.status = r.status; err.detail = detail; throw err;
  }
  return Buffer.from(await r.arrayBuffer());
}

module.exports = async (req, res) => {
  if (!allowBrowser(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' });
  }
  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.ELEVENLABS_VOICE_ID;

  // The dub: speak a list of phrases into the store ahead of time. Family
  // password only. Phrases already stored cost nothing; each new one is made
  // once. Small batches, so a request never runs long.
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};
    const pw = process.env.FAMILY_SYNC_PASSWORD;
    if (!pw || String(body.password || '') !== String(pw)) return res.status(200).json({ ok: false, error: 'bad_password' });
    if (body.action !== 'dub') return res.status(400).json({ ok: false, error: 'bad_action' });
    if (!key || !voice) return res.status(200).json({ ok: false, error: 'voice_not_configured' });
    if (!kvEnv()) return res.status(200).json({ ok: false, error: 'storage_not_configured' });
    const phrases = (Array.isArray(body.phrases) ? body.phrases : []).map((s) => String(s || '').trim().slice(0, MAX_CHARS)).filter(Boolean).slice(0, 8);
    const out = { ok: true, made: 0, kept: 0, failed: [] };
    for (const text of phrases) {
      if (await hasClip(text)) { out.kept++; continue; }
      try {
        const audio = await synthesize(text);
        if (await storeClip(text, audio)) out.made++; else out.failed.push(text);
      } catch (e) { out.failed.push(text); }
    }
    return res.status(200).json(out);
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const text = String((req.query && req.query.text) || '').trim().slice(0, MAX_CHARS);

  // Health check: /api/speak with no text says whether the AI voice is set up,
  // without exposing any secret. The app calls this once at launch.
  if (!text) {
    return res.status(200).json({ ok: true, configured: Boolean(key && voice), v: voiceTag() });
  }

  if (!key || !voice) {
    return res.status(500).json({ ok: false, error: 'voice_not_configured' });
  }

  try {
    // The server's copy first. ElevenLabs only when there is none, and then
    // the copy is kept so these words never cost again.
    let audio = await storedClip(text);
    let from = 'store';
    if (!audio) {
      audio = await synthesize(text);
      from = 'elevenlabs';
      await storeClip(text, audio);
    }
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('X-EZ-Voice', from);
    // Same text + same voice = same audio, forever — let the phone keep it.
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(audio);
  } catch (e) {
    if (e && e.message === 'tts_failed') return res.status(502).json({ ok: false, error: 'tts_failed', status: e.status, detail: e.detail });
    return res.status(502).json({ ok: false, error: 'tts_unreachable', detail: String((e && e.message) || e) });
  }
};

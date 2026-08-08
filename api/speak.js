// AI voice endpoint for the EZCommTETHER app.
//
// The iPhone's built-in voices are grown men or robots. Evan is sixteen — his
// voice should sound like a teenage boy. This endpoint turns tapped phrases
// into speech using an ElevenLabs voice the family picks (or designs), and the
// app plays the audio instead of the device voice. If this endpoint isn't
// configured or the phone is offline, the app falls back to the device voice,
// so Evan is never left silent.
//
// Repeated phrases don't cost money: responses carry long-lived cache headers,
// so the phone replays "I need help" and every other everyday phrase from its
// own cache — only genuinely new sentences hit the ElevenLabs API.
//
// Required env vars (Vercel -> Project -> Settings -> Environment Variables):
//   ELEVENLABS_API_KEY    From elevenlabs.io -> profile -> API Keys
//   ELEVENLABS_VOICE_ID   The chosen voice's ID (Voice Library or Voice Design)
// Optional:
//   ELEVENLABS_MODEL      Default "eleven_multilingual_v2" (best quality).
//                         Use "eleven_flash_v2_5" for lower latency/cost.
//   ALLOWED_ORIGIN        Your deployed site origin, e.g. https://ez-comm-tether.vercel.app

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

module.exports = async (req, res) => {
  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.ELEVENLABS_VOICE_ID;

  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed) {
    const origin = req.headers.origin || '';
    if (origin && origin !== allowed) {
      return res.status(403).json({ ok: false, error: 'forbidden_origin' });
    }
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
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

  const model = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
  try {
    const r = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(voice) + '?output_format=mp3_44100_64',
      {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          model_id: model,
          voice_settings: { stability: 0.5, similarity_boost: 0.75, speed: speed() },
        }),
      }
    );
    if (!r.ok) {
      let detail = '';
      try { detail = ((await r.json()).detail || {}).message || ''; } catch (e) {}
      return res.status(502).json({ ok: false, error: 'tts_failed', status: r.status, detail });
    }
    const audio = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    // Same text + same voice = same audio, forever — let the phone keep it.
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(audio);
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'tts_unreachable', detail: String((e && e.message) || e) });
  }
};

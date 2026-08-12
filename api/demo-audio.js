// Voice for the website demo.
//
// The demo must not speak in Quardell — that voice belongs to Evan. It uses a
// second voice, and only ever says one of the fixed phrases below, so this can
// never be used as a free text-to-speech service by anyone who finds it.
//
// Each phrase is generated once, ever: the audio is kept in the same key-value
// store the rest of the app uses, and served from there afterwards with
// permanent cache headers. Ten thousand visitors cost the same as one.
//
// Env (all already set, except the optional voice override):
//   ELEVENLABS_API_KEY                  the existing key
//   KV_REST_API_URL / KV_REST_API_TOKEN the existing store
//   DEMO_VOICE_ID   optional — defaults to Zach, the runner-up from the audition

const DEFAULT_DEMO_VOICE = 'GVERRoGD1VgvkBmxamFb'; // "Zach" — clear, natural, teenage
const KEY_PREFIX = 'ezvoxa:demo-audio:';

// The only things the demo can say. Index is the id the page asks for.
const PHRASES = [
  'Yes',                              // 0
  'No',                               // 1
  'I need help.',                     // 2
  'I need to use the bathroom.',      // 3
  'Hello!',                           // 4
  'Goodbye!',                         // 5
  'Please.',                          // 6
  'Thank you.',                       // 7
  'Stop.',                            // 8
  'Go.',                              // 9
  "I'm done",                         // 10
  'Wait.',                            // 11
  'Can I have pizza?',                // 12
  'Can I have more pizza?',           // 13
  'Can I have chicken fingers?',      // 14
  'Can I have a snack?',              // 15
  "I'm hungry.",                      // 16
  "I'm thirsty.",                     // 17
  'Can I have apple juice?',          // 18
  'I love you Mom',                   // 19
  'I miss you Mom',                   // 20
  'Good morning Mom',                 // 21
  'I love you Dad',                   // 22
  'My head hurts.',                   // 23
  'My stomach hurts.',                // 24
  "I don't feel good.",               // 25
  'I need to go to the nurse.',       // 26
  'I want to go to the pool',         // 27
  'I feel happy',                     // 28
  'I want to watch a movie',          // 29
];

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}

async function kv(cmd) {
  const { url, token } = kvEnv();
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  return r.json();
}

module.exports = async (req, res) => {
  const raw = (req.query && (req.query.p != null ? req.query.p : req.query.phrase));

  // No id: report what the demo can say, so the page and this file can't drift apart.
  if (raw == null || raw === '') {
    return res.status(200).json({ ok: true, count: PHRASES.length, phrases: PHRASES });
  }

  const i = parseInt(raw, 10);
  if (!(i >= 0 && i < PHRASES.length)) {
    return res.status(400).json({ ok: false, error: 'unknown_phrase' });
  }

  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.DEMO_VOICE_ID || DEFAULT_DEMO_VOICE;
  const { url, token } = kvEnv();
  if (!key || !url || !token) return res.status(200).json({ ok: false, error: 'not_configured' });

  const store = KEY_PREFIX + voice + ':' + i;

  try {
    // Already made once? Serve that copy and spend nothing.
    const hit = await kv(['GET', store]);
    if (hit && hit.result) {
      const buf = Buffer.from(String(hit.result), 'base64');
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.status(200).send(buf);
    }

    const r = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(voice) + '?output_format=mp3_44100_64',
      {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: PHRASES[i],
          model_id: process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75, speed: 0.94 },
        }),
      }
    );
    if (!r.ok) return res.status(502).json({ ok: false, error: 'tts_failed', status: r.status });

    const audio = Buffer.from(await r.arrayBuffer());
    await kv(['SET', store, audio.toString('base64')]);   // never generated again
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(audio);
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'unavailable' });
  }
};

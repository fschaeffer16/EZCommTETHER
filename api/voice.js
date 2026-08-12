// Voice notes from Evan's parents.
//
// Evan can't take a phone call and can't open Messages, so this is the one way
// he hears his mother's or father's actual voice on his own device. A parent
// records in the app, reviews it, and sends; his phone picks it up within about
// half a minute and plays it, saying who it's from.
//
// Deliberately nothing to do with Twilio or the carriers: this is our own
// storage, so it works whether or not the A2P registration has cleared, and a
// message can never be silently dropped by a carrier the way an SMS can.
//
// Clips are small on purpose (short, low bitrate) so they fit in the same
// key-value store Family Sync already uses — no new service, no new cost.
//
// Required env vars (the same ones Family Sync already uses):
//   KV_REST_API_URL / KV_REST_API_TOKEN   Vercel KV (Upstash) store
//   FAMILY_SYNC_PASSWORD                  shared family password; guards read + write
// Optional:
//   ALLOWED_ORIGIN                        e.g. https://ez-comm-tether.vercel.app

const KEY = 'ezcomm:voicenotes';
const MAX_NOTES = 20;              // keep a short history; oldest fall off
const MAX_BYTES = 700000;          // ~700KB of base64 — roughly 30s of small audio

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}

async function kvCommand(cmd) {
  const { url, token } = kvEnv();
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  return r.json();
}

async function readNotes() {
  const j = await kvCommand(['GET', KEY]);
  if (!j || !j.result) return [];
  try { const p = JSON.parse(j.result); return Array.isArray(p) ? p : []; } catch (e) { return []; }
}

module.exports = async (req, res) => {
  const { url, token } = kvEnv();
  const pwSet = Boolean(process.env.FAMILY_SYNC_PASSWORD);

  // Health check — says whether voice notes are usable without exposing anything.
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, configured: Boolean(url && token && pwSet) });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed) {
    const origin = req.headers.origin || '';
    if (origin && origin !== allowed) return res.status(403).json({ ok: false, error: 'forbidden_origin' });
  }

  if (!url || !token || !pwSet) {
    return res.status(200).json({ ok: false, error: 'storage_not_configured' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  if (String(body.password || '') !== String(process.env.FAMILY_SYNC_PASSWORD)) {
    return res.status(200).json({ ok: false, error: 'bad_password' });
  }

  try {
    // A parent sends a clip.
    if (body.action === 'send') {
      const audio = String(body.audio || '');
      const from = String(body.from || 'Family').slice(0, 24);
      if (!audio) return res.status(200).json({ ok: false, error: 'no_audio' });
      if (audio.length > MAX_BYTES) return res.status(200).json({ ok: false, error: 'too_long' });
      const notes = await readNotes();
      notes.push({ id: 'v' + Date.now(), from, audio, mime: String(body.mime || 'audio/mp4').slice(0, 40), at: Date.now() });
      while (notes.length > MAX_NOTES) notes.shift();
      await kvCommand(['SET', KEY, JSON.stringify(notes)]);
      return res.status(200).json({ ok: true, id: notes[notes.length - 1].id });
    }

    // Evan's phone asks what's arrived since it last looked. `since` is the id
    // it already played, so a clip is never played at him twice.
    if (body.action === 'poll') {
      const notes = await readNotes();
      const since = String(body.since || '');
      const idx = since ? notes.findIndex((n) => n.id === since) : -1;
      const fresh = notes.slice(idx + 1);
      const next = fresh.length ? fresh[0] : null;
      return res.status(200).json({ ok: true, note: next, waiting: Math.max(0, fresh.length - (next ? 1 : 0)) });
    }

    // Just the ids, so a phone can tell if anything is new without pulling audio.
    if (body.action === 'list') {
      const notes = await readNotes();
      return res.status(200).json({ ok: true, notes: notes.map((n) => ({ id: n.id, from: n.from, at: n.at })) });
    }

    return res.status(400).json({ ok: false, error: 'bad_action' });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

// The list of people who asked for EZvoxa before it existed.
//
// The first name on it is a mother who stopped Frank in a school hallway,
// phone already in her hand, ready to buy something that wasn't for sale yet.
// This exists so that never happens again.
//
// Uses the same key-value store Family Sync already uses — no new service.
// Reading the list back requires the family password; adding to it doesn't,
// because the whole point is that a stranger can leave their name in ten seconds.
//
// Required env vars (already set for Family Sync):
//   KV_REST_API_URL / KV_REST_API_TOKEN
//   FAMILY_SYNC_PASSWORD    guards reading the list

const KEY = 'ezvoxa:waitlist';
const MAX_ENTRIES = 5000;
const MAX_FIELD = 200;

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

async function readList() {
  const j = await kvCommand(['GET', KEY]);
  if (!j || !j.result) return [];
  try { const p = JSON.parse(j.result); return Array.isArray(p) ? p : []; } catch (e) { return []; }
}

const clean = (v) => String(v == null ? '' : v).trim().slice(0, MAX_FIELD);
const looksLikeEmail = (v) => /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(v);

// US mobile numbers, stored E.164 so they can be handed to Twilio unchanged.
function toE164(raw) {
  const d = String(raw || '').replace(/\D/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  return null;
}

module.exports = async (req, res) => {
  const { url, token } = kvEnv();

  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, configured: Boolean(url && token) });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  if (!url || !token) {
    return res.status(200).json({ ok: false, error: 'storage_not_configured' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  try {
    // Frank reading his own list.
    if (body.action === 'list') {
      if (!process.env.FAMILY_SYNC_PASSWORD || String(body.password || '') !== String(process.env.FAMILY_SYNC_PASSWORD)) {
        return res.status(200).json({ ok: false, error: 'bad_password' });
      }
      const list = await readList();
      return res.status(200).json({ ok: true, count: list.length, entries: list });
    }

    const name = clean(body.name);
    const wantsSms = clean(body.how) === 'sms';
    const email = wantsSms ? '' : clean(body.email);
    const phone = wantsSms ? toE164(body.phone) : null;
    const consentText = clean(body.consentText);

    if (wantsSms) {
      if (!phone) return res.status(200).json({ ok: false, error: 'bad_phone' });
      // No consent wording means no proof of consent, and without proof this
      // number is not textable. Refuse it rather than store a number we can't use.
      if (consentText.length < 40) return res.status(200).json({ ok: false, error: 'no_consent' });
    } else if (!looksLikeEmail(email)) {
      return res.status(200).json({ ok: false, error: 'bad_email' });
    }

    const list = await readList();
    // Someone signing up twice shouldn't create two of them.
    const dupe = list.some((e) => e && (
      (email && e.email && e.email.toLowerCase() === email.toLowerCase()) ||
      (phone && e.phone && e.phone === phone)
    ));
    if (dupe) return res.status(200).json({ ok: true, already: true });
    if (list.length >= MAX_ENTRIES) return res.status(200).json({ ok: false, error: 'list_full' });

    const entry = { name, email, about: clean(body.about), source: clean(body.source), at: Date.now() };
    if (wantsSms) {
      entry.phone = phone;
      // The consent record. If a number ever has to be defended, this is the
      // evidence: what was agreed to, when, and from where.
      entry.consent = {
        text: consentText,
        at: Date.now(),
        ip: clean((req.headers['x-forwarded-for'] || '').split(',')[0]) || null,
        ua: clean(req.headers['user-agent']).slice(0, 180) || null,
      };
    }
    list.push(entry);
    await kvCommand(['SET', KEY, JSON.stringify(list)]);
    return res.status(200).json({ ok: true, count: list.length });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

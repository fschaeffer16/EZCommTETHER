// Family settings sync for EZCommTETHER.
//
// Lets the family's phones share buttons and contact info. One phone taps
// Save (which POSTs {action:'save'} here and writes to a small shared cloud
// store); another phone taps Sync ({action:'load'}) to pull the latest down.
//
// Photos are NOT synced (they stay on each phone) so the payload stays small
// and fast. Names, phone numbers, emails, addresses, birthdays, button labels,
// what each button says, and the button arrangement all sync.
//
// Required env vars (Vercel -> Project -> Settings -> Environment Variables):
//   KV_REST_API_URL / KV_REST_API_TOKEN   auto-added when you create a Vercel KV
//                                          (Upstash) store and connect it to the project
//   FAMILY_SYNC_PASSWORD                   the shared family password; guards read + write.
//                                          Set it to the SAME value as your in-app family password.
// Optional:
//   ALLOWED_ORIGIN                         your site origin, e.g. https://ez-comm-tether.vercel.app

const KEY = 'ezcomm:family-settings';

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
  return r.json(); // { result: ... }
}

module.exports = async (req, res) => {
  const { url, token } = kvEnv();
  const pwSet = Boolean(process.env.FAMILY_SYNC_PASSWORD);

  // Health check: confirm the server is wired up without needing the password.
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, configured: { storage: Boolean(url && token), password: pwSet } });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  // Light abuse protection: if ALLOWED_ORIGIN is set, only accept the app's own origin.
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

  // The family password guards both reading and writing the shared settings.
  if (String(body.password || '') !== String(process.env.FAMILY_SYNC_PASSWORD)) {
    return res.status(200).json({ ok: false, error: 'bad_password' });
  }

  try {
    if (body.action === 'save') {
      const value = JSON.stringify({ settings: body.settings || {}, savedAt: Date.now() });
      if (value.length > 900000) return res.status(200).json({ ok: false, error: 'too_large' });
      await kvCommand(['SET', KEY, value]);
      return res.status(200).json({ ok: true, savedAt: Date.now() });
    }
    if (body.action === 'load') {
      const j = await kvCommand(['GET', KEY]);
      const raw = j && j.result;
      if (!raw) return res.status(200).json({ ok: true, settings: null });
      let parsed = null; try { parsed = JSON.parse(raw); } catch (e) {}
      return res.status(200).json({ ok: true, settings: parsed ? parsed.settings : null, savedAt: parsed ? parsed.savedAt : null });
    }
    return res.status(400).json({ ok: false, error: 'bad_action' });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

const KEY = 'ezvoxa:professional-inquiries';
const MAX_ENTRIES = 5000;
const MAX_FIELD = 1200;

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

const clean = (v, max = MAX_FIELD) => String(v == null ? '' : v).trim().slice(0, max);
const looksLikeEmail = (v) => /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(v);

module.exports = async (req, res) => {
  const { url, token } = kvEnv();
  if (req.method === 'GET') return res.status(200).json({ ok: true, configured: Boolean(url && token) });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  if (!url || !token) return res.status(200).json({ ok: false, error: 'storage_not_configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  try {
    if (body.action === 'list') {
      if (!process.env.FAMILY_SYNC_PASSWORD || String(body.password || '') !== String(process.env.FAMILY_SYNC_PASSWORD)) {
        return res.status(200).json({ ok: false, error: 'bad_password' });
      }
      const list = await readList();
      return res.status(200).json({ ok: true, count: list.length, entries: list });
    }

    const name = clean(body.name, 200);
    const email = clean(body.email, 200);
    const role = clean(body.role, 120);
    const organization = clean(body.organization, 240);
    const message = clean(body.message, 1200);
    const source = clean(body.source, 120);

    if (!name) return res.status(200).json({ ok: false, error: 'name_required' });
    if (!looksLikeEmail(email)) return res.status(200).json({ ok: false, error: 'bad_email' });

    const list = await readList();
    if (list.length >= MAX_ENTRIES) return res.status(200).json({ ok: false, error: 'list_full' });
    list.push({ name, email, role, organization, message, source, at: Date.now() });
    await kvCommand(['SET', KEY, JSON.stringify(list)]);
    return res.status(200).json({ ok: true, count: list.length });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

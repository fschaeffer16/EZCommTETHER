// Quote and pilot requests from the Schools and Clinics section of ezvoxa.com.
//
// Both forms on that page post here. Each request is stored in the same
// key-value store Family Sync uses, and emailed to Frank when QUOTE_EMAIL_TO
// is set. Reading the list back needs the family password, like the waitlist.
//
// Env vars:
//   KV_REST_API_URL / KV_REST_API_TOKEN   storage (already set for Family Sync)
//   FAMILY_SYNC_PASSWORD                  guards reading the list
//   SENDGRID_API_KEY, SOS_EMAIL_FROM      already set for SOS email; reused for the sender
//   QUOTE_EMAIL_TO                        where each request is emailed (comma-separated allowed);
//                                         unset means store only, no email
//
// Nothing here is a price, and nothing here is student data: the form asks for
// an organization, a contact, a size range, and free text.

const KEY = 'ezvoxa:quotes';
const RATE_PREFIX = 'ezvoxa:quotes:rate:';
const MAX_ENTRIES = 5000;
const MAX_PER_HOUR = 5;

function allowBrowser(req) {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  const env = process.env.ALLOWED_ORIGIN || '';
  const hosts = new Set(['ez-comm-tether.vercel.app', 'ezvoxa.com', 'www.ezvoxa.com', 'myezvoice.com', 'www.myezvoice.com', 'app.ezvoxa.com']);
  if (req.headers.host) hosts.add(String(req.headers.host).split(':')[0].toLowerCase());
  if (env) { try { hosts.add(new URL(env).host.toLowerCase()); } catch (e) {} }
  const ok = (u) => { if (!u) return false; try { return hosts.has(new URL(u).host.toLowerCase()); } catch (e) { return false; } };
  return ok(origin) || ok(referer);
}

function cors(req, res) {
  const origin = req.headers.origin || '';
  let host = '';
  try { host = new URL(origin).host.toLowerCase(); } catch (e) {}
  if (['ezvoxa.com', 'www.ezvoxa.com', 'myezvoice.com', 'www.myezvoice.com', 'app.ezvoxa.com', 'ez-comm-tether.vercel.app'].includes(host)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '600');
  }
}

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

// At most MAX_PER_HOUR requests per address per hour. A failure to count is not a reason to drop a real request.
async function overRate(req) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  if (!ip) return false;
  try {
    const key = RATE_PREFIX + ip.replace(/[^0-9a-f.:]/gi, '');
    const j = await kvCommand(['INCR', key]);
    const n = Number(j && j.result) || 0;
    if (n === 1) await kvCommand(['EXPIRE', key, 3600]);
    return n > MAX_PER_HOUR;
  } catch (e) { return false; }
}

async function sendEmail(entry) {
  const key = process.env.SENDGRID_API_KEY;
  const from = process.env.SOS_EMAIL_FROM;
  const to = String(process.env.QUOTE_EMAIL_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!key || !from || !to.length) return { ok: false, skipped: true };
  const label = entry.kind === 'pilot' ? 'Pilot request' : 'Quote request';
  const lines = [
    `${label} from ezvoxa.com`,
    '',
    `Organization: ${entry.organization}`,
    `Type: ${entry.orgType}`,
    `State: ${entry.state}`,
    `Contact: ${entry.name}${entry.title ? ', ' + entry.title : ''}`,
    `Email: ${entry.email}`,
    `Phone: ${entry.phone || '(none given)'}`,
    `Cannot rely on speech: ${entry.count}`,
    `Devices in use: ${entry.devices}`,
    entry.kind === 'pilot' ? `Pilot seats: ${entry.seats}` : null,
    entry.kind === 'pilot' ? `Classroom or program: ${entry.program}` : null,
    `Heard of us: ${entry.heard}`,
    `Referred by: ${entry.referral || '(none given)'}`,
    '',
    'Message:',
    entry.message || '(none)',
    '',
    `Received ${new Date(entry.at).toISOString()} from ${entry.source || 'unknown page'}`,
  ].filter((l) => l !== null);
  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: to.map((e) => ({ email: e })) }],
      from: { email: from, name: 'EZvoxa Schools and Clinics' },
      reply_to: { email: entry.email, name: entry.name },
      subject: `${label}: ${entry.organization} (${entry.state})`,
      content: [{ type: 'text/plain', value: lines.join('\n') }],
    }),
  });
  return { ok: r.ok };
}

const clean = (v, max) => String(v == null ? '' : v).trim().slice(0, max);
const looksLikeEmail = (v) => /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(v);

module.exports = async (req, res) => {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!allowBrowser(req)) return res.status(403).json({ ok: false, error: 'forbidden_origin' });

  const { url, token } = kvEnv();
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, configured: Boolean(url && token), email: Boolean(process.env.SENDGRID_API_KEY && process.env.SOS_EMAIL_FROM && process.env.QUOTE_EMAIL_TO) });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
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

    // The hidden field a person never sees; a filled one is a bot.
    if (clean(body.website, 10)) return res.status(200).json({ ok: true, count: -1 });

    const entry = {
      kind: body.kind === 'pilot' ? 'pilot' : 'quote',
      organization: clean(body.organization, 200),
      orgType: clean(body.orgType, 60),
      state: clean(body.state, 60),
      name: clean(body.name, 120),
      title: clean(body.title, 120),
      email: clean(body.email, 160),
      phone: clean(body.phone, 40),
      count: clean(body.count, 40),
      devices: clean(body.devices, 40),
      heard: clean(body.heard, 60),
      referral: clean(body.referral, 160),
      seats: clean(body.seats, 40),
      program: clean(body.program, 200),
      message: clean(body.message, 2000),
      source: clean(body.source, 120),
      at: Date.now(),
    };
    if (!entry.organization) return res.status(200).json({ ok: false, error: 'organization_required' });
    if (!entry.name) return res.status(200).json({ ok: false, error: 'name_required' });
    if (!looksLikeEmail(entry.email)) return res.status(200).json({ ok: false, error: 'bad_email' });
    if (!entry.state) return res.status(200).json({ ok: false, error: 'state_required' });
    if (await overRate(req)) return res.status(200).json({ ok: false, error: 'too_many' });

    const list = await readList();
    if (list.length >= MAX_ENTRIES) return res.status(200).json({ ok: false, error: 'list_full' });
    list.push(entry);
    await kvCommand(['SET', KEY, JSON.stringify(list)]);
    const mail = await sendEmail(entry).catch(() => ({ ok: false }));
    return res.status(200).json({ ok: true, count: list.length, emailed: Boolean(mail.ok) });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

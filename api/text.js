// Cloud texting endpoint for the EZCommTETHER app.
//
// Evan's phone is a dedicated device locked to this app, so he can't drop into
// the Messages app to press Send. This endpoint sends the text for him: he taps
// a phrase, the app POSTs here, and Twilio delivers it — the same path the red
// Emergency button already uses. The app then shows a real "Sent ✓", because
// this function reports Twilio's actual delivery status.
//
// PHONE NUMBERS NEVER SHIP IN THE APP. The app sends only a person id ("mom");
// the number is looked up here from the FAMILY_DIRECTORY environment variable.
//
// A buyer's family (Frank, 4 Sep 2026) sends its Family Code (api/home.js) and
// the person id; the number comes from that family's own synced settings
// (fam:CODE:settings), which a parent typed into the app and saved. Their
// child's name comes with the request, so the text reads "From Mia:".
//
// Required env vars (Vercel -> Project -> Settings -> Environment Variables):
//   TWILIO_ACCOUNT_SID   Twilio Account SID (starts "AC...")
//   TWILIO_AUTH_TOKEN    Twilio Auth Token
//   TWILIO_FROM          Your Twilio phone number, e.g. +18885551234
//   FAMILY_DIRECTORY     JSON keyed by person id, e.g. {"mom":{"phone":"+1727..."}}
// Optional:
//   CHILD_NAME           Defaults to "Evan" — used for the "From Evan:" prefix
//   ALLOWED_ORIGIN       Your deployed site origin, e.g. https://ez-comm-tether.vercel.app


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

const { normCode, normPhone, planActive } = require('./home.js');

const CHILD = () => String(process.env.CHILD_NAME || 'Evan').trim() || 'Evan';
const cleanName = (v) => String(v || '').replace(/[^A-Za-z0-9 .'-]/g, '').trim().slice(0, 24);

function directory() {
  try { return JSON.parse(process.env.FAMILY_DIRECTORY || '{}') || {}; } catch (e) { return {}; }
}

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}
async function kvGetJson(key) {
  const { url, token } = kvEnv();
  if (!url || !token) return null;
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['GET', key]) });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  const j = await r.json();
  if (!j || !j.result) return null;
  try { return JSON.parse(j.result); } catch (e) { return null; }
}
// Everyone a buyer's family has saved, keyed by person id, with the phone a
// parent typed in. Returns null when the code is not a family we know.
async function familyPeople(code) {
  const fam = await kvGetJson('fam:' + code);
  if (!fam) return null;
  const saved = await kvGetJson('fam:' + code + ':settings');
  const s = (saved && saved.settings) || {};
  const out = {};
  for (const group of ['family', 'school', 'friends']) {
    for (const p of (Array.isArray(s[group]) ? s[group] : [])) {
      if (p && p.id) out[String(p.id).toLowerCase()] = p;
    }
  }
  return { people: out, fam };
}

// "From Evan: Happy Birthday Mom! I love you!" — added once, never doubled up.
function buildBody(message, childName) {
  const child = childName || CHILD();
  const words = String(message || '').trim();
  const re = new RegExp('^from\\s+' + child.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*:', 'i');
  return re.test(words) ? words : `From ${child}: ${words}`;
}

async function sendSms(to, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`;
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ To: to, From: from, Body: body }).toString(),
  });
  let j = {};
  try { j = await r.json(); } catch (e) {}
  return { accepted: r.ok, sid: (j && j.sid) || null, status: (j && j.status) || (r.ok ? 'queued' : 'failed'), detail: r.ok ? '' : ((j && j.message) || '') };
}

async function fetchStatus(messageSid) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages/${messageSid}.json`, { headers: { Authorization: `Basic ${auth}` } });
  const j = await r.json().catch(() => ({}));
  return { status: j.status, errorCode: j.error_code };
}

module.exports = async (req, res) => {
  if (!allowBrowser(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' });
  }
  // Health check: confirm configuration without sending anything or exposing secrets.
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      configured: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM),
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  if (!allowBrowser(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' });
  }

  let payload = req.body;
  if (typeof payload === 'string') { try { payload = JSON.parse(payload); } catch (e) { payload = {}; } }
  payload = payload || {};

  const id = String(payload.to || '').trim().toLowerCase();
  const message = String(payload.message || '').trim();
  if (!id || !message) return res.status(400).json({ ok: false, error: 'missing_to_or_message' });

  if (!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM)) {
    return res.status(500).json({ ok: false, error: 'sms_not_configured' });
  }

  let person = null;
  let childName = '';
  const code = normCode(payload.code);
  if (code) {
    let found = null;
    try { found = await familyPeople(code); } catch (e) { return res.status(502).json({ ok: false, error: 'storage_error' }); }
    if (!found) return res.status(200).json({ ok: false, error: 'unknown_family' });
    // Everyday texting is part of the subscription (Frank, 5 Sep 2026:
    // locked from day one, no switch). A family texts only while its plan
    // is active, from the store or from a hardship grant. SOS never has
    // this check.
    if (!planActive(found.fam)) {
      return res.status(200).json({ ok: false, error: 'needs_plan' });
    }
    person = found.people[id];
    childName = cleanName(payload.child);
  } else {
    person = directory()[id];
  }
  const phone = person && person.phone ? (code ? normPhone(person.phone) : String(person.phone).trim()) : '';
  if (!phone) return res.status(404).json({ ok: false, error: 'no_number_for_person' });

  const body = buildBody(message, childName);
  const r = await sendSms(phone, body).catch((e) => ({ accepted: false, sid: null, status: 'failed', detail: String((e && e.message) || e) }));

  // Poll briefly so we can tell Evan it truly went out, not just that Twilio took it.
  const TERMINAL = ['delivered', 'undelivered', 'failed', 'canceled'];
  const deadline = Date.now() + 6000;
  while (Date.now() < deadline && r.sid && TERMINAL.indexOf(r.status) === -1) {
    await new Promise((done) => setTimeout(done, 1200));
    const s = await fetchStatus(r.sid).catch(() => null);
    if (s && s.status) { r.status = s.status; if (s.errorCode) r.errorCode = s.errorCode; }
  }

  // "sent"/"delivered"/"queued" all mean it left our hands successfully; only an
  // explicit failure should tell Evan it didn't work.
  const bad = !r.accepted || ['undelivered', 'failed', 'canceled'].indexOf(r.status) !== -1;
  return res.status(bad ? 502 : 200).json({
    ok: !bad,
    to: id,
    status: r.status,
    errorCode: r.errorCode || null,
    detail: r.detail || '',
    sentText: body,
  });
};

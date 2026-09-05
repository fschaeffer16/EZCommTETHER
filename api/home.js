// A family's own space on the server, keyed by a Family Code.
//
// Frank, 4 Sep 2026: a buyer's phones need Family Sync, voice messages and
// texting of their own, not ours. The first phone a parent sets up creates a
// Family Code (EZ-XXXX-XXXX); every other phone joins with it and says what it
// is: the user's phone, or a parent's. Everything for that family lives under
// the code in the same key-value store Family Sync already uses:
//   fam:CODE            who is in it (devices and their roles)
//   fam:CODE:settings   the synced boards, people and numbers (settings.js)
//   fam:CODE:voice      voice messages waiting for the user's phone (voice.js)
// text.js and sos.js read the numbers from fam:CODE:settings, so a phone
// number a parent types into the app never has to be sent with a message.
//
// The code is the secret. It is long enough that guessing is not practical,
// and a parent can issue a new one at any time (action "regen"), which moves
// the family's data under the new code and retires the old one.
//
// Required env vars: KV_REST_API_URL / KV_REST_API_TOKEN (the Family Sync store).

const crypto = require('crypto');

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no I, L, O, 0, 1
const MAX_DEVICES = 12;

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}
async function kvCommand(cmd) {
  const { url, token } = kvEnv();
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  return r.json();
}
async function kvGetJson(key) {
  const j = await kvCommand(['GET', key]);
  if (!j || !j.result) return null;
  try { return JSON.parse(j.result); } catch (e) { return null; }
}

// "ez7k3p9qm2", "EZ-7K3P-9QM2", " 7k3p 9qm2 " all become "EZ-7K3P-9QM2".
function normCode(v) {
  let s = String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (s.indexOf('EZ') === 0 && s.length >= 10) s = s.slice(2);
  if (s.length !== 8) return '';
  for (const ch of s) if (ALPHABET.indexOf(ch) < 0) return '';
  return 'EZ-' + s.slice(0, 4) + '-' + s.slice(4);
}
function newCode() {
  const bytes = crypto.randomBytes(8);
  let s = '';
  for (let i = 0; i < 8; i++) s += ALPHABET[bytes[i] % ALPHABET.length];
  return 'EZ-' + s.slice(0, 4) + '-' + s.slice(4);
}
// A parent types "(727) 555-0101"; Twilio needs "+17275550101". US numbers get
// +1 when no country code was given; anything already international is kept.
function normPhone(v) {
  const raw = String(v || '').trim();
  const digits = raw.replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (raw[0] === '+') return '+' + digits;
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits[0] === '1') return '+' + digits;
  return digits.length > 11 ? '+' + digits : '';
}
const ROLES = ['user', 'parent'];
function cleanDevice(body) {
  const id = String(body.deviceId || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 48);
  const role = ROLES.indexOf(body.role) >= 0 ? body.role : 'parent';
  const name = String(body.name || '').slice(0, 24);
  return id ? { id, role, name } : null;
}
function publicFamily(code, fam) {
  return { code, createdAt: fam.createdAt, devices: (fam.devices || []).map((d) => ({ id: d.id, role: d.role, name: d.name, at: d.at })) };
}

module.exports = async (req, res) => {
  const { url, token } = kvEnv();
  if (req.method === 'GET') return res.status(200).json({ ok: true, configured: Boolean(url && token) });
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed) { const origin = req.headers.origin || ''; if (origin && origin !== allowed) return res.status(403).json({ ok: false, error: 'forbidden_origin' }); }
  if (!url || !token) return res.status(200).json({ ok: false, error: 'storage_not_configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  const action = String(body.action || '');
  const dev = cleanDevice(body);
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (action === 'create') {
      if (!dev) return res.status(400).json({ ok: false, error: 'missing_device' });
      let code = newCode();
      // A collision is astronomically unlikely; check once anyway.
      if (await kvGetJson('fam:' + code)) code = newCode();
      const fam = { createdAt: Date.now(), devices: [{ ...dev, at: Date.now() }] };
      await kvCommand(['SET', 'fam:' + code, JSON.stringify(fam)]);
      return res.status(200).json({ ok: true, family: publicFamily(code, fam) });
    }

    const code = normCode(body.code);
    if (!code) return res.status(200).json({ ok: false, error: 'bad_code' });
    const fam = await kvGetJson('fam:' + code);
    if (!fam) return res.status(200).json({ ok: false, error: 'unknown_family' });

    if (action === 'join') {
      if (!dev) return res.status(400).json({ ok: false, error: 'missing_device' });
      const devices = (fam.devices || []).filter((d) => d.id !== dev.id);
      if (devices.length >= MAX_DEVICES) return res.status(200).json({ ok: false, error: 'family_full' });
      devices.push({ ...dev, at: Date.now() });
      fam.devices = devices;
      await kvCommand(['SET', 'fam:' + code, JSON.stringify(fam)]);
      return res.status(200).json({ ok: true, family: publicFamily(code, fam) });
    }
    if (action === 'info') {
      return res.status(200).json({ ok: true, family: publicFamily(code, fam) });
    }
    if (action === 'leave') {
      if (!dev) return res.status(400).json({ ok: false, error: 'missing_device' });
      fam.devices = (fam.devices || []).filter((d) => d.id !== dev.id);
      await kvCommand(['SET', 'fam:' + code, JSON.stringify(fam)]);
      return res.status(200).json({ ok: true, family: publicFamily(code, fam) });
    }
    if (action === 'regen') {
      // A new code for the same family: the data moves, the old code dies.
      // Every other phone has to join again with the new code, which is the
      // point when a code has leaked.
      if (!dev) return res.status(400).json({ ok: false, error: 'missing_device' });
      const me = (fam.devices || []).find((d) => d.id === dev.id);
      if (!me) return res.status(200).json({ ok: false, error: 'not_in_family' });
      let next = newCode();
      if (await kvGetJson('fam:' + next)) next = newCode();
      const moved = { createdAt: fam.createdAt, devices: [{ ...me, at: Date.now() }] };
      await kvCommand(['SET', 'fam:' + next, JSON.stringify(moved)]);
      for (const suffix of [':settings', ':voice']) {
        const j = await kvCommand(['GET', 'fam:' + code + suffix]);
        if (j && j.result) await kvCommand(['SET', 'fam:' + next + suffix, j.result]);
      }
      await kvCommand(['DEL', 'fam:' + code, 'fam:' + code + ':settings', 'fam:' + code + ':voice']);
      return res.status(200).json({ ok: true, family: publicFamily(next, moved) });
    }
    return res.status(400).json({ ok: false, error: 'bad_action' });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

module.exports.normCode = normCode;
module.exports.normPhone = normPhone;

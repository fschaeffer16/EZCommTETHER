// Family directory endpoint for the EZCommTETHER app.
//
// Phone numbers used to live ONLY in each phone's browser storage, so they
// vanished whenever a phone cleared that storage (iPhones do this on their own
// after about a week of not opening the app) or when the app was reinstalled.
// This endpoint fixes that: the family's contact info is stored once, on the
// server, and every phone fetches it on startup and fills it in automatically.
// A phone that got wiped restores the numbers by itself the next time it opens.
//
// The numbers are NOT baked into the public app code. They are read from a
// single environment variable you set in Vercel (see SETUP.md), so they can be
// changed in one place without a code change, and are never lost.
//
// Required env var (Vercel -> Project -> Settings -> Environment Variables):
//   FAMILY_DIRECTORY   JSON keyed by each person's id, e.g.
//     {"mom":{"phone":"+17275551234"},"dad":{"phone":"+17275555678"},
//      "chris":{"phone":"+1..."},"matthew":{"phone":"+1..."}}
//   (phone is the important one; email/address/birthdate are optional.)
// Optional:
//   ALLOWED_ORIGIN     Your deployed site origin, e.g. https://ez-comm-tether.vercel.app


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

const FIELDS = ['phone', 'email', 'address', 'birthdate'];

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  // Light abuse protection: if ALLOWED_ORIGIN is set, reject cross-origin
  // callers. Same-origin taps from the installed app pass (no Origin header,
  // or a matching one).
  if (!allowBrowser(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' });
  }

  let raw = {};
  try { raw = JSON.parse(process.env.FAMILY_DIRECTORY || '{}') || {}; } catch (e) { raw = {}; }

  // Only expose the contact fields — nothing else from the env var leaks out.
  const people = {};
  for (const id in raw) {
    const p = raw[id] || {};
    const clean = {};
    FIELDS.forEach((k) => { if (p[k]) clean[k] = String(p[k]); });
    if (Object.keys(clean).length) people[id] = clean;
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true, people });
};

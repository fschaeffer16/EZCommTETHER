// Page views for ezvoxa.com, counted on our own server.
//
// Frank, 10 Sep 2026: "add analytics to the site." The site has been live
// since 1 Sep with nothing counting, so there is no traffic number at all.
//
// Why this instead of an analytics product: EZvoxa's own privacy policy says
// "no advertising, no analytics packages, no tracking scripts", the App Store
// privacy answers say nothing is used to track anyone, and the schools we sell
// to ask what leaves their building. Bringing in a third-party tag would make
// all three of those harder to say. This counts numbers and nothing else.
//
// What is stored: a count, per page path, per day. That is the whole record.
//   ez:hits:d:<YYYY-MM-DD>:<path>   views of one page on one day
//   ez:hits:p:<path>                views of one page, all time
//   ez:hits:r:<YYYY-MM-DD>:<host>   which site sent the visitor, by host only
//   ez:hits:days                    the set of days that have data
//
// What is NOT stored, and cannot be recovered from what is: no IP address, no
// cookie, no device or browser identifier, no visitor id of any kind, no query
// strings, no full referring URL, no path we do not already publish. Two
// visitors are indistinguishable from one visitor twice. That is deliberate:
// the number answers "is anyone coming and from where", which is the question,
// and it cannot answer anything about a person.
//
// Reading the counts back needs the family password, like the waitlist.
//
// Env vars:
//   KV_REST_API_URL / KV_REST_API_TOKEN   storage (already set for Family Sync)
//   FAMILY_SYNC_PASSWORD                  guards reading the counts

const PREFIX = 'ez:hits:';
const DAYS_KEY = PREFIX + 'days';
const KEEP_DAYS = 180;          // counts older than this are not read back
const MAX_PATH = 80;

// Only pages we actually publish are counted. Anything else is filed as
// "other", so a junk or probing request can never create a key of its own.
const PAGES = new Set([
  '/', '/index.html', '/evan-story.html', '/app.html', '/for-families.html',
  '/families.html', '/professionals.html', '/schools.html', '/journal.html',
  '/join.html', '/guided-demo.html', '/hearhim.html', '/privacy.html',
  '/opening-statement.html', '/ezvoxa.html',
]);

const SITE_HOSTS = new Set([
  'ezvoxa.com', 'www.ezvoxa.com', 'myezvoice.com', 'www.myezvoice.com',
  'app.ezvoxa.com', 'ez-comm-tether.vercel.app',
]);

function hostOf(u) {
  if (!u) return '';
  try { return new URL(u).host.toLowerCase(); } catch (e) { return ''; }
}

function allowBrowser(req) {
  const hosts = new Set(SITE_HOSTS);
  if (req.headers.host) hosts.add(String(req.headers.host).split(':')[0].toLowerCase());
  const env = process.env.ALLOWED_ORIGIN || '';
  if (env) { const h = hostOf(env); if (h) hosts.add(h); }
  const o = hostOf(req.headers.origin), r = hostOf(req.headers.referer);
  return hosts.has(o) || hosts.has(r);
}

function cors(req, res) {
  const origin = req.headers.origin || '';
  if (SITE_HOSTS.has(hostOf(origin))) {
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

// Several commands in one round trip. If this store does not offer the
// pipeline route, fall back to sending them one at a time rather than
// failing: a counter is never worth an outage, and the shape of the reply
// is the same either way.
async function kvPipeline(cmds) {
  const { url, token } = kvEnv();
  try {
    const r = await fetch(url.replace(/\/$/, '') + '/pipeline', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmds),
    });
    if (r.ok) {
      const j = await r.json();
      if (Array.isArray(j)) return j;
    }
  } catch (e) { /* fall through to one at a time */ }
  const out = [];
  for (const c of cmds) {
    try { out.push(await kvCommand(c)); } catch (e) { out.push({ result: null }); }
  }
  return out;
}

function today() { return new Date().toISOString().slice(0, 10); }

// A path we publish, or "other". Never the raw string from the browser.
function cleanPath(raw) {
  let p = String(raw || '').slice(0, MAX_PATH);
  try { p = new URL(p, 'https://www.ezvoxa.com').pathname; } catch (e) { return 'other'; }
  if (p === '/index.html') p = '/';
  return PAGES.has(p) ? p : 'other';
}

// The host that sent them, never the full URL. Our own pages are "direct".
function cleanRef(raw) {
  const h = hostOf(String(raw || '').slice(0, 300));
  if (!h || SITE_HOSTS.has(h)) return 'direct';
  return h.slice(0, 60);
}

function lastDays(n) {
  const out = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    out.push(new Date(d.getTime() - i * 86400000).toISOString().slice(0, 10));
  }
  return out;
}

module.exports = async (req, res) => {
  cors(req, res);
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { url, token } = kvEnv();

  // GET is the health check, same shape as the other endpoints.
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, configured: Boolean(url && token) });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  if (!url || !token) return res.status(200).json({ ok: false, error: 'storage_not_configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  // Reading the counts back: family password, like the waitlist and quotes.
  if (body.action === 'list') {
    const pw = process.env.FAMILY_SYNC_PASSWORD;
    if (!pw || String(body.password || '') !== String(pw)) {
      return res.status(200).json({ ok: false, error: 'bad_password' });
    }
    const days = lastDays(Math.min(Number(body.days) || 30, KEEP_DAYS));
    const paths = Array.from(PAGES).concat(['other']);
    try {
      const perPage = await kvPipeline(paths.map((p) => ['GET', PREFIX + 'p:' + p]));
      const perDay = await kvPipeline(days.map((d) => ['GET', PREFIX + 'd:' + d + ':__all']));
      const daily = {};
      days.forEach((d, i) => { daily[d] = Number((perDay[i] && perDay[i].result) || 0); });
      const pages = {};
      paths.forEach((p, i) => {
        const n = Number((perPage[i] && perPage[i].result) || 0);
        if (n) pages[p] = n;
      });
      // Referrers over the same window, summed.
      const refKeys = [];
      for (const d of days) refKeys.push(['SMEMBERS', PREFIX + 'rk:' + d]);
      const refSets = await kvPipeline(refKeys);
      const hosts = new Set();
      refSets.forEach((s) => (s && Array.isArray(s.result) ? s.result : []).forEach((h) => hosts.add(h)));
      const hostList = Array.from(hosts).slice(0, 200);
      const refs = {};
      if (hostList.length) {
        const cmds = [];
        for (const d of days) for (const h of hostList) cmds.push(['GET', PREFIX + 'r:' + d + ':' + h]);
        const vals = await kvPipeline(cmds);
        let i = 0;
        for (const d of days) for (const h of hostList) {
          const n = Number((vals[i] && vals[i].result) || 0); i++;
          if (n) refs[h] = (refs[h] || 0) + n;
        }
      }
      const total = Object.values(pages).reduce((a, b) => a + b, 0);
      return res.status(200).json({ ok: true, total, daily, pages, refs });
    } catch (e) {
      return res.status(502).json({ ok: false, error: 'storage_error' });
    }
  }

  // Counting a view. Browser-only, from our own pages.
  if (!allowBrowser(req)) return res.status(403).json({ ok: false, error: 'forbidden_origin' });

  const path = cleanPath(body.path);
  const ref = cleanRef(body.ref);
  const day = today();

  try {
    await kvPipeline([
      ['INCR', PREFIX + 'd:' + day + ':__all'],
      ['INCR', PREFIX + 'd:' + day + ':' + path],
      ['INCR', PREFIX + 'p:' + path],
      ['INCR', PREFIX + 'r:' + day + ':' + ref],
      ['SADD', PREFIX + 'rk:' + day, ref],
      ['SADD', DAYS_KEY, day],
      ['EXPIRE', PREFIX + 'd:' + day + ':__all', 60 * 60 * 24 * KEEP_DAYS],
      ['EXPIRE', PREFIX + 'd:' + day + ':' + path, 60 * 60 * 24 * KEEP_DAYS],
      ['EXPIRE', PREFIX + 'r:' + day + ':' + ref, 60 * 60 * 24 * KEEP_DAYS],
      ['EXPIRE', PREFIX + 'rk:' + day, 60 * 60 * 24 * KEEP_DAYS],
    ]);
  } catch (e) {
    // A counter that fails is never worth an error in someone's browser.
    return res.status(200).json({ ok: true, counted: false });
  }
  return res.status(200).json({ ok: true, counted: true });
};
